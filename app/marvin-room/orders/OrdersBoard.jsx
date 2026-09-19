'use client';

import { useCallback, useEffect, useState } from 'react';

const money = (c) => `$${((c || 0) / 100).toFixed(2)}`;
const when = (t) => new Date(t).toLocaleString(undefined, {
  month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
});

export default function OrdersBoard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [sending, setSending] = useState('');
  const [note, setNote] = useState('');

  const load = useCallback(async () => {
    setError('');
    try {
      const r = await fetch('/api/marvin-orders', { cache: 'no-store' });
      const j = await r.json();
      if (j.error) setError(j.error); else setData(j);
    } catch {
      setError('Could not load orders.');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function resend(id) {
    setSending(id); setNote('');
    try {
      const r = await fetch('/api/marvin-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const j = await r.json();
      setNote(j.ok ? `Sent to the print house — reference ${j.ref}` : `Failed: ${j.error}`);
      if (j.ok) await load();
    } catch {
      setNote('Failed: could not reach the print house.');
    }
    setSending('');
  }

  if (error) return <p className="mo-error" role="alert">{error}</p>;
  if (!data) return <p className="mo-muted">Loading orders…</p>;

  return (
    <>
      <div className="mo-summary">
        <div><strong>{data.orders.length}</strong><span>paid orders</span></div>
        <div className={data.needsAttention ? 'is-warn' : ''}>
          <strong>{data.needsAttention}</strong><span>not yet with the printer</span>
        </div>
        <div><strong>{data.abandoned}</strong><span>carts abandoned</span></div>
      </div>

      {note && <p className="mo-note" role="status">{note}</p>}

      {data.orders.length === 0 ? (
        <p className="mo-muted">No paid orders yet.</p>
      ) : (
        <ul className="mo-list">
          {data.orders.map((o) => (
            <li key={o.id} className={`mo-row is-${o.status.state}`}>
              <div className="mo-main">
                <p className="mo-num">{o.number}</p>
                <p className="mo-who">{o.email || 'no email'}{o.name ? ` · ${o.name}` : ''}</p>
                <p className="mo-items">
                  {o.items.length
                    ? o.items.map((i) => `${i.design} (${[i.color, i.size].filter(Boolean).join(' ')}) ×${i.qty}`).join(', ')
                    : '—'}
                </p>
                {o.status.error && <p className="mo-err">Last error: {o.status.error}</p>}
              </div>
              <div className="mo-meta">
                <p className="mo-when">{when(o.created)}</p>
                <p className="mo-total">{money(o.total)}</p>
                <p className={`mo-state is-${o.status.state}`}>{o.status.label}</p>
                {o.status.state === 'pending' && (
                  <button type="button" onClick={() => resend(o.id)} disabled={sending === o.id}>
                    {sending === o.id ? 'Sending…' : 'Send to printer'}
                  </button>
                )}
                {o.status.ref && <p className="mo-ref">{o.status.ref}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
