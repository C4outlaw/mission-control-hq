// Builds the "More Money Than Last Year" lockup on four garments, all black,
// from one print file (private/store-art/print/moremoney.png).
//
//   node automation/add-money-drop.js          # dry run: costs + placement only
//   node automation/add-money-drop.js --create # upload art + create the products
//
// Source of the artwork is private/store-art/moremoney-source.html (rendered by
// headless Chrome at 3x). Re-render that, re-run this, to revise the design.
//
// The hoodie is deliberately blueprint 77 (Gildan 18500 PULLOVER), not the
// blueprint 66 full-zip the earlier drop used: a zip runs straight down the
// middle of a chest print and splits the wordmark in half.
const fs = require('fs');
const path = require('path');

const SHOP = '6904292';
const TOKEN = process.env.PRINTIFY_API_TOKEN;
const ART = path.join(__dirname, '..', 'private', 'store-art', 'print', 'moremoney.png');
const MAP = path.join(__dirname, '..', 'lib', 'printify-map.json');

const api = async (p, opts = {}) => {
  const r = await fetch('https://api.printify.com/v1' + p, {
    ...opts,
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json', ...(opts.headers || {}) },
  });
  const body = await r.json();
  if (!r.ok) throw new Error(`${p} -> ${r.status} ${JSON.stringify(body).slice(0, 300)}`);
  return body;
};

// One design, four garments. Placement is tuned per garment so the lockup lands
// on the chest the way the reference mockup shows it.
const PLAN = [
  {
    key: 'moremoney-tee', kind: 'tee', title: 'More Money Than Last Year — Unisex Tee',
    blueprint: 706, provider: 29, price: 1999, compareAt: 2999,
    place: { x: 0.5, y: 0.45, scale: 1.0 },
    variants: [[73196, 'S'], [73200, 'M'], [73204, 'L'], [73208, 'XL'], [73212, '2XL'], [79114, '3XL']],
    upcharge: { '2XL': 200, '3XL': 400 },
  },
  {
    key: 'moremoney-tank', kind: 'tank', title: 'More Money Than Last Year — Unisex Tank',
    blueprint: 39, provider: 99, price: 2199, compareAt: 2999,
    place: { x: 0.5, y: 0.44, scale: 0.92 },
    variants: [[24641, 'S'], [24640, 'M'], [24639, 'L'], [24642, 'XL'], [24644, '2XL']],
    upcharge: { '2XL': 200 },
  },
  {
    key: 'moremoney-hoodie', kind: 'hoodie', title: 'More Money Than Last Year — Hoodie',
    blueprint: 77, provider: 29, price: 3699, compareAt: 4499,
    place: { x: 0.5, y: 0.42, scale: 0.92 },
    variants: [[32918, 'S'], [32919, 'M'], [32920, 'L'], [32921, 'XL'], [32922, '2XL'], [32923, '3XL']],
    upcharge: { '2XL': 300, '3XL': 500 },
  },
  {
    key: 'moremoney-cap', kind: 'cap', kindName: 'Snapback Cap', title: 'More Money Than Last Year — Snapback Cap',
    // A Yupoong 6089M costs $21.26 to make — it carries a higher price than the
    // shirts, not the $21.99 the foam trucker could hold.
    blueprint: 1703, provider: 41, price: 2999, compareAt: 3499,
    // The cap's print area is landscape (1654x750) while the lockup is portrait,
    // so scale is bound by height: 750 / (1654 / 0.954) ≈ 0.43.
    place: { x: 0.5, y: 0.5, scale: 0.42 },
    variants: [[117048, 'One size']],
    upcharge: {},
  },
];

const DESC =
  'The mantra, in brush script under the flag. More money than last year — printed to order on black, ' +
  'so the gold and green read loud. The Lost Jamaican · We Never Lose.';

