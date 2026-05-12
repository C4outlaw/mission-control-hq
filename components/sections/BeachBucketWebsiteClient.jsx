'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from '../motion/Reveal';
import Magnetic from '../motion/Magnetic';
import { useT } from '../../lib/i18n';

const LIVE_PATH = '/beach-bucket-live';

export default function BeachBucketWebsiteClient() {
  const { t } = useT();
  const mockRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Lazy-load the iframes only when the device mockup scrolls into view
  useEffect(() => {
    if (!mockRef.current || loaded) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaded(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(mockRef.current);
    return () => io.disconnect();
  }, [loaded]);

  const techStack = [
    { label: t('bbw.tech_vite'),     value: 'Vite + vanilla JS' },
    { label: t('bbw.tech_video'),    value: t('bbw.tech_video_v') },
    { label: t('bbw.tech_menu'),     value: t('bbw.tech_menu_v') },
    { label: t('bbw.tech_i18n'),     value: 'EN + ES' },
    { label: t('bbw.tech_perf'),     value: t('bbw.tech_perf_v') },
    { label: t('bbw.tech_deploy'),   value: 'Vercel' },
  ];

  const features = [
    { h: t('bbw.feat1_h'), p: t('bbw.feat1_p') },
    { h: t('bbw.feat2_h'), p: t('bbw.feat2_p') },
    { h: t('bbw.feat3_h'), p: t('bbw.feat3_p') },
    { h: t('bbw.feat4_h'), p: t('bbw.feat4_p') },
    { h: t('bbw.feat5_h'), p: t('bbw.feat5_p') },
    { h: t('bbw.feat6_h'), p: t('bbw.feat6_p') },
  ];

  return (
    <>
      <section className="port-hero bbw-hero">
        <div className="shell port-hero-copy">
          <Reveal>
            <span className="eyebrow bbw-eyebrow">
              <span className="live-dot" aria-hidden="true" />
              {t('bbw.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display port-hero-title">
              {t('bbw.title_a')} <em className="accent-italic">{t('bbw.title_italic')}</em>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="lead hero-sub">{t('bbw.sub')}</p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="cta-actions" style={{ marginTop: 32 }}>
              <Magnetic>
                <a className="ti-btn primary" href={LIVE_PATH} target="_blank" rel="noopener">
                  {t('bbw.cta_open')} →
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bbw-stage">
        <div className="shell">
          <Reveal>
            <div className="device-mockup" ref={mockRef}>
              <div className="laptop">
                <div className="laptop-screen">
                  <div className="laptop-bar" aria-hidden="true">
                    <span className="ltd r" /><span className="ltd y" /><span className="ltd g" />
                    <span className="laptop-url">thebeachbucket.com</span>
                  </div>
                  <div className="laptop-viewport">
                    {loaded ? (
                      <iframe
                        src={LIVE_PATH}
                        title={t('bbw.iframe_title_laptop')}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    ) : (
                      <div className="iframe-skeleton" aria-hidden="true" />
                    )}
                  </div>
                </div>
                <div className="laptop-base" aria-hidden="true">
                  <div className="laptop-notch" />
                </div>
              </div>

              <div className="phone">
                <div className="phone-frame">
                  <div className="phone-notch" aria-hidden="true" />
                  <div className="phone-viewport">
                    {loaded ? (
                      <iframe
                        src={LIVE_PATH}
                        title={t('bbw.iframe_title_phone')}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    ) : (
                      <div className="iframe-skeleton" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="bbw-mock-caption">{t('bbw.mock_caption')}</p>
          </Reveal>
        </div>
      </section>

      <section className="shell block bbw-details">
        <div className="bbw-details-grid">
          <Reveal>
            <div>
              <span className="eyebrow gold">{t('bbw.what_eyebrow')}</span>
              <h2 className="tropical-h2">{t('bbw.what_h')}</h2>
              <p className="lead bbw-what-lead">{t('bbw.what_lead')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <dl className="tech-stack">
              {techStack.map((row) => (
                <div className="tech-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="shell block">
        <Reveal><span className="eyebrow">{t('bbw.feat_eyebrow')}</span></Reveal>
        <Reveal delay={0.1}>
          <h2 className="tropical-h2">{t('bbw.feat_h_a')} <em className="accent-italic">{t('bbw.feat_h_italic')}</em>.</h2>
        </Reveal>
        <div className="bbw-feat-grid">
          {features.map((f, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <article className="bbw-feat-card">
                <span className="bbw-feat-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="bbw-feat-h">{f.h}</h3>
                <p className="bbw-feat-p">{f.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cinema bbw-final-cta">
        <div className="shell" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="tropical-h2">{t('bbw.final_h_a')} <em className="accent-italic">{t('bbw.final_h_italic')}</em></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead" style={{ maxWidth: 640, margin: '20px auto 36px' }}>{t('bbw.final_lead')}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="cta-actions">
              <Magnetic>
                <a className="ti-btn primary" href={LIVE_PATH} target="_blank" rel="noopener">
                  {t('bbw.cta_open')} →
                </a>
              </Magnetic>
              <Magnetic>
                <a className="ti-btn" href="mailto:myriework@gmail.com?subject=Build%20me%20a%20website%20like%20Beach%20Bucket">
                  {t('bbw.cta_build')}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
