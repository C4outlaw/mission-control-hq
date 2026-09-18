import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import DesignStore from '../../components/sections/DesignStore';
import './store.css';

export const metadata = {
  title: 'The Lost Jamaican Store — 40 Original Designs',
  description:
    'Shop 40 original designs on premium tees, hoodies, mugs, and caps. Pick your design, choose your products, wear your story.',
  alternates: {
    canonical: 'https://www.myriehq.com/store',
  },
  openGraph: {
    title: 'The Lost Jamaican Store — 40 Original Designs',
    description:
      'Shop 40 original designs on premium tees, hoodies, mugs, and caps.',
    url: 'https://www.myriehq.com/store',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Lost Jamaican Store' }],
  },
};

export default function StorePage() {
  return (
    <div className="myrie-marketing site">
      <SiteNav />
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 12px' }}>
            40 Designs. Your Story.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Pick a design you love, then choose which products you want it on —
            tee, hoodie, mug, or cap. Mix and match.
          </p>
        </div>
        <DesignStore />
      </main>
      <Footer />
    </div>
  );
}
