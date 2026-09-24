/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  // Serverless functions must not drag the whole repo into their bundle: the
  // Beach Bucket build and public assets alone are ~3 GB, which blew past
  // Vercel's 250 MB function limit. Only the download/webhook routes need the
  // (tiny) paid pack files.
  outputFileTracingExcludes: {
    '*': ['beachbucket-site/**', 'public/**', 'branding/**', 'posts/**', '.git/**'],
  },
  outputFileTracingIncludes: {
    '/api/download': ['packs-enc/**'],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Baseline hardening. SAMEORIGIN keeps the portfolio's own iframe
        // embeds working; microphone stays self-only for Luna/transcribe.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=(self)' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Serve the static Beach Bucket Vite build under /beach-bucket-live
      { source: '/beach-bucket-live', destination: '/beach-bucket-live/index.html' },
    ];
  },
};

export default nextConfig;
