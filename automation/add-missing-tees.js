// Adds tees for designs that only exist as mugs (believe, canthear, bomboclaat).
require('dotenv').config({ path: '.env.local' });
const fs = require('fs'), path = require('path');
const map = require('../lib/printify-map.json');
const H = { Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN, 'Content-Type': 'application/json' };
const PRINT = path.join(__dirname, '..', 'private', 'store-art', 'print');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function api(p, o = {}) {
  const r = await fetch('https://api.printify.com/v1' + p, { headers: H, ...o });
  if (!r.ok) throw new Error(p + ' ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return r.json();
}
const NEW = {
  believe:    { label: 'Believe Inna Yuhself', desc: 'Believe inna yuhself — everyday motivation in refined modern serif with liquid gold.' },
  canthear:   { label: "Who Can't Hear Will Feel", desc: "Who can't hear will feel — a Jamaican proverb in gallery-grade modern type." },
  bomboclaat: { label: 'Bomboclaat', desc: 'bomboclaat /exclamation/ — the dictionary entry, in modern luxury typography.' },
};
(async () => {
  const teeVars = (await api(`/catalog/blueprints/12/print_providers/99/variants.json`)).variants
    .filter(v => /^black$/i.test(v.options.color || '') && ['S','M','L','XL','2XL'].includes(v.options.size));
  for (const [k, d] of Object.entries(NEW)) {
    const b64 = fs.readFileSync(path.join(PRINT, k + '.png')).toString('base64');
    const up = await api('/uploads/images.json', { method: 'POST', body: JSON.stringify({ file_name: k + '-tee.png', contents: b64 }) });
    const tee = await api(`/shops/${map.shopId}/products.json`, { method: 'POST', body: JSON.stringify({
      title: `${d.label} Tee`, description: d.desc, blueprint_id: 12, print_provider_id: 99,
      variants: teeVars.map(v => ({ id: v.id, price: 2999, is_enabled: true })),
      print_areas: [{ variant_ids: teeVars.map(v => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, x: 0.5, y: 0.42, scale: 0.8, angle: 0 }] }] }],
    })});
    map.products[`${k}-tee`] = { id: tee.id, title: `${d.label} Tee`, price: 2999, kind: 'tee', design: k, variants: teeVars.map(v => ({ id: v.id, size: v.options.size })) };
    console.log('OK', k, tee.id);
    await sleep(700);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'printify-map.json'), JSON.stringify(map, null, 2));
  console.log('MAP', Object.keys(map.products).length);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
