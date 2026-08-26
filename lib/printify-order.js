// Submits a paid Stripe session to Printify for production + shipping.
import map from './printify-map.json';

export async function createPrintifyOrder(session) {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) throw new Error('PRINTIFY_API_TOKEN missing');

  let fulfil = [];
  try {
    fulfil = JSON.parse(session.metadata?.fulfil || '[]');
  } catch {
    fulfil = [];
  }
  if (!fulfil.length) throw new Error('no fulfil items in session metadata');

  const ship = session.shipping_details?.address || session.customer_details?.address;
  const name = session.shipping_details?.name || session.customer_details?.name || 'Customer';
  if (!ship) throw new Error('no shipping address on session');
  const [first, ...rest] = String(name).trim().split(/\s+/);

  const body = {
    external_id: session.id,
    label: 'The Lost Jamaican — ' + session.id.slice(-8),
    line_items: fulfil.map((f) => ({ product_id: f.p, variant_id: f.v, quantity: f.q })),
    shipping_method: 1,
    is_printify_express: false,
    send_shipping_notification: true,
    address_to: {
      first_name: first || 'Customer',
      last_name: rest.join(' ') || '-',
      email: session.customer_details?.email || '',
      phone: session.customer_details?.phone || '',
      country: ship.country,
      region: ship.state || '',
      address1: ship.line1,
      address2: ship.line2 || '',
      city: ship.city,
      zip: ship.postal_code,
    },
  };

  const r = await fetch(`https://api.printify.com/v1/shops/${map.shopId}/orders.json`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error('printify ' + r.status + ' ' + text.slice(0, 300));
  return JSON.parse(text || '{}');
}
