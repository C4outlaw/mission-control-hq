/**
 * Print-ready artwork for the two premium pieces that are not pure type.
 *
 * 876 and the Lost Jamaican X crest only ever existed as photographs of
 * shirts, which cannot be sent to a printer. Both are redrawn here at print
 * resolution to match those photographs: the crest as vector (crown, double
 * ring, laurel wreath, wordmark) and 876 as didone numerals banded with the
 * Jamaican stripe, exactly as the mockup shows.
 *
 * Gold ink on a black garment, so the art is gold with a clear background.
 *
 *   node scripts/premium-crest.mjs
 */
const pw = await import(
  'file:///D:/Documents/Codex/myrie-os-scheduler/server/node_modules/playwright-core/index.js'
);
const chromium = pw.chromium || pw.default?.chromium;
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'public', 'store', 'premium-art');
fs.mkdirSync(OUT, { recursive: true });

const GOLD = '#D7B579';       // the gold used across the premium mockups
const GREEN = '#0B7A3B';      // Jamaican flag green
const FLAG_GOLD = '#F2C438';  // Jamaican flag gold

/* ---------- the crest ---------- */

// A laurel wreath is a repeating shape on an arc, so it is drawn rather than
// traced: leaves alternate outside and inside the stem the way a real laurel
// does, which is what makes it read as a wreath and not a ring of blobs.
function wreath(cx, cy, R) {
  const parts = [];
  const LEAVES = 21;
  for (const side of [-1, 1]) {
    // From just under the crown, down the side, to the tie at the bottom.
    // 0 deg is the top of the ring; the branch starts beside the crown and
    // runs all the way down to where the two stems tie at the bottom.
    const from = 24, to = 168;
    const pts = [];
    for (let i = 0; i <= LEAVES; i++) {
      const t = i / LEAVES;
      const deg = from + (to - from) * t;
      const rad = (deg * Math.PI) / 180;
      // side -1 is the left branch, mirrored about the vertical axis.
      const x = cx + side * R * Math.sin(rad);
      const y = cy - R * Math.cos(rad);
      pts.push([x, y, deg]);
      if (i === 0) continue;
      // Leaf size tapers towards the crown so the wreath has a tip.
      // Taper at both ends so the branch has a tip and a stem, not blunt cuts.
      const grow = 0.42 + 0.58 * Math.min(1, Math.min(t, 1 - t) * 4.2);
      const rx = 44 * grow, ry = 15 * grow;
      const tangent = side * deg;
      parts.push(
        `<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" transform="translate(${x} ${y}) rotate(${tangent}) translate(${rx * 0.92} ${-ry * 1.5}) rotate(-26)"/>`,
        `<ellipse cx="0" cy="0" rx="${rx * 0.86}" ry="${ry * 0.86}" transform="translate(${x} ${y}) rotate(${tangent}) translate(${rx * 0.72} ${ry * 1.6}) rotate(24)"/>`
      );
    }
    const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
    parts.push(`<path d="${d}" fill="none" stroke="${GOLD}" stroke-width="7" stroke-linecap="round"/>`);
  }
  return parts.join('');
}

// Five points, a beaded band and a cross: the same shape as the mockup,
// reduced to the few strokes that survive being printed on cloth.
function crown(cx, cy, w) {
  const h = w * 0.62;
  const x0 = cx - w / 2, y1 = cy + h;
  const peak = (i) => x0 + (w / 4) * i;
  const d = [
    `M${x0} ${y1}`,
    `L${x0} ${cy + h * 0.34}`,
    `L${peak(0.62)} ${cy + h * 0.72} L${peak(1)} ${cy + h * 0.14}`,
    `L${peak(1.55)} ${cy + h * 0.66} L${peak(2)} ${cy - h * 0.06}`,
    `L${peak(2.45)} ${cy + h * 0.66} L${peak(3)} ${cy + h * 0.14}`,
    `L${peak(3.38)} ${cy + h * 0.72} L${x0 + w} ${cy + h * 0.34}`,
    `L${x0 + w} ${y1} Z`,
  ].join(' ');
  const beads = [0, 1, 2, 3].map((i) => {
    const bx = peak(i + 0.5), by = cy + h * (i % 2 ? 0.7 : 0.62);
    return `<circle cx="${bx}" cy="${by}" r="${w * 0.028}"/>`;
  }).join('');
  return `
    <path d="${d}" fill="${GOLD}"/>
    <rect x="${x0 - w * 0.06}" y="${y1}" width="${w * 1.12}" height="${h * 0.2}" rx="${h * 0.06}" fill="${GOLD}"/>
    ${beads}
    <circle cx="${peak(1)}" cy="${cy + h * 0.14}" r="${w * 0.03}"/>
    <circle cx="${peak(3)}" cy="${cy + h * 0.14}" r="${w * 0.03}"/>
    <circle cx="${cx}" cy="${cy - h * 0.06}" r="${w * 0.035}"/>
    <rect x="${cx - w * 0.015}" y="${cy - h * 0.42}" width="${w * 0.03}" height="${h * 0.3}" fill="${GOLD}"/>
    <rect x="${cx - w * 0.075}" y="${cy - h * 0.3}" width="${w * 0.15}" height="${h * 0.03}" fill="${GOLD}"/>`;
}

