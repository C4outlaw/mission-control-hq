'use client';
import { useEffect, useRef } from 'react';

/**
 * Dense, dramatic cascading-water canvas scoped to the hero section.
 *
 * Sits ABOVE the static cinematic PNG and BELOW the hero text/CTAs.
 * Each drop has a long trail + bright leading pearl. Water has color
 * variation (silver, cool-cyan tints, bright highlight tips) for the
 * "real waterfall" feel rather than uniform rain.
 *
 * Listens for `waterfall:cascade` event for the play-button burst.
 */
export default function HeroWaterfall({ density = 1, opacity = 0.85 }) {
  const ref = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = ref.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d');
    let raf, w = 0, h = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const baseN = Math.floor((isTouch ? 110 : 220) * density);
    let burstUntil = 0;
    let burstScale = 1;

    const drops = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function makeDrop(initial) {
      const depth = Math.random();
      // Bias 65% of drops to LEFT third of the hero (where the PNG waterfall sits)
      // 35% scattered across the rest for full-page motion when burst fires
      const leftBias = Math.random() < 0.65;
      const x = leftBias
        ? Math.random() * (w * 0.42)
        : (w * 0.42) + Math.random() * (w * 0.58);

      // Start above the visible canvas — staggered for initial spread
      const y = initial
        ? Math.random() * h
        : -(40 + Math.random() * 220);

      return {
        x,
        y,
        len: 36 + depth * 180,                  // longer trails feel cinematic
        width: 0.6 + depth * 1.8,               // depth parallax
        speed: 1.4 + depth * 3.2,               // faster than the global drift
        alpha: 0.18 + depth * 0.55,
        wobble: (Math.random() - 0.5) * 0.45,
        phase: Math.random() * Math.PI * 2,
        // Subtle color tint per drop for "real water" variety
        tint: leftBias && Math.random() < 0.35
          ? 'rgba(195,225,245,'   // cool cyan
          : 'rgba(245,250,255,',  // bright silver-white
      };
    }

    for (let i = 0; i < baseN; i++) drops.push(makeDrop(true));

    const onBurst = (e) => {
      const dur = e?.detail?.duration ?? 7000;
      burstUntil = performance.now() + dur;
      burstScale = e?.detail?.scale ?? 4;
      const target = baseN * burstScale;
      while (drops.length < target) drops.push(makeDrop(true));
    };
    window.addEventListener('waterfall:cascade', onBurst);

    let paused = false;
    const onToggle = (e) => {
      paused = !!e?.detail?.paused;
      if (paused) ctx.clearRect(0, 0, w, h);
    };
    window.addEventListener('waterfall:toggle', onToggle);

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(40, now - last);
      last = now;

      if (paused) {
        raf = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Drain extra drops after burst window expires
      if (now > burstUntil && drops.length > baseN) drops.pop();

      const speedBoost = now < burstUntil ? 1.5 : 1.0;

      for (const d of drops) {
        const xWob = Math.sin((d.y + d.phase * 100) * 0.012) * d.wobble * 4;
        const x = d.x + xWob;

        // Streak trail
        const lin = ctx.createLinearGradient(x, d.y, x, d.y + d.len);
        lin.addColorStop(0,   `${d.tint}0)`);
        lin.addColorStop(0.5, `${d.tint}${(d.alpha * 0.85).toFixed(3)})`);
        lin.addColorStop(1,   `${d.tint}${d.alpha.toFixed(3)})`);
        ctx.strokeStyle = lin;
        ctx.lineWidth = d.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, d.y);
        ctx.lineTo(x, d.y + d.len);
        ctx.stroke();

        // Leading pearl (bright tip)
        ctx.beginPath();
        ctx.arc(x, d.y + d.len, d.width * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = `${d.tint}${(d.alpha * 1.4).toFixed(3)})`;
        ctx.fill();

        // White core highlight on the pearl
        ctx.beginPath();
        ctx.arc(x - d.width * 0.5, d.y + d.len - d.width * 0.4, d.width * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(d.alpha * 1.7).toFixed(3)})`;
        ctx.fill();

        // Physics
        d.speed = Math.min(6.0, d.speed + 0.014 * (dt / 16));
        d.y += d.speed * speedBoost * (dt / 16);

        if (d.y - d.len > h) {
          const fresh = makeDrop(false);
          d.x = fresh.x; d.y = fresh.y; d.len = fresh.len;
          d.width = fresh.width; d.speed = fresh.speed; d.alpha = fresh.alpha;
          d.wobble = fresh.wobble; d.phase = fresh.phase; d.tint = fresh.tint;
        }
      }

      // Soft mist haze at the base — additive subtle white-blue fog
      const mist = ctx.createLinearGradient(0, h - 120, 0, h);
      mist.addColorStop(0, 'rgba(170,200,225,0)');
      mist.addColorStop(1, 'rgba(170,200,225,0.18)');
      ctx.fillStyle = mist;
      ctx.fillRect(0, h - 120, w, 120);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('waterfall:cascade', onBurst);
      window.removeEventListener('waterfall:toggle', onToggle);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'screen',
        zIndex: 1,
      }}
    />
  );
}
