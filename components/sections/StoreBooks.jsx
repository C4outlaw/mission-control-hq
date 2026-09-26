import { BOOKS } from '../../lib/store-books';

/* "Grab your kids' coloring book!" — the coloring books, straight under the
   shop masthead. They sell on Amazon, so each card links out instead of
   joining the cart. */

const TITLE = [
  ['Grab', 'is-coral'],
  ['your', 'is-teal'],
  ["kids'", 'is-purple'],
  ['coloring', 'is-orange'],
  ['book!', 'is-pink'],
];

export default function StoreBooks() {
  return (
    <div id="books" className="kids-books" role="region" aria-labelledby="kids-books-title">
      <h3 id="kids-books-title" className="kids-title">
        {TITLE.map(([word, tone]) => (
          <span key={word} className={tone}>{word}</span>
        ))}
      </h3>
      <svg className="kids-squiggle" viewBox="0 0 300 18" aria-hidden="true" preserveAspectRatio="none">
        <path d="M2 12 Q 20 2 38 10 T 74 10 T 110 10 T 146 10 T 182 10 T 218 10 T 254 10 T 298 8" />
      </svg>
      <p className="kids-sub">Bold, easy pages for little hands, printed on one side so markers never bleed through.</p>

      <div className="kids-grid">
        {BOOKS.map((b) => (
          <article className="kid-card" key={b.id}>
            <div className="kid-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.cover} alt={`${b.title} coloring book cover`} loading="lazy" decoding="async" />
              <span className="kid-badge">{b.badge}</span>
            </div>
            <div className="kid-body">
              <h4>{b.title}</h4>
              <p className="kid-subtitle">{b.subtitle}</p>
              <p className="kid-blurb">{b.blurb}</p>
              <div className="kid-peek" aria-label="Pages from inside the book">
                {b.pages.map((src) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                ))}
              </div>
              <div className="kid-buy">
                <span className="kid-price">{b.price}</span>
                {b.amazon ? (
                  <a href={b.amazon} target="_blank" rel="noopener noreferrer" className="kid-btn">
                    Get it on Amazon <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="kid-soon">On Amazon this week</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
