// One-off: optimize raw plated-food photos -> web JPGs for the plates coverflow.
import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/email/OneDrive/Pictures/THE BEACH BUCKET IMAGES/Beach Bucket/Menu Dishes';
const OUT = 'C:/Users/email/OneDrive/Documents/New project/MyrieHQ-site/public/assets/work/beach-bucket-design/plates';

mkdirSync(OUT, { recursive: true });

const title = (s) =>
  s.replace(/\.[^.]+$/, '')
    .replace(/-plate$/i, '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

// Skip contact sheets / tiles (prefixed with "_")
const files = readdirSync(SRC).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('_') && statSync(join(SRC, f)).isFile()
);

const manifest = [];
for (const f of files) {
  const out = f.replace(/\.[^.]+$/, '.jpg');
  await sharp(join(SRC, f))
    .rotate()
    .resize({ width: 1500, height: 1500, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, out));
  manifest.push({ src: out, cap: title(f) });
}

manifest.sort((a, b) => a.cap.localeCompare(b.cap));
console.log(JSON.stringify(manifest));
console.log(`\nDONE: ${manifest.length} plates -> ${OUT}`);
