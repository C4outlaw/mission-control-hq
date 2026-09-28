// Shared shell for the policy pages (privacy, terms, returns).
//
// These exist because a shop cannot pass Meta's review without a return policy,
// and an email capture form should not collect addresses with no privacy policy
// behind it. They are plain documents: site chrome, one column, readable width.
const wrap = {
  maxWidth: 760,
  margin: '0 auto',
  padding: '120px 20px 96px',
};

export default function LegalPage({ title, updated, children }) {
  return (
    <div style={wrap}>
      <p
        style={{
          fontSize: 12,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#a8791f',
          fontWeight: 700,
          margin: '0 0 12px',
        }}
      >
        Myrie HQ
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1, margin: '0 0 10px' }}>
        {title}
      </h1>
      <p style={{ fontSize: 14, color: '#8492a9', margin: '0 0 40px' }}>Last updated {updated}</p>
      <div className="legal-body">{children}</div>
      <style>{`
        .legal-body { font-size: 16.5px; line-height: 1.75; color: #b9c6dc; }
        .legal-body h2 {
          font-size: 20px;
          line-height: 1.3;
          margin: 40px 0 12px;
          color: #e8f1ff;
        }
        .legal-body p { margin: 0 0 16px; }
        .legal-body ul { margin: 0 0 16px; padding-left: 22px; }
        .legal-body li { margin-bottom: 8px; }
        .legal-body a { color: #7fb0ff; }
        .legal-body strong { color: #e8f1ff; }
      `}</style>
    </div>
  );
}
