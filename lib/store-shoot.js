/* The in-house apparel shoot.
 *
 * Two shapes of entry, because the two lines had different problems:
 *
 *  - FULL  (the premium line): its plates were a black garment on a near-black field,
 *          so the clothes read as holes in the grid. Those pieces were re-photographed
 *          outright - the studio frame becomes the lead image, and the campaign frame,
 *          turntable and fibre macro sit behind it.
 *  - SPIN  (the Everyday 30): these already had real on-model photography worth keeping,
 *          so the lead image is left alone. They only gained what they never had - a
 *          clean product view and a turntable, appended after their existing shots.
 *
 * Keyed by CATALOGUE id. A piece with no entry here keeps exactly what it had.
 */
const SPIN_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const entry = (slug, full) => {
  const base = `/store/shoot/${slug}`;
  return {
    full,
    // Only a FULL piece hands over its lead image; a SPIN piece keeps its own.
    hero: full ? `${base}/studio.webp` : null,
    // `spin:<slug>` is a sentinel the product panel swaps for the turntable.
    extra: full
      ? [`${base}/model.webp`, `spin:${slug}`, `${base}/detail.webp`]
      : [`${base}/studio.webp`, `spin:${slug}`],
    spin: SPIN_ANGLES.map((a) => `${base}/spin-${String(a).padStart(3, '0')}.webp`),
  };
};

const full = (slug) => entry(slug, true);
const spin = (slug) => entry(slug, false);

export const SHOOT = {
  'premium-wahgwaan-black': shoot('wah-gwaan-tee'),
  'premium-876-black': shoot('876-tee'),
  'premium-tallawah-black': shoot('likkle-tallawah-tee'),
  'premium-notperfect-black': shoot('not-perfect-tee'),
  'premium-cho-black': shoot('cho-tee'),
  'premium-rhaatid-black': shoot('rhaatid-tee'),
  'premium-sooncome-black': shoot('soon-come-tee'),
  'premium-dunkno-black': shoot('dun-kno-tee'),
  'premium-kissmiteeth-black': shoot('kiss-mi-teeth-tee'),
  'premium-walkgood-black': shoot('walk-good-tee'),
  'premium-believe-black': shoot('believe-tee'),
  'premium-neverlose-black': shoot('we-never-lose-tee'),
  'premium-money-black': shoot('more-money-tee'),
  'premium-neverlose-hoodie-black': shoot('we-never-lose-hoodie'),
  'premium-xmark-black': shoot('lost-jamaican-x-tee'),
  'premium-money-hoodie-black': shoot('more-money-hoodie'),
};

/** Resolve a `spin:<slug>` sentinel back to its frame list, or null. */
export const spinFrames = (src) => {
  if (typeof src !== 'string' || !src.startsWith('spin:')) return null;
  const slug = src.slice(5);
  return Object.values(SHOOT).find((s) => s.spin[0].includes(`/${slug}/`))?.spin || null;
};
