'use client';
import { useEffect, useState } from 'react';

export default function SiteNav({ links }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = links || [
    { href: '/#services',  label: 'Services' },
    { href: '/#showcase',  label: 'Work' },
    { href: '/projects',   label: 'Portfolio' },
    { href: '/#try-app',   label: 'Magic Menu' },
    { href: '/about',      label: 'About' },
  ];

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary navigation">
      <div className="site-nav-inner shell">
        <a href="/" className="site-brand" aria-label="Myrie HQ — home">
          <span className="brand-mark">M</span>
          <span className="brand-word">
            <span className="brand-myrie">Myrie</span><span className="brand-hq">HQ</span>
          </span>
        </a>
        <nav className="site-nav-links">
          {items.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="site-nav-cta" href="/#contact">
          <span>Book a call</span>
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </header>
  );
}
