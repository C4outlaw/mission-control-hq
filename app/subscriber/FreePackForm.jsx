'use client';

import { useState } from 'react';

// Email-first, but never a gate: the direct download stays on the page whatever
// happens here, because the promise made on Facebook was "free, no hoops".
// Asking first is what builds the list; letting people past is what keeps the promise.
export default function FreePackForm({ zip, button }) {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [state, setState] = useState('idle'); // idle | sending | done

  async function submit(e) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    try {
      await fetch('/api/free-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, source: 'subscriber' }),
      });
    } catch {
      // A failed capture must not cost the visitor their download.
    }
    setState('done');
    window.location.href = zip;
  }

  if (state === 'done') {
    return (
      <div style={{ marginTop: 26 }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#e8f1ff', margin: 0 }}>
          <b>Your download is starting.</b> We also sent the link to {email} so you
          always have it.
        </p>
        <a href={zip} style={{ ...button, marginTop: 16 }}>
          Download again
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 26 }}>
      <label
        htmlFor="fp-email"
        style={{ display: 'block', fontSize: 15, fontWeight: 600, marginBottom: 8, color: '#e8f1ff' }}
      >
        Where should we send it?
      </label>
      <input
        id="fp-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        style={{
          width: '100%',
          padding: '14px 14px',
          fontSize: 16,
          border: '1px solid #3a4a63',
          background: '#111823',
          color: '#e8f1ff',
          borderRadius: 7,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />
      <button type="submit" style={{ ...button, width: '100%', border: 'none', cursor: 'pointer' }}>
        {state === 'sending' ? 'Sending…' : 'Send me The Prompt Guide'}
      </button>
      <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6, color: '#8492a9' }}>
        One email with your download, then only when there is a new pack or a new film.
        No spam, unsubscribe any time.{' '}
        <a href={zip} style={{ color: '#93a1b8' }}>Or skip it and download now.</a>
      </p>
    </form>
  );
}
