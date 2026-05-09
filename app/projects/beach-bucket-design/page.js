import Reveal from '../../../components/motion/Reveal';
import Magnetic from '../../../components/motion/Magnetic';
import Carousel from '../../../components/motion/Carousel';
import Footer from '../../../components/layout/Footer';
import SiteNav from '../../../components/layout/SiteNav';

export const metadata = {
  title: 'Hospitality Brand Design Work · Myrie HQ',
  description: 'Selected design work for hospitality clients — daily drink-special social graphics, signature cocktail cards, breakfast menu photography, and full menu rebuilds.',
};

const drinks = [
  { src: '/assets/work/beach-bucket-design/drinks/all-drinks.png',           caption: 'Daily Drinks Specials — full-week social grid' },
  { src: '/assets/work/beach-bucket-design/drinks/monday.png',               caption: 'Monday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/tuesday.png',              caption: 'Tuesday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/wednesday.png',            caption: 'Wednesday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/thursday.png',             caption: 'Thursday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/friday.png',               caption: 'Friday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/saturday.png',             caption: 'Saturday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/sunday.png',               caption: 'Sunday — themed daily promo card' },
  { src: '/assets/work/beach-bucket-design/drinks/blueberry-bay-breeze.png', caption: 'Blueberry Bay Breeze — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/cherry-lemonade.png',      caption: 'Cherry Lemonade — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/citrus-seabreeze.png',     caption: 'Citrus Seabreeze — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/cucumber-cooler.png',      caption: 'Cucumber Cooler — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/grape-pop.png',            caption: 'Grape Pop — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/orange-crush.png',         caption: 'Orange Crush — signature cocktail card' },
  { src: '/assets/work/beach-bucket-design/drinks/raspberry-lemonade.png',   caption: 'Raspberry Lemonade — signature cocktail card' },
];

const breakfast = [
  { src: '/assets/work/beach-bucket-design/breakfast/the-big-beach.jpg',       caption: 'The Big Beach — feature plate' },
  { src: '/assets/work/beach-bucket-design/breakfast/the-sunrise.jpg',         caption: 'The Sunrise — daily breakfast' },
  { src: '/assets/work/beach-bucket-design/breakfast/the-early-bird.jpg',      caption: 'The Early Bird' },
  { src: '/assets/work/beach-bucket-design/breakfast/the-healthty-surfer.jpg', caption: 'The Healthy Surfer' },
];

const menus = [
  { src: '/assets/work/beach-bucket-design/menu/the-big-beach.png', caption: 'Hero menu illustration — The Big Beach' },
  { src: '/assets/work/beach-bucket-design/menu/menu-1.webp',       caption: 'Print + digital menu spread (1/3)' },
  { src: '/assets/work/beach-bucket-design/menu/menu-2.webp',       caption: 'Print + digital menu spread (2/3)' },
  { src: '/assets/work/beach-bucket-design/menu/menu-4.webp',       caption: 'Print + digital menu spread (3/3)' },
];

export default function DesignPortfolioPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />

      <section className="port-hero">
        <div className="shell port-hero-copy">
          <Reveal><span className="eyebrow">— Selected Work</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display port-hero-title">Hospitality design <em className="accent-italic">portfolio.</em></h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead hero-sub">
              Daily-drink specials, signature cocktail cards, breakfast plate photography, and full menu rebuilds — produced for hospitality clients and ready to drop into any social, web, or in-venue channel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">Section 01 · Daily Drinks</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">A full week of cocktail cards.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead block-sub">
              15 cocktail &amp; daily-promo designs. A full-week social calendar plus seven signature cocktail cards — each piece publishes to Instagram, the website, and in-venue digital boards in one motion. Click any card to view it full-detail.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="port-carousel-wrap product-frame">
              <Carousel images={drinks} autoplay={4000} aspect="4/5" showThumbs className="port-carousel" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">— Section 02 · Breakfast</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">Editorial breakfast <em className="accent-italic">photography.</em></h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead block-sub">
            Four hero plates — The Big Beach, The Sunrise, The Early Bird, The Healthy Surfer. Color-graded for the brand palette and production-ready for menus, social, and online ordering.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="port-carousel-wrap">
            <Carousel images={breakfast} autoplay={4500} aspect="3/2" showThumbs className="port-carousel" />
          </div>
        </Reveal>
      </section>

      <section className="cinema deep">
        <div className="shell">
          <Reveal><span className="eyebrow">Section 03 · Menu</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">A redesigned menu, top to bottom.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead block-sub">
              A redesigned hero menu illustration plus production-ready spreads delivered for both print runs and the digital menu pages.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="port-carousel-wrap product-frame">
              <Carousel images={menus} autoplay={5000} aspect="4/5" showThumbs className="port-carousel" />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="cta-actions" style={{ marginTop: 56 }}>
              <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com?subject=Design%20work%20for%20my%20brand">Start your project</a></Magnetic>
              <Magnetic><a className="ti-btn" href="/projects">See more work</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      <style>{`
        .port-hero { padding: 144px 0 96px; }
        .port-hero-title { font-size: clamp(2.6rem, 6.5vw, 5.4rem); margin: 24px 0 24px; max-width: 16ch; }
        .accent-italic { font-style: italic; font-weight: 400; color: var(--warm); }
        .hero-sub { max-width: 60ch; }
        .block { padding: 144px 0; }
        .block-sub { margin: 14px 0 40px; max-width: 720px; }
        .port-carousel-wrap { max-width: 760px; margin: 0 auto; }
        .port-carousel { max-width: 760px; }
        .cta-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .port-hero { padding: 96px 0 64px; }
          .block { padding: 80px 0; }
        }
      `}</style>
    </main>
  );
}
