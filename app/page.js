const services = [
  {
    title: 'Website Rebuilds',
    text: 'Premium web experiences for restaurants and local brands that need stronger trust, clearer positioning, and higher conversion.',
  },
  {
    title: 'Local SEO Systems',
    text: 'Daytona and Orlando focused visibility strategy including GBP optimization, city landing pages, and authority growth.',
  },
  {
    title: 'Creative + Content',
    text: 'Brand visuals, campaign assets, and high-end media direction to elevate perception and attract better customers.',
  },
  {
    title: 'Automation + Ops',
    text: 'Execution systems that remove manual bottlenecks and keep marketing output consistent week after week.',
  },
];

const projects = [
  {
    title: 'Beach Bucket Website',
    summary: 'Restaurant website redesign, menu image pipeline, and public deployment workflow.',
    href: 'https://c4outlaw.github.io/mission-control-hq/',
    label: 'View Live Project',
  },
  {
    title: 'Magic Menu App',
    summary: 'Operational app concept for menu, recipe, and restaurant workflow execution.',
  },
  {
    title: 'Mission Control (Private)',
    summary: 'Internal execution dashboard secured behind authentication.',
    href: '/mission-control',
    label: 'Private Access',
  },
];

export default function HomePage() {
  return (
    <main className="mhq-page">
      <section className="hero">
        <video className="hero-video" autoPlay muted loop playsInline poster="/images/mc-bg-dark.jpg">
          <source src="/assets/myriehq/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <nav className="nav shell">
          <div className="brand">MYRIE HQ</div>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#results">Results</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-content shell">
          <p className="kicker">PREMIUM MARKETING SYSTEMS · DAYTONA + ORLANDO</p>
          <h1>
            We help local businesses look elite online,
            <span> rank higher, and convert more customers.</span>
          </h1>
          <p className="sub">
            Myrie HQ builds modern websites, local SEO systems, and creative growth engines for restaurants, coffee shops, and
            local brands ready to scale.
          </p>
          <div className="cta-row">
            <a className="btn primary" href="#contact">Book a Strategy Call</a>
            <a className="btn" href="#work">See Work</a>
            <a className="btn ghost" href="/mission-control">Mission Control (Private)</a>
          </div>
        </div>
      </section>

      <section id="results" className="section shell">
        <div className="stats-grid">
          <article className="stat"><strong>Faster</strong><span>Execution systems built for speed and consistency.</span></article>
          <article className="stat"><strong>Premium</strong><span>Design direction that elevates trust and perceived value.</span></article>
          <article className="stat"><strong>Local</strong><span>Daytona + Orlando growth strategy for map and organic visibility.</span></article>
          <article className="stat"><strong>Built to Scale</strong><span>From launch to optimization with clear next actions.</span></article>
        </div>
      </section>

      <section id="services" className="section shell">
        <header className="section-head">
          <p>Services</p>
          <h2>Everything needed to turn attention into revenue</h2>
        </header>
        <div className="card-grid">
          {services.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="section shell">
        <header className="section-head">
          <p>Selected Work</p>
          <h2>Projects built for real-world business outcomes</h2>
        </header>
        <div className="work-grid">
          {projects.map((item) => (
            <article key={item.title} className="work-card">
              <div className="thumb" />
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {item.href ? (
                <a className="link" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {item.label || 'Open'}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section shell contact">
        <div>
          <p className="kicker">CONTACT MYRIE FOR MARKETING</p>
          <h2>Ready to rebuild your website and growth system?</h2>
          <p>Tell us what you’re building and we’ll map out the fastest path to a premium, conversion-ready presence.</p>
        </div>
        <div className="cta-row">
          <a className="btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a>
          <a className="btn" href="tel:+16053892273">+1 (605) 389-2273</a>
        </div>
      </section>

      <style>{`
        .mhq-page { background:#050916; color:#eef4ff; min-height:100vh; }
        .shell { width:min(1160px, calc(100% - 40px)); margin:0 auto; }

        .hero { position:relative; min-height:82vh; overflow:hidden; }
        .hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:saturate(1.1) contrast(1.04); }
        .hero-overlay { position:absolute; inset:0; background:linear-gradient(115deg, rgba(4,9,20,.92) 20%, rgba(7,15,33,.65) 52%, rgba(10,23,51,.72) 100%); }

        .nav { position:relative; z-index:2; padding:22px 0 10px; display:flex; justify-content:space-between; gap:14px; align-items:center; }
        .brand { font-size:13px; letter-spacing:.12em; font-weight:800; color:#9fd1ff; }
        .nav-links { display:flex; gap:10px; flex-wrap:wrap; }
        .nav-links a { color:#d5e6ff; text-decoration:none; border:1px solid rgba(157,194,255,.35); border-radius:999px; padding:7px 12px; font-size:12px; }

        .hero-content { position:relative; z-index:2; padding:64px 0 72px; }
        .kicker { font-size:12px; letter-spacing:.12em; color:#8bc4ff; font-weight:700; margin:0 0 14px; text-transform:uppercase; }
        h1 { margin:0; max-width:900px; font-size:clamp(2.1rem,5vw,4.1rem); line-height:1.03; }
        h1 span { color:#90b8ff; display:block; }
        .sub { margin:16px 0 0; max-width:760px; color:#c7daf7; font-size:18px; line-height:1.55; }

        .cta-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:24px; }
        .btn { text-decoration:none; border-radius:12px; padding:12px 16px; border:1px solid rgba(148,183,241,.45); color:#e9f2ff; font-weight:700; font-size:14px; }
        .btn.primary { background:linear-gradient(90deg,#1f8fff,#5764ff); border:none; color:#fff; }
        .btn.ghost { background:rgba(6,10,20,.56); }

        .section { padding:42px 0; }
        .section-head p { margin:0 0 8px; color:#8bbef8; text-transform:uppercase; letter-spacing:.1em; font-size:12px; font-weight:700; }
        .section-head h2 { margin:0; font-size:clamp(1.55rem,3vw,2.45rem); line-height:1.1; }

        .stats-grid { display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }
        .stat { background:linear-gradient(180deg,#0b1630,#081226); border:1px solid rgba(109,147,208,.35); border-radius:14px; padding:16px; }
        .stat strong { display:block; font-size:1.08rem; margin-bottom:6px; }
        .stat span { color:#b7cbed; font-size:14px; }

        .card-grid, .work-grid { margin-top:16px; display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); }
        .card, .work-card { background:linear-gradient(180deg,#0b1630,#081226); border:1px solid rgba(109,147,208,.35); border-radius:16px; padding:18px; }
        .card h3, .work-card h3 { margin:0 0 10px; }
        .card p, .work-card p { margin:0 0 10px; color:#bdd2f1; line-height:1.55; }
        .link { color:#88ccff; font-weight:700; text-decoration:none; }
        .thumb { height:140px; border-radius:12px; margin-bottom:12px; background:linear-gradient(120deg,#1f3d72,#0f2247 45%,#182f5c); border:1px solid rgba(129,168,226,.35); }

        .contact { border-top:1px solid rgba(129,168,226,.28); margin-top:12px; }
        .contact h2 { margin:0 0 10px; font-size:clamp(1.55rem,3vw,2.3rem); }
        .contact p { margin:0; color:#c5d9f8; max-width:760px; line-height:1.6; }

        @media (max-width: 800px) {
          .hero { min-height:auto; }
          .hero-content { padding:46px 0 58px; }
          .sub { font-size:16px; }
          .shell { width:min(1160px, calc(100% - 24px)); }
        }
      `}</style>
    </main>
  );
}
