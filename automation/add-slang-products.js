// Adds the slang line (tee + mug per design) without touching existing products.
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
  cho:        { label: 'Cho!',          desc: 'Cho! /expression of annoyance/ — the dictionary entry, in modern luxury type.' },
  rhaatid:    { label: 'Rhaatid!',      desc: 'Rhaatid! /mild astonishment/ — the dictionary entry, in modern luxury type.' },
  sooncome:   { label: 'Soon Come',     desc: 'Soon Come /arriving eventually, no promises/ — in modern luxury type.' },
  dunkno:     { label: 'Dun Kno',       desc: 'Dun Kno /you already know/ — in modern luxury type.' },
  kissmiteeth:{ label: 'Kiss Mi Teeth', desc: 'Kiss Mi Teeth /the sound of disapproval/ — in modern luxury type.' },
  walkgood:   { label: 'Walk Good',     desc: 'Walk Good /go safely, live well/ — in modern luxury type.' },
};
const TEE = { bp: 12, pp: 99, sizes: ['S','M','L','XL','2XL'] };
const MUG = { bp: 479, pp: 99 };
(async () => {
  const teeVars = (await api(`/catalog/blueprints/12/print_providers/99/variants.json`)).variants
    .filter(v => /^black$/i.test(v.options.color || '') && TEE.sizes.includes(v.options.size));
  const mugVars = (await api(`/catalog/blueprints/479/print_providers/99/variants.json`)).variants
    .filter(v => /11oz/i.test(v.title)).slice(0, 1);
  for (const [k, d] of Object.entries(NEW)) {
    const b64 = fs.readFileSync(path.join(PRINT, k + '.png')).toString('base64');
    const up = await api('/uploads/images.json', { method: 'POST', body: JSON.stringify({ file_name: k + '.png', contents: b64 }) });
    // tee
    const tee = await api(`/shops/${map.shopId}/products.json`, { method: 'POST', body: JSON.stringify({
      title: `${d.label} Tee`, description: d.desc, blueprint_id: TEE.bp, print_provider_id: TEE.pp,
      variants: teeVars.map(v => ({ id: v.id, price: 2999, is_enabled: true })),
      print_areas: [{ variant_ids: teeVars.map(v => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, x: 0.5, y: 0.42, scale: 0.8, angle: 0 }] }] }],
    })});
    map.products[`${k}-tee`] = { id: tee.id, title: `${d.label} Tee`, price: 2999, kind: 'tee', design: k, variants: teeVars.map(v => ({ id: v.id, size: v.options.size })) };
    // mug
    const mug = await api(`/shops/${map.shopId}/products.json`, { method: 'POST', body: JSON.stringify({
      title: `${d.label} Mug`, description: d.desc, blueprint_id: MUG.bp, print_provider_id: MUG.pp,
      variants: mugVars.map(v => ({ id: v.id, price: 1899, is_enabled: true })),
      print_areas: [{ variant_ids: mugVars.map(v => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, x: 0.5, y: 0.44, scale: 0.52, angle: 0 }] }] }],
    })});
    map.products[`${k}-mug`] = { id: mug.id, title: `${d.label} Mug`, price: 1899, kind: 'mug', design: k, variants: mugVars.map(v => ({ id: v.id, size: '11oz' })) };
    console.log('OK', k, tee.id, mug.id);
    await sleep(700);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'printify-map.json'), JSON.stringify(map, null, 2));
  console.log('MAP now', Object.keys(map.products).length, 'products');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
