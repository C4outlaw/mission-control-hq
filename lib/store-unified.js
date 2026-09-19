// One catalogue for the whole shop.
//
// The store grew three separate lists with three card shapes and three
// fulfilment paths stacked down the page. Shoppers do not care which supplier
// prints a shirt; they want one continuous wall of product they can scan top to
// bottom. This normalises every source into a single item shape so the grid can
// render them side by side, and tags each one with the department the tab bar
// filters on.

import { PRODUCTS, PREMIUM_PRODUCTS, KIND } from './store-products';
import { CATALOG30 } from './catalog-30';
import cc from './customcat-map.json';

/* Which CustomCat blank each garment prints on. */
const BLANK_FOR = { tee: 'G500', hoodie: 'G185', crew: 'G180', mug: 'MUG11' };
const PREMIUM_BLANK_FOR = { tee: 'BC_HW', hoodie: 'LS_PREM' };

// CustomCat spells sizes out in full; Printify abbreviates. Rank both so a
// size dropdown never reads Small, Medium, 6XL, 4XL.
const SIZE_RANK = [
  'XS', 'S', 'Small', 'M', 'Medium', 'L', 'Large', 'XL', 'X-Large',
  '2XL', 'XX-Large', '3XL', 'XXX-Large', '4XL', '5XL', '6XL', 'One size', '11oz',
];
const bySize = (a, b) => SIZE_RANK.indexOf(a) - SIZE_RANK.indexOf(b);

/* The store carries S, M, L and XL only. Mugs keep their single size. */
const ALLOWED_SIZES = new Set([
  'S', 'Small', 'M', 'Medium', 'L', 'Large', 'XL', 'X-Large', 'One size', '11oz',
]);
export const isStockedSize = (sz) => ALLOWED_SIZES.has(sz);

/** Colour/size options a CustomCat blank actually stocks, from its SKU table. */
export function blankOptions(blankKey) {
  const blank = cc.blanks?.[blankKey];
  if (!blank) return { colors: [], sizes: [], ok: false };
  const colors = new Set();
  const sizes = new Set();
  for (const [k, v] of Object.entries(blank.variants || {})) {
    if (!v?.catalogSku) continue;
    const [color, size] = k.split('|');
    if (!isStockedSize(size)) continue;
    colors.add(color);
    sizes.add(size);
  }
  // Lead with the colour most people buy rather than whatever the SKU table
  // happened to list first.
  const PREFERRED = ['Black', 'White', 'Navy', 'Sport Grey', 'Natural'];
  const ranked = [...colors].sort((a, b) => {
    const ia = PREFERRED.indexOf(a), ib = PREFERRED.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });
  return {
    colors: ranked,
    sizes: [...sizes].sort(bySize),
    ok: colors.size > 0,
    name: blank.name || blankKey,
  };
}

/** A CustomCat item can only be sold if its blank has SKUs and its art is mapped. */
function ccSellable(designKey, blankKey) {
  const entry = cc.designs?.[designKey];
  const file = typeof entry === 'string' ? entry : entry?.file;
  return Boolean(file) && blankOptions(blankKey).ok;
}

const DEPT = {
  best: { id: 'best', label: 'Best Sellers', order: 1 },
  premium: { id: 'premium', label: 'Premium', order: 2 },
  island: { id: 'island', label: 'The Island Line', order: 3 },
  souvenir: { id: 'souvenir', label: 'Souvenirs', order: 4 },
};

/* Campaign shots generated from the design file itself, so the print on the
   model is the real artwork rather than a paste-up. These lead the card the
   way a model shot leads on any fashion site; the flat mockup follows. */
