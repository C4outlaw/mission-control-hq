/**
 * Every order, and whether the print house actually took it.
 *
 * Not in lib/public-api-paths.mjs on purpose: this route sits behind the
 * Marvin Room gate in proxy.js, so it is already covered by the login that
 * exists rather than a second one invented for it.
 *
 * GET  — the recent orders, newest first.
 * POST — hand one order to the print house again. A paid order whose
 *        fulfilment failed is money taken with nothing being made, and this
 *        is the button that fixes it. Deliberately manual: placing a live
 *        production order costs real money, so it happens when the shop owner
 *        says so, never on a page load.
 */

import { stripeClient, toOrderView } from '../../../lib/order-view';
import { createCustomCatOrder } from '../../../lib/customcat-order';
import { createPrintifyOrder } from '../../../lib/printify-order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stripe = stripeClient();
    const { data } = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ['data.payment_intent'],
    });
    const orders = data.map(toOrderView);
    const paid = orders.filter((o) => o.status.state !== 'unpaid');
    return Response.json({
      orders: paid,
      abandoned: orders.length - paid.length,
      needsAttention: paid.filter((o) => o.status.state === 'pending').length,
    });
  } catch (err) {
    return Response.json({ error: String(err.message) }, { status: 500 });
  }
}

export async function POST(req) {
  const { id } = await req.json().catch(() => ({}));
  if (!id) return Response.json({ error: 'no order id' }, { status: 400 });

  try {
    const stripe = stripeClient();
    const session = await stripe.checkout.sessions.retrieve(id, { expand: ['payment_intent'] });
    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'that order was never paid' }, { status: 400 });
    }

    const type = session.metadata?.type;
    const order = type === 'merch'
      ? await createPrintifyOrder(session)
      : await createCustomCatOrder(session);

    const ref = order.CUSTOMCAT_ORDER_ID || order.order_id || order.id || 'created';
    const pi = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id;
    if (pi) {
      await stripe.paymentIntents.update(pi, {
        metadata: type === 'merch'
          ? { printify_order_id: String(ref), fulfil_error: '' }
          : { cc_order_id: String(ref), fulfil_error: '' },
      });
    }
    return Response.json({ ok: true, ref: String(ref) });
  } catch (err) {
    return Response.json({ error: String(err.message).slice(0, 400) }, { status: 502 });
  }
}
