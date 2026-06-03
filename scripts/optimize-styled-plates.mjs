// One-off: optimize the UGC-ready styled plates (dish in an oceanfront scene,
// no text) -> web JPGs for the "styled, without description" coverflow group.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/email/OneDrive/Pictures/THE BEACH BUCKET IMAGES/Break Fast Picture/Output/ugc_ready_plates';
const OUT = 'C:/Users/email/OneDrive/Documents/New project/MyrieHQ-site/public/assets/work/beach-bucket-design/plates-styled';

mkdirSync(OUT, { recursive: true });

const title = (f) =>
  f.replace(/\.[^.]+$/, '')
    .replace(/^\d+[_-]*/, '')      // drop leading number
    .replace(/_ugc_ready$/i, '')   // drop suffix
    .split('_').join(' ')
    .split('-').join(' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const files = readdirSync(SRC).filter((f) => /_ugc_ready\.png$/i.test(f));

const manifest = [];
for (const f of files) {
  const out = f.replace(/_ugc_ready\.png$/i, '.jpg');
  await sharp(join(SRC, f))
    .resize({ width: 1500, height: 1500, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, out));
  manifest.push({ src: out, cap: title(f) });
}
console.log(JSON.stringify(manifest));
console.log(`\nDONE: ${manifest.length} styled plates -> ${OUT}`);
