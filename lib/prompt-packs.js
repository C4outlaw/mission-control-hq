import crypto from 'crypto';

// One pack per episode/artist. Buyers browse the carousel and buy the pack for the
// artist they care about, so each entry carries its own cover art and PDF.
export const PACKS = [
  {
    id: 'spice',
    subject: 'Spice',
    name: 'Spice — Prompt Pack',
    tagline: 'Queen of Dancehall',
    cover: '/prompts/covers/spice-v2.jpg',
    file: 'SPICE-PROMPT-PACK.pdf',
    shots: 48,
    blurb:
      'The full production system behind the Spice documentary short: research discipline, character continuity, narration timing, the shot-per-phrase grid, model settings and QC gates.',
  },
  {
    id: 'ninjaman',
    subject: 'Ninjaman',
    name: 'Ninjaman — Prompt Pack',
    tagline: 'Don Gorgon',
    cover: '/prompts/covers/ninjaman-v2.jpg',
    file: 'NINJAMAN-PROMPT-PACK.pdf',
    shots: 30,
    blurb:
      'Every prompt, model setting and quality gate behind the Ninjaman episode — including how to build a character card that actually holds a likeness across thirty shots.',
  },
  {
    id: 'baby-videos',
    subject: 'Baby Videos',
    name: 'Baby Videos — Prompt Pack',
    tagline: 'The whole toddler-comedy system',
    cover: '/prompts/covers/luna-baby-videos-v1.jpg',
    file: 'BABY-VIDEOS-PROMPT-PACK.pdf',
    shots: 4,
    blurb:
      'The complete system behind the toddler comedy shorts: the four-shot structure measured from a 19.4M-view competitor, the locked character card that keeps the same baby across every episode, native in-model dialogue with real lip sync, and the lossless audio chain that fixes the artifacting nobody else tells you about. Runs entirely on your own GPU.',
  },
];

export const packById = (id) => PACKS.find((p) => p.id === id);

// Pay-what-you-want with a hard floor enforced by the server.
export const BASE = {
  minAmount: 499,
  defaultAmount: 499,
};

export const ADDONS = [
  {
    id: 'kit',
    name: 'Machine-Readable Kit',
    price: 900,
    blurb:
      'Every prompt as JSON and Markdown plus the scene-pack schema, so you can paste it straight into your own model instead of retyping from the PDF.',
    file: 'MACHINE-READABLE-KIT.zip',
  },
  {
    id: 'toolkit',
    name: 'Production Toolkit (scripts)',
    price: 1900,
    blurb:
      'The working scripts: the motion-job builder with the divisible-by-32 guard, the assembler that cuts to the measured narration grid, and the QC gate script.',
    file: 'PRODUCTION-TOOLKIT.zip',
  },
  {
    id: 'allaccess',
    name: 'Every Future Pack — 12 months',
    price: 2900,
    blurb:
      'One-time payment, not a subscription. Every new artist pack we release lands in your inbox for the next 12 months. No auto-renew.',
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
