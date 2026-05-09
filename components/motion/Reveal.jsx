'use client';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Fade-in + slide-up reveal as the element enters the viewport.
 * Default: 16px slide, 0.6s, easeOut, fires once.
 * Pass `delay` for staggered manual sequences.
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  y = 16,
  x = 0,
  duration = 0.6,
  delay = 0,
  amount = 0.2,
  className,
  style,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
