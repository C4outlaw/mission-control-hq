'use client';
import { useRef, useEffect } from 'react';

/**
 * LV-style hero — full-bleed editorial photo (or video), single tracked wordmark
 * dropped at the bottom-center, one tiny "DISCOVER →" underline link beneath.
 * No body copy. No roles list. No coordinates. The image does all the talking.
 */
export default function HeroLV() {
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const apply = () => { try { v.playbackRate = 1.0; } catch {} };
    v.addEventListener('loadedmetadata', apply);
    apply();
    return () => v.removeEventListener('loadedmetadata', apply);
  }, []);

  return (
    <section className="lv-hero" aria-label="Myrie HQ — luxury hospitality marketing">
      <video
        ref={videoRef}
        className="lv-hero-bg"
        src="/assets/hero/waterfall-hero.mp4"
        poster="/assets/hero/waterfall-hero.png"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="lv-hero-veil" />
      <div className="lv-hero-stack">
        <h1 className="lv-hero-title">MYRIE&nbsp;HQ</h1>
        <p className="lv-hero-sub">Luxury hospitality marketing — Daytona Beach &amp; Orlando</p>
        <a href="#work" className="lv-link lv-link-light">Discover the work</a>
      </div>
    </section>
  );
}
