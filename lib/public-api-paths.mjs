export const publicApiPaths = new Set([
  '/api/contact',
  '/api/checkout',
  '/api/stripe-webhook',
  '/api/download',
  '/api/store-notify',
  '/api/store-checkout',
  // CustomCat checkout is public for the same reason store-checkout is: the
  // store page calls it directly, and it resolves every price and SKU
  // server-side, so a tampered request cannot set its own price.
  '/api/customcat-checkout',
  // A buyer checking on their own order must not hit the admin gate. It needs
  // both the order number and the matching email, so it exposes nothing that
  // the receipt in their inbox does not already show.
  '/api/order-lookup',
  '/api/luna-chat',
]);

export const isPublicApiPath = (pathname) => publicApiPaths.has(pathname);
