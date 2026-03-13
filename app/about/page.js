export const metadata = {
  title: 'About O’Neill Myrie',
  description:
    'Learn about O’Neill Myrie, founder of Myrie HQ and General Manager at The Beach Bucket, helping Daytona and Orlando businesses grow online.',
  alternates: { canonical: 'https://www.myriehq.com/about' },
};

export default function AboutPage() {
  return (
    <main style={{ background: '#fff', color: '#111', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <section style={{ width: 'min(920px, calc(100% - 40px))', margin: '0 auto', padding: '48px 0 76px' }}>
        <p style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '.12em', fontSize: 11, color: '#5f6675', fontWeight: 600 }}>
          About
        </p>
        <h1 style={{ margin: '10px 0 16px', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-.03em' }}>
          O’Neill Myrie
        </h1>
        <p style={{ color: '#4f5663', lineHeight: 1.75, fontSize: 18 }}>
          O’Neill Myrie leads at the intersection of operations and growth marketing. As General Manager at The Beach Bucket and founder of Myrie HQ, he brings practical business experience into every digital project — from premium website redesigns to local SEO systems and conversion-focused content strategy.
        </p>
        <p style={{ color: '#4f5663', lineHeight: 1.75, fontSize: 18 }}>
          His mission is simple: help local businesses look world-class online and convert that visibility into real revenue.
          Through Myrie HQ, O’Neill supports restaurants, coffee shops, and local brands in Daytona Beach and Orlando with modern web design, Google optimization, and scalable marketing workflows.
        </p>
        <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href="mailto:myriework@gmail.com" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, background: '#111', color: '#fff', fontWeight: 600 }}>
            Contact Myrie
          </a>
          <a href="/" style={{ textDecoration: 'none', padding: '12px 16px', borderRadius: 12, border: '1px solid #d8dae3', color: '#111', fontWeight: 600 }}>
            Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
