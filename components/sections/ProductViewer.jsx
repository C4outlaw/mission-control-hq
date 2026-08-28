'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Product viewer modal: drag-to-spin 360 turntable + the model's UGC video.
 * The 360 is a video scrubbed by pointer position — one small file instead of
 * a frame sprite, and it stays smooth because the source is encoded with a
 * dense keyframe interval.
 */
export default function ProductViewer({ open, onClose, label, spin, video, poster }) {
  const [mode, setMode] = useState(spin ? '360' : 'video');
  const spinRef = useRef(null);
  const dragRef = useRef({ active: false, x: 0, t: 0 });
  const [hint, setHint] = useState(true);

  useEffect(() => { if (open) setMode(spin ? '360' : 'video'); }, [open, spin]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;

  function startDrag(e) {
    const v = spinRef.current;
    if (!v) return;
    dragRef.current = { active: true, x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, t: v.currentTime };
    setHint(false);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onDrag(e) {
    const v = spinRef.current;
    const d = dragRef.current;
    if (!v || !d.active || !v.duration) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const frac = (x - d.x) / (e.currentTarget.clientWidth || 400);
    let t = (d.t + frac * v.duration) % v.duration;
    if (t < 0) t += v.duration;
    v.currentTime = t;
  }
  const endDrag = () => { dragRef.current.active = false; };

  return (
    <div className="tls-viewer" role="dialog" aria-modal="true" aria-label={`${label} viewer`} onClick={onClose}>
      <div className="tls-viewer-panel" onClick={(e) => e.stopPropagation()}>
        <button className="tls-viewer-x" onClick={onClose} aria-label="Close">✕</button>
        <div className="tls-viewer-stage">
          {mode === '360' && spin ? (
            <div
              className="tls-spin"
              onPointerDown={startDrag}
              onPointerMove={onDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video ref={spinRef} src={spin} poster={poster} muted playsInline preload="auto" />
              {hint && <span className="tls-spin-hint">◀ drag to spin ▶</span>}
            </div>
          ) : (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video src={video} poster={poster} controls autoPlay playsInline preload="metadata" />
          )}
        </div>
        <div className="tls-viewer-tabs">
          {spin && (
            <button className={`tls-viewer-tab${mode === '360' ? ' is-on' : ''}`} onClick={() => setMode('360')}>
              360° view
            </button>
          )}
          {video && (
            <button className={`tls-viewer-tab${mode === 'video' ? ' is-on' : ''}`} onClick={() => setMode('video')}>
              ▶ Watch
            </button>
          )}
          <span className="tls-viewer-label">{label}</span>
        </div>
      </div>
    </div>
  );
}
