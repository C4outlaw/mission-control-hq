'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useT } from '../../lib/i18n';

export default function HomeFeatured() {
  const { t } = useT();

  // Two facets of the same flagship client — the brand/creative system and the
  // website we designed + built. The Menu Magic app lives in its own section up
  // top, so it's intentionally not duplicated here.
  const featured = [
    {
      title: t('featured.brand_title'),
      tag:   t('featured.brand_tag'),
      copy:  t('featured.brand_copy'),
      href:  '/projects/beach-bucket-design',
      label: t('featured.brand_label'),
      image: '/assets/work/beach-bucket-design/featured-deck.jpg',
    },
    {
      title: t('featured.web_title'),
      tag:   t('featured.web_tag'),
      copy:  t('featured.web_copy'),
      href:  '/projects/beach-bucket-website',
      label: t('featured.web_label'),
      image: '/assets/work/beach-bucket-design/bb-website.jpg',
    },
  ];

  return (
    <section className="shell block">
      <Reveal><span className="eyebrow">{t('featured.eyebrow')}</span></Reveal>
      <Reveal delay={0.1}>
        <h2 className="tropical-h2">{t('featured.headline')}</h2>
      </Reveal>
      <Stagger className="featured-grid" stagger={0.1}>
        {featured.map((item) => (
          <StaggerItem as="article" key={item.title} className="feature-card">
            <a href={item.href} className="feature-link">
              <div className="thumb" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="feature-body">
                <span className="feature-tag">{item.tag}</span>
                <h3 className="feature-title">{item.title}</h3>
                <p>{item.copy}</p>
                <span className="feature-arrow">{item.label} →</span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
