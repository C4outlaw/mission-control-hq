export const metadata = {
  title: 'Orlando Marketing Agency',
  description:
    'Myrie HQ provides Orlando marketing services including premium web design, local SEO, and growth strategy for local businesses.',
  alternates: { canonical: 'https://www.myriehq.com/orlando-marketing-agency' },
};

export default function Page() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px 70px', color: '#eaf2ff' }}>
      <h1>Orlando Marketing Agency</h1>
      <p>
        We help Orlando businesses build stronger online positioning with modern websites,
        local SEO execution, and conversion-ready marketing systems.
      </p>
      <h2>Core Orlando Services</h2>
      <ul>
        <li>Premium website strategy and rebuilds</li>
        <li>SEO architecture for local search visibility</li>
        <li>Growth content and campaign support</li>
        <li>Creative/brand systems for trust and authority</li>
      </ul>
      <p>
        Start your project: <a href="mailto:myriework@gmail.com">myriework@gmail.com</a>
      </p>
    </main>
  );
}
