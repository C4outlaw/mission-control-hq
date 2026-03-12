export const metadata = {
  title: 'Daytona Beach Marketing Agency',
  description:
    'Myrie HQ helps Daytona Beach businesses grow with premium websites, local SEO, and marketing systems that convert traffic into customers.',
  alternates: { canonical: 'https://www.myriehq.com/daytona-beach-marketing-agency' },
};

export default function Page() {
  return (
    <main style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px 70px', color: '#eaf2ff' }}>
      <h1>Daytona Beach Marketing Agency</h1>
      <p>
        Myrie HQ builds premium websites and local growth systems for Daytona Beach businesses.
        We help restaurants, coffee shops, and local service brands improve visibility, trust, and conversions.
      </p>
      <h2>What we do in Daytona Beach</h2>
      <ul>
        <li>Website redesign and conversion-focused UX</li>
        <li>Google Business Profile optimization</li>
        <li>Local SEO content and service page strategy</li>
        <li>Brand visual refresh and campaign creative</li>
      </ul>
      <p>
        Ready to grow? Contact <a href="mailto:myriework@gmail.com">myriework@gmail.com</a>.
      </p>
    </main>
  );
}
