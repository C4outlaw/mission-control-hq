import Stripe from 'stripe';
import { cat30ByKey } from '../../../lib/catalog-30';
import map from '../../../lib/customcat-map.json';

export const runtime = 'nodejs';

// CustomCat checkout for the Everyday Collection (30 designs).
// Prices and SKUs are resolved server-side from lib/customcat-map.json,
// so a tampered request can never set its own price or SKU.
//
// Request body: { items: [{ key, color, size, qty }] }
//   key:   c30-01 .. c30-30
//   color: must exist in map.blanks[blank].variants as "Color|Size"
//   size:  must exist in map.blanks[blank].variants as "Color|Size"
//   qty:   1..10
//
// Stripe metadata carries a compact fulfil list for the webhook:
// "blankKey:color:size:designKey:qty;..." (see lib/customcat-order.js).

function buildFulfilMetadata(fulfil) {
  const parts = fulfil.map((f) => `${f.blank}:${f.color}:${f.size}:${f.design}:${f.q}`);
  const keys = ['fulfil', 'fulfil2', 'fulfil3', 'fulfil4'];
  const metadata = { type: 'customcat-merch' };
  let ki = 0;
  let buf = '';
  for (const part of parts) {
    const next = buf ? `${buf};${part}` : part;
    if (next.length > 480) {
      metadata[keys[ki]] = buf + ';';
      ki += 1;
      if (ki >= keys.length) throw new Error('cart-too-large');
      buf = part;
    } else {
      buf = next;
    }
  }
  if (buf) metadata[keys[ki]] = buf;
  return metadata;
}

function resolveVariant(key, color, size) {
  const product = cat30ByKey(key);
  if (!product) return { error: `unknown product: ${key}` };
  const design = map.designs[key];
  if (!design) return { error: `no design mapping for: ${key}` };
  const blank = map.blanks[design.blank];
  if (!blank) return { error: `unknown blank: ${design.blank}` };
  const vKey = `${color}|${size}`;
  const variant = blank.variants[vKey];
  if (!variant || !variant.catalogSku) {
    return { error: `unavailable variant: ${product.title} ${color} ${size}` };
  }
  return { product, design, blank, variant, vKey };
}

export async function POST(req) {
  try {
    const sKey = process.env.STRIPE_SECRET_KEY;
    if (!sKey) return Response.json({ error: 'Stripe is not configured' }, { status: 500 });
    const stripe = new Stripe(sKey);

    const { items = [] } = await req.json().catch(() => ({}));
    if (!Array.isArray(items) || !items.length) {
      return Response.json({ error: 'empty-cart' }, { status: 400 });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'https://myriehq.com';

    const line_items = [];
    const fulfil = [];
    for (const it of items.slice(0, 20)) {
      const key = String(it.key || '');
      const color = String(it.color || '');
      const size = String(it.size || '');
      const qty = Math.min(Math.max(parseInt(it.qty, 10) || 1, 1), 10);
      if (!key || !color || !size) continue;

      const r = resolveVariant(key, color, size);
      if (r.error) return Response.json({ error: r.error }, { status: 400 });

      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount: r.blank.retail_cents,
          product_data: {
            name: `${r.product.title} (${color} / ${size})`,
            description: r.product.blurb.slice(0, 300) || undefined,
            images: [`${origin}${r.product.mockup}`],
          },
        },
      });
      fulfil.push({ blank: r.design.blank, color, size, design: key, q: qty });
    }
    if (!line_items.length) return Response.json({ error: 'no-valid-items' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'JM'] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 599, currency: 'usd' },
            display_name: 'Standard shipping (CustomCat Economy)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      metadata: buildFulfilMetadata(fulfil),
      success_url: `${origin}/store/thank-you?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: e.message || 'checkout-failed' }, { status: 500 });
  }
}

// GET returns the available variants for a product (for the storefront pickers).
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) return Response.json({ error: 'missing key' }, { status: 400 });
  const product = cat30ByKey(key);
  if (!product) return Response.json({ error: 'unknown product' }, { status: 404 });
  const design = map.designs[key];
  const blank = design ? map.blanks[design.blank] : null;
  if (!blank) return Response.json({ error: 'no blank mapping' }, { status: 404 });

  const variants = Object.entries(blank.variants || {})
    .filter(([, v]) => v.catalogSku)
    .map(([k, v]) => {
      const [color, size] = k.split('|');
      return { color, size, inStock: v.inStock };
    });
  const colors = [...new Set(variants.map((v) => v.color))].sort();
  const sizes = [...new Set(variants.map((v) => v.size))].sort();
  return Response.json({
    key,
    blank: design.blank,
    blankName: blank.name,
    price_cents: blank.retail_cents,
    colors,
    sizes,
    variants,
  });
}
