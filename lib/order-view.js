/**
 * One shape for an order, read straight out of Stripe.
 *
 * There is no orders database, and adding one for a shop this size would be a
 * second source of truth to keep in sync. Stripe already holds every paid
 * order; the only thing it does not know is whether the print house accepted
 * it, so the webhook stamps that onto the payment intent and this reads it
 * back. One place to look, nothing to reconcile.
 */

import Stripe from 'stripe';

/** Short, speakable order number a customer can read off an email. */
export const orderNumber = (sessionId) =>
  `TLJ-${String(sessionId).slice(-8).toUpperCase()}`;

export const stripeClient = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe is not configured');
  return new Stripe(key);
};

/** Decode the compact "blank:colour:size:design:qty;..." fulfil metadata. */
function readItems(session) {
  const meta = session.metadata || {};
  const encoded = [meta.fulfil, meta.fulfil2, meta.fulfil3, meta.fulfil4].filter(Boolean).join('');
  if (!encoded) return [];
  if (encoded.startsWith('[')) {
    try { return JSON.parse(encoded); } catch { return []; }
  }
  return encoded.split(';').filter(Boolean).map((part) => {
    const [blank, color, size, design, qty] = part.split(':');
    return { blank, color, size, design, qty: parseInt(qty, 10) || 1 };
  });
}

/**
 * Where an order actually stands, in the two steps that matter to a buyer:
 * did the money go through, and is it being made.
 */
export function orderStatus(session) {
  const pi = typeof session.payment_intent === 'object' ? session.payment_intent : null;
  const stamp = pi?.metadata || {};
  const paid = session.payment_status === 'paid';
  if (!paid) return { state: 'unpaid', label: 'Not paid', detail: 'This order was never completed.' };
  if (stamp.cc_order_id || stamp.printify_order_id) {
    return {
      state: 'in_production',
      label: 'Being made',
      detail: 'Your piece is with the print house. It ships in 3–7 business days.',
      ref: stamp.cc_order_id || stamp.printify_order_id,
    };
  }
  return {
    state: 'pending',
    label: 'Paid — awaiting the print house',
    detail: 'Payment went through. We are handing it to the print house; you will get an email when it is being made.',
    error: stamp.fulfil_error || null,
  };
}

/** The display shape both the buyer's page and the admin list render from. */
export function toOrderView(session) {
  const ship = session.collected_information?.shipping_details
    || session.shipping_details
    || null;
  return {
    id: session.id,
    number: orderNumber(session.id),
    created: session.created * 1000,
    email: session.customer_details?.email || session.customer_email || null,
    name: ship?.name || session.customer_details?.name || null,
    address: ship?.address || session.customer_details?.address || null,
    total: session.amount_total ?? 0,
    shipping: session.shipping_cost?.amount_total ?? 0,
    currency: (session.currency || 'usd').toUpperCase(),
    items: readItems(session),
    status: orderStatus(session),
  };
}

export const money = (cents) => `$${((cents || 0) / 100).toFixed(2)}`;
