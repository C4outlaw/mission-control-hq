import Reveal from '../components/motion/Reveal';
import { Stagger, StaggerItem } from '../components/motion/Stagger';
import Counter from '../components/motion/Counter';
import Magnetic from '../components/motion/Magnetic';
import Footer from '../components/layout/Footer';
import SiteNav from '../components/layout/SiteNav';
import HeroCinematic from '../components/sections/HeroCinematic';
import Carousel from '../components/motion/Carousel';

const services = [
  {
    num: '01',
    title: 'Websites',
    italic: 'that convert.',
    copy: 'Mobile-first sites for restaurants, bars, and local brands — menus, ordering, reservations, daily specials, all stitched into one fast, hospitable experience.',
    proof: 'Live at The Beach Bucket Bar & Grill',
  },
  {
    num: '02',
    title: 'Local SEO',
    italic: 'that ranks.',
    copy: 'Google Business Profile, citations, on-page schema, and review-velocity systems built for the Daytona + Orlando query layer — not generic SaaS playbooks.',
    proof: '3× lift in average local visibility',
  },
  {
    num: '03',
    title: 'Brand creative',
    italic: 'that sells.',
    copy: 'Daily-specials motion ads, signature cocktail cards, plate photography, weekly social — produced in-house and ready for print, IG, and the digital boards by service.',
    proof: '50+ hospitality assets shipped',
  },
  {
    num: '04',
    title: 'Marketing automation',
    italic: 'that ships.',
    copy: 'Specials, events, posts, email, review responses — running on autopilot so you stay on the floor and the marketing keeps moving.',
    proof: '7-day rolling content engine',
  },
];

const stats = [
  { number: '50+',  label: 'Projects delivered' },
  { number: '3X',   label: 'Average ROI lift' },
  { number: '2',    label: 'Florida markets' },
  { number: '100%', label: 'Client retention' },
];

const testimonials = [
  { quote: "Myrie HQ completely transformed our online presence. We saw a 40% increase in online orders.", name: "Restaurant Owner", title: "Daytona Beach, FL" },
  { quote: "The local SEO work was a game-changer. We went from page 3 to the top of Google Maps. The phone hasn't stopped ringing.", name: "Local Business Owner", title: "Orlando, FL" },
  { quote: "What sets Myrie apart is the automation. Our marketing runs itself now — social posts, email campaigns, review responses — all on autopilot.", name: "Franchise Operator", title: "Central Florida" },
];

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'We audit your brand, competitors, and growth opportunities.' },
  { step: '02', title: 'Strategy',  desc: 'Custom roadmap for your website, SEO, and marketing systems.' },
  { step: '03', title: 'Build',     desc: 'Premium design and development with weekly progress updates.' },
  { step: '04', title: 'Launch',    desc: 'Go live, optimize, and scale with data-driven marketing.' },
];

