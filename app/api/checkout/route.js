import Stripe from 'stripe';
import { BASE, byId } from '../../../lib/prompt-packs';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return Response.json({ error: 'Stripe is not configured' }, { status: 500 });
    const stripe = new Stripe(key);

    const { addons = [], amount } = await req.json().catch(() => ({}));
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'https://myriehq.com';

    // Pay-what-you-want with a server-side floor: whatever the browser posts is
    // clamped here before the session is created, so a tampered request can never
    // produce a price below the minimum.
    const chosen = Math.round(Number(amount));
    const unit = Math.max(BASE.minAmount, Number.isFinite(chosen) ? chosen : BASE.defaultAmount);
    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: unit,
          product_data: { name: BASE.name, description: BASE.blurb.slice(0, 300) },
        },
      },
    ];

    const picked = [];
    for (const id of Array.isArray(addons) ? addons : []) {
      const a = byId(id);
      if (!a) continue;
      picked.push(a.id);
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: a.price,
          product_data: { name: a.name, description: a.blurb.slice(0, 300) },
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      // Stripe collects the email; fulfilment mails the download link there.
      customer_creation: 'always',
      metadata: { addons: picked.join(','), product: 'prompt-pack' },
      success_url: `${origin}/prompts/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/prompts?cancelled=1`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
