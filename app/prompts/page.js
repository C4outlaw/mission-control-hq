'use client';

import { useState } from 'react';
import { BASE, ADDONS } from '../../lib/prompt-packs';

const money = (c) => `$${(c / 100).toFixed(2)}`;

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const INCLUDED = [
  'The ten production steps, in order, with the reasoning behind each',
  'Exact model stack and settings — render size, steps, narration parameters',
  'The character-card system that keeps faces consistent shot to shot',
  'All 48 scene prompts as reusable templates',
  'The QC gates a video must pass before it ships',
];

export default function PromptsPage() {
  const [amount, setAmount] = useState(BASE.defaultAmount / 100);
  const [picked, setPicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const min = BASE.minAmount / 100;
  const base = Math.max(min, Number(amount) || min);
  const total = base * 100 + picked.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0);

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function buy() {
    setBusy(true);
    setErr('');
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(base * 100), addons: picked }),
      });
      const d = await r.json();
      if (d.url) window.location.href = d.url;
      else setErr(d.error || 'Could not start checkout.');
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  const card = {
    background: '#FFFFFF',
    border: '2px solid #000',
    borderRadius: 8,
    boxShadow: '6px 6px 0 #000',
  };

  return (
    <div style={{ background: '#F4F4EF', minHeight: '100dvh', color: '#000', fontFamily: "'Inter', 'Segoe UI', Helvetica, Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .gr-input:focus { outline: 3px solid #FF90E8; outline-offset: 2px; }
        .gr-buy { transition: transform 150ms ease, box-shadow 150ms ease; cursor: pointer; }
        .gr-buy:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 #000 !important; }
        .gr-buy:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 #000 !important; }
        .gr-addon { transition: transform 150ms ease, box-shadow 150ms ease, background 150ms ease; cursor: pointer; }
        .gr-addon:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #000 !important; }
        @media (prefers-reduced-motion: reduce) { .gr-buy, .gr-addon { transition: none; } }
        @media (max-width: 900px) {
          .gr-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .gr-purchase { position: static !important; }
          .gr-main { padding: 24px 14px 70px !important; }
        }
      `}</style>

      {/* Top bar */}
      <header style={{ borderBottom: '2px solid #000', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ fontWeight: 900, fontSize: 20, color: '#000', textDecoration: 'none', letterSpacing: -0.5 }}>MyrieHQ</a>
          <span style={{ fontSize: 13, fontWeight: 600, background: '#FF90E8', border: '2px solid #000', borderRadius: 999, padding: '4px 12px' }}>Prompt Packs</span>
        </div>
      </header>

      <main className="gr-main" style={{ maxWidth: 1100, margin: '0 auto', padding: '44px 20px 100px' }}>
        <div className="gr-grid" style={{ display: 'grid', gridTemplateColumns: '6fr 5fr', gap: 36, alignItems: 'start' }}>
          {/* ——— Product side ——— */}
          <section aria-label="Product preview">
            <div style={{ ...card, overflow: 'hidden', padding: 0 }}>
              <img
                src="/prompts/pack-page1.png"
                alt="Cover of The Lost Jamaican Method prompt pack PDF"
                width={820}
                height={1093}
                style={{ display: 'block', width: '100%', height: 'auto', borderBottom: '2px solid #000' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#FFC900', borderTop: '0' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" aria-hidden="true"><path d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Actual first page of the PDF you receive — instant download after checkout</span>
              </div>
            </div>

            <div style={{ ...card, marginTop: 22, padding: '20px 22px' }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 800 }}>What&rsquo;s inside</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INCLUDED.map((line) => (
                  <li key={line} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.55 }}>
                    <CheckIcon />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 16, borderTop: '2px dashed #000', paddingTop: 14 }}>
                <img
                  src="/prompts/pack-page2.png"
                  alt="Inside page of the prompt pack showing the ten production steps"
                  width={820}
                  height={1093}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', height: 'auto', border: '2px solid #000', borderRadius: 6 }}
                />
              </div>
            </div>
          </section>

          {/* ——— Purchase side ——— */}
          <section aria-label="Purchase" className="gr-purchase" style={{ position: 'sticky', top: 20 }}>
            <div style={{ ...card, padding: '24px 22px' }}>
              <h1 style={{ fontSize: 'clamp(24px, 3.4vw, 32px)', lineHeight: 1.15, margin: '0 0 8px', fontWeight: 900, letterSpacing: -0.5 }}>
                {BASE.name}
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#333', margin: '0 0 18px' }}>{BASE.blurb}</p>

              <div style={{ display: 'inline-flex', alignItems: 'stretch', border: '2px solid #000', borderRadius: 8, overflow: 'hidden', marginBottom: 6 }}>
                <span style={{ background: '#FF90E8', fontWeight: 900, fontSize: 22, padding: '10px 14px', borderRight: '2px solid #000', display: 'flex', alignItems: 'center' }}>$</span>
                <input
                  id="gr-amount"
                  className="gr-input"
                  aria-label="Name your price in dollars"
                  type="number"
                  min={min}
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onBlur={() => setAmount(Math.max(min, Number(amount) || min))}
                  style={{ fontSize: 22, fontWeight: 800, padding: '10px 12px', width: 110, border: 0, background: '#fff', color: '#000', fontFamily: 'inherit' }}
                />
              </div>
              <p style={{ fontSize: 13, color: '#555', margin: '2px 0 20px' }}>
                Name a fair price — <b>{money(BASE.minAmount)} minimum</b>, more if it&rsquo;s worth more to you.
              </p>

              <h2 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, margin: '0 0 2px', fontWeight: 800 }}>Add to your order</h2>
              {ADDONS.map((a) => (
                <label
                  key={a.id}
                  className="gr-addon"
                  style={{
                    display: 'flex', gap: 12, alignItems: 'flex-start', padding: '13px 14px', marginTop: 12,
                    border: '2px solid #000', borderRadius: 8,
                    background: picked.includes(a.id) ? '#FF90E8' : '#FFFFFF',
                    boxShadow: picked.includes(a.id) ? '4px 4px 0 #000' : 'none',
                  }}
                >
                  <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggle(a.id)} style={{ marginTop: 4, width: 18, height: 18, accentColor: '#000', cursor: 'pointer' }} />
                  <span>
                    <span style={{ fontWeight: 800, fontSize: 14.5 }}>{a.name}</span>{' '}
                    <span style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>+{money(a.price)}</span>
                    <br />
                    <span style={{ color: '#333', fontSize: 13, lineHeight: 1.5 }}>{a.blurb}</span>
                  </span>
                </label>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '22px 0 0', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{money(total)}</div>
                <button
                  onClick={buy}
                  disabled={busy}
                  className="gr-buy"
                  style={{
                    background: '#FF90E8', color: '#000', border: '2px solid #000', borderRadius: 8,
                    boxShadow: '4px 4px 0 #000',
                    padding: '15px 40px', fontSize: 17, fontWeight: 900,
                    opacity: busy ? 0.6 : 1, fontFamily: 'inherit', minHeight: 52, flexGrow: 1,
                  }}
                >
                  {busy ? 'Starting…' : 'I want this!'}
                </button>
              </div>
              {err && <p role="alert" style={{ color: '#C81E1E', marginTop: 12, fontSize: 14, fontWeight: 600 }}>{err}</p>}
              <p style={{ color: '#555', fontSize: 12.5, marginTop: 14, lineHeight: 1.55, textAlign: 'center' }}>
                Secure checkout by Stripe &middot; download links emailed instantly
              </p>
            </div>

            <div style={{ ...card, marginTop: 18, padding: '14px 18px', background: '#FFC900' }}>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, fontWeight: 600 }}>
                These packs teach a method — they don&rsquo;t include likeness prompts for real
                people. Depicting someone real? Use your own rights-cleared references and label
                the result as illustrated reconstruction.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
