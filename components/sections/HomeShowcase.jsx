'use client';
import Reveal from '../motion/Reveal';
import Coverflow from '../motion/Coverflow';

/**
 * "Plates that sell themselves" — the dish work in two tight, separated groups
 * that tell the transformation a restaurant owner cares about:
 *   1. the plate styled for social (no menu copy)
 *   2. the same kind of dish built into a branded menu card (with description)
 * Curated to a strong handful each — quality over a long, repetitive scroll.
 */
const STYLED_BASE = '/assets/work/beach-bucket-design/plates-styled';
const STYLED = [
  { src: '01_The_Big_Beach.jpg',  cap: 'The Big Beach' },
  { src: '03_The_Sunrise.jpg',    cap: 'The Sunrise' },
  { src: '09_Healthy_Surfer.jpg', cap: 'Healthy Surfer' },
  { src: '05_Seafood_Omelet.jpg', cap: 'Seafood Omelet' },
  { src: '02_Early_Bird.jpg',     cap: 'Early Bird' },
  { src: '08_French_Toast.jpg',   cap: 'French Toast' },
  { src: '10_Shrimp_Tacos.jpg',   cap: 'Shrimp Tacos' },
  { src: '07_Veggie_Omelet.jpg',  cap: 'Veggie Omelet' },
];

const CARD_BASE = '/assets/work/beach-bucket-design/dishes';
const CARDS = [
  { src: 'bucket-burger.jpg',        cap: 'Bucket Burger' },
  { src: 'mahi-tacos.jpg',           cap: 'Mahi Tacos' },
  { src: 'buffalo-shrimp.jpg',       cap: 'Buffalo Shrimp' },
  { src: 'crab-cakes.jpg',           cap: 'Crab Cakes' },
  { src: 'classic-eggs-benedict.jpg',cap: 'Classic Eggs Benedict' },
  { src: 'fried-calamari.jpg',       cap: 'Fried Calamari' },
  { src: 'conch-fritters.jpg',       cap: 'Conch Fritters' },
  { src: 'key-west-chicken.jpg',     cap: 'Key West Chicken' },
  { src: 'mahi-sandwich.jpg',        cap: 'Mahi Sandwich' },
  { src: 'ahi-tuna-wrap.jpg',        cap: 'Ahi Tuna Wrap' },
];

export default function HomeShowcase() {
  return (
    <section id="showcase" className="cf-section">
      <div className="shell cf-head">
        <Reveal><span className="cf-eyebrow">Food &amp; Menu Design</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="cf-h2">Plates that sell themselves.</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="cf-sub">
            We reimagine every dish, then put it to work — styled for social, then
            built into a branded menu card. The same plate, earning twice.
          </p>
        </Reveal>
      </div>

      <div className="cf-group-label">
        <span>Styled for social<span className="cf-group-note">The plate, art-directed — no menu copy.</span></span>
      </div>
      <Coverflow slides={STYLED.map((s) => ({ src: `${STYLED_BASE}/${s.src}`, cap: s.cap }))} />

      <div className="cf-group-label">
        <span>Built into menu cards<span className="cf-group-note">The same dish, with name, ingredients &amp; price.</span></span>
      </div>
      <Coverflow slides={CARDS.map((s) => ({ src: `${CARD_BASE}/${s.src}`, cap: s.cap }))} />

      <div className="shell cf-cta">
        <a className="cf-link" href="/projects/beach-bucket-design">See the full Beach Bucket case study →</a>
      </div>
    </section>
  );
}
