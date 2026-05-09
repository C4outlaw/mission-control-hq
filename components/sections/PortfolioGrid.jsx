'use client';
import {
  ArrowUpRight, Sparkle, Frame, Palette, PenTool, Layers,
  Type, Aperture, Globe, Camera, Brush, Box, Wand2, Code,
  Cpu, Image, Music, Sparkles,
} from 'lucide-react';

/**
 * Dark "About + Stack" portfolio section, adapted from a Max-Reed-style
 * personal portfolio layout. Full-bleed cinema dark, three-column grid,
 * liquid-glass elements, marquee tool icons, real Beach Bucket video
 * backgrounds.
 */
export default function PortfolioGrid() {
  const row1 = [Frame, Wand2, Palette, PenTool, Layers, Type, Aperture, Globe];
  const row2 = [Camera, Brush, Box, Sparkles, Code, Cpu, Image, Music];

  return (
    <section className="pgrid">
      {/* Header */}
      <div className="pgrid-head">
        <div className="pgrid-head-copy">
          <h2 className="pgrid-h">Hi, I&apos;m O&apos;Neill Myrie!</h2>
          <p className="pgrid-lede">
            A Daytona Beach hospitality operator turned marketing builder. I help restaurants, bars,
            and local brands look premium and convert — built from a decade running floors and
            shipping campaigns that actually move.
          </p>
        </div>
        <a href="#contact" className="liquid-glass pgrid-cta">
          <span>Let&apos;s team up today</span>
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
      </div>

      {/* Grid */}
      <div className="pgrid-cols">
        {/* COL 1 — Background + timeline */}
        <article className="pgrid-card pgrid-bg">
          <video
            className="pgrid-card-vid" autoPlay loop muted playsInline
            src="/assets/hero/waterfall-hero.mp4"
            aria-hidden="true"
          />
          <div className="pgrid-card-veil" />
          <div className="pgrid-card-content pgrid-bg-content">
            <div className="pgrid-label">
              <Sparkle size={12} strokeWidth={1.5} />
              <span>Background</span>
              <Sparkle size={12} strokeWidth={1.5} />
            </div>
            <div className="pgrid-timeline">
              <span className="pgrid-tl-year">2023–Now</span>
              <Sparkle size={12} strokeWidth={1.5} className="pgrid-tl-sep" />
              <span className="pgrid-tl-role">Founder</span>
              <span className="pgrid-tl-where">Myrie HQ</span>

              <span className="pgrid-tl-year">2018–Now</span>
              <Sparkle size={12} strokeWidth={1.5} className="pgrid-tl-sep" />
              <span className="pgrid-tl-role">General Manager</span>
              <span className="pgrid-tl-where">The Beach Bucket</span>

              <span className="pgrid-tl-year">2025</span>
              <Sparkle size={12} strokeWidth={1.5} className="pgrid-tl-sep" />
              <span className="pgrid-tl-role">Built</span>
              <span className="pgrid-tl-where">Magic Menu</span>
            </div>
          </div>
        </article>

        {/* COL 2 — Client Voice + 50+ */}
        <div className="pgrid-stack">
          <article className="pgrid-card pgrid-quote noise-overlay">
            <div className="pgrid-card-content">
              <div className="pgrid-label justify-start">
                <Sparkle size={12} strokeWidth={1.5} />
                <span>Client Voice</span>
                <Sparkle size={12} strokeWidth={1.5} />
              </div>
              <blockquote className="pgrid-quote-text">
                &ldquo;Myrie HQ completely transformed our online presence. We saw a 40% increase
                in online orders. The process felt graceful, and the outcomes speak for themselves.&rdquo;
              </blockquote>
              <p className="pgrid-quote-attr">
                <strong>Restaurant Owner</strong>, Daytona Beach
              </p>
            </div>
          </article>

          <article className="pgrid-card pgrid-stat">
            <video
              className="pgrid-card-vid" autoPlay loop muted playsInline
              src="/assets/work/beach-bucket-design/drink-ads/saturday.mp4"
              aria-hidden="true"
            />
            <div className="pgrid-card-veil" />
            <div className="pgrid-card-content pgrid-stat-content">
              <span className="pgrid-stat-num">50+</span>
              <span className="pgrid-stat-label">Hospitality projects shipped</span>
            </div>
          </article>
        </div>

        {/* COL 3 — Daily Software + Reach Me */}
        <div className="pgrid-stack">
          <article className="pgrid-card pgrid-tools">
            <video
              className="pgrid-card-vid" autoPlay loop muted playsInline
              src="/assets/work/beach-bucket-design/drink-ads/wednesday.mp4"
              aria-hidden="true"
            />
            <div className="pgrid-card-veil" />
            <div className="pgrid-card-content pgrid-tools-content">
              <div className="pgrid-label">
                <Sparkle size={12} strokeWidth={1.5} />
                <span>Daily Software</span>
                <Sparkle size={12} strokeWidth={1.5} />
              </div>
              <div className="pgrid-marquees">
                <div className="pgrid-marquee-row">
                  <div className="pgrid-marquee-track animate-marquee-left">
                    {[...row1, ...row1].map((Ic, i) => (
                      <span key={i} className="liquid-glass pgrid-tool"><Ic size={22} strokeWidth={1.5} /></span>
                    ))}
                  </div>
                </div>
                <div className="pgrid-marquee-row">
                  <div className="pgrid-marquee-track animate-marquee-right">
                    {[...row2, ...row2].map((Ic, i) => (
                      <span key={i} className="liquid-glass pgrid-tool"><Ic size={22} strokeWidth={1.5} /></span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="pgrid-card pgrid-reach noise-overlay">
            <div className="pgrid-card-content">
              <div className="pgrid-reach-row">
                <div className="pgrid-label justify-start">
                  <Sparkle size={12} strokeWidth={1.5} />
                  <span>Reach Me</span>
                  <Sparkle size={12} strokeWidth={1.5} />
                </div>
                <a className="liquid-glass pgrid-reach-icon" href="#contact" aria-label="Contact">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </a>
              </div>
              <a href="mailto:myriework@gmail.com" className="pgrid-reach-line">myriework@gmail.com</a>
              <a href="tel:+13867958727" className="pgrid-reach-line">+1 (386) 795-8727</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
