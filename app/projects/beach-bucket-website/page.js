import Footer from '../../../components/layout/Footer';
import SiteNav from '../../../components/layout/SiteNav';
import BeachBucketWebsiteClient from '../../../components/sections/BeachBucketWebsiteClient';

export const metadata = {
  title: 'The Beach Bucket Website · Myrie HQ Portfolio',
  description:
    'A full premium hospitality website we built and shipped for The Beach Bucket — cinematic video hero, editorial menu with 80 photoreal dish photos, interactive gift cards, full English + Spanish translation, deployed on Vercel.',
};

export default function BeachBucketWebsitePage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <BeachBucketWebsiteClient />
      <Footer />

      <style>{`
        /* ───────────────────── Hero ─────────────────────── */
        .bbw-hero { padding: 144px 0 64px; }
        .port-hero-title { font-size: clamp(2.4rem, 6vw, 4.8rem); margin: 24px 0 24px; max-width: 18ch; }
        .accent-italic { font-style: italic; font-weight: 400; color: var(--warm); }
        .hero-sub { max-width: 64ch; }
        .bbw-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
        }
        .live-dot {
          display: inline-block;
          width: 8px; height: 8px; border-radius: 50%;
          background: #ff5757;
          box-shadow: 0 0 0 0 rgba(255,87,87,.6);
          animation: livePulse 2s ease-out infinite;
        }
        @keyframes livePulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,87,87,.5); }
          70%  { box-shadow: 0 0 0 10px rgba(255,87,87,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,87,87,0); }
        }

        /* ──────────────── Device-mockup stage ───────────── */
        .bbw-stage { padding: 24px 0 96px; }
        .device-mockup {
          position: relative;
          max-width: 1180px;
          margin: 0 auto;
          aspect-ratio: 16/10;
        }

        /* Laptop */
        .laptop {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .laptop-screen {
          position: relative;
          width: 100%;
          height: calc(100% - 22px);
          background: #0f1014;
          border-radius: 14px 14px 6px 6px;
          padding: 6px;
          box-shadow:
            inset 0 0 0 2px rgba(255,255,255,0.06),
            0 1px 2px rgba(0,0,0,0.12),
            0 32px 80px rgba(10,20,40,0.30);
          overflow: hidden;
        }
        .laptop-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px;
          background: linear-gradient(180deg, #1a1c22 0%, #14161b 100%);
          border-radius: 8px 8px 0 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .laptop-bar .ltd { width: 11px; height: 11px; border-radius: 50%; }
        .laptop-bar .ltd.r { background: #ff5f56; }
        .laptop-bar .ltd.y { background: #ffbd2e; }
        .laptop-bar .ltd.g { background: #27c93f; }
        .laptop-url {
          margin-left: 14px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.6);
        }
        .laptop-viewport {
          position: relative;
          width: 100%;
          height: calc(100% - 36px);
          background: #f6f2ea;
          overflow: hidden;
          border-radius: 0 0 6px 6px;
        }
        .laptop-viewport iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
        }
        .laptop-base {
          position: relative;
          width: 116%;
          height: 22px;
          margin-left: -8%;
          background: linear-gradient(180deg, #2a2c33 0%, #1a1c22 100%);
          border-radius: 0 0 18px 18px;
          box-shadow: 0 14px 30px rgba(10,20,40,0.20);
        }
        .laptop-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90px; height: 7px;
          background: #0a0b0e;
          border-radius: 0 0 8px 8px;
        }

        /* Phone */
        .phone {
          position: absolute;
          right: -3.5%;
          bottom: -8%;
          width: 18%;
          aspect-ratio: 9/19.5;
          z-index: 5;
          filter: drop-shadow(0 18px 40px rgba(10,20,40,0.25));
        }
        .phone-frame {
          position: relative;
          width: 100%; height: 100%;
          background: #0f1014;
          border-radius: 28px;
          padding: 6px;
          box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.08);
        }
        .phone-notch {
          position: absolute;
          top: 10px; left: 50%;
          transform: translateX(-50%);
          width: 36%; height: 14px;
          background: #0a0b0e;
          border-radius: 12px;
          z-index: 2;
        }
        .phone-viewport {
          width: 100%; height: 100%;
          background: #f6f2ea;
          border-radius: 22px;
          overflow: hidden;
        }
        .phone-viewport iframe {
          width: 100%; height: 100%;
          border: 0;
          display: block;
        }

        /* Skeleton placeholder */
        .iframe-skeleton {
          width: 100%; height: 100%;
          background:
            linear-gradient(110deg, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.10) 50%, rgba(0,0,0,0.04) 70%)
            #ecdec0;
          background-size: 200% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .bbw-mock-caption {
          text-align: center;
          margin: 80px auto 0;
          max-width: 56ch;
          color: var(--muted, rgba(255,255,255,0.55));
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          letter-spacing: 0.02em;
        }

        /* ──────────────── Details / tech stack ──────────── */
        .bbw-details { padding: 96px 0 80px; }
        .bbw-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .bbw-what-lead { max-width: 56ch; margin-top: 20px; }

        .tech-stack {
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
        }
        .tech-row {
          display: grid;
          grid-template-columns: 38% 1fr;
          gap: 24px;
          padding: 16px 0;
          border-top: 1px solid rgba(255,255,255,0.10);
        }
        .tech-row:last-child { border-bottom: 1px solid rgba(255,255,255,0.10); }
        .tech-row dt {
          font-family: 'Manrope', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--muted, rgba(255,255,255,0.55));
          margin: 0;
        }
        .tech-row dd {
          margin: 0;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.05rem;
          line-height: 1.4;
          color: inherit;
        }

        /* ──────────────── Feature grid ──────────────────── */
        .bbw-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 56px;
        }
        .bbw-feat-card {
          padding: 28px 28px 32px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .bbw-feat-num {
          font-family: 'Manrope', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.26em;
          color: var(--warm, #b08a3e);
        }
        .bbw-feat-h {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 400;
          margin: 16px 0 12px;
          letter-spacing: -0.012em;
        }
        .bbw-feat-p {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-weight: 300;
          font-size: 1rem;
          line-height: 1.55;
          color: var(--muted, rgba(255,255,255,0.7));
          margin: 0;
        }

        .bbw-final-cta { padding: 144px 0; }

        /* ──────────────── Tablet ────────────────────────── */
        @media (max-width: 1024px) {
          .device-mockup { aspect-ratio: 16/11; }
          .phone { right: -2%; bottom: -10%; width: 20%; }
          .bbw-details-grid { gap: 56px; }
          .bbw-feat-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }

        /* ──────────────── Mobile ────────────────────────── */
        @media (max-width: 768px) {
          .bbw-hero { padding: 96px 0 48px; }
          .bbw-stage { padding: 16px 0 80px; }

          /* On mobile, hide the laptop and show the phone large + centered.
             Mobile viewers care most about how the site behaves on their phone. */
          .device-mockup {
            aspect-ratio: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 12px 0 24px;
          }
          .laptop { display: none; }
          .phone {
            position: relative;
            right: auto; bottom: auto;
            width: 78%;
            max-width: 320px;
            margin: 0 auto;
          }
          .phone-frame { padding: 8px; border-radius: 38px; }
          .phone-viewport { border-radius: 30px; }
          .phone-notch { top: 14px; height: 22px; }

          .bbw-details { padding: 64px 0 56px; }
          .bbw-details-grid { grid-template-columns: 1fr; gap: 40px; }
          .bbw-feat-grid { grid-template-columns: 1fr; gap: 16px; }
          .bbw-feat-card { padding: 24px 0 24px; }
          .bbw-final-cta { padding: 80px 0; }
          .bbw-mock-caption { margin-top: 40px; }
        }
      `}</style>
    </main>
  );
}
