'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Light/dark theme toggle.
 * Adds `.theme-dark` to <html> when dark mode is active.
 * Persists choice in localStorage.
 * Honors prefers-color-scheme on first visit.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('myrie_theme');
    const initial = saved
      ? saved === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(initial);
    document.documentElement.classList.toggle('theme-dark', initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('theme-dark', next);
    try { localStorage.setItem('myrie_theme', next ? 'dark' : 'light'); } catch {}
  };

  // Avoid SSR hydration flash — render an empty placeholder until mounted
  if (!mounted) return <span className="theme-toggle theme-toggle-skeleton" aria-hidden="true" />;

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark
        ? <Sun size={15} strokeWidth={1.6} />
        : <Moon size={15} strokeWidth={1.6} />}
    </button>
  );
}
