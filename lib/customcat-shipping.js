/**
 * What CustomCat will actually charge us to post an order.
 *
 * The store charged a flat $5.99 matched to Printify, which was a guess: it
 * overcharged a single tee and lost money on anything heavier or on a basket
 * of two or more. CustomCat does publish real rates — POST /shipping/rates
 * with a numeric shipping_id — so the buyer can be charged the real number.
 *
 * The rate turns on garment class and quantity, not on the exact colourway,
 * so one representative SKU per blank is enough to price a basket.
 */

const BASE = 'https://customcat-beta.mylocker.net/api/v1';

/* CustomCat's shipping methods, by their numeric id. */
export const METHODS = [
  { id: 35, name: 'Standard shipping', min: 5, max: 10 },
  { id: 80, name: 'Express shipping', min: 3, max: 5 },
];

/* One in-stock SKU per blank. Rates key off garment class, so any size does. */
const RATE_SKU = {
  G500: '48146',    // Gildan Heavy Cotton Tee
  G185: '23089',    // Gildan Heavy Blend Hoodie
  G180: '24487',    // Gildan Heavy Blend Crewneck
  MUG11: '47417',   // 11oz ceramic mug
  BC_HW: '86767',   // Bella + Canvas heavyweight tee
  LS_PREM: '73920', // Lane Seven premium hoodie
};

/* If the quote cannot be reached, charge from the shape CustomCat's own rates
   follow rather than under-charging: a hoodie posts dearer than a tee, and
   each extra piece adds to the parcel. */
const FALLBACK_FIRST = { G185: 7.99, LS_PREM: 7.99 };
const FALLBACK_EXTRA = 1.5;

function fallback(items) {
  let first = 4.99;
  let count = 0;
  for (const it of items) {
    first = Math.max(first, FALLBACK_FIRST[it.blank] || 4.99);
    count += it.qty;
  }
  return first + Math.max(0, count - 1) * FALLBACK_EXTRA;
}

/**
 * Live rate for one shipping method, in dollars, or null if unavailable.
 * `items` is [{ blank, qty }].
 */
async function quote(methodId, items, apiKey, signal) {
  const body = {
    shipping_id: methodId,
    // The endpoint wants an address; the rate it returns is the US rate.
    shipping_address: {
      address1: '1 Main St', city: 'Daytona Beach', state: 'FL', zip: '32114', country: 'US',
    },
    items: items
      .filter((it) => RATE_SKU[it.blank])
      .map((it) => ({ catalog_sku: RATE_SKU[it.blank], quantity: it.qty })),
  };
  if (!body.items.length) return null;

  const res = await fetch(`${BASE}/shipping/rates?api_key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });
  if (!res.ok) return null;
  // The endpoint answers with a bare quoted number, e.g. "7.99".
  const dollars = parseFloat(String(await res.text()).replace(/"/g, ''));
  // An unknown SKU quotes 0.00, which would mean shipping free of charge.
  return Number.isFinite(dollars) && dollars > 0 ? dollars : null;
}

/**
 * Stripe shipping_options priced at what CustomCat will really charge.
 * Never throws and never returns an empty list: checkout must not fail, and
 * an order must never go out with no postage on it.
 */
export async function shippingOptions(items) {
  const apiKey = process.env.CUSTOMCAT_API_KEY;
  let rates = [];

  if (apiKey && items.length) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 6000);
    try {
      rates = await Promise.all(
        METHODS.map((m) => quote(m.id, items, apiKey, ac.signal).catch(() => null))
      );
    } catch {
      rates = [];
    } finally {
      clearTimeout(timer);
    }
  }

  const guess = fallback(items);
  const priced = METHODS.map((m, i) => ({
    method: m,
    // Express has no sensible guess of its own, so it is only offered when
    // CustomCat quotes it.
    dollars: rates[i] ?? (m.id === 35 ? guess : null),
  })).filter((o) => o.dollars);

  const list = priced.length ? priced : [{ method: METHODS[0], dollars: guess }];

  return list.map(({ method, dollars }) => ({
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: Math.round(dollars * 100), currency: 'usd' },
      display_name: method.name,
      delivery_estimate: {
        minimum: { unit: 'business_day', value: method.min },
        maximum: { unit: 'business_day', value: method.max },
      },
    },
  }));
}
