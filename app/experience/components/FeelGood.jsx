"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Display, Sticker, Wave, Reveal, Drift } from "./shared";

const LEFT_STATS = ["7-DAY BUILDS", "HIGH IMPACT", "FRESH DESIGN"];
const RIGHT_STATS = ["100% CUSTOM", "ZERO TEMPLATES", "TRUE RESULTS"];

const statLineStyle = {
  fontFamily: "'Mouse Memoirs', sans-serif",
  textTransform: "uppercase",
  fontSize: "clamp(18px,1.8vw,32px)",
  lineHeight: 1.15,
  color: "var(--xp-beige)",
};

function Eye({ left, top, pupil }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: "4.5vw",
        height: "5.5vw",
        borderRadius: "50%",
        border: "0.3vw solid #1b1b1b",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={pupil}
        style={{
          width: "1.8vw",
          height: "1.8vw",
          borderRadius: "50%",
          background: "#1b1b1b",
        }}
      />
    </div>
  );
}

export default function FeelGood() {
  const centerRef = useRef(null);
  const pupilA = useRef(null);
  const pupilB = useRef(null);

  const { scrollYProgress } = useScroll({
    target: centerRef,
    offset: ["start end", "center center"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.55, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], ["8vw", "0vw"]);
  const scale = useSpring(rawScale, { stiffness: 60, damping: 16 });
  const y = useSpring(rawY, { stiffness: 60, damping: 16 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const t = `translate(${nx * 35}%, ${ny * 35}%)`;
        if (pupilA.current) pupilA.current.style.transform = t;
        if (pupilB.current) pupilB.current.style.transform = t;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="xp-section xp-bg-red"
      style={{
        position: "relative",
        padding: "14vw 2.5vw 20vw",
        marginTop: "11vw",
        zIndex: 5,
      }}
    >
      <Wave fill="var(--xp-red)" variant="b" position="top" />

      <style>{`@media(max-width:768px){.xp-stats{position:static !important; transform:none !important; text-align:center !important; margin-top:6vw}}`}</style>

      <div style={{ textAlign: "center", color: "var(--xp-beige)", position: "relative" }}>
        <Reveal>
          <Sticker
            color="var(--xp-red)"
            stroke="var(--xp-beige)"
            strokeWidth="0.5vw"
            size="clamp(24px,2.6vw,46px)"
            rotate={-6}
          >
            EXPERIENCE
          </Sticker>
        </Reveal>

        <Reveal delay={0.1}>
          <Display
            size="clamp(70px,15vw,240px)"
            color="var(--xp-beige)"
            strokeWidth="0px"
          >
            WORK THAT
            <br />
            FEELS GOOD
          </Display>
        </Reveal>

        <Drift
          from={80}
          to={-80}
          rotate={-10}
          style={{ position: "absolute", left: "6vw", top: "20%", fontSize: "4vw" }}
        >
          💡
        </Drift>
        <Drift
          from={40}
          to={-110}
          rotate={12}
          style={{ position: "absolute", right: "7vw", top: "30%", fontSize: "3.5vw" }}
        >
          ✨
        </Drift>

        <div style={{ position: "relative" }}>
          <motion.div
            ref={centerRef}
            style={{ scale, y, position: "relative", display: "inline-block" }}
          >
            <div
              className="xp-modak"
              style={{
                fontSize: "clamp(160px,30vw,520px)",
                color: "var(--xp-gold)",
                WebkitTextStroke: "0.9vw #fff",
                lineHeight: 1,
              }}
            >
              M
            </div>
            <Eye left="34%" top="18%" pupil={pupilA} />
            <Eye left="56%" top="18%" pupil={pupilB} />
          </motion.div>

          <div
            className="xp-stats"
            style={{
              position: "absolute",
              left: "3vw",
              top: "50%",
              transform: "translateY(-50%)",
              textAlign: "left",
            }}
          >
            {LEFT_STATS.map((line, i) => (
              <motion.div
                key={line}
                initial={{ x: -90, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={statLineStyle}
              >
                {line}
              </motion.div>
            ))}
          </div>

          <div
            className="xp-stats"
            style={{
              position: "absolute",
              right: "3vw",
              top: "50%",
              transform: "translateY(-50%)",
              textAlign: "right",
            }}
          >
            {RIGHT_STATS.map((line, i) => (
              <motion.div
                key={line}
                initial={{ x: 90, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                style={statLineStyle}
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal>
          <Sticker
            color="var(--xp-gold)"
            stroke="#fff"
            rotate={5}
            size="clamp(22px,2.4vw,42px)"
          >
            BOLD MOVES
          </Sticker>
        </Reveal>
      </div>

      <Wave fill="var(--xp-red)" variant="c" position="bottom" />
    </section>
  );
}
