'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Magnetic from '../motion/Magnetic';
import HeroWaterfall from '../motion/HeroWaterfall';

/**
 * Cinematic hero in the editorial-magazine "Katrine Pil" composition:
 *  - Real cascading waterfall video as base background (Grok image-to-video render)
 *  - HeroWaterfall canvas overlay — adds reactive water on click + cascade burst
 *  - Massive sans first word + flowing italic-serif second word, edge-to-edge
 *  - Tagged role subtitles
 *  - Center play button — clicking it pours extra water all over the page
 *  - Description paragraph + CTAs
 *  - Bottom row coordinate strip
 */
export default function HeroCinematic() {
  const [waterPaused, setWaterPaused] = useState(false);
  const videoRef = useRef(null);
  const [videoOk, setVideoOk] = useState(true);

  const BASE_RATE = 1.0;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const apply = () => { try { v.playbackRate = BASE_RATE; } catch {} };
    apply();
    v.addEventListener('loadedmetadata', apply);
    v.addEventListener('play', apply);
    v.addEventListener('seeking', apply);
    return () => {
      v.removeEventListener('loadedmetadata', apply);
      v.removeEventListener('play', apply);
      v.removeEventListener('seeking', apply);
    };
  }, []);

  // Click play/pause to start/stop ALL water on the page (canvases + hero video)
  const handleToggle = () => {
    const next = !waterPaused;
    setWaterPaused(next);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('waterfall:toggle', { detail: { paused: next } }));
    }
    if (videoRef.current) {
      try {
        if (next) videoRef.current.pause();
        else videoRef.current.play().catch(() => {});
      } catch {}
    }
  };

  return (
    <section className="hero-cinematic" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        {videoOk ? (
          <video
            ref={videoRef}
            className="hero-bg-video"
            src="/assets/hero/waterfall-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoOk(false)}
          />
        ) : (
          <div className="hero-bg-image" />
        )}
        <HeroWaterfall density={0.5} opacity={0.32} />
        <div className="hero-bg-veil" />
      </div>

      <div className="hero-cinematic-grid">
        {/* HEADLINE — Katrine Pil composition */}
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

        {/* TAGGED ROLES — center column */}
        <motion.div
          className="hero-roles"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
        >
          <p><span className="tag">(WEB)</span> Restaurant &amp; Bar Websites</p>
          <p><span className="tag">(SEO)</span> Local Growth Systems</p>
          <p><span className="tag">(ADS)</span> Brand Creative &amp; Automation</p>
        </motion.div>

        {/* PLAY BUTTON — pours the waterfall down the page */}
        <motion.div
          className="hero-play-wrap"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <button
            type="button"
            className={`hero-play${waterPaused ? ' is-paused' : ''}`}
            onClick={handleToggle}
            aria-label={waterPaused ? 'Start the waterfall' : 'Stop the waterfall'}
            aria-pressed={waterPaused}
          >
            <span className="hero-play-ring" aria-hidden="true" />
            <span className="hero-play-ring two" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              {waterPaused ? (
                <motion.svg
                  key="play"
                  viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ transform: 'translateX(2px)' }}
                >
                  <path d="M11 8.5v15a.5.5 0 0 0 .77.42l12.5-7.5a.5.5 0 0 0 0-.84l-12.5-7.5A.5.5 0 0 0 11 8.5z"/>
                </motion.svg>
              ) : (
                <motion.svg
                  key="pause"
                  viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect x="9" y="8" width="4.5" height="16" rx="1.5"/>
                  <rect x="18.5" y="8" width="4.5" height="16" rx="1.5"/>
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {waterPaused && (
              <motion.span
                className="hero-play-toast"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
              >Tap to flow</motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          Premium websites, brand creative, daily-specials design, and marketing automation —
          built by a hospitality operator who runs a floor every weekend, for the restaurants
          and local brands that want to look world-class and convert.
        </motion.p>

        {/* CTA ROW */}
        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <Magnetic strength={0.14}><a className="ti-btn primary" href="#contact">Book strategy call</a></Magnetic>
          <Magnetic strength={0.14}><a className="ti-btn outline" href="/projects">See the portfolio →</a></Magnetic>
        </motion.div>

        {/* COORDINATE STRIP */}
        <motion.div
          className="hero-coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.55 }}
        >
          <span className="coord-l">29.2108° N</span>
          <span className="coord-c">Daytona Beach · Orlando · Florida</span>
          <span className="coord-r">81.0228° W</span>
        </motion.div>
      </div>
    </section>
  );
}
