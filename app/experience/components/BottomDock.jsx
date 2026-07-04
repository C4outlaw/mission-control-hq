"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";

/* Floating pill dock — slides up after the hero is scrolled past. */
export default function BottomDock() {
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [400, 750], [140, 0]);
  const y = useSpring(raw, { stiffness: 120, damping: 20 });

  return (
    <motion.nav className="xp-dock" style={{ y, x: "-50%" }}>
      <a href="/">Home</a>
      <a href="/projects">Work</a>
      <a href="/about">About</a>
      <a href="#xp-cta" className="xp-dock-cta">
        Start a project
      </a>
    </motion.nav>
  );
}
