import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Local SEO Orlando',
  description:
    'Local SEO services in Orlando by Myrie HQ. Improve Google visibility with optimized service pages, GBP strategy, and conversion-focused content.',
  alternates: { canonical: 'https://www.myriehq.com/local-seo-orlando' },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Orlando, FL"
      title="Local SEO that"
      italic="actually ranks."
      sub="Myrie HQ helps Orlando businesses rank higher in local search and attract higher-intent customers — Google Business Profile, citations, on-page schema, and the kind of review velocity that moves the map."
      services={[
        { title: 'Google Business Profile', copy: 'Full-stack GBP optimization — categories, services, posts, photos, Q&A, and review-velocity systems.' },
        { title: 'Local landing pages',     copy: 'Service-area pages with internal linking and schema, built to dominate the local query layer.' },
        { title: 'On-page + metadata',      copy: 'Title tags, schema, headings, and content structure tuned to your real Orlando search intent.' },
        { title: 'Authority content',       copy: 'Editorial calendars and authority pieces that compound visibility over weeks, not months.' },
      ]}
      contactHeading="Ready to rank in Orlando?"
      contactSub="Talk to an operator who runs a hospitality floor — and a marketing studio that ships every week."
    />
  );
}
