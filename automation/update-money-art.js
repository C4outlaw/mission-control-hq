// Swaps the money garment products (tee/wtee/hoodie/crew) to the big stacked art.
require('dotenv').config({ path: '.env.local' });
const fs = require('fs'), path = require('path');
const map = require('../lib/printify-map.json');
const H = { Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN, 'Content-Type': 'application/json' };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b64 = fs.readFileSync(path.join(__dirname, '..', 'private', 'store-art', 'print', 'money.png')).toString('base64');
  const up = await fetch('https://api.printify.com/v1/uploads/images.json', {
    method: 'POST', headers: H, body: JSON.stringify({ file_name: 'money-stacked.png', contents: b64 }),
  }).then(r => r.json());
  console.log('uploaded', up.id);
  for (const key of ['money-tee', 'money-wtee', 'money-hoodie', 'money-crew']) {
    const p = map.products[key];
    if (!p) { console.log('skip', key); continue; }
    const g = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, { headers: H }).then(r => r.json());
    const pa = (g.print_areas || []).map(a => ({
      variant_ids: a.variant_ids,
      placeholders: a.placeholders
        .filter(ph => ph.position === 'front')
        .map(ph => ({
          position: 'front',
          images: [{ id: up.id, x: 0.5, y: 0.42, scale: 0.88, angle: 0 }],
        })),
    }));
    const r = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, {
      method: 'PUT', headers: H, body: JSON.stringify({ print_areas: pa }),
    });
    console.log(key, r.status);
    await sleep(700);
  }
  console.log('DONE');
})();
