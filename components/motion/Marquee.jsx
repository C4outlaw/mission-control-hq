'use client';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Infinite horizontal marquee. Pass children twice (or use repeat).
 */
export default function Marquee({ children, duration = 30, gap = 24, className, style }) {
  const reduce = useReducedMotion();
  const content = (
    <div style={{ display: 'flex', gap, paddingRight: gap, flexShrink: 0 }}>{children}</div>
  );
  if (reduce) {
    return <div className={className} style={{ overflow: 'hidden', ...style }}>{content}</div>;
  }
  return (
    <div className={className} style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)', ...style }}>
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}
