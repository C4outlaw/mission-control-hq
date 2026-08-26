// Rebuilds The Lost Jamaican catalog: deletes old products, creates the modern line.
require('dotenv').config({ path: '.env.local' });
const fs = require('fs'), path = require('path');
const API = 'https://api.printify.com/v1';
const H = { Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN, 'Content-Type': 'application/json' };
const PRINT = path.join(__dirname, '..', 'private', 'store-art', 'print');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function api(p, o = {}) {
  const r = await fetch(API + p, { headers: H, ...o });
  if (!r.ok) throw new Error(p + ' -> ' + r.status + ' ' + (await r.text()).slice(0, 300));
  return r.status === 200 ? r.json() : {};
}

// garment configs
const G = {
  tee:    { bp: 12, pp: 99, sizes: ['S','M','L','XL','2XL'], scale: 0.68, y: 0.44 },
  wtee:   { bp: 9,  pp: 99, sizes: ['S','M','L','XL','2XL'], scale: 0.62, y: 0.42 },
  tank:   { bp: 39, pp: 99, sizes: ['S','M','L','XL','2XL'], scale: 0.60, y: 0.44 },
  wtank:  { bp: 10, pp: 61, sizes: ['S','M','L','XL'],       scale: 0.55, y: 0.42 },
  hoodie: { bp: 77, pp: 99, sizes: ['S','M','L','XL','2XL'], scale: 0.60, y: 0.42 },
  crew:   { bp: 49, pp: 99, sizes: ['S','M','L','XL','2XL'], scale: 0.62, y: 0.42 },
  mug:    { bp: 479, pp: 99, sizes: null,                     scale: 0.92, y: 0.50 },
};

const DESIGNS = {
  neverlose:  { file: 'neverlose.png',  label: 'NEVER LOSE', garColor: 'black' },
  money:      { file: 'money.png',      label: 'More Money Than Last Year', garColor: 'black' },
  wahgwaan:   { file: 'wahgwaan.png',   label: 'Wah Gwaan', garColor: 'black' },
  area876:    { file: 'area876.png',    label: '876', garColor: 'black' },
  xmark:      { file: 'xmark.png',      label: 'The Lost Jamaican X', garColor: 'black' },
  tallawah:   { file: 'tallawah.png',   label: 'Likkle But Tallawah', garColor: 'black' },
  believe:    { file: 'believe.png',    label: 'Believe Inna Yuhself', garColor: 'black' },
  canthear:   { file: 'canthear.png',   label: "Who Can't Hear Will Feel", garColor: 'black' },
  bomboclaat: { file: 'bomboclaat.png', label: 'Bomboclaat', garColor: 'black' },
  notperfect: { file: 'notperfect.png', label: 'Not Perfect But Jamaican', garColor: 'black' },
};

const PRICES = { tee: 2999, wtee: 2999, tank: 2699, wtank: 2699, hoodie: 4999, crew: 3999, mug: 1899 };
const KINDNAME = { tee: 'Tee', wtee: "Women's Tee", tank: 'Tank', wtank: "Women's Racerback Tank", hoodie: 'Hoodie', crew: 'Crewneck', mug: 'Mug' };

const PLAN = [
  ['neverlose',  ['tee','wtee','tank','wtank','hoodie','crew','mug']],
  ['money',      ['tee','wtee','hoodie','crew','mug']],
  ['wahgwaan',   ['tee','wtee','hoodie','mug']],
  ['notperfect', ['tee','wtee','hoodie','mug']],
  ['tallawah',   ['tee','wtee','hoodie','mug']],
  ['area876',    ['tee','hoodie','mug']],
  ['xmark',      ['tee','hoodie','mug']],
  ['believe',    ['mug']],
  ['canthear',   ['mug']],
  ['bomboclaat', ['mug']],
];

