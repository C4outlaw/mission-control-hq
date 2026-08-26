import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import StoreClient from '../../components/sections/StoreClient';
import './store.css';

export const metadata = {
  title: 'The Lost Jamaican Store',
  description:
    'The Lost Jamaican — Jamaican slang merch, proverbs on mugs and tees, video-making courses, and the AI prompt packs behind our documentary shorts.',
  alternates: {
    canonical: 'https://www.myriehq.com/store',
  },
  openGraph: {
    title: 'The Lost Jamaican Store',
    description:
      'Jamaican slang merch, proverbs on mugs and tees, video-making courses, and the AI prompt packs behind our documentary shorts.',
    url: 'https://www.myriehq.com/store',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Lost Jamaican Store' }],
  },
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
