'use client';

import { useState } from 'react';
import { PACKS, ADDONS, BASE } from '../../lib/prompt-packs';

const money = (c) => `$${(c / 100).toFixed(2)}`;

const Check = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const INCLUDED = [
  'The ten production steps, in order, with the reasoning behind each',
  'Exact model stack and settings — render size, steps, narration parameters',
  'The character-card system that keeps faces consistent shot to shot',
  'Every scene prompt as a reusable template',
  'The QC gates a video must pass before it ships',
];

export default function PromptsPage() {
  const [packId, setPackId] = useState(PACKS[0].id);
  const [amount, setAmount] = useState(BASE.defaultAmount / 100);
  const [picked, setPicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const pack = PACKS.find((p) => p.id === packId) || PACKS[0];
  const min = BASE.minAmount / 100;
  const base = Math.max(min, Number(amount) || min);
  const total = base * 100 + picked.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function buy() {
    setBusy(true); setErr('');
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId: pack.id, amount: Math.round(base * 100), addons: picked }),
      });
      const d = await r.json();
      if (d.url) window.location.href = d.url; else setErr(d.error || 'Could not start checkout.');
    } catch (e) { setErr(e.message); } finally { setBusy(false); }
  }

  const card = { background: '#fff', border: '2px solid #000', borderRadius: 8, boxShadow: '6px 6px 0 #000' };

  return (
    <div style={{ background: '#F4F4EF', minHeight: '100dvh', color: '#000', fontFamily: "'Inter','Segoe UI',Helvetica,Arial,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .gr-input:focus{outline:3px solid #FF90E8;outline-offset:2px}
        .gr-buy{transition:transform .15s,box-shadow .15s;cursor:pointer}
        .gr-buy:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 #000!important}
        .gr-buy:active{transform:translate(2px,2px);box-shadow:2px 2px 0 #000!important}
        .gr-addon{transition:transform .15s,box-shadow .15s,background .15s;cursor:pointer}
        .gr-addon:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #000!important}
        .pk{transition:transform .15s,box-shadow .15s;cursor:pointer;scroll-snap-align:start;flex:0 0 208px}
        .pk:hover{transform:translate(-3px,-3px)}
        .rail{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 2px 18px;-webkit-overflow-scrolling:touch}
        .rail::-webkit-scrollbar{height:10px}
        .rail::-webkit-scrollbar-thumb{background:#000;border-radius:6px}
        .rail::-webkit-scrollbar-track{background:#e3e3dc;border-radius:6px}
        @media (prefers-reduced-motion:reduce){.gr-buy,.gr-addon,.pk{transition:none}}
        @media (max-width:900px){.gr-grid{grid-template-columns:1fr!important;gap:24px!important}.gr-purchase{position:static!important}.gr-main{padding:22px 14px 70px!important}}
      `}</style>

      <header style={{ borderBottom: '2px solid #000', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ fontWeight: 900, fontSize: 20, color: '#000', textDecoration: 'none', letterSpacing: -0.5 }}>MyrieHQ</a>
          <span style={{ fontSize: 13, fontWeight: 600, background: '#FF90E8', border: '2px solid #000', borderRadius: 999, padding: '4px 12px' }}>Prompt Packs</span>
        </div>
      </header>

      <main className="gr-main" style={{ maxWidth: 1100, margin: '0 auto', padding: '38px 20px 100px' }}>
        <h1 style={{ fontSize: 'clamp(26px,4.4vw,40px)', lineHeight: 1.12, margin: '0 0 8px', fontWeight: 900, letterSpacing: -0.6 }}>
          Pick your pack. Get the exact prompts.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#333', margin: '0 0 22px', maxWidth: 640 }}>
          Every pack gives you a complete production method — the prompts, decisions and quality
          gates needed to build the work. Name your price, from {money(BASE.minAmount)}.
        </p>

        {/* ——— artist carousel ——— */}
        <div className="rail" role="listbox" aria-label="Choose a prompt pack">
          {PACKS.map((p) => {
            const on = p.id === packId;
            return (
              <button
                key={p.id}
                className="pk"
                role="option"
                aria-selected={on}
                onClick={() => setPackId(p.id)}
                style={{
                  padding: 0, textAlign: 'left', background: '#fff',
                  border: `3px solid ${on ? '#FF90E8' : '#000'}`, borderRadius: 10,
                  boxShadow: on ? '6px 6px 0 #FF90E8' : '4px 4px 0 #000', overflow: 'hidden', font: 'inherit',
                }}
              >
                <img src={p.cover} alt={`${p.subject} prompt pack cover`} width={540} height={960}
                     style={{ display: 'block', width: '100%', height: 'auto', borderBottom: '3px solid #000' }} />
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ fontWeight: 900, fontSize: 17 }}>{p.subject}</div>
                  <div style={{ fontSize: 12.5, color: '#555', fontWeight: 600 }}>{p.tagline} · {p.metric || `${p.shots} shots`}</div>
                  <div style={{ marginTop: 8, display: 'inline-block', fontSize: 12, fontWeight: 800, background: on ? '#FF90E8' : '#FFC900', border: '2px solid #000', borderRadius: 999, padding: '3px 10px' }}>
                    {on ? 'SELECTED' : `from ${money(BASE.minAmount)}`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="gr-grid" style={{ display: 'grid', gridTemplateColumns: '6fr 5fr', gap: 34, alignItems: 'start', marginTop: 14 }}>
          <section aria-label="Pack details">
            <div style={{ ...card, padding: '20px 22px' }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 900 }}>{pack.name}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#333', margin: '0 0 14px' }}>{pack.blurb}</p>
              <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.2 }}>What&rsquo;s inside</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {(pack.includes || INCLUDED).map((l) => (
                  <li key={l} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.55 }}><Check /><span>{l}</span></li>
                ))}
              </ul>
              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, background: '#FFC900', border: '2px solid #000', borderRadius: 8, padding: '10px 14px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" aria-hidden="true"><path d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>
                <span style={{ fontWeight: 700, fontSize: 13.5 }}>Instant download — link emailed the moment payment clears</span>
              </div>
            </div>
          </section>

          <section aria-label="Purchase" className="gr-purchase" style={{ position: 'sticky', top: 20 }}>
            <div style={{ ...card, padding: '22px 20px' }}>
              <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 10 }}>Buying: {pack.subject}</div>
              <div style={{ display: 'inline-flex', alignItems: 'stretch', border: '2px solid #000', borderRadius: 8, overflow: 'hidden', marginBottom: 6 }}>
                <span style={{ background: '#FF90E8', fontWeight: 900, fontSize: 21, padding: '10px 13px', borderRight: '2px solid #000', display: 'flex', alignItems: 'center' }}>$</span>
                <input className="gr-input" aria-label="Name your price in dollars" type="number" min={min} step="1"
                  value={amount} onChange={(e) => setAmount(e.target.value)}
                  onBlur={() => setAmount(Math.max(min, Number(amount) || min))}
                  style={{ fontSize: 21, fontWeight: 800, padding: '10px 12px', width: 108, border: 0, background: '#fff', color: '#000', fontFamily: 'inherit' }} />
              </div>
              <p style={{ fontSize: 12.5, color: '#555', margin: '2px 0 18px' }}>
                Name a fair price — <b>{money(BASE.minAmount)} minimum</b>.
              </p>

              <h3 style={{ fontSize: 12.5, textTransform: 'uppercase', letterSpacing: 1.4, margin: '0 0 2px', fontWeight: 800 }}>Add to your order</h3>
              {ADDONS.map((a) => (
                <label key={a.id} className="gr-addon" style={{
                  display: 'flex', gap: 11, alignItems: 'flex-start', padding: '12px 13px', marginTop: 10,
                  border: '2px solid #000', borderRadius: 8,
                  background: picked.includes(a.id) ? '#FF90E8' : '#fff',
                  boxShadow: picked.includes(a.id) ? '4px 4px 0 #000' : 'none',
                }}>
                  <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggle(a.id)} style={{ marginTop: 4, width: 17, height: 17, accentColor: '#000', cursor: 'pointer' }} />
                  <span>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{a.name}</span>{' '}
                    <span style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>+{money(a.price)}</span><br />
                    <span style={{ color: '#333', fontSize: 12.5, lineHeight: 1.5 }}>{a.blurb}</span>
                  </span>
                </label>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 0', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 23, fontWeight: 900 }}>{money(total)}</div>
                <button onClick={buy} disabled={busy} className="gr-buy" style={{
                  background: '#FF90E8', color: '#000', border: '2px solid #000', borderRadius: 8,
                  boxShadow: '4px 4px 0 #000', padding: '14px 34px', fontSize: 16.5, fontWeight: 900,
                  opacity: busy ? 0.6 : 1, fontFamily: 'inherit', minHeight: 52, flexGrow: 1,
                }}>{busy ? 'Starting…' : 'I want this!'}</button>
              </div>
              {err && <p role="alert" style={{ color: '#C81E1E', marginTop: 12, fontSize: 14, fontWeight: 600 }}>{err}</p>}
              <p style={{ color: '#555', fontSize: 12, marginTop: 13, lineHeight: 1.5, textAlign: 'center' }}>Secure checkout by Stripe</p>
            </div>

            <div style={{ ...card, marginTop: 16, padding: '13px 16px', background: '#FFC900' }}>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, fontWeight: 600 }}>
                These packs teach a method — they don&rsquo;t include likeness prompts for real people.
                Depicting someone real? Use your own rights-cleared references and label the result
                as illustrated reconstruction.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
