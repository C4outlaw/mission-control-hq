// Digital print-pack checkout. Unlike /api/store-checkout (physical merch: shipping address,
// CustomCat fulfilment), this is a fixed-price instant-download product: no shipping, no address,
// delivered on the thank-you page (and by email from the webhook) after Stripe confirms payment.
// The price is fixed here on the server, so a tampered request cannot change it.
import Stripe from 'stripe';
import { PATWA_PACK } from '../../../lib/print-pack';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return Response.json({ error: 'Stripe is not configured' }, { status: 500 });
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
            unit_amount: PATWA_PACK.price,
            product_data: {
              name: PATWA_PACK.name,
              description: PATWA_PACK.description,
              images: [`${origin}/store/patwa-sticker-pack.jpg`],
            },
          },
        },
      ],
      metadata: { type: 'digital', pack: PATWA_PACK.id },
      success_url: `${origin}/store/pack-thank-you?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/store`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: 'Checkout unavailable' }, { status: 500 });
  }
}
