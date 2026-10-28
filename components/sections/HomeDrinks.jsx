'use client';
import Reveal from '../motion/Reveal';
import Coverflow from '../motion/Coverflow';

/**
 * Daily drink specials — the drink-design posters in the coverflow. Moved out of
 * the design gallery (now plates) into their own section so nothing is lost.
 */
const BASE = '/assets/work/beach-bucket-design/drinks';
const SLIDES = [
  { src: 'monday.webp',              cap: 'Monday — Daily Specials' },
  { src: 'tuesday.webp',             cap: 'Tuesday — Daily Specials' },
  { src: 'wednesday.webp',           cap: 'Wednesday — Daily Specials' },
  { src: 'thursday.webp',            cap: 'Thursday — Daily Specials' },
  { src: 'friday.webp',              cap: 'Friday — Daily Specials' },
  { src: 'saturday.webp',            cap: 'Saturday — Daily Specials' },
  { src: 'sunday.webp',              cap: 'Sunday — Daily Specials' },
  { src: 'blueberry-bay-breeze.webp',cap: 'Blueberry Bay Breeze' },
  { src: 'cucumber-cooler.webp',     cap: 'Cucumber Cooler' },
  { src: 'citrus-seabreeze.webp',    cap: 'Citrus Seabreeze' },
  { src: 'orange-crush.webp',        cap: 'Orange Crush' },
  { src: 'grape-pop.webp',           cap: 'Grape Pop' },
  { src: 'cherry-lemonade.webp',     cap: 'Cherry Lemonade' },
  { src: 'raspberry-lemonade.webp',  cap: 'Raspberry Lemonade' },
];

export default function HomeDrinks() {
  return (
    <section id="drinks" className="cf-section">
      <div className="shell cf-head">
        <Reveal><span className="cf-eyebrow">Daily Drink Specials</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cf-h2">A drink for every day of the week.</h2>
        </Reveal>
      </div>

      <Coverflow slides={SLIDES.map((s) => ({ src: `${BASE}/${s.src}`, cap: s.cap }))} />

      <div className="shell cf-cta">
        <a className="cf-link" href="/projects/beach-bucket-design">See the full Beach Bucket case study →</a>
      </div>
    </section>
  );
}
