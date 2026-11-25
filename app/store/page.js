import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import StoreClient from '../../components/sections/StoreClient';
import './store.css';
import './store-dark.css';
import '../studio/studio.css';

export const metadata = {
  title: 'The Lost Jamaican Store',
  description: 'Shop original designs on premium tees, hoodies, mugs, and caps.',
  alternates: {
    canonical: 'https://www.myriehq.com/store',
  },
};

export default function StorePage() {
  return (
    // Dark is the store default. Rendered here rather than set from an effect
    // so the page never paints light first and then flips.
    <div className="myrie-marketing site" data-store-theme="dark">
      <SiteNav />
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <aside className="studio-store-banner" aria-label="Creative studio"><span>Need a video or a better website?</span><a href="/studio">Watch the work & see rates ↗</a><a href="/downloads/The-Lost-Jamaican-Client-Flyer.pdf" download>Download client flyer ↓</a></aside><StoreClient />
      </main>
      <Footer />
    </div>
  );
}
