'use client';
import { useState } from 'react';

// The $5 instant-download Patwa Sticker Pack. Checkout is created server-side at /api/pack-checkout,
// which fixes the price, so this button only starts the session and redirects to Stripe.
export default function PatwaPackCard() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function buy() {
    setBusy(true);
    setErr('');
    try {
      const r = await fetch('/api/pack-checkout', { method: 'POST' });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || 'Checkout unavailable');
      window.location.href = d.url;
    } catch {
      setErr('Checkout is unavailable right now. Please try again in a minute.');
      setBusy(false);
    }
  }

  return (
    <section id="sticker-pack" style={{ background: '#141414', color: '#f3eee4', padding: '40px 16px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
        <img
          src="/store/patwa-sticker-pack.jpg"
          alt="Patwa Sticker Pack: 30 colourful Jamaican stickers including jerk chicken, beef patty, doctor bird, bobsled and more"
          width={480}
          height={600}
          loading="lazy"
          style={{ width: '100%', maxWidth: 440, height: 'auto', borderRadius: 12, flex: '1 1 300px' }}
        />
        <div style={{ flex: '1 1 320px' }}>
          <p style={{ color: '#f0b900', letterSpacing: 3, fontSize: 13, margin: 0 }}>NEW · INSTANT DOWNLOAD</p>
          <h2 style={{ fontSize: 34, lineHeight: 1.1, margin: '8px 0 12px' }}>Patwa Sticker Pack</h2>
          <ul style={{ paddingLeft: 20, margin: '0 0 18px', lineHeight: 1.7 }}>
            <li>30 colourful Jamaican die-cut stickers, transparent PNG</li>
            <li>Printable sticker sheets, ready for US Letter</li>
            <li>6 patois wall prints, 8x10 and 16x20</li>
            <li>Planners, journals, laptops, bottles, gifts</li>
          </ul>
          <button
            onClick={buy}
            disabled={busy}
            style={{ background: '#009b3a', color: '#fff', border: 0, borderRadius: 10, padding: '16px 28px', fontSize: 18, fontWeight: 700, cursor: busy ? 'wait' : 'pointer', minHeight: 48 }}
          >
            {busy ? 'Opening checkout…' : 'Get the pack · $5'}
          </button>
          {err ? <p role="alert" style={{ color: '#ff8a80', marginTop: 12 }}>{err}</p> : null}
          <p style={{ opacity: 0.7, fontSize: 13, marginTop: 14 }}>Digital download · personal use · secure checkout by Stripe</p>
        </div>
      </div>
    </section>
  );
}
