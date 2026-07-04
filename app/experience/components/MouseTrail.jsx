"use client";

import { useEffect, useRef } from "react";

/* Cursor-follow trail: a chain of emoji stickers, each easing toward the
   previous one at a decreasing lerp factor, so they string out behind the
   mouse. Desktop only (CSS hides below 768px, and we skip on touch). */
const ITEMS = [
  { char: "✦", rotate: 0, size: "2.6vw", color: "var(--xp-gold)" },
  { char: "💻", rotate: 12, size: "2.4vw" },
  { char: "🎨", rotate: -14, size: "2.2vw" },
  { char: "⚡", rotate: 8, size: "2vw" },
];

export default function MouseTrail() {
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const pts = ITEMS.map(() => ({ x: -100, y: -100 }));
    let mouse = { x: -100, y: -100 };
    let raf;

    const onMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      let target = mouse;
      pts.forEach((p, i) => {
        const k = 0.28 - i * 0.05;
        p.x += (target.x - p.x) * k;
        p.y += (target.y - p.y) * k;
        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${p.x}px, ${p.y + 34 + i * 6}px) rotate(${ITEMS[i].rotate}deg)`;
        }
        target = p;
      });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="xp-trail" aria-hidden="true">
      {ITEMS.map((it, i) => (
        <span
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="xp-trail-item"
          style={{
            fontSize: it.size,
            color: it.color,
            zIndex: 10000 - i,
            transform: "translate(-200px, -200px)",
          }}
        >
          {it.char}
        </span>
      ))}
    </div>
  );
}
