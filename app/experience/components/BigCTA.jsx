"use client";

import { Display, Sticker, Wave, Reveal, Drift } from "./shared";

export default function BigCTA() {
  return (
    <section
      id="xp-cta"
      className="xp-section xp-bg-beige"
      style={{ position: "relative", padding: "16vw 2.5vw 8vw", zIndex: 4 }}
    >
      <Wave fill="var(--xp-beige)" variant="c" position="top" />

      <div
        style={{
          display: "flex",
          gap: "4vw",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <Reveal>
            <Sticker color="var(--xp-red)" rotate={-8} size="clamp(20px,2.2vw,40px)">
              FEEL IT
            </Sticker>
          </Reveal>
          <Reveal delay={0.1}>
            <Display size="clamp(70px,13vw,220px)" color="var(--xp-red)" stroke="#fff">
              READY
              <br />
              TO GROW
            </Display>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="xp-copy" style={{ maxWidth: "38ch", marginTop: "2vw" }}>
              Built for owners who want their brand to punch above its weight.
              Bring the vision — we&apos;ll bring the heat.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              className="xp-pill"
              href="/#contact"
              style={{ display: "inline-block", marginTop: "2.5vw" }}
            >
              Start a project
            </a>
          </Reveal>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, minWidth: 300, position: "relative" }}>
          <Reveal y={90}>
            <div
              className="xp-card"
              style={{
                width: "100%",
                maxWidth: "34vw",
                minWidth: 280,
                height: "clamp(300px,30vw,540px)",
                transform: "rotate(3deg)",
                marginLeft: "auto",
              }}
            >
              <img src="/images/myrie-headshot.jpg" alt="Myrie — founder of MyrieHQ" />
            </div>
          </Reveal>
          <Drift
            from={40}
            to={-40}
            rotate={-10}
            style={{
              position: "absolute",
              left: "-2vw",
              bottom: "-2vw",
              fontSize: "clamp(50px,6vw,110px)",
              zIndex: 2,
              filter: "drop-shadow(0.2vw 0.35vw 0 rgba(27,27,27,.25))",
            }}
          >
            🚀
          </Drift>
        </div>
      </div>
    </section>
  );
}
