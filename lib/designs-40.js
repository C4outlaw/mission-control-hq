// 40-design collection: 6 brand mantras + 4 original favorites + 30 trending designs.
// Each design is available on tee, hoodie, mug, and hat.
// Design-first: customer picks a design, then selects which products they want.

export const DESIGNS_40 = [
  // === BRAND MANTRAS (6) ===
  { key: 'brand-01', title: 'We Never Lose Varsity', design: 'c30-08', image: '/store/catalog-30/08-we-never-lose-varsity-tee-design.png', category: 'brand', blurb: 'The mantra. Wear it like you mean it.' },
  { key: 'brand-02', title: 'We Never Lose Wordmark', design: 'c30-09', image: '/store/catalog-30/09-we-never-lose-wordmark-tee-design.png', category: 'brand', blurb: 'Clean wordmark, bold statement.' },
  { key: 'brand-03', title: 'We Never Lose Hoodie', design: 'c30-10', image: '/store/catalog-30/10-we-never-lose-hoodie-design.png', category: 'brand', blurb: 'The mantra in heavyweight comfort.' },
  { key: 'brand-04', title: 'More Money Retro', design: 'c30-24', image: '/store/catalog-30/24-more-money-retro-tee-design.png', category: 'brand', blurb: 'The goal, in vintage style.' },
  { key: 'brand-05', title: 'More Money Hoodie', design: 'c30-25', image: '/store/catalog-30/25-more-money-hoodie-design.png', category: 'brand', blurb: 'Manifest in comfort.' },
  { key: 'brand-06', title: 'More Money Mug', design: 'c30-26', image: '/store/catalog-30/26-more-money-mug-design.png', category: 'brand', blurb: 'Morning motivation in a cup.' },

  // === ORIGINAL FAVORITES (4) ===
  { key: 'orig-01', title: 'Dog Hair Is My Glitter', design: 'c30-05', image: '/store/catalog-30/05-dog-hair-glitter-tee-design.png', category: 'pets', blurb: 'Wear it like you own it.' },
  { key: 'orig-02', title: 'Retired 2026', design: 'c30-22', image: '/store/catalog-30/22-retired-2026-tee-design.png', category: 'lifestyle', blurb: 'Clocked out for good.' },
  { key: 'orig-03', title: '876 Land We Love', design: 'c30-30', image: '/store/catalog-30/30-876-land-we-love-tee-design.png', category: 'culture', blurb: 'Area code pride, island love.' },
  { key: 'orig-04', title: 'Dad Dictionary', design: 'c30-02', image: '/store/catalog-30/02-dad-dictionary-tee-design.png', category: 'family', blurb: 'noun: see also hero, legend.' },
];

