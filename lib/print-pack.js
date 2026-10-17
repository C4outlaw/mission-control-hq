// The $5 Patwa Sticker Pack: 30 die-cut stickers + printable sheets + 6 wall prints, delivered as
// encrypted zip parts (packs-enc/*.zip.enc) because a Vercel function response is capped at ~4.5 MB.
// Shared by the checkout route, the thank-you page and the Stripe webhook.
import nodemailer from 'nodemailer';
import { signGrant } from './prompt-packs';
import parts from './print-pack-parts.json';

export const PATWA_PACK = {
  id: 'patwa-sticker-pack',
  name: 'The Lost Jamaican — Patwa Sticker Pack',
  price: 500, // $5.00
  description:
    '30 colourful Jamaican die-cut stickers (transparent PNG) + printable sticker sheets + 6 patois wall prints. Instant digital download, personal use.',
};

const LINK_TTL_HOURS = 24 * 14;
const siteOrigin = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://myriehq.com';

// One signed link per part. Each grant carries the session id so a link is traceable to its sale.
export function packLinks(sessionId) {
  return parts.map((p) => ({
    label: p.label,
    items: p.items,
    mb: Math.round((p.bytes / 1048576) * 10) / 10,
    url: `${siteOrigin()}/api/download?t=${encodeURIComponent(signGrant({ sid: sessionId, file: p.file }, LINK_TTL_HOURS))}`,
  }));
}

// Best-effort: the thank-you page is the primary delivery, the email is the backup copy.
export async function sendPatwaPackEmail(to, sessionId) {
  if (!to || !process.env.SMTP_HOST || !process.env.SMTP_USER) return false;
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const rows = packLinks(sessionId)
      .map((l) => `<li><a href="${l.url}">${l.label}</a> <span style="color:#666">(${l.items} files, ${l.mb} MB)</span></li>`)
      .join('');
    await transport.sendMail({
      from: process.env.PACK_FROM || process.env.SMTP_USER,
      to,
      subject: 'Your Patwa Sticker Pack downloads',
      html: `<p>Thank you! Here are your downloads. The pack is split into a few zip files so each one downloads quickly.</p>
<ol>${rows}</ol>
<p style="color:#666;font-size:13px">Links work for 14 days. Download them all and keep a copy. Personal use only. Walk good. - The Lost Jamaican</p>`,
    });
    return true;
  } catch (err) {
    console.error('patwa pack email failed', err.message);
    return false;
  }
}
