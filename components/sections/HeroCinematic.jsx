'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Magnetic from '../motion/Magnetic';

/**
 * Cinematic hero — real waterfall video background, no canvas overlays.
 *  - Massive sans first word + flowing italic-serif second word, edge-to-edge
 *  - Tagged role subtitles
 *  - Description paragraph + CTAs
 *  - Bottom row coordinate strip
 */
export default function HeroCinematic() {
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
        <div className="hero-bg-veil" />
      </div>

      <div className="hero-cinematic-grid">
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

        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Premium websites, brand creative, daily-specials design, and marketing automation —
          built by a hospitality operator who runs a floor every weekend, for the restaurants
          and local brands that want to look world-class and convert.
        </motion.p>

        <motion.div
          className="hero-cta-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
        >
          <Magnetic strength={0.14}><a className="ti-btn primary" href="#contact">Book strategy call</a></Magnetic>
          <Magnetic strength={0.14}><a className="ti-btn outline" href="/projects">See the portfolio →</a></Magnetic>
        </motion.div>

        <motion.div
          className="hero-coords"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <span className="coord-l">29.2108° N</span>
          <span className="coord-c">Daytona Beach · Orlando · Florida</span>
          <span className="coord-r">81.0228° W</span>
        </motion.div>
      </div>
    </section>
  );
}
