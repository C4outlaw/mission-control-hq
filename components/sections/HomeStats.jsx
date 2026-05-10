'use client';
import Reveal from '../motion/Reveal';
import Counter from '../motion/Counter';
import { useT } from '../../lib/i18n';

export default function HomeStats() {
  const { t } = useT();
  const stats = [
    { number: '50+',  label: t('stats.projects') },
    { number: '3X',   label: t('stats.roi') },
    { number: '2',    label: t('stats.markets') },
    { number: '100%', label: t('stats.retention') },
  ];
  return (
    <section className="shell stats-section">
      {stats.map((s) => (
        <Reveal key={s.label} className="stat" delay={0.05}>
          <span className="stat-num display"><Counter value={s.number} /></span>
          <span className="stat-label">{s.label}</span>
        </Reveal>
      ))}
    </section>
  );
}
