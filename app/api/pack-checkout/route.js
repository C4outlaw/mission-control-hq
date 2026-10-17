// Digital print-pack checkout. Unlike /api/store-checkout (physical merch: shipping address,
// CustomCat fulfilment), this is a fixed-price instant-download product: no shipping, no address,
// delivered on the thank-you page (and by email from the webhook) after Stripe confirms payment.
// The price is fixed here on the server, so a tampered request cannot change it.
import Stripe from 'stripe';
import { STICKER_PACKS } from '../../../lib/print-pack';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return Response.json({ error: 'Stripe is not configured' }, { status: 500 });
    const body = await req.json().catch(() => ({}));
    const pack = STICKER_PACKS[body.pack] || STICKER_PACKS.patwa;
    const stripe = new Stripe(key);
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'https://myriehq.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: pack.price,
            product_data: {
              name: pack.name,
              description: pack.description,
              images: [`${origin}${pack.image}`],
            },
          },
        },
      ],
      metadata: { type: 'digital', pack: pack.id },
      success_url: `${origin}/store/pack-thank-you?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: 'Checkout unavailable' }, { status: 500 });
  }
}
