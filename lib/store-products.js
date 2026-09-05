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
  // --- Drop 01: slang on the bestseller looks (2026-09-02) ---
  nuhworry: { label: 'Nuh Worry Yuhself', blurb: 'Arched retro type, sun over the horizon. The calm-down classic.' },
  wahgwaansun: { label: 'Wah Gwaan Jamaica', blurb: 'Retro sunset window — palms, mountains, sea. The greeting, framed.' },
  nuhbaddacoffee: { label: 'Nuh Badda Mi Before Coffee', blurb: 'Two iced coffees and a warning. Stacked hand-script and slab type.' },
  cyaafix: { label: 'Mi Cyaa Fix Eediat', blurb: 'Mi can fix a lot of tings, but mi cyaa fix eediat. Machete badge.' },
  tallawahbird: { label: 'Likkle But Tallawah', blurb: 'Doctor bird over a red sun, sumi-e style. Small but mighty.' },
  rudebwoy: { label: 'Rude Bwoy', blurb: 'Western slab type and crossed machetes, vintage distressed.' },
  yardie: { label: 'Yardie', blurb: 'Varsity back print with Lost Jamaican script. Pursuit of vibes.' },
  certified: { label: 'Certified Bumboclaat', blurb: 'Small, minimal, undeniable.' },
  fiyahbun: { label: 'Fiyah Bun Bad Mind', blurb: 'Retro sunset circle, palms and sea. Burn the bad mind.' },
  gwehmug: { label: 'Gweh, Mi A Drink Mi Coffee', blurb: 'Typewriter type. Say less.' },
  goodmorning: { label: 'Good Morning Bumboclaats', blurb: 'Cute doodles, rude greeting.' },
  hiddenbumbo: { label: 'Bumbo Claat', blurb: 'Hidden in the pattern until you look.' },
  frogmug: { label: 'Sometimes Mi Just Seh Raasclaat', blurb: 'Line-art frog with his cup. Relatable.' },
  nuhbaddacap: { label: 'Nuh Badda Mi', blurb: 'Neon trucker, marker type.' },
  gwehcap: { label: 'Gweh', blurb: 'Neon trucker, marker type.' },
  bumbocap: { label: 'Bumboclaat', blurb: 'Neon trucker, marker type.' },
  rudegyal: { label: 'Rude Gyal', blurb: 'Neon trucker, marker type.' },
  kissmiraas: { label: 'Kiss Mi Raas', blurb: 'Neon trucker, marker type.' },
  yardieaf: { label: 'Yardie AF', blurb: 'Neon trucker, marker type.' },
  yuhtoolie: { label: 'Yuh Too Lie', blurb: 'Neon trucker, marker type.' },
  maddawg: { label: 'Mad Dawg', blurb: 'Neon trucker, marker type.' },
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
const DESIGN_ORDER = ['nuhworry', 'wahgwaansun', 'nuhbaddacoffee', 'cyaafix', 'tallawahbird', 'rudebwoy', 'yardie', 'certified', 'fiyahbun', 'gwehmug', 'goodmorning', 'hiddenbumbo', 'frogmug', 'nuhbaddacap', 'gwehcap', 'bumbocap', 'rudegyal', 'kissmiraas', 'yardieaf', 'yuhtoolie', 'maddawg', 'money', 'neverlose', 'flagx', 'bdaycrew', 'gyaldem', 'vacay', 'onelove', 'crest1962', 'land876', 'mapja', 'empress', 'varsity62', 'wahgwaan2', 'walkgood2', 'wahgwaan', 'notperfect', 'tallawah', 'area876', 'xmark', 'cho', 'rhaatid', 'sooncome', 'dunkno', 'kissmiteeth', 'walkgood', 'believe', 'canthear', 'bomboclaat'];

const dOrder = (d) => { const i = DESIGN_ORDER.indexOf(d); return i === -1 ? 99 : i; };

