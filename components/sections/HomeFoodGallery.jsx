'use client';
import Reveal from '../motion/Reveal';
import Coverflow from '../motion/Coverflow';

/**
 * Plates — raw plated-food photography for The Beach Bucket, shown in the
 * premium coverflow so the whole plate is visible and you skip across.
 */
const BASE = '/assets/work/beach-bucket-design/plates';
const PLATES = [
  { src: 'the-big-beach-breakfast.jpg',     cap: 'The Big Beach Breakfast' },
  { src: 'bucket-burger.jpg',               cap: 'Bucket Burger' },
  { src: 'fish-tacos.jpg',                  cap: 'Fish Tacos' },
  { src: 'buffalo-shrimp.jpg',              cap: 'Buffalo Shrimp' },
  { src: 'crab-cakes.jpg',                  cap: 'Crab Cakes' },
  { src: 'fried-shrimp-plate.jpg',          cap: 'Fried Shrimp' },
  { src: 'classic-benedict.jpg',            cap: 'Classic Benedict' },
  { src: 'conch-fritters.jpg',              cap: 'Conch Fritters' },
  { src: 'the-sunrise-breakfast.jpg',       cap: 'The Sunrise Breakfast' },
  { src: 'shrimp-tacos.jpg',                cap: 'Shrimp Tacos' },
  { src: 'key-west-chicken-sandwich.jpg',   cap: 'Key West Chicken Sandwich' },
  { src: 'fried-calamari.jpg',              cap: 'Fried Calamari' },
  { src: 'bucket-fish-sandwich.jpg',        cap: 'Bucket Fish Sandwich' },
  { src: 'caesar-salad.jpg',                cap: 'Caesar Salad' },
  { src: 'pulled-pork-and-slaw-tacos.jpg',  cap: 'Pulled Pork & Slaw Tacos' },
  { src: 'blue-swimming-crab-benedict.jpg', cap: 'Blue Swimming Crab Benedict' },
  { src: 'wings.jpg',                       cap: 'Wings' },
  { src: 'ahi-tuna-wrap.jpg',               cap: 'Ahi Tuna Wrap' },
  { src: 'smoked-fish-dip.jpg',             cap: 'Smoked Fish Dip' },
  { src: 'healthy-surfer-breakfast.jpg',    cap: 'Healthy Surfer Breakfast' },
  { src: 'early-bird-breakfast.jpg',        cap: 'Early Bird Breakfast' },
  { src: 'french-toast-three-slices.jpg',   cap: 'French Toast' },
  { src: 'biscuits-and-gravy.jpg',          cap: 'Biscuits & Gravy' },
  { src: 'chorizo-omelet.jpg',              cap: 'Chorizo Omelet' },
  { src: 'seafood-omelet.jpg',              cap: 'Seafood Omelet' },
  { src: 'veggie-omelet.jpg',               cap: 'Veggie Omelet' },
  { src: 'steak-and-mozzarella-panini.jpg', cap: 'Steak & Mozzarella Panini' },
  { src: 'tuna-melt-sandwich.jpg',          cap: 'Tuna Melt' },
  { src: 'fried-mozzarella-sticks.jpg',     cap: 'Fried Mozzarella Sticks' },
  { src: 'onion-rings.jpg',                 cap: 'Onion Rings' },
  { src: 'corn-nuggets.jpg',                cap: 'Corn Nuggets' },
  { src: 'chicken-tenders.jpg',             cap: 'Chicken Tenders' },
  { src: 'bucket-house-salad.jpg',          cap: 'Bucket House Salad' },
];

export default function HomeFoodGallery() {
  return (
    <section id="food" className="cf-section">
      <div className="shell cf-head">
        <Reveal><span className="cf-eyebrow">Food Photography</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cf-h2">Plates that sell themselves.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="cf-sub">
            Every dish on the menu — styled and shot for The Beach Bucket. Skip
            through the whole plate, built for menus, delivery apps, and social.
          </p>
        </Reveal>
      </div>

      <Coverflow slides={PLATES.map((p) => ({ src: `${BASE}/${p.src}`, cap: p.cap }))} />

      <div className="shell cf-cta">
        <a className="cf-link" href="/projects/beach-bucket-design">See the full Beach Bucket case study →</a>
      </div>
    </section>
  );
}
