import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import StoreClient from '../../components/sections/StoreClient';
import './store.css';

export const metadata = {
  title: 'The Lost Jamaican Store',
  description: 'Shop original designs on premium tees, hoodies, mugs, and caps.',
  alternates: {
    canonical: 'https://www.myriehq.com/store',
  },
};

export default function StorePage() {
  return (
    <div className="myrie-marketing site">
      <SiteNav />
      <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
        <StoreClient />
      </main>
      <Footer />
    </div>
  );
}
