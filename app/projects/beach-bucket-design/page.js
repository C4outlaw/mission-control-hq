import Footer from '../../../components/layout/Footer';
import SiteNav from '../../../components/layout/SiteNav';
import BeachBucketClient from '../../../components/sections/BeachBucketClient';

export const metadata = {
  title: 'Hospitality Brand Design Work · Myrie HQ',
  description: 'Selected design work for hospitality clients — daily drink-special social graphics, signature cocktail cards, breakfast menu photography, and full menu rebuilds.',
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
        @media (max-width: 768px) {
          .port-hero { padding: 96px 0 64px; }
          .block { padding: 80px 0; }
        }
      `}</style>
    </main>
  );
}
