export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mission-control', '/api/'],
      },
    ],
    sitemap: 'https://www.myriehq.com/sitemap.xml',
    host: 'https://www.myriehq.com',
  };
}
