import { readMetrics } from '../../../lib/studio/showreel.mjs';
// Public read-only contract. Connect an authorized server-side provider here.
// No tokens, scraping or account access are assumed. CDN refreshes every 5 min.
export async function GET() {
  return Response.json({ metrics: await readMetrics(), refreshedAt: new Date().toISOString(), connected: false }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
  });
}
