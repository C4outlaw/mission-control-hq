'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import TextReveal from '../motion/TextReveal';
import Tilt from '../motion/Tilt';
import { useT } from '../../lib/i18n';

export default function HomeTestimonials() {
  const { t } = useT();
  const items = [
    { quote: t('testi.q1'), name: t('testi.q1_name'), title: t('testi.q1_title') },
    { quote: t('testi.q2'), name: t('testi.q2_name'), title: t('testi.q2_title') },
    { quote: t('testi.q3'), name: t('testi.q3_name'), title: t('testi.q3_title') },
  ];
  return (
    <section className="shell block">
      <Reveal><span className="eyebrow">{t('testi.eyebrow')}</span></Reveal>
      <TextReveal as="h2" inView text={t('testi.headline')} className="tropical-h2" />
      <Stagger className="testimonials-grid" stagger={0.1}>
        {items.map((q, i) => (
          <StaggerItem as="div" key={i}>
            <Tilt max={5} radius={22} style={{ height: '100%' }}>
              <article className="testi-card">
                <p className="testi-quote">&ldquo;{q.quote}&rdquo;</p>
                <div className="testi-author">
                  <strong>{q.name}</strong>
                  <span>{q.title}</span>
                </div>
              </article>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
