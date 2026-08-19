export default function HomePromptPacks() {
  return (
    <section id="prompt-packs" aria-label="Prompt Packs" style={{ background: '#0F0F23', padding: '56px 20px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 420px', color: '#F8FAFC' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: 3, fontSize: 12, fontWeight: 700, color: '#FF90E8', margin: '0 0 10px' }}>
            New &middot; Digital Download
          </p>
          <h2 style={{ color: '#FFFFFF', fontFamily: 'inherit', fontSize: 'clamp(26px, 4vw, 36px)', lineHeight: 1.15, margin: '0 0 12px', fontWeight: 800, letterSpacing: -0.5 }}>
            The AI prompts behind our viral documentary shorts.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#C7CBE0', margin: '0 0 22px', maxWidth: 520 }}>
            Every prompt, model setting, and quality gate we use to turn one name into a finished
            cinematic vertical video &mdash; in one PDF you can hand straight to your own AI.
            Name your price, from $4.99.
          </p>
          <a
            href="/prompts"
            style={{
              display: 'inline-block', background: '#FF90E8', color: '#000', fontWeight: 800,
              fontSize: 16, padding: '14px 32px', borderRadius: 8, border: '2px solid #000',
              boxShadow: '4px 4px 0 #000', textDecoration: 'none',
            }}
          >
            Get the Prompt Pack &rarr;
          </a>
        </div>
        <a href="/prompts" aria-hidden="true" tabIndex={-1} style={{ flex: '0 1 260px' }}>
          <img
            src="/prompts/pack-page1.png"
            alt=""
            width={410}
            height={547}
            loading="lazy"
            style={{ width: '100%', height: 'auto', borderRadius: 10, border: '2px solid #000', boxShadow: '8px 8px 0 rgba(0,0,0,.55)', transform: 'rotate(-2deg)' }}
          />
        </a>
      </div>
    </section>
  );
}
