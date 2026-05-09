'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/**
 * Element-scoped parallax. `speed` ranges roughly -1 to 1; positive = element
 * moves slower than scroll (drifts up), negative = faster (drifts down).
 */
export default function Parallax({ children, speed = 0.25, className, style, ...rest }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const reduce = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed * 80, -speed * 80]);
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className} {...rest}>
      {children}
    </motion.div>
  );
}
