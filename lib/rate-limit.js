// Per-IP burst brake for the public forms that end in an email to Myrie (contact, free-pack,
// store-notify, luna-chat, prompt-pack-free). Security audit 2026-10-23.
// Serverless instances do not share memory, so this is not a hard quota - it stops a loop that
// would otherwise mail Myrie hundreds of times a minute from one address. Honeypots stay first-line.
const buckets = new Map();

export function tooManyRequests(req, { limit = 8, windowMs = 60_000 } = {}) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const hits = (buckets.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(ip, hits);
    return Response.json({ ok: false, error: 'too-many-requests' }, { status: 429 });
  }
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  return null;
}
