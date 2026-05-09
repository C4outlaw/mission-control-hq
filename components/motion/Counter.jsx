'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

/**
 * Animated number counter that runs once when scrolled into view.
 * Accepts strings like "50+", "3X", "100%" — preserves the suffix/prefix.
 */
export default function Counter({ value, duration = 1.4, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : startingValue(value));

  useEffect(() => {
    if (!inView || reduce) return;
    const target = parseTarget(value);
    if (target == null) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(target.num * eased);
      setDisplay(`${target.prefix}${current}${target.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  return (
    <motion.span ref={ref} className={className} style={style} aria-label={String(value)}>
      {display}
    </motion.span>
  );
}

function parseTarget(v) {
  if (typeof v !== 'string') v = String(v);
  const m = v.match(/^(\D*)(\d+)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] };
}
function startingValue(v) {
  const t = parseTarget(v);
  if (!t) return v;
  return `${t.prefix}0${t.suffix}`;
}
