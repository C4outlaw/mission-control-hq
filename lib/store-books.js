// Coloring books, sold on Amazon (KDP prints and ships them).
// A book appears in the store only once `amazon` holds its live product link,
// so a visitor is never sent to an Amazon page that does not exist yet.

export const BOOKS = [
  {
    id: 'island-cozy',
    title: 'Island Cozy',
    subtitle: 'Cute and Comfy Coloring Book for Adults and Kids',
    blurb: '45 cozy Jamaican scenes: the doctor bird, ackee at the market, the jerk pan, Sunday dinner. Bold, easy lines on single-sided pages.',
    price: '$9.99',
    cover: '/store/books/island-cozy-cover.jpg',
    pages: ['/store/books/island-cozy-page1.jpg', '/store/books/island-cozy-page2.jpg', '/store/books/island-cozy-page3.jpg'],
    amazon: null, // ISBN 9798177022116, in KDP review since 2026-09-26
  },
  {
    id: 'young-kings',
    title: 'Young Kings',
    subtitle: 'Cozy Affirmation Coloring Book for Boys Ages 4-8',
    blurb: '40 joyful affirmations to color: I am brave, I am kind, I shine bright. Big, bold pages made for small hands.',
    price: '$9.99',
    cover: '/store/books/young-kings-cover.jpg',
    pages: ['/store/books/young-kings-page1.jpg', '/store/books/young-kings-page2.jpg', '/store/books/young-kings-page3.jpg'],
    amazon: null, // not yet on KDP (weekly title limit)
  },
];

export const LIVE_BOOKS = BOOKS.filter((b) => b.amazon);
