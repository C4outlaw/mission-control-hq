/**
 * Build a coherent 4:5 view set for one product from a single source shot.
 *
 * The reference fashion sites show the same garment several ways — full front,
 * then closer crops on the print and the fabric. Our mockups were a grab-bag:
 * a product's "gallery" could hold a blank shirt and a different design
 * entirely. Deriving every view from ONE source guarantees the set is the same
 * garment, which is most of what makes their product pages feel considered.
 *
 *   node scripts/product-views.mjs <source> <out-dir> <slug>
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TARGET = 4 / 5;

/** Bounding box of the garment: pixels that differ from the corner colour. */
async function garmentBox(buf) {
  const S = 200;
  const { data, info } = await sharp(buf).resize(S, S, { fit: 'fill' }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
  const bg = px(2, 2);
  const far = (c) => Math.abs(c[0] - bg[0]) + Math.abs(c[1] - bg[1]) + Math.abs(c[2] - bg[2]) > 60;
  let x0 = info.width, y0 = info.height, x1 = 0, y1 = 0, hit = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    if (!far(px(x, y))) continue;
    hit++;
    if (x < x0) x0 = x; if (x > x1) x1 = x;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  if (hit < 200) return null;                       // uniform image, no subject
  return { x0: x0 / S, y0: y0 / S, x1: x1 / S, y1: y1 / S };
}

/** Average colour of the four corners — the studio backdrop. */
async function bgColour(buf) {
  const { data, info } = await sharp(buf).resize(60, 60, { fit: 'fill' }).removeAlpha()
    .raw().toBuffer({ resolveWithObject: true });
  const at = (x, y) => { const i = (y * info.width + x) * info.channels; return [data[i], data[i + 1], data[i + 2]]; };
  const pts = [at(1, 1), at(58, 1), at(1, 58), at(58, 58)];
  const avg = [0, 1, 2].map((c) => Math.round(pts.reduce((s2, p2) => s2 + p2[c], 0) / pts.length));
  // Spread across the corners tells us whether the backdrop is flat enough to extend.
  const spread = Math.max(...[0, 1, 2].map((c) => Math.max(...pts.map((p2) => p2[c])) - Math.min(...pts.map((p2) => p2[c]))));
  return { r: avg[0], g: avg[1], b: avg[2], flat: spread < 26 };
}

/**
 * Render one 4:5 view.
 *  - `pad`  keeps the whole garment and extends the backdrop around it, so
 *           nothing is ever cropped off a full-product shot.
 *  - `cover` is for crops already inside the garment, where there is no
 *           backdrop to fake and a straight crop is simply cleaner.
 */
async function frame(buf, region, outPath, mode) {
  const meta = await sharp(buf).metadata();
  const W = meta.width, H = meta.height;
  let left = Math.max(0, Math.round(region.x0 * W));
  let top = Math.max(0, Math.round(region.y0 * H));
  let w = Math.min(Math.round((region.x1 - region.x0) * W), W - left);
  let h = Math.min(Math.round((region.y1 - region.y0) * H), H - top);
  const cropped = await sharp(buf).extract({ left, top, width: w, height: h }).toBuffer();

  const outW = 1200, outH = Math.round(outW / TARGET);
  if (mode === 'cover') {
    await sharp(cropped).resize(outW, outH, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
    return `${outW}x${outH} cover`;
  }

  // A 4:5 window cut straight out of the source, as large as the source allows
  // and centred on the garment. Nothing synthetic is painted, so there is no
  // seam or tone shift where a fake backdrop would have met the real one.
  const cx0 = left + w / 2, cy0 = top + h / 2;
  let winW = Math.min(W, Math.round(Math.max(w, h * TARGET) * 1.18));
  let winH = Math.round(winW / TARGET);
  if (winH > H) { winH = H; winW = Math.round(winH * TARGET); }
  let wl = Math.round(cx0 - winW / 2), wt = Math.round(cy0 - winH / 2);
  wl = Math.max(0, Math.min(wl, W - winW));
  wt = Math.max(0, Math.min(wt, H - winH));
  await sharp(buf).extract({ left: wl, top: wt, width: winW, height: winH })
    .resize(outW, outH, { fit: 'fill' })
    .jpeg({ quality: 90, mozjpeg: true }).toFile(outPath);
  return `${outW}x${outH} window`;
}


/**
 * Cut the garment off its backdrop and re-stage it whole on a clean 4:5 plate.
 *
 * Cropping a window out of the source always sacrifices something — a shoulder,
 * a sleeve, the hem. Lifting the garment out instead means the entire shirt is
 * in frame with air around it, and every product sits on the same ground, which
 * is what makes a luxury grid look like one shoot rather than 32 stock photos.
 *
 * Flood-fills inward from the border, so backdrop colour that also appears
 * INSIDE the garment (white lettering on a black tee) is never punched out.
 */
async function studio(buf, outPath, { plate = '#f4f2ef', fill = 0.80 } = {}) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const at = (i) => [data[i], data[i + 1], data[i + 2]];
  const bg = at(0);
  const near = (i) => {
    const c = at(i);
    return Math.abs(c[0] - bg[0]) + Math.abs(c[1] - bg[1]) + Math.abs(c[2] - bg[2]) < 90;
  };
  const seen = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const q = stack.pop();
    if (seen[q]) continue;
    const i = q * C;
    if (!near(i)) continue;
    seen[q] = 1;
    data[i + 3] = 0;
    const x = q % W, y = (q - x) / W;
    if (x > 0) stack.push(q - 1);
    if (x < W - 1) stack.push(q + 1);
    if (y > 0) stack.push(q - W);
    if (y < H - 1) stack.push(q + W);
  }
  let cut = sharp(data, { raw: { width: W, height: H, channels: C } }).png();
  const trimmed = await cut.trim({ threshold: 1 }).toBuffer();
  const tm = await sharp(trimmed).metadata();

  // If the knockout removed nearly everything, the garment shared the backdrop's
  // tone (black on black). Fall back to placing the source whole, uncropped.
  const kept = (tm.width * tm.height) / (W * H);
  const source = kept < 0.04 ? buf : trimmed;

  const outW = 1200, outH = Math.round(outW / TARGET);
  const boxW = Math.round(outW * fill), boxH = Math.round(outH * fill);
  const fitted = await sharp(source).resize(boxW, boxH, { fit: 'inside' }).toBuffer();
  const fm = await sharp(fitted).metadata();
  await sharp({ create: { width: outW, height: outH, channels: 3, background: plate } })
    .composite([{
      input: fitted,
      left: Math.round((outW - fm.width) / 2),
      top: Math.round((outH - fm.height) / 2),   // centred, full garment, nothing clipped
    }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outPath);
  return `${outW}x${outH} studio(${kept < 0.04 ? 'whole-source' : 'cut-out'})`;
}

const [src, outDir, slug] = process.argv.slice(2);
if (!src || !outDir || !slug) { console.error('usage: product-views.mjs <source> <out-dir> <slug>'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const buf = await sharp(src).toBuffer();
const box = await garmentBox(buf) || { x0: 0, y0: 0, x1: 1, y1: 1 };
const pad = 0.05;
const full = {
  x0: Math.max(0, box.x0 - pad), y0: Math.max(0, box.y0 - pad),
  x1: Math.min(1, box.x1 + pad), y1: Math.min(1, box.y1 + pad),
};
// The print sits mid-chest; the second crop pulls back to show it on the fabric.
const cx = (full.x0 + full.x1) / 2, cy = (full.y0 + full.y1) / 2;
const gw = full.x1 - full.x0, gh = full.y1 - full.y0;
// Three views that always hold up: the whole garment, the print on the chest,
// and a fabric crop off the shoulder. The fabric crop carries no lettering, so
// it can never slice a word the way a tight crop on the print would.
const chest  = { x0: cx - gw * 0.48, x1: cx + gw * 0.48, y0: full.y0 + gh * 0.04, y1: cy + gh * 0.34 };
const fabric = { x0: full.x0 + gw * 0.02, x1: full.x0 + gw * 0.40, y0: full.y0 + gh * 0.06, y1: full.y0 + gh * 0.54 };

console.log(`  ${slug}--v1-front.jpg  ${await studio(buf, path.join(outDir, `${slug}--v1-front.jpg`))}`);
console.log(`  ${slug}--v2-chest.jpg  ${await frame(buf, chest, path.join(outDir, `${slug}--v2-chest.jpg`), 'cover')}`);
console.log(`  ${slug}--v3-fabric.jpg  ${await frame(buf, fabric, path.join(outDir, `${slug}--v3-fabric.jpg`), 'cover')}`);
console.log('done');
