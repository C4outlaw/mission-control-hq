// Coloring books sold on Amazon (KDP prints and ships them), shown in the kids'
// books carousel under the shop masthead. Keep this in step with the KDP
// bookshelf: every title that is Live on Amazon belongs here, newest first.
// A book with `amazon: null` shows "Coming soon" instead of a buy button.
// Synced with the KDP bookshelf 2026-09-30.

export const BOOKS = [
  {
    id: 'young-kings',
    title: 'Young Kings',
    subtitle: 'Affirmation Coloring Book',
    badge: 'Ages 4-8',
    price: '$9.99',
    cover: '/store/books/young-kings-cover.jpg',
    amazon: 'https://www.amazon.com/dp/B0HL7MKW3G', // paperback, ISBN 9798175325349
  },
  {
    id: 'island-cozy',
    title: 'Island Cozy',
    subtitle: 'Cute & Comfy Coloring Book',
    badge: 'Kids & grown-ups',
    price: '$9.99',
    cover: '/store/books/island-cozy-cover.jpg',
    amazon: 'https://www.amazon.com/dp/B0HL4FXGWM', // paperback, ISBN 9798177022116
  },
  {
    id: 'ocean-animals',
    title: 'Ocean Animals',
    subtitle: '48 Bold & Easy Pages with Fun Facts',
    badge: 'Ages 4-8',
    price: '$9.99',
    cover: '/store/books/ocean-animals-cover.jpg',
    amazon: 'https://www.amazon.com/dp/B0HL4WBBXV', // paperback
  },
  {
    id: 'dinosaur-activity',
    title: 'Dinosaur Activity Book',
    subtitle: 'Coloring, Mazes, Dot-to-Dots & Word Searches',
    badge: 'Activity book',
    price: '$9.99',
    cover: '/store/books/dinosaur-activity-cover.jpg',
    amazon: 'https://www.amazon.com/dp/B0HK8P7478', // paperback
  },
  {
    id: 'abc-adventures',
    title: "ABC Adventures: Let's Learn",
    subtitle: 'Alphabet picture book',
    badge: 'Kindle eBook',
    price: '$9.99',
    cover: '/store/books/abc-adventures-cover.jpg',
    amazon: 'https://www.amazon.com/dp/B0CK2Y8YXT', // Kindle only (paperback/hardcover still drafts)
  },
];
