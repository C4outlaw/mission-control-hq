// Display catalog for The Lost Jamaican store, derived from the live Printify map
// so the site can never drift from what is actually printable.
import map from './printify-map.json';

const IMG_V = 6; // bump to cache-bust product mockups after art changes

const DESIGN = {
  money: { label: 'More Money Than Last Year', blurb: 'Refined modern serif with a liquid-gold accent. A quiet flex.' },
  neverlose: { label: 'Never Lose', blurb: 'The flagship. Heavyweight modern type with a liquid-gold finish.' },
  wahgwaan: { label: 'Wah Gwaan', blurb: 'The greeting every yaadie knows, in bold contemporary type.' },
  notperfect: { label: 'Not Perfect But Jamaican', blurb: "And that's close enough. Modern serif with a gold accent." },
  tallawah: { label: 'Likkle But Tallawah', blurb: 'Small but mighty. Refined modern serif with liquid gold.' },
  area876: { label: '876', blurb: 'Land We Love. Polished gold numerals, luxury athletic energy.' },
  xmark: { label: 'The Lost Jamaican X', blurb: 'The flag reimagined as a gold and green emblem.' },
  cho: { label: 'Cho!', blurb: '/expression of annoyance/' },
  rhaatid: { label: 'Rhaatid!', blurb: '/mild astonishment/' },
  sooncome: { label: 'Soon Come', blurb: '/arriving eventually, no promises/' },
  dunkno: { label: 'Dun Kno', blurb: '/you already know/' },
  kissmiteeth: { label: 'Kiss Mi Teeth', blurb: '/the sound of disapproval/' },
  walkgood: { label: 'Walk Good', blurb: '/go safely, live well/' },
  believe: { label: 'Believe Inna Yuhself', blurb: 'Everyday motivation in refined serif with liquid gold.' },
  canthear: { label: "Who Can't Hear Will Feel", blurb: 'A Jamaican proverb, set in gallery-grade modern type.' },
  bomboclaat: { label: 'Bomboclaat', blurb: '/exclamation/ — the dictionary entry, luxury typography.' },
  // --- Etsy-style Jamaica line (2026-08-28) ---
  flagx: { label: 'Jamaica Flag X', blurb: 'Brush-stroke X inna green and gold, palm at the heart. Out of many, one people.' },
  crest1962: { label: 'Jamaica Est. 1962', blurb: 'Collegiate heritage crest — crocodile, pineapples, and pride.' },
  onelove: { label: 'One Love', blurb: 'One love, painted in hibiscus. Out of many, one people.' },
  mapja: { label: 'Jamaica Map', blurb: 'The island in gold and green — 18.1° N, 77.3° W. Heart of the Caribbean.' },
  vacay: { label: 'Vacation Mode', blurb: 'Flag inna di lens, palms inna di reflection. Sun, sea, riddim.' },
  empress: { label: 'Island Empress', blurb: 'Crowned inna culture — headwrap inna di colours, gold hoops mandatory.' },
  land876: { label: '876 Land We Love', blurb: 'One area code, one family. Area code pride fi life.' },
  wahgwaan2: { label: 'Wah Gwaan Classic', blurb: 'Di only greeting yuh need — flag colours edition.' },
  bdaycrew: { label: 'Di Birthday Crew', blurb: 'Wi come fi celebrate! Matching tees fi di whole crew.' },
  walkgood2: { label: 'Walk Good Classic', blurb: 'A blessing, not a goodbye — flag colours edition.' },
  varsity62: { label: 'Jamaica 62', blurb: 'Independence number, varsity style. Kingston stand up.' },
  gyaldem: { label: 'Gyal Dem Trip', blurb: 'Wi reach! Fi di gyal dem weh land together and shell di place.' },
};

export const KIND = {
  tee: { name: 'Tee', long: 'Unisex Tee', order: 1 },
  wtee: { name: "Women's", long: "Women's Tee", order: 2 },
  tank: { name: 'Tank', long: 'Unisex Tank', order: 3 },
  wtank: { name: "W. Tank", long: "Women's Racerback Tank", order: 4 },
  crew: { name: 'Crew', long: 'Crewneck Sweater', order: 5 },
  hoodie: { name: 'Hoodie', long: 'Hoodie', order: 6 },
  gdtee: { name: 'Heavyweight', long: 'Garment-Dyed Heavyweight Tee', order: 2.5 },
  mug: { name: 'Mug', long: 'Ceramic Mug 11oz', order: 7 },
  cap: { name: 'Cap', long: 'Trucker Cap', order: 8 },
};

// Flagship-first display order.
// Order = demand rank. money/neverlose stay first (they drive the MANTRA feature).
// After them: the categories the Etsy market research proved sell hardest —
// group-buy shirts (birthday/girls trip) and flag/One Love graphics lead.
// TODO: once Printify orders exist, re-sort this by real sales counts.
const DESIGN_ORDER = ['money', 'neverlose', 'flagx', 'bdaycrew', 'gyaldem', 'vacay', 'onelove', 'crest1962', 'land876', 'mapja', 'empress', 'varsity62', 'wahgwaan2', 'walkgood2', 'wahgwaan', 'notperfect', 'tallawah', 'area876', 'xmark', 'cho', 'rhaatid', 'sooncome', 'dunkno', 'kissmiteeth', 'walkgood', 'believe', 'canthear', 'bomboclaat'];

const dOrder = (d) => { const i = DESIGN_ORDER.indexOf(d); return i === -1 ? 99 : i; };

// Flat product list (used by checkout to resolve price/variant server-side).
export const PRODUCTS = Object.entries(map.products).map(([key, p]) => ({
  key,
  printifyId: p.id,
  design: p.design,
  kind: p.kind,
  kindName: KIND[p.kind]?.long || p.kind,
  name: `${DESIGN[p.design]?.label || p.design} — ${KIND[p.kind]?.long || p.kind}`,
  blurb: DESIGN[p.design]?.blurb || '',
  price: p.price,
  image: `/store/${key}.jpg?v=${IMG_V}`,
  variants: p.variants,
}));

export const productByKey = (k) => PRODUCTS.find((p) => p.key === k);

// UGC model videos shown on the design card in place of the flat mockup.
const DESIGN_VIDEO = {
  flagx: '/store/ugc-flagx.mp4',
};

// Drag-to-spin 360 turntables (model wearing the design).
const DESIGN_SPIN = {
  flagx: '/store/spin-flagx.mp4',
};

// One entry per DESIGN, garments grouped inside — the storefront browses these.
export const DESIGN_GROUPS = DESIGN_ORDER
  .map((d) => {
    const items = PRODUCTS.filter((p) => p.design === d).sort(
      (a, b) => (KIND[a.kind]?.order || 99) - (KIND[b.kind]?.order || 99)
    );
    if (!items.length) return null;
    return {
      design: d,
      label: DESIGN[d]?.label || d,
      blurb: DESIGN[d]?.blurb || '',
      video: DESIGN_VIDEO[d] || null,
      spin: DESIGN_SPIN[d] || null,
      items,
      kinds: items.map((i) => i.kind),
    };
  })
  .filter(Boolean);

export const money = (c) => `$${(c / 100).toFixed(2)}`;
