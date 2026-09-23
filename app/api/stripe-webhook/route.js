import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { byId, packById, PACKS, signGrant } from '../../../lib/prompt-packs';
import { createPrintifyOrder } from '../../../lib/printify-order';
import { createCustomCatOrder } from '../../../lib/customcat-order';

export const runtime = 'nodejs';
// Stripe signs the raw body, so it must not be parsed or re-encoded before verification.
export const dynamic = 'force-dynamic';

/* Stamp the outcome on the payment intent.
 *
 * Stripe knows the money went through; only we know whether the print house
 * took the job. Writing that back here means the buyer's order page and the
 * admin list can both read one source of truth, with no orders database to
 * keep in sync -- and a failure leaves its reason behind instead of vanishing
 * into a log. Never allowed to fail the webhook.
 */
async function stamp(stripe, session, fields) {
  try {
    const pi = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;
    if (pi) await stripe.paymentIntents.update(pi, { metadata: fields });
  } catch (err) {
    console.error('could not stamp fulfilment on payment intent', err.message);
  }
}


// Myrie bought a hoodie on 2026-09-20 and never received anything. The order WAS placed with CustomCat
// (cc_order_id stamped on the PaymentIntent) - the bug is that both merch branches below `return` before the
// digital-pack email block at the end of this file, so a physical order sent no mail at all. Stripe sent
// nothing either: the session carries no `receipt_email`, so Stripe's own receipt never fires.
// This sends the buyer a confirmation with what they bought, where it is going and the fulfilment reference.

// Myrie 2026-09-22: "How do I know that the purchase has been made at the store? Do I get a copy?" He did not.
// The confirmation goes to the BUYER only - his own test order just happened to use his own address. A real
// customer's order would reach the customer and nobody else, so a sale could sit unnoticed indefinitely.
// This sends the shop owner a copy of every sale, physical or digital, with everything needed to act on it.
// It is best-effort by design: the buyer's confirmation and the production order must never depend on it.
// Ask Stripe to send its own itemised receipt to the buyer. Checkout only learns the email during payment, so
// it cannot be set when the session is created - setting it on the PaymentIntent here is what fires the receipt.
// Belt and braces: if our SMTP ever fails, the buyer still gets proof of purchase from Stripe itself.
async function stripeReceipt(stripe, session) {
  const email = session.customer_details?.email || session.customer_email;
  if (!email || !session.payment_intent) return;
  try {
    await stripe.paymentIntents.update(session.payment_intent, { receipt_email: email });
  } catch (err) {
    console.error('could not set receipt_email', err.message);
  }
}

async function notifyOwner(session, { kind, ref, items, money, buyer, where }) {
  const to = process.env.OWNER_EMAIL || process.env.CONTACT_TO || 'myriework@gmail.com';
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return;
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const rows = (items && items.length ? items : ['(see Stripe)']).map((i) => `<li>${i}</li>`).join('');
    await transport.sendMail({
      from: process.env.PACK_FROM || process.env.SMTP_USER,
      to,
      replyTo: buyer || undefined,
      subject: `NEW ORDER ${money} - ${kind}`,
      html: `<p><strong>${kind}</strong></p>
<ul>${rows}</ul>
<p><strong>Paid:</strong> ${money}<br>
<strong>Buyer:</strong> ${buyer || 'unknown'}<br>
<strong>Fulfilment ref:</strong> ${ref || 'n/a'}</p>
${where ? `<p><strong>Ship to</strong><br>${where}</p>` : ''}
<p style="color:#666;font-size:13px">Stripe session ${session.id}<br>
<a href="https://dashboard.stripe.com/payments/${session.payment_intent || ''}">Open this payment in Stripe</a></p>`,
    });
  } catch (err) {
    // Never let the owner copy affect the buyer or the production order.
    console.error('owner notification failed', err.message);
  }
}

