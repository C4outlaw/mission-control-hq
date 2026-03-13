export const metadata = {
  title: 'Magic Menu App',
  description: 'Magic Menu app by Myrie HQ.',
  alternates: { canonical: 'https://www.myriehq.com/magic-menu' },
};

export default function MagicMenuPage() {
  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <section style={{ width: 'min(980px, calc(100% - 40px))', margin: '0 auto', padding: '42px 0 72px' }}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, color: '#5f6675', fontWeight: 600 }}>
          Product
        </p>
        <h1 style={{ margin: '10px 0 12px', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-.03em' }}>Magic Menu App</h1>
        <p style={{ color: '#4f5663', lineHeight: 1.7, fontSize: 18 }}>
          This is the same Magic Menu product you’ve been building from Lovable and GitHub.
          This page now points to the real app project, not a food-item placeholder.
        </p>

        <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href="https://github.com/C4outlaw/savory-studio"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, background: '#111', color: '#fff', fontWeight: 600 }}
          >
            Open Magic Menu GitHub Repo
          </a>
          <a
            href="http://127.0.0.1:3010/dashboard"
            style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, border: '1px solid #d8dae3', color: '#111', fontWeight: 600 }}
          >
            Open Local Build
          </a>
          <a
            href="/"
            style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, border: '1px solid #d8dae3', color: '#111', fontWeight: 600 }}
          >
            Return to Website
          </a>
        </div>

        <div style={{ marginTop: 16, padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 12, background: '#f9fafb', color: '#4b5563' }}>
          If you want this button to open a public production app URL instead of local, send me the deployed Magic Menu URL and I’ll wire it instantly.
        </div>
      </section>
    </main>
  );
}
