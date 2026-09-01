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
    default: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    template: '%s | Myrie HQ',
  },
  description:
    'Myrie HQ builds premium websites, local SEO systems, and growth marketing for restaurants, bars, and local businesses in Daytona Beach and Orlando.',
  keywords: [
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
    title: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    description: 'Premium websites, local SEO, brand creative, and growth systems for restaurants, bars, and local businesses.',
    siteName: 'Myrie HQ',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Myrie HQ — websites, menus & marketing for restaurants and bars' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    description: 'Premium websites, local SEO, brand creative, and growth systems for restaurants, bars, and local businesses.',
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
    'Myrie HQ builds premium websites, local SEO systems, and growth marketing for restaurants, bars, and local businesses in Daytona Beach and Orlando.',
  founder: { '@type': 'Person', name: "O'Neill Myrie" },
  areaServed: ['Daytona Beach FL', 'Ormond Beach FL', 'Orlando FL'],
  sameAs: [
    'https://www.facebook.com/100091255320275',
    'https://www.instagram.com/lumoswonders',
    'https://www.youtube.com/@LumoWonders',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
