'use client';
import Reveal from '../motion/Reveal';
import Coverflow from '../motion/Coverflow';

/**
 * Original-photography proof — real plate shots in the same 3D coverflow the
 * page opens with, so the section stays compact. Links into the full case
 * study for the other 24+ plates.
 */
const BASE = '/assets/work/beach-bucket-design/plates';

const SHOTS = [
  { src: 'fish-tacos.jpg',                  cap: 'Fish Tacos' },
  { src: 'blue-swimming-crab-benedict.jpg', cap: 'Crab Benedict' },
  { src: 'fried-shrimp-plate.jpg',          cap: 'Fried Shrimp' },
  { src: 'chorizo-omelet.jpg',              cap: 'Chorizo Omelet' },
  { src: 'pulled-pork-and-slaw-tacos.jpg',  cap: 'Pulled Pork Tacos' },
  { src: 'steak-and-mozzarella-panini.jpg', cap: 'Steak & Mozzarella Panini' },
  { src: 'smoked-fish-dip.jpg',             cap: 'Smoked Fish Dip' },
  { src: 'tuna-melt-sandwich.jpg',          cap: 'Tuna Melt' },
];

export default function HomePhotoWall() {
  return (
    <section className="pw-section">
      <div className="shell pw-head">
        <Reveal><span className="eyebrow">Original Photography</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">Every shot is <em className="accent-italic">ours.</em></h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead pw-sub">
            Real dishes, styled and photographed in-house — 35 plates for one
            kitchen alone. Nothing stock, nothing borrowed.
          </p>
        </Reveal>
      </div>

      <Coverflow dark slides={SHOTS.map((s) => ({ src: `${BASE}/${s.src}`, cap: s.cap }))} />

      <div className="shell pw-cta">
        <a className="cf-link" href="/projects/beach-bucket-design">
          See all 35 plates in the full case study →
        </a>
      </div>

      <style>{`
        .pw-section {
          background: var(--bg);
          padding: 88px 0 84px;
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .pw-head { max-width: 720px; margin-bottom: 8px; }
        .pw-sub { margin: 14px 0 0; }
        .pw-cta { margin-top: 10px; text-align: center; }
        @media (max-width: 760px) {
          .pw-section { padding: 60px 0 64px; }
        }
      `}</style>
    </section>
  );
}
