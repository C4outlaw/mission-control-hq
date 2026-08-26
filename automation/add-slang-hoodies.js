// Adds hoodies for every design that lacks one.
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
const FILE = { cho:'cho.png', rhaatid:'rhaatid.png', sooncome:'sooncome.png', dunkno:'dunkno.png',
  kissmiteeth:'kissmiteeth.png', walkgood:'walkgood.png', believe:'believe.png',
  canthear:'canthear.png', bomboclaat:'bomboclaat.png' };
const LABEL = { cho:'Cho!', rhaatid:'Rhaatid!', sooncome:'Soon Come', dunkno:'Dun Kno',
  kissmiteeth:'Kiss Mi Teeth', walkgood:'Walk Good', believe:'Believe Inna Yuhself',
  canthear:"Who Can't Hear Will Feel", bomboclaat:'Bomboclaat' };
(async () => {
  const have = new Set(Object.values(map.products).filter(p => p.kind === 'hoodie').map(p => p.design));
  const need = Object.keys(FILE).filter(d => !have.has(d));
  console.log('need hoodies:', need.join(','));
  const vars = (await api(`/catalog/blueprints/77/print_providers/99/variants.json`)).variants
    .filter(v => /^black$/i.test(v.options.color || '') && ['S','M','L','XL','2XL'].includes(v.options.size));
  for (const d of need) {
    const b64 = fs.readFileSync(path.join(PRINT, FILE[d])).toString('base64');
    const up = await api('/uploads/images.json', { method: 'POST', body: JSON.stringify({ file_name: d + '-hoodie.png', contents: b64 }) });
    const c = await api(`/shops/${map.shopId}/products.json`, { method: 'POST', body: JSON.stringify({
      title: `${LABEL[d]} Hoodie`, description: `${LABEL[d]} — modern luxury type on a heavyweight black hoodie.`,
      blueprint_id: 77, print_provider_id: 99,
      variants: vars.map(v => ({ id: v.id, price: 2999, is_enabled: true })),
      print_areas: [{ variant_ids: vars.map(v => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, x: 0.5, y: 0.42, scale: 0.62, angle: 0 }] }] }],
    })});
    map.products[`${d}-hoodie`] = { id: c.id, title: `${LABEL[d]} Hoodie`, price: 2999, kind: 'hoodie', design: d, variants: vars.map(v => ({ id: v.id, size: v.options.size })) };
    console.log('OK', d, c.id);
    await sleep(700);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'printify-map.json'), JSON.stringify(map, null, 2));
  console.log('MAP', Object.keys(map.products).length);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
