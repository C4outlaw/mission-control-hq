'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DESIGN_GROUPS, KIND, money } from '../../lib/store-products';
import { COURSES } from '../../lib/store-catalog';

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

// Editorial interludes that break the grid so the scroll never feels repetitive.
const INTERLUDES = [
  { small: 'A Jamaican proverb', big: 'Every mickle mek a muckle.', sub: 'Every little bit adds up.' },
  { small: 'The house rule', big: 'Wi likkle but wi tallawah.', sub: 'Small, but mighty.' },
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

/* One card per DESIGN: garment switcher + size + add. No duplicate cards. */
function DesignCard({ g, index, onAdd, preferKind }) {
  const initial = g.items.find((i) => i.kind === preferKind) || g.items[0];
  const [active, setActive] = useState(initial.key);
  const [variantId, setVariantId] = useState(initial.variants[0]?.id);
  const [added, setAdded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const want = g.items.find((i) => i.kind === preferKind);
    if (want && want.key !== active) {
      setActive(want.key);
      setVariantId(want.variants[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferKind]);

  const item = g.items.find((i) => i.key === active) || g.items[0];
  const hasSizes = item.variants.length > 1;

  function pick(key) {
    const it = g.items.find((i) => i.key === key);
    setActive(key);
    setVariantId(it.variants[0]?.id);
  }

  function add() {
    const size = item.variants.find((v) => String(v.id) === String(variantId))?.size;
    onAdd({ key: item.key, variantId, qty: 1, name: item.name, price: item.price, image: item.image, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Reveal as="article" className="tls-card">
      <div
        className={`tls-card-img${g.spin || g.video ? ' is-interactive' : ''}`}
        onClick={() => (g.spin || g.video) && setPlaying((p) => !p)}
        role={g.spin || g.video ? 'button' : undefined}
        tabIndex={g.spin || g.video ? 0 : undefined}
        aria-label={g.spin || g.video ? `See the ${g.label} shirt in motion` : undefined}
        onKeyDown={(e) => (g.spin || g.video) && (e.key === 'Enter' || e.key === ' ') && setPlaying((p) => !p)}
      >
        <span className="tls-card-index">({pad(index + 1)})</span>
        {playing && (g.spin || g.video) ? (
          /* eslint-disable-next-line jsx-a11y/media-has-caption */
          <video src={g.spin || g.video} poster={item.image} autoPlay loop muted playsInline />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={item.image} alt={item.name} loading="lazy" />
        )}
        {(g.spin || g.video) && !playing && <span className="tls-card-cue">360° view</span>}
      </div>
      <div className="tls-card-meta">
        <h3 className="tls-card-name">{g.label}</h3>
        <span className="tls-card-price">{money(item.price)}</span>
      </div>
      <p className="tls-card-blurb">{g.blurb}</p>
      <div className="tls-kinds" role="group" aria-label={`Choose product for ${g.label}`}>
        {g.items.map((i) => (
          <button
            key={i.key}
            className={`tls-kind${i.key === active ? ' is-on' : ''}`}
            onClick={() => pick(i.key)}
          >
            {KIND[i.kind]?.name || i.kind}
          </button>
        ))}
        {(g.spin || g.video) && (
          <button
            className={`tls-kind tls-kind-360${playing ? ' is-on' : ''}`}
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            title={`See the ${g.label} in motion`}
          >
            360°
          </button>
        )}
      </div>
      <div className="tls-card-buy">
        {hasSizes && (
          <select
            className="tls-size"
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            aria-label={`Size for ${item.name}`}
          >
            {item.variants.map((v) => (
              <option key={v.id} value={v.id}>{v.size}</option>
            ))}
          </select>
        )}
        <button className="tls-btn" onClick={add}>{added ? 'Added' : 'Add to cart'}</button>
      </div>
    </Reveal>
  );
}

function Interlude({ it }) {
  return (
    <Reveal className="tls-interlude">
      <span className="tls-mono">( {it.small} )</span>
      <p className="tls-interlude-big">{it.big}</p>
      <span className="tls-mono">{it.sub}</span>
    </Reveal>
  );
}

const FILTERS = [
  { id: 'All', label: 'All', kind: null },
  { id: 'Tees', label: 'Tees', kind: 'tee' },
  { id: 'Heavyweight', label: 'Heavyweight Tees', kind: 'gdtee' },
  { id: 'Hoodies', label: 'Hoodies & Sweats', kind: 'hoodie' },
  { id: 'Mugs', label: 'Mugs', kind: 'mug' },
  { id: 'Caps', label: 'Caps', kind: 'cap' },
];

export default function StoreClient() {
  const [cart, setCart] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('All');
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

  const f = FILTERS.find((x) => x.id === filter) || FILTERS[0];
  const featured = DESIGN_GROUPS.slice(0, 2); // money, neverlose
  const rest = useMemo(() => {
    const tail = DESIGN_GROUPS.slice(2);
    if (!f.kind) return tail;
    return tail.filter((g) => g.kinds.includes(f.kind) || (f.kind === 'hoodie' && g.kinds.includes('crew')));
  }, [f.kind]);

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

  // Interleave interludes into the grid: one after every 6 design cards.
  const gridBlocks = [];
  rest.forEach((g, i) => {
    gridBlocks.push({ type: 'card', g, i });
    if ((i + 1) % 6 === 0 && INTERLUDES[(i + 1) / 6 - 1]) {
      gridBlocks.push({ type: 'interlude', it: INTERLUDES[(i + 1) / 6 - 1] });
    }
  });

  return (
    <main className="tls">
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        The Lost Jamaican Store — Jamaican slang merch, video-making courses, and AI prompt packs
      </h1>
      {/* ---------- Hero ---------- */}
      <section className="tls-hero">
        <div className="tls-hero-media" aria-hidden="true">
          {heroVideoOk ? (
            <video src="/store/hero.mp4" autoPlay muted loop playsInline onError={() => setHeroVideoOk(false)} />
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

      {/* ---------- Flagships ---------- */}
      <section id="collection" className="tls-section">
        <div className="tls-shell">
          <div style={{ marginBottom: 64 }}>
            <span className="tls-mono">( 01 — The Mantra )</span>
            <h2 className="tls-mantra">
              More money than last year.
              <br />
              <em>We never lose.</em>
            </h2>
          </div>

          <div className="tls-featured">
            {featured.map((g) => (
              <Reveal as="div" className="tls-feature" key={g.design}>
                <DesignCard g={g} index={DESIGN_GROUPS.indexOf(g)} onAdd={addItem} preferKind="tee" />
              </Reveal>
            ))}
          </div>

          {/* ---------- The Hoodies ---------- */}
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 02 — The Hoodies )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                Heavyweight. <em>Head to toe black.</em>
              </h2>
            </div>
            <span className="tls-mono">({pad(DESIGN_GROUPS.filter((g) => g.kinds.includes('hoodie')).length)}) hoodies</span>
          </div>
          <div className="tls-rail" style={{ marginBottom: 90 }}>
            {DESIGN_GROUPS.filter((g) => g.kinds.includes('hoodie')).map((g, i) => (
              <DesignCard key={'h-' + g.design} g={g} index={i} onAdd={addItem} preferKind="hoodie" />
            ))}
          </div>

          {/* ---------- Bad Wud Dem (the spicy ones) ---------- */}
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 03 — Bad Wud Dem )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                The spicy ones. <em>Done tasteful.</em>
              </h2>
            </div>
            <span className="tls-mono">18+ energy, gallery finish</span>
          </div>
          <div className="tls-rail" style={{ marginBottom: 90 }}>
            {['bomboclaat', 'rhaatid', 'cho', 'kissmiteeth']
              .map((d) => DESIGN_GROUPS.find((g) => g.design === d))
              .filter(Boolean)
              .map((g, i) => (
                <DesignCard key={'bw-' + g.design} g={g} index={i} onAdd={addItem} preferKind="tee" />
              ))}
          </div>

          {/* ---------- The Slang Collection ---------- */}
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 04 — The Collection )</span>
              <h2 className="tls-h2" style={{ marginTop: 16 }}>
                Every piece, <em>every slang.</em>
              </h2>
            </div>
            <span className="tls-mono">({pad(rest.length)}) designs</span>
          </div>

          <div className="tls-filters">
            {FILTERS.map((x) => (
              <button
                key={x.id}
                className={`tls-filter${filter === x.id ? ' is-on' : ''}`}
                onClick={() => setFilter(x.id)}
              >
                {x.label}
              </button>
            ))}
          </div>

          <span className="tls-rail-hint">Swipe sideways to see more →</span>
          <div className="tls-rail">
            {gridBlocks.map((b, idx) =>
              b.type === 'card' ? (
                <DesignCard key={b.g.design} g={b.g} index={b.i} onAdd={addItem} preferKind={f.kind || 'tee'} />
              ) : (
                <Interlude key={'int' + idx} it={b.it} />
              )
            )}
          </div>

          {/* ---------- Mugs ---------- */}
          {DESIGN_GROUPS.filter((g) => g.kinds.includes('mug')).length > 0 && (
            <>
              <div className="tls-head" style={{ marginTop: 100 }}>
                <div>
                  <span className="tls-mono">( 05 — The Mugs )</span>
                  <h2 className="tls-h2" style={{ marginTop: 16 }}>Morning tea, <em>Jamaican style.</em></h2>
                </div>
                <span className="tls-mono">({pad(DESIGN_GROUPS.filter((g) => g.kinds.includes('mug')).length)}) mugs</span>
              </div>
              <span className="tls-rail-hint">Swipe sideways to see more →</span>
              <div className="tls-rail" style={{ marginBottom: 90 }}>
                {DESIGN_GROUPS.filter((g) => g.kinds.includes('mug')).map((g, i) => (
                  <DesignCard key={'mug-' + g.design} g={g} index={i} onAdd={addItem} preferKind="mug" />
                ))}
              </div>
            </>
          )}

          {/* ---------- Caps ---------- */}
          {DESIGN_GROUPS.filter((g) => g.kinds.includes('cap')).length > 0 && (
            <>
              <div className="tls-head">
                <div>
                  <span className="tls-mono">( 06 — The Caps )</span>
                  <h2 className="tls-h2" style={{ marginTop: 16 }}>Crown it. <em>Wear di culture.</em></h2>
                </div>
                <span className="tls-mono">({pad(DESIGN_GROUPS.filter((g) => g.kinds.includes('cap')).length)}) caps</span>
              </div>
              <span className="tls-rail-hint">Swipe sideways to see more →</span>
              <div className="tls-rail">
                {DESIGN_GROUPS.filter((g) => g.kinds.includes('cap')).map((g, i) => (
                  <DesignCard key={'cap-' + g.design} g={g} index={i} onAdd={addItem} preferKind="cap" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ---------- Courses ---------- */}
      <section id="courses" className="tls-section">
        <div className="tls-shell">
          <div className="tls-head">
            <div>
              <span className="tls-mono">( 05 — The Courses )</span>
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
                  {c.features.map((x) => (
                    <li key={x}>{x}</li>
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
            <span className="tls-mono">( 06 — The Prompt Packs )</span>
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
