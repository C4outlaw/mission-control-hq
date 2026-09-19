import Stripe from 'stripe';

export const runtime = 'nodejs';

// Simplified CustomCat checkout - uses hardcoded prices to avoid Vercel 503 from JSON import
const PRICES = {
  G500: { price: 24.99, name: 'T-Shirt' },
  G185: { price: 44.99, name: 'Hoodie' },
  MUG11: { price: 14.99, name: 'Mug' },
};

const DESIGN_NAMES = {
  'c30-08': 'We Never Lose Varsity', 'c30-09': 'We Never Lose Wordmark',
  'c30-10': 'We Never Lose Hoodie', 'c30-24': 'More Money Retro',
  'c30-25': 'More Money Hoodie', 'c30-26': 'More Money Mug',
  'c30-05': 'Dog Hair Is My Glitter', 'c30-22': 'Retired 2026',
  'c30-30': '876 Land We Love', 'c30-02': 'Dad Dictionary',
};

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
      const qty = Math.max(1, Math.min(10, parseInt(it.qty) || 1));
      
      const priceInfo = PRICES[blankKey];
      if (!priceInfo) continue;
      
      const designName = DESIGN_NAMES[key] || key;
      const productName = `${designName} - ${priceInfo.name}`;
      
      line_items.push({
        price_data: {
          currency: 'usd',
          product_data: { name: `${productName} (${color} / ${size})` },
          unit_amount: Math.round(priceInfo.price * 100),
        },
        quantity: qty,
      });
      fulfil.push(`${blankKey}:${color}:${size}:${key}:${qty}`);
    }

    if (!line_items.length) {
      return Response.json({ error: 'no-valid-items' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
      metadata: {
        type: 'customcat-merch',
        fulfil: fulfil.join(';').substring(0, 480),
      },
    });

    return Response.json({ url: session.url });
  } catch (e) {
    console.error('checkout error:', e);
    return Response.json({ error: e.message || 'checkout-failed' }, { status: 500 });
  }
}

export async function GET(req) {
  return Response.json({ error: 'use POST for checkout' }, { status: 405 });
}
