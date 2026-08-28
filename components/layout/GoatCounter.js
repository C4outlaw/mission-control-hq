'use client';

import Script from 'next/script';

// Privacy-friendly pageview counter. Inert until NEXT_PUBLIC_GOATCOUNTER_SITE
// is set (the goatcounter subdomain, e.g. "myriehq"), so local dev and
// preview builds never send hits.
export default function GoatCounter() {
  const site = process.env.NEXT_PUBLIC_GOATCOUNTER_SITE;
  if (!site) return null;

  return (
    <Script
      strategy="afterInteractive"
      data-goatcounter={`https://${site}.goatcounter.com/count`}
      src="https://gc.zgo.at/count.js"
    />
  );
}
