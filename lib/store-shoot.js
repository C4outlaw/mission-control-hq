/* The in-house apparel shoot.
 *
 * The store's original plates were flat-lay mockups on a near-black field, so a black
 * hoodie on a black background read as a hole. These are re-photographed: a ghost-mannequin
 * studio frame on mid-grey, an on-model campaign frame, a macro where the fleece fibre is
 * actually visible, and an eight-frame turntable so a shopper can spin the garment.
 *
 * Keyed by CATALOGUE id. A piece with no entry here keeps whatever it already had, so this
 * file grows one garment at a time as each shoot lands.
 */
const SPIN_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const shoot = (slug) => {
  const base = `/store/shoot/${slug}`;
  return {
    hero: `${base}/studio.webp`,
    // The spin sentinel is resolved in the product panel; everything else is a plain src.
    gallery: [`${base}/model.webp`, `spin:${slug}`, `${base}/detail.webp`],
    spin: SPIN_ANGLES.map((a) => `${base}/spin-${String(a).padStart(3, '0')}.webp`),
  };
};

export const SHOOT = {
  'premium-wahgwaan-black': shoot('wah-gwaan-tee'),
  'premium-876-black': shoot('876-tee'),
  'premium-rhaatid-black': shoot('rhaatid-tee'),
  'premium-sooncome-black': shoot('soon-come-tee'),
  'premium-dunkno-black': shoot('dun-kno-tee'),
  'premium-walkgood-black': shoot('walk-good-tee'),
  'premium-believe-black': shoot('believe-tee'),
  'premium-neverlose-black': shoot('we-never-lose-tee'),
  'premium-money-black': shoot('more-money-tee'),
  'premium-neverlose-hoodie-black': shoot('we-never-lose-hoodie'),
  'premium-money-hoodie-black': shoot('more-money-hoodie'),
};

/** Resolve a `spin:<slug>` sentinel back to its frame list, or null. */
export const spinFrames = (src) => {
  if (typeof src !== 'string' || !src.startsWith('spin:')) return null;
  const slug = src.slice(5);
  return Object.values(SHOOT).find((s) => s.spin[0].includes(`/${slug}/`))?.spin || null;
};
