'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Premium scroll-triggered contact pill.
 *
 * Behavior:
 *  - Appears once the user has scrolled past 25% of the page
 *  - Sits at bottom-right (mobile: bottom-center) with glass-morphic styling
 *  - Click pill → expands into an inline contact form (name, email, message)
 *  - Form submit → opens user's mail client with a prefilled mailto:
 *  - Close (X) dismisses for the rest of the session
 */
export default function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('myrie_cta_dismissed') === '1') {
      setDismissed(true);
      return;
    }

    let lastShownAt = 0;
    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;

      if (pct >= 0.22 && !visible) {
        setVisible(true);
        lastShownAt = Date.now();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [visible]);

  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    setOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('myrie_cta_dismissed', '1');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project — ${form.name || 'Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:myriework@gmail.com?subject=${subject}&body=${body}`;
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`scroll-cta${open ? ' is-open' : ''}`}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Contact Myrie HQ"
        >
          {!open ? (
            <>
              <button
                type="button"
                className="scroll-cta-pill"
                onClick={() => setOpen(true)}
                aria-label="Open contact form"
              >
                <span className="cta-dot" aria-hidden="true" />
                <span>Let&apos;s build something</span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
              <button type="button" className="scroll-cta-close" onClick={dismiss} aria-label="Dismiss">×</button>
            </>
          ) : (
            <form className="scroll-cta-form" onSubmit={submit}>
              <div className="form-head">
                <span className="form-eyebrow">— Start a project</span>
                <button type="button" className="scroll-cta-close inside" onClick={dismiss} aria-label="Close">×</button>
              </div>
              <h3 className="form-title">Tell us what you want to build.</h3>
              <p className="form-sub">We reply same day.</p>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
              <textarea
                placeholder="What's the project? (a sentence is fine)"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={3}
                required
              />
              <div className="form-actions">
                <button type="submit" className="ti-btn primary form-send">Send →</button>
                <a href="tel:+13867958727" className="form-call">or call (386) 795-8727</a>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
