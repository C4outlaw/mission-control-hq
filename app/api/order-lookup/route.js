/**
 * Let a buyer check on their own order, and nobody else's.
 *
 * No account and no password: an order number alone is guessable and an email
 * alone would hand anyone's order to anyone who knows the address, so this
 * asks for both and matches them against Stripe. That is the same bargain
 * every guest checkout makes, and it keeps the shop free of a password
 * database it has no business holding.
 */

import { stripeClient, toOrderView, orderNumber } from '../../../lib/order-view';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* An order number is the tail of the Stripe session id, so it can be matched
   without listing anything: TLJ-XXXXXXXX -> the last 8 characters. */
const TAIL = /^(?:TLJ-)?([A-Za-z0-9]{8})$/;

export async function POST(req) {
  const { number = '', email = '' } = await req.json().catch(() => ({}));
  const tail = String(number).trim().toUpperCase().match(TAIL)?.[1];
  const wanted = String(email).trim().toLowerCase();

  if (!tail || !wanted) {
    return Response.json({ error: 'Enter both your order number and the email you ordered with.' }, { status: 400 });
  }

  try {
    const stripe = stripeClient();
    // Stripe cannot query by the tail of an id, so scan the recent window.
    // A shop this size will not outrun it, and it never leaves the server.
    const found = [];
    for await (const s of stripe.checkout.sessions.list({ limit: 100, expand: ['data.payment_intent'] })) {
      if (orderNumber(s.id).slice(-8) !== tail) continue;
      const onOrder = (s.customer_details?.email || s.customer_email || '').toLowerCase();
      // Both have to match. A right number with the wrong email finds nothing.
      if (onOrder !== wanted) break;
      found.push(toOrderView(s));
      break;
    }
    if (!found.length) {
      return Response.json({ error: 'No order matches that number and email.' }, { status: 404 });
    }
    return Response.json({ order: found[0] });
  } catch {
    return Response.json({ error: 'Order lookup is unavailable right now. Please try again shortly.' }, { status: 500 });
  }
}
