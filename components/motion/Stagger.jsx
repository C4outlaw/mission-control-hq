'use client';
import { motion, useReducedMotion } from 'motion/react';

const containerVariants = (stagger) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

const itemVariants = (y) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
});

/**
 * Wrap a group whose children should stagger-fade-in on scroll.
 * Use <StaggerItem> for each child.
 */
export function Stagger({ children, stagger = 0.08, amount = 0.2, className, style, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ as: Tag = 'div', children, y = 18, className, style, ...rest }) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag className={className} style={style} variants={itemVariants(y)} {...rest}>
      {children}
    </MotionTag>
  );
}
