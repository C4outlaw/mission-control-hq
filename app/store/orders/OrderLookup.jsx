'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const money = (c) => `$${((c || 0) / 100).toFixed(2)}`;

export default function OrderLookup({ initialNumber = '', initialEmail = '' }) {
  const [number, setNumber] = useState(initialNumber);
  const [email, setEmail] = useState(initialEmail);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function look(e) {
    e?.preventDefault();
    setBusy(true); setError(''); setOrder(null);
    try {
      const r = await fetch('/api/order-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, email }),
      });
      const j = await r.json();
      if (j.order) setOrder(j.order); else setError(j.error || 'No order found.');
    } catch {
      setError('Could not reach the shop. Please try again.');
    }
    setBusy(false);
  }

  // Arriving from the confirmation page, both fields are already filled in, so
  // look the order up rather than making the buyer press a button to see it.
  useEffect(() => {
    if (initialNumber && initialEmail) look();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form className="ord-form" onSubmit={look}>
        <label>
          <span>Order number</span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="TLJ-XXXXXXXX"
            autoComplete="off"
            required
          />
        </label>
        <label>
          <span>Email you ordered with</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <button className="ord-btn" type="submit" disabled={busy}>
          {busy ? 'Looking…' : 'Find my order'}
        </button>
      </form>

      {error && <p className="ord-error" role="alert">{error}</p>}

      {order && (
        <section className="ord-card" aria-live="polite">
          <header>
            <p className="ord-eyebrow">{order.number}</p>
            <h2>{order.status.label}</h2>
            <p className="ord-note">{order.status.detail}</p>
          </header>
          <dl className="ord-facts">
            <div><dt>Ordered</dt><dd>{new Date(order.created).toLocaleDateString()}</dd></div>
            <div><dt>Total paid</dt><dd>{money(order.total)}</dd></div>
            <div><dt>Shipping</dt><dd>{money(order.shipping)}</dd></div>
            {order.address && (
              <div>
                <dt>Shipping to</dt>
                <dd>
                  {order.address.line1}
                  {order.address.line2 ? `, ${order.address.line2}` : ''}, {order.address.city},{' '}
                  {order.address.state} {order.address.postal_code}
                </dd>
              </div>
            )}
          </dl>
          {order.items.length > 0 && (
            <ul className="ord-items">
              {order.items.map((it, i) => (
                <li key={i}>
                  <span>{it.design}</span>
                  <span>{[it.color, it.size].filter(Boolean).join(' · ')} × {it.qty}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="ord-help">
            Something wrong with this order? Reply to your receipt email and it gets sorted.
          </p>
        </section>
      )}

      <p className="ord-back"><Link href="/store">Back to the shop</Link></p>
    </>
  );
}
