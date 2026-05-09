'use client';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Word-by-word reveal for headline-grade typography.
 * Splits on whitespace; each word is its own motion.span.
 */
export default function TextReveal({ as: Tag = 'h1', text, delay = 0, stagger = 0.05, className, style }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Static = Tag;
    return <Static className={className} style={style}>{text}</Static>;
  }
  const MotionTag = motion[Tag] || motion.h1;
  return (
    <MotionTag
      className={className}
      style={{ display: 'inline-block', ...style }}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {String(text).split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '105%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {w}{i < text.split(' ').length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
