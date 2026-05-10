import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Daytona Beach Marketing Agency',
  description:
    'Myrie HQ helps Daytona Beach businesses grow with premium websites, local SEO, and marketing systems that convert traffic into customers.',
  alternates: { canonical: 'https://www.myriehq.com/daytona-beach-marketing-agency' },
};

export default function Page() {
  return <SEOLanding ns="seo_daytona" />;
}
