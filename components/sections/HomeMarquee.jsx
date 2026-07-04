'use client';
import Marquee from '../motion/Marquee';

/**
 * Gold editorial ribbon between chapters — the service names glide past
 * like gallery signage. Pure type, zero images, fast.
 */
const ITEMS = [
  'Dish Photography',
  'Menu Design',
  'Daily Content',
  'Brand & Social',
  'Website Design',
  'Local SEO',
];

export default function HomeMarquee() {
  return (
    <section className="hm-marquee" aria-hidden="true">
      <Marquee duration={38} gap={0}>
        {ITEMS.map((item) => (
          <span key={item} className="hm-marquee-item">
            <em>{item}</em>
            <span className="hm-marquee-star">✦</span>
          </span>
        ))}
      </Marquee>

      <style>{`
        .hm-marquee {
          padding: 44px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          background: var(--bg);
          overflow: hidden;
        }
        .hm-marquee-item {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }
        .hm-marquee-item em {
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.6rem, 3.4vw, 2.6rem);
          letter-spacing: -0.02em;
          color: var(--ink);
          padding: 0 28px;
        }
        .hm-marquee-star {
          color: var(--warm);
          font-size: clamp(0.9rem, 1.6vw, 1.3rem);
        }
        @media (max-width: 560px) {
          .hm-marquee { padding: 30px 0; }
          .hm-marquee-item em { padding: 0 18px; }
        }
      `}</style>
    </section>
  );
}
