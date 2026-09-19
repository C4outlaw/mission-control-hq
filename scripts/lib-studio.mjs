/** Lift a garment off its backdrop and re-stage it whole on a clean 4:5 plate. */
import sharp from 'sharp';

const TARGET = 4 / 5;

export async function studioPlate(src, outPath, { plate = '#f4f2ef', fill = 0.80 } = {}) {
  const buf = await sharp(src).toBuffer();
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const at = (i) => [data[i], data[i + 1], data[i + 2]];
  const bg = at(0);
  const near = (i) => {
    const c = at(i);
    return Math.abs(c[0] - bg[0]) + Math.abs(c[1] - bg[1]) + Math.abs(c[2] - bg[2]) < 90;
  };
  // Flood inward from the border only, so backdrop-coloured pixels INSIDE the
  // garment (white lettering on a black tee) survive.
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
  const trimmed = await sharp(data, { raw: { width: W, height: H, channels: C } }).png()
    .trim({ threshold: 1 }).toBuffer();
  const tm = await sharp(trimmed).metadata();
  const kept = (tm.width * tm.height) / (W * H);
  const source = kept < 0.04 ? buf : trimmed;   // garment matched the backdrop; keep it whole

  const outW = 1200, outH = Math.round(outW / TARGET);
  const fitted = await sharp(source)
    .resize(Math.round(outW * fill), Math.round(outH * fill), { fit: 'inside' })
    .toBuffer();
  const fm = await sharp(fitted).metadata();
  await sharp({ create: { width: outW, height: outH, channels: 3, background: plate } })
    .composite([{ input: fitted, left: Math.round((outW - fm.width) / 2), top: Math.round((outH - fm.height) / 2) }])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outPath);
  return `${outW}x${outH} ${kept < 0.04 ? 'whole-source' : 'cut-out'}`;
}
