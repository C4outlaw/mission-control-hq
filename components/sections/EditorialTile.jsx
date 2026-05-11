'use client';

/**
 * Single LV-style editorial tile.
 *
 * Props:
 *   image     — public path to image
 *   video     — optional public path to video (overrides image on play)
 *   eyebrow   — tiny tracked uppercase label above headline
 *   title     — short editorial title (max ~6 words)
 *   ctaLabel  — uppercase action label (e.g. "Discover")
 *   ctaHref   — link target
 *   height    — "tall" (90vh, single-up) | "medium" (70vh) | "short" (52vh)
 *   align     — "center" | "left" | "right" — where the caption sits
 *   tone      — "light" (text on dark image) | "dark" (text on light image)
 */
export default function EditorialTile({
  image,
  video,
  eyebrow,
  title,
  ctaLabel = 'Discover',
  ctaHref = '#',
  height = 'tall',
  align = 'center',
  tone = 'light',
}) {
  return (
    <section className={`lv-tile lv-tile--${height} lv-tile--${align} lv-tile--${tone}`}>
      {video ? (
        <video
          className="lv-tile-bg"
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <img className="lv-tile-bg" src={image} alt="" loading="lazy" />
      )}
      <div className="lv-tile-veil" aria-hidden="true" />
      <div className="lv-tile-stack">
        {eyebrow ? <span className="lv-eyebrow">{eyebrow}</span> : null}
        {title ? <h2 className="lv-tile-title">{title}</h2> : null}
        <a href={ctaHref} className={`lv-link ${tone === 'light' ? 'lv-link-light' : 'lv-link-dark'}`}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
