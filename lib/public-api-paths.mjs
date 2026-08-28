export const publicApiPaths = new Set([
  '/api/contact',
  '/api/checkout',
  '/api/stripe-webhook',
  '/api/download',
  '/api/store-notify',
  '/api/store-checkout',
  '/api/luna-chat',
]);

export const isPublicApiPath = (pathname) => publicApiPaths.has(pathname);
