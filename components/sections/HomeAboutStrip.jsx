'use client';
import Reveal from '../motion/Reveal';
import { useT } from '../../lib/i18n';

export default function HomeAboutStrip() {
  const { t } = useT();
  return (
    <section id="about" className="shell block about-block">
      <Reveal><span className="eyebrow">{t('home_about.eyebrow')}</span></Reveal>
      <div className="about-grid">
        <Reveal>
          <h2 className="tropical-h2">{t('home_about.headline')}</h2>
          <p className="lead about-lead">{t('home_about.lede')}</p>
          <a className="link-arrow" href="/about">{t('home_about.cta')}</a>
        </Reveal>
        <Reveal delay={0.15}>
          <img src="/assets/profile/myrie.jpg" alt="O'Neill Myrie" className="about-photo" />
        </Reveal>
      </div>
    </section>
  );
}
