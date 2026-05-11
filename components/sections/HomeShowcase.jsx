'use client';
import Reveal from '../motion/Reveal';
import Carousel from '../motion/Carousel';
import { useT } from '../../lib/i18n';

/**
 * Drinks showcase (Selected work) section, fully translatable.
 * Day labels + drink names + section heading + CTA all come from i18n.
 */
export default function HomeShowcase() {
  const { t } = useT();

  const carousel = [
    { src: '/assets/work/beach-bucket-design/drinks/monday.png',    video: '/assets/work/beach-bucket-design/drink-ads/monday.mp4',    alt: t('day.monday') + ' specials motion ad',     section: 'NO. 01 · ' + t('day.monday').toUpperCase(),     headline: t('day.monday') + ': ' + t('showcase.drink_mon') },
    { src: '/assets/work/beach-bucket-design/drinks/tuesday.png',   video: '/assets/work/beach-bucket-design/drink-ads/tuesday.mp4',   alt: t('day.tuesday') + ' specials motion ad',    section: 'NO. 02 · ' + t('day.tuesday').toUpperCase(),    headline: t('day.tuesday') + ': ' + t('showcase.drink_tue') },
    { src: '/assets/work/beach-bucket-design/drinks/wednesday.png', video: '/assets/work/beach-bucket-design/drink-ads/wednesday.mp4', alt: t('day.wednesday') + ' specials motion ad',  section: 'NO. 03 · ' + t('day.wednesday').toUpperCase(),  headline: t('day.wednesday') + ': ' + t('showcase.drink_wed') },
    { src: '/assets/work/beach-bucket-design/drinks/thursday.png',  video: '/assets/work/beach-bucket-design/drink-ads/thursday.mp4',  alt: t('day.thursday') + ' specials motion ad',   section: 'NO. 04 · ' + t('day.thursday').toUpperCase(),   headline: t('day.thursday') + ': ' + t('showcase.drink_thu') },
    { src: '/assets/work/beach-bucket-design/drinks/friday.png',    video: '/assets/work/beach-bucket-design/drink-ads/friday.mp4',    alt: t('day.friday') + ' specials motion ad',     section: 'NO. 05 · ' + t('day.friday').toUpperCase(),     headline: t('day.friday') + ': ' + t('showcase.drink_fri') },
    { src: '/assets/work/beach-bucket-design/drinks/saturday.png',  video: '/assets/work/beach-bucket-design/drink-ads/saturday.mp4',  alt: t('day.saturday') + ' specials motion ad',   section: 'NO. 06 · ' + t('day.saturday').toUpperCase(),   headline: t('day.saturday') + ': ' + t('showcase.drink_sat') },
    { src: '/assets/work/beach-bucket-design/drinks/sunday.png',    video: '/assets/work/beach-bucket-design/drink-ads/sunday.mp4',    alt: t('day.sunday') + ' specials motion ad',     section: 'NO. 07 · ' + t('day.sunday').toUpperCase(),     headline: t('day.sunday') + ': ' + t('showcase.drink_sun') },
    { src: '/assets/work/beach-bucket-design/drinks/blueberry-bay-breeze.png', alt: 'Blueberry Bay Breeze', section: 'NO. 08 · ' + t('showcase.no_signature'), headline: 'Blueberry Bay Breeze' },
    { src: '/assets/work/beach-bucket-design/drinks/cucumber-cooler.png',     alt: 'Cucumber Cooler',      section: 'NO. 09 · ' + t('showcase.no_signature'), headline: 'Cucumber Cooler' },
    { src: '/assets/work/beach-bucket-design/drinks/citrus-seabreeze.png',    alt: 'Citrus Seabreeze',     section: 'NO. 10 · ' + t('showcase.no_signature'), headline: 'Citrus Seabreeze' },
    { src: '/assets/work/beach-bucket-design/drinks/orange-crush.png',        alt: 'Orange Crush',         section: 'NO. 11 · ' + t('showcase.no_signature'), headline: 'Orange Crush' },
  ];

  return (
    <section id="showcase" className="shell block">
      <Reveal><span className="eyebrow">{t('showcase.eyebrow')}</span></Reveal>
      <Reveal delay={0.1}>
        <h2 className="tropical-h2">{t('showcase.headline')}</h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="lead block-sub">{t('showcase.lede')}</p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="showcase-gallery">
          <Carousel
            images={carousel.map(p => ({ src: p.src, video: p.video, alt: p.alt, caption: p.headline }))}
            autoplay={5000}
            aspect="16/10"
            showThumbs
            rounded={8}
            className="showcase-carousel"
          />
        </div>
      </Reveal>
      <Reveal delay={0.4}>
        <div className="showcase-cta">
          <a className="link-arrow" href="/projects/beach-bucket-design">{t('showcase.cta')}</a>
        </div>
      </Reveal>
    </section>
  );
}