async function sendMerchConfirmation(session, ref, provider) {
  const to = session.customer_details?.email || session.customer_email;
  if (!to) return { ok: false, error: 'no buyer email on the session' };
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) return { ok: false, error: 'SMTP not configured' };

  const money = ((session.amount_total || 0) / 100).toFixed(2) + ' ' + (session.currency || 'usd').toUpperCase();
  const shipInfo = session.collected_information?.shipping_details || session.shipping_details || null;
  const addr = shipInfo?.address || session.customer_details?.address || {};
  const who = shipInfo?.name || session.customer_details?.name || '';
  const where = [who, addr.line1, addr.line2, [addr.city, addr.state, addr.postal_code].filter(Boolean).join(' '), addr.country]
    .filter(Boolean).join('<br>');

  // The compact fulfil string is the source of truth for what was actually ordered.
  const meta = session.metadata || {};
  const encoded = [meta.fulfil, meta.fulfil2, meta.fulfil3, meta.fulfil4].filter(Boolean).join('');
  let items = [];
  if (encoded.startsWith('[')) {
    try { items = JSON.parse(encoded).map((f) => `${f.q || 1} x ${f.design} (${f.color}, ${f.size})`); } catch { items = []; }
  } else if (encoded) {
    items = encoded.split(';').filter(Boolean).map((part) => {
      const [, c, sz, d, q] = part.split(':');
      return `${parseInt(q, 10) || 1} x ${String(d || '').replace(/-/g, ' ')}${c ? ` (${c}${sz ? ', ' + sz : ''})` : ''}`;
    });
  }
  const rows = items.length ? items.map((i) => `<li>${i}</li>`).join('') : '<li>Your order</li>';

  // FREE PROMPT PACK WITH EVERY ORDER (Myrie 2026-09-22) - this is the promise the CTA at the end of every
  // episode makes: "buy any merch and get a free prompt pack". It was never actually delivered. The same
  // signed-grant mechanism the paid packs use issues it, so no database and no coupon codes: the entitlement
  // travels in an HMAC token that expires on its own.
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://myriehq.com';
  const freePack = packById(process.env.FREE_MERCH_PACK_ID) || PACKS[0];
  let freeBlock = '';
  try {
    const token = signGrant({ sid: session.id, file: freePack.file, email: to }, 720);   // 30 days, not 72h
    freeBlock = `<hr style="border:none;border-top:1px solid #eee;margin:22px 0">
<p><strong>Your free prompt pack</strong> — thanks for buying merch.</p>
<p><a href="${origin}/api/download?t=${encodeURIComponent(token)}"
   style="background:#1b52d6;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block">Download ${String(freePack.title || freePack.id).replace(/-/g, ' ')}</a></p>
<p style="color:#666;font-size:13px">This link works for 30 days. Reply to this email if it expires and we'll reissue it.</p>`;
  } catch (err) {
    // A pack-link failure must never cost the buyer their order confirmation.
    freeBlock = '<p style="color:#666;font-size:13px">Your free prompt pack is on its way in a separate email.</p>';
  }

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transport.sendMail({
      from: process.env.PACK_FROM || process.env.SMTP_USER,
      to,
      subject: `Your MyrieHQ order is confirmed (${money})`,
      html: `<p>Thanks — your order is paid and has gone into production.</p>
<ul>${rows}</ul>
<p><strong>Total paid:</strong> ${money}<br>
<strong>Order reference:</strong> ${ref}</p>
<p><strong>Shipping to</strong><br>${where || 'the address you gave at checkout'}</p>
${freeBlock}
<p style="color:#666;font-size:13px">Print-on-demand items are made to order, so allow a few days for production before
they ship. Reply to this email with your order reference if anything looks wrong.</p>`,
    });
    return { ok: true, items, money, buyer: to, where };
  } catch (err) {
    return { ok: false, error: String(err.message).slice(0, 300), items, money, buyer: to, where };
  }
}