const UGC = {
  'c30-01': ['/store/ugc/c30-01-1.jpg', '/store/ugc/c30-01-turn.mp4', '/store/ugc/c30-01-2.jpg', '/store/ugc/c30-01-3.jpg'],
  'c30-02': ['/store/ugc/c30-02-1.jpg'],
  'c30-03': ['/store/ugc/c30-03-1.jpg'],
  'c30-04': ['/store/ugc/c30-04-1.jpg'],
  'c30-05': ['/store/ugc/c30-05-1.jpg'],
  'c30-06': ['/store/ugc/c30-06-1.jpg'],
  'c30-07': ['/store/ugc/c30-07-1.jpg'],
  'c30-08': ['/store/ugc/c30-08-1.jpg'],
  'c30-09': ['/store/ugc/c30-09-1.jpg'],
  'c30-10': ['/store/ugc/c30-10-1.jpg'],
  'c30-12': ['/store/ugc/c30-12-1.jpg'],
  'c30-14': ['/store/ugc/c30-14-1.jpg'],
  'c30-16': ['/store/ugc/c30-16-1.jpg'],
  'c30-18': ['/store/ugc/c30-18-1.jpg'],
  'c30-21': ['/store/ugc/c30-21-1.jpg'],
  'c30-22': ['/store/ugc/c30-22-1.jpg'],
  'c30-23': ['/store/ugc/c30-23-1.jpg'],
  'c30-24': ['/store/ugc/c30-24-1.jpg'],
  'c30-25': ['/store/ugc/c30-25-1.jpg'],
  'c30-27': ['/store/ugc/c30-27-1.jpg'],
  'c30-28': ['/store/ugc/c30-28-1.jpg'],
  'c30-30': ['/store/ugc/c30-30-1.jpg'],
};

/* ---- source 1: the Everyday 30, printed by CustomCat. The proven sellers. ---- */
const everyday = CATALOG30.map((p) => {
  const blank = BLANK_FOR[p.kind];
  const opts = blankOptions(blank);
  return {
    id: p.key,
    source: 'customcat',
    dept: p.kind === 'mug' ? 'souvenir' : 'best',
    name: p.title,
    kindName: p.kindName,
    kind: p.kind,
    blurb: p.blurb,
    price: p.price,
    compareAt: null,
    image: UGC[p.key]?.[0] || p.mockup,
    images: {},
    gallery: UGC[p.key] ? [...UGC[p.key].slice(1), p.mockup] : [],
    colors: opts.colors,
    sizes: opts.sizes,
    blank,
    designKey: p.key,
    sellable: ccSellable(p.key, blank),
  };
});

/* ---- source 2: the Jamaican line, printed by Printify. ---- */
const island = PRODUCTS.map((p) => ({
  id: p.key,
  source: 'printify',
  dept: p.kind === 'mug' ? 'souvenir' : 'island',
  name: p.name.split(' — ')[0],
  kindName: p.kindName || KIND[p.kind]?.long || p.kind,
  kind: p.kind,
  blurb: p.blurb,
  price: p.price,
  compareAt: p.compareAt,
  image: p.image,
  images: p.images || {},
  gallery: p.gallery || [],
  colors: p.colors || [],
  sizes: [],
  variants: p.variants,
  sellable: Boolean(p.variants?.length),
}));

/* ---- source 3: the premium line. Art is not on a printer yet. ---- */
const premium = PREMIUM_PRODUCTS.map((p) => {
  const blank = PREMIUM_BLANK_FOR[p.kind];
  const opts = blankOptions(blank);
  return {
    id: p.key,
    source: 'premium',
    dept: 'premium',
    name: p.name.replace(/ — .*$/, ''),
    kindName: p.kind === 'hoodie' ? 'Premium Hoodie' : 'Heavyweight Tee',
    kind: p.kind,
    blurb: p.blurb,
    price: p.price,
    compareAt: p.compareAt,
    image: p.image,
    images: {},
    gallery: [],
    colors: opts.colors,
    sizes: opts.sizes,
    blank,
    designKey: null,
    // No print-ready art is mapped for these yet, so they must not offer a buy
    // control that fulfilment could not honour.
    sellable: false,
  };
});

export const DEPARTMENTS = Object.values(DEPT).sort((a, b) => a.order - b.order);

/** Best sellers first, then premium, the island line, and souvenirs. */
export const CATALOGUE = [...everyday, ...premium, ...island].sort(
  (a, b) => DEPT[a.dept].order - DEPT[b.dept].order
);

export const countsByDept = () =>
  CATALOGUE.reduce((m, i) => { m[i.dept] = (m[i.dept] || 0) + 1; return m; }, {});
