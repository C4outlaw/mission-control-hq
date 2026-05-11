'use client';

/**
 * LV-style clean grid of drinks images.
 * Pure static layout — no carousel, all images visible at once.
 * Hover on a card with a video → plays the motion ad; mouse out → resets.
 */
export default function DrinksGridLV({ items }) {
  return (
    <div className="drinks-lv-grid">
      {items.map((p) => (
        <a
          key={p.src}
          className="drinks-lv-cell"
          href={p.video || p.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={p.headline}
        >
          {p.video ? (
            <video
              className="drinks-lv-media"
              src={p.video}
              poster={p.src}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
            />
          ) : (
            <img className="drinks-lv-media" src={p.src} alt={p.alt} loading="lazy" />
          )}
          <div className="drinks-lv-caption">
            <span className="drinks-lv-section">{p.section}</span>
            <span className="drinks-lv-headline">{p.headline}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
