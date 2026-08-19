// Create the live Stripe webhook endpoint and store its signing secret in .env.local.
// Secrets are read from and written to the env file directly — nothing is printed,
// so no key ever appears in a terminal log or chat transcript.
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const get = (k) => (env.match(new RegExp(`^${k}=(.*)$`, 'm')) || [])[1]?.trim();

const key = get('STRIPE_SECRET_KEY');
if (!key || key.includes('PASTE_YOUR')) {
  console.error('STRIPE_SECRET_KEY is still the placeholder. Paste the real key into .env.local first.');
  process.exit(1);
}

const Stripe = require('stripe');
const stripe = new Stripe(key);
const url = (get('NEXT_PUBLIC_SITE_URL') || 'https://myriehq.com') + '/api/stripe-webhook';

(async () => {
  // Reuse an existing endpoint for this URL instead of stacking duplicates.
  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  let ep = existing.data.find((e) => e.url === url);
  if (ep && !env.match(/^STRIPE_WEBHOOK_SECRET=whsec_/m)) {
    // The signing secret is only returned at creation time; replace to obtain a fresh one.
    await stripe.webhookEndpoints.del(ep.id);
    ep = null;
  }
  if (!ep) {
    ep = await stripe.webhookEndpoints.create({
      url,
      enabled_events: ['checkout.session.completed'],
      description: 'MyrieHQ prompt pack fulfilment',
    });
    const next = env.replace(/^STRIPE_WEBHOOK_SECRET=.*$/m, `STRIPE_WEBHOOK_SECRET=${ep.secret}`);
    fs.writeFileSync(envPath, next);
  }
  console.log(`WEBHOOK_OK id=${ep.id} url=${url} events=checkout.session.completed (secret stored in .env.local, not shown)`);
})().catch((e) => { console.error('WEBHOOK_FAILED', e.message); process.exit(1); });
