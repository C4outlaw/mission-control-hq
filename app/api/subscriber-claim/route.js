import crypto from 'crypto';
import { signGrant } from '../../../lib/prompt-packs';

export const runtime = 'nodejs';

// Facebook subscribers claim their free bundle here. The gate is the subscriber
// list, not the link: Facebook shares subscriber emails with the Page, and we
// keep only SHA-256 hashes of them so neither the (public) repo nor the
// environment ever holds a raw address.
//
// Refresh after new subscribers join:
//   Monetize > Subscriptions > Subscriber list > Download all subscriber info
//   node scripts/hash-subscribers.js <csv>   ->  paste into SUBSCRIBER_HASHES
const BUNDLE = 'LOST-JAMAICAN-SUBSCRIBER-BUNDLE.zip';

// Short window: the link is meant to be used once, immediately, on the device
// that asked for it. It is not DRM — see the note in the claim page copy.
const TTL_HOURS = 0.5;

const norm = (e) => String(e || '').trim().toLowerCase();
const hash = (e) => crypto.createHash('sha256').update('subscriber:' + norm(e)).digest('hex');

function allowlist() {
  return new Set(
    (process.env.SUBSCRIBER_HASHES || '')
      .split(/[,\s]+/)
      .map((h) => h.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function POST(req) {
  let email;
  try {
    ({ email } = await req.json());
  } catch {
    return Response.json({ error: 'Bad request.' }, { status: 400 });
  }

  if (!norm(email).includes('@')) {
    return Response.json({ error: 'Enter the email address you subscribed with.' }, { status: 400 });
  }

  const list = allowlist();
  if (!list.size) {
    // Fail closed. An empty allowlist must never mean "let everyone in".
    return Response.json(
      { error: 'Claims are not open yet. Please try again shortly.' },
      { status: 503 }
    );
  }

  if (!list.has(hash(email))) {
    return Response.json(
      {
        error:
          'We could not find that email on the subscriber list. Use the address ' +
          'attached to your Facebook subscription — it can take a few minutes ' +
          'after subscribing to appear.',
      },
      { status: 403 }
    );
  }

  let token;
  try {
    token = signGrant({ file: BUNDLE, sub: hash(email) }, TTL_HOURS);
  } catch {
    return Response.json({ error: 'Downloads are temporarily unavailable.' }, { status: 500 });
  }

  return Response.json({
    url: `/api/download?t=${token}`,
    expiresInMinutes: Math.round(TTL_HOURS * 60),
  });
}
