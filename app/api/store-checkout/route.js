import Stripe from 'stripe';
import { productByKey } from '../../../lib/store-products';

export const runtime = 'nodejs';

// Physical-merch checkout. Prices and variant ids are resolved server-side from the
// Printify-derived catalog, so a tampered request can never set its own price.
export async function POST(req) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return Response.json({ error: 'Stripe is not configured' }, { status: 500 });
    const stripe = new Stripe(key);

    const { items = [] } = await req.json().catch(() => ({}));
    if (!Array.isArray(items) || !items.length) {
      return Response.json({ error: 'empty-cart' }, { status: 400 });
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'https://myriehq.com';

    const line_items = [];
    const fulfil = [];
    for (const it of items.slice(0, 20)) {
      const p = productByKey(String(it.key || ''));
      if (!p) continue;
      const variant = p.variants.find((v) => String(v.id) === String(it.variantId)) || p.variants[0];
      const qty = Math.min(Math.max(parseInt(it.qty, 10) || 1, 1), 10);
      line_items.push({
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount: p.price,
          product_data: {
            name: `${p.name}${variant.size && variant.size !== '11oz' ? ` (${variant.size})` : ''}`,
            description: p.blurb.slice(0, 300) || undefined,
          },
        },
      });
      fulfil.push({ p: p.printifyId, v: variant.id, q: qty });
    }
    if (!line_items.length) return Response.json({ error: 'no-valid-items' }, { status: 400 });

    // Flat shipping line so the buyer sees the real total before paying.
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
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 10 },
            },
          },
        },
      ],
      metadata: { type: 'merch', fulfil: JSON.stringify(fulfil).slice(0, 480) },
      success_url: `${origin}/store/thank-you?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: e.message || 'checkout-failed' }, { status: 500 });
  }
}
