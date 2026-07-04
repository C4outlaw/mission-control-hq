'use client';
import Reveal from '../motion/Reveal';
import TextReveal from '../motion/TextReveal';
import Parallax from '../motion/Parallax';
import { useT } from '../../lib/i18n';

export default function HomeAboutStrip() {
  const { t } = useT();
  return (
    <section id="about" className="shell block about-block">
      <Reveal><span className="eyebrow">{t('home_about.eyebrow')}</span></Reveal>
      <div className="about-grid">
        <Reveal>
          <TextReveal as="h2" inView text={t('home_about.headline')} className="tropical-h2" />
          <p className="lead about-lead">{t('home_about.lede')}</p>
          <a className="link-arrow" href="/about">{t('home_about.cta')}</a>
        </Reveal>
        <Parallax speed={0.18}>
          <Reveal delay={0.15}>
            <img src="/assets/profile/myrie.jpg" alt="O'Neil Myrie" className="about-photo" loading="lazy" decoding="async" />
          </Reveal>
        </Parallax>
      </div>
    </section>
  );
}
