'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS, GROUPS, money } from '../../lib/store-products';
import { COURSES } from '../../lib/store-catalog';

const pad = (n) => String(n).padStart(2, '0');
const PHRASES = [
  'More Money Than Last Year',
  'Never Lose',
  'Wah Gwaan',
  'Likkle But Tallawah',
  "Who Can't Hear Will Feel",
  'Believe Inna Yuhself',
  '876 · Land We Love',
];

/* Reveal-on-scroll wrapper (IntersectionObserver, reduced-motion safe via CSS). */
function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`tls-reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function BuyControls({ p, onAdd, big = false }) {
  const [variantId, setVariantId] = useState(p.variants[0]?.id);
  const [added, setAdded] = useState(false);
  const hasSizes = p.variants.length > 1;

  function add() {
    const size = p.variants.find((v) => String(v.id) === String(variantId))?.size;
    onAdd({ key: p.key, variantId, qty: 1, name: p.name, price: p.price, image: p.image, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="tls-card-buy">
      {hasSizes && (
        <select
          className="tls-size"
          value={variantId}
          onChange={(e) => setVariantId(e.target.value)}
          aria-label={`Size for ${p.name}`}
        >
          {p.variants.map((v) => (
            <option key={v.id} value={v.id}>{v.size}</option>
          ))}
        </select>
      )}
      <button className="tls-btn" onClick={add}>
        {added ? 'Added' : big ? 'Add to cart' : 'Add to cart'}
      </button>
    </div>
  );
}

function ProductCard({ p, index, onAdd }) {
  return (
    <Reveal as="article" className="tls-card">
      <div className="tls-card-img">
        <span className="tls-card-index">({pad(index + 1)})</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} loading="lazy" />
      </div>
      <div className="tls-card-meta">
        <h3 className="tls-card-name">{p.name}</h3>
        <span className="tls-card-price">{money(p.price)}</span>
      </div>
      <p className="tls-card-blurb">{p.blurb}</p>
      <BuyControls p={p} onAdd={onAdd} />
    </Reveal>
  );
}

export default function StoreClient() {
  const [cart, setCart] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('All');
  const [heroVideoOk, setHeroVideoOk] = useState(true);

  // Flagship hero pieces, pulled to the front of the store.
  const featured = useMemo(
    () => ['money-tee', 'neverlose-hoodie', 'money-mug'].map((k) => PRODUCTS.find((p) => p.key === k)).filter(Boolean),
    []
  );
  const featuredKeys = new Set(featured.map((p) => p.key));

  const shown = useMemo(() => {
    const base = filter === 'All' ? PRODUCTS.filter((p) => !featuredKeys.has(p.key)) : PRODUCTS.filter((p) => p.group === filter);
    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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

  return (
    <main className="tls">
      {/* ---------- Hero ---------- */}
      <section className="tls-hero">
        <div className="tls-hero-media" aria-hidden="true">
          {heroVideoOk ? (
            <video
              src="/store/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setHeroVideoOk(false)}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src="/store/neverlose-hoodie.jpg" alt="" />
          )}
        </div>
        <div className="tls-shell tls-hero-inner">
          <div className="tls-hero-top">
            <span className="tls-mono">( The Lost Jamaican )</span>
            <span className="tls-mono">Kingston / Daytona — {new Date().getFullYear()}</span>
          </div>
          <Reveal>
            <h1 className="tls-display">
              Anybody can print a shirt. We prefer <em>meaning</em>.
            </h1>
          </Reveal>
          <div className="tls-hero-foot">
            <p className="tls-lede">
              Every piece carries a phrase Jamaicans actually live by, set in type worth keeping.
              Black on black, gold where it counts — printed to order and shipped worldwide.
            </p>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              <a href="#collection" className="tls-link">The Collection</a>
              <a href="#courses" className="tls-link">The Courses</a>
              <a href="/prompts" className="tls-link">Prompt Packs</a>
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

      {/* ---------- Collection ---------- */}
      <section id="collection" className="tls-section">
        <div className="tls-shell">
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 01 — The Flagships )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                More money. <em>Never lose.</em>
              </h2>
            </div>
            <span className="tls-mono">The pieces we stand on</span>
          </div>

          <div className="tls-featured">
            {featured.map((p) => (
              <Reveal as="article" className="tls-feature" key={p.key}>
                <div className="tls-feature-img">
                  <span className="tls-feature-tag">Flagship</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} />
                </div>
                <div className="tls-feature-meta">
                  <h3 className="tls-feature-name">{p.name}</h3>
                  <span className="tls-card-price">{money(p.price)}</span>
                </div>
                <p className="tls-card-blurb">{p.blurb}</p>
                <BuyControls p={p} onAdd={addItem} big />
              </Reveal>
            ))}
          </div>

          <div className="tls-head">
            <div>
              <span className="tls-mono">( 02 — The Collection )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                Wear the culture.
              </h2>
            </div>
            <span className="tls-mono">({pad(shown.length)}) pieces</span>
          </div>

          <div className="tls-filters">
            {['All', ...GROUPS].map((g) => (
              <button
                key={g}
                className={`tls-filter${filter === g ? ' is-on' : ''}`}
                onClick={() => setFilter(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="tls-grid">
            {shown.map((p, i) => (
              <ProductCard key={p.key} p={p} index={i} onAdd={addItem} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Courses ---------- */}
      <section id="courses" className="tls-section">
        <div className="tls-shell">
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 03 — The Courses )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                The system behind <em>the shorts.</em>
              </h2>
            </div>
            <span className="tls-mono">Enrollment opening</span>
          </div>
          <div className="tls-tiers">
            {COURSES.map((c) => (
              <Reveal as="article" className={`tls-tier${c.flagship ? ' is-flagship' : ''}`} key={c.id}>
                <span className="tls-mono">{c.flagship ? '( The full system )' : '( Tier )'}</span>
                <p className="tls-tier-price">{c.priceLabel}</p>
                <h3>{c.name}</h3>
                <p className="tls-tier-blurb">{c.blurb}</p>
                <ul>
                  {c.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <span className="tls-mono" style={{ marginTop: 18 }}>Coming soon</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Prompt packs ---------- */}
      <section className="tls-section">
        <div className="tls-shell tls-packs-inner">
          <div>
            <span className="tls-mono">( 04 — The Prompt Packs )</span>
            <h2 className="tls-h2" style={{ marginTop: 16 }}>
              Every prompt behind <em>the videos.</em>
            </h2>
            <p className="tls-lede" style={{ marginTop: 18, color: '#57534e' }}>
              The model settings, the character system and the quality gates — one PDF you can hand
              straight to your own AI. Name your price, from $4.99.
            </p>
          </div>
          <a href="/prompts" className="tls-btn">Browse the packs</a>
        </div>
      </section>

      {/* ---------- Cart ---------- */}
      {cart.length > 0 && (
        <div className="tls-cart" role="region" aria-label="Cart">
          <div className="tls-cart-head">
            <span className="tls-mono">( Bag )</span>
            <span className="tls-mono">{pad(count)} item{count === 1 ? '' : 's'}</span>
          </div>
          <div className="tls-cart-items">
            {cart.map((i, idx) => (
              <div key={i.key + i.variantId} className="tls-cart-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.image} alt="" />
                <span className="tls-cart-name">
                  {i.name}
                  {i.size && i.size !== '11oz' ? ` / ${i.size}` : ''} &times;{i.qty}
                </span>
                <span>{money(i.price * i.qty)}</span>
                <button onClick={() => removeItem(idx)} aria-label="Remove">&times;</button>
              </div>
            ))}
          </div>
          <div className="tls-cart-foot">
            <span className="tls-cart-total">Total {money(total)}</span>
            <button className="tls-btn" onClick={checkout} disabled={busy}>
              {busy ? 'Opening…' : 'Checkout'}
            </button>
          </div>
          {err && <p className="tls-err">{err}</p>}
        </div>
      )}
    </main>
  );
}
