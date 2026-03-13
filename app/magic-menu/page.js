export const metadata = {
  title: 'Magic Menu App',
  description: 'Magic Menu app by Myrie HQ.',
  alternates: { canonical: 'https://www.myriehq.com/magic-menu' },
};

const modules = [
  {
    name: 'Menu Builder',
    desc: 'Create and organize menu sections, items, pricing, and featured highlights.',
  },
  {
    name: 'Recipe Workflow',
    desc: 'Structure kitchen-ready recipe content with consistent formatting and outputs.',
  },
  {
    name: 'Food Costing',
    desc: 'Track ingredients and pricing logic for better margin decisions.',
  },
  {
    name: 'Content Engine',
    desc: 'Generate branded social and promo content from menu data.',
  },
];

export default function MagicMenuPage() {
  return (
    <main style={{ background: '#0b0f17', color: '#eef3ff', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <section style={{ width: 'min(1120px, calc(100% - 30px))', margin: '0 auto', padding: '30px 0 60px' }}>
        <a href="/" style={{ color: '#9cc7ff', textDecoration: 'none', fontSize: 13 }}>← Return to Website</a>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '260px 1fr', gap: 14 }}>
          <aside style={{ border: '1px solid #233047', borderRadius: 14, background: '#0f1625', padding: 14 }}>
            <p style={{ margin: 0, fontSize: 11, letterSpacing: '.12em', color: '#93a5c3', textTransform: 'uppercase' }}>Magic Menu</p>
            <h2 style={{ margin: '8px 0 12px', fontSize: 22, letterSpacing: '-.02em' }}>App Navigation</h2>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9, color: '#d3def1' }}>
              <li>Dashboard</li>
              <li>Menu Builder</li>
              <li>Recipes</li>
              <li>Food Cost</li>
              <li>Content</li>
              <li>Settings</li>
            </ul>
          </aside>

          <div style={{ border: '1px solid #233047', borderRadius: 14, background: '#0f1625', padding: 16 }}>
            <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.12em', color: '#93a5c3', fontSize: 11 }}>Live Product Preview</p>
            <h1 style={{ margin: '10px 0 10px', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-.03em' }}>Magic Menu App</h1>
            <p style={{ margin: 0, color: '#c4d2ea', lineHeight: 1.65, maxWidth: 760 }}>
              This is the same app product from your Lovable-to-GitHub build path, presented publicly without exposing repo access.
              Visitors can see what you are building and how the platform is structured.
            </p>

            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
              {modules.map((m) => (
                <article key={m.name} style={{ border: '1px solid #2b3b59', borderRadius: 12, padding: 14, background: '#131c2e' }}>
                  <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{m.name}</h3>
                  <p style={{ margin: 0, color: '#bfd0eb', lineHeight: 1.55 }}>{m.desc}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="https://savory-studio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', padding: '11px 14px', borderRadius: 10, background: '#fff', color: '#111', fontWeight: 700 }}
              >
                Open Live Magic Menu App
              </a>
              <a href="/" style={{ textDecoration: 'none', padding: '11px 14px', borderRadius: 10, border: '1px solid #5f7aa8', color: '#dbe8ff', fontWeight: 700 }}>
                Back To MyrieHQ
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
