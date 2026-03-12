import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.myriehq.com'),
  title: {
    default: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    template: '%s | Myrie HQ',
  },
  description:
    'Myrie HQ builds premium websites, local SEO systems, and growth marketing for restaurants and local businesses in Daytona Beach and Orlando.',
  keywords: [
    'Daytona marketing agency',
    'Orlando marketing agency',
    'restaurant website design',
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
    description:
      'Premium websites, local SEO, and growth systems for local businesses in Daytona Beach and Orlando.',
    siteName: 'Myrie HQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myrie HQ | Daytona & Orlando Marketing Agency',
    description:
      'Premium websites, local SEO, and growth systems for local businesses in Daytona Beach and Orlando.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
