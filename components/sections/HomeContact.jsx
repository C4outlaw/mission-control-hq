'use client';
import { useState } from 'react';
import Reveal from '../motion/Reveal';
import Magnetic from '../motion/Magnetic';
import TextReveal from '../motion/TextReveal';
import { useT } from '../../lib/i18n';

export default function HomeContact() {
  const { t } = useT();
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [form, setForm] = useState({ name: '', restaurant: '', phone: '', email: '', message: '', company: '' });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setStatus('invalid'); return;
    }
    setStatus('sending');
    // Submit straight from the visitor's browser to Web3Forms (delivers to
    // myriework@gmail.com). Client-side by design — Web3Forms blocks server
    // relays, and the access key is a public key meant for client code.
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '1f2bdd1e-cf15-499f-9e78-1d3895dbcd12',
          subject: `New website lead — ${form.name}${form.restaurant ? ' · ' + form.restaurant : ''}`,
          from_name: 'MyrieHQ.com',
          botcheck: form.company, // honeypot: Web3Forms drops if filled
          name: form.name,
          restaurant: form.restaurant || '—',
          phone: form.phone || '—',
          email: form.email || '—',
          message: form.message || '—',
        }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      setStatus(data.success ? 'done' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  return (
    <section id="contact" className="contact-block">
      <div className="shell contact-inner">
        <TextReveal as="h2" inView text={t('contact.headline')} className="tropical-h2 contact-title" />
        <Reveal delay={0.1}><p className="lead contact-sub">{t('contact.sub')}</p></Reveal>
        <Reveal delay={0.15}>
          <p className="contact-reassure">Free strategy call · No contracts · First results in 30 days</p>
        </Reveal>

        {status === 'done' ? (
          <Reveal delay={0.1}>
            <div className="contact-success" role="status">
              <span className="contact-success-check" aria-hidden="true">✓</span>
              <h3>Got it — thank you.</h3>
              <p>We&rsquo;ll be in touch within one business day. Prefer now? Call <a href="tel:+13867958727">(386) 795-8727</a>.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.2}>
            <form className="contact-form" onSubmit={submit} noValidate>
              <div className="cf-row">
                <input className="cf-input" type="text" placeholder="Your name *" value={form.name} onChange={set('name')} aria-label="Your name" autoComplete="name" />
                <input className="cf-input" type="text" placeholder="Restaurant / business" value={form.restaurant} onChange={set('restaurant')} aria-label="Restaurant or business" autoComplete="organization" />
              </div>
              <div className="cf-row">
                <input className="cf-input" type="tel" placeholder="Phone *" value={form.phone} onChange={set('phone')} aria-label="Phone" autoComplete="tel" />
                <input className="cf-input" type="email" placeholder="Email" value={form.email} onChange={set('email')} aria-label="Email" autoComplete="email" />
              </div>
              <textarea className="cf-input cf-textarea" rows={3} placeholder="What do you need help with? (website, menus, photos, daily posts…)" value={form.message} onChange={set('message')} aria-label="What do you need help with?" />
              {/* honeypot */}
              <input className="cf-hp" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} aria-hidden="true" />
              <div className="cf-actions">
                <Magnetic strength={0.12}>
                  <button className="ti-btn primary" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Build my package'}
                  </button>
                </Magnetic>
                <span className="cf-or">or reach us directly</span>
                <a className="cf-direct" href="mailto:myriework@gmail.com">myriework@gmail.com</a>
                <a className="cf-direct" href="tel:+13867958727">(386) 795-8727</a>
              </div>
              {status === 'invalid' && (
                <p className="cf-err" role="alert">Please add your name and a phone or email so we can reach you.</p>
              )}
              {status === 'failed' && (
                <p className="cf-err" role="alert">
                  That didn&rsquo;t go through — email <a href="mailto:myriework@gmail.com">myriework@gmail.com</a> or call <a href="tel:+13867958727">(386) 795-8727</a> and we&rsquo;ll jump right on it.
                </p>
              )}
            </form>
          </Reveal>
        )}
      </div>

      <style>{`
        .contact-reassure {
          color: var(--warm); font-family: var(--font-body);
          font-size: 13px; font-weight: 600; letter-spacing: 0.04em;
          margin: 14px 0 0;
        }
        .contact-form { max-width: 640px; margin: 32px auto 0; text-align: left; }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .cf-input {
          width: 100%; padding: 14px 16px;
          background: var(--bg-card); color: var(--ink);
          border: 1px solid var(--line); border-radius: 12px;
          font-family: var(--font-body); font-size: 15px;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .cf-input::placeholder { color: var(--muted-2); }
        .cf-input:focus-visible {
          outline: none; border-color: var(--warm);
          box-shadow: 0 0 0 3px rgba(176,138,62,0.18);
        }
        .cf-textarea { resize: vertical; min-height: 88px; margin-bottom: 16px; }
        .cf-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .cf-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .cf-or { color: var(--muted); font-size: 13px; }
        .cf-direct { color: var(--ink-2); font-size: 13px; font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--line-2); }
        .cf-direct:hover { color: var(--ink); }
        .cf-err { color: #ff7a7a; font-size: 13px; margin: 14px 0 0; }
        .cf-err a { color: #ff7a7a; }

        .contact-success { max-width: 560px; margin: 28px auto 0; }
        .contact-success-check {
          display: inline-grid; place-items: center;
          width: 54px; height: 54px; border-radius: 50%;
          background: rgba(176,138,62,0.16); color: var(--warm);
          font-size: 26px; margin-bottom: 16px;
        }
        .contact-success h3 { color: var(--ink); font-size: 24px; margin: 0 0 8px; }
        .contact-success p { color: var(--muted); }
        .contact-success a { color: var(--ink); }

        @media (max-width: 560px) {
          .cf-row { grid-template-columns: 1fr; }
          .cf-actions { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
