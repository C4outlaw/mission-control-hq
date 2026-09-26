import { LIVE_BOOKS } from '../../lib/store-books';

/* Coloring books sit straight under the hero. They sell on Amazon, so each
   card links out instead of joining the cart. */
export default function StoreBooks() {
  if (!LIVE_BOOKS.length) return null;
  return (
    <section id="books" className="tlj-books" aria-labelledby="tlj-books-title">
      <div className="tls-shell">
        <header className="tlj-books-head">
          <p className="tls-mono">New · Coloring books by The Lost Jamaican</p>
          <h2 id="tlj-books-title">Color the island.</h2>
        </header>
        <div className="tlj-books-grid">
          {LIVE_BOOKS.map((b) => (
            <article className="tlj-book" key={b.id}>
              <a href={b.amazon} target="_blank" rel="noopener noreferrer" className="tlj-book-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.cover} alt={`${b.title} coloring book cover`} loading="lazy" decoding="async" />
              </a>
              <div className="tlj-book-body">
                <h3>{b.title}</h3>
                <p className="tlj-book-sub">{b.subtitle}</p>
                <p className="tlj-book-blurb">{b.blurb}</p>
                <div className="tlj-book-peek" aria-label="Pages from inside the book">
                  {b.pages.map((src) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={src} src={src} alt="" loading="lazy" decoding="async" />
                  ))}
                </div>
                <div className="tlj-book-buy">
                  <span className="tlj-book-price">{b.price}</span>
                  <a href={b.amazon} target="_blank" rel="noopener noreferrer" className="tlj-book-btn">
                    Buy on Amazon <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
