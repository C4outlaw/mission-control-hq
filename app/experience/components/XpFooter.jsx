"use client";

import { motion } from "motion/react";
import { Display, Drift } from "./shared";

const navLinkStyle = {
  fontFamily: '"Mouse Memoirs", sans-serif',
  textTransform: "uppercase",
  fontSize: "clamp(15px,1.2vw,22px)",
  color: "var(--xp-ink)",
  textDecoration: "none",
};

export default function XpFooter() {
  return (
    <footer
      className="xp-bg-beige"
      style={{ position: "relative", padding: "6vw 2.5vw 0", overflow: "hidden" }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2vw",
          borderBottom: "1px solid rgba(27,27,27,.25)",
          paddingBottom: "1.5vw",
        }}
      >
        <nav style={{ display: "flex", gap: "2vw" }}>
          <a href="/" style={navLinkStyle}>
            Home
          </a>
          <a href="/projects" style={navLinkStyle}>
            Work
          </a>
          <a href="/about" style={navLinkStyle}>
            About
          </a>
          <a href="/experience" style={navLinkStyle}>
            Experience
          </a>
        </nav>
        <span style={navLinkStyle}>© 2026 MyrieHQ — All rights reserved</span>
      </div>

      {/* Tagline row */}
      <div style={{ paddingTop: "1.5vw" }}>
        <span
          style={{
            fontFamily: '"Mouse Memoirs", sans-serif',
            textTransform: "uppercase",
            fontSize: "clamp(14px,1.1vw,20px)",
            letterSpacing: ".06em",
            color: "var(--xp-ink)",
          }}
        >
          Websites · Brands · Content — Ormond Beach, FL
        </span>
      </div>

      {/* Floating accents */}
      <Drift
        from={60}
        to={-60}
        style={{
          position: "absolute",
          left: "12vw",
          top: "30%",
          fontSize: "2.5vw",
          color: "var(--xp-gold)",
        }}
      >
        ✦
      </Drift>
      <Drift
        from={30}
        to={-90}
        style={{
          position: "absolute",
          right: "10vw",
          top: "25%",
          fontSize: "2.2vw",
        }}
      >
        💛
      </Drift>

      {/* Giant logotype peeking from the bottom */}
      <div
        style={{
          marginTop: "3vw",
          height: "clamp(120px,24vw,400px)",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ y: "40%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Display
            as="p"
            className="xp-modak"
            size="clamp(160px,32vw,560px)"
            color="var(--xp-red)"
            stroke="#fff"
            strokeWidth="1vw"
            lineHeight={0.9}
            style={{ transform: "translateY(12%)" }}
          >
            MYRIE
          </Display>
        </motion.div>
      </div>
    </footer>
  );
}
