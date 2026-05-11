'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import Carousel from '../motion/Carousel';
import { useT } from '../../lib/i18n';

export default function HomeFeatured() {
  const { t } = useT();

  const featured = [
    {
      title: t('featured.brand_title'),
      tag:   t('featured.brand_tag'),
      copy:  t('featured.brand_copy'),
      href:  '/projects/beach-bucket-design',
      label: t('featured.brand_label'),
      image: '/assets/work/beach-bucket-design/drinks/all-drinks.png',
    },
    {
      title: t('featured.app_title'),
      tag:   t('featured.app_tag'),
      copy:  t('featured.app_copy'),
      href:  '/#try-app',
      label: t('featured.app_label'),
      carousel: [
        { src: '/assets/work/magic-menu/cards/cocktail-1-sunset-spritzer.jpg',         caption: 'Sunset Spritzer' },
        { src: '/assets/work/magic-menu/cards/cocktail-2-mango-tango-margarita.jpg',   caption: 'Mango Tango Margarita' },
        { src: '/assets/work/magic-menu/cards/cocktail-3-coconut-cloud-colada.jpg',    caption: 'Coconut Cloud Colada' },
        { src: '/assets/work/magic-menu/cards/cocktail-4-blue-lagoon-breeze.jpg',      caption: 'Blue Lagoon Breeze' },
      ],
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
            {item.carousel ? (
              <>
                <div className="thumb thumb-carousel">
                  <Carousel
                    images={item.carousel}
                    autoplay={4500}
                    aspect="16/10"
                    rounded={0}
                    className="feature-carousel"
                  />
                </div>
                <a href={item.href} className="feature-link feature-link-body">
                  <div className="feature-body">
                    <span className="feature-tag">{item.tag}</span>
                    <h3 className="feature-title">{item.title}</h3>
                    <p>{item.copy}</p>
                    <span className="feature-arrow">{item.label} →</span>
                  </div>
                </a>
              </>
            ) : (
              <a href={item.href} className="feature-link">
                <div className="thumb" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="feature-body">
                  <span className="feature-tag">{item.tag}</span>
                  <h3 className="feature-title">{item.title}</h3>
                  <p>{item.copy}</p>
                  <span className="feature-arrow">{item.label} →</span>
                </div>
              </a>
            )}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
