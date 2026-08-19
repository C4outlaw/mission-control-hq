import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { byId, packById, PACKS, signGrant } from '../../../lib/prompt-packs';

export const runtime = 'nodejs';
// Stripe signs the raw body, so it must not be parsed or re-encoded before verification.
export const dynamic = 'force-dynamic';

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
    // Payment already succeeded — surface the failure so it can be retried, but
    // returning 500 makes Stripe redeliver the event, which is what we want.
    return new Response(`email failed: ${err.message}`, { status: 500 });
  }

  return new Response('ok', { status: 200 });
}