const CREST = () => {
  const cx = 500, cy = 530, R = 330;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
    <g fill="${GOLD}">
      ${wreath(cx, cy + 10, 392)}
      ${crown(cx, 96, 150)}
      <!-- the tie where the two branches meet -->
      <path d="M${cx - 86} ${cy + 396} Q${cx} ${cy + 356} ${cx + 86} ${cy + 396}"
            fill="none" stroke="${GOLD}" stroke-width="8" stroke-linecap="round"/>
    </g>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${GOLD}" stroke-width="7"/>
    <circle cx="${cx}" cy="${cy}" r="${R - 17}" fill="none" stroke="${GOLD}" stroke-width="4"/>
    <text x="${cx}" y="${cy - 48}" text-anchor="middle" fill="${GOLD}"
          style="font:400 92px 'Playfair Display',Georgia,serif;letter-spacing:.04em">THE LOST</text>
    <text x="${cx}" y="${cy + 56}" text-anchor="middle" fill="${GOLD}"
          style="font:400 92px 'Playfair Display',Georgia,serif;letter-spacing:.04em">JAMAICAN</text>
    <text x="${cx}" y="${cy + 210}" text-anchor="middle" fill="${GOLD}"
          style="font:400 190px 'Playfair Display',Georgia,serif">X</text>
  </svg>`;
};

/* ---------- 876 ---------- */

// The stripe runs straight through the numerals in the mockup, so it is a
// hard-stopped gradient clipped to the glyphs rather than a drawn rectangle.
const BAND = `linear-gradient(to bottom,
  ${GOLD} 0 46%, ${GREEN} 46% 50%, ${FLAG_GOLD} 50% 54%, ${GREEN} 54% 58%, ${GOLD} 58% 100%)`;

const PAGES = {
  'pa-876': {
    w: 3600,
    html: `<div class="c">
      <div class="num">876</div>
      <div class="house">THE LOST JAMAICAN</div>
    </div>
    <style>
      .c{width:3600px;display:flex;flex-direction:column;align-items:center;gap:60px;padding:40px 0}
      .num{
        font:400 720px/1 "Playfair Display",Didot,"Bodoni MT",Georgia,serif;
        letter-spacing:.02em;
        background:${BAND};
        -webkit-background-clip:text;background-clip:text;color:transparent;
      }
      .house{
        font:500 96px/1 "Barlow Condensed",Arial Narrow,sans-serif;
        color:${GOLD};letter-spacing:.56em;text-indent:.56em;
      }
    </style>`,
  },
  'pa-xmark': {
    w: 3300,
    html: `<div class="c">${CREST()}</div>
    <style>.c{width:3300px;display:flex;justify-content:center}.c svg{width:3300px;height:3300px}</style>`,
  },
};

const browser = await chromium.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
});

for (const [key, p] of Object.entries(PAGES)) {
  const page = await browser.newPage({ viewport: { width: p.w, height: Math.min(p.w, 3400) }, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><meta charset="utf-8">
     <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Barlow+Condensed:wght@500&display=swap" rel="stylesheet">
     <style>html,body{margin:0;background:transparent}</style>${p.html}`,
    { waitUntil: 'networkidle' }
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const box = await page.locator('.c').boundingBox();
  const file = path.join(OUT, `${key}.png`);
  await page.screenshot({ path: file, omitBackground: true, clip: box });
  await page.close();
  console.log(`  ${key.padEnd(12)} ${Math.round(box.width)}x${Math.round(box.height)}  ${Math.round(fs.statSync(file).size / 1024)}KB`);
}

await browser.close();
