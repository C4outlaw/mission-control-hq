import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Daytona Beach Marketing Agency',
  description:
    'Myrie HQ helps Daytona Beach businesses grow with premium websites, local SEO, and marketing systems that convert traffic into customers.',
  alternates: { canonical: 'https://www.myriehq.com/daytona-beach-marketing-agency' },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Daytona Beach, FL"
      title="Daytona Beach"
      italic="marketing agency."
      sub="Myrie HQ builds premium websites and local growth systems for Daytona Beach businesses — restaurants, bars, coffee shops, and local service brands. We help you improve visibility, trust, and conversions in the market we operate in every day."
      services={[
        { title: 'Restaurant + Bar Websites', copy: 'Conversion-focused redesigns with menu workflows, online ordering, and reservation flows tuned for the Daytona market.' },
        { title: 'Local SEO',                 copy: 'Google Business Profile, citation cleanup, on-page schema, review velocity — built for Daytona Beach search.' },
        { title: 'Brand & Campaign Creative', copy: 'Daily-specials cards, signature cocktail decks, plate photography, and weekly content that ships.' },
        { title: 'Marketing Automation',      copy: 'Specials, events, posts, email — running on autopilot so you stay in service.' },
      ]}
      contactHeading="Ready to grow in Daytona?"
      contactSub="Talk to an operator who runs a beachfront floor every weekend."
    />
  );
}
