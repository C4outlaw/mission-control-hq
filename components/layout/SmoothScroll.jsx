'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Premium smooth-scroll wrapper using Lenis (Studio Freight).
 * Mount once in layout.js. Respects prefers-reduced-motion + touch devices.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // Skip on reduced-motion. On touch we let the OS handle native momentum.
    if (reduce || isTouch) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // expoOut
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.6,
      lerp: 0.08,
    });

    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
