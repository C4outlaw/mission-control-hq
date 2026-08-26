import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import StoreClient from '../../components/sections/StoreClient';
import './store.css';

export const metadata = {
  title: 'The Lost Jamaican Store',
  description:
    'The Lost Jamaican — Jamaican slang merch, proverbs on mugs and tees, video-making courses, and the AI prompt packs behind our documentary shorts.',
};

export default function StorePage() {
  return (
    <div className="myrie-marketing site">
      <SiteNav />
      <StoreClient />
      <Footer />
    </div>
  );
}
