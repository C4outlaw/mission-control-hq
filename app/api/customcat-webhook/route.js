/**
 * CustomCat tells us when an order ships. We tell the buyer.
 *
 * Until now nothing closed the loop: an order went to the print house and then
 * went quiet, so neither the shop nor the customer knew it had left. CustomCat
 * publishes an `order-shipped` topic carrying the tracking number; this takes
 * it, writes it onto the Stripe payment so the order pages can read it back,
 * and emails the buyer their tracking link.
 *
 * Registered with CustomCat as the `order-shipped` and `order-partial-shipment`
 * webhook target. Public in lib/public-api-paths.mjs because CustomCat calls it
 * from outside; it authenticates on the read-only api_key CustomCat includes in
 * every payload.
 */

import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { orderNumber } from '../../../lib/order-view';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* Timing-safe compare so a wrong key cannot be found one character at a time. */
function sameSecret(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function emailBuyer({ to, number, tracking, url, partial, remaining }) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !to) return false;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const heading = partial ? 'Part of your order is on its way' : 'Your order is on its way';
  const extra = partial
    ? `<p style="margin:0 0 16px">The rest of your order (${remaining} item${remaining === 1 ? '' : 's'}) ships separately — you will get another email for it.</p>`
    : '';
  await transport.sendMail({
    from: process.env.PACK_FROM || process.env.SMTP_USER,
    to,
    subject: `${heading} — ${number}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:520px;color:#0c0a09">
        <p style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#6b6b6b;margin:0 0 8px">The Lost Jamaican</p>
        <h1 style="font-size:26px;font-weight:500;margin:0 0 14px">${heading}</h1>
        <p style="margin:0 0 16px">Order <strong>${number}</strong> has left the print house.</p>
        ${extra}
        <p style="margin:0 0 6px;font-size:13px;color:#6b6b6b">Tracking number</p>
        <p style="margin:0 0 20px;font-size:18px"><strong>${tracking}</strong></p>
        ${url ? `<p style="margin:0 0 24px"><a href="${url}" style="display:inline-block;background:#0c0a09;color:#fff;padding:13px 22px;text-decoration:none">Track this parcel</a></p>` : ''}
        <p style="margin:0;font-size:13px;color:#6b6b6b">Thank you for backing the channel. — The Lost Jamaican · We Never Lose</p>
      </div>`,
  });
  return true;
}

export async function POST(req) {
  const body = await req.json().catch(() => null);
  if (!body) return Response.json({ error: 'bad payload' }, { status: 400 });

  // CustomCat signs nothing; the shared read-only key in the payload is the
  // only proof this came from them, so it has to match exactly.
  const expected = process.env.CUSTOMCAT_WEBHOOK_KEY || process.env.CUSTOMCAT_READONLY_KEY;
  if (expected && !sameSecret(String(body.api_key || ''), expected)) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const sessionId = String(body.order_id || '');
  const tracking = String(body.tracker_number || body.tracking_number || '').trim();
  const trackUrl = String(body.tracking_url || '').trim();
  const remaining = Number(body['items_remaining:'] ?? body.items_remaining ?? 0);
  const partial = remaining > 0;
  if (!sessionId) return Response.json({ error: 'no order_id' }, { status: 400 });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const pi = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id;

    if (pi) {
      await stripe.paymentIntents.update(pi, {
        metadata: {
          shipped_at: new Date().toISOString(),
          tracking_number: tracking,
          tracking_url: trackUrl,
          shipment: partial ? `partial, ${remaining} remaining` : 'complete',
        },
      });
    }

    const to = session.customer_details?.email || session.customer_email;
    let emailed = false;
    try {
      emailed = await emailBuyer({
        to, number: orderNumber(sessionId), tracking, url: trackUrl, partial, remaining,
      });
    } catch (err) {
      // A failed email must not make CustomCat retry the whole notification —
      // the tracking number is already safely on the payment.
      console.error('shipped email failed', err.message);
    }

    return Response.json({ ok: true, order: orderNumber(sessionId), emailed });
  } catch (err) {
    // 500 so CustomCat retries: a lost tracking number is a silent failure.
    console.error('customcat shipped webhook failed', err.message);
    return Response.json({ error: String(err.message).slice(0, 200) }, { status: 500 });
  }
}

/* CustomCat verifies a webhook target before registering it. */
export async function GET() {
  return Response.json({ ok: true, service: 'the-lost-jamaican shipped-webhook' });
}
