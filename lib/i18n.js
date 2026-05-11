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
    'nav.magic_menu': 'Menu Magic App',
    'nav.about':      'About',
    'nav.book_call':  'Book a call',

    // Hero
    'hero.eyebrow_locale': 'Daytona Beach · Orlando',
    'hero.promise':        'Hospitality marketing, built on the line.',
    'hero.cta_primary':    'Book a call',

    // Stats
    'stats.projects':   'Projects delivered',
    'stats.roi':        'Average ROI lift',
    'stats.markets':    'Florida markets',
    'stats.retention':  'Client retention',

    // Services section
    'services.eyebrow':   'What we build',
    'services.headline_a':'Four systems.',
    'services.headline_b':'One studio.',
    'services.lede':      'Built by a GM who runs a beachfront floor every weekend: for the restaurants and local brands that want to look premium and convert.',
    'services.s1_title':  'Websites',
    'services.s1_italic': 'that convert.',
    'services.s1_copy':   'Mobile-first sites for restaurants, bars, and local brands: menus, ordering, reservations, daily specials, all stitched into one fast, hospitable experience.',
    'services.s1_proof':  'Live at The Beach Bucket Bar & Grill',
    'services.s2_title':  'Local SEO',
    'services.s2_italic': 'that ranks.',
    'services.s2_copy':   'Google Business Profile, citations, on-page schema, and review-velocity systems built for the Daytona + Orlando query layer: not generic SaaS playbooks.',
    'services.s2_proof':  '3× lift in average local visibility',
    'services.s3_title':  'Brand creative',
    'services.s3_italic': 'that sells.',
    'services.s3_copy':   'Daily-specials motion ads, signature cocktail cards, plate photography, weekly social: produced in-house and ready for print, IG, and the digital boards by service.',
    'services.s3_proof':  '50+ hospitality assets shipped',
    'services.s4_title':  'Marketing automation',
    'services.s4_italic': 'that ships.',
    'services.s4_copy':   'Specials, events, posts, email, review responses: running on autopilot so you stay on the floor and the marketing keeps moving.',
    'services.s4_proof':  '7-day rolling content engine',

    // Selected Work cinema
    'showcase.eyebrow':  'Selected Work',
    'showcase.headline': "A gallery of designs we've shipped.",
    'showcase.lede':     'Daily drinks promos, signature cocktail cards, social graphics: production-ready, brand-consistent, and printed on the bar tomorrow morning. Click any piece to view it full-detail.',
    'showcase.cta':      'View full design portfolio →',

    // Featured projects
    'featured.eyebrow':  'Featured projects',
    'featured.headline': 'Real brands. Real results.',

    // Try-it-live (Magic Menu)
    'app.eyebrow':       'Try it live',
    'app.headline_a':    'An entire restaurant studio in',
    'app.headline_b':    'one app.',
    'app.lede':          'Speak or type a prompt: Magic Menu generates entire dishes with photorealistic plating, paired drinks, scaled servings, food-cost math, and a Facebook/Instagram/TikTok caption ready to post. Built for operators who want to look premium without the studio overhead.',
    'app.open_full':     'Open full app ↗',
    'app.read_spec':     'Read the app spec',
    'app.live_label':    'Or use it right here, no signup:',

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
    'home_about.lede':     "General Manager at The Beach Bucket. Founder of Myrie HQ. Hospitality operator turned marketing builder: combining real GM experience with modern marketing systems for local businesses across Florida.",
    'home_about.cta':      'Read full story →',

    // Contact
    'contact.headline': 'Ready to grow?',
    'contact.sub':      'Let’s rebuild your site and growth strategy with a premium, modern approach.',

    // About page
    'about.eyebrow':       'About the founder',
    'about.title_main':    "O'Neill",
    'about.title_italic':  'Myrie.',
    'about.lead':          'General Manager at The Beach Bucket. Founder of Myrie HQ. Hospitality operator turned marketing builder: combining real GM experience with modern marketing systems for local businesses across Florida.',
    'about.cta_contact':   'Contact Myrie',
    'about.cta_work':      'See the work →',
    'about.story_eyebrow': 'The story',
    'about.story_h_a':     'Built on the',
    'about.story_h_italic':'line',
    'about.story_h_b':     ', not in a deck.',
    'about.story_p1':      "O'Neill leads at the intersection of operations and marketing. The day-to-day of running a beachfront bar & grill: the rushes, the inventory, the staff, the daily specials, the tourists vs locals: that's the lens behind every project at Myrie HQ.",
    'about.story_p2':      "The mission is simple: help local businesses look world-class online and convert that visibility into real revenue. Through Myrie HQ, O'Neill supports restaurants, bars, and local brands across Daytona Beach and Orlando with modern web design, local SEO, brand creative, and the kind of marketing systems that actually ship every week.",
    'about.principles_eyebrow': 'Principles',
    'about.principles_headline':'How we work.',
    'about.b1_title':      'Operations first',
    'about.b1_desc':       'Marketing that ignores how the kitchen and bar actually run is theatre. Real growth starts at the line.',
    'about.b2_title':      'Ship every week',
    'about.b2_desc':       'Daily specials, weekly content, monthly campaigns. The system has to ship: not sit in Figma.',
    'about.b3_title':      'Measure what moves',
    'about.b3_desc':       'Vanity metrics waste budgets. We track the numbers that change covers, online orders, and reviews.',
    'about.b4_title':      'Local-first',
    'about.b4_desc':       'Daytona + Orlando are different markets. Hyper-local SEO, real-place context, and on-the-ground knowledge win.',
    'about.timeline_eyebrow': 'Timeline',
    'about.timeline_h_a':  'From the floor to the',
    'about.timeline_h_italic':'studio.',
    'about.tl_today_year': 'Today',
    'about.tl_today_title':'General Manager + Founder',
    'about.tl_today_desc': 'Running The Beach Bucket day-to-day. Building Myrie HQ as a marketing studio for hospitality + local businesses.',
    'about.tl_2025_year':  '2025',
    'about.tl_2025_title': 'Magic Menu app',
    'about.tl_2025_desc':  'Shipped the menu-engineering operations app: daily specials, recipes, food cost, content engine in one workflow.',
    'about.tl_2024_year':  '2024',
    'about.tl_2024_title': 'Brand commercial system',
    'about.tl_2024_desc':  'Built the cinematic-commercial + daily-drink-specials production loop that runs at The Beach Bucket every week.',
    'about.tl_earlier_year':'Earlier',
    'about.tl_earlier_title':'Hospitality + ops experience',
    'about.tl_earlier_desc':'Years on the floor: bar, grill, beachfront operations, customer service, brand, and scale.',
    'about.cta_h_a':       'Ready to',
    'about.cta_h_italic':  'grow',
    'about.cta_h_b':       '?',

    // Beach Bucket case study
    'bb.eyebrow':             'Selected Work',
    'bb.title_a':             'Hospitality design',
    'bb.title_italic':        'portfolio.',
    'bb.sub':                 'Daily-drink specials, signature cocktail cards, breakfast plate photography, and full menu rebuilds: produced for hospitality clients and ready to drop into any social, web, or in-venue channel.',
    'bb.s1_eyebrow':          'Section 01 · Daily Drinks',
    'bb.s1_h':                'A full week of cocktail cards.',
    'bb.s1_lede':             '15 cocktail & daily-promo designs. A full-week social calendar plus seven signature cocktail cards: each piece publishes to Instagram, the website, and in-venue digital boards in one motion. Click any card to view it full-detail.',
    'bb.s2_eyebrow':          'Section 02 · Breakfast',
    'bb.s2_h_a':              'Editorial breakfast',
    'bb.s2_h_italic':         'photography.',
    'bb.s2_lede':             'Four hero plates: The Big Beach, The Sunrise, The Early Bird, The Healthy Surfer. Color-graded for the brand palette and production-ready for menus, social, and online ordering.',
    'bb.s3_eyebrow':          'Section 03 · Menu',
    'bb.s3_h':                'A redesigned menu, top to bottom.',
    'bb.s3_lede':             'A redesigned hero menu illustration plus production-ready spreads delivered for both print runs and the digital menu pages.',
    'bb.cap_grid':            'Daily Drinks Specials: full-week social grid',
    'bb.cap_promo':           'themed daily promo card',
    'bb.cap_signature':       'signature cocktail card',
    'bb.cap_feature_plate':   'feature plate',
    'bb.cap_daily_breakfast': 'daily breakfast',
    'bb.cap_early_bird':      'The Early Bird',
    'bb.cap_healthy_surfer':  'The Healthy Surfer',
    'bb.cap_menu_hero':       'Hero menu illustration: The Big Beach',
    'bb.cap_menu_spread':     'Print + digital menu spread',
    'bb.cta_start':           'Start your project',
    'bb.cta_more':            'See more work',
    'bb.day_monday':          'Monday',
    'bb.day_tuesday':         'Tuesday',
    'bb.day_wednesday':       'Wednesday',
    'bb.day_thursday':        'Thursday',
    'bb.day_friday':          'Friday',
    'bb.day_saturday':        'Saturday',
    'bb.day_sunday':          'Sunday',

    // Projects index page
    'proj.eyebrow':           'PORTFOLIO',
    'proj.h_a':               'REAL BRANDS.',
    'proj.h_italic':          'real',
    'proj.h_b':               'RESULTS.',
    'proj.lede':              "Selected work across Daytona Beach + Orlando: full-stack brand builds, websites that convert, commercials that travel, and automation that runs while you're in service.",
    'proj.featured_pill':     'FEATURED',
    'proj.featured_tag':      'BRAND DESIGN · PHOTOGRAPHY · MENUS',
    'proj.featured_title':    'Hospitality Brand Designs',
    'proj.featured_blurb':    'Daily-drink specials, signature cocktail cards, breakfast plate photography, and full menu rebuilds delivered for hospitality clients across Florida.',
    'proj.metric1_num':       '15',
    'proj.metric1_label':     'Drink-special designs',
    'proj.metric2_num':       '10',
    'proj.metric2_label':     'Plate photo shoots',
    'proj.metric3_num':       '4',
    'proj.metric3_label':     'Menu spreads',
    'proj.view_case':         'View full case study →',
    'proj.more_eyebrow':      'MORE WORK',
    'proj.more_h_a':          'Selected',
    'proj.more_h_italic':     'projects',
    'proj.view_project':      'View project →',
    'proj.r1_title':          'Magic Menu App',
    'proj.r1_tag':            'SAAS · OPERATIONS',
    'proj.r1_blurb':          'Operations app for menu engineering, daily specials, food costing, and content automation. Live demo embedded on the home page.',
    'proj.r2_title':          'Daytona Beach Marketing',
    'proj.r2_tag':            'AGENCY · LOCAL SEO',
    'proj.r2_blurb':          'Local marketing program for Daytona Beach restaurants, bars, and tourism businesses.',
    'proj.r3_title':          'Local SEO Orlando',
    'proj.r3_tag':            'SEO · GROWTH',
    'proj.r3_blurb':          'Citation cleanup, GBP optimization, and review velocity systems for Orlando local businesses.',
    'proj.r4_title':          'Restaurant Web Design: Daytona',
    'proj.r4_tag':            'WEB DESIGN · CONVERSION',
    'proj.r4_blurb':          'Conversion-focused restaurant websites with menu workflows, online ordering, and reservations.',
    'proj.r5_title':          'Orlando Marketing Agency',
    'proj.r5_tag':            'AGENCY · BRAND',
    'proj.r5_blurb':          'Full-service marketing for Orlando restaurants, bars, and hospitality businesses.',
    'proj.cta_h_a':           'Have a',
    'proj.cta_h_italic':      'restaurant',
    'proj.cta_h_b':           'or local brand?',
    'proj.cta_lead':          "Let's build the next case study together.",
    'proj.cta_start':         'Start your project',

    // SEO landing: common (shared across all 4)
    'seo.cta_book':         'Book a strategy call',
    'seo.cta_portfolio':    'See the portfolio →',
    'seo.what_we_build':    'What we build',
    'seo.built_for':        'Built for',

    // Daytona Beach Marketing Agency
    'seo_daytona.eyebrow':         'Daytona Beach, FL',
    'seo_daytona.title':           'Daytona Beach',
    'seo_daytona.italic':          'marketing agency.',
    'seo_daytona.sub':             'Myrie HQ builds premium websites and local growth systems for Daytona Beach businesses: restaurants, bars, coffee shops, and local service brands. We help you improve visibility, trust, and conversions in the market we operate in every day.',
    'seo_daytona.s1_title':        'Restaurant + Bar Websites',
    'seo_daytona.s1_copy':         'Conversion-focused redesigns with menu workflows, online ordering, and reservation flows tuned for the Daytona market.',
    'seo_daytona.s2_title':        'Local SEO',
    'seo_daytona.s2_copy':         'Google Business Profile, citation cleanup, on-page schema, review velocity: built for Daytona Beach search.',
    'seo_daytona.s3_title':        'Brand & Campaign Creative',
    'seo_daytona.s3_copy':         'Daily-specials cards, signature cocktail decks, plate photography, and weekly content that ships.',
    'seo_daytona.s4_title':        'Marketing Automation',
    'seo_daytona.s4_copy':         'Specials, events, posts, email: running on autopilot so you stay in service.',
    'seo_daytona.contact_h':       'Ready to grow in Daytona?',
    'seo_daytona.contact_sub':     'Talk to an operator who runs a beachfront floor every weekend.',

    // Local SEO Orlando
    'seo_orlando_seo.eyebrow':     'Orlando, FL',
    'seo_orlando_seo.title':       'Local SEO that',
    'seo_orlando_seo.italic':      'actually ranks.',
    'seo_orlando_seo.sub':         'Myrie HQ helps Orlando businesses rank higher in local search and attract higher-intent customers: Google Business Profile, citations, on-page schema, and the kind of review velocity that moves the map.',
    'seo_orlando_seo.s1_title':    'Google Business Profile',
    'seo_orlando_seo.s1_copy':     'Full-stack GBP optimization: categories, services, posts, photos, Q&A, and review-velocity systems.',
    'seo_orlando_seo.s2_title':    'Local landing pages',
    'seo_orlando_seo.s2_copy':     'Service-area pages with internal linking and schema, built to dominate the local query layer.',
    'seo_orlando_seo.s3_title':    'On-page + metadata',
    'seo_orlando_seo.s3_copy':     'Title tags, schema, headings, and content structure tuned to your real Orlando search intent.',
    'seo_orlando_seo.s4_title':    'Authority content',
    'seo_orlando_seo.s4_copy':     'Editorial calendars and authority pieces that compound visibility over weeks, not months.',
    'seo_orlando_seo.contact_h':   'Ready to rank in Orlando?',
    'seo_orlando_seo.contact_sub': 'Talk to an operator who runs a hospitality floor: and a marketing studio that ships every week.',

    // Orlando Marketing Agency
    'seo_orlando_mkt.eyebrow':     'Orlando, FL',
    'seo_orlando_mkt.title':       'Orlando',
    'seo_orlando_mkt.italic':      'marketing agency.',
    'seo_orlando_mkt.sub':         'We help Orlando restaurants, bars, and local brands build stronger online positioning with modern websites, local SEO execution, and conversion-ready marketing systems: built by hospitality operators.',
    'seo_orlando_mkt.s1_title':    'Premium website rebuilds',
    'seo_orlando_mkt.s1_copy':     'Conversion-focused redesigns with real menu, ordering, and reservation flows for Orlando hospitality.',
    'seo_orlando_mkt.s2_title':    'Local search architecture',
    'seo_orlando_mkt.s2_copy':     'GBP, citations, on-page schema, and content structure tuned for the Orlando query layer.',
    'seo_orlando_mkt.s3_title':    'Growth content + campaigns',
    'seo_orlando_mkt.s3_copy':     'Daily-specials cards, plate photography, and seasonal campaigns: production-ready every week.',
    'seo_orlando_mkt.s4_title':    'Brand systems',
    'seo_orlando_mkt.s4_copy':     'Editorial-grade brand creative and trust assets that lift conversion and authority simultaneously.',
    'seo_orlando_mkt.contact_h':   'Ready to grow in Orlando?',
    'seo_orlando_mkt.contact_sub': 'Premium websites + local SEO + content systems that ship every week.',

    // Restaurant Web Design Daytona
    'seo_restaurant.eyebrow':      'Daytona Beach, FL',
    'seo_restaurant.title':        'Restaurant web design',
    'seo_restaurant.italic':       'that converts.',
    'seo_restaurant.sub':          'We design and rebuild restaurant websites for Daytona Beach brands that want a premium digital presence, faster mobile, and better conversion: built by an operator who runs a beachfront floor every weekend.',
    'seo_restaurant.s1_title':     'Modern home + menu architecture',
    'seo_restaurant.s1_copy':      'Clear, conversion-focused menu structure with online ordering, reservation, and call-to-action flows.',
    'seo_restaurant.s2_title':     'Fast mobile performance',
    'seo_restaurant.s2_copy':      'Lazy-loaded media, optimized images, and a mobile-first layout that loads in under two seconds.',
    'seo_restaurant.s3_title':     'Visual storytelling',
    'seo_restaurant.s3_copy':      'Photo + video sections that capture the room, the plates, and the hospitality.',
    'seo_restaurant.s4_title':     'SEO-friendly structure',
    'seo_restaurant.s4_copy':      'Local SEO architecture baked into the build: schema, headings, and metadata tuned for Daytona search.',
    'seo_restaurant.contact_h':    'Ready to redesign your restaurant?',
    'seo_restaurant.contact_sub':  'A premium site, with the SEO structure and conversion logic baked in.',

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
    'nav.magic_menu': 'Menu Magic App',
    'nav.about':      'Nosotros',
    'nav.book_call':  'Agenda una llamada',

    // Hero
    'hero.eyebrow_locale': 'Daytona Beach · Orlando',
    'hero.promise':        'Marketing de hospitalidad, hecho en la línea.',
    'hero.cta_primary':    'Agenda una llamada',

    // Stats
    'stats.projects':   'Proyectos entregados',
    'stats.roi':        'Aumento promedio de ROI',
    'stats.markets':    'Mercados en Florida',
    'stats.retention':  'Retención de clientes',

    // Services section
    'services.eyebrow':   'Lo que construimos',
    'services.headline_a':'Cuatro sistemas.',
    'services.headline_b':'Un solo estudio.',
    'services.lede':      'Construido por un gerente que opera un local en la playa cada fin de semana: para los restaurantes y marcas locales que quieren verse premium y convertir.',
    'services.s1_title':  'Sitios web',
    'services.s1_italic': 'que convierten.',
    'services.s1_copy':   'Sitios mobile-first para restaurantes, bares y marcas locales: menús, pedidos en línea, reservaciones, especiales diarios, todo unido en una experiencia rápida y hospitalaria.',
    'services.s1_proof':  'En vivo en The Beach Bucket Bar & Grill',
    'services.s2_title':  'SEO Local',
    'services.s2_italic': 'que posiciona.',
    'services.s2_copy':   'Perfil de Google Business, citas, schema en página, y sistemas de velocidad de reseñas construidos para Daytona + Orlando: no recetas genéricas de SaaS.',
    'services.s2_proof':  '3× aumento en visibilidad local promedio',
    'services.s3_title':  'Creatividad de marca',
    'services.s3_italic': 'que vende.',
    'services.s3_copy':   'Anuncios animados de especiales diarios, tarjetas de cócteles, fotografía de platos, contenido semanal: producido en casa y listo para impresión, IG y los tableros digitales del local.',
    'services.s3_proof':  '50+ activos de hospitalidad entregados',
    'services.s4_title':  'Automatización de marketing',
    'services.s4_italic': 'que entrega.',
    'services.s4_copy':   'Especiales, eventos, publicaciones, email, respuestas a reseñas: corriendo en piloto automático para que tú te quedes en el piso y el marketing siga moviéndose.',
    'services.s4_proof':  'Motor de contenido rotativo de 7 días',

    // Selected Work cinema
    'showcase.eyebrow':  'Trabajo seleccionado',
    'showcase.headline': 'Una galería de diseños que hemos entregado.',
    'showcase.lede':     'Promociones de bebidas diarias, tarjetas de cócteles, gráficos sociales: listos para producción, consistentes con la marca, e impresos en el bar mañana por la mañana. Haz clic en cualquier pieza para verla en detalle completo.',
    'showcase.cta':      'Ver portafolio completo de diseño →',

    // Featured projects
    'featured.eyebrow':  'Proyectos destacados',
    'featured.headline': 'Marcas reales. Resultados reales.',

    // Try-it-live (Magic Menu)
    'app.eyebrow':       'Pruébalo en vivo',
    'app.headline_a':    'Un estudio de restaurante completo en',
    'app.headline_b':    'una sola app.',
    'app.lede':          'Habla o escribe un prompt: Magic Menu genera platos enteros con plating fotorrealista, bebidas emparejadas, porciones escaladas, matemática de costos, y un caption listo para publicar en Facebook/Instagram/TikTok. Construido para operadores que quieren verse premium sin el costo de un estudio.',
    'app.open_full':     'Abrir la app completa ↗',
    'app.read_spec':     'Leer la especificación',
    'app.live_label':    'O úsala aquí mismo, sin registro:',

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
    'home_about.lede':     "Gerente General en The Beach Bucket. Fundador de Myrie HQ. Operador hostelero convertido en constructor de marketing: combinando experiencia real como GM con sistemas modernos de marketing para negocios locales en toda Florida.",
    'home_about.cta':      'Leer la historia completa →',

    // Contact
    'contact.headline': '¿Listo para crecer?',
    'contact.sub':      'Reconstruyamos tu sitio y tu estrategia de crecimiento con un enfoque premium y moderno.',

    // About page
    'about.eyebrow':       'Sobre el fundador',
    'about.title_main':    "O'Neill",
    'about.title_italic':  'Myrie.',
    'about.lead':          'Gerente General en The Beach Bucket. Fundador de Myrie HQ. Operador hostelero convertido en constructor de marketing: combinando experiencia real como GM con sistemas modernos de marketing para negocios locales en toda Florida.',
    'about.cta_contact':   'Contactar a Myrie',
    'about.cta_work':      'Ver el trabajo →',
    'about.story_eyebrow': 'La historia',
    'about.story_h_a':     'Construido en la',
    'about.story_h_italic':'línea',
    'about.story_h_b':     ', no en una presentación.',
    'about.story_p1':      "O'Neill lidera en la intersección de operaciones y marketing. El día a día de operar un bar y grill en la playa: las horas pico, el inventario, el personal, los especiales diarios, los turistas vs los locales: esa es la lente detrás de cada proyecto en Myrie HQ.",
    'about.story_p2':      "La misión es simple: ayudar a los negocios locales a verse de clase mundial en línea y convertir esa visibilidad en ingresos reales. A través de Myrie HQ, O'Neill apoya a restaurantes, bares y marcas locales en Daytona Beach y Orlando con diseño web moderno, SEO local, creatividad de marca, y el tipo de sistemas de marketing que realmente entregan cada semana.",
    'about.principles_eyebrow': 'Principios',
    'about.principles_headline':'Cómo trabajamos.',
    'about.b1_title':      'Operaciones primero',
    'about.b1_desc':       'El marketing que ignora cómo la cocina y el bar funcionan en realidad es teatro. El crecimiento real empieza en la línea.',
    'about.b2_title':      'Entregar cada semana',
    'about.b2_desc':       'Especiales diarios, contenido semanal, campañas mensuales. El sistema tiene que entregar: no quedarse en Figma.',
    'about.b3_title':      'Medir lo que mueve',
    'about.b3_desc':       'Las métricas de vanidad desperdician presupuestos. Rastreamos los números que cambian cubiertos, pedidos en línea y reseñas.',
    'about.b4_title':      'Lo local primero',
    'about.b4_desc':       'Daytona + Orlando son mercados diferentes. SEO hiper-local, contexto del lugar real, y conocimiento de campo ganan.',
    'about.timeline_eyebrow': 'Línea de tiempo',
    'about.timeline_h_a':  'Del piso al',
    'about.timeline_h_italic':'estudio.',
    'about.tl_today_year': 'Hoy',
    'about.tl_today_title':'Gerente General + Fundador',
    'about.tl_today_desc': 'Operando The Beach Bucket día a día. Construyendo Myrie HQ como estudio de marketing para hospitalidad + negocios locales.',
    'about.tl_2025_year':  '2025',
    'about.tl_2025_title': 'App Magic Menu',
    'about.tl_2025_desc':  'Lanzamos la app de operaciones de ingeniería de menús: especiales diarios, recetas, costo de comida, motor de contenido en un solo flujo.',
    'about.tl_2024_year':  '2024',
    'about.tl_2024_title': 'Sistema comercial de marca',
    'about.tl_2024_desc':  'Construido el loop de producción cinematográfica + especiales de bebidas diarios que corre en The Beach Bucket cada semana.',
    'about.tl_earlier_year':'Antes',
    'about.tl_earlier_title':'Experiencia en hospitalidad + ops',
    'about.tl_earlier_desc':'Años en el piso: bar, grill, operaciones de playa, servicio al cliente, marca y escala.',
    'about.cta_h_a':       '¿Listo para',
    'about.cta_h_italic':  'crecer',
    'about.cta_h_b':       '?',

    // Beach Bucket case study
    'bb.eyebrow':             'Trabajo seleccionado',
    'bb.title_a':             'Portafolio de diseño',
    'bb.title_italic':        'de hospitalidad.',
    'bb.sub':                 'Especiales de bebidas diarias, tarjetas de cócteles, fotografía de platos de desayuno, y reconstrucciones completas de menús: producido para clientes de hospitalidad y listo para cualquier canal social, web o en el local.',
    'bb.s1_eyebrow':          'Sección 01 · Bebidas Diarias',
    'bb.s1_h':                'Una semana completa de tarjetas de cócteles.',
    'bb.s1_lede':             '15 diseños de cócteles y promos diarias. Un calendario social de semana completa más siete tarjetas de cócteles: cada pieza se publica en Instagram, el sitio web, y los tableros digitales en un solo movimiento. Haz clic en cualquier tarjeta para verla en detalle completo.',
    'bb.s2_eyebrow':          'Sección 02 · Desayuno',
    'bb.s2_h_a':              'Fotografía editorial',
    'bb.s2_h_italic':         'de desayuno.',
    'bb.s2_lede':             'Cuatro platos hero: The Big Beach, The Sunrise, The Early Bird, The Healthy Surfer. Coloreados para la paleta de marca y listos para producción en menús, redes sociales, y pedidos en línea.',
    'bb.s3_eyebrow':          'Sección 03 · Menú',
    'bb.s3_h':                'Un menú rediseñado, de arriba a abajo.',
    'bb.s3_lede':             'Una ilustración de menú hero rediseñada más planchas listas para producción entregadas para tirajes de impresión y para las páginas de menú digital.',
    'bb.cap_grid':            'Especiales de Bebidas Diarias: grid social de semana completa',
    'bb.cap_promo':           'tarjeta promocional diaria',
    'bb.cap_signature':       'tarjeta de cóctel insignia',
    'bb.cap_feature_plate':   'plato destacado',
    'bb.cap_daily_breakfast': 'desayuno diario',
    'bb.cap_early_bird':      'The Early Bird',
    'bb.cap_healthy_surfer':  'The Healthy Surfer',
    'bb.cap_menu_hero':       'Ilustración de menú hero: The Big Beach',
    'bb.cap_menu_spread':     'Plancha de menú impreso + digital',
    'bb.cta_start':           'Empieza tu proyecto',
    'bb.cta_more':            'Ver más trabajo',
    'bb.day_monday':          'Lunes',
    'bb.day_tuesday':         'Martes',
    'bb.day_wednesday':       'Miércoles',
    'bb.day_thursday':        'Jueves',
    'bb.day_friday':          'Viernes',
    'bb.day_saturday':        'Sábado',
    'bb.day_sunday':          'Domingo',

    // Projects index page
    'proj.eyebrow':           'PORTAFOLIO',
    'proj.h_a':               'MARCAS REALES.',
    'proj.h_italic':          'resultados',
    'proj.h_b':               'REALES.',
    'proj.lede':              'Trabajo seleccionado en Daytona Beach + Orlando: construcciones de marca completas, sitios web que convierten, comerciales que viajan, y automatización que corre mientras estás en servicio.',
    'proj.featured_pill':     'DESTACADO',
    'proj.featured_tag':      'DISEÑO DE MARCA · FOTOGRAFÍA · MENÚS',
    'proj.featured_title':    'Diseños de Marca de Hospitalidad',
    'proj.featured_blurb':    'Especiales de bebidas diarias, tarjetas de cócteles, fotografía de platos de desayuno, y reconstrucciones completas de menús entregadas para clientes de hospitalidad en Florida.',
    'proj.metric1_num':       '15',
    'proj.metric1_label':     'Diseños de especiales',
    'proj.metric2_num':       '10',
    'proj.metric2_label':     'Sesiones de foto',
    'proj.metric3_num':       '4',
    'proj.metric3_label':     'Páginas de menú',
    'proj.view_case':         'Ver caso de estudio →',
    'proj.more_eyebrow':      'MÁS TRABAJO',
    'proj.more_h_a':          'Proyectos',
    'proj.more_h_italic':     'seleccionados',
    'proj.view_project':      'Ver proyecto →',
    'proj.r1_title':          'App Magic Menu',
    'proj.r1_tag':            'SAAS · OPERACIONES',
    'proj.r1_blurb':          'App de operaciones para ingeniería de menús, especiales diarios, costos de comida, y automatización de contenido. Demo en vivo embebida en la página principal.',
    'proj.r2_title':          'Marketing en Daytona Beach',
    'proj.r2_tag':            'AGENCIA · SEO LOCAL',
    'proj.r2_blurb':          'Programa de marketing local para restaurantes, bares, y negocios de turismo en Daytona Beach.',
    'proj.r3_title':          'SEO Local Orlando',
    'proj.r3_tag':            'SEO · CRECIMIENTO',
    'proj.r3_blurb':          'Limpieza de citas, optimización de GBP, y sistemas de velocidad de reseñas para negocios locales en Orlando.',
    'proj.r4_title':          'Diseño Web de Restaurantes: Daytona',
    'proj.r4_tag':            'DISEÑO WEB · CONVERSIÓN',
    'proj.r4_blurb':          'Sitios para restaurantes orientados a la conversión con flujos de menú, pedidos en línea, y reservaciones.',
    'proj.r5_title':          'Agencia de Marketing en Orlando',
    'proj.r5_tag':            'AGENCIA · MARCA',
    'proj.r5_blurb':          'Marketing integral para restaurantes, bares, y negocios de hospitalidad en Orlando.',
    'proj.cta_h_a':           '¿Tienes un',
    'proj.cta_h_italic':      'restaurante',
    'proj.cta_h_b':           'o marca local?',
    'proj.cta_lead':          'Construyamos el siguiente caso de estudio juntos.',
    'proj.cta_start':         'Empieza tu proyecto',

    // SEO landing: common (shared across all 4)
    'seo.cta_book':         'Agenda una llamada',
    'seo.cta_portfolio':    'Ver el portafolio →',
    'seo.what_we_build':    'Lo que construimos',
    'seo.built_for':        'Construido para',

    // Daytona Beach Marketing Agency
    'seo_daytona.eyebrow':         'Daytona Beach, FL',
    'seo_daytona.title':           'Agencia de marketing',
    'seo_daytona.italic':          'en Daytona Beach.',
    'seo_daytona.sub':             'Myrie HQ construye sitios web premium y sistemas de crecimiento local para negocios de Daytona Beach: restaurantes, bares, cafeterías y marcas de servicios locales. Te ayudamos a mejorar visibilidad, confianza y conversiones en el mercado donde operamos cada día.',
    'seo_daytona.s1_title':        'Sitios para Restaurantes y Bares',
    'seo_daytona.s1_copy':         'Rediseños orientados a la conversión con flujos de menú, pedidos en línea y reservaciones afinados para el mercado de Daytona.',
    'seo_daytona.s2_title':        'SEO Local',
    'seo_daytona.s2_copy':         'Perfil de Google Business, limpieza de citas, schema en página, velocidad de reseñas: construido para la búsqueda en Daytona Beach.',
    'seo_daytona.s3_title':        'Marca y Creatividad de Campaña',
    'seo_daytona.s3_copy':         'Tarjetas de especiales diarios, decks de cócteles, fotografía de platos y contenido semanal que se entrega.',
    'seo_daytona.s4_title':        'Automatización de Marketing',
    'seo_daytona.s4_copy':         'Especiales, eventos, publicaciones, email: corriendo en piloto automático para que te quedes en el servicio.',
    'seo_daytona.contact_h':       '¿Listo para crecer en Daytona?',
    'seo_daytona.contact_sub':     'Habla con un operador que dirige un local en la playa cada fin de semana.',

    // Local SEO Orlando
    'seo_orlando_seo.eyebrow':     'Orlando, FL',
    'seo_orlando_seo.title':       'SEO Local que',
    'seo_orlando_seo.italic':      'realmente posiciona.',
    'seo_orlando_seo.sub':         'Myrie HQ ayuda a los negocios de Orlando a posicionarse mejor en búsquedas locales y atraer clientes de mayor intención: Perfil de Google Business, citas, schema en página, y el tipo de velocidad de reseñas que mueve el mapa.',
    'seo_orlando_seo.s1_title':    'Perfil de Google Business',
    'seo_orlando_seo.s1_copy':     'Optimización integral del GBP: categorías, servicios, publicaciones, fotos, Q&A, y sistemas de velocidad de reseñas.',
    'seo_orlando_seo.s2_title':    'Páginas de aterrizaje locales',
    'seo_orlando_seo.s2_copy':     'Páginas de área de servicio con enlaces internos y schema, construidas para dominar la capa de consultas locales.',
    'seo_orlando_seo.s3_title':    'En página + metadatos',
    'seo_orlando_seo.s3_copy':     'Etiquetas de título, schema, encabezados, y estructura de contenido afinados a la intención de búsqueda real de Orlando.',
    'seo_orlando_seo.s4_title':    'Contenido de autoridad',
    'seo_orlando_seo.s4_copy':     'Calendarios editoriales y piezas de autoridad que componen visibilidad durante semanas, no meses.',
    'seo_orlando_seo.contact_h':   '¿Listo para posicionarte en Orlando?',
    'seo_orlando_seo.contact_sub': 'Habla con un operador que dirige un piso de hospitalidad: y un estudio de marketing que entrega cada semana.',

    // Orlando Marketing Agency
    'seo_orlando_mkt.eyebrow':     'Orlando, FL',
    'seo_orlando_mkt.title':       'Agencia de marketing',
    'seo_orlando_mkt.italic':      'en Orlando.',
    'seo_orlando_mkt.sub':         'Ayudamos a restaurantes, bares y marcas locales de Orlando a construir un posicionamiento online más fuerte con sitios web modernos, ejecución de SEO local, y sistemas de marketing listos para convertir: construido por operadores hosteleros.',
    'seo_orlando_mkt.s1_title':    'Reconstrucciones de sitios premium',
    'seo_orlando_mkt.s1_copy':     'Rediseños orientados a la conversión con flujos reales de menú, pedidos y reservaciones para hospitalidad en Orlando.',
    'seo_orlando_mkt.s2_title':    'Arquitectura de búsqueda local',
    'seo_orlando_mkt.s2_copy':     'GBP, citas, schema en página, y estructura de contenido afinada para la capa de consultas de Orlando.',
    'seo_orlando_mkt.s3_title':    'Contenido de crecimiento + campañas',
    'seo_orlando_mkt.s3_copy':     'Tarjetas de especiales diarios, fotografía de platos, y campañas de temporada: listas para producción cada semana.',
    'seo_orlando_mkt.s4_title':    'Sistemas de marca',
    'seo_orlando_mkt.s4_copy':     'Creatividad de marca de grado editorial y activos de confianza que elevan conversión y autoridad simultáneamente.',
    'seo_orlando_mkt.contact_h':   '¿Listo para crecer en Orlando?',
    'seo_orlando_mkt.contact_sub': 'Sitios web premium + SEO local + sistemas de contenido que entregan cada semana.',

    // Restaurant Web Design Daytona
    'seo_restaurant.eyebrow':      'Daytona Beach, FL',
    'seo_restaurant.title':        'Diseño web para restaurantes',
    'seo_restaurant.italic':       'que convierte.',
    'seo_restaurant.sub':          'Diseñamos y reconstruimos sitios web para restaurantes de Daytona Beach que quieren una presencia digital premium, móvil más rápido, y mejor conversión: construido por un operador que dirige un local en la playa cada fin de semana.',
    'seo_restaurant.s1_title':     'Arquitectura moderna de inicio + menú',
    'seo_restaurant.s1_copy':      'Estructura de menú clara y orientada a la conversión con flujos de pedidos en línea, reservaciones y llamados a la acción.',
    'seo_restaurant.s2_title':     'Rendimiento móvil rápido',
    'seo_restaurant.s2_copy':      'Medios cargados perezosamente, imágenes optimizadas, y un layout mobile-first que carga en menos de dos segundos.',
    'seo_restaurant.s3_title':     'Narrativa visual',
    'seo_restaurant.s3_copy':      'Secciones de foto + video que capturan el ambiente, los platos y la hospitalidad.',
    'seo_restaurant.s4_title':     'Estructura amigable al SEO',
    'seo_restaurant.s4_copy':      'Arquitectura de SEO local incorporada en la construcción: schema, encabezados y metadatos afinados para la búsqueda en Daytona.',
    'seo_restaurant.contact_h':    '¿Listo para rediseñar tu restaurante?',
    'seo_restaurant.contact_sub':  'Un sitio premium, con la estructura de SEO y la lógica de conversión incorporadas.',

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
      // First-visit detection: default to ES if browser preference is Spanish
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
