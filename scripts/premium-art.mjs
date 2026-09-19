/**
 * Render print-ready artwork for the premium line.
 *
 * The premium pieces only ever existed as photographs of shirts, which cannot
 * be printed. These designs are pure typography, so the honest way to get a
 * print file is to set the type at print resolution rather than try to lift it
 * out of a mockup: the letterforms stay crisp, the spacing is exact, and the
 * result is genuinely transparent.
 *
 * Cream ink on a black garment, so the art is cream with a clear background.
 *
 *   node scripts/premium-art.mjs
 */
// playwright is not a dependency of this site, so reach the installed copy
// directly rather than adding a build-time package for a one-off art script.
const pw = await import(
  'file:///D:/Documents/Codex/myrie-os-scheduler/server/node_modules/playwright-core/index.js'
);
const chromium = pw.chromium || pw.default?.chromium;
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public', 'store', 'premium-art');
fs.mkdirSync(OUT, { recursive: true });

const INK = '#F2EBDC';            // the cream used across the premium mockups
const W = 3600;                   // 12in at 300dpi across the chest

// Only the pieces that are genuinely typographic. The 876 numerals and the
// Lost Jamaican X emblem are artwork, not type, and are left out rather than
// approximated.
const DESIGNS = [
  { key: 'pa-neverlose', line: 'WE NEVER LOSE' },
  { key: 'pa-moremoney', line: 'MORE MONEY THAN LAST YEAR' },
  { key: 'pa-wahgwaan', line: 'WAH GWAAN' },
  { key: 'pa-tallawah', line: 'LIKKLE BUT TALLAWAH' },
  { key: 'pa-notperfect', line: 'NOT PERFECT BUT JAMAICAN' },
  { key: 'pa-cho', line: 'CHO!' },
  { key: 'pa-rhaatid', line: 'RHAATID!' },
  { key: 'pa-sooncome', line: 'SOON COME' },
  { key: 'pa-dunkno', line: 'DUN KNO' },
  { key: 'pa-kissmiteeth', line: 'KISS MI TEETH' },
  { key: 'pa-walkgood', line: 'WALK GOOD' },
  { key: 'pa-believe', line: 'BELIEVE INNA YUHSELF' },
];

const html = (line) => `<!doctype html><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Barlow+Condensed:wght@500&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;background:transparent}
  .c{width:${W}px;display:flex;flex-direction:column;align-items:center;gap:76px;padding:40px 0}
  .line{
    font:400 300px/1.08 "Playfair Display",Didot,"Bodoni MT",Georgia,serif;
    color:${INK};
    letter-spacing:.06em;
    text-indent:.06em;
    text-align:center;
    white-space:nowrap;
  }
  .house{
    font:500 78px/1 "Barlow Condensed",Arial Narrow,sans-serif;
    color:${INK};
    letter-spacing:.52em;
    text-indent:.52em;
    opacity:.92;
  }
</style>
<div class="c">
  <div class="line" id="line">${line}</div>
  <div class="house">THE LOST JAMAICAN</div>
</div>`;

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

for (const d of DESIGNS) {
  const page = await browser.newPage({ viewport: { width: W, height: 1400 }, deviceScaleFactor: 1 });
  await page.setContent(html(d.line), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // A long phrase must not run past the print area, so shrink it until it fits.
  await page.evaluate((max) => {
    const el = document.getElementById('line');
    let size = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > max && size > 60) {
      size *= 0.96;
      el.style.fontSize = `${size}px`;
    }
  }, W * 0.92);
  await page.waitForTimeout(250);

  const box = await page.locator('.c').boundingBox();
  const file = path.join(OUT, `${d.key}.png`);
  await page.screenshot({ path: file, omitBackground: true, clip: box });
  await page.close();
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`  ${d.key.padEnd(16)} ${d.line.padEnd(26)} ${Math.round(box.width)}x${Math.round(box.height)}  ${kb}KB`);
}

await browser.close();
console.log(`\n${DESIGNS.length} print files -> ${path.relative(process.cwd(), OUT)}`);
