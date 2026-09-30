'use client';

import { useRef } from 'react';
import { BOOKS } from '../../lib/store-books';

/* "Grab your kids' coloring book!" — a compact carousel straight under the shop
   masthead. Swipe on phones, arrows on desktop; it stays one row tall however
   many books are added. Books sell on Amazon, so cards link out. */

const TITLE = [
  ['Grab', 'is-coral'],
  ['your', 'is-teal'],
  ["kids'", 'is-purple'],
  ['coloring', 'is-orange'],
  ['book!', 'is-pink'],
];

export default function StoreBooks() {
  const track = useRef(null);
  const step = (dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('.kid-card');
    el.scrollBy({ left: dir * ((card?.offsetWidth || 260) + 18), behavior: 'smooth' });
  };

  return (
    <div id="books" className="kids-books" role="region" aria-labelledby="kids-books-title">
      <div className="kids-head">
        <h3 id="kids-books-title" className="kids-title">
          {TITLE.map(([word, tone]) => (
            <span key={word} className={tone}>{word}</span>
          ))}
        </h3>
        {BOOKS.length > 1 && (
          <div className="kids-arrows">
            <button type="button" className="kids-arrow" onClick={() => step(-1)} aria-label="Previous book">‹</button>
            <button type="button" className="kids-arrow" onClick={() => step(1)} aria-label="Next book">›</button>
          </div>
        )}
      </div>

      <div className="kids-track" ref={track} tabIndex={0} aria-label="Coloring books, swipe to see more">
        {BOOKS.map((b) => (
          <article className="kid-card" key={b.id}>
            <div className="kid-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.cover} alt={`${b.title} coloring book cover`} loading="lazy" decoding="async" />
              <span className="kid-badge">{b.badge}</span>
            </div>
            <h4>{b.title}</h4>
            <p className="kid-subtitle">{b.subtitle}</p>
            <div className="kid-buy">
              <span className="kid-price">{b.price}</span>
              {b.amazon ? (
                <a href={b.amazon} target="_blank" rel="noopener noreferrer" className="kid-btn">
                  Get it <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="kid-soon">Coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
