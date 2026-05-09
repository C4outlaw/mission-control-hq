import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Restaurant Web Design Daytona Beach',
  description:
    'Restaurant and coffee shop website design in Daytona Beach. Myrie HQ builds fast, premium websites that drive calls, bookings, and walk-ins.',
  alternates: { canonical: 'https://www.myriehq.com/restaurant-web-design-daytona' },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Daytona Beach, FL"
      title="Restaurant web design"
      italic="that converts."
      sub="We design and rebuild restaurant websites for Daytona Beach brands that want a premium digital presence, faster mobile, and better conversion — built by an operator who runs a beachfront floor every weekend."
      services={[
        { title: 'Modern home + menu architecture', copy: 'Clear, conversion-focused menu structure with online ordering, reservation, and call-to-action flows.' },
        { title: 'Fast mobile performance',         copy: 'Lazy-loaded media, optimized images, and a mobile-first layout that loads in under two seconds.' },
        { title: 'Visual storytelling',             copy: 'Photo + video sections that capture the room, the plates, and the hospitality.' },
        { title: 'SEO-friendly structure',          copy: 'Local SEO architecture baked into the build — schema, headings, and metadata tuned for Daytona search.' },
      ]}
      contactHeading="Ready to redesign your restaurant?"
      contactSub="A premium site, with the SEO structure and conversion logic baked in."
    />
  );
}
