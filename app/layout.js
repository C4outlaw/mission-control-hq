import { Manrope, Fraunces } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import ScrollProgress from "../components/motion/ScrollProgress";
import ScrollCTA from "../components/layout/ScrollCTA";
import SmoothScroll from "../components/layout/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { LangProvider } from "../lib/i18n";
import LunaAssistant from "../components/luna/LunaAssistant";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-editorial", display: "swap", axes: ["opsz"] });

export const metadata = {
  metadataBase: new URL('https://www.myriehq.com'),
  title: {
    default: 'Myrie HQ | The Lost Jamaican — Dancehall & Reggae History',
    template: '%s | Myrie HQ',
  },
  // The root is the strongest URL on the domain, so it has to carry the thing
  // people actually search for. The agency keywords still rank from their own
  // dedicated pages (/daytona-beach-marketing-agency, /local-seo-orlando, ...).
  description:
    'The Lost Jamaican: cinematic short documentaries on dancehall and reggae history, plus the prompt packs behind them. From Myrie HQ in Daytona Beach.',
  keywords: [
    'The Lost Jamaican',
    'dancehall history',
    'reggae history',
    'Jamaican music history',
    'dancehall documentary',
    'Daytona marketing agency',
    'Orlando marketing agency',
    'restaurant website design',
    'bar marketing',
    'local SEO Daytona',
    'local SEO Orlando',
    'Myrie HQ',
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.myriehq.com',
    title: 'Myrie HQ | The Lost Jamaican — Dancehall & Reggae History',
    description: 'Cinematic short documentaries on dancehall and reggae history, and the prompt packs behind them.',
    siteName: 'Myrie HQ',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'The Lost Jamaican — dancehall and reggae history from Myrie HQ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myrie HQ | The Lost Jamaican — Dancehall & Reggae History',
    description: 'Cinematic short documentaries on dancehall and reggae history, and the prompt packs behind them.',
    images: ['/og-image.jpg'],
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.myriehq.com/#organization',
  name: 'Myrie HQ',
  url: 'https://www.myriehq.com/',
  logo: 'https://www.myriehq.com/og-image.jpg',
  description:
    'Myrie HQ builds premium websites, local SEO systems, and growth marketing for restaurants, bars, and local businesses in Daytona Beach and Orlando. It also publishes The Lost Jamaican, a channel of cinematic short documentaries on dancehall and reggae history, and the prompt packs behind them.',
  founder: { '@type': 'Person', '@id': 'https://www.myriehq.com/#oneil', name: 'Oneil Myrie' },
  areaServed: ['Daytona Beach FL', 'Ormond Beach FL', 'Orlando FL'],
  // Topical signals. Search engines and AI assistants use these to decide what
  // this site is actually a source on — without them the only signal here was
  // "marketing agency", which buried the documentary side entirely.
  knowsAbout: [
    'Dancehall history',
    'Reggae history',
    'Jamaican music culture',
    'AI video production',
    'Prompt engineering',
    'Local SEO',
    'Web design',
  ],
  sameAs: [
    'https://www.facebook.com/100091255320275',
    'https://www.instagram.com/thelostjamaican876',
    'https://www.youtube.com/@Thelostjamaican',
  ],
};

// The Lost Jamaican is its own entity, not just a page on an agency site. Giving
// it an @id, its own social profiles and an explicit publisher link is what lets
// a search engine answer "who makes these dancehall documentaries".
const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  '@id': 'https://www.myriehq.com/#lostjamaican',
  name: 'The Lost Jamaican',
  alternateName: 'The Lost Jamaican | Dancehall & Reggae History',
  url: 'https://www.myriehq.com/',
  description:
    'Cinematic short documentaries on dancehall and reggae history — the artists, the controversies and what actually happened to them, researched from sourced reporting.',
  logo: 'https://www.myriehq.com/og-image.jpg',
  publisher: { '@id': 'https://www.myriehq.com/#organization' },
  sameAs: [
    'https://www.facebook.com/100091255320275',
    'https://www.instagram.com/thelostjamaican876',
    'https://www.youtube.com/@Thelostjamaican',
  ],
};

const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.myriehq.com/#website',
  url: 'https://www.myriehq.com/',
  name: 'Myrie HQ',
  publisher: { '@id': 'https://www.myriehq.com/#organization' },
  inLanguage: 'en',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgSchema, brandSchema, siteSchema]),
          }}
        />
        <LangProvider>
          <SmoothScroll />
          <ScrollProgress />
          {children}
          <ScrollCTA />
          <LunaAssistant />
          <Analytics />
        </LangProvider>
      </body>
    </html>
  );
}
