'use client';
import Reveal from '../motion/Reveal';
import Magnetic from '../motion/Magnetic';
import { useT } from '../../lib/i18n';

/**
 * Menu Magic App section: surrounding marketing copy is translated; the
 * actual app iframe (savory-studio.vercel.app) is NOT translated — it is
 * a separate application and its own locale layer.
 */
export default function HomeMagicApp() {
  const { t } = useT();

  const cards = [
    { src: '/assets/work/magic-menu/cards/cocktail-1-sunset-spritzer.jpg',         caption: 'Sunset Spritzer' },
    { src: '/assets/work/magic-menu/cards/cocktail-2-mango-tango-margarita.jpg',   caption: 'Mango Tango Margarita' },
    { src: '/assets/work/magic-menu/cards/cocktail-3-coconut-cloud-colada.jpg',    caption: 'Coconut Cloud Colada' },
    { src: '/assets/work/magic-menu/cards/cocktail-4-blue-lagoon-breeze.jpg',      caption: 'Blue Lagoon Breeze' },
  ];

  return (
    <section id="try-app" className="app-section">
      <div className="shell">
        <Reveal><span className="eyebrow">{t('app.eyebrow')}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="app-headline display">
            {t('app.headline_a')} <em className="accent-italic">{t('app.headline_b')}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="lead app-sub">{t('app.lede')}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="app-frame">
            <div className="app-bar">
              <span className="dot red" /><span className="dot amber" /><span className="dot green" />
              <span className="url">savory-studio.vercel.app/dashboard</span>
              <a className="open-tab" href="https://savory-studio.vercel.app/dashboard" target="_blank" rel="noopener noreferrer">Open ↗</a>
            </div>
            <iframe
              src="https://savory-studio.vercel.app/dashboard"
              title="Menu Magic app"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="clipboard-read; clipboard-write"
            />
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="app-actions">
            <Magnetic strength={0.14}>
              <a className="ti-btn primary" href="https://savory-studio.vercel.app/dashboard" target="_blank" rel="noopener noreferrer">
                {t('app.cta_try')}
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mm-outputs-head">
            <span className="eyebrow">{t('app.outputs_eyebrow')}</span>
            <h3 className="mm-outputs-h">{t('app.outputs_headline')}</h3>
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mm-outputs-grid">
            {cards.map((c) => (
              <figure key={c.src} className="mm-output">
                <img src={c.src} alt={c.caption + ' ' + t('app.outputs_alt')} loading="lazy" />
                <figcaption>{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
