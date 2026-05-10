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
    'services.s1_title':  'Websites',
    'services.s1_italic': 'that convert.',
    'services.s1_copy':   'Mobile-first sites for restaurants, bars, and local brands — menus, ordering, reservations, daily specials, all stitched into one fast, hospitable experience.',
    'services.s1_proof':  'Live at The Beach Bucket Bar & Grill',
    'services.s2_title':  'Local SEO',
    'services.s2_italic': 'that ranks.',
    'services.s2_copy':   'Google Business Profile, citations, on-page schema, and review-velocity systems built for the Daytona + Orlando query layer — not generic SaaS playbooks.',
    'services.s2_proof':  '3× lift in average local visibility',
    'services.s3_title':  'Brand creative',
    'services.s3_italic': 'that sells.',
    'services.s3_copy':   'Daily-specials motion ads, signature cocktail cards, plate photography, weekly social — produced in-house and ready for print, IG, and the digital boards by service.',
    'services.s3_proof':  '50+ hospitality assets shipped',
    'services.s4_title':  'Marketing automation',
    'services.s4_italic': 'that ships.',
    'services.s4_copy':   'Specials, events, posts, email, review responses — running on autopilot so you stay on the floor and the marketing keeps moving.',
    'services.s4_proof':  '7-day rolling content engine',

    // Selected Work cinema
    'showcase.eyebrow':  'Selected Work',
    'showcase.headline': "A gallery of designs we've shipped.",
    'showcase.lede':     'Daily drinks promos, signature cocktail cards, social graphics — production-ready, brand-consistent, and printed on the bar tomorrow morning. Click any piece to view it full-detail.',
    'showcase.cta':      'View full design portfolio →',

    // Featured projects
    'featured.eyebrow':  'Featured projects',
    'featured.headline': 'Real brands. Real results.',

    // Try-it-live (Magic Menu)
    'app.eyebrow':       'Try it live',
    'app.headline_a':    'An entire restaurant studio in',
    'app.headline_b':    'one app.',
    'app.lede':          'Speak or type a prompt — Magic Menu generates entire dishes with photorealistic plating, paired drinks, scaled servings, food-cost math, and a Facebook/Instagram/TikTok caption ready to post. Built for operators who want to look premium without the studio overhead.',
    'app.open_full':     'Open full app ↗',
    'app.read_spec':     'Read the app spec',
    'app.live_label':    '— Or use it right here, no signup:',

    // Testimonials
    'testi.eyebrow':     'Client Love',
    'testi.headline':    'What our clients say.',

    // Process
    'process.eyebrow':   'How we work',
    'process.headline':  'Simple. Proven. Repeatable.',
    'process.s1_title':  'Discovery',
    'process.s1_desc':   'We audit your brand, competitors, and growth opportunities.',
    'process.s2_title':  'Strategy',
    'process.s2_desc':   'Custom roadmap for your website, SEO, and marketing systems.',
    'process.s3_title':  'Build',
    'process.s3_desc':   'Premium design and development with weekly progress updates.',
    'process.s4_title':  'Launch',
    'process.s4_desc':   'Go live, optimize, and scale with data-driven marketing.',

    // About strip on home
    'home_about.eyebrow':  'About',
    'home_about.headline': "O'Neill Myrie.",
    'home_about.lede':     "General Manager at The Beach Bucket. Founder of Myrie HQ. Hospitality operator turned marketing builder — combining real GM experience with modern marketing systems for local businesses across Florida.",
    'home_about.cta':      'Read full story →',

    // Contact
    'contact.headline': 'Ready to grow?',
    'contact.sub':      'Let’s rebuild your site and growth strategy with a premium, modern approach.',

    // Footer
    'footer.tag':         'Premium marketing systems for restaurants, bars, and local businesses across Daytona Beach + Orlando.',
    'footer.h_services':  'Services',
    'footer.h_work':      'Work',
    'footer.h_company':   'Company',
    'footer.h_contact':   'Contact',
    'footer.svc_websites':'Restaurant Websites',
    'footer.svc_seo_d':   'Local SEO Daytona',
    'footer.svc_dayt':    'Daytona Marketing',
    'footer.svc_orl':     'Orlando Marketing',
    'footer.svc_mm':      'Magic Menu',
    'footer.work_brand':  'Brand Designs',
    'footer.work_full':   'Full Portfolio',
    'footer.work_mm':     'Magic Menu Live',
    'footer.co_about':    'About Myrie',
    'footer.co_services': 'Services',
    'footer.co_work':     'Work',
    'footer.co_contact':  'Contact',
    'footer.nap':         'Daytona Beach · Orlando, FL',
    'footer.bottom_l':    '© {year} Myrie HQ. All rights reserved.',
    'footer.bottom_r':    'Premium hospitality marketing.',

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
    'services.s1_title':  'Sitios web',
    'services.s1_italic': 'que convierten.',
    'services.s1_copy':   'Sitios mobile-first para restaurantes, bares y marcas locales — menús, pedidos en línea, reservaciones, especiales diarios, todo unido en una experiencia rápida y hospitalaria.',
    'services.s1_proof':  'En vivo en The Beach Bucket Bar & Grill',
    'services.s2_title':  'SEO Local',
    'services.s2_italic': 'que posiciona.',
    'services.s2_copy':   'Perfil de Google Business, citas, schema en página, y sistemas de velocidad de reseñas construidos para Daytona + Orlando — no recetas genéricas de SaaS.',
    'services.s2_proof':  '3× aumento en visibilidad local promedio',
    'services.s3_title':  'Creatividad de marca',
    'services.s3_italic': 'que vende.',
    'services.s3_copy':   'Anuncios animados de especiales diarios, tarjetas de cócteles, fotografía de platos, contenido semanal — producido en casa y listo para impresión, IG y los tableros digitales del local.',
    'services.s3_proof':  '50+ activos de hospitalidad entregados',
    'services.s4_title':  'Automatización de marketing',
    'services.s4_italic': 'que entrega.',
    'services.s4_copy':   'Especiales, eventos, publicaciones, email, respuestas a reseñas — corriendo en piloto automático para que tú te quedes en el piso y el marketing siga moviéndose.',
    'services.s4_proof':  'Motor de contenido rotativo de 7 días',

    // Selected Work cinema
    'showcase.eyebrow':  'Trabajo seleccionado',
    'showcase.headline': 'Una galería de diseños que hemos entregado.',
    'showcase.lede':     'Promociones de bebidas diarias, tarjetas de cócteles, gráficos sociales — listos para producción, consistentes con la marca, e impresos en el bar mañana por la mañana. Haz clic en cualquier pieza para verla en detalle completo.',
    'showcase.cta':      'Ver portafolio completo de diseño →',

    // Featured projects
    'featured.eyebrow':  'Proyectos destacados',
    'featured.headline': 'Marcas reales. Resultados reales.',

    // Try-it-live (Magic Menu)
    'app.eyebrow':       'Pruébalo en vivo',
    'app.headline_a':    'Un estudio de restaurante completo en',
    'app.headline_b':    'una sola app.',
    'app.lede':          'Habla o escribe un prompt — Magic Menu genera platos enteros con plating fotorrealista, bebidas emparejadas, porciones escaladas, matemática de costos, y un caption listo para publicar en Facebook/Instagram/TikTok. Construido para operadores que quieren verse premium sin el costo de un estudio.',
    'app.open_full':     'Abrir la app completa ↗',
    'app.read_spec':     'Leer la especificación',
    'app.live_label':    '— O úsala aquí mismo, sin registro:',

    // Testimonials
    'testi.eyebrow':     'Amor de clientes',
    'testi.headline':    'Lo que dicen nuestros clientes.',

    // Process
    'process.eyebrow':   'Cómo trabajamos',
    'process.headline':  'Simple. Probado. Repetible.',
    'process.s1_title':  'Descubrimiento',
    'process.s1_desc':   'Auditamos tu marca, competidores y oportunidades de crecimiento.',
    'process.s2_title':  'Estrategia',
    'process.s2_desc':   'Hoja de ruta personalizada para tu sitio web, SEO y sistemas de marketing.',
    'process.s3_title':  'Construcción',
    'process.s3_desc':   'Diseño y desarrollo premium con actualizaciones semanales de progreso.',
    'process.s4_title':  'Lanzamiento',
    'process.s4_desc':   'Salir en vivo, optimizar y escalar con marketing basado en datos.',

    // About strip on home
    'home_about.eyebrow':  'Nosotros',
    'home_about.headline': "O'Neill Myrie.",
    'home_about.lede':     "Gerente General en The Beach Bucket. Fundador de Myrie HQ. Operador hostelero convertido en constructor de marketing — combinando experiencia real como GM con sistemas modernos de marketing para negocios locales en toda Florida.",
    'home_about.cta':      'Leer la historia completa →',

    // Contact
    'contact.headline': '¿Listo para crecer?',
    'contact.sub':      'Reconstruyamos tu sitio y tu estrategia de crecimiento con un enfoque premium y moderno.',

    // Footer
    'footer.tag':         'Sistemas de marketing premium para restaurantes, bares y negocios locales en Daytona Beach + Orlando.',
    'footer.h_services':  'Servicios',
    'footer.h_work':      'Trabajo',
    'footer.h_company':   'Compañía',
    'footer.h_contact':   'Contacto',
    'footer.svc_websites':'Sitios para Restaurantes',
    'footer.svc_seo_d':   'SEO Local Daytona',
    'footer.svc_dayt':    'Marketing Daytona',
    'footer.svc_orl':     'Marketing Orlando',
    'footer.svc_mm':      'Magic Menu',
    'footer.work_brand':  'Diseños de Marca',
    'footer.work_full':   'Portafolio Completo',
    'footer.work_mm':     'Magic Menu en Vivo',
    'footer.co_about':    'Sobre Myrie',
    'footer.co_services': 'Servicios',
    'footer.co_work':     'Trabajo',
    'footer.co_contact':  'Contacto',
    'footer.nap':         'Daytona Beach · Orlando, FL',
    'footer.bottom_l':    '© {year} Myrie HQ. Todos los derechos reservados.',
    'footer.bottom_r':    'Marketing premium de hospitalidad.',

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
