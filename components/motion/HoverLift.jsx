'use client';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Card hover-lift with spring physics. Drop-in for any card-like article.
 */
export default function HoverLift({ as: Tag = 'div', children, lift = 6, scale = 1.012, className, style, ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      whileHover={reduce ? {} : { y: -lift, scale }}
      transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.7 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
