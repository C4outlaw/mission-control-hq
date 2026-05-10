'use client';
import Reveal from '../motion/Reveal';
import Magnetic from '../motion/Magnetic';
import Carousel from '../motion/Carousel';
import { useT } from '../../lib/i18n';

export default function BeachBucketClient() {
  const { t } = useT();

  // Build day-promo + signature captions from translation keys
  const dayCap = (dayKey) => `${t(dayKey)} ${t('bb.cap_promo')}`;
  const sigCap = (name) => `${name} ${t('bb.cap_signature')}`;

  const drinks = [
    { src: '/assets/work/beach-bucket-design/drinks/all-drinks.png',           caption: t('bb.cap_grid') },
    { src: '/assets/work/beach-bucket-design/drinks/monday.png',               caption: dayCap('bb.day_monday') },
    { src: '/assets/work/beach-bucket-design/drinks/tuesday.png',              caption: dayCap('bb.day_tuesday') },
    { src: '/assets/work/beach-bucket-design/drinks/wednesday.png',            caption: dayCap('bb.day_wednesday') },
    { src: '/assets/work/beach-bucket-design/drinks/thursday.png',             caption: dayCap('bb.day_thursday') },
    { src: '/assets/work/beach-bucket-design/drinks/friday.png',               caption: dayCap('bb.day_friday') },
    { src: '/assets/work/beach-bucket-design/drinks/saturday.png',             caption: dayCap('bb.day_saturday') },
    { src: '/assets/work/beach-bucket-design/drinks/sunday.png',               caption: dayCap('bb.day_sunday') },
    { src: '/assets/work/beach-bucket-design/drinks/blueberry-bay-breeze.png', caption: sigCap('Blueberry Bay Breeze') },
    { src: '/assets/work/beach-bucket-design/drinks/cherry-lemonade.png',      caption: sigCap('Cherry Lemonade') },
    { src: '/assets/work/beach-bucket-design/drinks/citrus-seabreeze.png',     caption: sigCap('Citrus Seabreeze') },
    { src: '/assets/work/beach-bucket-design/drinks/cucumber-cooler.png',      caption: sigCap('Cucumber Cooler') },
    { src: '/assets/work/beach-bucket-design/drinks/grape-pop.png',            caption: sigCap('Grape Pop') },
    { src: '/assets/work/beach-bucket-design/drinks/orange-crush.png',         caption: sigCap('Orange Crush') },
    { src: '/assets/work/beach-bucket-design/drinks/raspberry-lemonade.png',   caption: sigCap('Raspberry Lemonade') },
  ];

  const breakfast = [
    { src: '/assets/work/beach-bucket-design/breakfast/the-big-beach.jpg',       caption: `The Big Beach ${t('bb.cap_feature_plate')}` },
    { src: '/assets/work/beach-bucket-design/breakfast/the-sunrise.jpg',         caption: `The Sunrise ${t('bb.cap_daily_breakfast')}` },
    { src: '/assets/work/beach-bucket-design/breakfast/the-early-bird.jpg',      caption: t('bb.cap_early_bird') },
    { src: '/assets/work/beach-bucket-design/breakfast/the-healthty-surfer.jpg', caption: t('bb.cap_healthy_surfer') },
  ];

  const menus = [
    { src: '/assets/work/beach-bucket-design/menu/the-big-beach.png', caption: t('bb.cap_menu_hero') },
    { src: '/assets/work/beach-bucket-design/menu/menu-1.webp',       caption: `${t('bb.cap_menu_spread')} (1/3)` },
    { src: '/assets/work/beach-bucket-design/menu/menu-2.webp',       caption: `${t('bb.cap_menu_spread')} (2/3)` },
    { src: '/assets/work/beach-bucket-design/menu/menu-4.webp',       caption: `${t('bb.cap_menu_spread')} (3/3)` },
  ];

  return (
    <>
      <section className="port-hero">
        <div className="shell port-hero-copy">
          <Reveal><span className="eyebrow">{t('bb.eyebrow')}</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="display port-hero-title">{t('bb.title_a')} <em className="accent-italic">{t('bb.title_italic')}</em></h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead hero-sub">{t('bb.sub')}</p>
          </Reveal>
        </div>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">{t('bb.s1_eyebrow')}</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">{t('bb.s1_h')}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead block-sub">{t('bb.s1_lede')}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="port-carousel-wrap product-frame">
              <Carousel images={drinks} autoplay={4000} aspect="4/5" showThumbs className="port-carousel" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">{t('bb.s2_eyebrow')}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">{t('bb.s2_h_a')} <em className="accent-italic">{t('bb.s2_h_italic')}</em></h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead block-sub">{t('bb.s2_lede')}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="port-carousel-wrap">
            <Carousel images={breakfast} autoplay={4500} aspect="3/2" showThumbs className="port-carousel" />
          </div>
        </Reveal>
      </section>

      <section className="cinema deep">
        <div className="shell">
          <Reveal><span className="eyebrow">{t('bb.s3_eyebrow')}</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">{t('bb.s3_h')}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="lead block-sub">{t('bb.s3_lede')}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="port-carousel-wrap product-frame">
              <Carousel images={menus} autoplay={5000} aspect="4/5" showThumbs className="port-carousel" />
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="cta-actions" style={{ marginTop: 56 }}>
              <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com?subject=Design%20work%20for%20my%20brand">{t('bb.cta_start')}</a></Magnetic>
              <Magnetic><a className="ti-btn" href="/projects">{t('bb.cta_more')}</a></Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
