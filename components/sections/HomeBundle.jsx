'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import Magnetic from '../motion/Magnetic';

/**
 * The Bundle — makes the package offer explicit. Restaurant owners land, see the
 * proof above, then see everything handled as one package. Text-only (no images)
 * so it stays fast.
 */
const ITEMS = [
  { n: '01', title: 'Dish Photography',        copy: 'We shoot every plate, styled to sell.' },
  { n: '02', title: 'Menu Design',             copy: 'Your full menu, rebuilt and ready to print.' },
  { n: '03', title: 'Daily Content, Automated',copy: 'Specials designed and posted for you, every morning.' },
  { n: '04', title: 'Brand & Social',          copy: 'One consistent look across every channel.' },
  { n: '05', title: 'Website Design & Build',  copy: 'No site? We build one. Have one? We rebuild it — fast and mobile-first.' },
  { n: '06', title: 'Local SEO & Growth',      copy: 'Get found by the locals and tourists searching right now.' },
];

export default function HomeBundle() {
  return (
    <section id="bundle" className="bundle-section">
      <div className="shell">
        <div className="bundle-head">
          <Reveal><span className="eyebrow">The Bundle</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="bundle-h2">
              One package. <em className="accent-italic">Everything your restaurant needs.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead bundle-sub">
              Photography, menus, daily content, brand, and your website — designed
              and run as one package, so you can focus on the floor.
            </p>
          </Reveal>
        </div>

        <Stagger className="bundle-grid" stagger={0.07}>
          {ITEMS.map((s) => (
            <StaggerItem as="article" key={s.n} className="bundle-item">
              <span className="bundle-num">{s.n}</span>
              <h3 className="bundle-item-title">{s.title}</h3>
              <p className="bundle-item-copy">{s.copy}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="bundle-cta">
            <Magnetic strength={0.14}>
              <a className="ti-btn primary" href="#contact">Build your package</a>
            </Magnetic>
            <span className="bundle-cta-note">One team. One monthly package. No juggling freelancers.</span>
          </div>
        </Reveal>
      </div>

      <style>{`
        .bundle-section {
          background: var(--bg-soft);
          padding: 96px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .bundle-head { max-width: 720px; margin-bottom: 48px; }
        .bundle-h2 {
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-weight: 500; color: var(--ink);
          font-size: clamp(1.9rem, 4vw, 3rem);
          letter-spacing: -0.03em; line-height: 1.05; margin: 10px 0 0;
        }
        .bundle-sub { color: var(--muted); margin: 18px 0 0; max-width: 56ch; }

        .bundle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
        }
        .bundle-item {
          background: var(--bg-card);
          padding: 30px 30px 34px;
          transition: background .25s ease;
        }
        .bundle-item:hover { background: var(--bg-soft); }
        .bundle-num {
          font-family: var(--font-body); font-size: 12px; font-weight: 700;
          letter-spacing: 0.2em; color: var(--warm);
        }
        .bundle-item-title {
          font-size: 19px; font-weight: 600; color: var(--ink);
          letter-spacing: -0.018em; margin: 12px 0 8px;
        }
        .bundle-item-copy { color: var(--muted); font-size: 15px; line-height: 1.55; margin: 0; }

        .bundle-cta {
          margin-top: 44px; display: flex; align-items: center;
          gap: 20px; flex-wrap: wrap;
        }
        .bundle-cta-note { color: var(--muted); font-size: 14px; }

        @media (max-width: 900px) {
          .bundle-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .bundle-section { padding: 64px 0; }
          .bundle-grid { grid-template-columns: 1fr; }
          .bundle-item { padding: 24px 22px 26px; }
        }
      `}</style>
    </section>
  );
}
