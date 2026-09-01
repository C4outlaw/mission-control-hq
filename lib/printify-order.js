// Submits a paid Stripe session to Printify for production + shipping.
import map from './printify-map.json';

export async function createPrintifyOrder(session) {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) throw new Error('PRINTIFY_API_TOKEN missing');

  // Fulfil list may span several metadata keys (Stripe caps each value at 500 chars).
  // Legacy sessions carry JSON; new sessions carry compact "productId:variantId:qty;..." parts.
  const meta = session.metadata || {};
  const encoded = [meta.fulfil, meta.fulfil2, meta.fulfil3, meta.fulfil4].filter(Boolean).join('');
  let fulfil = [];
  if (encoded.startsWith('[')) {
    try {
      fulfil = JSON.parse(encoded);
    } catch {
      fulfil = [];
    }
  } else if (encoded) {
    fulfil = encoded
      .split(';')
      .filter(Boolean)
      .map((part) => {
        const [p, v, q] = part.split(':');
        return { p, v: parseInt(v, 10), q: parseInt(q, 10) || 1 };
      })
      .filter((f) => f.p && f.v);
  }
  if (!fulfil.length) throw new Error('no fulfil items in session metadata');

  // Stripe API 2025+ moved checkout shipping onto collected_information; older
  // event payloads still carry session.shipping_details. Accept both.
  const shipInfo = session.collected_information?.shipping_details || session.shipping_details || null;
  const ship = shipInfo?.address || session.customer_details?.address;
  const name = shipInfo?.name || session.customer_details?.name || 'Customer';
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
