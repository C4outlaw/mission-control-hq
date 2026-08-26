// Display catalog for The Lost Jamaican store, derived from the live Printify map
// so the site can never drift from what is actually printable.
import map from './printify-map.json';

const DESIGN = {
  neverlose: { label: 'NEVER LOSE', blurb: 'The flagship. Heavyweight modern type with a liquid-gold finish.' },
  money: { label: 'More Money Than Last Year', blurb: 'Refined modern serif with a liquid-gold accent. A quiet flex.' },
  tallawah: { label: 'Likkle But Tallawah', blurb: 'Small but mighty. Refined modern serif with liquid gold.' },
  believe: { label: 'Believe Inna Yuhself', blurb: 'Everyday motivation, in refined modern serif with liquid gold.' },
  canthear: { label: "Who Can't Hear Will Feel", blurb: 'A Jamaican proverb, set in gallery-grade modern type.' },
  bomboclaat: { label: 'Bomboclaat', blurb: 'The dictionary entry, done in modern luxury typography.' },
  notperfect: { label: 'Not Perfect But Jamaican', blurb: "And that's close enough. Modern serif with a gold accent." },
  cho: { label: 'Cho!', blurb: '/expression of annoyance/ — the dictionary entry, luxury type.' },
  rhaatid: { label: 'Rhaatid!', blurb: '/mild astonishment/ — the dictionary entry, luxury type.' },
  sooncome: { label: 'Soon Come', blurb: '/arriving eventually, no promises/' },
  dunkno: { label: 'Dun Kno', blurb: '/you already know/' },
  kissmiteeth: { label: 'Kiss Mi Teeth', blurb: '/the sound of disapproval/' },
  walkgood: { label: 'Walk Good', blurb: '/go safely, live well/' },
  wahgwaan: { label: 'Wah Gwaan', blurb: 'The greeting every yaadie knows, in bold contemporary type.' },
  area876: { label: '876', blurb: 'Land We Love. Polished gold numerals, luxury athletic energy.' },
  xmark: { label: 'The Lost Jamaican X', blurb: 'The flag reimagined as a gold and green emblem.' },
};

const KIND = {
  tee: { name: 'Unisex Tee', group: 'Tees', order: 1 },
  wtee: { name: "Women's Tee", group: 'Tees', order: 2 },
  tank: { name: 'Unisex Tank', group: 'Tanks', order: 3 },
  wtank: { name: "Women's Racerback Tank", group: 'Tanks', order: 4 },
  crew: { name: 'Crewneck Sweater', group: 'Sweats', order: 5 },
  hoodie: { name: 'Hoodie', group: 'Sweats', order: 6 },
  mug: { name: 'Ceramic Mug 11oz', group: 'Drinkware', order: 7 },
};

// Flagship-first display order: More Money and Never Lose lead the store.
const DESIGN_ORDER = ['money', 'neverlose', 'wahgwaan', 'notperfect', 'tallawah', 'area876', 'xmark', 'cho', 'rhaatid', 'sooncome', 'dunkno', 'kissmiteeth', 'walkgood', 'believe', 'canthear', 'bomboclaat'];
const dOrder = (d) => { const i = DESIGN_ORDER.indexOf(d); return i === -1 ? 99 : i; };

export const PRODUCTS = Object.entries(map.products)
  .map(([key, p]) => ({
    key,
    printifyId: p.id,
    design: p.design,
    kind: p.kind,
    kindName: KIND[p.kind]?.name || p.kind,
    group: KIND[p.kind]?.group || 'Other',
    order: KIND[p.kind]?.order || 99,
    name: `${DESIGN[p.design]?.label || p.design} — ${KIND[p.kind]?.name || p.kind}`,
    blurb: DESIGN[p.design]?.blurb || '',
    price: p.price,
    image: `/store/${key}.jpg?v=5`,
    variants: p.variants,
  }))
  .sort((a, b) => dOrder(a.design) - dOrder(b.design) || a.order - b.order);

export const productByKey = (k) => PRODUCTS.find((p) => p.key === k);
export const GROUPS = ['Tees', 'Tanks', 'Sweats', 'Drinkware'];
export const money = (c) => `$${(c / 100).toFixed(2)}`;