const DESC = {
  neverlose: 'The Lost Jamaican flagship. NEVER LOSE in modern heavyweight type with a liquid-gold finish.',
  money: 'More Money Than Last Year, in refined modern serif with a liquid-gold accent. A quiet flex.',
  wahgwaan: 'Wah Gwaan. The greeting every yaadie knows, in bold contemporary type with a gold accent.',
  area876: '876 - Land We Love. Polished gold numerals, modern luxury athletic energy.',
  xmark: 'The Lost Jamaican mark: the flag reimagined as a gold and green emblem.',
  tallawah: 'Likkle but tallawah. Small but mighty, set in refined modern serif with liquid gold.',
  believe: 'Believe inna yuhself. Everyday motivation in refined modern serif with liquid gold.',
  canthear: "Who can't hear will feel - a Jamaican proverb, set in gallery-grade modern type.",
  bomboclaat: 'bomboclaat /exclamation/ - the dictionary entry, done in modern luxury typography.',
  notperfect: "I'm not perfect but I am Jamaican and that's close enough. Modern serif, gold accent.",
};

(async () => {
  const shop = (await api('/shops.json'))[0];
  console.log('shop', shop.id);

  // wipe old
  const existing = (await api(`/shops/${shop.id}/products.json?limit=50`)).data || [];
  for (const p of existing) {
    await api(`/shops/${shop.id}/products/${p.id}.json`, { method: 'DELETE' }).catch(e => console.log('del skip', p.id));
    process.stdout.write('.');
  }
  console.log('\ndeleted', existing.length);

  // upload art once per design
  const uploads = {};
  for (const [k, d] of Object.entries(DESIGNS)) {
    const b64 = fs.readFileSync(path.join(PRINT, d.file)).toString('base64');
    const up = await api('/uploads/images.json', { method: 'POST', body: JSON.stringify({ file_name: d.file, contents: b64 }) });
    uploads[k] = up.id;
    console.log('uploaded', k, up.id);
  }

  const vcache = {};
  async function variants(bp, pp) {
    const key = bp + ':' + pp;
    if (!vcache[key]) vcache[key] = (await api(`/catalog/blueprints/${bp}/print_providers/${pp}/variants.json`)).variants;
    return vcache[key];
  }

  const map = {};
  for (const [dk, kinds] of PLAN) {
    const d = DESIGNS[dk];
    for (const kind of kinds) {
      const g = G[kind];
      const all = await variants(g.bp, g.pp);
      let pick;
      if (kind === 'mug') {
        pick = all.filter(v => /11oz/i.test(v.title) || v.options.size === '11oz').slice(0, 1);
        if (!pick.length) pick = all.slice(0, 1);
      } else {
        const want = d.garColor;
        pick = all.filter(v => {
          const c = (v.options.color || '').toLowerCase();
          const s = v.options.size;
          const colorOk = want === 'black' ? /^black$/.test(c) : /^(white|natural)$/.test(c);
          return colorOk && g.sizes.includes(s);
        });
        if (!pick.length) {
          // fallback: any color containing want
          pick = all.filter(v => (v.options.color || '').toLowerCase().includes(want) && g.sizes.includes(v.options.size));
        }
        if (!pick.length) { console.log('SKIP no variants', dk, kind); continue; }
      }
      const title = `${d.label} ${KINDNAME[kind]}`;
      const body = {
        title,
        description: DESC[dk],
        blueprint_id: g.bp,
        print_provider_id: g.pp,
        variants: pick.map(v => ({ id: v.id, price: PRICES[kind], is_enabled: true })),
        print_areas: [{
          variant_ids: pick.map(v => v.id),
          placeholders: [{ position: 'front', images: [{ id: uploads[dk], x: 0.5, y: g.y, scale: g.scale, angle: 0 }] }],
        }],
      };
      try {
        const c = await api(`/shops/${shop.id}/products.json`, { method: 'POST', body: JSON.stringify(body) });
        map[`${dk}-${kind}`] = { id: c.id, title, price: PRICES[kind], kind, design: dk, variants: pick.map(v => ({ id: v.id, size: v.options.size || '11oz' })) };
        console.log('OK', dk, kind, c.id, pick.length + 'v');
      } catch (e) { console.log('FAIL', dk, kind, e.message.slice(0, 160)); }
      await sleep(600);
    }
  }
  fs.writeFileSync(path.join(__dirname, '..', 'lib', 'printify-map.json'), JSON.stringify({ shopId: shop.id, products: map }, null, 2));
  console.log('WROTE MAP', Object.keys(map).length, 'products');
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
