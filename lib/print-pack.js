// The $5 Patwa Sticker Pack: 30 die-cut stickers + printable sheets + 6 wall prints, delivered as
// encrypted zip parts (packs-enc/*.zip.enc) because a Vercel function response is capped at ~4.5 MB.
// Shared by the checkout route, the thank-you page and the Stripe webhook.
import nodemailer from 'nodemailer';
import { signGrant } from './prompt-packs';
import patwaParts from './print-pack-parts.json';
import foodParts from './food-pack-parts.json';
import musicParts from './music-pack-parts.json';
import beachParts from './beach-pack-parts.json';

export const PATWA_PACK = {
  id: 'patwa-sticker-pack',
  name: 'The Lost Jamaican — Patwa Sticker Pack',
  price: 500, // $5.00
  description:
    '30 colourful Jamaican die-cut stickers (transparent PNG) + printable sticker sheets + 6 patois wall prints. Instant digital download, personal use.',
  image: '/store/patwa-sticker-pack.jpg',
  parts: patwaParts,
};

export const FOOD_PACK = {
  id: 'jamaican-food-sticker-pack',
  name: 'The Lost Jamaican — Jamaican Food Sticker Pack',
  price: 500,
  description:
    '30 colourful Jamaican food and drink die-cut stickers (oxtail, curry goat, sorrel, ackee and more, transparent PNG) + printable sticker sheets. Instant digital download, personal use.',
  image: '/store/food-sticker-pack.jpg',
  parts: foodParts,
};

export const MUSIC_PACK = {
  id: 'music-sound-system-sticker-pack',
  name: 'The Lost Jamaican — Music and Sound System Sticker Pack',
  price: 500,
  description:
    '30 colourful reggae and sound system die-cut stickers (turntable, bass bin, nyabinghi drum, saxophone, boombox and more, transparent PNG) + printable sticker sheets. Instant digital download, personal use.',
  image: '/store/music-sticker-pack.jpg',
  parts: musicParts,
};

export const BEACH_PACK = {
  id: 'jamaica-beaches-landmarks-sticker-pack',
  name: 'The Lost Jamaican — Jamaica Beaches and Landmarks Sticker Pack',
  price: 500,
  description:
    '30 colourful Jamaican beach, waterfall and landmark die-cut stickers (Seven Mile Beach, Blue Mountains, waterfalls, great houses and more, transparent PNG) + printable sticker sheets. Instant digital download, personal use.',
  image: '/store/beach-sticker-pack.jpg',
  parts: beachParts,
};

// Price and contents are resolved here on the server, so a request can only pick a pack, never set a price.
export const STICKER_PACKS = { patwa: PATWA_PACK, food: FOOD_PACK, music: MUSIC_PACK, beach: BEACH_PACK };
export const stickerPackById = (id) => Object.values(STICKER_PACKS).find((p) => p.id === id) || null;

const LINK_TTL_HOURS = 24 * 14;
const siteOrigin = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://myriehq.com';

// One signed link per part. Each grant carries the session id so a link is traceable to its sale.
export function packLinks(sessionId, pack = PATWA_PACK) {
  return pack.parts.map((p) => ({
    label: p.label,
    items: p.items,
    mb: Math.round((p.bytes / 1048576) * 10) / 10,
    url: `${siteOrigin()}/api/download?t=${encodeURIComponent(signGrant({ sid: sessionId, file: p.file }, LINK_TTL_HOURS))}`,
  }));
}

// Best-effort: the thank-you page is the primary delivery, the email is the backup copy.
export async function sendStickerPackEmail(to, sessionId, pack) {
  if (!to || !process.env.SMTP_HOST || !process.env.SMTP_USER) return false;
  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const rows = packLinks(sessionId, pack)
      .map((l) => `<li><a href="${l.url}">${l.label}</a> <span style="color:#666">(${l.items} files, ${l.mb} MB)</span></li>`)
      .join('');
    await transport.sendMail({
      from: process.env.PACK_FROM || process.env.SMTP_USER,
      to,
      subject: `Your ${pack.name.replace('The Lost Jamaican — ', '')} downloads`,
      html: `<p>Thank you! Here are your downloads. The pack is split into a few zip files so each one downloads quickly.</p>
<ol>${rows}</ol>
<p style="color:#666;font-size:13px">Links work for 14 days. Download them all and keep a copy. Personal use only. Walk good. - The Lost Jamaican</p>`,
    });
    return true;
  } catch (err) {
    console.error('sticker pack email failed', err.message);
    return false;
  }
}
