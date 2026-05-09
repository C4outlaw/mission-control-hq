import SEOLanding from '../../components/sections/SEOLanding';

export const metadata = {
  title: 'Orlando Marketing Agency',
  description:
    'Myrie HQ provides Orlando marketing services including premium web design, local SEO, and growth strategy for local businesses.',
  alternates: { canonical: 'https://www.myriehq.com/orlando-marketing-agency' },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Orlando, FL"
      title="Orlando"
      italic="marketing agency."
      sub="We help Orlando restaurants, bars, and local brands build stronger online positioning with modern websites, local SEO execution, and conversion-ready marketing systems — built by hospitality operators."
      services={[
        { title: 'Premium website rebuilds', copy: 'Conversion-focused redesigns with real menu, ordering, and reservation flows for Orlando hospitality.' },
        { title: 'Local search architecture', copy: 'GBP, citations, on-page schema, and content structure tuned for the Orlando query layer.' },
        { title: 'Growth content + campaigns', copy: 'Daily-specials cards, plate photography, and seasonal campaigns — production-ready every week.' },
        { title: 'Brand systems',              copy: 'Editorial-grade brand creative and trust assets that lift conversion and authority simultaneously.' },
      ]}
      contactHeading="Ready to grow in Orlando?"
      contactSub="Premium websites + local SEO + content systems that ship every week."
    />
  );
}
