import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import StoreClient from '../../components/sections/StoreClient';
import './store.css';
import './store-dark.css';

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
        <StoreClient />
      </main>
      <Footer />
    </div>
  );
}
