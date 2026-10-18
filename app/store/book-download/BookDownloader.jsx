'use client';
import { useState } from 'react';

const btn = { display: 'block', width: '100%', padding: '16px 18px', margin: '10px 0', background: '#009b3a', color: '#fff', border: 0, borderRadius: 10, fontSize: 18, fontWeight: 700, minHeight: 48 };

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

// Fetches each encrypted-at-rest slice through the signed download route, joins them in order and
// checks the SHA-256 before saving, so the buyer only ever gets the exact published PDF.
export default function BookDownloader({ urls, fileName, bytes, sha256 }) {
  const [state, setState] = useState({ phase: 'idle', done: 0 });
  const [href, setHref] = useState('');

  async function start() {
    setState({ phase: 'loading', done: 0 });
    try {
      const chunks = [];
      for (let i = 0; i < urls.length; i++) {
        let r = await fetch(urls[i], { cache: 'no-store' });
        if (!r.ok) r = await fetch(urls[i], { cache: 'no-store' }); // one retry for a flaky mobile connection
        if (!r.ok) throw new Error(`part ${i + 1} failed (${r.status})`);
        chunks.push(new Uint8Array(await r.arrayBuffer()));
        setState({ phase: 'loading', done: i + 1 });
      }
      const blob = new Blob(chunks, { type: 'application/pdf' });
      if (blob.size !== bytes) throw new Error('size mismatch');
      if (crypto?.subtle && hex(await crypto.subtle.digest('SHA-256', await blob.arrayBuffer())) !== sha256) {
        throw new Error('checksum mismatch');
      }
      const url = URL.createObjectURL(blob);
      setHref(url);
      setState({ phase: 'ready', done: urls.length });
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      setState({ phase: 'error', done: 0, msg: e.message });
    }
  }

  const mb = Math.round((bytes / 1048576) * 10) / 10;
  if (state.phase === 'ready') {
    return (
      <div>
        <p>Your book is downloaded and verified. If it did not save automatically, tap below.</p>
        <a href={href} download={fileName} style={{ ...btn, textAlign: 'center', textDecoration: 'none' }}>Save {fileName}</a>
      </div>
    );
  }
  return (
    <div>
      <p>One PDF, {mb} MB. On a phone, use Wi-Fi if you can.</p>
      <button onClick={start} disabled={state.phase === 'loading'} style={{ ...btn, cursor: state.phase === 'loading' ? 'wait' : 'pointer' }}>
        {state.phase === 'loading'
          ? `Downloading… ${Math.round((state.done / urls.length) * 100)}%`
          : state.phase === 'error' ? 'Try again' : `Download the book (${mb} MB)`}
      </button>
      {state.phase === 'error' ? (
        <p role="alert" style={{ color: '#ff8a80' }}>
          The download did not finish ({state.msg}). Check your connection and try again. Still stuck? Reply to your receipt email.
        </p>
      ) : null}
    </div>
  );
}