export async function POST(req) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whSecret) return new Response('not configured', { status: 500 });

  const stripe = new Stripe(key);
  const raw = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whSecret);
  } catch (err) {
    // A bad signature means it did not come from Stripe. Never fulfil on it.
    return new Response(`signature failed: ${err.message}`, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') return new Response('ignored', { status: 200 });

  const session = event.data.object;
  if (session.payment_status !== 'paid') return new Response('unpaid', { status: 200 });

  // Every paid order, whatever it is, gets Stripe's own receipt.
  await stripeReceipt(stripe, session);

  // Physical merch: hand the paid order to Printify for production and shipping.
  // Digital-pack fulfilment below is untouched.
  if (session.metadata?.type === 'merch') {
    try {
      const order = await createPrintifyOrder(session);
      const pref = String(order.id || 'created');
      await stamp(stripe, session, { printify_order_id: pref, fulfil_error: '' });
      const mail = await sendMerchConfirmation(session, pref, 'Printify');
      // The order is already in production, so a mail failure must never undo it or make Stripe redeliver -
      // it is recorded on the PaymentIntent instead, where it can be found and resent.
      if (!mail.ok) await stamp(stripe, session, { email_error: mail.error || 'unknown' });
      await notifyOwner(session, { kind: 'Printify merch', ref: pref, items: mail.items,
        money: mail.money, buyer: mail.buyer, where: mail.where });
      return new Response('merch order ' + pref, { status: 200 });
    } catch (err) {
      await stamp(stripe, session, { fulfil_error: String(err.message).slice(0, 480) });
      // Return 500 so Stripe retries; the payment already succeeded and the
      // order must not be silently dropped.
      console.error('printify order failed', err.message);
      return new Response('printify failed: ' + err.message, { status: 500 });
    }
  }

  // CustomCat merch (Everyday Collection, 30 designs): hand the paid order to
  // CustomCat for print-on-demand production and shipping.
  if (session.metadata?.type === 'customcat-merch') {
    try {
      const order = await createCustomCatOrder(session);
      const ref = String(order.CUSTOMCAT_ORDER_ID || order.order_id || order.id || 'created');
      await stamp(stripe, session, { cc_order_id: ref, fulfil_error: '' });
      const mail = await sendMerchConfirmation(session, ref, 'CustomCat');
      if (!mail.ok) await stamp(stripe, session, { email_error: mail.error || 'unknown' });
      await notifyOwner(session, { kind: 'CustomCat merch', ref: ref, items: mail.items,
        money: mail.money, buyer: mail.buyer, where: mail.where });
      return new Response('customcat order ' + ref, { status: 200 });
    } catch (err) {
      await stamp(stripe, session, { fulfil_error: String(err.message).slice(0, 480) });
      // Return 500 so Stripe retries; the payment already succeeded and the
      // order must not be silently dropped.
      console.error('customcat order failed', err.message);
      return new Response('customcat failed: ' + err.message, { status: 500 });
    }
  }

  const email = session.customer_details?.email || session.customer_email;
  const addons = (session.metadata?.addons || '').split(',').filter(Boolean);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://myriehq.com';

  // "Every Future Pack" is a one-time 12-month entitlement, not a subscription.
  // Record the buyer in a ledger so each new release can be mailed to everyone
  // whose window is still open (see scripts/send-new-pack.md).
  if (addons.includes('allaccess') && email) {
    try {
      const ledgerDir = process.env.PACK_DIR || path.join(process.cwd(), 'private', 'packs');
      const ledgerPath = path.join(ledgerDir, 'allaccess-ledger.json');
      const ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : [];
      if (!ledger.some((e) => e.sid === session.id)) {
        ledger.push({
          sid: session.id,
          email,
          purchasedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        });
        fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));
      }
    } catch {
      // Ledger write failure must not block the buyer's immediate download email;
      // the entry can be reconstructed from the Stripe dashboard by session id.
    }
  }

  // One signed link per file so each download stands alone.
  const pack = packById(session.metadata?.packId) || PACKS[0];
  const files = [pack.file, ...addons.map((id) => byId(id)?.file).filter(Boolean)];
  const links = files.map((file) => ({
    file,
    url: `${origin}/api/download?t=${encodeURIComponent(signGrant({ sid: session.id, file, email }))}`,
  }));

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const rows = links
      .map(
        (l) =>
          `<p><a href="${l.url}" style="background:#1b52d6;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;display:inline-block">Download ${l.file.replace(/\.(pdf|zip)$/i, '').replace(/-/g, ' ')}</a></p>`
      )
      .join('');
    await transport.sendMail({
      from: process.env.PACK_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Your MyrieHQ Prompt Pack download',
      html: `<p>Thanks — here ${links.length > 1 ? 'are your downloads' : 'is your download'}.</p>
${rows}
<p style="color:#666;font-size:13px">These links work for 72 hours. Reply to this email if one expires and we'll reissue it.</p>`,
    });
  } catch (err) {
    // Payment already succeeded - surface the failure so it can be retried, but
    // returning 500 makes Stripe redeliver the event, which is what we want.
    return new Response(`email failed: ${err.message}`, { status: 500 });
  }

  await notifyOwner(session, {
    kind: 'Prompt pack',
    ref: session.metadata?.packId || pack.id,
    items: links.map((l) => l.file),
    money: ((session.amount_total || 0) / 100).toFixed(2) + ' ' + (session.currency || 'usd').toUpperCase(),
    buyer: email,
    where: '',
  });

  return new Response('ok', { status: 200 });
}
