'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/**
 * Premium image carousel with click-to-zoom Lightbox.
 *
 * Props:
 *   images: [{ src, alt, caption? }]    required
 *   autoplay: ms between slides (0 = off)
 *   aspect: CSS aspect-ratio for the frame ('16/10', '4/5', '1/1', etc.)
 *   showThumbs: render thumbnail strip below
 *
 * Click any image to open it in a full-screen Lightbox at original aspect.
 */
export default function Carousel({
  images = [],
  autoplay = 0,
  aspect = '4/5',
  showThumbs = false,
  rounded = 18,
  className,
  style,
}) {
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const n = images.length;

  const goto = useCallback((i, direction) => {
    const next = ((i % n) + n) % n;
    setState([next, direction ?? (next > index ? 1 : -1)]);
  }, [index, n]);

  const next = useCallback(() => goto(index + 1, 1), [goto, index]);
  const prev = useCallback(() => goto(index - 1, -1), [goto, index]);

  useEffect(() => {
    if (!autoplay || paused || zoomed || n <= 1 || reduce) return;
    const id = setInterval(() => goto(index + 1, 1), autoplay);
    return () => clearInterval(id);
  }, [autoplay, paused, zoomed, index, n, goto, reduce]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Lightbox keyboard handling
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setZoomed(false);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [zoomed, prev, next]);

  if (n === 0) return null;
  const cur = images[index];

  return (
    <div className={className} style={style}>
      <div
        ref={ref}
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="carousel-frame"
        style={{
          position: 'relative',
          aspectRatio: aspect,
          borderRadius: rounded,
          overflow: 'hidden',
          background: '#fafaf7',
          outline: 'none',
          border: '1px solid rgba(10,10,10,0.08)',
        }}
        onClick={(e) => {
          // Don't zoom when clicking arrows/dots/buttons
          if (e.target.closest('button')) return;
          setZoomed(true);
        }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          {cur.video ? (
            <motion.video
              key={index}
              src={cur.video}
              poster={cur.poster || cur.src}
              autoPlay
              loop
              muted
              playsInline
              custom={dir}
              initial={reduce ? { opacity: 0 } : { x: dir > 0 ? '8%' : '-8%', opacity: 0, scale: 1.02 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { x: dir > 0 ? '-8%' : '8%', opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                userSelect: 'none',
                padding: 8,
              }}
            />
          ) : (
            <motion.img
              key={index}
              src={cur.src}
              alt={cur.alt || ''}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { x: dir > 0 ? '8%' : '-8%', opacity: 0, scale: 1.02 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { x: dir > 0 ? '-8%' : '8%', opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              drag={n > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60 || info.velocity.x < -300) next();
                else if (info.offset.x > 60 || info.velocity.x > 300) prev();
              }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                userSelect: 'none',
                touchAction: 'pan-y',
                padding: 8,
              }}
              draggable={false}
            />
          )}
        </AnimatePresence>

        {cur.caption && (
          <div className="carousel-caption" style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '20px 22px',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,.65))',
            color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: '-.005em',
            pointerEvents: 'none',
          }}>{cur.caption}</div>
        )}

        {n > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous slide" className="carousel-arrow carousel-prev"
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', ...arrowStyle }}>
              ‹
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next slide" className="carousel-arrow carousel-next"
              style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', ...arrowStyle }}>
              ›
            </button>

            <div className="carousel-dots" style={{
              position: 'absolute', left: 0, right: 0, bottom: 14,
              display: 'flex', justifyContent: 'center', gap: 6, pointerEvents: 'none',
            }}>
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); goto(i); }}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === index ? 22 : 7, height: 7, borderRadius: 7,
                    background: i === index ? '#fff' : 'rgba(255,255,255,.55)',
                    border: 'none', padding: 0, transition: 'all .3s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,.35)',
                    pointerEvents: 'auto', cursor: 'pointer',
                  }}
                />
              ))}
            </div>

            {/* Hint affordance — tells users the image is clickable */}
            <div className="carousel-zoom-hint" style={{
              position: 'absolute', top: 14, right: 14,
              padding: '6px 10px',
              borderRadius: 999,
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              backdropFilter: 'blur(8px)',
            }}>Click to zoom</div>
          </>
        )}
      </div>

      {showThumbs && n > 1 && (
        <div className="carousel-thumbs" style={{
          marginTop: 12, display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'thin',
        }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Show slide ${i + 1}`}
              style={{
                flexShrink: 0, width: 84, height: 84,
                border: i === index ? '2px solid var(--warm, #b08a3e)' : '2px solid transparent',
                borderRadius: 10, background: '#f4f6fb', overflow: 'hidden',
                padding: 0, cursor: 'pointer', transition: 'border-color .2s ease',
              }}
            >
              <img src={img.src} alt={img.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox overlay */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="lightbox-backdrop"
            onClick={() => setZoomed(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setZoomed(false); }} aria-label="Close zoom">✕</button>
            {n > 1 && (
              <>
                <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
                <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
              </>
            )}
            {cur.video ? (
              <motion.video
                key={index}
                src={cur.video}
                autoPlay
                loop
                controls
                playsInline
                className="lightbox-img"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <motion.img
                key={index}
                src={cur.src}
                alt={cur.alt || ''}
                className="lightbox-img"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            {cur.caption && <div className="lightbox-caption">{cur.caption}</div>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const arrowStyle = {
  width: 44, height: 44, borderRadius: '50%',
  background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(6px)',
  border: '1px solid rgba(255,255,255,.7)',
  fontSize: 26, lineHeight: 1, color: '#0a1322', fontWeight: 700,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 6px 16px rgba(0,0,0,.18)',
  transition: 'transform .2s ease, background .2s ease',
};
