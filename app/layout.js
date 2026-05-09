import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import ScrollProgress from "../components/motion/ScrollProgress";
import Waterfall from "../components/motion/Waterfall";
import ScrollCTA from "../components/layout/ScrollCTA";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
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
  alternates: {
    canonical: 'https://www.myriehq.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.myriehq.com',
    title: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    description: 'Premium websites, local SEO, brand creative, and growth systems for restaurants, bars, and local businesses.',
    siteName: 'Myrie HQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    description: 'Premium websites, local SEO, brand creative, and growth systems for restaurants, bars, and local businesses.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${inter.variable} ${fraunces.variable}`}>
        <ScrollProgress />
        <Waterfall density={0.85} opacity={0.45} topOriginPct={6} />
        {children}
        <ScrollCTA />
      </body>
    </html>
  );
}
