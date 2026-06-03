// One-off: optimize raw Beach Bucket dish photos -> web JPGs.
// Reads top-level PNGs from the Desktop "food pictures BB" folder, resizes to
// max 1400px, and writes quality-82 JPGs into the site's dishes asset folder.
import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/email/OneDrive/Desktop/food pictures BB';
const OUT = 'C:/Users/email/OneDrive/Documents/New project/MyrieHQ-site/public/assets/work/beach-bucket-design/dishes';

mkdirSync(OUT, { recursive: true });

const slug = (name) =>
  name
    .replace(/\.[^.]+$/, '')        // drop extension
    .replace(/_raw$/i, '')          // drop _raw suffix
    .replace(/^\d+[_\s-]*/, '')     // drop leading number
    .trim()
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

const title = (s) =>
  s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const files = readdirSync(SRC).filter(
  (f) => /\.(png|jpe?g)$/i.test(f) && statSync(join(SRC, f)).isFile()
);

const manifest = [];
for (const f of files) {
  const s = slug(f);
  const outName = `${s}.jpg`;
  await sharp(join(SRC, f))
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, outName));
  manifest.push({ file: outName, caption: title(s) });
}

manifest.sort((a, b) => a.caption.localeCompare(b.caption));
console.log(JSON.stringify(manifest, null, 2));
console.log(`\nDONE: ${manifest.length} dishes -> ${OUT}`);
