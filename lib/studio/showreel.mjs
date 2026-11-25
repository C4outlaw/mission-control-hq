export const showreel = [
  { id: '7676343335270862094', title: 'Vybz Kartel', category: 'Artist storytelling', duration: '2:33' },
  { id: '7674642860553096462', title: 'Beres Hammond', category: 'Music & culture', duration: '2:13' },
  { id: '7700302580332776718', title: 'Michael Manley · Part 1', category: 'Jamaican history', duration: '3:34' },
];
export const sourceUrl = id => `https://www.tiktok.com/@thelostjamaican/video/${id}`;
// No invented counters. A provider may supply verified, timestamped snapshots.
// Return null for unavailable/private/deleted posts; never substitute zero.
export function normalizeMetric(value, now = Date.now()) {
  if (!value || !Number.isFinite(value.count) || value.count < 0 || !value.observedAt || !value.sourceUrl) return null;
  const observed = Date.parse(value.observedAt);
  if (!Number.isFinite(observed) || observed > now || now - observed > 86400000) return null;
  try { const u = new URL(value.sourceUrl); if (u.protocol !== 'https:' || !['www.tiktok.com','www.instagram.com','www.facebook.com'].includes(u.hostname)) return null; } catch { return null; }
  return { count: value.count, approximate: !!value.approximate, observedAt: value.observedAt, sourceUrl: value.sourceUrl };
}
export async function readMetrics(provider = null, now = Date.now()) {
  return Object.fromEntries(await Promise.all(showreel.map(async video => {
    try { return [video.id, normalizeMetric(provider ? await provider(video) : null, now)]; }
    catch { return [video.id, null]; }
  })));
}
