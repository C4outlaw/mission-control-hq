import Reveal from '../../components/motion/Reveal';
import { Stagger, StaggerItem } from '../../components/motion/Stagger';
import HoverLift from '../../components/motion/HoverLift';
import Magnetic from '../../components/motion/Magnetic';
import Parallax from '../../components/motion/Parallax';
import Footer from '../../components/layout/Footer';
import SiteNav from '../../components/layout/SiteNav';

export const metadata = {
  title: 'About O’Neill Myrie',
  description:
    'Founder of Myrie HQ and General Manager at The Beach Bucket — combining real hospitality operations with modern marketing systems for local businesses across Daytona Beach and Orlando.',
  alternates: { canonical: 'https://www.myriehq.com/about' },
};

const beliefs = [
  { num: '01', title: 'Operations first',   desc: 'Marketing that ignores how the kitchen and bar actually run is theatre. Real growth starts at the line.' },
  { num: '02', title: 'Ship every week',    desc: 'Daily specials, weekly content, monthly campaigns. The system has to ship — not sit in Figma.' },
  { num: '03', title: 'Measure what moves', desc: 'Vanity metrics waste budgets. We track the numbers that change covers, online orders, and reviews.' },
  { num: '04', title: 'Local-first',         desc: 'Daytona + Orlando are different markets. Hyper-local SEO, real-place context, and on-the-ground knowledge win.' },
];

const milestones = [
  { year: 'Today',  title: 'General Manager + Founder',     desc: 'Running The Beach Bucket day-to-day. Building Myrie HQ as a marketing studio for hospitality + local businesses.' },
  { year: '2025',   title: 'Magic Menu app',                desc: 'Shipped the menu-engineering operations app — daily specials, recipes, food cost, content engine in one workflow.' },
  { year: '2024',   title: 'Brand commercial system',      desc: 'Built the cinematic-commercial + daily-drink-specials production loop that runs at The Beach Bucket every week.' },
  { year: 'Earlier',title: 'Hospitality + ops experience', desc: 'Years on the floor — bar, grill, beachfront operations, customer service, brand, and scale.' },
];

export default function AboutPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />

      <section className="about-hero">
        <div className="shell about-hero-grid">
          <div className="about-hero-copy">
            <Reveal><span className="eyebrow">— About the founder</span></Reveal>
            <Reveal delay={0.1}>
              <h1 className="display about-hero-title">O&apos;Neill <em className="accent-italic">Myrie.</em></h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="lead about-hero-lead">
                General Manager at The Beach Bucket. Founder of Myrie HQ. Hospitality operator turned marketing builder — combining real GM experience with modern marketing systems for local businesses across Florida.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="about-actions">
                <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">Contact Myrie</a></Magnetic>
                <Magnetic><a className="ti-btn outline" href="/projects">See the work →</a></Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="about-photo-wrap">
            <Parallax speed={0.12}>
              <img src="/assets/profile/myrie.jpg" alt="O'Neill Myrie" className="about-photo" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">— The story</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">Built on the <em className="accent-italic">line</em>, not in a deck.</h2></Reveal>
        <Stagger className="story-grid" stagger={0.08}>
          <StaggerItem className="story-text">
            <p className="lead">
              O&apos;Neill leads at the intersection of operations and marketing. The day-to-day of running a
              beachfront bar &amp; grill — the rushes, the inventory, the staff, the daily specials, the tourists
              vs locals — that&apos;s the lens behind every project at Myrie HQ.
            </p>
            <p className="lead">
              The mission is simple: help local businesses look world-class online and convert that visibility
              into real revenue. Through Myrie HQ, O&apos;Neill supports restaurants, bars, and local brands
              across Daytona Beach and Orlando with modern web design, local SEO, brand creative, and the kind
              of marketing systems that actually ship every week.
            </p>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">Principles</span></Reveal>
          <Reveal delay={0.1}><h2 className="tropical-h2">How we work.</h2></Reveal>
          <Stagger className="beliefs-grid" stagger={0.08}>
            {beliefs.map(b => (
              <StaggerItem as="article" key={b.title} className="ti-card belief-card">
                <HoverLift>
                  <div className="belief-num">{b.num}</div>
                  <h3 className="belief-title">{b.title}</h3>
                  <p>{b.desc}</p>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">— Timeline</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">From the floor to the <em className="accent-italic">studio.</em></h2></Reveal>
        <Stagger className="timeline" stagger={0.1}>
          {milestones.map(m => (
            <StaggerItem className="ti-card timeline-row" key={m.title}>
              <HoverLift lift={4}>
                <div className="timeline-grid">
                  <span className="timeline-year display">{m.year}</span>
                  <div>
                    <h3 className="headline">{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell block contact-cta">
        <Reveal><h2 className="tropical-h2">Ready to <span className="accent">grow</span>?</h2></Reveal>
        <Reveal delay={0.1}><p className="lead">Let&apos;s rebuild your site and growth strategy with a premium, modern approach.</p></Reveal>
        <Reveal delay={0.2}>
          <div className="cta-actions">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a></Magnetic>
            <Magnetic><a className="ti-btn gold" href="tel:+13867958727">(386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        .about-hero { padding: 96px 0 64px; }
        .about-hero-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: center; }
        .about-hero-title { font-size: clamp(2.6rem, 6.5vw, 5.4rem); margin: 24px 0 28px; line-height: 1.04; letter-spacing: -0.04em; max-width: 14ch; }
        .accent-italic { font-style: italic; font-weight: 400; color: var(--warm); }
        .about-hero-lead { max-width: 60ch; margin: 0 0 32px; }
        .about-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .about-photo { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 18px; box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 32px 80px rgba(0,0,0,.12); }

        .block { padding: 144px 0; }
        .story-grid { padding-top: 8px; }
        .story-text { max-width: 820px; }
        .story-text .lead { margin: 0 0 18px; }

        .beliefs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 40px; }
        .belief-card { padding: 32px 28px; }
        .belief-num {
          font-family: var(--font-editorial), Fraunces, serif;
          font-size: 28px;
          font-weight: 500;
          color: var(--warm);
          letter-spacing: -0.02em;
          margin-bottom: 18px;
          line-height: 1;
        }
        .belief-title { font-size: 20px; font-weight: 600; letter-spacing: -0.018em; margin: 0 0 10px; }
        .belief-card p { line-height: 1.55; margin: 0; font-size: 15px; }

        .timeline { display: grid; gap: 16px; margin-top: 40px; }
        .timeline-row { padding: 28px 32px; }
        .timeline-grid { display: grid; grid-template-columns: 180px 1fr; gap: 32px; align-items: center; }
        .timeline-year {
          font-family: var(--font-editorial), Fraunces, serif;
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 500;
          color: var(--warm);
          letter-spacing: -0.025em;
        }
        .timeline-row h3 { font-size: 20px; font-weight: 600; letter-spacing: -0.018em; margin: 0 0 6px; }
        .timeline-row p { line-height: 1.55; margin: 0; }

        .contact-cta { text-align: center; padding: 120px 0; }
        .contact-cta .lead { max-width: 520px; margin: 16px auto 0; }
        .cta-actions { margin-top: 36px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 920px) {
          .about-hero { padding: 64px 0 48px; }
          .about-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .about-photo-wrap { max-width: 380px; margin: 0 auto; }
          .block { padding: 80px 0; }
          .timeline-grid { grid-template-columns: 1fr; gap: 8px; }
          .timeline-row { padding: 24px 20px; }
          .contact-cta { padding: 80px 0; }
        }
      `}</style>
    </main>
  );
}
