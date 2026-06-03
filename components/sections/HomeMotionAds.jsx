'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';

/**
 * Motion & automation — the daily-special designs rendered as looping motion
 * ads. Separated from the still-design showcase so video has its own category.
 */
const BASE = '/assets/work/beach-bucket-design/drink-ads';
const POSTER = '/assets/work/beach-bucket-design/drinks';
const ADS = [
  { day: 'monday',    label: 'Monday' },
  { day: 'tuesday',   label: 'Tuesday' },
  { day: 'wednesday', label: 'Wednesday' },
  { day: 'thursday',  label: 'Thursday' },
  { day: 'friday',    label: 'Friday' },
  { day: 'saturday',  label: 'Saturday' },
  { day: 'sunday',    label: 'Sunday' },
];

export default function HomeMotionAds() {
  return (
    <section id="motion" className="motion-ads">
      <div className="shell motion-head">
        <Reveal><span className="motion-eyebrow">Motion &amp; Automation</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="motion-h2">Daily content, on autopilot.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="motion-sub">
            Every daily special, rendered as a looping motion ad and scheduled to
            post itself each morning — design and distribution, handled.
          </p>
        </Reveal>
      </div>

      <Stagger className="shell motion-grid" stagger={0.06}>
        {ADS.map((a) => (
          <StaggerItem as="figure" key={a.day} className="motion-card">
            <video
              src={`${BASE}/${a.day}.mp4`}
              poster={`${POSTER}/${a.day}.png`}
              autoPlay muted loop playsInline preload="none"
            />
            <figcaption>{a.label}</figcaption>
          </StaggerItem>
        ))}
      </Stagger>

      <style>{`
        .motion-ads {
          background: #07090e;
          padding: 88px 0 84px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .motion-head { text-align: center; }
        .motion-eyebrow {
          font-family: var(--font-body); font-size: 12px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #7ad0ff;
        }
        .motion-h2 {
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-weight: 500; color: #f5f5f5;
          font-size: clamp(1.9rem, 4vw, 3rem);
          letter-spacing: -0.03em; line-height: 1.05; margin: 10px 0 0;
        }
        .motion-sub {
          color: #9aa3b2; font-size: 16px; line-height: 1.55;
          max-width: 52ch; margin: 16px auto 0;
        }
        .motion-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-top: 44px;
        }
        .motion-card {
          margin: 0; border-radius: 16px; overflow: hidden;
          background: #0d1119; border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 50px rgba(0,0,0,0.45);
          position: relative;
        }
        .motion-card video {
          display: block; width: 100%; aspect-ratio: 3/4;
          object-fit: cover; background: #0d1119;
        }
        .motion-card figcaption {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 26px 16px 12px;
          background: linear-gradient(180deg, transparent, rgba(0,0,0,0.7));
          color: #fff; font-family: var(--font-body);
          font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        @media (max-width: 1024px) {
          .motion-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 680px) {
          .motion-ads { padding: 60px 0 56px; }
          .motion-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 32px; }
        }
      `}</style>
    </section>
  );
}
