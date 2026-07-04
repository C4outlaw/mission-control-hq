"use client";

import { Display, Sticker, Wave, Reveal, Drift } from "./shared";

const CHIPS = [
  { emoji: "💻", label: "WEB", pos: { left: "8vw", top: "18%" }, from: 120, to: -60, rotate: -12 },
  { emoji: "🎨", label: "BRAND", pos: { right: "10vw", top: "14%" }, from: 60, to: -140, rotate: 9 },
  { emoji: "📸", label: "PHOTO", pos: { left: "14vw", top: "62%" }, from: 90, to: -90, rotate: -7 },
  { emoji: "📣", label: "SOCIAL", pos: { right: "16vw", top: "58%" }, from: 140, to: -40, rotate: 12 },
  { emoji: "⚡", label: "SPEED", pos: { left: "47vw", top: "80%" }, from: 70, to: -120, rotate: -5 },
];

function FloatChip({ emoji, label, pos, from, to, rotate }) {
  return (
    <div
      className="xp-float-chip"
      style={{ position: "absolute", zIndex: 2, ...pos }}
    >
      <Drift from={from} to={to} rotate={rotate}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "clamp(34px,4.5vw,80px)", lineHeight: 1 }}>{emoji}</div>
          <span
            style={{
              fontFamily: "'Mouse Memoirs', sans-serif",
              textTransform: "uppercase",
              background: "#fff",
              color: "var(--xp-red)",
              borderRadius: 999,
              padding: ".25em .9em",
              fontSize: "clamp(12px,1vw,18px)",
              boxShadow: "0 .3vw .8vw rgba(27,27,27,.18)",
              display: "inline-block",
              marginTop: ".4em",
            }}
          >
            {label}
          </span>
        </div>
      </Drift>
    </div>
  );
}

export default function StackedSection() {
  return (
    <section
      className="xp-section xp-bg-beige"
      style={{
        position: "relative",
        padding: "14vw 2.5vw 10vw",
        textAlign: "center",
        zIndex: 4,
      }}
    >
      <Wave fill="var(--xp-beige)" variant="a" position="top" />

      <style>{`@media(max-width:768px){.xp-float-chip{display:none}}`}</style>

      {CHIPS.map((chip) => (
        <FloatChip key={chip.label} {...chip} />
      ))}

      <Reveal>
        <Sticker color="var(--xp-red)" rotate={-7} size="clamp(22px,2.4vw,42px)">
          PURE QUALITY
        </Sticker>
      </Reveal>

      <Reveal delay={0.1}>
        <Display size="clamp(64px,14vw,230px)" color="var(--xp-red)" stroke="#fff">
          STACKED WITH
          <br />
          EVERYTHING
          <br />
          YOU NEED
        </Display>
      </Reveal>

      <Reveal delay={0.25}>
        <p
          className="xp-copy"
          style={{ maxWidth: "44ch", margin: "2.5vw auto 0" }}
        >
          Design, build, photograph, post — every layer handled by one kitchen.
        </p>
      </Reveal>
    </section>
  );
}
