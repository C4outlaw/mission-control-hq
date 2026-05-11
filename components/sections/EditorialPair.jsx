'use client';

/**
 * LV-style 2-up editorial pair — two large images side by side, each with
 * its own caption underneath. Stacks on mobile.
 */
export default function EditorialPair({ left, right }) {
  return (
    <section className="lv-pair">
      {[left, right].map((item, i) => (
        <a key={i} href={item.href || '#'} className="lv-pair-item">
          {item.video ? (
            <video
              className="lv-pair-bg"
              src={item.video}
              poster={item.image}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img className="lv-pair-bg" src={item.image} alt="" loading="lazy" />
          )}
          <div className="lv-pair-caption">
            {item.eyebrow ? <span className="lv-eyebrow">{item.eyebrow}</span> : null}
            <h3 className="lv-pair-title">{item.title}</h3>
            <span className="lv-link lv-link-dark">{item.cta || 'Discover'}</span>
          </div>
        </a>
      ))}
    </section>
  );
}
