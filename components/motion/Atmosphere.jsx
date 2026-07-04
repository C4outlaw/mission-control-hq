'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Site atmosphere: a fixed film-grain overlay plus a cursor-following warm
 * gold glow that lights the dark canvas like a gallery spotlight.
 * Pure transform/opacity — no layout work. Disabled on touch + reduced-motion
 * (grain stays; it's static).
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

export default function Atmosphere() {
  const glowRef = useRef(null);
  const [glowOn, setGlowOn] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduce) return;
    setGlowOn(true);
  }, []);

  useEffect(() => {
    if (!glowOn) return;
    let raf = 0;
    let tx = -600, ty = -600;
    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const el = glowRef.current;
          if (el) el.style.transform = `translate3d(${tx - 300}px, ${ty - 300}px, 0)`;
        });
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, [glowOn]);

  return (
    <>
      {glowOn && (
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 600,
            height: 600,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translate3d(-600px,-600px,0)',
            background: 'radial-gradient(circle, rgba(176,138,62,0.07) 0%, rgba(176,138,62,0.03) 35%, transparent 70%)',
            mixBlendMode: 'screen',
            willChange: 'transform',
          }}
        />
      )}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          backgroundImage: `url("${NOISE}")`,
          backgroundRepeat: 'repeat',
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />
    </>
  );
}
