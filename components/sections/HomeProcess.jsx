'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useT } from '../../lib/i18n';

export default function HomeProcess() {
  const { t } = useT();
  const processSteps = [
    { step: '01', title: t('process.s1_title'), desc: t('process.s1_desc') },
    { step: '02', title: t('process.s2_title'), desc: t('process.s2_desc') },
    { step: '03', title: t('process.s3_title'), desc: t('process.s3_desc') },
    { step: '04', title: t('process.s4_title'), desc: t('process.s4_desc') },
  ];
  return (
    <section className="shell block">
      <Reveal><span className="eyebrow">{t('process.eyebrow')}</span></Reveal>
      <Reveal delay={0.1}><h2 className="tropical-h2">{t('process.headline')}</h2></Reveal>
      <Stagger className="process-grid" stagger={0.08}>
        {processSteps.map((s) => (
          <StaggerItem key={s.step} className="process-step">
            <div className="process-num">{s.step}</div>
            <h3 className="process-title">{s.title}</h3>
            <p>{s.desc}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
