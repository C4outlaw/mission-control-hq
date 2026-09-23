'use client';

import { useState } from 'react';

const wrap = {
  maxWidth: 660,
  margin: '0 auto',
  padding: '80px 20px',
  fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  color: '#14161a',
};
const label = { display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 7, color: '#3a4150' };
const input = {
  width: '100%',
  padding: '13px 14px',
  fontSize: 16,
  border: '1px solid #c9cfda',
  borderRadius: 7,
  outline: 'none',
};
const button = {
  marginTop: 14,
  width: '100%',
  padding: '14px 18px',
  fontSize: 16,
  fontWeight: 700,
  color: '#fff',
  background: '#a8791f',
  border: 0,
  borderRadius: 7,
  cursor: 'pointer',
};

export default function SubscriberClaim() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle' });

  async function submit(e) {
    e.preventDefault();
    setState({ status: 'working' });
    try {
      const res = await fetch('/api/subscriber-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return setState({ status: 'error', message: data.error });
      setState({ status: 'ready', url: data.url, minutes: data.expiresInMinutes });
    } catch {
      setState({ status: 'error', message: 'Something went wrong. Please try again.' });
    }
  }

  return (
    <main style={wrap}>
      <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#a8791f', fontWeight: 700, margin: '0 0 12px' }}>
        The Lost Jamaican &middot; Subscribers
      </p>
      <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: '0 0 14px' }}>
        Your free subscriber bundle
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a4150' }}>
        Two documents, yours because you subscribed:
      </p>
      <ul style={{ fontSize: 16, lineHeight: 1.7, color: '#3a4150', paddingLeft: 20 }}>
        <li>
          <b>The Starter Prompt Pack</b> &mdash; ten prompts you can paste straight into your own
          model tonight, covering research, scripting, casting, shots and quality control.
        </li>
        <li>
          <b>How We Build These Videos</b> &mdash; the full production system behind the episodes,
          including the rules that only exist because an episode broke first.
        </li>
      </ul>

      {state.status !== 'ready' && (
        <form onSubmit={submit} style={{ marginTop: 30 }}>
          <label style={label} htmlFor="email">
            The email address you subscribed with
          </label>
          <input
            id="email"
            style={input}
            type="email"
            required
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button style={button} disabled={state.status === 'working'} type="submit">
            {state.status === 'working' ? 'Checking…' : 'Get my download link'}
          </button>
        </form>
      )}

      {state.status === 'error' && (
        <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6, color: '#a3261e' }}>
          {state.message}
        </p>
      )}

      {state.status === 'ready' && (
        <div style={{ marginTop: 30, padding: '22px 24px', background: '#faf7f0', border: '1px solid #e6dfd0', borderRadius: 9 }}>
          <p style={{ margin: '0 0 14px', fontSize: 16, color: '#3a4150' }}>
            Verified. Your link is ready and expires in {state.minutes} minutes.
          </p>
          <a href={state.url} style={{ ...button, display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 0 }}>
            Download the bundle
          </a>
        </div>
      )}

      <p style={{ marginTop: 34, fontSize: 14, lineHeight: 1.65, color: '#6b7280' }}>
        Not subscribed yet?{' '}
        <a href="https://www.facebook.com/100091255320275/subscribe/" style={{ color: '#1b52d6', fontWeight: 600 }}>
          Subscribe on Facebook
        </a>{' '}
        and come back here. It can take a few minutes for a new subscription to appear.
      </p>
      <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#8b93a1' }}>
        These files are licensed for your own channels. Please do not redistribute them.
      </p>
    </main>
  );
}