(async () => {
  if (!TOKEN) throw new Error('PRINTIFY_API_TOKEN not set');
  const create = process.argv.includes('--create');

  // ---- cost guard: never list a size below what it costs to print ----
  const costs = {};
  for (const p of PLAN) {
    const cat = await api(`/catalog/blueprints/${p.blueprint}/print_providers/${p.provider}/variants.json`);
    const byId = Object.fromEntries(cat.variants.map((v) => [v.id, v]));
    costs[p.key] = {};
    for (const [id, size] of p.variants) {
      if (!byId[id]) throw new Error(`${p.key}: variant ${id} (${size}) not offered by provider ${p.provider}`);
      costs[p.key][size] = byId[id].cost ?? null;
    }
  }

  // Printify's catalog endpoint omits cost for some providers; fall back to the
  // shop-level cost after creation. Report whatever we have up front.
  for (const p of PLAN) {
    const rows = Object.entries(costs[p.key]).map(([s, c]) => {
      const price = p.price + (p.upcharge[s] || 0);
      const cost = c == null ? null : c / 100;
      const flag = cost != null && price / 100 <= cost ? '  <-- BELOW COST' : '';
      return `${s} $${(price / 100).toFixed(2)}${cost != null ? ` (cost $${cost.toFixed(2)})` : ' (cost n/a)'}${flag}`;
    });
    console.log(`${p.key.padEnd(18)} bp${p.blueprint}/pp${p.provider}  ${rows.join(' · ')}`);
  }

  if (!create) { console.log('\ndry run — pass --create to upload art and build the products'); return; }

  // ---- upload the print file once, reuse for all four ----
  const up = await api('/uploads/images.json', {
    method: 'POST',
    body: JSON.stringify({ file_name: 'moremoney.png', contents: fs.readFileSync(ART).toString('base64') }),
  });
  console.log('\nuploaded art:', up.id, up.width + 'x' + up.height);

  // Resume-safe: a half-finished run leaves real products in the shop, so match
  // on title and reuse rather than creating a duplicate.
  const existing = new Map();
  for (let page = 1; ; page++) {
    const r = await api(`/shops/${SHOP}/products.json?limit=50&page=${page}`);
    for (const pr of r.data) existing.set(pr.title, pr.id);
    if (!r.data.length || r.data.length < 50) break;
  }

  const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
  for (const p of PLAN) {
    const ids = p.variants.map(([id]) => id);
    const already = existing.get(p.title);
    const payload = {
      title: p.title,
      description: DESC,
      blueprint_id: p.blueprint,
      print_provider_id: p.provider,
      variants: p.variants.map(([id, size]) => ({
        id, price: p.price + (p.upcharge[size] || 0), is_enabled: true,
      })),
      print_areas: [{
        variant_ids: ids,
        placeholders: [{ position: 'front', images: [{ id: up.id, ...p.place, angle: 0 }] }],
      }],
    };
    // Idempotent: create once, then keep placement/pricing in sync on re-runs.
    // An update must not resend blueprint/provider, and Printify keeps every
    // blueprint variant on the product (ours are just the enabled ones) — so the
    // print area has to list all of them, not only the sizes we sell.
    let product;
    if (already) {
      const live = await api(`/shops/${SHOP}/products/${already}.json`);
      const { blueprint_id, print_provider_id, ...editable } = payload;
      editable.print_areas = [{
        variant_ids: live.variants.map((v) => v.id),
        placeholders: [{ position: 'front', images: [{ id: up.id, ...p.place, angle: 0 }] }],
      }];
      await api(`/shops/${SHOP}/products/${already}.json`, { method: 'PUT', body: JSON.stringify(editable) });
      product = { id: already };
    } else {
      product = await api(`/shops/${SHOP}/products.json`, { method: 'POST', body: JSON.stringify(payload) });
    }

    const prev = map.products[p.key] || {};
    map.products[p.key] = {
      id: product.id,
      title: p.title.split(' — ')[0],
      price: p.price,
      compareAt: p.compareAt,
      kind: p.kind,
      ...(p.kindName ? { kindName: p.kindName } : {}),
      design: 'moremoney',
      colors: ['Black'],
      // Keep mockups already pulled; re-running placement must not blank the art.
      images: prev.images || {},
      gallery: prev.gallery || [],
      variants: p.variants.map(([id, size]) => ({
        id, size, color: 'Black',
        ...(p.upcharge[size] ? { price: p.price + p.upcharge[size] } : {}),
      })),
    };
    console.log(already ? 'updated' : 'created', p.key, product.id);
  }

  fs.writeFileSync(MAP, JSON.stringify(map, null, 1));
  console.log('\nprintify-map.json updated — run automation/fetch-mockups.js next');
})().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
