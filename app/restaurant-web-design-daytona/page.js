import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Restaurant Web Design Daytona Beach',
  description:
    'Restaurant and coffee shop website design in Daytona Beach. Myrie HQ builds fast, premium websites that drive calls, bookings, and walk-ins.',
  alternates: { canonical: 'https://www.myriehq.com/restaurant-web-design-daytona' },
};

export default function Page() {
  return <SEOLanding ns="seo_restaurant" />;
}