// Daily-specials carousel — each weekday is a Grok-rendered cinematic motion ad.
// `video` overrides `src` for playback; `src` is also used as the lightbox poster
// and the thumbnail-strip preview.
const showcaseCarousel = [
  { src: '/assets/work/beach-bucket-design/drinks/monday.png',    video: '/assets/work/beach-bucket-design/drink-ads/monday.mp4',    alt: 'Monday specials motion ad',     section: 'NO. 01 · MONDAY',     headline: 'Monday — Grape Pop · Yuengling' },
  { src: '/assets/work/beach-bucket-design/drinks/tuesday.png',   video: '/assets/work/beach-bucket-design/drink-ads/tuesday.mp4',   alt: 'Tuesday specials motion ad',    section: 'NO. 02 · TUESDAY',    headline: 'Tuesday — Cucumber Cooler · Ultra Draft' },
  { src: '/assets/work/beach-bucket-design/drinks/wednesday.png', video: '/assets/work/beach-bucket-design/drink-ads/wednesday.mp4', alt: 'Wednesday specials motion ad',  section: 'NO. 03 · WEDNESDAY',  headline: 'Wednesday — Signature pour' },
  { src: '/assets/work/beach-bucket-design/drinks/thursday.png',  video: '/assets/work/beach-bucket-design/drink-ads/thursday.mp4',  alt: 'Thursday specials motion ad',   section: 'NO. 04 · THURSDAY',   headline: 'Thursday — Raspberry Lemonade · Coors' },
  { src: '/assets/work/beach-bucket-design/drinks/friday.png',    video: '/assets/work/beach-bucket-design/drink-ads/friday.mp4',    alt: 'Friday specials motion ad',     section: 'NO. 05 · FRIDAY',     headline: 'Friday — weekend pour' },
  { src: '/assets/work/beach-bucket-design/drinks/saturday.png',  video: '/assets/work/beach-bucket-design/drink-ads/saturday.mp4',  alt: 'Saturday specials motion ad',   section: 'NO. 06 · SATURDAY',   headline: 'Saturday — Blueberry Bay Breeze · Landshark' },
  { src: '/assets/work/beach-bucket-design/drinks/sunday.png',    video: '/assets/work/beach-bucket-design/drink-ads/sunday.mp4',    alt: 'Sunday specials motion ad',     section: 'NO. 07 · SUNDAY',     headline: 'Sunday — Brunch Bucket · Bottomless mimosas' },
  { src: '/assets/work/beach-bucket-design/drinks/blueberry-bay-breeze.png', alt: 'Blueberry Bay Breeze', section: 'NO. 08 · SIGNATURE', headline: 'Blueberry Bay Breeze' },
  { src: '/assets/work/beach-bucket-design/drinks/cucumber-cooler.png',     alt: 'Cucumber Cooler',      section: 'NO. 09 · SIGNATURE', headline: 'Cucumber Cooler' },
  { src: '/assets/work/beach-bucket-design/drinks/citrus-seabreeze.png',    alt: 'Citrus Seabreeze',     section: 'NO. 10 · SIGNATURE', headline: 'Citrus Seabreeze' },
  { src: '/assets/work/beach-bucket-design/drinks/orange-crush.png',        alt: 'Orange Crush',         section: 'NO. 11 · SIGNATURE', headline: 'Orange Crush' },
];

const featured = [
  {
    title: 'Hospitality Brand Designs',
    tag: 'Brand · Photo · Menus',
    copy: 'Daily drinks specials, signature cocktail cards, breakfast plate photography, and full menu rebuilds.',
    href: '/projects/beach-bucket-design',
    label: 'View design portfolio',
    image: '/assets/work/beach-bucket-design/drinks/all-drinks.png',
  },
  {
    title: 'Magic Menu — image results',
    tag: 'SaaS · Real AI Output',
    copy: 'Hit generate → photorealistic dishes, paired drinks, branded recipe cards, full cookbooks, food-cost tables, and ready-to-post marketing copy. Real outputs from the live app.',
    href: '/#try-app',
    label: 'Try the live app',
    carousel: [
      { src: '/assets/work/magic-menu/02b-generator-result.jpg', caption: 'AI Generator — 4 cocktails, photorealistic plating' },
      { src: '/assets/work/magic-menu/09-jamaican-dishes.jpg',   caption: 'Generator — 5 authentic Jamaican dishes' },
      { src: '/assets/work/magic-menu/03-recipe-cards.png',      caption: 'Recipe Cards — branded, scaleable, printable' },
      { src: '/assets/work/magic-menu/04-cookbook.png',          caption: 'Cookbook — Print Book + Download PDF' },
      { src: '/assets/work/magic-menu/05-drink-book.png',        caption: 'Drink Book — separate or paired with food' },
      { src: '/assets/work/magic-menu/06-food-cost.png',         caption: 'Food Cost — calculator + AI generator + OCR scan' },
      { src: '/assets/work/magic-menu/07-beverage-cost.png',     caption: 'Beverage Cost — same flow, scoped to drinks' },
      { src: '/assets/work/magic-menu/08-marketing.png',         caption: 'Marketing Hub — auto-write + publish to FB / IG / TikTok / X / LinkedIn' },
      { src: '/assets/work/magic-menu/01-dashboard.png',         caption: 'Dashboard — total recipes, food cost, monthly revenue' },
    ],
  },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Myrie HQ',
  url: 'https://www.myriehq.com',
  areaServed: ['Daytona Beach, FL', 'Orlando, FL'],
  serviceType: ['Restaurant Web Design', 'Bar Marketing', 'Local SEO', 'Brand Creative', 'Marketing Automation'],
  telephone: '+1-386-795-8727',
  email: 'myriework@gmail.com',
};

