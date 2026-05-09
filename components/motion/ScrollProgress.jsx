'use client';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Top-of-page progress bar that fills as the user scrolls.
 * Drop into root layout once. Premium-agency staple.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.5 });
  return (
    <motion.div
      style={{
        scaleX: sx,
        transformOrigin: '0% 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        opacity: 0.85,
        background: 'linear-gradient(90deg, #b08a3e 0%, #c89e51 50%, #b08a3e 100%)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    />
  );
}
