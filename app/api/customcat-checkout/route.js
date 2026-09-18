import Stripe from 'stripe';
import map from '../../../lib/customcat-map.json';
import { DESIGNS_40, PRODUCT_TYPES } from '../../../lib/designs-40';

export const runtime = 'nodejs';

// CustomCat checkout for the 40-design collection.
// Each design is available on tee (G500), hoodie (G185), mug (MUG11), hat (HAT).
// Prices and SKUs resolved server-side from lib/customcat-map.json.
//
// Request body: { items: [{ key, blank, color, size, qty }] }
//   key:   design key (c30-XX or trend-XX)
//   blank: G500 | G185 | MUG11 | HAT (must be in design.blanks)
//   color: must exist in map.blanks[blank].variants as "Color|Size"
//   size:  must exist in map.blanks[blank].variants as "Color|Size"
//   qty:   1..10

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

function getDesign(key) {
  return DESIGNS_40.find((d) => d.key === key || d.design === key);
}

function getProductType(blankKey) {
  const map2 = { G500: 'tee', G185: 'hoodie', MUG11: 'mug', HAT: 'hat' };
  const ptKey = map2[blankKey];
  return PRODUCT_TYPES.find((p) => p.key === ptKey);
}

function resolveVariant(key, blankKey, color, size) {
  const designInfo = getDesign(key);
  if (!designInfo) return { error: `unknown design: ${key}` };
  const design = map.designs[designInfo.design] || map.designs[key];
  if (!design) return { error: `no mapping for: ${key}` };
  const available = design.blanks || [];
  if (!available.includes(blankKey)) {
    return { error: `blank ${blankKey} not available for ${key}` };
  }
  const blank = map.blanks[blankKey];
  if (!blank) return { error: `unknown blank: ${blankKey}` };
  const vKey = `${color}|${size}`;
  const variant = blank.variants[vKey];
  if (!variant || !variant.catalogSku) {
    return { error: `unavailable: ${designInfo.title} ${color} ${size}` };
  }
  const pt = getProductType(blankKey);
  return { designInfo, design, blank, blankKey, variant, vKey, productType: pt };
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
      const blankKey = String(it.blank || '');
      const color = String(it.color || '');
      const size = String(it.size || '');
      const qty = Math.min(Math.max(parseInt(it.qty, 10) || 1, 1), 10);
      if (!key || !blankKey || !color || !size) continue;

      const r = resolveVariant(key, blankKey, color, size);
      if (r.error) return Response.json({ error: r.error }, { status: 400 });

      const priceCents = Math.round(r.productType.price * 100);
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount: priceCents,
          product_data: {
            name: `${r.designInfo.title} - ${r.productType.label} (${color} / ${size})`,
            description: r.designInfo.blurb.slice(0, 300) || undefined,
            images: [`${origin}${r.designInfo.image}`],
          },
        },
      });
      fulfil.push({ blank: blankKey, color, size, design: r.designInfo.design, q: qty });
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
            display_name: 'Standard shipping (5-10 business days)',
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

// GET returns available variants: ?key=DESIGN_KEY&blank=G500
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const blankKey = searchParams.get('blank');
  if (!key || !blankKey) return Response.json({ error: 'missing key or blank' }, { status: 400 });

  const r = resolveVariant(key, blankKey, '__probe__', '__probe__');
  // We just need the blank info; use direct lookup
  const designInfo = getDesign(key);
  if (!designInfo) return Response.json({ error: 'unknown design' }, { status: 404 });
  const blank = map.blanks[blankKey];
  if (!blank) return Response.json({ error: 'unknown blank' }, { status: 404 });

  const variants = Object.entries(blank.variants || {})
    .filter(([, v]) => v.catalogSku)
    .map(([k, v]) => {
      const [color, size] = k.split('|');
      return { color, size, inStock: v.inStock };
    });
  const colors = [...new Set(variants.map((v) => v.color))].sort();
  const sizes = [...new Set(variants.map((v) => v.size))].sort();
  const pt = getProductType(blankKey);
  return Response.json({
    key, blank: blankKey, blankName: blank.name,
    price: pt ? pt.price : 0, price_cents: pt ? Math.round(pt.price * 100) : 0,
    colors, sizes, variants,
  });
}
