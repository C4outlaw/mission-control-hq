'use client';
import { useEffect, useRef } from 'react';

/**
 * Tropical water-splash particle trail that follows the cursor.
 * Auto-disabled on touch/reduced-motion.
 *
 * Each move emits 1-3 drop particles that splash outward + fall.
 * Pure canvas, GPU-friendly, no React re-renders.
 */
export default function WaterTrail() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const lastEmit = useRef(0);
  const dpr = useRef(1);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    dpr.current = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      canvas.width = window.innerWidth * dpr.current;
      canvas.height = window.innerHeight * dpr.current;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr.current, dpr.current);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const now = performance.now();
      if (now - lastEmit.current < 18) return;
      lastEmit.current = now;
      const burst = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < burst; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 2.6,
          vy: -Math.random() * 2.2 - 0.5,
          life: 0,
          ttl: 700 + Math.random() * 500,
          size: 2 + Math.random() * 4,
          hue: 188 + Math.random() * 22, // cyan/teal range
        });
      }
      // Cap particles to keep frame budget tight
      if (particlesRef.current.length > 140) {
        particlesRef.current.splice(0, particlesRef.current.length - 140);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let last = performance.now();
    let raf;
    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.life += dt;
        if (p.life > p.ttl) { ps.splice(i, 1); continue; }
        // Physics
        p.vy += 0.06 * (dt / 16); // gravity
        p.vx *= 0.985;
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        const t = p.life / p.ttl;
        const alpha = 1 - t;
        // Blue water drop with highlight
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha * 0.7})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${alpha * 0.6})`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        // Tiny white highlight dot
        ctx.beginPath();
        ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.85})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 98,
        mixBlendMode: 'screen',
      }}
      aria-hidden
    />
  );
}
