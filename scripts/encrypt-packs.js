// Encrypt private/packs/* into packs-enc/* so the paid files can live in the
// public repo (and therefore in the Vercel deployment) as ciphertext.
// Key is derived from PROMPT_PACK_SECRET, which exists only in the environment.
// Run after adding or updating any pack file, then commit packs-enc/.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const env = fs.readFileSync(path.join(root, '.env.local'), 'utf8');
const secret = (env.match(/^PROMPT_PACK_SECRET=(.*)$/m) || [])[1]?.trim();
if (!secret) throw new Error('PROMPT_PACK_SECRET missing from .env.local');
const key = crypto.createHash('sha256').update('pack-file:' + secret).digest();

const src = path.join(root, 'private', 'packs');
const dst = path.join(root, 'packs-enc');
fs.mkdirSync(dst, { recursive: true });

const requested = new Set(process.argv.slice(2));
const available = fs.readdirSync(src).filter((f) => !f.endsWith('.json'));
if (requested.size) {
  const missing = [...requested].filter((f) => !available.includes(f));
  if (missing.length) throw new Error(`Pack file not found: ${missing.join(', ')}`);
}

for (const f of available) {
  if (requested.size && !requested.has(f)) continue;
  if (f.endsWith('.json')) continue; // the ledger is not a product
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const data = Buffer.concat([cipher.update(fs.readFileSync(path.join(src, f))), cipher.final()]);
  // layout: 12-byte IV | 16-byte auth tag | ciphertext
  fs.writeFileSync(path.join(dst, f + '.enc'), Buffer.concat([iv, cipher.getAuthTag(), data]));
  console.log(`encrypted ${f} -> packs-enc/${f}.enc`);
}
