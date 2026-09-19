// The Everyday Collection — 30 reviewed print-on-demand designs (2026-09-18).
// Casual, broadly wearable line: faith, family, nurses, dog people, teachers,
// motivation, plus the two brand mantras. Images live in /store/catalog-30/.
// NOTE: fulfillment is not connected yet — the storefront shows these with a
// notify-me flow, not checkout. Flip to real checkout only once a POD
// (CustomCat/Printify) is wired and products exist there.

const IMG = (f) => `/store/catalog-30/${f}`;

const TEE = { kind: 'tee', kindName: 'Unisex Tee', price: 1999 };
const HOODIE = { kind: 'hoodie', kindName: 'Pullover Hoodie', price: 3199 };
const CREW = { kind: 'crew', kindName: 'Crewneck Sweatshirt', price: 2900 };
const MUG = { kind: 'mug', kindName: 'Ceramic Mug 11oz', price: 999 };

const MANTRA = 'Brand mantra';

export const CATALOG30 = [
  { key: 'c30-01', title: 'Faith Over Fear', ...TEE, blurb: 'The daily reminder, in bold type.', design: IMG('01-faith-over-fear-tee-design.png'), mockup: IMG('01-faith-over-fear-tee-mockup.jpg') },
  { key: 'c30-02', title: 'Dad Dictionary', ...TEE, blurb: 'noun: see also hero, legend, ATM.', design: IMG('02-dad-dictionary-tee-design.png'), mockup: IMG('02-dad-dictionary-tee-mockup.jpg') },
  { key: 'c30-03', title: 'Nurse Est.', ...CREW, blurb: 'For the ones who hold the night shift together.', design: IMG('03-nurse-est-crewneck-design.png'), mockup: IMG('03-nurse-est-crewneck-mockup.jpg') },
  { key: 'c30-04', title: 'First Time Dad', ...TEE, blurb: "New title, same guy. He'll figure it out.", design: IMG('04-first-time-dad-tee-design.png'), mockup: IMG('04-first-time-dad-tee-mockup.jpg') },
  { key: 'c30-05', title: 'Dog Hair Is My Glitter', ...TEE, blurb: 'Wear it like you mean it.', design: IMG('05-dog-hair-glitter-tee-design.png'), mockup: IMG('05-dog-hair-glitter-tee-mockup.jpg') },
  { key: 'c30-06', title: 'Faith Over Fear Hoodie', ...HOODIE, blurb: 'The daily reminder, heavyweight edition.', design: IMG('06-faith-over-fear-hoodie-design.png'), mockup: IMG('06-faith-over-fear-hoodie-mockup.jpg') },
  { key: 'c30-07', title: 'Amazing Grace', ...TEE, blurb: 'How sweet the sound, in vintage type.', design: IMG('07-amazing-grace-tee-design.png'), mockup: IMG('07-amazing-grace-tee-mockup.jpg') },
  { key: 'c30-08', title: 'We Never Lose Varsity', ...TEE, badge: MANTRA, blurb: 'The brand mantra, varsity style.', design: IMG('08-we-never-lose-varsity-tee-design.png'), mockup: IMG('08-we-never-lose-varsity-tee-mockup.jpg') },
  { key: 'c30-09', title: 'We Never Lose Wordmark', ...TEE, badge: MANTRA, blurb: 'The brand mantra, clean and loud.', design: IMG('09-we-never-lose-wordmark-tee-design.png'), mockup: IMG('09-we-never-lose-wordmark-tee-mockup.jpg') },
  { key: 'c30-10', title: 'We Never Lose Hoodie', ...HOODIE, badge: MANTRA, blurb: 'The brand mantra, heavyweight edition.', design: IMG('10-we-never-lose-hoodie-design.png'), mockup: IMG('10-we-never-lose-hoodie-mockup.jpg') },
  { key: 'c30-11', title: "World's Best Teacher", ...TEE, blurb: 'Apple optional. Respect mandatory.', design: IMG('11-worlds-best-teacher-tee-design.png'), mockup: IMG('11-worlds-best-teacher-tee-mockup.jpg') },
  { key: 'c30-12', title: 'Nurse Life', ...TEE, blurb: 'Stethoscope in, worries out.', design: IMG('12-nurse-life-tee-design.png'), mockup: IMG('12-nurse-life-tee-mockup.jpg') },
  { key: 'c30-13', title: 'Best Nurse Ever Mug', ...MUG, blurb: 'For the one who never sits down.', design: IMG('13-best-nurse-ever-mug-design.png'), mockup: IMG('13-best-nurse-ever-mug-mockup.jpg') },
  { key: 'c30-14', title: 'Dad Est.', ...TEE, blurb: 'Est. the day everything changed.', design: IMG('14-dad-est-tee-design.png'), mockup: IMG('14-dad-est-tee-mockup.jpg') },
  { key: 'c30-15', title: "World's Okayest Dad Mug", ...MUG, blurb: 'Honest. Hilarious. Accurate.', design: IMG('15-worlds-okayest-dad-mug-design.png'), mockup: IMG('15-worlds-okayest-dad-mug-mockup.jpg') },
  { key: 'c30-16', title: 'Promoted To Dad', ...TEE, blurb: 'New role just dropped.', design: IMG('16-promoted-to-dad-tee-design.png'), mockup: IMG('16-promoted-to-dad-tee-mockup.jpg') },
  { key: 'c30-17', title: 'Best Mom Ever Mug', ...MUG, blurb: 'She already knows. Remind her anyway.', design: IMG('17-best-mom-ever-mug-design.png'), mockup: IMG('17-best-mom-ever-mug-mockup.jpg') },
  { key: 'c30-18', title: 'Proud Dog Mom', ...TEE, blurb: 'Loud, proud, covered in hair.', design: IMG('18-proud-dog-mom-tee-design.png'), mockup: IMG('18-proud-dog-mom-tee-mockup.jpg') },
  { key: 'c30-19', title: 'Dogs And Coffee Mug', ...MUG, blurb: 'The only morning meeting that matters.', design: IMG('19-dogs-coffee-mug-design.png'), mockup: IMG('19-dogs-coffee-mug-mockup.jpg') },
  { key: 'c30-20', title: "Don't Talk Before Coffee Mug", ...MUG, blurb: 'Set the boundary. Sip the coffee.', design: IMG('20-dont-talk-coffee-mug-design.png'), mockup: IMG('20-dont-talk-coffee-mug-mockup.jpg') },
  { key: 'c30-21', title: 'Good Vibes Only', ...TEE, blurb: 'Dress code: enforced.', design: IMG('21-good-vibes-only-tee-design.png'), mockup: IMG('21-good-vibes-only-tee-mockup.jpg') },
  { key: 'c30-22', title: 'Retired 2026', ...TEE, blurb: 'Clocked out for good.', design: IMG('22-retired-2026-tee-design.png'), mockup: IMG('22-retired-2026-tee-mockup.jpg') },
  { key: 'c30-23', title: 'You Are Enough', ...TEE, blurb: "Read it again. It's true.", design: IMG('23-you-are-enough-tee-design.png'), mockup: IMG('23-you-are-enough-tee-mockup.jpg') },
  { key: 'c30-24', title: 'More Money Retro', ...TEE, badge: MANTRA, blurb: 'The brand mantra, retro sunset edition.', design: IMG('24-more-money-retro-tee-design.png'), mockup: IMG('24-more-money-retro-tee-mockup.jpg') },
  { key: 'c30-25', title: 'More Money Hoodie', ...HOODIE, badge: MANTRA, blurb: 'The brand mantra, heavyweight edition.', design: IMG('25-more-money-hoodie-design.png'), mockup: IMG('25-more-money-hoodie-mockup.jpg') },
  { key: 'c30-26', title: 'More Money Mug', ...MUG, badge: MANTRA, blurb: 'Manifest it before the first sip.', design: IMG('26-more-money-mug-design.png'), mockup: IMG('26-more-money-mug-mockup.jpg') },
  { key: 'c30-27', title: 'You Vs. You', ...TEE, blurb: 'The only competition that counts.', design: IMG('27-you-vs-you-tee-design.png'), mockup: IMG('27-you-vs-you-tee-mockup.jpg') },
  { key: 'c30-28', title: '1% Better Every Day Hoodie', ...HOODIE, blurb: 'Small steps, every single day.', design: IMG('28-one-percent-hoodie-design.png'), mockup: IMG('28-one-percent-hoodie-mockup.jpg') },
  { key: 'c30-29', title: 'Best Teacher Ever Mug', ...MUG, blurb: 'For the one who makes it click.', design: IMG('29-best-teacher-ever-mug-design.png'), mockup: IMG('29-best-teacher-ever-mug-mockup.jpg') },
  { key: 'c30-30', title: '876 Land We Love', ...TEE, blurb: 'Area code pride, island forever.', design: IMG('30-876-land-we-love-tee-design.png'), mockup: IMG('30-876-land-we-love-tee-mockup.jpg') },
];

export const CAT30_FACETS = [
  { id: 'all', label: 'All 30', test: () => true },
  { id: 'tee', label: 'Tees', test: (p) => p.kind === 'tee' },
  { id: 'hoodie', label: 'Hoodies', test: (p) => p.kind === 'hoodie' },
  { id: 'crew', label: 'Crewnecks', test: (p) => p.kind === 'crew' },
  { id: 'mug', label: 'Mugs', test: (p) => p.kind === 'mug' },
];

export const cat30ByKey = (k) => CATALOG30.find((p) => p.key === k);