const TRENDING = [
  ['trend-01', 'Nurse Life', 'trend-01-nurse-life.png', 'occupations', 'For the ones who hold it down.'],
  ['trend-02', 'Golden Retriever', 'trend-02-golden-retriever.png', 'pets', 'Golden mom energy.'],
  ['trend-03', 'Dad Jokes Loading', 'trend-03-dad-jokes.png', 'family', 'Dad joke loading... 99% complete.'],
  ['trend-04', 'Wander More', 'trend-04-national-parks.png', 'outdoors', 'Wander more, worry less.'],
  ['trend-05', 'Wiener Dog Mom', 'trend-05-dachshund.png', 'pets', 'Long dog, big love.'],
  ['trend-06', 'Mom Life', 'trend-06-mom-life.png', 'family', 'Powered by coffee and love.'],
  ['trend-07', 'Walk By Faith', 'trend-07-walking-faith.png', 'faith', 'Walk by faith, not by sight.'],
  ['trend-08', 'Back To The 80s', 'trend-08-back-to-80s.png', 'vintage', 'Neon nostalgia.'],
  ['trend-09', 'Grumpy Cat', 'trend-09-grumpy-cat.png', 'pets', "I don't do mornings."],
  ['trend-10', 'Firefighter', 'trend-10-firefighter.png', 'occupations', 'Courage under fire.'],
  ['trend-11', 'Happy Camper', 'trend-11-happy-camper.png', 'outdoors', 'Life is better around the campfire.'],
  ['trend-12', 'Highland Cow', 'trend-12-highland-cow.png', 'trending', 'Howdy, cutie.'],
  ['trend-13', 'Frenchie Mom', 'trend-13-frenchie-mom.png', 'pets', 'Bat ears, big heart.'],
  ['trend-14', 'Gone Fishing', 'trend-14-gone-fishing.png', 'outdoors', 'Gone fishing, be back never.'],
  ['trend-15', 'But First Coffee', 'trend-15-but-first-coffee.png', 'lifestyle', 'Coffee first, adulting second.'],
  ['trend-16', 'Made In The 90s', 'trend-16-made-in-90s.png', 'vintage', '90s kid forever.'],
  ['trend-17', 'Teacher Mode', 'trend-17-teacher-mode.png', 'occupations', 'Teacher mode: activated.'],
  ['trend-18', 'German Shepherd', 'trend-18-german-shepherd.png', 'pets', 'Loyal and brave.'],
  ['trend-19', 'Blessed', 'trend-19-blessed.png', 'faith', 'Blessed beyond measure.'],
  ['trend-20', 'King Of The Road', 'trend-20-king-of-road.png', 'occupations', 'King of the road.'],
  ['trend-21', 'Hunt Hard', 'trend-21-hunt-hard.png', 'outdoors', 'Hunt hard or go home.'],
  ['trend-22', 'Cat Mom', 'trend-22-cat-mom.png', 'pets', 'Cat mom and proud.'],
  ['trend-23', 'Family Vacation 2026', 'trend-23-family-vacation.png', 'family', 'Making memories, one trip at a time.'],
  ['trend-24', 'Pitbull Mom', 'trend-24-pitbull-mom.png', 'pets', 'Pittie love is the best love.'],
  ['trend-25', 'Healthcare Hero', 'trend-25-healthcare-hero.png', 'occupations', 'Healthcare hero.'],
  ['trend-26', 'Spooky Vibes', 'trend-26-spooky-vibes.png', 'trending', 'Spooky vibes only.'],
  ['trend-27', 'Blessed Grandma', 'trend-27-blessed-grandma.png', 'family', 'Blessed grandma.'],
  ['trend-28', 'Jesus Lover', 'trend-28-jesus-lover.png', 'faith', 'Jesus lover.'],
  ['trend-29', 'Chasing Sunsets', 'trend-29-chasing-sunsets.png', 'lifestyle', 'Chasing sunsets.'],
  ['trend-30', 'Dog Mom', 'trend-30-dog-mom.png', 'pets', 'Dog mom life.'],
];

for (const [key, title, file, category, blurb] of TRENDING) {
  DESIGNS_40.push({
    key, title, design: key,
    image: '/store/trending-30/' + file,
    category, blurb,
  });
}

// Product types available for each design
export const PRODUCT_TYPES = [
  { key: 'tee', label: 'T-Shirt', blank: 'G500', price: 24.99, sizes: ['S', 'M', 'L', 'XL'] },
  { key: 'hoodie', label: 'Hoodie', blank: 'G185', price: 44.99, sizes: ['S', 'M', 'L', 'XL'] },
  { key: 'mug', label: 'Mug', blank: 'MUG11', price: 14.99, sizes: ['One Size'] },
  { key: 'hat', label: 'Cap', blank: 'HAT', price: 24.99, sizes: ['One Size'] },
];

export const DESIGN_CATEGORIES = [
  { key: 'all', label: 'All Designs' },
  { key: 'brand', label: 'Brand' },
  { key: 'pets', label: 'Pets' },
  { key: 'family', label: 'Family' },
  { key: 'faith', label: 'Faith' },
  { key: 'occupations', label: 'Occupations' },
  { key: 'outdoors', label: 'Outdoors' },
  { key: 'vintage', label: 'Vintage' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'culture', label: 'Culture' },
  { key: 'trending', label: 'Trending' },
];
