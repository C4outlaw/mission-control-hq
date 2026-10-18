// End-to-end check of the Bush Medicine paid download against a running server
// (default http://localhost:3311). Mints grants with PROMPT_PACK_SECRET from .env.local
// exactly as the webhook does, never prints it, and asserts:
//   - a valid book grant reaches the assembler page, which mints slice grants
//   - every slice downloads, and the joined bytes match the published SHA-256
//   - the change log downloads
//   - missing, tampered, expired and wrong-type grants are refused
//   - the public preview is the 12-page sample, never the full book
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const base = process.argv[2] || 'http://localhost:3311';
const env = fs.readFileSync(path.join(root, '.env.local'), 'utf8');
const secret = (env.match(/^PROMPT_PACK_SECRET=(.*)$/m) || [])[1]?.trim();
if (!secret) throw new Error('PROMPT_PACK_SECRET missing from .env.local');
const book = JSON.parse(fs.readFileSync(path.join(root, 'lib', 'bush-medicine-parts.json'), 'utf8'));

const sign = (payload, ttlMs) => {
  const raw = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + ttlMs })).toString('base64url');
  return `${raw}.${crypto.createHmac('sha256', secret).update(raw).digest('base64url')}`;
};
const sid = 'cs_test_bookdownloadcheck';
let failed = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}`);
  if (!ok) failed++;
};
const get = (p) => fetch(base + p, { cache: 'no-store' });

(async () => {
  const good = sign({ sid, book: 'bush-medicine-illustrated-2026' }, 3600e3);
  const page = await (await get(`/store/book-download?t=${encodeURIComponent(good)}`)).text();
  const urls = [...page.matchAll(/\/api\/download\?t=[A-Za-z0-9%_.\-]+/g)].map((m) => m[0]);
  const unique = [...new Set(urls)];
  check(unique.length === book.parts.length, `assembler page minted ${unique.length}/${book.parts.length} slice links`);

  const chunks = [];
  for (const u of unique) {
    const r = await get(u);
    check(r.ok && r.headers.get('content-type') === 'application/octet-stream', `slice ${chunks.length + 1} ${r.status}`);
    chunks.push(Buffer.from(await r.arrayBuffer()));
  }
  const joined = Buffer.concat(chunks);
  const hash = crypto.createHash('sha256').update(joined).digest('hex');
  check(joined.length === book.bytes && hash === book.sha256, `joined PDF ${joined.length} bytes sha256 ${hash}`);

  const log = await get(`/api/download?t=${encodeURIComponent(sign({ sid, file: book.changeLog.file }, 3600e3))}`);
  check(log.ok && (await log.arrayBuffer()).byteLength === book.changeLog.bytes, `change log ${log.status}`);

  const refused = async (label, url, needle) => {
    const r = await get(url);
    const body = await r.text();
    check(needle ? body.includes(needle) && !/\/api\/download\?t=/.test(body) : r.status === 403, label);
  };
  const part = book.parts[0].file;
  await refused('no token -> 403', '/api/download', null);
  await refused('tampered slice grant -> 403', `/api/download?t=${encodeURIComponent(sign({ sid, file: part }, 3600e3).slice(0, -2) + 'xx')}`, null);
  await refused('expired slice grant -> 403', `/api/download?t=${encodeURIComponent(sign({ sid, file: part }, -1000))}`, null);
  await refused('assembler without token refuses', '/store/book-download', 'invalid or has expired');
  await refused('assembler with expired grant refuses', `/store/book-download?t=${encodeURIComponent(sign({ sid, book: 'bush-medicine-illustrated-2026' }, -1000))}`, 'invalid or has expired');
  await refused('assembler with a sticker-pack grant refuses', `/store/book-download?t=${encodeURIComponent(sign({ sid, book: 'patwa-sticker-pack' }, 3600e3))}`, 'invalid or has expired');
  await refused('assembler with forged signature refuses', `/store/book-download?t=${encodeURIComponent(good.split('.')[0] + '.forged')}`, 'invalid or has expired');

  const full = await get('/store/BUSH-MEDICINE-FULL-COLOR.pdf');
  check(full.status === 404, `full PDF not public (${full.status})`);
  const preview = await get('/store/bush-medicine-preview.pdf');
  const pv = Buffer.from(await preview.arrayBuffer());
  check(preview.ok && pv.length < book.bytes / 4, `public preview ${pv.length} bytes`);

  console.log(failed ? `${failed} check(s) failed` : 'all checks passed');
  process.exit(failed ? 1 : 0);
})();
