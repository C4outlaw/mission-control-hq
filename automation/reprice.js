// Repricing pass: fix the money-losing wtank, tune hoodie/crew for conversion.
require('dotenv').config({ path: '.env.local' });
const fs = require('fs'), path = require('path');
const map = require('../lib/printify-map.json');
const H = { Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN, 'Content-Type': 'application/json' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const PRICE = { tee: 1999, wtee: 1999, tank: 2299, wtank: 3699, crew: 2699, hoodie: 2999, mug: 1299 };
(async () => {
  for (const [key, p] of Object.entries(map.products)) {
    const want = PRICE[p.kind];
    if (!want || p.price === want) continue;
    const g = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, { headers: H }).then(r => r.json());
    const variants = g.variants.map(v => ({ id: v.id, price: v.is_enabled ? want : v.price, is_enabled: v.is_enabled }));
    const r = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, {
      method: 'PUT', headers: H, body: JSON.stringify({ variants }),
    });
    if (r.ok) { p.price = want; console.log('repriced', key, '->', (want / 100).toFixed(2)); }
    else console.log('FAIL', key, r.status);
    await sleep(600);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'printify-map.json'), JSON.stringify(map, null, 2));
  console.log('map updated');
})();
