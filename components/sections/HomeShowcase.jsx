'use client';
import Reveal from '../motion/Reveal';
import Coverflow from '../motion/Coverflow';

/**
 * Design showcase — the daily-special poster designs in the premium coverflow,
 * floating on a seamless white stage. (Motion / video ads are in HomeMotionAds.)
 */
const BASE = '/assets/work/beach-bucket-design/drinks';
const SLIDES = [
  { src: 'monday.png',              cap: 'Monday — Daily Specials' },
  { src: 'tuesday.png',             cap: 'Tuesday — Daily Specials' },
  { src: 'wednesday.png',           cap: 'Wednesday — Daily Specials' },
  { src: 'thursday.png',            cap: 'Thursday — Daily Specials' },
  { src: 'friday.png',              cap: 'Friday — Daily Specials' },
  { src: 'saturday.png',            cap: 'Saturday — Daily Specials' },
  { src: 'sunday.png',              cap: 'Sunday — Daily Specials' },
  { src: 'blueberry-bay-breeze.png',cap: 'Blueberry Bay Breeze' },
  { src: 'cucumber-cooler.png',     cap: 'Cucumber Cooler' },
  { src: 'citrus-seabreeze.png',    cap: 'Citrus Seabreeze' },
  { src: 'orange-crush.png',        cap: 'Orange Crush' },
  { src: 'grape-pop.png',           cap: 'Grape Pop' },
  { src: 'cherry-lemonade.png',     cap: 'Cherry Lemonade' },
  { src: 'raspberry-lemonade.png',  cap: 'Raspberry Lemonade' },
];

export default function HomeShowcase() {
  return (
    <section id="showcase" className="cf-section">
      <div className="shell cf-head">
        <Reveal><span className="cf-eyebrow">Selected Work</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cf-h2">A gallery of designs we&rsquo;ve shipped.</h2>
        </Reveal>
      </div>

      <Coverflow slides={SLIDES.map((s) => ({ src: `${BASE}/${s.src}`, cap: s.cap }))} />

      <div className="shell cf-cta">
        <a className="cf-link" href="/projects/beach-bucket-design">See the full Beach Bucket case study →</a>
      </div>
    </section>
  );
}
