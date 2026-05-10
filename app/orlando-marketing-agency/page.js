import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Orlando Marketing Agency',
  description:
    'Myrie HQ provides Orlando marketing services including premium web design, local SEO, and growth strategy for local businesses.',
  alternates: { canonical: 'https://www.myriehq.com/orlando-marketing-agency' },
};

export default function Page() {
  return <SEOLanding ns="seo_orlando_mkt" />;
}