// Flat product list (used by checkout to resolve price/variant server-side).
// Hidden products stay in the map (and on Printify) but never render or sell.
export const PRODUCTS = Object.entries(map.products).filter(([, p]) => !p.hidden).map(([key, p]) => ({
  key,
  printifyId: p.id,
  design: p.design,
  kind: p.kind,
  kindName: KIND[p.kind]?.long || p.kind,
  name: `${DESIGN[p.design]?.label || p.design} — ${KIND[p.kind]?.long || p.kind}`,
  blurb: DESIGN[p.design]?.blurb || '',
  price: p.price,
  compareAt: p.compareAt || null,
  image: p.images ? (p.images.default || p.images[(p.colors || [])[0]]) : `/store/${key}.jpg?v=${IMG_V}`,
  images: p.images || {},
  gallery: p.gallery || [],
  colors: p.colors || [],
  variants: p.variants,
}));

// Drop 01 grouped for the storefront: each apparel piece leads, its mug + cap sit beneath.
export const DROP_GROUPS = ['nuhworry', 'wahgwaansun', 'nuhbaddacoffee', 'cyaafix', 'tallawahbird', 'rudebwoy', 'yardie', 'certified', 'fiyahbun']
  .map((d) => ({ design: d, label: DESIGN[d]?.label || d, blurb: DESIGN[d]?.blurb || '', lead: PRODUCTS.find((p) => p.design === d && (p.kind === 'tee' || p.kind === 'hoodie')), extras: PRODUCTS.filter((p) => p.design === d && p.kind !== 'tee' && p.kind !== 'hoodie') }))
  .filter((g) => g.lead);
export const DROP_MUGS = PRODUCTS.filter((p) => p.kind === 'mug' && p.design !== 'nuhworry');
export const DROP_CAPS = PRODUCTS.filter((p) => p.kind === 'cap' && p.design !== 'nuhworry');

// Every Drop 01 product in one browseable list: apparel first, then mugs, then caps,
// and inside each kind the drop's own design order.
export const DROP_ALL = [...PRODUCTS]
  .filter((p) => dOrder(p.design) < DESIGN_ORDER.indexOf('money'))
  .sort((a, b) => (KIND[a.kind]?.order || 99) - (KIND[b.kind]?.order || 99) || dOrder(a.design) - dOrder(b.design));

export const productByKey = (k) => PRODUCTS.find((p) => p.key === k);

// UGC model videos shown on the design card in place of the flat mockup.
const DESIGN_VIDEO = {
  flagx: '/store/ugc-flagx.mp4',
};

// Drag-to-spin 360 turntables (model wearing the design).
const DESIGN_SPIN = {
  flagx: '/store/spin-flagx.mp4',
};

