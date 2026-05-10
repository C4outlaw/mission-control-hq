'use client';
import { useT } from '../../lib/i18n';

/**
 * Compact EN/ES segmented control. Lives next to the theme toggle in SiteNav.
 */
export default function LanguageToggle() {
  const { lang, setLang } = useT();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lang-opt${lang === 'en' ? ' is-active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >EN</button>
      <button
        type="button"
        className={`lang-opt${lang === 'es' ? ' is-active' : ''}`}
        onClick={() => setLang('es')}
        aria-pressed={lang === 'es'}
      >ES</button>
    </div>
  );
}
