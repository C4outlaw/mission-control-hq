'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useT } from '../../lib/i18n';

/**
 * Food photography gallery — plated-dish photography shot for The Beach Bucket.
 * A curated grid of the strongest dishes; the full menu set lives on the
 * Beach Bucket case-study page. Proof of the brand/creative work Myrie HQ ships.
 */
export default function HomeFoodGallery() {
  const { t } = useT();

  const dishes = [
    { src: 'bucket-burger.jpg',        caption: 'Bucket Burger' },
    { src: 'mahi-tacos.jpg',           caption: 'Mahi Tacos' },
    { src: 'buffalo-shrimp.jpg',       caption: 'Buffalo Shrimp' },
    { src: 'crab-cakes.jpg',           caption: 'Crab Cakes' },
    { src: 'classic-eggs-benedict.jpg',caption: 'Classic Eggs Benedict' },
    { src: 'fried-calamari.jpg',       caption: 'Fried Calamari' },
    { src: 'conch-fritters.jpg',       caption: 'Conch Fritters' },
    { src: 'key-west-chicken.jpg',     caption: 'Key West Chicken' },
    { src: 'mahi-sandwich.jpg',        caption: 'Mahi Sandwich' },
    { src: 'fried-shrimp.jpg',         caption: 'Fried Shrimp' },
    { src: 'smoked-fish-dip.jpg',      caption: 'Smoked Fish Dip' },
    { src: 'caesar-salad.jpg',         caption: 'Caesar Salad' },
  ];

  return (
    <section id="food" className="shell block">
      <Reveal><span className="eyebrow">Food &amp; Menu Design</span></Reveal>
      <Reveal delay={0.1}>
        <h2 className="tropical-h2">Plates that sell themselves.</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="lead block-sub">
          Every dish on the menu — styled, shot, and designed into branded cards
          for The Beach Bucket. One consistent look across menus, delivery apps,
          and social.
        </p>
      </Reveal>

      <Stagger className="food-grid" stagger={0.06}>
        {dishes.map((d) => (
          <StaggerItem as="figure" key={d.src} className="food-card">
            <img
              src={`/assets/work/beach-bucket-design/dishes/${d.src}`}
              alt={`${d.caption} — Beach Bucket menu card designed by Myrie HQ`}
              loading="lazy"
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.3}>
        <div className="food-cta">
          <a className="link-arrow" href="/projects/beach-bucket-design">
            See the full Beach Bucket case study →
          </a>
        </div>
      </Reveal>

      <style>{`
        .food-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 28px;
        }
        .food-card {
          margin: 0;
          background: var(--bg-card);
          border: 1px solid var(--line);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 12px 36px rgba(20,30,60,0.06);
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease, border-color .25s ease;
        }
        .food-card:hover {
          transform: translateY(-3px);
          border-color: var(--line-2);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 22px 54px rgba(20,30,60,0.12);
        }
        .food-card img {
          display: block;
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          object-position: center;
        }
        .food-cta { display: flex; justify-content: center; margin-top: 40px; }

        @media (max-width: 1100px) {
          .food-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 760px) {
          .food-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .food-card figcaption { padding: 11px 12px 13px; font-size: 13.5px; }
        }
      `}</style>
    </section>
  );
}
