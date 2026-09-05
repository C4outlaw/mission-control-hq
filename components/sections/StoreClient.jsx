'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DESIGN_GROUPS, DROP_ALL, KIND, money } from '../../lib/store-products';
import { COURSES } from '../../lib/store-catalog';

// 2026-07-26: store wiped to the hero only, ahead of the new 40-design
// collection (Myrie's sketch: one big shirt view with its mug + hat beneath).
// The old collection / courses / prompt-pack sections stay in code, hidden.
const SHOW_LEGACY = false;

const pad = (n) => String(n).padStart(2, '0');
const PHRASES = [
  'More Money Than Last Year',
  'Never Lose',
  'Wah Gwaan',
  'Likkle But Tallawah',
  "Who Can't Hear Will Feel",
  'Walk Good',
  'Dun Kno',
  '876 · Land We Love',
];

/* Garments a person actually wears — these get the house-model photography.
   Mugs and caps show their own product shot instead. */
const APPAREL = new Set(['tee', 'wtee', 'tank', 'wtank', 'crew', 'hoodie', 'gdtee']);

/* ------------------------------------------------------------------ *
 * Flatten the design groups into one listing per product — an Etsy
 * results page shows one card per listing, not one card per design.
 * ------------------------------------------------------------------ */
const LISTINGS = DESIGN_GROUPS.flatMap((g) =>
  g.items.map((item, i) => ({
    ...item,
    // Our own house-model shot leads the card — but only for apparel. A mug or
    // a cap must show the actual product, not someone wearing a tee.
    modelShot: APPAREL.has(item.kind) ? g.models?.[i % g.models.length] || null : null,
    design: g.design,
    label: g.label,
    blurb: g.blurb,
    spin: g.spin,
    video: g.video,
    // Etsy-style keyword title: design + garment + category words.
    title: `${g.label} ${KIND[item.kind]?.long || item.kind} — Jamaican ${
      item.kind === 'mug' ? 'Ceramic Mug' : item.kind === 'cap' ? 'Trucker Cap' : 'Graphic Tee'
    }, The Lost Jamaican`,
  }))
);

/* Same groups, but carrying the listings (and their preview art) so the
   listing modal can show every garment for a design in one gallery. */
const LISTING_GROUPS = DESIGN_GROUPS.map((g) => ({
  ...g,
  items: LISTINGS.filter((l) => l.design === g.design),
}));
const groupFor = (design) => LISTING_GROUPS.find((g) => g.design === design);

/* Filter facets, mirroring Etsy's pill row. Every facet is derived from real
   catalog data — nothing here is decorative. */
const FACETS = [
  { id: 'all', label: 'All items', test: () => true },
  { id: 'tee', label: 'Tees', test: (l) => l.kind === 'tee' || l.kind === 'wtee' },
  { id: 'gdtee', label: 'Heavyweight', test: (l) => l.kind === 'gdtee' },
  { id: 'hoodie', label: 'Hoodies & sweats', test: (l) => l.kind === 'hoodie' || l.kind === 'crew' },
  { id: 'tank', label: 'Tanks', test: (l) => l.kind === 'tank' || l.kind === 'wtank' },
  { id: 'mug', label: 'Mugs', test: (l) => l.kind === 'mug' },
  { id: 'cap', label: 'Caps', test: (l) => l.kind === 'cap' },
  { id: 'under30', label: 'Under $30', test: (l) => l.price < 3000 },
  { id: 'flag', label: 'Flag', test: (l) => ['flagx', 'xmark', 'mapja', 'vacay'].includes(l.design) },
  { id: 'onelove', label: 'One Love', test: (l) => ['onelove'].includes(l.design) },
  { id: 'independence', label: 'Independence', test: (l) => ['crest1962', 'varsity62'].includes(l.design) },
  { id: 'proverb', label: 'Proverbs & patois', test: (l) => ['tallawah', 'canthear', 'walkgood', 'walkgood2', 'wahgwaan', 'wahgwaan2', 'dunkno', 'sooncome', 'cho', 'rhaatid', 'kissmiteeth', 'believe'].includes(l.design) },
  { id: 'crew', label: 'Group & crew', test: (l) => ['bdaycrew', 'gyaldem'].includes(l.design) },
];

