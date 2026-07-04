"use client";

import { Display, Reveal, Drift } from "./shared";

export default function AboutSection() {
  return (
    <section
      id="xp-about"
      className="xp-section xp-bg-beige"
      style={{
        textAlign: "center",
        padding: "10vw 2.5vw 6vw",
        position: "relative",
        overflow: "visible",
      }}
    >
      <Reveal>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mouse)",
            textTransform: "uppercase",
            background: "var(--xp-gold)",
            color: "var(--xp-ink)",
            borderRadius: 999,
            padding: ".5em 1.6em",
            border: "3px solid #fff",
            transform: "rotate(-3deg)",
            fontSize: "clamp(15px,1.3vw,24px)",
          }}
        >
          FULL SERVICE
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <Display size="clamp(64px,15vw,240px)" color="var(--xp-red)" stroke="#fff">
          STRATEGY
          <br />
          DESIGN
          <br />
          FULLY LOADED
        </Display>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="xp-copy" style={{ maxWidth: "46ch", margin: "2vw auto 0" }}>
          MyrieHQ is the back-of-house for your brand. One team for the
          website, the photos, the menus, and the posts — hot, fresh, and
          shipped every week.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <a
          className="xp-pill"
          href="/projects"
          style={{ marginTop: "3vw", display: "inline-block" }}
        >
          See the work
        </a>
      </Reveal>

      {/* Photo row */}
      <div
        style={{
          marginTop: "6vw",
          display: "flex",
          justifyContent: "center",
          gap: "3vw",
          flexWrap: "wrap",
        }}
      >
        <Reveal delay={0.1} y={90}>
          <div
            className="xp-card"
            style={{
              width: "clamp(240px,26vw,460px)",
              height: "clamp(180px,19vw,340px)",
              transform: "rotate(-6deg)",
            }}
          >
            <img
              src="/assets/work/beach-bucket/exterior.jpg"
              alt="Beach Bucket restaurant exterior"
            />
          </div>
        </Reveal>
        <Reveal delay={0.25} y={90}>
          <div
            className="xp-card"
            style={{
              width: "clamp(240px,26vw,460px)",
              height: "clamp(180px,19vw,340px)",
              transform: "rotate(3deg) translateY(2vw)",
            }}
          >
            <img
              src="/assets/work/beach-bucket/food.jpg"
              alt="Food photography by MyrieHQ"
            />
          </div>
        </Reveal>
        <Reveal delay={0.4} y={90}>
          <div
            className="xp-card"
            style={{
              width: "clamp(240px,26vw,460px)",
              height: "clamp(180px,19vw,340px)",
              transform: "rotate(8deg)",
            }}
          >
            <img
              src="/assets/work/beach-bucket/deck-sunrise.jpg"
              alt="Deck at sunrise"
            />
          </div>
        </Reveal>
      </div>

      {/* Drifting accents */}
      <Drift
        from={60}
        to={-60}
        rotate={-8}
        style={{ position: "absolute", left: "4vw", top: "38%", fontSize: "3vw" }}
      >
        💡
      </Drift>
      <Drift
        from={90}
        to={-40}
        rotate={10}
        style={{ position: "absolute", right: "5vw", top: "55%", fontSize: "3.4vw" }}
      >
        ✨
      </Drift>
    </section>
  );
}
