const services = [
  ['Website Rebuilds', 'Premium, conversion-focused sites for restaurants and local brands that need authority.'],
  ['Local SEO Systems', 'Daytona + Orlando local search growth: GBP, service pages, and on-page SEO execution.'],
  ['Creative Direction', 'Visual storytelling, ad creatives, and brand-level polish that feels expensive and modern.'],
  ['Automation Ops', 'Repeatable marketing systems that remove bottlenecks and increase weekly output.'],
];

const featured = [
  {
    title: 'Beach Bucket Website',
    copy: 'Modern restaurant website with menu workflows, mobile polish, and public deployment.',
    href: 'https://c4outlaw.github.io/mission-control-hq/',
    label: 'View live site',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Magic Menu App',
    copy: 'Operations-focused product concept for menus, content, and restaurant growth workflows.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  },
];

const heroVideo =
  'https://videos.pexels.com/video-files/857195/857195-hd_1920_1080_30fps.mp4';

const heroPoster =
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1800&q=80';

const gallery = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Myrie HQ',
  url: 'https://www.myriehq.com',
  areaServed: ['Daytona Beach, FL', 'Orlando, FL'],
  serviceType: ['Website Design', 'Local SEO', 'Marketing Strategy', 'Brand Creative'],
  telephone: '+1-605-389-2273',
  email: 'myriework@gmail.com',
};

