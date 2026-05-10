'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import HoverLift from '../motion/HoverLift';
import Magnetic from '../motion/Magnetic';
import { useT } from '../../lib/i18n';

export default function ProjectsClient() {
  const { t } = useT();
  const featured = {
    href: '/projects/beach-bucket-design',
    image: '/assets/work/beach-bucket-design/drinks/all-drinks.png',
    metrics: [
      { num: t('proj.metric1_num'), label: t('proj.metric1_label') },
      { num: t('proj.metric2_num'), label: t('proj.metric2_label') },
      { num: t('proj.metric3_num'), label: t('proj.metric3_label') },
    ],
  };
  const rest = [
    { slug: 'magic-menu',           title: t('proj.r1_title'), tag: t('proj.r1_tag'), blurb: t('proj.r1_blurb'), href: '/magic-menu',                          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80' },
    { slug: 'daytona-marketing',    title: t('proj.r2_title'), tag: t('proj.r2_tag'), blurb: t('proj.r2_blurb'), href: '/daytona-beach-marketing-agency',     image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80' },
    { slug: 'local-seo-orlando',    title: t('proj.r3_title'), tag: t('proj.r3_tag'), blurb: t('proj.r3_blurb'), href: '/local-seo-orlando',                  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80' },
    { slug: 'restaurant-web-design',title: t('proj.r4_title'), tag: t('proj.r4_tag'), blurb: t('proj.r4_blurb'), href: '/restaurant-web-design-daytona',     image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80' },
    { slug: 'orlando-marketing',    title: t('proj.r5_title'), tag: t('proj.r5_tag'), blurb: t('proj.r5_blurb'), href: '/orlando-marketing-agency',          image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80' },
  ];

  return (
    <>
      <section className="proj-hero">
        <div className="shell proj-hero-copy">
          <Reveal><span className="label-pill">{t('proj.eyebrow')}</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title">
              <span className="display">{t('proj.h_a')}</span>
              <span className="script">{t('proj.h_italic')}</span>
              <span className="display">{t('proj.h_b')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead">{t('proj.lede')}</p>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal>
          <a href={featured.href} className="featured-project">
            <HoverLift lift={6}>
              <div className="featured-media">
                <img src={featured.image} alt={t('proj.featured_title')} />
                <div className="featured-tag-pill">{t('proj.featured_pill')}</div>
              </div>
              <div className="featured-body">
                <p className="eyebrow">{t('proj.featured_tag')}</p>
                <h2 className="display feat-title">{t('proj.featured_title')}</h2>
                <p>{t('proj.featured_blurb')}</p>
                <div className="featured-metrics">
                  {featured.metrics.map(m => (
                    <div key={m.label} className="featured-metric">
                      <span className="metric-num display">{m.num}</span>
                      <span className="metric-label headline">{m.label}</span>
                    </div>
                  ))}
                </div>
                <span className="link-arrow headline">{t('proj.view_case')}</span>
              </div>
            </HoverLift>
          </a>
        </Reveal>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow gold">{t('proj.more_eyebrow')}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">{t('proj.more_h_a')} <em className="accent-italic">{t('proj.more_h_italic')}</em>.</h2>
        </Reveal>
        <Stagger className="proj-grid" stagger={0.09}>
          {rest.map(p => (
            <StaggerItem key={p.slug}>
              <a href={p.href} className="proj-card-link">
                <HoverLift lift={6}>
                  <article className="ti-card proj-card">
                    <div className="proj-thumb" style={{ backgroundImage: `url(${p.image})` }} />
                    <div className="proj-body">
                      <p className="eyebrow">{p.tag}</p>
                      <h3 className="display proj-title">{p.title}</h3>
                      <p>{p.blurb}</p>
                      <span className="link-arrow headline">{t('proj.view_project')}</span>
                    </div>
                  </article>
                </HoverLift>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="shell block contact-cta">
        <Reveal>
          <h2 className="tropical-h2">{t('proj.cta_h_a')} <em className="accent-italic">{t('proj.cta_h_italic')}</em><br/>{t('proj.cta_h_b')}</h2>
        </Reveal>
        <Reveal delay={0.1}><p className="lead">{t('proj.cta_lead')}</p></Reveal>
        <Reveal delay={0.2}>
          <div className="cta-actions">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">{t('proj.cta_start')}</a></Magnetic>
            <Magnetic><a className="ti-btn gold" href="tel:+13867958727">+1 (386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
