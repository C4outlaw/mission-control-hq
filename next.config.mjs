/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|gif|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
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
