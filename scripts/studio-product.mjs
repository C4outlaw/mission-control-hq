/**
 * Re-stage every colourway of a product as a full, uncropped garment on the
 * shared plate, and point the catalogue at the results.
 *
 * A product's colourways ARE its views: same design, same framing, different
 * colour. Nothing is cropped, and the colour swatches drive the gallery.
 *
 *   node scripts/studio-product.mjs <productKey> [...more keys]
 */
import fs from 'fs';
import path from 'path';

import { studioPlate } from './lib-studio.mjs';

const MAP = 'lib/printify-map.json';
const OUT = 'public/store/views';
const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
fs.mkdirSync(OUT, { recursive: true });

const keys = process.argv.slice(2);
if (!keys.length) { console.error('usage: studio-product.mjs <productKey> [...]'); process.exit(1); }

for (const key of keys) {
  const p = map.products[key];
  if (!p) { console.error(`  ! ${key} not in map`); continue; }
  const colours = p.colors || [];
  const images = {};
  for (const c of colours) {
    const src = p.images?.[c];
    const disk = src && path.join('public', src.split('?')[0]);
    if (!disk || !fs.existsSync(disk)) { console.error(`  ! ${key}/${c}: missing ${src}`); continue; }
    const slug = `${key}--${c.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const out = path.join(OUT, `${slug}.jpg`);
    const info = await studioPlate(disk, out);
    images[c] = `/${path.relative('public', out).split(path.sep).join('/')}`;
    console.log(`  ${key}/${c}  ${info}`);
  }
  if (Object.keys(images).length) {
    p.images = { ...p.images, ...images };
    if (images[colours[0]]) p.images.default = images[colours[0]];
    p.gallery = [];   // the colourways are the views; no crops
  }
}
fs.writeFileSync(MAP, JSON.stringify(map, null, 1));
console.log('catalogue updated');
