'use client';

import { useState } from 'react';
import { BASE, ADDONS } from '../../lib/prompt-packs';

const money = (c) => `$${(c / 100).toFixed(2)}`;

export default function PromptsPage() {
  const [amount, setAmount] = useState(BASE.defaultAmount / 100);
  const [picked, setPicked] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const min = BASE.minAmount / 100;
  const base = Math.max(min, Number(amount) || min);
  const total = base * 100 + picked.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price || 0), 0);

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

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

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '56px 20px 90px', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', color: '#14161a' }}>
      <p style={{ textTransform: 'uppercase', letterSpacing: 2, fontSize: 12, color: '#1b52d6', margin: 0 }}>MyrieHQ</p>
      <h1 style={{ fontSize: 38, lineHeight: 1.1, margin: '10px 0 14px', letterSpacing: -0.5 }}>{BASE.name}</h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: '#3a4150' }}>{BASE.blurb}</p>

      <ul style={{ fontSize: 15, lineHeight: 1.8, color: '#3a4150', paddingLeft: 20 }}>
        <li>The ten production steps, in order, with the reasoning behind each</li>
        <li>Exact model stack and settings — render size, steps, narration parameters</li>
        <li>The character-card continuity system that stops faces drifting between shots</li>
        <li>Every scene prompt as a reusable template</li>
        <li>The QC gates a video must pass before it ships</li>
      </ul>

      <section style={{ border: '1px solid #dfe4ee', borderRadius: 12, padding: 24, marginTop: 30 }}>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Name your price</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, color: '#5a6478' }}>$</span>
          <input
            type="number"
            min={min}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={() => setAmount(Math.max(min, Number(amount) || min))}
            style={{ fontSize: 22, padding: '10px 14px', width: 130, border: '1px solid #c9d0de', borderRadius: 8 }}
          />
          <span style={{ color: '#5a6478', fontSize: 14 }}>minimum {money(BASE.minAmount)} — pay more if it's worth more to you</span>
        </div>

        <h2 style={{ fontSize: 17, margin: '28px 0 6px' }}>Add to your order</h2>
        {ADDONS.map((a) => (
          <label
            key={a.id}
            style={{
              display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', marginTop: 10,
              border: `1px solid ${picked.includes(a.id) ? '#1b52d6' : '#dfe4ee'}`,
              background: picked.includes(a.id) ? '#f4f7ff' : '#fff',
              borderRadius: 10, cursor: 'pointer',
            }}
          >
            <input type="checkbox" checked={picked.includes(a.id)} onChange={() => toggle(a.id)} style={{ marginTop: 4 }} />
            <span>
              <b>{a.name}</b> <span style={{ color: '#1b52d6', fontWeight: 700 }}>+{money(a.price)}</span>
              <br />
              <span style={{ color: '#5a6478', fontSize: 14, lineHeight: 1.5 }}>{a.blurb}</span>
            </span>
          </label>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26 }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Total {money(total)}</div>
          <button
            onClick={buy}
            disabled={busy}
            style={{
              background: '#1b52d6', color: '#fff', border: 0, borderRadius: 8,
              padding: '15px 32px', fontSize: 17, fontWeight: 700, cursor: busy ? 'default' : 'pointer',
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? 'Starting…' : 'Buy now'}
          </button>
        </div>
        {err && <p style={{ color: '#b00020', marginTop: 12 }}>{err}</p>}
        <p style={{ color: '#5a6478', fontSize: 13, marginTop: 14 }}>
          Secure checkout by Stripe. Your download link is emailed the moment payment clears.
        </p>
      </section>

      <p style={{ color: '#5a6478', fontSize: 13, marginTop: 26, lineHeight: 1.6 }}>
        These packs teach a method. They do not include likeness prompts for specific real
        people. If you depict a real person, use your own rights-cleared references and label
        the result as illustrated reconstruction.
      </p>
    </main>
  );
}
