'use client';
import Reveal from '../motion/Reveal';
import { useT } from '../../lib/i18n';

export default function Footer() {
  const { t } = useT();
  const services = [
    { label: t('footer.svc_websites'), href: '/restaurant-web-design-daytona' },
    { label: t('footer.svc_seo_d'),    href: '/local-seo-orlando' },
    { label: t('footer.svc_dayt'),     href: '/daytona-beach-marketing-agency' },
    { label: t('footer.svc_orl'),      href: '/orlando-marketing-agency' },
    { label: t('footer.svc_mm'),       href: '/magic-menu' },
  ];
  const work = [
    { label: t('footer.work_brand'), href: '/projects/beach-bucket-design' },
    { label: t('footer.work_full'),  href: '/projects' },
    { label: t('footer.work_mm'),    href: '/#try-app' },
  ];
  const company = [
    { label: t('footer.co_about'),    href: '/about' },
    { label: t('footer.co_services'), href: '/#services' },
    { label: t('footer.co_work'),     href: '/#showcase' },
    { label: t('footer.co_contact'),  href: '/#contact' },
  ];
  return (
    <footer className="ti-footer">
      <hr className="hairline" />
      <div className="shell ti-footer-grid">
        <Reveal className="ti-foot-brand">
          <a href="/" className="ti-foot-brand-mark">
            <span className="ti-foot-mark" aria-hidden="true">M</span>
            <span className="ti-foot-word">
              <span className="ti-myrie">Myrie</span><span className="ti-hq">HQ</span>
            </span>
          </a>
          <p className="ti-foot-tag">{t('footer.tag')}</p>
        </Reveal>

        <Reveal className="ti-foot-col">
          <h4>{t('footer.h_services')}</h4>
          <ul>{services.map(s => <li key={s.label}><a href={s.href}>{s.label}</a></li>)}</ul>
        </Reveal>

        <Reveal className="ti-foot-col" delay={0.05}>
          <h4>{t('footer.h_work')}</h4>
          <ul>{work.map(s => <li key={s.label}><a href={s.href}>{s.label}</a></li>)}</ul>
        </Reveal>

        <Reveal className="ti-foot-col" delay={0.1}>
          <h4>{t('footer.h_company')}</h4>
          <ul>{company.map(s => <li key={s.label}><a href={s.href}>{s.label}</a></li>)}</ul>
        </Reveal>

        <Reveal className="ti-foot-col" delay={0.15}>
          <h4>{t('footer.h_contact')}</h4>
          <ul>
            <li><a href="mailto:myriework@gmail.com">myriework@gmail.com</a></li>
            <li><a href="tel:+13867958727">+1 (386) 795-8727</a></li>
            <li className="ti-foot-nap">{t('footer.nap')}</li>
          </ul>
        </Reveal>
      </div>

      <hr className="hairline" />
      <div className="shell ti-foot-bottom">
        <span>{t('footer.bottom_l').replace('{year}', new Date().getFullYear())}</span>
        <span className="ti-foot-bottom-r">{t('footer.bottom_r')}</span>
      </div>

      <style>{`
        .ti-footer { padding: 0; background: var(--bg-soft); }
        .ti-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.4fr; gap: 48px; padding: 96px 0 64px; }
        .ti-foot-brand-mark { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: var(--ink); transition: opacity .2s ease; }
        .ti-foot-brand-mark:hover { opacity: 0.82; }
        .ti-foot-mark {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px;
          border-radius: 9px;
          background: linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 60%, #050505 100%);
          color: #fff;
          font-family: var(--font-editorial), Fraunces, serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: -0.02em;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 0 0 1px rgba(176,138,62,0.32),
            0 1px 2px rgba(0,0,0,.18);
        }
        .ti-foot-word {
          display: inline-flex; align-items: baseline; gap: 2px;
          font-family: var(--font-editorial), Fraunces, serif;
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.028em;
          line-height: 1;
        }
        .ti-myrie { color: var(--ink); }
        .ti-hq { color: var(--warm); font-style: italic; margin-left: 4px; font-weight: 400; }
        .ti-foot-tag { margin: 20px 0 0; color: var(--muted); line-height: 1.55; max-width: 360px; font-size: 14px; }

        /* Premium uppercase column headers */
        .ti-foot-col h4 {
          color: var(--muted);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin: 0 0 22px;
        }
        .ti-foot-col ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        .ti-foot-col li a {
          color: var(--ink-2);
          text-decoration: none;
          font-size: 14px;
          letter-spacing: -0.005em;
          transition: color .2s ease, padding .25s ease;
          display: inline-block;
        }
        .ti-foot-col li a:hover { color: var(--warm); padding-left: 4px; }
        .ti-foot-nap { color: var(--muted-2); font-size: 13px; }

        .ti-foot-bottom { display: flex; justify-content: space-between; align-items: center; padding: 32px 0 40px; font-size: 12px; color: var(--muted-2); flex-wrap: wrap; gap: 12px; letter-spacing: -0.005em; }

        @media (max-width: 980px) {
          .ti-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; padding: 64px 0 48px; }
          .ti-foot-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .ti-footer-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
}
