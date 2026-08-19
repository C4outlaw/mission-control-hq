import fs from 'fs';
import path from 'path';
import { verifyGrant } from '../../../lib/prompt-packs';

export const runtime = 'nodejs';

// Pack files live OUTSIDE public/ so they are only reachable through a signed grant.
const PACK_DIR = process.env.PACK_DIR || path.join(process.cwd(), 'private', 'packs');

// One grant = one file. Multi-item orders get one link per file in the email —
// no zip dependency, and each link fails or succeeds independently.
export async function GET(req) {
  const token = new URL(req.url).searchParams.get('t');
  const grant = verifyGrant(token);
  if (!grant) return new Response('This link is invalid or has expired.', { status: 403 });

  const name = path.basename(grant.file || (grant.files && grant.files[0]) || '');
  const file = path.join(PACK_DIR, name);
  if (!name || !fs.existsSync(file)) return new Response('File not found.', { status: 404 });

  const buf = fs.readFileSync(file);
  return new Response(buf, {
    headers: {
      'Content-Type': name.endsWith('.pdf') ? 'application/pdf' : 'application/zip',
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'no-store',
    },
  });
}
