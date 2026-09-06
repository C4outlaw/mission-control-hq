// Pulls the front mockup (plus two extra angles) for the More Money products
// into public/store/drop/ and wires the paths into printify-map.json.
//   node automation/fetch-money-mockups.js
const fs = require('fs');
const path = require('path');

const SHOP = '6904292';
const TOKEN = process.env.PRINTIFY_API_TOKEN;
const MAP = path.join(__dirname, '..', 'lib', 'printify-map.json');
const OUT = path.join(__dirname, '..', 'public', 'store', 'drop');
const KEYS = ['moremoney-tee', 'moremoney-tank', 'moremoney-hoodie', 'moremoney-cap'];

(async () => {
  if (!TOKEN) throw new Error('PRINTIFY_API_TOKEN not set');
  const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));

  for (const key of KEYS) {
    const p = map.products[key];
    if (!p) throw new Error(`${key} missing from printify-map.json`);
    const r = await fetch(`https://api.printify.com/v1/shops/${SHOP}/products/${p.id}.json`, {
      headers: { Authorization: 'Bearer ' + TOKEN },
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`${key}: ${r.status} ${JSON.stringify(j).slice(0, 200)}`);

    const save = async (url, file) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${file}: mockup download ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error(`${file}: mockup suspiciously small (${buf.length}b)`);
      fs.writeFileSync(path.join(OUT, file), buf);
      return buf.length;
    };

    const fronts = j.images.filter((i) => i.position === 'front');
    const main = fronts[0] || j.images[0];
    const bytes = await save(main.src, `${key}--black.jpg`);
    p.images = { Black: `/store/drop/${key}--black.jpg` };

    p.gallery = [];
    const extras = j.images.filter((i) => i !== main).slice(0, 2);
    for (let i = 0; i < extras.length; i++) {
      await save(extras[i].src, `${key}--g${i + 1}.jpg`);
      p.gallery.push(`/store/drop/${key}--g${i + 1}.jpg`);
    }
    console.log(key, '->', bytes, 'bytes, +' + p.gallery.length, 'gallery');
  }

  fs.writeFileSync(MAP, JSON.stringify(map, null, 1));
  console.log('printify-map.json image paths wired');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
