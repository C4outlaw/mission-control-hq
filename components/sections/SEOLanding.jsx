'use client';
import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import Magnetic from '../motion/Magnetic';
import SiteNav from '../layout/SiteNav';
import Footer from '../layout/Footer';
import { useT } from '../../lib/i18n';

/**
 * Shared bilingual SEO landing template.
 * Pass `ns` (translation namespace, e.g. "seo_daytona") and the component
 * resolves all copy via the i18n dictionary.
 *
 * Each namespace must define: eyebrow, title, italic, sub, s1_title/s1_copy
 * through s4_title/s4_copy, contact_h, contact_sub.
 * Common labels live under `seo.*`.
 */
export default function SEOLanding({ ns }) {
  const { t } = useT();
  const k = (key) => t(`${ns}.${key}`);
  const eyebrow = k('eyebrow');
  const services = [
    { title: k('s1_title'), copy: k('s1_copy') },
    { title: k('s2_title'), copy: k('s2_copy') },
    { title: k('s3_title'), copy: k('s3_copy') },
    { title: k('s4_title'), copy: k('s4_copy') },
  ];

  return (
    <main className="myrie-marketing">
      <SiteNav />

      <section className="seo-hero shell">
        <Reveal><span className="eyebrow">— {eyebrow}</span></Reveal>
        <Reveal delay={0.1}>
          <h1 className="display seo-title">{k('title')} <em className="seo-italic">{k('italic')}</em></h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="lead seo-sub">{k('sub')}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="seo-cta">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">{t('seo.cta_book')}</a></Magnetic>
            <Magnetic><a className="ti-btn outline" href="/projects">{t('seo.cta_portfolio')}</a></Magnetic>
          </div>
        </Reveal>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">{t('seo.what_we_build')}</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="tropical-h2">{t('seo.built_for')} {eyebrow.split(',')[0]}.</h2>
          </Reveal>
          <Stagger className="seo-grid" stagger={0.08}>
            {services.map(s => (
              <StaggerItem as="article" key={s.title} className="ti-card">
                <h3 className="seo-card-title">{s.title}</h3>
                <p>{s.copy}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell seo-contact">
        <Reveal><h2 className="tropical-h2">{k('contact_h')}</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="lead">{k('contact_sub')}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="seo-cta">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a></Magnetic>
            <Magnetic><a className="ti-btn outline" href="tel:+13867958727">(386) 795-8727</a></Magnetic>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