const SORTS = [
  { id: 'relevant', label: 'Most relevant' },
  { id: 'lowhigh', label: 'Lowest price' },
  { id: 'highlow', label: 'Highest price' },
];

/* ------------------------------------------------------------------ *
 * Zoom lightbox — Etsy opens this when you click the gallery image.
 * Overlay rgba(63,63,63,0.9) @ z-80, image contain + 8px radius,
 * thumbnail strip carried in, 48px round close at top-right.
 * ------------------------------------------------------------------ */
function Lightbox({ shots, index, setIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % shots.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + shots.length) % shots.length);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [shots.length, onClose, setIndex]);

  const shot = shots[index];

  return (
    <div className="etsy-lightbox" role="dialog" aria-modal="true" aria-label="Zoomed image" onClick={onClose}>
      <button className="etsy-lb-close" onClick={onClose} aria-label="close">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="etsy-lb-stage" onClick={(e) => e.stopPropagation()}>
        {shots.length > 1 && (
          <button
            className="etsy-lb-arrow is-prev"
            aria-label="Previous image"
            onClick={() => setIndex((i) => (i - 1 + shots.length) % shots.length)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {shot.video ? (
          /* eslint-disable-next-line jsx-a11y/media-has-caption */
          <video className="etsy-lb-img" src={shot.src} poster={shot.poster} autoPlay loop muted playsInline />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="etsy-lb-img" src={shot.src} alt={shot.alt} />
        )}

        {shots.length > 1 && (
          <button
            className="etsy-lb-arrow is-next"
            aria-label="Next image"
            onClick={() => setIndex((i) => (i + 1) % shots.length)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="etsy-lb-thumbs" onClick={(e) => e.stopPropagation()}>
        {shots.map((s, i) => (
          <button
            key={s.src + i}
            className={`etsy-thumb${i === index ? ' is-on' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.poster || s.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Listing modal — Etsy's product page, opened by clicking a card image.
 * Left: gallery (main image + arrows + 60px thumbs). Right: buy box.
 * ------------------------------------------------------------------ */
function ListingModal({ group, startKey, onAdd, onClose }) {
  const [activeKey, setActiveKey] = useState(startKey || group.items[0].key);
  const item = group.items.find((i) => i.key === activeKey) || group.items[0];
  const [variantId, setVariantId] = useState(item.variants[0]?.id);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);
  const [faved, setFaved] = useState(false);

  // Gallery = our model shots first, then every garment mockup, then the clips.
  const shots = useMemo(() => {
    const s = [
      ...(group.models || []).map((src) => ({ src, alt: `${group.label} worn by our model` })),
      ...group.items.map((i) => ({
        src: i.image,
        alt: `${group.label} — ${KIND[i.kind]?.long || i.kind}`,
        key: i.key,
      })),
    ];
    if (group.spin) s.push({ src: group.spin, poster: group.models?.[0] || group.items[0].image, alt: '360° view', video: true });
    if (group.video) s.push({ src: group.video, poster: group.models?.[0] || group.items[0].image, alt: 'Worn by our model', video: true });
    return s;
  }, [group]);

  // Switching garment resets the variant and jumps the gallery to its shot.
  function pickGarment(key) {
    const it = group.items.find((i) => i.key === key);
    setActiveKey(key);
    setVariantId(it.variants[0]?.id);
    const idx = shots.findIndex((s) => s.key === key);
    if (idx >= 0) setShot(idx);
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !zoom) onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, zoom]);

  function add() {
    const size = item.variants.find((v) => String(v.id) === String(variantId))?.size;
    onAdd({ key: item.key, variantId, qty, name: item.name, price: item.price, image: item.image, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const cur = shots[shot] || shots[0];
  const hasSizes = item.variants.length > 1;

  return (
    <>
      <div className="etsy-modal-scrim" role="dialog" aria-modal="true" aria-label={group.label} onClick={onClose}>
        <div className="etsy-modal" onClick={(e) => e.stopPropagation()}>
          <button className="etsy-modal-close" onClick={onClose} aria-label="close">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="etsy-modal-grid">
            {/* ---------- Gallery ---------- */}
            <div className="etsy-gallery">
              <div className="etsy-stage">
                {shots.length > 1 && (
                  <button
                    className="etsy-arrow is-prev"
                    aria-label="Previous image"
                    onClick={() => setShot((i) => (i - 1 + shots.length) % shots.length)}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}

                <button className="etsy-stage-btn" onClick={() => setZoom(true)} aria-label="Click to zoom">
                  {cur.video ? (
                    /* eslint-disable-next-line jsx-a11y/media-has-caption */
                    <video src={cur.src} poster={cur.poster} autoPlay loop muted playsInline />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={cur.src} alt={cur.alt} />
                  )}
                  <span className="etsy-zoomhint">Click to zoom</span>
                </button>

                {shots.length > 1 && (
                  <button
                    className="etsy-arrow is-next"
                    aria-label="Next image"
                    onClick={() => setShot((i) => (i + 1) % shots.length)}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="etsy-thumbs">
                {shots.map((s, i) => (
                  <button
                    key={s.src + i}
                    className={`etsy-thumb${i === shot ? ' is-on' : ''}`}
                    onClick={() => setShot(i)}
                    aria-label={s.alt}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.poster || s.src} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* ---------- Buy box ---------- */}
            <div className="etsy-buybox">
              <p className="etsy-bb-shop">The Lost Jamaican</p>
              <h2 className="etsy-bb-title">{item.name}</h2>
              <p className="etsy-bb-price">{money(item.price)}</p>
              <p className="etsy-bb-blurb">{group.blurb}</p>

              <label className="etsy-bb-label" htmlFor={`garment-${group.design}`}>Style</label>
              <select
                id={`garment-${group.design}`}
                className="etsy-bb-select"
                value={activeKey}
                onChange={(e) => pickGarment(e.target.value)}
              >
                {group.items.map((i) => (
                  <option key={i.key} value={i.key}>
                    {KIND[i.kind]?.long || i.kind} — {money(i.price)}
                  </option>
                ))}
              </select>

              {hasSizes && (
                <>
                  <label className="etsy-bb-label" htmlFor={`size-${item.key}`}>Size</label>
                  <select
                    id={`size-${item.key}`}
                    className="etsy-bb-select"
                    value={variantId}
                    onChange={(e) => setVariantId(e.target.value)}
                  >
                    {item.variants.map((v) => (
                      <option key={v.id} value={v.id}>{v.size}</option>
                    ))}
                  </select>
                </>
              )}

              <label className="etsy-bb-label" htmlFor={`qty-${item.key}`}>Quantity</label>
              <select
                id={`qty-${item.key}`}
                className="etsy-bb-select is-qty"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, n) => n + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <div className="etsy-bb-actions">
                <button className="etsy-bb-add" onClick={add}>{added ? 'Added to cart' : 'Add to cart'}</button>
                <button
                  className={`etsy-fav${faved ? ' is-on' : ''}`}
                  onClick={() => setFaved((f) => !f)}
                  aria-pressed={faved}
                  aria-label="Add to Favorites"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M12 21s-7.5-4.6-9.3-9A5.1 5.1 0 0 1 12 6.5 5.1 5.1 0 0 1 21.3 12c-1.8 4.4-9.3 9-9.3 9z"
                      fill={faved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <ul className="etsy-bb-facts">
                <li>Printed and shipped on demand — nothing sits in a warehouse.</li>
                <li>Design by The Lost Jamaican. Every piece carries the mark.</li>
                <li>Secure checkout via Stripe.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {zoom && (
        <Lightbox shots={shots} index={shot} setIndex={setShot} onClose={() => setZoom(false)} />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Etsy-style result card.
 * Rating / badge / compare-at price slots are built to spec but render
 * only from real data — we never invent reviews or former prices.
 * ------------------------------------------------------------------ */
function ResultCard({ l, onAdd, onOpen }) {
  const [variantId, setVariantId] = useState(l.variants[0]?.id);
  const [added, setAdded] = useState(false);
  const media = l.spin || l.video;
  const hasSizes = l.variants.length > 1;

  function add() {
    const size = l.variants.find((v) => String(v.id) === String(variantId))?.size;
    onAdd({ key: l.key, variantId, qty: 1, name: l.name, price: l.price, image: l.image, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const off =
    l.compareAt && l.compareAt > l.price
      ? Math.round(((l.compareAt - l.price) / l.compareAt) * 100)
      : null;

  return (
    <li className="etsy-cell">
      <div className="etsy-card">
        {/* .etsy-media is the un-clipped anchor: the image box clips its own
            overflow, while the quick-add floats over it on hover (desktop) or
            sits below it on touch layouts, where it would otherwise clip. */}
        <div className="etsy-media">
        {/* Clicking the image opens the listing view, exactly like Etsy. */}
        <div
          className="etsy-card-img is-interactive"
          onClick={onOpen}
          role="button"
          tabIndex={0}
          aria-label={`View ${l.label}`}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.modelShot || l.image} alt={l.title} loading="lazy" />
          {l.badge && <span className="etsy-badge">{l.badge}</span>}
          {media && <span className="etsy-cue">360° view</span>}
        </div>

        {/* Etsy surfaces a quick add-to-cart on the results card. */}
        <div className="etsy-quick">
          {hasSizes && (
            <select
              className="etsy-size"
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              aria-label={`Size for ${l.name}`}
            >
              {l.variants.map((v) => (
                <option key={v.id} value={v.id}>{v.size}</option>
              ))}
            </select>
          )}
          <button className="etsy-add" onClick={add}>{added ? 'Added' : 'Add to cart'}</button>
        </div>
        </div>

        <h3 className="etsy-title">{l.title}</h3>
        <p className="etsy-shop">By The Lost Jamaican</p>

        {/* Rating renders only when real review data exists. */}
        {l.rating && l.reviews ? (
          <p className="etsy-rating">
            <span className="etsy-stars" aria-hidden="true">
              {'★★★★★'.slice(0, Math.round(l.rating))}
            </span>
            <span className="etsy-reviews">({l.reviews.toLocaleString()})</span>
          </p>
        ) : null}

        <p className="etsy-price">
          <span className="etsy-price-now">{money(l.price)}</span>
          {off ? (
            <>
              <span className="etsy-price-was">{money(l.compareAt)}</span>
              <span className="etsy-price-off">({off}% off)</span>
            </>
          ) : null}
        </p>
        {l.freeShipping ? <p className="etsy-ship">Free shipping</p> : null}
      </div>
    </li>
  );
}


/* ------------------------------------------------------------------ *
 * Drop 01 — one product, one big view. Pick a colour, pick a size, buy.
 * Used large for the lead garment and small for its mug + cap.
 * ------------------------------------------------------------------ */
const SWATCH = {
  Black: '#111111', Pepper: '#4a4744', 'Blue Jean': '#5b7592', 'Blue Spruce': '#2f6f73', Ivory: '#f3ebdc', Butter: '#f1d9a6',
  White: '#ffffff', Graphite: '#3a3f44', Moss: '#6f7a55', 'Sport Grey': '#c9c9c4', Navy: '#1f2a44', 'Dark Heather': '#4a4a4a',
  'Dark Green': '#1d4d2b', Pink: '#ff4fa3', Green: '#2fbf3a', Royal: '#2b4cc4', 'Blue/Red': 'linear-gradient(90deg,#2b4cc4 50%,#c8102e 50%)', 'Dark Navy': '#14213d',
};
const SIZE_ORDER = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];
const isRealSize = (sz) => sz && sz !== '11oz' && sz !== 'One size';

/* Curated highlights — hand-picked, not invented sales data. */
const PICKS = new Set(['nuhworry-tee', 'fiyahbun-hoodie', 'goodmorning-mug', 'bumbocap-cap']);

/* Drop 01 facet pills. */
const DROP_FACETS = [
  { id: 'all', label: 'All pieces', test: () => true },
  { id: 'tee', label: 'Tees', test: (p) => p.kind === 'tee' },
  { id: 'hoodie', label: 'Hoodies', test: (p) => p.kind === 'hoodie' },
  { id: 'mug', label: 'Mugs', test: (p) => p.kind === 'mug' },
  { id: 'cap', label: 'Caps', test: (p) => p.kind === 'cap' },
];

function DropPanel({ p, large = false, onAdd }) {
  const [color, setColor] = useState(p.colors[0] || null);
  const sizes = useMemo(() => {
    const vs = p.variants.filter((v) => !color || v.color === color);
    return [...vs].sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size));
  }, [p, color]);
  const [variantId, setVariantId] = useState(sizes.find((v) => v.size === 'L')?.id || sizes[0]?.id);
  useEffect(() => { setVariantId(sizes.find((v) => v.size === 'L')?.id || sizes[0]?.id); }, [sizes]);
  const [added, setAdded] = useState(false);
  const image = (color && p.images[color]) || p.image;
  const chosen = sizes.find((v) => String(v.id) === String(variantId)) || sizes[0];
  const hasSizes = sizes.some((v) => isRealSize(v.size));
  // Oversize variants carry their own price; everything else uses the product price.
  const priceNow = chosen?.price || p.price;
  const off = p.compareAt && p.compareAt > priceNow ? Math.round(((p.compareAt - priceNow) / p.compareAt) * 100) : null;

  function add() {
    if (!chosen) return;
    onAdd({ key: p.key, variantId: chosen.id, qty: 1, name: p.name, price: priceNow, image, size: [color, isRealSize(chosen.size) ? chosen.size : null].filter(Boolean).join(' / ') });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className={`drop-panel${large ? ' is-large' : ''}`}>
      <div className="drop-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={`${p.name}${color ? ` in ${color}` : ''}`} loading={large ? 'eager' : 'lazy'} decoding="async" />
      </div>
      <div className="drop-body">
        <p className="tls-mono">{p.kindName}</p>
        <h3 className="drop-title">{p.name.split(' — ')[0]}</h3>
        {large && p.blurb && <p className="drop-blurb">{p.blurb}</p>}
        <p className="drop-price">
          {money(priceNow)}
          {off ? (
            <>
              {' '}<s className="drop-was">{money(p.compareAt)}</s>
              <span className="drop-off">{off}% off — launch price</span>
            </>
          ) : null}
        </p>
        {p.colors.length > 0 && (
          <div className="drop-row" role="group" aria-label="Colour">
            <span className="drop-label">{color}</span>
            <div className="drop-swatches">
              {p.colors.map((c) => (
                <button key={c} type="button" className={`drop-swatch${c === color ? ' is-on' : ''}`} style={{ background: SWATCH[c] || '#999' }} onClick={() => setColor(c)} aria-label={c} aria-pressed={c === color} title={c} />
              ))}
            </div>
          </div>
        )}
        {hasSizes && (
          <div className="drop-row" role="group" aria-label="Size">
            <span className="drop-label">Size</span>
            <div className="drop-sizes">
              {sizes.map((v) => (
                <button key={v.id} type="button" className={`drop-size${String(v.id) === String(variantId) ? ' is-on' : ''}`} onClick={() => setVariantId(v.id)} aria-pressed={String(v.id) === String(variantId)}>{v.size}</button>
              ))}
            </div>
          </div>
        )}
        <button type="button" className="drop-buy" onClick={add} disabled={!chosen}>{added ? 'Added to cart' : 'Add to cart'}</button>
        <p className="drop-fine">Printed to order · ships in 3–7 business days · The Lost Jamaican · We Never Lose</p>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ *
 * Compact grid card — the whole range scannable in two scrolls.
 * Clicking anywhere opens the quick-view with colours and sizes.
 * ------------------------------------------------------------------ */
function DropCard({ p, onOpen }) {
  const off = p.compareAt && p.compareAt > p.price ? Math.round(((p.compareAt - p.price) / p.compareAt) * 100) : null;
  return (
    <button type="button" className="dropc" onClick={onOpen} aria-label={`View ${p.name}`}>
      <span className="dropc-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" decoding="async" />
        {PICKS.has(p.key) && <span className="dropc-badge">Drop pick</span>}
      </span>
      <span className="dropc-kind tls-mono">{p.kindName}</span>
      <span className="dropc-title">{p.name.split(' — ')[0]}</span>
      <span className="dropc-price">
        {money(p.price)}
        {off ? <><s>{money(p.compareAt)}</s><em>{off}% off</em></> : null}
      </span>
      <span className="dropc-cta">Choose options</span>
    </button>
  );
}

/* Quick-view: the full DropPanel (colour, size, add) in a modal scrim. */
function DropModal({ p, onAdd, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="etsy-modal-scrim" role="dialog" aria-modal="true" aria-label={p.name} onClick={onClose}>
      <div className="etsy-modal is-drop" onClick={(e) => e.stopPropagation()}>
        <button className="etsy-modal-close" onClick={onClose} aria-label="close">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <DropPanel p={p} large onAdd={onAdd} />
      </div>
    </div>
  );
}

export default function StoreClient() {
  const [cart, setCart] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [facet, setFacet] = useState('all');
  const [sort, setSort] = useState('relevant');
  const [sortOpen, setSortOpen] = useState(false);
  const [openListing, setOpenListing] = useState(null);
  const [dropFacet, setDropFacet] = useState('all');
  const [openDrop, setOpenDrop] = useState(null);
  const [heroVideoOk, setHeroVideoOk] = useState(true);
  const [welcomePlaying, setWelcomePlaying] = useState(false);
  const welcomeRef = useRef(null);

  function toggleWelcome() {
    const v = document.querySelector('.tls-hero-media video');
    if (!v) return;
    const stop = () => {
      v.muted = true;
      if (welcomeRef.current) { v.removeEventListener('timeupdate', welcomeRef.current); welcomeRef.current = null; }
      setWelcomePlaying(false);
    };
    if (v.muted) {
      v.muted = false;
      v.currentTime = 0;
      v.play();
      setWelcomePlaying(true);
      // The video loops forever, but the welcome should play ONCE: when the
      // loop wraps back to the start, go silent again.
      let last = 0;
      const onTime = () => { if (v.currentTime < last) stop(); else last = v.currentTime; };
      welcomeRef.current = onTime;
      v.addEventListener('timeupdate', onTime);
    } else {
      stop();
    }
  }

  // Close the sort menu on outside click.
  useEffect(() => {
    if (!sortOpen) return;
    const close = (e) => { if (!e.target.closest('.etsy-sort')) setSortOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [sortOpen]);

  const results = useMemo(() => {
    const f = FACETS.find((x) => x.id === facet) || FACETS[0];
    const list = LISTINGS.filter(f.test);
    if (sort === 'lowhigh') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'highlow') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [facet, sort]);

  const dropResults = useMemo(() => {
    const f = DROP_FACETS.find((x) => x.id === dropFacet) || DROP_FACETS[0];
    return DROP_ALL.filter(f.test);
  }, [dropFacet]);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  function addItem(item) {
    setCart((c) => {
      const i = c.findIndex((x) => x.key === item.key && x.variantId === item.variantId);
      if (i >= 0) {
        const n = [...c];
        n[i] = { ...n[i], qty: n[i].qty + 1 };
        return n;
      }
      return [...c, item];
    });
  }
  const removeItem = (idx) => setCart((c) => c.filter((_, i) => i !== idx));

  async function checkout() {
    if (!cart.length || busy) return;
    setBusy(true);
    setErr('');
    try {
      const r = await fetch('/api/store-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({ key: i.key, variantId: i.variantId, qty: i.qty })),
        }),
      });
      const j = await r.json();
      if (j.url) window.location.href = j.url;
      else {
        setErr(j.error || 'Checkout unavailable');
        setBusy(false);
      }
    } catch {
      setErr('Checkout unavailable');
      setBusy(false);
    }
  }

  const marqueeRun = [...PHRASES, ...PHRASES];
  const sortLabel = (SORTS.find((s) => s.id === sort) || SORTS[0]).label;

  return (
    <main className="tls">
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        The Lost Jamaican Store — Jamaican slang merch, video-making courses, and AI prompt packs
      </h1>

      {/* ---------- Hero (UNCHANGED) ---------- */}
      <section className="tls-hero">
        <div className="tls-hero-media" aria-hidden="true">
          {heroVideoOk ? (
            <video src="/store/hero.mp4" poster="/store/neverlose-hoodie.jpg" autoPlay muted loop playsInline onError={() => setHeroVideoOk(false)} />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/store/neverlose-hoodie.jpg?v=6" alt="" />
          )}
        </div>
        <div className="tls-shell tls-hero-inner">
          <div className="tls-hero-foot" style={{ marginTop: 'clamp(220px, 38vh, 420px)' }}>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="tls-link tls-sound" onClick={toggleWelcome} aria-pressed={welcomePlaying}>
                {welcomePlaying ? '🔇 Mute' : '🔊 Hear di welcome'}
              </button>
              <a href="#drop" className="tls-link">Shop Drop 01</a>
            </div>
          </div>
        </div>
        <div className="tls-marquee" aria-hidden="true">
          <div className="tls-marquee-track">
            {marqueeRun.map((ph, i) => (
              <span key={i}>
                <i>{ph}</i> &nbsp;·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Urgency strip ---------- */}
      <div className="drop-strip" role="note">
        <span className="drop-strip-live" aria-hidden="true" />
        <strong>Drop 01 is live</strong>
        <span>· launch pricing until the next drop lands · printed to order, ships in 3–7 days</span>
      </div>

      {/* ================= Drop 01 ================= */}
      <section id="drop" className="drop">
        <div className="tls-shell">
          <header className="drop-head">
            <p className="tls-mono">Drop 01 · {dropResults.length} pieces · printed to order</p>
            <h2>Jamaican slang, on the shirts that actually sell.</h2>
            <p className="drop-lede">Every design is an original. Pick the colour, pick the size, and it ships from the print house in a few days.</p>
          </header>

          <div className="drop-pills" role="group" aria-label="Filter the drop">
            {DROP_FACETS.map((f) => (
              <button key={f.id} type="button" className={`etsy-pill${dropFacet === f.id ? ' is-on' : ''}`} onClick={() => setDropFacet(f.id)} aria-pressed={dropFacet === f.id}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="drop-grid">
            {dropResults.map((p) => <DropCard key={p.key} p={p} onOpen={() => setOpenDrop(p)} />)}
          </div>
        </div>
      </section>

      {/* ---------- Social proof ---------- */}
      <section className="drop-proof">
        <div className="tls-shell drop-proof-inner">
          <div className="drop-proof-copy">
            <p className="tls-mono">The Lost Jamaican</p>
            <h2>As seen on <a href="https://www.tiktok.com/@thelostjamaican" target="_blank" rel="noreferrer">@thelostjamaican</a></h2>
            <p>41.9k strong on TikTok. Every design comes straight out of the videos — wear what the yard already knows.</p>
          </div>
          <div className="drop-proof-shots" aria-hidden="true">
            {['/store/model/money--m-beard-blk.jpg', '/store/model/neverlose--w-braids-blk.jpg', '/store/model/flagx--w-beach-blk.jpg', '/store/model/wahgwaan--m-dread-blk2.jpg'].map((src) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img key={src} src={src} alt="" loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      </section>

      {/* ================= Etsy-style search results ================= */}
      {SHOW_LEGACY && (
      <section id="collection" className="etsy">
        {/* Filter pill bar — sticky, horizontally scrollable */}
        <div className="etsy-filterbar">
          <div className="etsy-container">
            <div className="etsy-pills" role="group" aria-label="Filter products">
              {FACETS.map((f) => (
                <button
                  key={f.id}
                  className={`etsy-pill${facet === f.id ? ' is-on' : ''}`}
                  onClick={() => setFacet(f.id)}
                  aria-pressed={facet === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="etsy-container">
          {/* Result count + sort */}
          <div className="etsy-resulthead">
            <p className="etsy-count">
              {results.length.toLocaleString()} item{results.length === 1 ? '' : 's'}
            </p>
            <div className="etsy-sort">
              <button
                className="etsy-sortbtn"
                onClick={() => setSortOpen((o) => !o)}
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                {sortLabel}
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {sortOpen && (
                <ul className="etsy-sortmenu" role="listbox">
                  {SORTS.map((s) => (
                    <li key={s.id}>
                      <button
                        role="option"
                        aria-selected={sort === s.id}
                        className={sort === s.id ? 'is-on' : ''}
                        onClick={() => { setSort(s.id); setSortOpen(false); }}
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* The results grid */}
          <ul className="etsy-grid">
            {results.map((l) => (
              <ResultCard key={l.key} l={l} onAdd={addItem} onOpen={() => setOpenListing(l)} />
            ))}
          </ul>

          {results.length === 0 && (
            <p className="etsy-empty">No items match that filter yet.</p>
          )}
        </div>
      </section>
      )}

      {/* ---------- Courses ---------- */}
      {SHOW_LEGACY && (
      <section id="courses" className="etsy-section">
        <div className="etsy-container">
          <h2 className="etsy-h2">Courses</h2>
          <p className="etsy-sub">The system behind the shorts.</p>
          <div className="etsy-tiers">
            {COURSES.map((c) => (
              <article className={`etsy-tier${c.flagship ? ' is-flagship' : ''}`} key={c.id}>
                <p className="etsy-tier-price">{c.priceLabel}</p>
                <h3>{c.name}</h3>
                <p className="etsy-tier-blurb">{c.blurb}</p>
                <ul>
                  {c.features.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <span className="etsy-soon">Coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ---------- Prompt packs ---------- */}
      {SHOW_LEGACY && (
      <section className="etsy-section">
        <div className="etsy-container etsy-packs">
          <div>
            <h2 className="etsy-h2">Prompt packs</h2>
            <p className="etsy-sub">
              The model settings, the character system and the quality gates — one PDF you can hand
              straight to your own AI. Name your price, from $4.99.
            </p>
          </div>
          <a href="/prompts" className="etsy-add etsy-add-lg">Browse the packs</a>
        </div>
      </section>
      )}

      {/* ---------- Drop quick-view ---------- */}
      {openDrop && <DropModal p={openDrop} onAdd={addItem} onClose={() => setOpenDrop(null)} />}

      {/* ---------- Listing view (click a card image) ---------- */}
      {openListing && groupFor(openListing.design) && (
        <ListingModal
          group={groupFor(openListing.design)}
          startKey={openListing.key}
          onAdd={addItem}
          onClose={() => setOpenListing(null)}
        />
      )}

      {/* ---------- Cart ---------- */}
      {cart.length > 0 && (
        <div className="etsy-cart" role="region" aria-label="Cart">
          <div className="etsy-cart-head">
            <span>Your cart</span>
            <span>{pad(count)} item{count === 1 ? '' : 's'}</span>
          </div>
          <div className="etsy-cart-items">
            {cart.map((i, idx) => (
              <div key={i.key + i.variantId} className="etsy-cart-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" />
                <span className="etsy-cart-name">
                  {i.name}
                  {i.size && i.size !== '11oz' ? ` / ${i.size}` : ''} &times;{i.qty}
                </span>
                <span className="etsy-cart-cost">{money(i.price * i.qty)}</span>
                <button onClick={() => removeItem(idx)} aria-label="Remove">&times;</button>
              </div>
            ))}
          </div>
          <div className="etsy-cart-foot">
            <span className="etsy-cart-total">Total {money(total)}</span>
            <button className="etsy-add" onClick={checkout} disabled={busy}>
              {busy ? 'Opening…' : 'Checkout'}
            </button>
          </div>
          {err && <p className="etsy-err">{err}</p>}
        </div>
      )}
    </main>
  );
}
