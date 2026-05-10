'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import HoverLift from '../motion/HoverLift';
import Magnetic from '../motion/Magnetic';
import Parallax from '../motion/Parallax';
import { useT } from '../../lib/i18n';

export default function AboutClient() {
  const { t } = useT();
  const beliefs = [
    { num: '01', title: t('about.b1_title'), desc: t('about.b1_desc') },
    { num: '02', title: t('about.b2_title'), desc: t('about.b2_desc') },
    { num: '03', title: t('about.b3_title'), desc: t('about.b3_desc') },
    { num: '04', title: t('about.b4_title'), desc: t('about.b4_desc') },
  ];
  const milestones = [
    { year: t('about.tl_today_year'),    title: t('about.tl_today_title'),    desc: t('about.tl_today_desc') },
    { year: t('about.tl_2025_year'),     title: t('about.tl_2025_title'),     desc: t('about.tl_2025_desc') },
    { year: t('about.tl_2024_year'),     title: t('about.tl_2024_title'),     desc: t('about.tl_2024_desc') },
    { year: t('about.tl_earlier_year'),  title: t('about.tl_earlier_title'),  desc: t('about.tl_earlier_desc') },
  ];

  return (
    <>
      <section className="about-hero">
        <div className="shell about-hero-grid">
          <div className="about-hero-copy">
            <Reveal><span className="eyebrow">{t('about.eyebrow')}</span></Reveal>
            <Reveal delay={0.1}>
              <h1 className="display about-hero-title">{t('about.title_main')} <em className="accent-italic">{t('about.title_italic')}</em></h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="lead about-hero-lead">{t('about.lead')}</p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="about-actions">
                <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">{t('about.cta_contact')}</a></Magnetic>
                <Magnetic><a className="ti-btn outline" href="/projects">{t('about.cta_work')}</a></Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="about-photo-wrap">
            <Parallax speed={0.12}>
              <img src="/assets/profile/myrie.jpg" alt="O'Neill Myrie" className="about-photo" />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">{t('about.story_eyebrow')}</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">{t('about.story_h_a')} <em className="accent-italic">{t('about.story_h_italic')}</em>{t('about.story_h_b')}</h2></Reveal>
        <Stagger className="story-grid" stagger={0.08}>
          <StaggerItem className="story-text">
            <p className="lead">{t('about.story_p1')}</p>
            <p className="lead">{t('about.story_p2')}</p>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">{t('about.principles_eyebrow')}</span></Reveal>
          <Reveal delay={0.1}><h2 className="tropical-h2">{t('about.principles_headline')}</h2></Reveal>
          <Stagger className="beliefs-grid" stagger={0.08}>
            {beliefs.map(b => (
              <StaggerItem as="article" key={b.title} className="ti-card belief-card">
                <HoverLift>
                  <div className="belief-num">{b.num}</div>
                  <h3 className="belief-title">{b.title}</h3>
                  <p>{b.desc}</p>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">{t('about.timeline_eyebrow')}</span></Reveal>
        <Reveal delay={0.1}><h2 className="tropical-h2">{t('about.timeline_h_a')} <em className="accent-italic">{t('about.timeline_h_italic')}</em></h2></Reveal>
        <Stagger className="timeline" stagger={0.1}>
          {milestones.map(m => (
            <StaggerItem className="ti-card timeline-row" key={m.title}>
              <HoverLift lift={4}>
                <div className="timeline-grid">
                  <span className="timeline-year display">{m.year}</span>
                  <div>
                    <h3 className="headline">{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell block contact-cta">
        <Reveal><h2 className="tropical-h2">{t('about.cta_h_a')} <em className="accent-italic">{t('about.cta_h_italic')}</em>{t('about.cta_h_b')}</h2></Reveal>
        <Reveal delay={0.1}><p className="lead">{t('contact.sub')}</p></Reveal>
        <Reveal delay={0.2}>
          <div className="cta-actions">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a></Magnetic>
            <Magnetic><a className="ti-btn gold" href="tel:+13867958727">(386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
