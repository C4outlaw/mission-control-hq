'use client';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useT } from '../../lib/i18n';

export default function SiteNav({ links }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const items = links || [
    { href: '/#services',  label: t('nav.services') },
    { href: '/#showcase',  label: t('nav.work') },
    { href: '/projects',   label: t('nav.portfolio') },
    { href: '/#try-app',   label: t('nav.magic_menu') },
    { href: '/about',      label: t('nav.about') },
  ];

  return (
    <header className={`site-nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} aria-label="Primary navigation">
      <div className="site-nav-inner shell">
        <a href="/" className="site-brand" aria-label="Myrie HQ — home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">M</span>
          <span className="brand-word">
            <span className="brand-myrie">Myrie</span><span className="brand-hq">HQ</span>
          </span>
        </a>

        <nav className="site-nav-links" aria-label="Primary">
          {items.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="site-nav-actions">
          <LanguageToggle />
          <ThemeToggle />
          <a className="site-nav-cta" href="/#contact" onClick={() => setMenuOpen(false)}>
            <span>{t('nav.book_call')}</span>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </a>
          <button
            type="button"
            className="site-nav-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`site-nav-drawer${menuOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <nav className="site-nav-drawer-links" aria-label="Mobile navigation">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
        </nav>
        <a className="site-nav-drawer-cta" href="/#contact" onClick={() => setMenuOpen(false)}>
          {t('nav.book_call')} →
        </a>
      </div>
    </header>
  );
}
