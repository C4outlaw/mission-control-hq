require('dotenv').config({ path: '.env.local' });
const map = require('../lib/printify-map.json');
const H = { Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN, 'Content-Type': 'application/json' };
const SCALE = parseFloat(process.argv[2] || '0.48');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  for (const [key, p] of Object.entries(map.products)) {
    if (p.kind !== 'mug') continue;
    const g = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, { headers: H }).then(r => r.json());
    const pa = (g.print_areas || []).map(a => ({
      variant_ids: a.variant_ids,
      placeholders: a.placeholders.map(ph => ({
        position: ph.position,
        images: ph.images.map(im => ({ id: im.id, x: 0.5, y: parseFloat(process.argv[3]||'0.5'), scale: SCALE, angle: 0 })),
      })),
    }));
    const r = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/products/${p.id}.json`, {
      method: 'PUT', headers: H, body: JSON.stringify({ print_areas: pa }),
    });
    console.log(key, r.status);
    await sleep(700);
  }
  console.log('mug scale ->', SCALE);
})();
