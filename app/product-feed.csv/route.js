import { CATALOGUE } from '../../lib/store-unified';

// Meta product feed for The Lost Jamaican store.
//
// This exists to get the store into a Meta catalogue. Once products live in the
// catalogue they can be tagged in posts instead of linked, and a tagged product
// is not a link - which is what gets us out from under Meta's cap of two
// organic link posts a month. Point Commerce Manager at:
//   https://www.myriehq.com/product-feed.csv
// and set it to refresh daily.
const SITE = 'https://www.myriehq.com';

const abs = (u) => (!u ? '' : /^https?:/i.test(u) ? u : SITE + (u.startsWith('/') ? u : '/' + u));

// RFC 4180: wrap every field and double any quote inside it. Blurbs carry
// commas and apostrophes, and one stray comma silently shifts every later
// column, so nothing goes out unquoted.
const cell = (v) => '"' + String(v ?? '').replace(/"/g, '""').replace(/\s+/g, ' ').trim() + '"';

const COLUMNS = [
  'id', 'title', 'description', 'availability', 'condition',
  'price', 'link', 'image_link', 'brand', 'google_product_category',
];

// Apparel and mugs sit in different Google categories; Meta uses this to place
// the item, and a wrong category is worse than a coarse one.
const CATEGORY = {
  tee: 'Apparel & Accessories > Clothing > Shirts & Tops',
  hoodie: 'Apparel & Accessories > Clothing > Outerwear',
  crew: 'Apparel & Accessories > Clothing > Outerwear',
  cap: 'Apparel & Accessories > Clothing Accessories > Hats',
  mug: 'Home & Garden > Kitchen & Dining > Tableware > Drinkware > Mugs',
};

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = [COLUMNS.join(',')];

  for (const p of CATALOGUE) {
    // A piece we cannot actually fulfil must not appear in the catalogue -
    // Meta would happily show it and the sale would land on nothing.
    if (!p.sellable) continue;

    const title = [p.name, p.kindName].filter(Boolean).join(' - ').slice(0, 150);
    rows.push([
      cell(p.id),
      cell(title),
      cell(p.blurb || title),
      cell('in stock'),
      cell('new'),
      cell((p.price / 100).toFixed(2) + ' USD'),
      cell(`${SITE}/store#p-${p.id}`),
      cell(abs(p.image)),
      cell('The Lost Jamaican'),
      cell(CATEGORY[p.kind] || 'Apparel & Accessories'),
    ].join(','));
  }

  return new Response(rows.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
