'use client';
import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Lightweight client-side i18n.
 * - useT() returns the current translation function `t(key)`
 * - <LangProvider> wraps the app, persists choice in localStorage
 * - Toggle by calling setLang('es' | 'en')
 *
 * Add new keys to BOTH `en` and `es` blocks below.
 */
export const TRANSLATIONS = {
  en: {
    // SiteNav
    'nav.services':   'Services',
    'nav.work':       'Work',
    'nav.portfolio':  'Portfolio',
    'nav.magic_menu': 'Magic Menu',
    'nav.about':      'About',
    'nav.book_call':  'Book a call',

    // Hero
    'hero.eyebrow_locale': 'Daytona Beach · Orlando',
    'hero.role_web':       'Restaurant & Bar Websites',
    'hero.role_seo':       'Local Growth Systems',
    'hero.role_ads':       'Brand Creative & Automation',
    'hero.desc':           'Premium websites, brand creative, daily-specials design, and marketing automation — built by a hospitality operator who runs a floor every weekend, for the restaurants and local brands that want to look world-class and convert.',
    'hero.cta_primary':    'Book strategy call',
    'hero.cta_secondary':  'See the portfolio →',
    'hero.coord_center':   'Daytona Beach · Orlando · Florida',

    // Stats
    'stats.projects':   'Projects delivered',
    'stats.roi':        'Average ROI lift',
    'stats.markets':    'Florida markets',
    'stats.retention':  'Client retention',

    // Services section
    'services.eyebrow':   '— What we build',
    'services.headline_a':'Four systems.',
    'services.headline_b':'One studio.',
    'services.lede':      'Built by a GM who runs a beachfront floor every weekend — for the restaurants and local brands that want to look premium and convert.',

    // Contact
    'contact.headline': 'Ready to grow?',
    'contact.sub':      'Let’s rebuild your site and growth strategy with a premium, modern approach.',

    // Theme
    'theme.dark_aria':  'Switch to dark theme',
    'theme.light_aria': 'Switch to light theme',
  },
  es: {
    // SiteNav
    'nav.services':   'Servicios',
    'nav.work':       'Trabajo',
    'nav.portfolio':  'Portafolio',
    'nav.magic_menu': 'Magic Menu',
    'nav.about':      'Nosotros',
    'nav.book_call':  'Agenda una llamada',

    // Hero
    'hero.eyebrow_locale': 'Daytona Beach · Orlando',
    'hero.role_web':       'Sitios Web para Restaurantes y Bares',
    'hero.role_seo':       'Sistemas de Crecimiento Local',
    'hero.role_ads':       'Creatividad de Marca y Automatización',
    'hero.desc':           'Sitios web premium, creatividad de marca, diseño de especiales diarios y automatización de marketing — construido por un operador hostelero que dirige un local cada fin de semana, para restaurantes y marcas locales que quieren verse de clase mundial y convertir.',
    'hero.cta_primary':    'Agenda una llamada',
    'hero.cta_secondary':  'Ver portafolio →',
    'hero.coord_center':   'Daytona Beach · Orlando · Florida',

    // Stats
    'stats.projects':   'Proyectos entregados',
    'stats.roi':        'Aumento promedio de ROI',
    'stats.markets':    'Mercados en Florida',
    'stats.retention':  'Retención de clientes',

    // Services section
    'services.eyebrow':   '— Lo que construimos',
    'services.headline_a':'Cuatro sistemas.',
    'services.headline_b':'Un solo estudio.',
    'services.lede':      'Construido por un gerente que opera un local en la playa cada fin de semana — para los restaurantes y marcas locales que quieren verse premium y convertir.',

    // Contact
    'contact.headline': '¿Listo para crecer?',
    'contact.sub':      'Reconstruyamos tu sitio y tu estrategia de crecimiento con un enfoque premium y moderno.',

    // Theme
    'theme.dark_aria':  'Cambiar al tema oscuro',
    'theme.light_aria': 'Cambiar al tema claro',
  },
};

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('myrie_lang');
    if (saved === 'es' || saved === 'en') {
      setLangState(saved);
      document.documentElement.lang = saved;
    } else {
      // First-visit detection — default to ES if browser preference is Spanish
      const pref = (navigator.language || 'en').toLowerCase();
      if (pref.startsWith('es')) {
        setLangState('es');
        document.documentElement.lang = 'es';
      }
    }
  }, []);

  const setLang = (next) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('myrie_lang', next); } catch {}
      document.documentElement.lang = next;
    }
  };

  const t = (key) => (TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useT() {
  return useContext(LangContext);
}
