import crypto from 'crypto';

// Catalog for the downloadable prompt packs.
// Base item is pay-what-you-want with a hard floor enforced by Stripe's
// custom_unit_amount.minimum, so a buyer cannot submit 0. Add-ons are fixed price
// and are chosen with checkboxes before we ever create the Checkout Session.
export const BASE = {
  id: 'pack-base',
  name: 'The Lost Jamaican Method — Prompt Pack',
  blurb:
    'The full production system behind our vertical documentary shorts: research discipline, character continuity, narration timing, the shot-per-phrase grid, model settings and QC gates.',
  minAmount: 499, // cents — the floor
  defaultAmount: 499,
  file: 'PROMPT-PACK.pdf',
};

export const ADDONS = [
  {
    id: 'kit',
    name: 'Machine-Readable Kit',
    price: 900,
    blurb:
      'Every prompt as JSON and Markdown plus the scene-pack schema, so you can paste it straight into your own model or script instead of retyping from the PDF.',
    file: 'MACHINE-READABLE-KIT.zip',
  },
  {
    id: 'toolkit',
    name: 'Production Toolkit (scripts)',
    price: 1900,
    blurb:
      'The working scripts: the motion-job builder with the divisible-by-32 guard, the assembler that cuts to the measured narration grid and bakes the opener and end card, and the QC gate script (decode, loudness, true peak, contact sheets).',
    file: 'PRODUCTION-TOOLKIT.zip',
  },
  {
    id: 'allaccess',
    name: 'Every Future Pack — 12 months',
    price: 2900,
    blurb:
      'One-time payment, not a subscription. Each new episode ships its own pack; for the next 12 months every release lands in your inbox the day it goes out. No auto-renew.',
    file: null,
  },
  {
    id: 'commercial',
    name: 'Commercial License',
    price: 2500,
    blurb:
      'The base pack is licensed for your own channels. This extends it to paid client work and work-for-hire.',
    file: null,
  },
];

export const byId = (id) => ADDONS.find((a) => a.id === id);

const secret = () => process.env.PROMPT_PACK_SECRET || '';

// Stateless fulfilment: the entitlement travels in an HMAC-signed token, so a
// download link cannot be forged and expires on its own. No database required.
export function signGrant(payload, ttlHours = 72) {
  const body = { ...payload, exp: Date.now() + ttlHours * 3600 * 1000 };
  const raw = Buffer.from(JSON.stringify(body)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(raw).digest('base64url');
  return `${raw}.${sig}`;
}

export function verifyGrant(token) {
  if (!token || !token.includes('.')) return null;
  const [raw, sig] = token.split('.');
  const expect = crypto.createHmac('sha256', secret()).update(raw).digest('base64url');
  if (sig.length !== expect.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null;
  const body = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8'));
  if (!body.exp || Date.now() > body.exp) return null;
  return body;
}
