import Reveal from '../../components/motion/Reveal';
import { Stagger, StaggerItem } from '../../components/motion/Stagger';
import HoverLift from '../../components/motion/HoverLift';
import Magnetic from '../../components/motion/Magnetic';
import Footer from '../../components/layout/Footer';
import SiteNav from '../../components/layout/SiteNav';

export const metadata = {
  title: 'Portfolio · Myrie HQ',
  description: 'Selected work for restaurants, bars, and local businesses across Daytona Beach and Orlando — websites, brand commercials, daily specials systems, and marketing automation.',
};

const featured = {
  slug: 'beach-bucket-design',
  title: 'Hospitality Brand Designs',
  tag: 'BRAND DESIGN · PHOTOGRAPHY · MENUS',
  blurb: 'Daily-drink specials, signature cocktail cards, breakfast plate photography, and full menu rebuilds delivered for hospitality clients across Florida.',
  href: '/projects/beach-bucket-design',
  image: '/assets/work/beach-bucket-design/drinks/all-drinks.png',
  metrics: [
    { num: '15', label: 'Drink-special designs' },
    { num: '10', label: 'Plate photo shoots' },
    { num: '4', label: 'Menu spreads' },
  ],
};

const rest = [
  { slug: 'magic-menu', title: 'Magic Menu App', tag: 'SAAS · OPERATIONS', blurb: 'Operations app for menu engineering, daily specials, food costing, and content automation. Live demo embedded on the home page.', href: '/magic-menu', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'daytona-marketing', title: 'Daytona Beach Marketing', tag: 'AGENCY · LOCAL SEO', blurb: 'Local marketing program for Daytona Beach restaurants, bars, and tourism businesses.', href: '/daytona-beach-marketing-agency', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'local-seo-orlando', title: 'Local SEO Orlando', tag: 'SEO · GROWTH', blurb: 'Citation cleanup, GBP optimization, and review velocity systems for Orlando local businesses.', href: '/local-seo-orlando', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'restaurant-web-design', title: 'Restaurant Web Design — Daytona', tag: 'WEB DESIGN · CONVERSION', blurb: 'Conversion-focused restaurant websites with menu workflows, online ordering, and reservations.', href: '/restaurant-web-design-daytona', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'orlando-marketing', title: 'Orlando Marketing Agency', tag: 'AGENCY · BRAND', blurb: 'Full-service marketing for Orlando restaurants, bars, and hospitality businesses.', href: '/orlando-marketing-agency', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80' },
];

export default function ProjectsPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />

      <section className="proj-hero">
        <div className="shell proj-hero-copy">
          <Reveal><span className="label-pill">PORTFOLIO</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title">
              <span className="display">REAL BRANDS.</span>
              <span className="script">real</span>
              <span className="display">RESULTS.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead">
              Selected work across Daytona Beach + Orlando — full-stack brand builds, websites that
              convert, commercials that travel, and automation that runs while you&apos;re in service.
            </p>
          </Reveal>
        </div>
        <div className="wood-strip" />
      </section>

      <section className="shell block">
        <Reveal>
          <a href={featured.href} className="featured-project">
            <HoverLift lift={6}>
              <div className="featured-media">
                <img src={featured.image} alt={featured.title} />
                <div className="featured-tag-pill">FEATURED</div>
              </div>
              <div className="featured-body">
                <p className="eyebrow">{featured.tag}</p>
                <h2 className="display feat-title">{featured.title}</h2>
                <p>{featured.blurb}</p>
                <div className="featured-metrics">
                  {featured.metrics.map(m => (
                    <div key={m.label} className="featured-metric">
                      <span className="metric-num display">{m.num}</span>
                      <span className="metric-label headline">{m.label}</span>
                    </div>
                  ))}
                </div>
                <span className="link-arrow headline">View full case study →</span>
              </div>
            </HoverLift>
          </a>
        </Reveal>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow gold">MORE WORK</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">Selected <span className="accent">projects</span>.</h2></Reveal>
        <Stagger className="proj-grid" stagger={0.09}>
          {rest.map(p => (
            <StaggerItem key={p.slug}>
              <a href={p.href} className="proj-card-link">
                <HoverLift lift={6}>
                  <article className="ti-card proj-card">
                    <div className="proj-thumb" style={{ backgroundImage: `url(${p.image})` }} />
                    <div className="proj-body">
                      <p className="eyebrow">{p.tag}</p>
                      <h3 className="display proj-title">{p.title}</h3>
                      <p>{p.blurb}</p>
                      <span className="link-arrow headline">View project →</span>
                    </div>
                  </article>
                </HoverLift>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell block contact-cta">
        <Reveal><h2 className="tropical-h2">Have a <span className="accent gold">restaurant</span><br/>or local brand?</h2></Reveal>
        <Reveal delay={0.1}><p className="lead">Let&apos;s build the next case study together.</p></Reveal>
        <Reveal delay={0.2}>
          <div className="cta-actions">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">Start your project</a></Magnetic>
            <Magnetic><a className="ti-btn gold" href="tel:+13867958727">+1 (386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        .nav { position: sticky; top: 0; z-index: 6; backdrop-filter: blur(14px); background: rgba(255,247,230,.9); border-bottom: 1px solid rgba(212,154,35,.25); padding: 14px 0; display: flex; justify-content: space-between; align-items: center; }
        .brand-link { display: inline-flex; align-items: baseline; gap: 6px; text-decoration: none; }
        .brand-myrie-sm { font-size: 1.6rem; color: var(--teal-deep); -webkit-text-stroke: 1px var(--gold); text-shadow: 0 2px 0 rgba(245,196,74,.3); }
        .brand-hq-sm { font-size: 1.5rem; color: var(--orange); transform: rotate(-3deg); }
        .nav nav { display: flex; gap: 6px; flex-wrap: wrap; }
        .nav nav a { text-decoration: none; padding: 8px 14px; border-radius: 999px; font-family: var(--font-headline), Bebas Neue, sans-serif; font-size: 13px; letter-spacing: .12em; color: var(--teal-deep); border: 1.5px solid rgba(14,55,79,.2); background: rgba(255,255,255,.7); transition: all .2s; }
        .nav nav a:hover { background: var(--gold); color: var(--wood-deep); border-color: var(--wood-deep); transform: translateY(-1px); }

        .proj-hero { position: relative; padding: 72px 0 0; overflow: hidden; }
        .proj-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 20%, rgba(124,201,232,.55), transparent 50%), linear-gradient(180deg, #d3edfa 0%, #fff7e6 100%); z-index: -1; }
        .proj-hero-copy { padding: 48px 0 96px; max-width: 980px; }
        .hero-title { display: flex; flex-direction: column; gap: 8px; margin: 18px 0 22px; }
        .hero-title .display { font-size: clamp(2.4rem, 6.4vw, 5.4rem); color: var(--teal-deep); letter-spacing: .005em; line-height: .92; text-shadow: 0 4px 0 rgba(14,55,79,.15); }
        .hero-title .script { font-size: clamp(3rem, 8.5vw, 6.4rem); color: var(--orange); transform: rotate(-3deg) translateY(-.05em); align-self: flex-start; padding: 0 8px; line-height: .9; text-shadow: 0 4px 0 rgba(208,78,8,.18); }

        .block { padding: 60px 0; }

        .featured-project { display: block; text-decoration: none; color: inherit; border-radius: 28px; overflow: hidden; background: #fff; border: 3px solid var(--gold); box-shadow: 0 28px 64px rgba(212,154,35,.18), 0 0 0 6px rgba(245,196,74,.18); position: relative; }
        .featured-media { position: relative; aspect-ratio: 16/9; background: linear-gradient(135deg, #7cc9e8, #2a7da3); overflow: hidden; }
        .featured-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .featured-tag-pill { position: absolute; top: 18px; left: 18px; padding: 8px 16px; border-radius: 999px; background: var(--gold); color: var(--wood-deep); font-family: var(--font-headline); font-size: 12px; letter-spacing: .18em; border: 2px solid var(--wood-deep); box-shadow: 0 4px 0 rgba(0,0,0,.18); }
        .featured-body { padding: 36px 38px 38px; }
        .featured-body .eyebrow { margin-bottom: 8px; }
        .feat-title { font-size: clamp(1.8rem, 3.6vw, 2.8rem); color: var(--teal-deep); letter-spacing: .005em; margin: 6px 0 14px; line-height: 1; }
        .featured-body p { color: var(--ink-soft); line-height: 1.65; font-size: 17px; max-width: 800px; margin: 0 0 22px; }
        .featured-metrics { display: flex; gap: 36px; flex-wrap: wrap; padding: 18px 0; border-top: 2px dashed var(--gold); border-bottom: 2px dashed var(--gold); margin-bottom: 18px; }
        .featured-metric { display: flex; flex-direction: column; gap: 4px; }
        .metric-num { font-size: clamp(1.8rem, 3vw, 2.4rem); color: var(--orange); line-height: 1; text-shadow: 0 3px 0 rgba(208,78,8,.18); }
        .metric-label { font-size: 12px; color: var(--ink-soft); letter-spacing: .12em; text-transform: uppercase; }
        .link-arrow { color: var(--green-deep); font-size: 14px; letter-spacing: .12em; }

        .proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; }
        .proj-card-link { text-decoration: none; color: inherit; }
        .proj-card { padding: 0 !important; overflow: hidden; }
        .proj-thumb { aspect-ratio: 16/10; background-size: cover; background-position: center; border-radius: 18px 18px 0 0; }
        .proj-body { padding: 20px 22px 24px; }
        .proj-body .eyebrow { margin-bottom: 6px; }
        .proj-title { font-size: 22px; color: var(--teal-deep); letter-spacing: .005em; line-height: 1; margin: 6px 0 8px; }
        .proj-body p { color: var(--ink-soft); line-height: 1.55; font-size: 14px; margin: 0 0 12px; }

        .contact-cta { text-align: center; padding: 80px 0 100px; }
        .contact-cta .lead { max-width: 520px; margin: 12px auto 0; }
        .cta-actions { margin-top: 28px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 920px) {
          .nav { flex-direction: column; align-items: flex-start; padding: 12px 0; gap: 10px; }
          .nav nav a { font-size: 11px; padding: 6px 10px; }
          .proj-hero-copy { padding: 36px 0 72px; }
          .hero-title .display { font-size: clamp(2rem, 9vw, 3.6rem); }
          .hero-title .script { font-size: clamp(2.4rem, 12vw, 4.4rem); }
          .featured-body { padding: 24px 22px 26px; }
          .featured-metrics { gap: 18px; }
        }
      `}</style>
    </main>
  );
}
