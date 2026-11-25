'use client';
import { useEffect, useState } from 'react';
import { showreel, sourceUrl, normalizeMetric } from '../../lib/studio/showreel.mjs';
export default function Showreel() {
  const [active, setActive] = useState({});
  const [metrics, setMetrics] = useState({});
  useEffect(() => {
    let alive = true;
    const refresh = () => fetch('/studio/metrics').then(r => r.ok ? r.json() : null).then(data => { if (alive && data?.metrics) setMetrics(data.metrics); }).catch(() => {});
    refresh(); const timer = setInterval(refresh, 300000);
    return () => { alive = false; clearInterval(timer); };
  }, []);
  return <div className="studio-films">{showreel.map((film, index) => {
    const metric = normalizeMetric(metrics[film.id]);
    return <article className="studio-film" key={film.id}>
      <div className="studio-player">{active[film.id] ? <iframe title={`${film.title} on TikTok`} src={`https://www.tiktok.com/player/v1/${film.id}?autoplay=0`} allow="fullscreen; encrypted-media; picture-in-picture" allowFullScreen /> : <button className="studio-play" onClick={() => setActive(current => ({ ...current, [film.id]: true }))} aria-label={`Load ${film.title} video from TikTok`}><span className="studio-film-number">0{index+1}</span><span className="studio-play-icon" aria-hidden="true">▶</span><strong>{film.title}</strong><span>Load video · {film.duration}</span></button>}</div>
      <div className="studio-film-copy"><p className="studio-eyebrow">{film.category}</p><h3>{film.title}</h3>
      {metric ? <p className="studio-note">{metric.approximate ? '≈ ' : ''}{new Intl.NumberFormat('en-US').format(metric.count)} views · snapshot {new Date(metric.observedAt).toLocaleString('en-US', { timeZone: 'UTC' })} UTC</p> : <p className="studio-note">View count available on the original post.</p>}
      <a href={sourceUrl(film.id)} target="_blank" rel="noopener noreferrer">Watch original on TikTok ↗</a>
      <a className="studio-download" href="/downloads/The-Lost-Jamaican-Client-Flyer.pdf" download>Download rates & flyer ↓</a></div>
    </article>;
  })}<article className="studio-film"><div className="studio-player"><a className="studio-play" href="https://www.facebook.com/share/r/1aPDcnSVLW/" target="_blank" rel="noopener noreferrer" aria-label="Watch Which one did you grow up on? on Facebook"><span className="studio-film-number">04</span><span className="studio-play-icon" aria-hidden="true">↗</span><strong>Which one did you grow up on?</strong><span>Watch original on Facebook</span></a></div><div className="studio-film-copy"><p className="studio-eyebrow">Jamaican food & culture</p><h3>Which one did you grow up on?</h3><p className="studio-note">Opens the original Facebook Reel. View count available on Facebook.</p><a href="https://www.facebook.com/share/r/1aPDcnSVLW/" target="_blank" rel="noopener noreferrer">Watch original on Facebook ↗</a><a className="studio-download" href="/downloads/The-Lost-Jamaican-Client-Flyer.pdf" download>Download rates & flyer ↓</a></div></article></div>;
}