// Our own house models wearing the designs — rendered locally (Krea2 turbo,
// plain-shirt cast + fabric-aware PIL print composite). These lead the card,
// like a lifestyle shot on any marketplace; the flat Printify mockups follow
// in the listing gallery. Designs without a shot fall back to their mockup.
export const DESIGN_MODELS = {
  area876: ['/store/model/area876--m-young-blk.jpg', '/store/model/area876--w-bantu-blk.jpg', '/store/model/area876--w-curls-crm.jpg'],
  bdaycrew: ['/store/model/bdaycrew--m-tall-crm.jpg', '/store/model/bdaycrew--w-bantu-blk.jpg', '/store/model/bdaycrew--w-beach-blk.jpg'],
  believe: ['/store/model/believe--m-fade-grn.jpg', '/store/model/believe--w-afro-wht.jpg', '/store/model/believe--w-beach-blk.jpg'],
  bomboclaat: ['/store/model/bomboclaat--m-slim-nvy2.jpg', '/store/model/bomboclaat--w-curls-crm.jpg', '/store/model/bomboclaat--w-wrap-blk3.jpg'],
  canthear: ['/store/model/canthear--m-locs-wht.jpg', '/store/model/canthear--m-slim-nvy2.jpg', '/store/model/canthear--w-curl-grn2.jpg'],
  cho: ['/store/model/cho--m-dread-blk2.jpg', '/store/model/cho--w-bantu-blk.jpg', '/store/model/cho--w-twist-coral.jpg'],
  crest1962: ['/store/model/crest1962--m-fade-grn.jpg', '/store/model/crest1962--m-locs-wht.jpg', '/store/model/crest1962--w-braids-blk.jpg'],
  dunkno: ['/store/model/dunkno--m-broad-nvy.jpg', '/store/model/dunkno--w-braids-blk.jpg', '/store/model/dunkno--w-curls-crm.jpg'],
  empress: ['/store/model/empress--w-afro-wht.jpg', '/store/model/empress--w-bantu-blk.jpg', '/store/model/empress--w-straight-nvy.jpg'],
  flagx: ['/store/model/flagx--m-beard-blk.jpg', '/store/model/flagx--w-afro-wht.jpg', '/store/model/flagx--w-beach-blk.jpg'],
  gyaldem: ['/store/model/gyaldem--m-locs-wht.jpg', '/store/model/gyaldem--w-bantu-blk.jpg', '/store/model/gyaldem--w-locs-grn.jpg'],
  kissmiteeth: ['/store/model/kissmiteeth--m-short-grn2.jpg', '/store/model/kissmiteeth--m-tall-crm.jpg', '/store/model/kissmiteeth--w-fro-blk2.jpg'],
  land876: ['/store/model/land876--m-broad-nvy.jpg', '/store/model/land876--m-locs-wht.jpg', '/store/model/land876--w-straight-nvy.jpg'],
  mapja: ['/store/model/mapja--m-broad-nvy.jpg', '/store/model/mapja--m-tall-crm.jpg', '/store/model/mapja--w-locs-grn.jpg'],
  money: ['/store/model/money--m-beard-blk.jpg', '/store/model/money--w-beach-blk.jpg', '/store/model/money--w-curls-crm.jpg'],
  neverlose: ['/store/model/neverlose--m-fade-grn.jpg', '/store/model/neverlose--m-tall-crm.jpg', '/store/model/neverlose--w-braids-blk.jpg'],
  notperfect: ['/store/model/notperfect--m-bald-blk3.jpg', '/store/model/notperfect--w-afro-wht.jpg', '/store/model/notperfect--w-fro-blk2.jpg'],
  onelove: ['/store/model/onelove--m-young-blk.jpg', '/store/model/onelove--w-braids-blk.jpg', '/store/model/onelove--w-curls-crm.jpg'],
  rhaatid: ['/store/model/rhaatid--m-bald-blk3.jpg', '/store/model/rhaatid--w-afro-wht.jpg', '/store/model/rhaatid--w-straight-nvy.jpg'],
  sooncome: ['/store/model/sooncome--m-locs-wht.jpg', '/store/model/sooncome--m-young-blk.jpg', '/store/model/sooncome--w-locs-grn.jpg'],
  tallawah: ['/store/model/tallawah--m-locs-wht.jpg', '/store/model/tallawah--m-short-grn2.jpg', '/store/model/tallawah--w-wrap-blk3.jpg'],
  vacay: ['/store/model/vacay--m-beard-blk.jpg', '/store/model/vacay--w-beach-blk.jpg', '/store/model/vacay--w-twist-coral.jpg'],
  varsity62: ['/store/model/varsity62--m-young-blk.jpg', '/store/model/varsity62--w-afro-wht.jpg', '/store/model/varsity62--w-braids-blk.jpg'],
  wahgwaan: ['/store/model/wahgwaan--m-dread-blk2.jpg', '/store/model/wahgwaan--w-straight-nvy.jpg', '/store/model/wahgwaan--w-twist-coral.jpg'],
  wahgwaan2: ['/store/model/wahgwaan2--m-young-blk.jpg', '/store/model/wahgwaan2--w-curls-crm.jpg', '/store/model/wahgwaan2--w-locs-grn.jpg'],
  walkgood: ['/store/model/walkgood--m-beard-blk.jpg', '/store/model/walkgood--w-loc-nvy2.jpg', '/store/model/walkgood--w-twist-coral.jpg'],
  walkgood2: ['/store/model/walkgood2--m-fade-grn.jpg', '/store/model/walkgood2--w-straight-nvy.jpg', '/store/model/walkgood2--w-twist-coral.jpg'],
  xmark: ['/store/model/xmark--m-broad-nvy.jpg', '/store/model/xmark--m-tall-crm.jpg', '/store/model/xmark--w-locs-grn.jpg'],
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
      models: DESIGN_MODELS[d] || [],
      items,
      kinds: items.map((i) => i.kind),
    };
  })
  .filter(Boolean);

export const money = (c) => `$${(c / 100).toFixed(2)}`;
