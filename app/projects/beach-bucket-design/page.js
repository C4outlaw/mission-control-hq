import Footer from '../../../components/layout/Footer';
import SiteNav from '../../../components/layout/SiteNav';
import BeachBucketClient from '../../../components/sections/BeachBucketClient';

export const metadata = {
  title: 'Hospitality Brand Design Work · Myrie HQ',
  description: 'Selected design work for hospitality clients: daily drink-special social graphics, signature cocktail cards, breakfast menu photography, and full menu rebuilds.',
};

export default function DesignPortfolioPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <BeachBucketClient />
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

        /* Live-site showcase */
        .live-site { padding: 120px 0; }
        .live-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 64px;
          align-items: center;
        }
        .live-copy .eyebrow.live-pulse {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .live-dot {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #ff5757;
          box-shadow: 0 0 0 0 rgba(255,87,87,.6);
          animation: livePulse 2s ease-out infinite;
        }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,87,87,.5); }
          70%  { box-shadow: 0 0 0 10px rgba(255,87,87,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,87,87,0); }
        }
        .live-h { font-size: clamp(2rem, 4.4vw, 3.4rem); margin: 18px 0 18px; max-width: 14ch; }
        .live-lede { max-width: 56ch; }
        .live-cta { justify-content: flex-start; margin-top: 36px; }

        /* Browser-frame video card */
        .live-frame {
          display: block;
          background: #0f1014;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 24px 60px rgba(20,30,60,0.22);
          transition: transform .4s ease, box-shadow .4s ease;
          text-decoration: none;
        }
        .live-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.14), 0 28px 70px rgba(20,30,60,0.28);
        }
        .live-frame-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px;
          background: linear-gradient(180deg, #1a1c22 0%, #14161b 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .live-frame-bar .dot {
          width: 12px; height: 12px; border-radius: 50%;
        }
        .live-frame-bar .dot.r { background: #ff5f56; }
        .live-frame-bar .dot.y { background: #ffbd2e; }
        .live-frame-bar .dot.g { background: #27c93f; }
        .live-frame-url {
          margin-left: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.55);
        }
        .live-frame-video {
          display: block;
          width: 100%;
          aspect-ratio: 16/10;
          object-fit: cover;
          background: #000;
        }

        @media (max-width: 900px) {
          .live-grid { grid-template-columns: 1fr; gap: 36px; }
          .live-cta { justify-content: center; }
          .live-copy { text-align: center; }
          .live-h { margin-left: auto; margin-right: auto; }
          .live-lede { margin-left: auto; margin-right: auto; }
        }

        @media (max-width: 768px) {
          .port-hero { padding: 96px 0 64px; }
          .block { padding: 80px 0; }
          .live-site { padding: 80px 0; }
        }
      `}</style>
    </main>
  );
}
