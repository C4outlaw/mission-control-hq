// CustomCat fulfillment for MyrieHQ store (2026-09-18).
// Submits a paid Stripe session to CustomCat for print-on-demand production + shipping.
// Replaces lib/printify-order.js for the Everyday Collection (30 designs).
//
// CustomCat API: POST https://customcat-beta.mylocker.net/api/v1/order/{external_id}
// Auth: read-write API key as ?api_key= query param (server-side only).
// External designs: each item needs catalog_sku + publicly downloadable design_url.
// Sandbox: send sandbox:"1" (string). NEVER send sandbox:"0" without explicit approval.

import map from './customcat-map.json';

const CC_BASE = 'https://customcat-beta.mylocker.net';

function getSku(blankKey, color, size) {
  const blank = map.blanks?.[blankKey];
  if (!blank) throw new Error(`unknown blank: ${blankKey}`);
  const key = `${color}|${size}`;
  const v = blank.variants?.[key];
  if (!v || !v.catalogSku) {
    throw new Error(`missing catalog SKU for ${blankKey} ${color} ${size} — fill lib/customcat-map.json from the Download Catalog spreadsheet`);
  }
  return v.catalogSku;
}

function getDesignUrl(designKey) {
  // Design PNGs must be publicly downloadable URLs (no Google Drive, no auth).
  // Served from myriehq.com once deployed; override via CUSTOMCAT_DESIGN_BASE.
  const base = process.env.CUSTOMCAT_DESIGN_BASE || 'https://myriehq.com/store/catalog-30';
  const file = map.designs?.[designKey];
  if (!file) throw new Error(`unknown design: ${designKey}`);
  return `${base}/${file}`;
}

export async function createCustomCatOrder(session, opts = {}) {
  const apiKey = process.env.CUSTOMCAT_API_KEY;
  if (!apiKey) throw new Error('CUSTOMCAT_API_KEY missing');

  const sandbox = opts.sandbox ? '1' : undefined;
  if (!opts.sandbox && process.env.CUSTOMCAT_SANDBOX === '1') {
    throw new Error('refusing live order while CUSTOMCAT_SANDBOX=1 — explicit approval required');
  }

  // Fulfil list from Stripe metadata (same compact format as printify-order.js):
  // "blankKey:color:size:designKey:qty;..." split across fulfil..fulfil4 (500 char cap each).
  const meta = session.metadata || {};
  const encoded = [meta.fulfil, meta.fulfil2, meta.fulfil3, meta.fulfil4].filter(Boolean).join('');
  let fulfil = [];
  if (encoded.startsWith('[')) {
    try { fulfil = JSON.parse(encoded); } catch { fulfil = []; }
  } else if (encoded) {
    fulfil = encoded.split(';').filter(Boolean).map((part) => {
      const [b, c, s, d, q] = part.split(':');
      return { blank: b, color: c, size: s, design: d, q: parseInt(q, 10) || 1 };
    }).filter((f) => f.blank && f.color && f.design);
  }
  if (!fulfil.length) throw new Error('no fulfil items in session metadata');

  const shipInfo = session.collected_information?.shipping_details || session.shipping_details || null;
  const ship = shipInfo?.address || session.customer_details?.address;
  const name = shipInfo?.name || session.customer_details?.name || 'Customer';
  if (!ship) throw new Error('no shipping address on session');
  const [first, ...rest] = String(name).trim().split(/\s+/);

  const items = fulfil.map((f, i) => ({
    line_item_id: String(i + 1),
    catalog_sku: getSku(f.blank, f.color, f.size),
    quantity: Math.min(Math.max(f.q, 1), 10),
    design_url: getDesignUrl(f.design),
    // preset_id: CustomCat print preset; null = default placement.
    preset_id: map.blanks[f.blank]?.presetId || null,
  }));

  const body = {
    shipping_method: opts.shippingMethod || 'Economy',
    shipping_first_name: first || 'Customer',
    shipping_last_name: rest.join(' ') || '-',
    shipping_email: session.customer_details?.email || '',
    shipping_phone: session.customer_details?.phone || '',
    shipping_address: ship.line1,
    shipping_address_2: ship.line2 || '',
    shipping_city: ship.city,
    shipping_state: ship.state || '',
    shipping_zip: ship.postal_code,
    shipping_country: ship.country,
    items,
  };
  if (sandbox) body.sandbox = sandbox;

  const externalId = session.id;
  const url = `${CC_BASE}/api/v1/order/${encodeURIComponent(externalId)}?api_key=${encodeURIComponent(apiKey)}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`customcat ${r.status} ${text.slice(0, 500)}`);
  return JSON.parse(text || '{}');
}
