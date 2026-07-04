"use client";

import { motion } from "motion/react";
import { Display, Sticker } from "./shared";

const heroMediaCss = `@media (max-width:768px){ .xp-hero-side{display:none} }`;

export default function Hero() {
  return (
    <section
      className="xp-section xp-bg-beige"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "7vw",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: heroMediaCss }} />

      {/* Top nav */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          padding: "2vw 2.5vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
        }}
      >
        <span
          className="xp-modak"
          style={{
            color: "var(--xp-red)",
            fontSize: "clamp(22px,2vw,36px)",
          }}
        >
          MYRIEHQ
        </span>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.6vw",
            fontFamily: "var(--font-mouse)",
            textTransform: "uppercase",
          }}
        >
          <a
            href="/projects"
            style={{
              color: "var(--xp-ink)",
              textDecoration: "none",
              fontSize: "clamp(16px,1.4vw,24px)",
            }}
          >
            Work
          </a>
          <a
            href="#xp-cta"
            style={{
              background: "var(--xp-red)",
              color: "var(--xp-beige)",
              textDecoration: "none",
              borderRadius: 999,
              padding: ".5em 1.4em",
              border: "2px solid #fff",
              fontSize: "clamp(15px,1.3vw,22px)",
            }}
          >
            Start
          </a>
        </nav>
      </div>

      {/* Center stack */}
      <div style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Display
            as="h1"
            size="clamp(90px,26vw,420px)"
            color="var(--xp-red)"
            stroke="#fff"
            strokeWidth="1vw"
            style={{ textAlign: "center" }}
          >
            BOLD
            <br />
            BRANDS
          </Display>
        </motion.div>

        {/* Stickers */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.7 }}
          style={{ position: "absolute", top: "-2vw", left: "8vw", zIndex: 25 }}
        >
          <Sticker color="var(--xp-gold)" rotate={-10}>
            BUILT FRESH
          </Sticker>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.9 }}
          style={{ position: "absolute", top: "30%", right: "6vw", zIndex: 25 }}
        >
          <Sticker color="var(--xp-red)" rotate={7}>
            REAL RESULTS
          </Sticker>
        </motion.div>

        {/* Fanned card stack centerpiece */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "58%",
            transform: "translate(-50%,-55%)",
            zIndex: 20,
            width: "34vw",
            height: "18vw",
          }}
        >
        <motion.div
          initial={{ y: -350, opacity: 0, scale: 0.7 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.35 }}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <div
            className="xp-card"
            style={{
              position: "absolute",
              width: "60%",
              left: 0,
              top: "1vw",
              transform: "rotate(-8deg)",
              zIndex: 1,
            }}
          >
            <img
              src="/assets/work/beach-bucket/website-shot.jpg"
              alt="Beach Bucket website by MyrieHQ"
              style={{ height: "16vw" }}
            />
          </div>
          <div
            className="xp-card"
            style={{
              position: "absolute",
              width: "60%",
              left: "20%",
              top: 0,
              transform: "rotate(3deg)",
              zIndex: 2,
            }}
          >
            <img
              src="/assets/work/beach-bucket/food.jpg"
              alt="Food photography for Beach Bucket by MyrieHQ"
              style={{ height: "16vw" }}
            />
          </div>
          <div
            className="xp-card"
            style={{
              position: "absolute",
              width: "60%",
              right: 0,
              top: "1.5vw",
              transform: "rotate(10deg)",
              zIndex: 3,
            }}
          >
            <img
              src="/assets/work/beach-bucket/bar.jpg"
              alt="Beach Bucket bar photographed by MyrieHQ"
              style={{ height: "16vw" }}
            />
          </div>
        </motion.div>
        </div>

        {/* Modak logotype */}
        <Display
          className="xp-modak"
          size="clamp(70px,15vw,240px)"
          color="var(--xp-red)"
          stroke="#fff"
          strokeWidth="0.9vw"
          lineHeight={1}
          style={{
            marginTop: "9vw",
            textAlign: "center",
            position: "relative",
            zIndex: 20,
          }}
        >
          MYRIE
        </Display>
      </div>

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "2vw 2.5vw",
          gap: "2vw",
          flexWrap: "wrap",
        }}
      >
        <p
          className="xp-copy xp-hero-side"
          style={{ maxWidth: "22vw", minWidth: 240 }}
        >
          Websites, brand design, and daily content — smashed together fresh
          for small businesses that want to look big.
        </p>
        <a className="xp-pill" href="#xp-cta">
          Start a project
        </a>
        <p
          className="xp-copy xp-hero-side"
          style={{ maxWidth: "22vw", minWidth: 240, textAlign: "right" }}
        >
          Serving Ormond Beach, Daytona, Orlando — and everywhere the internet
          reaches.
        </p>
      </motion.div>
    </section>
  );
}
