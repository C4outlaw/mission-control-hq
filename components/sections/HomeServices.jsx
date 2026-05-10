'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useT } from '../../lib/i18n';

export default function HomeServices() {
  const { t } = useT();
  const services = [
    { num: '01', title: t('services.s1_title'), italic: t('services.s1_italic'), copy: t('services.s1_copy'), proof: t('services.s1_proof') },
    { num: '02', title: t('services.s2_title'), italic: t('services.s2_italic'), copy: t('services.s2_copy'), proof: t('services.s2_proof') },
    { num: '03', title: t('services.s3_title'), italic: t('services.s3_italic'), copy: t('services.s3_copy'), proof: t('services.s3_proof') },
    { num: '04', title: t('services.s4_title'), italic: t('services.s4_italic'), copy: t('services.s4_copy'), proof: t('services.s4_proof') },
  ];
  return (
    <section id="services" className="services-section">
      <div className="shell">
        <div className="services-head">
          <Reveal><span className="eyebrow">{t('services.eyebrow')}</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="services-headline">
              {t('services.headline_a')} <em className="accent-italic">{t('services.headline_b')}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="lead services-lede">{t('services.lede')}</p>
          </Reveal>
        </div>
        <Stagger className="services-grid" stagger={0.08}>
          {services.map((s) => (
            <StaggerItem as="article" key={s.title} className="svc-card">
              <span className="svc-num">{s.num}</span>
              <h3 className="svc-title"><span>{s.title}</span> <em className="accent-italic">{s.italic}</em></h3>
              <p className="svc-copy">{s.copy}</p>
              <p className="svc-proof"><span className="svc-arrow" aria-hidden="true">→</span>{s.proof}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
