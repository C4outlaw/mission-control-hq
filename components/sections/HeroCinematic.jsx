'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Magnetic from '../motion/Magnetic';
import { useT } from '../../lib/i18n';

/**
 * Cinematic hero. Editorial restraint: wordmark + one promise + one primary CTA.
 * Waterfall video keeps the dark cinematic moment that defines the brand.
 */
export default function HeroCinematic() {
  const { t } = useT();
  const videoRef = useRef(null);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const apply = () => { try { v.playbackRate = 1.0; } catch {} };
    apply();
    v.addEventListener('loadedmetadata', apply);
    v.addEventListener('play', apply);
    return () => {
      v.removeEventListener('loadedmetadata', apply);
      v.removeEventListener('play', apply);
    };
  }, []);

  return (
    <section className="hero-cinematic" aria-labelledby="hero-title">
      <div className="hero-bg hero-bg-3d-scene" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-bg-3d-scene-video"
          src="/assets/hero/hero-3d-box.mp4"
          poster="/assets/hero/hero-3d-box.png"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoOk(false)}
        />
        <div className="hero-bg-veil" />
      </div>

      <div className="hero-cinematic-grid">
        <motion.span
          className="hero-locale"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05 }}
        >
          <span className="hero-locale-rule" aria-hidden="true" />
          Daytona Beach · Orlando · Florida
          <span className="hero-locale-rule" aria-hidden="true" />
        </motion.span>

        <h1 id="hero-title" className="hero-display">
          <motion.span
            className="hero-display-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >Myrie</motion.span>
          <motion.span
            className="hero-display-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >HQ</motion.span>
        </h1>

        <motion.p
          className="hero-promise"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          {t('hero.promise')}
        </motion.p>

        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          <Magnetic strength={0.14}>
            <a className="ti-btn primary" href="#contact">
              {t('hero.cta_primary')}
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
