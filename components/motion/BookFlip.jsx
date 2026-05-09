'use client';
import { useRef, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

/**
 * Real magazine page-flip using react-pageflip — two-page spreads, real
 * paper-curl page turn, hard cover, mouse + drag + tap navigation.
 *
 * Each `pages` entry can include:
 *   { src, alt, headline?, dek?, section? }
 *
 * Props:
 *   pages       — array of page records
 *   masthead    — magazine title (default "MYRIE HQ")
 *   issue       — issue label (default "Vol 02 · Selected Work")
 *   width/height — base spread dimensions; the book stretches responsively
 */
const Page = forwardRef(function Page({ children, density = 'soft' }, ref) {
  return (
    <div
      ref={ref}
      className="mag-page"
      data-density={density}
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%)',
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(0,0,0,0.02)), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='.85' numOctaves='1'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .25 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        backgroundSize: 'cover, 160px',
        position: 'relative',
        boxShadow: 'inset 0 0 18px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
});

const Cover = forwardRef(function Cover({ masthead, issue, coverImage }, ref) {
  return (
    <div
      ref={ref}
      data-density="hard"
      style={{
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        padding: '52px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontSize: 13, letterSpacing: '0.22em', opacity: 0.6, fontWeight: 600 }}>{issue}</div>
        <div style={{
          marginTop: 24,
          fontSize: 'clamp(2rem, 6vw, 4.4rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          fontWeight: 800,
        }}>
          {masthead}
        </div>
        <div style={{ marginTop: 14, fontSize: 14, opacity: 0.78, maxWidth: '36ch', lineHeight: 1.5 }}>
          Selected design work for hospitality + local brands. Daily-drink specials, signature
          cocktail cards, and full menu rebuilds — produced for The Beach Bucket and other clients.
        </div>
      </div>
      {coverImage && (
        <div style={{
          position: 'absolute', right: -40, bottom: -60, width: '70%', height: '60%',
          opacity: 0.32,
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'contain', backgroundPosition: 'right bottom', backgroundRepeat: 'no-repeat',
          filter: 'grayscale(.2) contrast(1.05)',
          mixBlendMode: 'screen',
        }} />
      )}
      <div style={{ fontSize: 11, letterSpacing: '0.18em', opacity: 0.55, fontWeight: 600, textTransform: 'uppercase' }}>
        Issue 02 · Hospitality Design Quarterly
      </div>
    </div>
  );
});

const BackCover = forwardRef(function BackCover(_props, ref) {
  return (
    <div
      ref={ref}
      data-density="hard"
      style={{
        width: '100%', height: '100%',
        background: '#0a0a0a', color: '#fff',
        padding: '52px 48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div style={{ fontSize: 13, letterSpacing: '0.22em', opacity: 0.6, fontWeight: 600 }}>END · NEXT ISSUE COMING</div>
      <div>
        <div style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.025em' }}>
          More work where this came from.
        </div>
        <a href="/projects" style={{ color: '#fff', opacity: 0.8, marginTop: 14, display: 'inline-block', textDecoration: 'underline', fontSize: 15 }}>
          See the full portfolio →
        </a>
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.18em', opacity: 0.45, fontWeight: 600 }}>MYRIE HQ · DAYTONA + ORLANDO</div>
    </div>
  );
});

export default function BookFlip({
  pages = [],
  masthead = 'MYRIE HQ',
  issue = 'Vol 02 · Selected Work',
  width = 700,
  height = 920,
  className,
  style,
}) {
  const bookRef = useRef(null);

  const next = () => bookRef.current?.pageFlip?.()?.flipNext?.();
  const prev = () => bookRef.current?.pageFlip?.()?.flipPrev?.();

  if (pages.length === 0) return null;

  return (
    <div className={className} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <HTMLFlipBook
        ref={bookRef}
        width={width}
        height={height}
        size="stretch"
        minWidth={420}
        maxWidth={760}
        minHeight={560}
        maxHeight={1020}
        maxShadowOpacity={0.55}
        showCover={true}
        mobileScrollSupport={true}
        useMouseEvents={true}
        flippingTime={900}
        usePortrait={false}
        autoSize={true}
        style={{
          margin: '0 auto',
          background: 'transparent',
        }}
      >
        <Cover masthead={masthead} issue={issue} coverImage={pages[0]?.src} />
        {pages.map((p, i) => (
          <Page key={i}>
            <article style={{
              width: '100%', height: '100%',
              padding: '36px 36px 30px',
              display: 'grid', gridTemplateRows: 'auto 1fr auto',
              boxSizing: 'border-box',
            }}>
              <header style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(10,10,10,0.12)',
                paddingBottom: 12, marginBottom: 18,
              }}>
                <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: '#0a0a0a' }}>{masthead}</span>
                <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6e6e73', fontWeight: 600 }}>
                  {p.section || `No. ${String(i + 1).padStart(2, '0')}`}
                </span>
              </header>
              <figure style={{
                margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 0,
              }}>
                <img
                  src={p.src}
                  alt={p.alt || ''}
                  draggable={false}
                  style={{
                    maxWidth: '100%', maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: 4,
                    boxShadow: '0 1px 1px rgba(0,0,0,0.03), 0 6px 20px rgba(20,30,60,0.08)',
                    userSelect: 'none',
                  }}
                />
              </figure>
              <footer style={{
                borderTop: '1px solid rgba(10,10,10,0.12)',
                marginTop: 16, paddingTop: 12,
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'end',
              }}>
                <div>
                  {p.headline && (
                    <h3 style={{ margin: '0 0 4px', font: '700 17px/1.15 var(--font-body), sans-serif', color: '#0a0a0a', letterSpacing: '-0.02em' }}>
                      {p.headline}
                    </h3>
                  )}
                  {(p.dek || p.caption) && (
                    <p style={{ margin: 0, font: '400 12px/1.45 var(--font-body), sans-serif', color: '#6e6e73', maxWidth: '46ch', letterSpacing: '-0.005em' }}>
                      {p.dek || p.caption}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6e6e73', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  {String(i + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
                </span>
              </footer>
            </article>
          </Page>
        ))}
        <BackCover />
      </HTMLFlipBook>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 36 }}>
        <button onClick={prev} aria-label="Previous page" style={navBtn}>‹</button>
        <span style={{ fontSize: 13, color: '#6e6e73', letterSpacing: '-0.005em', minWidth: 110, textAlign: 'center' }}>
          Click or drag a page corner
        </span>
        <button onClick={next} aria-label="Next page" style={navBtn}>›</button>
      </div>
    </div>
  );
}

const navBtn = {
  width: 46, height: 46, borderRadius: '50%',
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(18px) saturate(180%)',
  WebkitBackdropFilter: 'blur(18px) saturate(180%)',
  border: '1px solid rgba(10,10,10,0.12)',
  color: '#0a0a0a',
  fontSize: 22, lineHeight: 1, fontWeight: 500,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform .25s ease, background .25s ease, border-color .25s ease',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 32px rgba(10,30,80,0.08)',
};
