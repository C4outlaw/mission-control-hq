import Reveal from '../motion/Reveal';
import { Stagger, StaggerItem } from '../motion/Stagger';
import Magnetic from '../motion/Magnetic';
import SiteNav from '../layout/SiteNav';
import Footer from '../layout/Footer';

/**
 * Shared premium template for SEO landing pages.
 * Cinema dark services section + warm-italic accent in headline.
 */
export default function SEOLanding({ eyebrow, title, italic, sub, services, contactHeading, contactSub }) {
  return (
    <main className="myrie-marketing">
      <SiteNav />

      <section className="seo-hero shell">
        <Reveal><span className="eyebrow">— {eyebrow}</span></Reveal>
        <Reveal delay={0.1}>
          <h1 className="display seo-title">{title} <em className="seo-italic">{italic}</em></h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="lead seo-sub">{sub}</p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="seo-cta">
            <Magnetic><a className="ti-btn primary" href="mailto:myriework@gmail.com">Book a strategy call</a></Magnetic>
            <Magnetic><a className="ti-btn outline" href="/projects">See the portfolio →</a></Magnetic>
          </div>
        </Reveal>
      </section>

      <section className="cinema">
        <div className="shell">
          <Reveal><span className="eyebrow">What we build</span></Reveal>
          <Reveal delay={0.1}><h2 className="tropical-h2">Built for {eyebrow.split(',')[0]}.</h2></Reveal>
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
        <Reveal><h2 className="tropical-h2">{contactHeading}</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="lead">{contactSub}</p>
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
