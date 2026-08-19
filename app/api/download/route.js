import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { verifyGrant } from '../../../lib/prompt-packs';

export const runtime = 'nodejs';

// The repo is public (GitHub Pages for another site depends on that), so paid
// packs are committed as AES-256-GCM ciphertext in packs-enc/ and decrypted here
// at request time. The key derives from PROMPT_PACK_SECRET, which exists only in
// the environment — never in the repo.
const ENC_DIR = path.join(process.cwd(), 'packs-enc');

function decrypt(file) {
  const raw = fs.readFileSync(file);
  const key = crypto
    .createHash('sha256')
    .update('pack-file:' + (process.env.PROMPT_PACK_SECRET || ''))
    .digest();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, raw.subarray(0, 12));
  decipher.setAuthTag(raw.subarray(12, 28));
  return Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]);
}

// One grant = one file. Multi-item orders get one link per file in the email.
export async function GET(req) {
  const token = new URL(req.url).searchParams.get('t');
  const grant = verifyGrant(token);
  if (!grant) return new Response('This link is invalid or has expired.', { status: 403 });

  const name = path.basename(grant.file || (grant.files && grant.files[0]) || '');
  const file = path.join(ENC_DIR, name + '.enc');
  if (!name || !fs.existsSync(file)) return new Response('File not found.', { status: 404 });

  let buf;
  try {
    buf = decrypt(file);
  } catch {
    return new Response('Download temporarily unavailable.', { status: 500 });
  }
  return new Response(buf, {
    headers: {
      'Content-Type': name.endsWith('.pdf') ? 'application/pdf' : 'application/zip',
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'no-store',
    },
  });
}
