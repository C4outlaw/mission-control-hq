import Footer from '../../components/layout/Footer';
import SiteNav from '../../components/layout/SiteNav';
import ProjectsClient from '../../components/sections/ProjectsClient';

export const metadata = {
  title: 'Portfolio · Myrie HQ',
  description: 'Selected work for restaurants, bars, and local businesses across Daytona Beach and Orlando: websites, brand commercials, daily specials systems, and marketing automation.',
};

export default function ProjectsPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <ProjectsClient />
      <Footer />

      <style>{`
        .proj-hero { position: relative; padding: 72px 0 0; overflow: hidden; }
        .proj-hero-copy { padding: 48px 0 96px; max-width: 980px; }
        .hero-title { display: flex; flex-direction: column; gap: 8px; margin: 18px 0 22px; }
        .hero-title .display { font-family: var(--font-editorial), Fraunces, Georgia, serif; font-weight: 500; font-size: clamp(2.4rem, 6.4vw, 5.4rem); color: var(--ink); letter-spacing: -0.04em; line-height: 1.0; }
        .hero-title .script { font-family: var(--font-editorial), Fraunces, Georgia, serif; font-style: italic; font-weight: 400; color: var(--warm); font-size: clamp(3rem, 8.5vw, 6.4rem); align-self: flex-start; padding: 0 8px; line-height: 0.9; }
        .accent-italic { font-style: italic; font-weight: 400; color: var(--warm); }

        .block { padding: 60px 0; }

        .featured-project { display: block; text-decoration: none; color: inherit; border-radius: 24px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--line); box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 24px 60px rgba(0,0,0,.06); transition: border-color .25s ease, transform .35s ease; }
        .featured-project:hover { border-color: var(--line-2); transform: translateY(-2px); }
        .featured-media { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #f4f6fb; }
        .featured-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .featured-tag-pill { position: absolute; top: 18px; left: 18px; padding: 6px 14px; border-radius: 999px; background: rgba(10,10,10,0.78); color: #fff; font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: .18em; backdrop-filter: blur(8px); }
        .featured-body { padding: 36px 38px 38px; }
        .featured-body .eyebrow { margin-bottom: 8px; }
        .feat-title { font-size: clamp(1.8rem, 3.6vw, 2.8rem); color: var(--ink); letter-spacing: -0.025em; margin: 6px 0 14px; line-height: 1.05; font-weight: 500; }
        .featured-body p { color: var(--muted); line-height: 1.65; font-size: 17px; max-width: 800px; margin: 0 0 22px; }
        .featured-metrics { display: flex; gap: 36px; flex-wrap: wrap; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 18px; }
        .featured-metric { display: flex; flex-direction: column; gap: 4px; }
        .metric-num { font-family: var(--font-editorial), Fraunces, serif; font-size: clamp(1.8rem, 3vw, 2.4rem); font-weight: 500; color: var(--warm); letter-spacing: -0.03em; line-height: 1; }
        .metric-label { font-size: 11px; color: var(--muted); letter-spacing: 0.18em; text-transform: uppercase; }
        .link-arrow { color: var(--ink); font-size: 13px; letter-spacing: 0.05em; font-weight: 600; }

        .proj-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; margin-top: 32px; }
        .proj-card-link { text-decoration: none; color: inherit; }
        .proj-card { padding: 0 !important; overflow: hidden; }
        .proj-thumb { aspect-ratio: 16/10; background-size: cover; background-position: center; }
        .proj-body { padding: 22px 24px 26px; }
        .proj-body .eyebrow { margin-bottom: 6px; }
        .proj-title { font-size: 22px; color: var(--ink); letter-spacing: -0.02em; line-height: 1.1; margin: 6px 0 10px; font-weight: 500; }
        .proj-body p { color: var(--muted); line-height: 1.55; font-size: 14px; margin: 0 0 14px; }

        .contact-cta { text-align: center; padding: 96px 0 120px; }
        .contact-cta .lead { max-width: 520px; margin: 16px auto 0; }
        .cta-actions { margin-top: 32px; display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 920px) {
          .proj-hero-copy { padding: 36px 0 72px; }
          .featured-body { padding: 24px 22px 26px; }
          .featured-metrics { gap: 18px; }
          .contact-cta { padding: 64px 0 96px; }
        }
      `}</style>
    </main>
  );
}
