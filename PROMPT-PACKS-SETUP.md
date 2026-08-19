# Prompt Packs store — setup

Digital-download store at `/prompts`. Pay-what-you-want base with a hard floor, plus
checkbox add-ons, Stripe Checkout, and emailed signed download links.

## 1. Install the two packages

```bash
npm i stripe archiver
```

## 2. Environment (`.env.local` — never commit this)

```
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PROMPT_PACK_SECRET=<any long random string you invent>
NEXT_PUBLIC_SITE_URL=https://myriehq.com
PACK_DIR=C:/path/to/private/packs
PACK_FROM=downloads@myriehq.com
# SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS already exist for the mailer
```

`PROMPT_PACK_SECRET` signs the download grants. Change it and every outstanding link dies,
so pick it once and leave it.

## 3. Put the files where only the server can reach them

```
private/packs/PROMPT-PACK.pdf
private/packs/MACHINE-READABLE-KIT.zip
private/packs/PRODUCTION-TOOLKIT.zip
```

Anything inside `public/` is fetchable by URL with no payment, so packs must **not** live
there. `PACK_DIR` can point anywhere on the server.

## 4. Register the webhook

Stripe dashboard → Developers → Webhooks → add endpoint:

```
https://myriehq.com/api/stripe-webhook
```

Subscribe to `checkout.session.completed` only. Copy the signing secret into
`STRIPE_WEBHOOK_SECRET`.

## 5. Test before going live

Use Stripe **test** keys and card `4242 4242 4242 4242`, any future expiry, any CVC.

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
npm run dev
```

Check: the floor holds (try to pay less than $4.99 — Stripe rejects it), add-ons appear as
separate line items, the email arrives, the link downloads, and the link 403s after you
tamper with a character in it.

Swap to live keys only after all five pass.

## How the money and the floor work

The base line item uses Stripe's `custom_unit_amount` with `minimum: 499`. The floor is
enforced by Stripe on their servers, so editing the amount in the browser cannot get the
pack for $0 — Stripe refuses to create the session.

Add-ons are ordinary fixed-price line items chosen before the session is created.

## How fulfilment works

There is no database. On `checkout.session.completed` the webhook builds the buyer's file
list, signs it into an HMAC token with a 72-hour expiry, and emails that link. The download
route verifies the signature and expiry, then streams the file (or zips several). A forged
or expired token fails closed.

If the email send fails the route returns 500 on purpose — Stripe then retries the event,
so a paid order is not silently lost.

## Changing prices or adding a pack

Everything is in `lib/prompt-packs.js`. Add an entry to `ADDONS` and drop the matching file
into `PACK_DIR`. The store page and checkout pick it up with no other changes.