export default function HomePage() {
  return (
    <main className="mhq">
      <div className="mesh" />
      <header className="top shell">
        <div className="brand">MYRIE HQ</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#proof">Proof</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-image">
          <video className="hero-video" autoPlay muted loop playsInline poster={heroPoster}>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy">
          <p className="kicker">DAYTONA + ORLANDO MARKETING SYSTEMS</p>
          <h1>
            Build a brand that looks elite,
            <span> ranks locally, and converts fast.</span>
          </h1>
          <p>
            Myrie HQ designs premium websites and growth systems for restaurants and local businesses that want to dominate
            online without looking generic.
          </p>
          <div className="cta">
            <a className="btn primary" href="#contact">Book strategy call</a>
            <a className="btn" href="#work">See our work</a>
          </div>
        </div>

        <aside className="hero-panel">
          <h3>Growth Focus</h3>
          <ul>
            <li>Website conversion architecture</li>
            <li>Local SEO for Daytona + Orlando</li>
            <li>Premium visuals and brand refresh</li>
            <li>Automation for faster execution</li>
          </ul>
        </aside>
      </section>

      <section id="proof" className="shell stats">
        <article><strong>Premium</strong><span>Modern visual quality built to stand out.</span></article>
        <article><strong>Local</strong><span>Targeted service architecture for city ranking.</span></article>
        <article><strong>Fast</strong><span>Speed-focused implementation and deployment.</span></article>
        <article><strong>Scalable</strong><span>Systems built for iteration, not one-off launches.</span></article>
      </section>

      <section className="shell gallery">
        {gallery.map((src) => (
          <div key={src} className="gallery-card" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </section>

      <section id="services" className="shell block">
        <div className="head">
          <p>Services</p>
          <h2>Everything needed to modernize your growth stack</h2>
        </div>
        <div className="grid">
          {services.map(([title, copy]) => (
            <article key={title} className="card">
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="shell block">
        <div className="head">
          <p>Featured Work</p>
          <h2>Real projects, real deployment, real momentum</h2>
        </div>
        <div className="grid work">
          {featured.map((item) => (
            <article key={item.title} className="card workCard">
              <div className="media" style={{ backgroundImage: `url(${item.image})` }} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.href ? (
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {item.label}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="shell contact">
        <div>
          <p className="kicker">CONTACT MYRIE FOR MARKETING</p>
          <h2>Ready to rebuild your website and grow faster?</h2>
          <p>Tell us what you’re building and we’ll map the fastest path to a premium online presence.</p>
        </div>
        <div className="cta">
          <a className="btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a>
          <a className="btn" href="tel:+16053892273">+1 (605) 389-2273</a>

        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <style>{`
        .mhq { position:relative; min-height:100vh; color:#eef4ff; background:linear-gradient(180deg,#050916,#090f24 35%,#120a22 100%); overflow:hidden; }
        .mesh { position:fixed; inset:-20% -10%; background:
          radial-gradient(circle at 12% 18%, rgba(53,116,255,.30), transparent 35%),
          radial-gradient(circle at 80% 8%, rgba(196,80,255,.24), transparent 32%),
          radial-gradient(circle at 70% 75%, rgba(34,221,255,.2), transparent 30%),
          radial-gradient(circle at 30% 90%, rgba(255,120,70,.14), transparent 34%);
          pointer-events:none; z-index:0; }
        .shell { position:relative; z-index:1; width:min(1160px, calc(100% - 40px)); margin:0 auto; }
        .top { padding:20px 0 12px; display:flex; align-items:center; justify-content:space-between; gap:14px; }
        .brand { font-weight:900; letter-spacing:.14em; font-size:13px; color:#9ed1ff; }
        nav { display:flex; gap:10px; flex-wrap:wrap; }
        nav a { color:#d8e8ff; text-decoration:none; font-size:12px; border:1px solid rgba(145,175,235,.35); padding:7px 12px; border-radius:999px; }

        .hero { display:grid; grid-template-columns:1fr 1.05fr .75fr; gap:16px; padding:48px 0 24px; align-items:stretch; }
        .hero-image { position:relative; border-radius:18px; min-height:360px; overflow:hidden; border:1px solid rgba(137,170,232,.35); box-shadow:0 22px 45px rgba(4,10,22,.45); }
        .hero-video { width:100%; height:100%; min-height:360px; object-fit:cover; display:block; }
        .hero-image::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg, rgba(5,9,20,.05), rgba(5,9,20,.45)); pointer-events:none; }
        .hero-copy h1 { margin:0; font-size:clamp(2.2rem,5vw,4.2rem); line-height:1.02; letter-spacing:-.02em; }
        .hero-copy h1 span { display:block; color:#9fc1ff; }
        .kicker { margin:0 0 12px; font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:#86c0ff; font-weight:700; }
        .hero-copy p { margin:16px 0 0; max-width:760px; color:#c5d8f3; font-size:18px; line-height:1.55; }
        .cta { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
        .btn { text-decoration:none; color:#e7f1ff; border:1px solid rgba(146,179,235,.45); border-radius:12px; padding:12px 15px; font-weight:700; font-size:14px; }
        .btn.primary { border:none; color:white; background:linear-gradient(90deg,#1d8eff,#5f61ff); }
        .btn.ghost { background:rgba(7,12,24,.65); }

        .hero-panel { background:linear-gradient(180deg, rgba(15,29,59,.9), rgba(8,16,34,.9)); border:1px solid rgba(122,157,220,.35); border-radius:18px; padding:20px; box-shadow:0 18px 40px rgba(3,8,18,.5); }
        .hero-panel h3 { margin:0 0 10px; }
        .hero-panel ul { margin:0; padding-left:18px; color:#c3d6f1; line-height:1.7; }

        .stats { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; margin:18px auto 8px; }
        .stats article { background:linear-gradient(180deg, rgba(14,26,52,.9), rgba(7,14,30,.9)); border:1px solid rgba(115,152,214,.34); border-radius:14px; padding:14px; }
        .stats strong { display:block; font-size:20px; margin-bottom:4px; }
        .stats span { color:#bad0ef; font-size:14px; }

        .block { padding:44px 0 8px; }
        .head p { margin:0 0 8px; color:#8cbef8; text-transform:uppercase; font-size:12px; letter-spacing:.1em; font-weight:700; }
        .head h2 { margin:0; font-size:clamp(1.6rem,3vw,2.4rem); line-height:1.12; }
        .grid { margin-top:16px; display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); }
        .card { background:linear-gradient(180deg, rgba(14,26,52,.9), rgba(7,14,30,.9)); border:1px solid rgba(115,152,214,.34); border-radius:16px; padding:18px; }
        .card h3 { margin:0 0 10px; }
        .card p { margin:0; color:#bdd2ef; line-height:1.6; }
        .workCard a { display:inline-block; margin-top:12px; color:#8cd0ff; text-decoration:none; font-weight:700; }
        .media { height:180px; border-radius:12px; margin-bottom:12px; background-size:cover; background-position:center; border:1px solid rgba(125,164,228,.35); }

        .gallery { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin:8px auto 0; }
        .gallery-card { height:170px; border-radius:14px; background-size:cover; background-position:center; border:1px solid rgba(133,170,235,.32); box-shadow:0 16px 34px rgba(5,10,22,.4); }

        .contact { margin:52px auto 70px; padding:24px; border-radius:18px; border:1px solid rgba(126,164,230,.35); background:linear-gradient(120deg, rgba(18,35,68,.92), rgba(30,10,44,.9)); }
        .contact h2 { margin:0 0 10px; font-size:clamp(1.7rem,3vw,2.5rem); }
        .contact p { margin:0; color:#c2d6f4; max-width:780px; line-height:1.6; }

        @media (max-width:1020px){
          .hero { grid-template-columns:1fr; }
          .hero-image { min-height:260px; }
        }
        @media (max-width:900px){
          .hero-copy p { font-size:16px; }
          .gallery { grid-template-columns:1fr; }
          .shell { width:min(1160px, calc(100% - 24px)); }
        }
      `}</style>
    </main>
  );
}
