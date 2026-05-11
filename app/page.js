import Footer from '../components/layout/Footer';
import SiteNav from '../components/layout/SiteNav';
import HeroCinematic from '../components/sections/HeroCinematic';
import HomeShowcase from '../components/sections/HomeShowcase';
import HomeFeatured from '../components/sections/HomeFeatured';
import HomeMagicApp from '../components/sections/HomeMagicApp';
import HomeTestimonials from '../components/sections/HomeTestimonials';
import HomeAboutStrip from '../components/sections/HomeAboutStrip';
import HomeMobileCTA from '../components/sections/HomeMobileCTA';
import HomeServices from '../components/sections/HomeServices';
import HomeProcess from '../components/sections/HomeProcess';
import HomeContact from '../components/sections/HomeContact';

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

      <HomeShowcase />

      <HomeFeatured />

      <hr className="hairline" />

      <HomeMagicApp />

      <HomeServices />

      <HomeTestimonials />

      <HomeProcess />

      <hr className="hairline" />

      <HomeAboutStrip />

      <HomeContact />

      <Footer />

      <HomeMobileCTA />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <style>{`
        .site { min-height: 100vh; }

        .hairline { height: 1px; background: var(--line); border: 0; margin: 0; }

        /* STATS: premium calm strip with hairline dividers between */
        .stats-section { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 40px 24px; max-width: 1200px; margin: 0 auto; width: 100%; }
        .stat { text-align: center; padding: 0 28px; border-left: 1px solid var(--line); }
        .stat:first-child { border-left: 0; }
        .stat-num {
          display: block;
          font-family: var(--font-editorial), Fraunces, serif;
          font-size: clamp(1.9rem, 3.2vw, 2.6rem);
          line-height: 1;
          color: var(--ink);
          font-weight: 500;
          letter-spacing: -0.03em;
        }
        .stat-label { display: block; margin-top: 10px; font-size: 11px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }

        /* SECTION BLOCK: tight, calm vertical rhythm */
        .block { padding: 56px 0; }
        .block-sub { margin: 0 0 32px; max-width: 60ch; }

        /* SERVICES */
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .svc-card { padding: 36px 32px; }
        .svc-title { color: var(--ink); font-size: 20px; font-weight: 600; letter-spacing: -0.018em; margin-bottom: 10px; }
        .svc-card p { color: var(--muted); line-height: 1.55; margin: 0; font-size: 15px; }

        /* SHOWCASE GALLERY: sized so the whole carousel fits one viewport.
           Drinks images at 4/5 aspect inside a 16/10 frame, plus thumbnail
           strip, all visible without scrolling. */
        .showcase-gallery {
          max-width: 980px;
          margin: 24px auto 0;
          /* Dramatic shadow under the gallery on the dark background */
          filter: drop-shadow(0 4px 8px rgba(0,0,0,.45)) drop-shadow(0 60px 100px rgba(0,0,0,.7));
        }
        .showcase-gallery .carousel-frame {
          background: #0c0c0c !important;       /* matches cinema canvas: images float */
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
        .showcase-cta { display: flex; justify-content: center; margin-top: 40px; }
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

        /* APP: calm focal point for the live Magic Menu */
        .app-section { padding: 64px 0 56px; background: linear-gradient(180deg, #ffffff 0%, #f4f5f8 100%); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .app-headline { font-size: clamp(1.9rem, 3.6vw, 2.9rem); line-height: 1.06; letter-spacing: -0.032em; margin: 16px 0 16px; max-width: 24ch; color: var(--ink); }
        .app-sub { margin: 0 0 28px; max-width: 56ch; }
        .app-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
        .app-frame {
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: #fff;
          /* Stay within the shell on every screen: never wider than the parent */
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05), 0 30px 90px rgba(20,30,60,0.18);
          transform: translateZ(0);
          contain: layout paint;       /* nothing inside escapes this box */
        }
        .app-bar { display: flex; align-items: center; gap: 8px; padding: 14px 18px; background: rgba(250,250,247,0.96); border-bottom: 1px solid var(--line); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
        .app-bar .dot { width: 12px; height: 12px; border-radius: 50%; }
        .app-bar .red { background: #ff5f57; } .app-bar .amber { background: #febc2e; } .app-bar .green { background: #28c840; }
        .app-bar .url { flex: 1; margin: 0 14px; padding: 7px 16px; background: #fff; border-radius: 10px; font-size: 13px; color: var(--muted); font-family: 'SF Mono', Menlo, monospace; border: 1px solid var(--line); }
        .app-bar .open-tab { font-size: 12px; color: var(--ink); text-decoration: none; font-weight: 500; padding: 7px 12px; border-radius: 8px; transition: background .2s; }
        .app-bar .open-tab:hover { background: rgba(10,10,10,.05); }
        .app-frame iframe {
          display: block;
          width: 100%;
          /* Sized so the iframe (chrome + content) fits one viewport, so the
             user can stop scrolling on it and see the whole app at once. */
          height: clamp(560px, 78vh, 900px);
          border: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(176,138,62,.08) 0%, transparent 70%),
            linear-gradient(180deg, #0b0f17 0%, #050810 100%);
        }
        @media (max-width: 920px) {
          .app-frame iframe { height: clamp(520px, 80vh, 780px); }
        }

        /* Menu Magic outputs gallery: real generated cards, 4-up grid */
        .mm-outputs-head {
          max-width: 880px;
          margin: 56px auto 24px;
          text-align: left;
        }
        .mm-outputs-h {
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-weight: 500;
          font-size: clamp(1.4rem, 2.4vw, 2rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 8px 0 0;
        }
        .mm-outputs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .mm-output {
          margin: 0;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 12px 36px rgba(20,30,60,0.06);
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease;
        }
        .mm-output:hover {
          transform: translateY(-3px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 20px 50px rgba(20,30,60,0.10);
        }
        .mm-output img {
          display: block;
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          object-position: center;
        }
        .mm-output figcaption {
          padding: 14px 18px 16px;
          font-family: var(--font-editorial), Fraunces, Georgia, serif;
          font-weight: 500;
          font-style: italic;
          font-size: 15px;
          color: var(--ink);
          letter-spacing: -0.012em;
        }
        @media (max-width: 1100px) {
          .mm-outputs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .mm-outputs-grid { grid-template-columns: 1fr; }
        }

        /* TESTIMONIALS */
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
        .testi-card { padding: 36px 32px; background: var(--bg-card); border: 1px solid var(--line); border-radius: 22px; transition: border-color .25s ease, transform .35s ease; }
        .testi-card:hover { border-color: var(--line-2); transform: translateY(-2px); }
        .testi-quote { color: var(--ink-2); line-height: 1.55; font-size: 17px; margin: 0 0 22px; letter-spacing: -0.012em; }
        .testi-author strong { color: var(--ink); display: block; font-size: 14px; font-weight: 600; }
        .testi-author span { color: var(--muted); font-size: 13px; }

        /* PROCESS: minimal, type-led */
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
        .process-step { padding: 36px 28px; border-left: 1px solid var(--line); transition: border-color .2s; }
        .process-step:first-child { border-left: 0; padding-left: 0; }
        .process-num { font-family: var(--font-body); font-size: 13px; color: var(--muted); font-weight: 600; letter-spacing: 0.05em; margin-bottom: 12px; }
        .process-title { font-size: 22px; color: var(--ink); font-weight: 700; letter-spacing: -0.025em; margin: 0 0 10px; }
        .process-step p { color: var(--muted); margin: 0; font-size: 15px; line-height: 1.55; }

        /* ABOUT */
        .about-block { padding: 56px 0; }
        .about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 56px; align-items: center; padding-top: 8px; }
        .about-lead { margin: 0 0 20px; }
        .about-photo { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 24px 50px rgba(0,0,0,0.06); }

        /* CONTACT */
        .contact-block { background: var(--bg-soft); padding: 64px 0; }
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
