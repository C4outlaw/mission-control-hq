import Footer from '../../components/layout/Footer';
import SiteNav from '../../components/layout/SiteNav';
import AboutClient from '../../components/sections/AboutClient';

export const metadata = {
  title: 'About O’Neill Myrie',
  description:
    'Founder of Myrie HQ and General Manager at The Beach Bucket — combining real hospitality operations with modern marketing systems for local businesses across Daytona Beach and Orlando.',
  alternates: { canonical: 'https://www.myriehq.com/about' },
};

export default function AboutPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <AboutClient />
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