export default function HomePage() {
  return (
    <main className="myrie-marketing site">
      <SiteNav />

      <HeroCinematic />

      <hr className="hairline" />

      <section className="shell stats-section">
        {stats.map((s) => (
          <Reveal key={s.label} className="stat" delay={0.05}>
            <span className="stat-num display"><Counter value={s.number} /></span>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </section>

      <section id="showcase" className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">Selected Work</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">A gallery of designs we&apos;ve shipped.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead block-sub">
              Daily drinks promos, signature cocktail cards, social graphics — production-ready, brand-consistent, and printed on the bar tomorrow morning. Click any piece to view it full-detail.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="showcase-gallery">
              <Carousel
                images={showcaseCarousel.map(p => ({ src: p.src, video: p.video, alt: p.alt, caption: p.headline }))}
                autoplay={5000}
                aspect="16/10"
                showThumbs
                rounded={8}
                className="showcase-carousel"
              />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="showcase-cta">
              <Magnetic><a className="ti-btn outline" href="/projects/beach-bucket-design">View full design portfolio →</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">Featured projects</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">Real brands. Real results.</h2>
        </Reveal>
        <Stagger className="featured-grid" stagger={0.1}>
          {featured.map((item) => (
            <StaggerItem as="article" key={item.title} className="feature-card">
              {item.carousel ? (
                <>
                  <div className="thumb thumb-carousel">
                    <Carousel
                      images={item.carousel}
                      autoplay={4500}
                      aspect="16/10"
                      rounded={0}
                      className="feature-carousel"
                    />
                  </div>
                  <a href={item.href} className="feature-link feature-link-body">
                    <div className="feature-body">
                      <span className="feature-tag">{item.tag}</span>
                      <h3 className="feature-title">{item.title}</h3>
                      <p>{item.copy}</p>
                      <span className="feature-arrow">{item.label} →</span>
                    </div>
                  </a>
                </>
              ) : (
                <a href={item.href} className="feature-link">
                  <div className="thumb" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="feature-body">
                    <span className="feature-tag">{item.tag}</span>
                    <h3 className="feature-title">{item.title}</h3>
                    <p>{item.copy}</p>
                    <span className="feature-arrow">{item.label} →</span>
                  </div>
                </a>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <hr className="hairline" />

      <section id="try-app" className="app-section">
        <div className="shell">
          <Reveal><span className="eyebrow">Try it live</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="app-headline display">An entire restaurant studio in <em className="accent-italic">one app.</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead app-sub">
              Speak or type a prompt — Magic Menu generates entire dishes with photorealistic plating, paired drinks, scaled servings, food-cost math, and a Facebook/Instagram/TikTok caption ready to post. Built for operators who want to look premium without the studio overhead.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mm-features">
              <div className="mm-feature"><span className="mm-num">01</span><div><h4>AI recipe + drink generator</h4><p>&ldquo;Make 4 signature beach bar cocktails&rdquo; → 4 dishes, photorealistic images, ingredients, instructions. Voice or text.</p></div></div>
              <div className="mm-feature"><span className="mm-num">02</span><div><h4>Auto-paired drinks</h4><p>Every dish ships with a drink that goes with it — the AI thinks like a sommelier.</p></div></div>
              <div className="mm-feature"><span className="mm-num">03</span><div><h4>Scale servings</h4><p>One plate or fifty. Re-cost in real time.</p></div></div>
              <div className="mm-feature"><span className="mm-num">04</span><div><h4>Cookbook + drink book PDFs</h4><p>One click — branded PDFs ready for print or sharing. Food and drinks together or split.</p></div></div>
              <div className="mm-feature"><span className="mm-num">05</span><div><h4>Food cost from your order guide</h4><p>Upload your invoice — the calculator scores margin per dish. Or scan a paper recipe via OCR.</p></div></div>
              <div className="mm-feature"><span className="mm-num">06</span><div><h4>Marketing hub</h4><p>Pick a dish → AI writes the Facebook / IG / TikTok / X / LinkedIn post. Connect socials and publish from inside the app.</p></div></div>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mm-gallery">
              <Carousel
                images={[
                  { src: '/assets/work/magic-menu/02b-generator-result.jpg', alt: 'AI Generator — 4 cocktails generated with photorealistic images', caption: 'AI Generator — 4 cocktails, photorealistic, in seconds' },
                  { src: '/assets/work/magic-menu/03-recipe-cards.png',      alt: 'Recipe cards',                                                       caption: 'Recipe Cards — branded, scaleable, printable' },
                  { src: '/assets/work/magic-menu/04-cookbook.png',          alt: 'Cookbook view with download PDF',                                    caption: 'Cookbook — Print Book + Download PDF' },
                  { src: '/assets/work/magic-menu/05-drink-book.png',        alt: 'Drink Book',                                                         caption: 'Drink Book — separate or paired with food' },
                  { src: '/assets/work/magic-menu/06-food-cost.png',         alt: 'Food cost calculator',                                               caption: 'Food Cost — calculator + AI generator + OCR scan' },
                  { src: '/assets/work/magic-menu/08-marketing.png',         alt: 'Marketing Hub with social platform connections',                     caption: 'Marketing Hub — auto-write + publish to FB / IG / TikTok / X / LinkedIn' },
                  { src: '/assets/work/magic-menu/01-dashboard.png',         alt: 'Dashboard overview',                                                 caption: 'Dashboard — total recipes, avg food cost, monthly revenue' },
                ]}
                autoplay={5500}
                aspect="16/10"
                showThumbs
                rounded={10}
                className="mm-carousel"
              />
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="app-actions">
              <Magnetic strength={0.14}><a className="ti-btn primary" href="https://savory-studio.vercel.app/dashboard" target="_blank" rel="noopener noreferrer">Open full app ↗</a></Magnetic>
              <Magnetic strength={0.14}><a className="ti-btn" href="/magic-menu">Read the app spec</a></Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <p className="mm-live-label">— Or use it right here, no signup:</p>
            <div className="app-frame">
              <div className="app-bar">
                <span className="dot red" /><span className="dot amber" /><span className="dot green" />
                <span className="url">savory-studio.vercel.app/dashboard</span>
                <a className="open-tab" href="https://savory-studio.vercel.app/dashboard" target="_blank" rel="noopener noreferrer">Open ↗</a>
              </div>
              <iframe
                src="https://savory-studio.vercel.app/dashboard"
                title="Magic Menu — live demo"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="clipboard-read; clipboard-write"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="shell">
          <div className="services-head">
            <Reveal><span className="eyebrow">— What we build</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="services-headline">
                Four systems. <em className="accent-italic">One studio.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="lead services-lede">
                Built by a GM who runs a beachfront floor every weekend — for the restaurants and local brands that want to look premium and convert.
              </p>
            </Reveal>
          </div>
          <Stagger className="services-grid" stagger={0.08}>
            {services.map((s) => (
              <StaggerItem as="article" key={s.title} className="svc-card">
                <span className="svc-num">{s.num}</span>
                <h3 className="svc-title"><span>{s.title}</span> <em className="accent-italic">{s.italic}</em></h3>
                <p className="svc-copy">{s.copy}</p>
                <p className="svc-proof"><span className="svc-arrow" aria-hidden="true">→</span>{s.proof}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="cinema deep">
        <div className="shell">
          <Reveal><span className="eyebrow">Client Love</span></Reveal>
          <Reveal delay={0.1}><h2 className="tropical-h2">What our clients say.</h2></Reveal>
          <Stagger className="testimonials-grid" stagger={0.1}>
            {testimonials.map((t, i) => (
              <StaggerItem as="article" key={i} className="testi-card">
                <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testi-author">
                  <strong>{t.name}</strong>
                  <span>{t.title}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">How we work</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">Simple. Proven. Repeatable.</h2></Reveal>
        <Stagger className="process-grid" stagger={0.08}>
          {processSteps.map((s) => (
            <StaggerItem key={s.step} className="process-step">
              <div className="process-num">{s.step}</div>
              <h3 className="process-title">{s.title}</h3>
              <p>{s.desc}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <hr className="hairline" />

      <section id="about" className="shell block about-block">
        <Reveal><span className="eyebrow">About</span></Reveal>
        <div className="about-grid">
          <Reveal>
            <h2 className="tropical-h2">O&apos;Neill Myrie.</h2>
            <p className="lead about-lead">
              General Manager at The Beach Bucket. Founder of Myrie HQ. Hospitality operator turned
              marketing builder — combining real GM experience with modern marketing systems for local
              businesses across Florida.
            </p>
            <a className="ti-btn outline" href="/about">Read full story →</a>
          </Reveal>
          <Reveal delay={0.15}>
            <img src="/assets/profile/myrie.jpg" alt="O'Neill Myrie" className="about-photo" />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="contact-block">
        <div className="shell contact-inner">
          <Reveal><h2 className="tropical-h2 contact-title">Ready to grow?</h2></Reveal>
          <Reveal delay={0.1}><p className="lead contact-sub">Let&apos;s rebuild your site and growth strategy with a premium, modern approach.</p></Reveal>
          <Reveal delay={0.2}>
            <div className="contact-actions">
              <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a></Magnetic>
              <Magnetic><a className="ti-btn outline" href="tel:+13867958727">+1 (386) 795-8727</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      <div className="mobile-cta">
        <a className="ti-btn primary" href="mailto:myriework@gmail.com">Start project</a>
        <a className="ti-btn outline" href="/projects">See work</a>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <style>{`
        .site { min-height: 100vh; }

        .hairline { height: 1px; background: var(--line); border: 0; margin: 0; }

        /* STATS — premium calm strip with hairline dividers between */
        .stats-section { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 80px 24px; max-width: 1200px; margin: 0 auto; width: 100%; }
        .stat { text-align: center; padding: 0 28px; border-left: 1px solid var(--line); }
        .stat:first-child { border-left: 0; }
        .stat-num {
          display: block;
          font-family: var(--font-editorial), Fraunces, serif;
          font-size: clamp(2.4rem, 4.4vw, 3.6rem);
          line-height: 1;
          color: var(--ink);
          font-weight: 500;
          letter-spacing: -0.035em;
        }
        .stat-label { display: block; margin-top: 14px; font-size: 12px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }

        /* SECTION BLOCK — generous vertical breathing room */
        .block { padding: 110px 0; }
        .block-sub { margin: 0 0 56px; max-width: 60ch; }

        /* SERVICES */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .svc-card { padding: 36px 32px; }
        .svc-title { color: var(--ink); font-size: 20px; font-weight: 600; letter-spacing: -0.018em; margin-bottom: 10px; }
        .svc-card p { color: var(--muted); line-height: 1.55; margin: 0; font-size: 15px; }

        /* SHOWCASE GALLERY — premium pronounced carousel on cinema black */
        .showcase-gallery {
          max-width: 1400px;
          margin: 32px auto 0;
          /* Dramatic shadow under the gallery on the dark background */
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.45)) drop-shadow(0 60px 100px rgba(0,0,0,.7));
        }
        .showcase-gallery .carousel-frame {
          background: #0c0c0c !important;       /* matches cinema canvas — images float */
          border: 1px solid rgba(255,255,255,.06) !important;
          border-radius: 8px !important;
        }
        .showcase-gallery .carousel-frame img {
          padding: 16px !important;             /* slight breathing room */
        }
        /* Make thumbs read on cinema dark bg */
        .showcase-gallery .carousel-thumbs button {
          background: #1a1a1a !important;
          border-color: rgba(255,255,255,.12) !important;
          width: 96px !important; height: 96px !important;
        }
        .showcase-gallery .carousel-thumbs button[aria-label][style*="b08a3e"],
        .showcase-gallery .carousel-thumbs button:focus {
          border-color: var(--warm) !important;
        }
        .showcase-cta { display: flex; justify-content: center; margin-top: 64px; }
        @media (max-width: 920px) {
          .showcase-gallery { max-width: 100%; }
          .showcase-gallery .carousel-frame img { padding: 12px !important; }
        }

        /* FEATURED */
        .featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 16px; }
        .feature-card { background: var(--bg-card); border-radius: 24px; border: 1px solid var(--line); overflow: hidden; transition: border-color .25s ease, transform .35s ease; }
        .feature-card:hover { border-color: var(--line-2); transform: translateY(-4px); }
        .feature-link { display: block; text-decoration: none; color: inherit; }
        .feature-card .thumb { aspect-ratio: 16/10; background-size: cover; background-position: center; }
        .feature-card .thumb-carousel { aspect-ratio: 16/10; background: #0c0c0c; padding: 0; overflow: hidden; }
        .feature-card .thumb-carousel .carousel-frame {
          background: #0c0c0c !important;
          border: 0 !important;
          border-radius: 0 !important;
        }
        .feature-card .thumb-carousel .carousel-frame img { padding: 0 !important; object-fit: cover !important; }
        .feature-card .thumb-carousel .carousel-zoom-hint { display: none; }
        .feature-link-body { display: block; text-decoration: none; color: inherit; }
        .feature-body { padding: 28px 30px 32px; }
        .feature-tag { display: inline-block; font-size: 12px; letter-spacing: .08em; color: var(--muted); margin-bottom: 8px; text-transform: uppercase; }
        .feature-title { font-size: clamp(1.4rem, 2vw, 1.8rem); color: var(--ink); font-weight: 700; letter-spacing: -0.025em; margin: 0 0 10px; line-height: 1.1; }
        .feature-card p { color: var(--muted); margin: 0 0 18px; line-height: 1.5; font-size: 15px; }
        .feature-arrow { font-size: 14px; color: var(--ink); font-weight: 500; }

        /* APP — hero-sized, the live Magic Menu is the focal point */
        .app-section { padding: 130px 0 130px; background: linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .app-headline { font-size: clamp(2.4rem, 5vw, 4.4rem); line-height: 1.04; letter-spacing: -0.04em; margin: 18px 0 18px; max-width: 22ch; color: var(--ink); }
        .app-sub { margin: 0 0 36px; max-width: 56ch; }
        .app-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; }
        .app-frame { border-radius: 24px; overflow: hidden; border: 1px solid var(--line); background: #fff; max-width: 1240px; margin: 0 auto; box-shadow: 0 2px 6px rgba(0,0,0,0.05), 0 30px 90px rgba(20,30,60,0.18); transform: translateZ(0); }
        .app-bar { display: flex; align-items: center; gap: 8px; padding: 14px 18px; background: rgba(250,250,247,0.96); border-bottom: 1px solid var(--line); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .app-bar .dot { width: 12px; height: 12px; border-radius: 50%; }
        .app-bar .red { background: #ff5f57; } .app-bar .amber { background: #febc2e; } .app-bar .green { background: #28c840; }
        .app-bar .url { flex: 1; margin: 0 14px; padding: 7px 16px; background: #fff; border-radius: 10px; font-size: 13px; color: var(--muted); font-family: 'SF Mono', Menlo, monospace; border: 1px solid var(--line); }
        .app-bar .open-tab { font-size: 12px; color: var(--ink); text-decoration: none; font-weight: 500; padding: 7px 12px; border-radius: 8px; transition: background .2s; }
        .app-bar .open-tab:hover { background: rgba(10,10,10,.05); }
        .app-frame iframe {
          display: block; width: 100%; height: 880px; border: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(176,138,62,.08) 0%, transparent 70%),
            linear-gradient(180deg, #0b0f17 0%, #050810 100%);
        }
        @media (max-width: 920px) {
          .app-frame iframe { height: 580px; }
        }

        /* Magic Menu features list — quick-scan numbered grid */
        .mm-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin: 56px 0 64px;
          border-top: 1px solid var(--line);
        }
        .mm-feature {
          display: flex;
          gap: 14px;
          padding: 28px 24px 28px 0;
          border-bottom: 1px solid var(--line);
          border-right: 1px solid var(--line);
        }
        .mm-feature:nth-child(3n) { border-right: 0; padding-right: 0; }
        .mm-feature:nth-child(n+1) { padding-left: 0; }
        .mm-feature:nth-child(3n+2),
        .mm-feature:nth-child(3n) { padding-left: 24px; }
        .mm-num {
          flex-shrink: 0;
          font-family: var(--font-editorial), Fraunces, serif;
          font-style: italic;
          font-weight: 500;
          font-size: 18px;
          color: var(--warm);
          line-height: 1;
          margin-top: 4px;
          letter-spacing: -0.02em;
        }
        .mm-feature h4 {
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-weight: 500;
          font-size: 18px;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 6px;
        }
        .mm-feature p {
          margin: 0;
          color: var(--muted);
          line-height: 1.5;
          font-size: 14px;
          letter-spacing: -0.005em;
        }
        @media (max-width: 920px) {
          .mm-features { grid-template-columns: 1fr; margin: 40px 0 48px; }
          .mm-feature { padding: 24px 0 !important; border-right: 0 !important; }
        }

        /* Magic Menu screenshot gallery */
        .mm-gallery {
          max-width: 1100px;
          margin: 0 auto 56px;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.10)) drop-shadow(0 32px 80px rgba(20,30,60,.12));
        }
        .mm-gallery .carousel-frame {
          background: #0c0c0c !important;
          border: 1px solid rgba(10,10,10,0.08) !important;
        }
        .mm-gallery .carousel-frame img { padding: 0 !important; object-fit: cover !important; }
        .mm-live-label {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 24px 0 16px;
        }

        /* TESTIMONIALS */
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
        .testi-card { padding: 36px 32px; background: var(--bg-card); border: 1px solid var(--line); border-radius: 22px; transition: border-color .25s ease, transform .35s ease; }
        .testi-card:hover { border-color: var(--line-2); transform: translateY(-2px); }
        .testi-quote { color: var(--ink-2); line-height: 1.55; font-size: 17px; margin: 0 0 22px; letter-spacing: -0.012em; }
        .testi-author strong { color: var(--ink); display: block; font-size: 14px; font-weight: 600; }
        .testi-author span { color: var(--muted); font-size: 13px; }

        /* PROCESS — minimal, type-led */
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        .process-step { padding: 36px 28px; border-left: 1px solid var(--line); transition: border-color .2s; }
        .process-step:first-child { border-left: 0; padding-left: 0; }
        .process-num { font-family: var(--font-body); font-size: 13px; color: var(--muted); font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
        .process-title { font-size: 22px; color: var(--ink); font-weight: 700; letter-spacing: -0.025em; margin: 0 0 10px; }
        .process-step p { color: var(--muted); margin: 0; font-size: 15px; line-height: 1.55; }

        /* ABOUT */
        .about-block { padding: 110px 0; }
        .about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: center; padding-top: 12px; }
        .about-lead { margin: 0 0 28px; }
        .about-photo { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 24px 50px rgba(0,0,0,0.06); }

        /* CONTACT */
        .contact-block { background: var(--bg-soft); padding: 130px 0; }
        .contact-inner { text-align: center; }
        .contact-block .contact-title { color: var(--ink); margin-bottom: 16px; max-width: none; }
        .contact-block .contact-sub { color: var(--muted); max-width: 580px; margin: 0 auto; }
        .contact-actions { margin-top: 36px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        .mobile-cta { display: none; }

        @media (max-width: 920px) {
          .hero-cinema { min-height: 90vh; padding-top: 120px; padding-bottom: 80px; }
          .hero-bg-image { background-position: 30% center; }
          .hero-bg-veil { background:
            linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.7) 100%); }
          .hero-trust { font-size: 12px; }
          .stats-section { grid-template-columns: repeat(2, 1fr); gap: 32px 0; padding: 56px 20px; }
          .stat { padding: 0 16px; }
          .stat:nth-child(odd) { border-left: 0; }
          .stat:nth-child(3) { border-top: 1px solid var(--line); padding-top: 32px; }
          .stat:nth-child(4) { border-top: 1px solid var(--line); padding-top: 32px; }
          .block { padding: 70px 0; }
          .featured-grid { grid-template-columns: 1fr; }
          .browser-frame iframe { height: 520px; }
          .browser-bar .url { font-size: 11px; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: 1fr; }
          .process-step { border-left: 0 !important; border-top: 1px solid var(--line); padding: 24px 0; }
          .process-step:first-child { border-top: 0; padding-top: 0; }
          .about-grid { grid-template-columns: 1fr; gap: 36px; }
          .about-photo { max-width: 360px; }
          .mobile-cta {
            position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 20;
            display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 8px;
            border-radius: 16px; background: rgba(255,255,255,.96); backdrop-filter: blur(10px);
            border: 1px solid var(--line); box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          }
          .contact-block { padding: 80px 0 130px; }
        }
      `}</style>
    </main>
  );
}
