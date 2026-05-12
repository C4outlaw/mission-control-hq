#!/usr/bin/env node
// Compress dist/assets/menu/* and dist/assets/facebook/all/* down to ~200-250KB target.
// Resizes to max 1200px on longest edge, JPEG q72, mozjpeg.

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist/assets');

const TARGETS = [
  path.join(DIST, 'menu'),
  path.join(DIST, 'facebook', 'all'),
];

const MAX_EDGE = 1200;
const Q = 72;

async function walk(dir) {
  const out = [];
  const ents = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p);
  }
  return out;
}

let saved = 0, total = 0, count = 0;
for (const root of TARGETS) {
  const files = await walk(root);
  console.log(`[compress] ${files.length} files in ${path.basename(root)}`);
  for (const f of files) {
    const before = (await fs.stat(f)).size;
    try {
      const buf = await sharp(f, { failOn: 'none' })
        .rotate()
        .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: Q, mozjpeg: true, progressive: true })
        .toBuffer();
      // Replace as .jpg
      const newPath = f.replace(/\.(png|webp|jpeg)$/i, '.jpg');
      if (newPath !== f) await fs.unlink(f);
      await fs.writeFile(newPath, buf);
      const after = buf.length;
      saved += before - after;
      total += after;
      count++;
      if (count % 20 === 0) process.stdout.write(`  ${count} done, saved ${(saved/1024/1024).toFixed(1)}MB so far\n`);
    } catch (err) {
      console.error('FAIL', f, err.message);
    }
  }
}
console.log(`[compress] done: ${count} files, total now ${(total/1024/1024).toFixed(1)}MB, saved ${(saved/1024/1024).toFixed(1)}MB`);
