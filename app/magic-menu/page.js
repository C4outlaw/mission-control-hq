export const metadata = {
  title: 'Magic Menu App',
  description: 'Magic Menu app preview and menu access from Myrie HQ.',
  alternates: { canonical: 'https://www.myriehq.com/magic-menu' },
};

export default function MagicMenuPage() {
  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <section style={{ width: 'min(980px, calc(100% - 40px))', margin: '0 auto', padding: '42px 0 72px' }}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, color: '#5f6675', fontWeight: 600 }}>
          Magic Menu
        </p>
        <h1 style={{ margin: '10px 0 12px', fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '-.03em' }}>Magic Menu App</h1>
        <p style={{ color: '#4f5663', lineHeight: 1.7, fontSize: 18 }}>
          Access the Magic Menu workflow from here. Use the button below to open the live app menu view.
        </p>

        <div id="menu" style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="http://127.0.0.1:3010/dashboard" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, background: '#111', color: '#fff', fontWeight: 600 }}>
            Open Menu App
          </a>
          <a href="/" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, border: '1px solid #d8dae3', color: '#111', fontWeight: 600 }}>
            Return to Website
          </a>
        </div>

        <p style={{ marginTop: 16, color: '#6b7280', fontSize: 14 }}>
          Note: If you are on mobile or outside the local network, request a public app link.
        </p>
      </section>
    </main>
  );
}
