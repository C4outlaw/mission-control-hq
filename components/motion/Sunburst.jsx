'use client';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Tropical sunburst SVG — slow rotating rays behind a section.
 * Drop into any section for warm, alive background energy.
 */
export default function Sunburst({ size = 640, top = 'auto', bottom = 'auto', left = 'auto', right = 'auto', opacity = .35, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      viewBox="0 0 200 200"
      style={{ position: 'absolute', width: size, height: size, top, bottom, left, right, opacity, pointerEvents: 'none', mixBlendMode: 'screen' }}
      animate={reduce ? {} : { rotate: 360 }}
      transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
      aria-hidden
    >
      <defs>
        <radialGradient id="sun-c" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7e6" />
          <stop offset="50%" stopColor="#f5c44a" />
          <stop offset="100%" stopColor="rgba(245,196,74,0)" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="34" fill="url(#sun-c)" />
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i * 360) / 20;
        return (
          <rect
            key={i}
            x="98" y="20"
            width="4" height="36"
            rx="2"
            fill="#f5c44a"
            opacity={i % 2 ? 0.65 : 0.95}
            transform={`rotate(${angle} 100 100)`}
          />
        );
      })}
    </motion.svg>
  );
}
