'use client';
import Reveal from '../motion/Reveal';
import Magnetic from '../motion/Magnetic';
import { useT } from '../../lib/i18n';

export default function HomeContact() {
  const { t } = useT();
  return (
    <section id="contact" className="contact-block">
      <div className="shell contact-inner">
        <Reveal><h2 className="tropical-h2 contact-title">{t('contact.headline')}</h2></Reveal>
        <Reveal delay={0.1}><p className="lead contact-sub">{t('contact.sub')}</p></Reveal>
        <Reveal delay={0.2}>
          <div className="contact-actions">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a></Magnetic>
            <Magnetic><a className="ti-btn outline" href="tel:+13867958727">+1 (386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
