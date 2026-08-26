// Creates the Lost Jamaican first-drop products in Printify.
// Usage: node automation/printify-setup.js
// Idempotent-ish: skips products whose title already exists in the shop.
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const API = 'https://api.printify.com/v1';
const H = {
  Authorization: 'Bearer ' + process.env.PRINTIFY_API_TOKEN,
  'Content-Type': 'application/json',
};
const PRINT_DIR = path.join(__dirname, '..', 'private', 'store-art', 'print');

const TEE = { blueprint: 12, provider: 99 };      // Bella+Canvas 3001 via Printify Choice
const BLACK_MUG = { blueprint: 479, provider: 99 }; // Black Mug 11/15oz via Printify Choice
const WHITE_MUG = { blueprint: 68, provider: 1 };  // Mug 11oz via SPOKE
const POSTER_H = { blueprint: 284, provider: null }; // Matte Horizontal Posters — provider resolved at runtime

const PRODUCTS = [
  { id: 'never-lose-tee', kind: 'tee', color: 'Black', price: 2999,
    title: 'NEVER LOSE Tee — The Lost Jamaican',
    desc: 'The Lost Jamaican flagship. NEVER LOSE in heavyweight block type with a gold underline on a premium Bella+Canvas 3001 tee.' },
  { id: 'not-perfect-tee', kind: 'tee', color: 'Black', price: 2799,
    title: '"Not Perfect, But Jamaican" Tee',
    desc: "I'm not perfect but I am Jamaican and that's close enough — flag-filled letters on a premium black tee." },
  { id: 'wah-gwaan-tee', kind: 'tee', color: 'Black', price: 2799,
    title: 'Wah Gwaan Tee — Vintage Varsity',
    desc: 'WAH GWAAN in distressed retro varsity arc. Jamaica · Est. 1962.' },
  { id: 'retro-flag-tee', kind: 'tee', color: 'Dark Grey Heather', price: 2699,
    title: 'Retro Watercolor Jamaica Tee',
    desc: 'Vintage watercolor Jamaican flag with 70s script. Soft-washed island classic.' },
  { id: 'area-code-tee', kind: 'tee', color: 'Black', price: 2799,
    title: '876 Tee — Land We Love',
    desc: '876 in gold varsity numerals. For yaadies at home and abroad.' },
  { id: 'dictionary-tee', kind: 'tee', color: 'White', price: 2799,
    title: 'Patois Dictionary Series Tee — Cho! Rhaatid, Soon Come',
    desc: 'Three patois entries, museum-minimal typography: Cho! · Rhaatid · Soon Come.' },
  { id: 'not-perfect-mug', kind: 'black-mug', price: 1899,
    title: '"Not Perfect, But Jamaican" Mug',
    desc: "I'm not perfect but I am Jamaican and that's close enough — flag letters on a black ceramic mug." },
  { id: 'lost-found-mug', kind: 'black-mug', price: 1899,
    title: '"Lost in America, Found in Jamaica" Mug',
    desc: 'Split-flag diaspora mug: muted stars and stripes into vibrant black, green and gold.' },
  { id: 'believe-mug', kind: 'black-mug', price: 1999,
    title: '"Believe Inna Yuhself" Mug',
    desc: 'Brush-script motivation with a rising sun, green and gold on black ceramic.' },
  { id: 'more-money-mug', kind: 'black-mug', price: 1999,
    title: 'MORE MONEY THAN LAST YEAR Mug',
    desc: 'The Lost Jamaican original. Metallic gold stack on black ceramic. Keep winning.' },
  { id: 'bomboclaat-mug', kind: 'white-mug', price: 1899,
    title: 'Bomboclaat — Dictionary Mug',
    desc: 'bom·bo·claat /exclamation/ — used to express shock, surprise, or disbelief. See also: rhaatid.' },
  { id: 'cant-hear-poster', kind: 'poster', price: 1999,
    title: '"Who Can\'t Hear Will Feel" Poster — 24x18',
    desc: 'A Jamaican proverb in gallery-grade editorial typography. Matte 24x18.' },
];

const j = (r) => r.json();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathname, opts = {}) {
  const r = await fetch(API + pathname, { headers: H, ...opts });
  if (!r.ok) throw new Error(pathname + ' -> ' + r.status + ' ' + (await r.text()).slice(0, 400));
  return j(r);
}

async function main() {
  const shops = await api('/shops.json');
  const shop = shops[0];
  console.log('shop', shop.id, shop.title);

  const existing = (await api(`/shops/${shop.id}/products.json?limit=50`)).data || [];
  const existingTitles = new Set(existing.map((p) => p.title));

  // resolve poster provider
  const pp = await api(`/catalog/blueprints/${POSTER_H.blueprint}/print_providers.json`);
  POSTER_H.provider = (pp.find((x) => x.id === 99) || pp[0]).id;

  const variantCache = {};
  async function variantsFor(bp, prov) {
    const key = bp + ':' + prov;
    if (!variantCache[key]) {
      variantCache[key] = (await api(`/catalog/blueprints/${bp}/print_providers/${prov}/variants.json`)).variants;
    }
    return variantCache[key];
  }

  for (const p of PRODUCTS) {
    if (existingTitles.has(p.title)) { console.log('SKIP (exists):', p.title); continue; }
    const file = path.join(PRINT_DIR, p.id + '.png');
    const b64 = fs.readFileSync(file).toString('base64');
    const up = await api('/uploads/images.json', {
      method: 'POST',
      body: JSON.stringify({ file_name: p.id + '.png', contents: b64 }),
    });

    let cfg, pick;
    if (p.kind === 'tee') {
      cfg = TEE;
      const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
      const all = await variantsFor(cfg.blueprint, cfg.provider);
      pick = all.filter((v) => v.options.color === p.color && SIZES.includes(v.options.size));
    } else if (p.kind === 'black-mug') {
      cfg = BLACK_MUG;
      const all = await variantsFor(cfg.blueprint, cfg.provider);
      pick = all.filter((v) => /11oz/i.test(v.title) || v.options.size === '11oz');
      if (!pick.length) pick = all.slice(0, 1);
    } else if (p.kind === 'white-mug') {
      cfg = WHITE_MUG;
      pick = (await variantsFor(cfg.blueprint, cfg.provider)).slice(0, 1);
    } else {
      cfg = POSTER_H;
      const all = await variantsFor(cfg.blueprint, cfg.provider);
      pick = all.filter((v) => /24.*18|18.*24/.test(v.title));
      if (!pick.length) pick = all.slice(0, 1);
    }
    if (!pick.length) { console.log('FAIL no variants:', p.id); continue; }

    const body = {
      title: p.title,
      description: p.desc,
      blueprint_id: cfg.blueprint,
      print_provider_id: cfg.provider,
      variants: pick.map((v) => ({ id: v.id, price: p.price, is_enabled: true })),
      print_areas: [{
        variant_ids: pick.map((v) => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, x: 0.5, y: 0.5, scale: 1, angle: 0 }] }],
      }],
    };
    const created = await api(`/shops/${shop.id}/products.json`, { method: 'POST', body: JSON.stringify(body) });
    console.log('CREATED', p.id, '->', created.id, `(${pick.length} variants @ $${(p.price / 100).toFixed(2)})`);
    await sleep(800);
  }
  console.log('ALL DONE');
}
main().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
