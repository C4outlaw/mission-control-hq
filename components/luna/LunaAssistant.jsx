'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import styles from './LunaAssistant.module.css';

const welcome = { role: 'luna', text: 'Hi, I’m Luna. Ask me about MyrieHQ websites, SEO, creative, or automation.' };

export default function LunaAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcome]);
  const [question, setQuestion] = useState('');
  const [pending, setPending] = useState('');
  const [needsContact, setNeedsContact] = useState(false);
  const [sending, setSending] = useState(false);
  const [lead, setLead] = useState({ name: '', contact: '', preference: 'text', company: '' });
  const logRef = useRef(null);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }); }, [messages, needsContact]);

  async function ask(event) {
    event.preventDefault();
    const text = question.trim();
    if (!text || sending) return;
    setQuestion(''); setPending(text); setSending(true); setNeedsContact(false);
    setMessages((items) => [...items, { role: 'you', text }]);
    try {
      const response = await fetch('/api/luna-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
      const data = await response.json();
      setMessages((items) => [...items, { role: 'luna', text: data.reply }]);
      setNeedsContact(Boolean(data.needsContact));
    } catch { setMessages((items) => [...items, { role: 'luna', text: 'Please call Myrie directly at 386-795-8727.' }]); }
    finally { setSending(false); }
  }

  async function escalate(event) {
    event.preventDefault();
    if (!lead.name.trim() || !lead.contact.trim() || sending) return;
    setSending(true);
    try {
      const response = await fetch('/api/luna-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...lead, message: pending, escalate: true }) });
      const data = await response.json();
      setMessages((items) => [...items, { role: 'luna', text: data.reply }]);
      setNeedsContact(Boolean(data.needsContact));
    } catch { setMessages((items) => [...items, { role: 'luna', text: 'Please call Myrie directly at 386-795-8727.' }]); }
    finally { setSending(false); }
  }

  return (
    <aside className={styles.root} aria-label="MyrieHQ assistant">
      {open && <section className={styles.panel} aria-label="Chat with Luna">
        <header className={styles.header}><div><span className={styles.eyebrow}>MyrieHQ operator</span><strong>Luna</strong><small><i /> Online · approved answers only</small></div><button onClick={() => setOpen(false)} aria-label="Close Luna"><X size={20} /></button></header>
        <div className={styles.log} ref={logRef} role="log" aria-live="polite">{messages.map((message, index) => <p key={`${message.role}-${index}`} className={message.role === 'you' ? styles.you : styles.luna}>{message.text}</p>)}</div>
        {needsContact && <form className={styles.handoff} onSubmit={escalate}><p>Luna will send this to Myrie.</p><label>Name<input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} required /></label><label>Phone or email<input value={lead.contact} onChange={(e) => setLead({ ...lead, contact: e.target.value })} required /></label><label>How should Myrie respond?<select value={lead.preference} onChange={(e) => setLead({ ...lead, preference: e.target.value })}><option value="text">Text me</option><option value="call">Call me</option></select></label><input className={styles.honeypot} tabIndex={-1} value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} aria-hidden="true" /><button disabled={sending}>Send to Myrie</button></form>}
        <form className={styles.ask} onSubmit={ask}><label className="sr-only" htmlFor="luna-question">Ask Luna</label><input id="luna-question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask about MyrieHQ…" maxLength={500} /><button aria-label="Send question" disabled={sending}><Send size={18} /></button></form>
      </section>}
      <button className={styles.launcher} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close Luna assistant' : 'Open Luna assistant'}>{open ? <X size={22} /> : <MessageCircle size={22} />}<span>{open ? 'Close' : 'Ask Luna'}</span></button>
    </aside>
  );
}
