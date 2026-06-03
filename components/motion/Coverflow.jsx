'use client';
import { useState, useCallback, useRef } from 'react';

/**
 * Premium 3D coverflow. Cards float on a seamless stage; the center card is
 * prominent, neighbors angle back in 3D, and you skip page by page with the
 * arrows, swipe, or by clicking a side card. Styling lives in marketing.css
 * (.cf-*). Shared by the plates gallery and the design gallery.
 *
 * Props: slides = [{ src, cap, alt? }], dark (light captions/arrows for dark sections)
 */
export default function Coverflow({ slides = [], dark = false }) {
  const [active, setActive] = useState(0);
  const n = slides.length;
  const touch = useRef(null);

  const go = useCallback((d) => setActive((a) => (a + d + n) % n), [n]);
  const goTo = useCallback((i) => setActive(((i % n) + n) % n), [n]);

  if (!n) return null;

  return (
    <div className={`cf-wrap${dark ? ' cf-dark' : ''}`}>
      <div
        className="cf-stage"
        onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (dx < -40) go(1); else if (dx > 40) go(-1);
          touch.current = null;
        }}
      >
        {slides.map((s, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const abs = Math.abs(rel);
          const shown = abs <= 2;
          return (
            <figure
              key={s.src}
              className={`cf-card${rel === 0 ? ' is-active' : ''}`}
              aria-hidden={rel === 0 ? undefined : true}
              onClick={() => rel !== 0 && goTo(i)}
              style={{
                transform: `translate(-50%, -50%) translateX(calc(${rel} * var(--cf-step))) rotateY(${-rel * 26}deg) scale(${rel === 0 ? 1 : 0.82})`,
                zIndex: 50 - abs,
                opacity: shown ? (abs === 0 ? 1 : abs === 1 ? 0.78 : 0.4) : 0,
                visibility: shown ? 'visible' : 'hidden',
                pointerEvents: rel === 0 ? 'none' : shown ? 'auto' : 'none',
                cursor: rel === 0 ? 'default' : 'pointer',
              }}
            >
              <img src={s.src} alt={s.alt || s.cap} loading={abs <= 1 ? 'eager' : 'lazy'} draggable={false} />
            </figure>
          );
        })}
      </div>

      <div className="cf-controls">
        <button className="cf-arrow" onClick={() => go(-1)} aria-label="Previous">‹</button>
        <div className="cf-meta">
          <span className="cf-cap">{slides[active].cap}</span>
          <span className="cf-count">{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        </div>
        <button className="cf-arrow" onClick={() => go(1)} aria-label="Next">›</button>
      </div>
    </div>
  );
}
