'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Subtle ring cursor for desktop (auto-disabled on touch devices and reduced-motion).
 * Scales up over interactive elements (a, button, [data-cursor=hover]).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    const onMove = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const onOver = (e) => {
      const t = e.target;
      const isInteractive = t.closest && (t.closest('a, button, [data-cursor="hover"], input, textarea, select'));
      setHovering(!!isInteractive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{
          x: sx, y: sy,
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          borderRadius: '50%',
          border: hovering ? '1.5px solid rgba(10,99,255,.7)' : '1.5px solid rgba(15,23,42,.45)',
          position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none', zIndex: 99,
          mixBlendMode: 'difference',
          transition: 'width .25s ease, height .25s ease, border-color .25s ease',
        }}
      />
      <motion.div
        style={{
          x, y,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#0a63ff',
          position: 'fixed', top: 0, left: 0, translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none', zIndex: 99,
        }}
      />
    </>
  );
}
