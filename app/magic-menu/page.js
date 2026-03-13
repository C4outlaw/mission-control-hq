export const metadata = {
  title: 'Magic Menu',
  description: 'Magic Menu preview and featured menu experience from Myrie HQ.',
  alternates: { canonical: 'https://www.myriehq.com/magic-menu' },
};

const menuSections = [
  {
    name: 'Starters',
    items: ['Smoked Fish Dip', 'Conch Fritters', 'Wings', 'Chicken Tender'],
  },
  {
    name: 'Signature Mains',
    items: ['Shrimp Tacos', 'Fried Shrimp', 'Bucket Burger', 'Crab Cakes'],
  },
  {
    name: 'Breakfast Favorites',
    items: ['#4 The Big Beach', 'Ormond Omelet', 'Seafood Omelet'],
  },
];

export default function MagicMenuPage() {
  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <section style={{ width: 'min(1040px, calc(100% - 40px))', margin: '0 auto', padding: '42px 0 72px' }}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, color: '#5f6675', fontWeight: 600 }}>
          Magic Menu
        </p>
        <h1 style={{ margin: '10px 0 12px', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-.03em' }}>Magic Menu</h1>
        <p style={{ color: '#4f5663', lineHeight: 1.7, fontSize: 18, maxWidth: 820 }}>
          This is the live web preview of our menu experience. Click a section and browse featured items.
        </p>

        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="#menu" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, background: '#111', color: '#fff', fontWeight: 600 }}>
            Open Menu
          </a>
          <a href="/" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, border: '1px solid #d8dae3', color: '#111', fontWeight: 600 }}>
            Return to Website
          </a>
        </div>

        <div id="menu" style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {menuSections.map((section) => (
            <article key={section.name} style={{ border: '1px solid #e5e7eb', borderRadius: 14, padding: 16, background: '#fafafa' }}>
              <h3 style={{ margin: '0 0 10px', letterSpacing: '-.01em' }}>{section.name}</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#4b5563', lineHeight: 1.8 }}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
