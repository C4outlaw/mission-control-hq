'use client';
import { useEffect, useRef } from 'react';

/**
 * Premium full-page waterfall — slow elegant water trails dripping down the
 * entire viewport like glass tears. Pure canvas, GPU-friendly, fixed-position
 * so it covers the whole page as the user scrolls.
 *
 * Each drop:
 *  - has a long elongating trail behind it
 *  - varies in size + speed (depth parallax)
 *  - has a refractive bright tip that catches "light"
 *  - slows briefly mid-fall (gravity feel) and then settles + fades
 *
 * The brand "MYRIE HQ" mark in the upper-left is positioned ABOVE this canvas
 * (z-index higher) so the water visually originates from the masthead.
 *
 * Auto-disabled on touch + reduced-motion.
 */
export default function Waterfall({
  density = 1,
  opacity = 0.55,
  topOriginPct = 8,   // % from top where most drops spawn — under the logo area
  blendMode = 'screen',
  fixed = true,        // true = full-page sticky; false = bound to a parent section
  className,
  style,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId, w, h;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const drops = [];
    const baseNUM = Math.floor((reduce ? 0 : (isTouch ? 36 : 70)) * density);
    let NUM = baseNUM;
    let burstUntil = 0;     // timestamp until which we cascade hard
    let burstScale = 1;     // multiplier for drop count + speed

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.floor(r.width);
      h = Math.floor(r.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function makeDrop(initialSpread) {
      const depth = Math.random();
      const fromLogo = Math.random() < 0.55;  // bias drops toward upper-left where the logo is
      return {
        x: fromLogo
          ? (10 + Math.random() * 35) * (w / 100)
          : Math.random() * w,
        y: initialSpread
          ? Math.random() * h
          : -(40 + Math.random() * 200) - (topOriginPct * h / 100),
        len: 30 + depth * 140,
        width: 0.7 + depth * 1.6,
        speed: 0.9 + depth * 2.4,
        alpha: 0.10 + depth * 0.34,
        wobble: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
      };
    }

    for (let i = 0; i < NUM; i++) drops.push(makeDrop(true));

    // Cascade-burst event (kept for any caller that wants a downpour)
    const onBurst = (e) => {
      const dur = (e?.detail?.duration ?? 6000);
      burstUntil = performance.now() + dur;
      burstScale = e?.detail?.scale ?? 4;
      const target = baseNUM * burstScale;
      while (drops.length < target) drops.push(makeDrop(true));
    };
    window.addEventListener('waterfall:cascade', onBurst);

    // Toggle event — pauses/resumes the entire waterfall
    let paused = false;
    const onToggle = (e) => {
      paused = !!e?.detail?.paused;
      if (paused) {
        ctx.clearRect(0, 0, w, h);   // wipe canvas immediately
      }
    };
    window.addEventListener('waterfall:toggle', onToggle);

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;

      if (paused) {
        // Skip rendering and physics — keep the rAF loop alive so resume is instant
        rafId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Decay burst over time — extra drops drain off after the window expires
      if (now > burstUntil && drops.length > baseNUM) {
        drops.pop();
      }

      for (const d of drops) {
        // Subtle horizontal wobble for natural flow
        const xWob = Math.sin((d.y + d.phase * 100) * 0.012) * d.wobble * 4;
        const x = d.x + xWob;

        // Streak — vertical trail that elongates as drop falls
        const lin = ctx.createLinearGradient(x, d.y, x, d.y + d.len);
        lin.addColorStop(0, 'rgba(255,255,255,0)');
        lin.addColorStop(0.5, `rgba(255,255,255,${d.alpha * 0.85})`);
        lin.addColorStop(1, `rgba(195,225,245,${d.alpha})`);
        ctx.strokeStyle = lin;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, d.y);
        ctx.lineTo(x, d.y + d.len);
        ctx.stroke();

        // Bright tip — the leading water pearl, with a small white core highlight
        ctx.beginPath();
        ctx.arc(x, d.y + d.len, d.width * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,240,255,${d.alpha * 1.3})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - d.width * 0.5, d.y + d.len - d.width * 0.4, d.width * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.alpha * 1.6})`;
        ctx.fill();

        // Physics — gravity acceleration, capped speed
        d.speed = Math.min(4.8, d.speed + 0.012 * (dt / 16));
        d.y += d.speed * (dt / 16);
        if (d.y - d.len > h) {
          // Recycle from above (mostly from logo origin)
          const fresh = makeDrop(false);
          d.x = fresh.x; d.y = fresh.y; d.len = fresh.len;
          d.width = fresh.width; d.speed = fresh.speed; d.alpha = fresh.alpha;
          d.wobble = fresh.wobble; d.phase = fresh.phase;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    if (!reduce) rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('waterfall:cascade', onBurst);
      window.removeEventListener('waterfall:toggle', onToggle);
    };
  }, [density, topOriginPct]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity,
        mixBlendMode: blendMode,
        zIndex: 1,
        ...style,
      }}
    />
  );
}
