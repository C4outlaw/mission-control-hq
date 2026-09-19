/**
 * Reframe store product shots to the 4:5 portrait the gallery grid expects.
 *
 * The reference fashion sites shoot 5:7 portrait. Our mockups are square
 * (Printify, 1200x1200) or landscape (premium, 1920x1280), so a cover-crop to
 * portrait would eat the shoulders and the top of the print. Instead of
 * cropping we EXTEND the frame: the sharp image is centred at full width over
 * a heavily blurred, over-scaled copy of itself, so the studio backdrop
 * continues past the original edges instead of ending in a hard band.
 *
 * Originals are copied to public/store/_orig-<date>/ before anything is
 * overwritten. Re-running is safe: anything already 4:5 is skipped.
 *
 *   node scripts/portraitize.mjs            # dry run, reports what it would do
 *   node scripts/portraitize.mjs --write    # actually rewrite
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'public', 'store');
const DIRS = ['drop', 'premium'];
const TARGET = 4 / 5;
const TOL = 0.02;
const WRITE = process.argv.includes('--write');
const BACKUP = path.join(ROOT, `_orig-${new Date().toISOString().slice(0, 10)}`);

/** Portrait frame that never shrinks the source: keep full width, grow height. */
const frameFor = (w, h) => {
  const outW = w;
  const outH = Math.round(w / TARGET);
  return outH >= h ? { outW, outH } : { outW: Math.round(h * TARGET), outH: h };
};

async function reframe(file) {
  const img = sharp(file);
  const meta = await img.metadata();
  const { width: w, height: h, format } = meta;
  const aspect = w / h;
  if (Math.abs(aspect - TARGET) < TOL) return { file, skipped: 'already 4:5' };

  const { outW, outH } = frameFor(w, h);
  const src = await img.clone().toBuffer();

  // Backdrop: the same shot, blown up to fill the taller frame and blurred hard,
  // so the extension carries the original's own colour and vignette.
  const backdrop = await sharp(src)
    .resize(outW, outH, { fit: 'cover', position: 'centre' })
    .blur(48)
    .modulate({ brightness: 0.94 })
    .toBuffer();

  const fitted = await sharp(src).resize(outW, null, { fit: 'inside' }).toBuffer();
  const fm = await sharp(fitted).metadata();

  let out = sharp(backdrop).composite([
    { input: fitted, left: Math.round((outW - fm.width) / 2), top: Math.round((outH - fm.height) / 2) },
  ]);
  out = format === 'webp' ? out.webp({ quality: 88 }) : out.jpeg({ quality: 88, mozjpeg: true });

  if (WRITE) {
    const rel = path.relative(ROOT, file);
    const dest = path.join(BACKUP, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (!fs.existsSync(dest)) fs.copyFileSync(file, dest);
    fs.writeFileSync(file, await out.toBuffer());
  }
  return { file, from: `${w}x${h}`, to: `${outW}x${outH}` };
}

let changed = 0, skipped = 0;
for (const d of DIRS) {
  const dir = path.join(ROOT, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    const r = await reframe(path.join(dir, f));
    if (r.skipped) { skipped++; continue; }
    changed++;
    if (changed <= 6) console.log(`  ${d}/${f}  ${r.from} -> ${r.to}`);
  }
}
console.log(`\n${WRITE ? 'rewrote' : 'would rewrite'} ${changed} images, skipped ${skipped} already 4:5`);
if (WRITE) console.log(`originals backed up to ${path.relative(process.cwd(), BACKUP)}`);
else console.log('dry run — pass --write to apply');
