export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/marvin-room', '/api/'],
      },
    ],
    sitemap: 'https://www.myriehq.com/sitemap.xml',
    host: 'https://www.myriehq.com',
  };
}
