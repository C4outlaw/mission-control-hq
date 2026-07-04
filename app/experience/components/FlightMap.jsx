"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";
import { Display, Sticker, Wave, Reveal } from "./shared";

const STOPS = [
  { img: "/assets/work/beach-bucket/lifestyle.jpg", label: "ORMOND BEACH", side: "left", tilt: -4, stickerRotate: -8 },
  { img: "/assets/work/beach-bucket/indoor-dining.jpg", label: "DAYTONA", side: "right", tilt: 3, stickerRotate: 8 },
  { img: "/assets/work/beach-bucket/sunset.jpg", label: "ORLANDO", side: "left", tilt: -3, stickerRotate: -8 },
  { img: "/assets/work/beach-bucket/morning.jpg", label: "MIAMI", side: "right", tilt: 5, stickerRotate: 8 },
  { img: "/assets/work/beach-bucket/breakfast.jpg", label: "TAMPA", side: "left", tilt: -5, stickerRotate: -8 },
];

export default function FlightMap() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    const update = (v) => {
      const path = pathRef.current;
      const svg = svgRef.current;
      const el = planeRef.current;
      if (!path || !svg || !el) return;
      const L = path.getTotalLength();
      const p = path.getPointAtLength(v * L);
      const p2 = path.getPointAtLength(Math.min(L, v * L + 2));
      const ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      const r = svg.getBoundingClientRect();
      const x = (p.x / 1440) * r.width;
      const y = (p.y / 2600) * r.height;
      el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${ang + 12}deg)`;
    };
    update(smoothProgress.get());
    const unsubscribe = smoothProgress.on("change", update);
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <section
      ref={sectionRef}
      className="xp-section xp-bg-mustard"
      style={{
        position: "relative",
        padding: "14vw 2.5vw 8vw",
        zIndex: 3,
        overflow: "hidden",
      }}
    >
      <Wave fill="var(--xp-mustard)" variant="b" position="top" />

      <style>{`@media(max-width:768px){.xp-map-flight{display:none}}`}</style>

      <svg
        ref={svgRef}
        className="xp-map-flight"
        viewBox="0 0 1440 2600"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <path
          ref={pathRef}
          d="M 180 300 C 700 380, 1350 520, 1180 850 C 1050 1110, 260 1000, 300 1350 C 340 1690, 1150 1560, 1150 1950 C 1150 2280, 500 2280, 380 2520"
          fill="none"
          stroke="#f4a804"
          strokeWidth={7}
          strokeDasharray="42 42"
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        ref={planeRef}
        className="xp-map-flight"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontSize: "clamp(34px,4vw,72px)",
          zIndex: 3,
          willChange: "transform",
        }}
      >
        ✈️
      </motion.div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "92vw" }}>
        <Reveal>
          <Sticker color="var(--xp-red)" rotate={-6} size="clamp(20px,2.2vw,40px)">
            TAKE IT ANYWHERE
          </Sticker>
        </Reveal>

        <Reveal delay={0.1}>
          <Display
            size="clamp(64px,14vw,230px)"
            color="#fff"
            stroke="rgba(244,168,4,0.55)"
            strokeWidth="0.8vw"
          >
            GREAT WORK
            <br />
            TRAVELS FAR
          </Display>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="xp-copy"
            style={{ maxWidth: "40ch", textAlign: "left", marginTop: "2vw" }}
          >
            From Ormond Beach to anywhere your customers scroll — every brand
            we build stays sharp on every screen it lands on.
          </p>
        </Reveal>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "9vw",
          marginTop: "5vw",
          position: "relative",
          zIndex: 2,
        }}
      >
        {STOPS.map((stop) => (
          <div
            key={stop.label}
            style={{
              display: "flex",
              justifyContent: stop.side === "left" ? "flex-start" : "flex-end",
              paddingLeft: stop.side === "left" ? "8vw" : 0,
              paddingRight: stop.side === "right" ? "8vw" : 0,
            }}
          >
            <Reveal>
              <div
                style={{
                  position: "relative",
                  transform: `rotate(${stop.tilt}deg)`,
                }}
              >
                <div
                  className="xp-card"
                  style={{
                    width: "clamp(220px,20vw,360px)",
                    height: "clamp(260px,24vw,430px)",
                  }}
                >
                  <img
                    src={stop.img}
                    alt={stop.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "-1.2vw",
                    right: "-2vw",
                    zIndex: 2,
                  }}
                >
                  <Sticker
                    color="var(--xp-red)"
                    rotate={stop.stickerRotate}
                    size="clamp(18px,1.9vw,34px)"
                  >
                    {stop.label}
                  </Sticker>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
