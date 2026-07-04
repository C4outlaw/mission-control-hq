"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/* Smooth scroll for the whole experience route */
export function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return children;
}

/* Giant display type with an outside stroke (stroked clone behind, clean fill on top) */
export function Display({
  as: Tag = "h2",
  size = "15vw",
  color = "var(--xp-red)",
  stroke = "#fff",
  strokeWidth = "0.85vw",
  lineHeight,
  className = "",
  style = {},
  children,
}) {
  return (
    <Tag
      className={`xp-display ${className}`}
      style={{ fontSize: size, color, lineHeight, ...style }}
    >
      <span
        aria-hidden="true"
        className="xp-display-stroke"
        style={{ WebkitTextStroke: `${strokeWidth} ${stroke}` }}
      >
        {children}
      </span>
      <span className="xp-display-fill">{children}</span>
    </Tag>
  );
}

/* Rotated sticker word with outside stroke */
export function Sticker({
  children,
  color = "var(--xp-red)",
  stroke = "#fff",
  strokeWidth = "0.45vw",
  size = "clamp(20px, 2.2vw, 40px)",
  rotate = -8,
  className = "",
  style = {},
}) {
  return (
    <span
      className={`xp-sticker ${className}`}
      style={{ fontSize: size, color, transform: `rotate(${rotate}deg)`, ...style }}
    >
      <span style={{ position: "relative", display: "inline-block" }}>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            color: "transparent",
            WebkitTextStroke: `${strokeWidth} ${stroke}`,
          }}
        >
          {children}
        </span>
        <span style={{ position: "relative" }}>{children}</span>
      </span>
    </span>
  );
}

/* Wavy section divider. fill = the color of the section this wave belongs to. */
const WAVE_PATHS = {
  a: "M0,300 L0,150 C130,70 330,210 500,145 C680,75 850,200 1030,135 C1210,72 1400,185 1536,120 L1536,300 Z",
  b: "M0,300 L0,120 C180,200 360,60 560,150 C760,235 930,90 1130,160 C1300,215 1440,110 1536,150 L1536,300 Z",
  c: "M0,300 L0,170 C150,100 300,220 470,160 C650,95 820,215 1010,150 C1190,90 1380,200 1536,140 L1536,300 Z",
};
export function Wave({ fill = "var(--xp-beige)", variant = "a", position = "top", flip = false }) {
  return (
    <div className={`xp-wave ${position === "top" ? "xp-wave-top" : "xp-wave-bottom"}`}>
      <svg
        viewBox="0 0 1536 300"
        preserveAspectRatio="none"
        style={{ transform: flip ? "scaleY(-1)" : undefined }}
      >
        <path d={WAVE_PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}

/* Scroll-into-view reveal */
export function Reveal({ children, delay = 0, y = 60, className = "", style = {}, once = true }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Element that drifts vertically at its own rate while scrolling (parallax) */
export function Drift({ children, from = 80, to = -80, rotate = 0, className = "", style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [from, to]);
  const smooth = useSpring(y, { stiffness: 60, damping: 18 });
  return (
    <motion.div ref={ref} className={className} style={{ y: smooth, rotate, ...style }}>
      {children}
    </motion.div>
  );
}
