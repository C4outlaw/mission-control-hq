// Coloring books, sold on Amazon (KDP prints and ships them). They sit right
// under the shop masthead. A book without its live Amazon link yet shows an
// honest "on Amazon this week" tag instead of a buy button.

export const BOOKS = [
  {
    id: 'island-cozy',
    title: 'Island Cozy',
    subtitle: 'Cute & Comfy Coloring Book',
    badge: 'Kids & grown-ups',
    blurb: '45 cozy island scenes: the doctor bird, the jerk pan, Sunday dinner. Big, bold lines that are easy to color.',
    price: '$9.99',
    cover: '/store/books/island-cozy-cover.jpg',
    pages: ['/store/books/island-cozy-page1.jpg', '/store/books/island-cozy-page2.jpg', '/store/books/island-cozy-page3.jpg'],
    amazon: 'https://www.amazon.com/dp/B0HL4FXGWM', // live 2026-09-26, ISBN 9798177022116
  },
  {
    id: 'young-kings',
    title: 'Young Kings',
    subtitle: 'Affirmation Coloring Book',
    badge: 'Ages 4-8',
    blurb: '40 happy affirmations to color: I am brave, I am kind, I shine bright. Made for small hands.',
    price: '$9.99',
    cover: '/store/books/young-kings-cover.jpg',
    pages: ['/store/books/young-kings-page1.jpg', '/store/books/young-kings-page2.jpg', '/store/books/young-kings-page3.jpg'],
    amazon: null, // uploading to KDP after the weekly title limit resets
  },
];
