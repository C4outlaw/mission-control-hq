const services = [
  ['Website Rebuilds', 'Premium, conversion-focused websites for restaurants and local businesses.'],
  ['Local SEO Systems', 'Daytona + Orlando local growth with strong on-page and GBP execution.'],
  ['Creative Direction', 'Modern brand visuals and campaign assets that elevate trust.'],
  ['Automation Ops', 'Repeatable systems that speed up marketing and reduce manual work.'],
];

const featured = [
  {
    title: 'Beach Bucket Website',
    copy: 'Restaurant website redesign with menu workflows and deployment.',
    href: 'https://c4outlaw.github.io/mission-control-hq/',
    label: 'View live project',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Magic Menu App',
    copy: 'Operations-focused concept for menu and restaurant workflow growth.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  },
];

const heroVideo =
  'https://videos.pexels.com/video-files/854259/854259-hd_1280_720_48fps.mp4';

const heroPoster =
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1800&q=80';

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
    <main className="site">
      <header className="nav shell">
        <div className="brand">MYRIE HQ</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-media reveal">
          <video autoPlay muted loop playsInline poster={heroPoster}>
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="hero-copy reveal delay">
          <p className="eyebrow">DAYTONA + ORLANDO MARKETING SYSTEMS</p>
          <h1>Build a brand that looks premium, ranks locally, and converts.</h1>
          <p>
            Myrie HQ helps restaurants and local businesses launch modern websites, improve local visibility,
            and scale with clean marketing systems.
          </p>
          <div className="actions">
            <a className="btn primary" href="#contact">Book strategy call</a>
            <a className="btn" href="#work">See work</a>
          </div>
        </div>
      </section>

      <section className="shell trust">
        <div>Web Design</div>
        <div>Local SEO</div>
        <div>Brand Creative</div>
        <div>Automation</div>
        <div>Daytona + Orlando</div>
      </section>

      <section id="services" className="shell block">
        <h2>Services</h2>
        <div className="grid">
          {services.map(([title, copy]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="shell block">
        <h2>Featured work</h2>
        <div className="grid">
          {featured.map((item) => (
            <article className="card" key={item.title}>
              <div className="thumb" style={{ backgroundImage: `url(${item.image})` }} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="link">{item.label}</a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="shell quote">
        <p>
          “We don’t just make websites look better — we make them perform better.”
        </p>
      </section>

      <section id="about" className="shell about">
        <h2>About O’Neill Myrie</h2>
        <p>
          I’m O’Neill Myrie, General Manager at The Beach Bucket in Ormond Beach and founder of Myrie HQ.
          I blend real-world hospitality operations with modern marketing systems to help local businesses look premium,
          rank higher on Google, and convert more customers.
        </p>
      </section>

      <section id="contact" className="shell contact">
        <h2>Contact Myrie for Marketing</h2>
        <p>Let’s rebuild your site and growth strategy with a premium, modern approach.</p>
        <div className="actions">
          <a className="btn primary" href="mailto:myriework@gmail.com">myriework@gmail.com</a>
          <a className="btn" href="tel:+16053892273">+1 (605) 389-2273</a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <style>{`
        .site { background:#fff; color:#111; min-height:100vh; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif; }
        .shell { width:min(1120px, calc(100% - 40px)); margin:0 auto; }

        .nav { position:sticky; top:0; z-index:5; backdrop-filter: blur(10px); background:rgba(255,255,255,.82); border-bottom:1px solid #efeff3; padding:16px 0; display:flex; justify-content:space-between; align-items:center; }
        .brand { font-weight:700; letter-spacing:.08em; font-size:13px; }
        nav { display:flex; gap:10px; }
        nav a { text-decoration:none; color:#222; font-size:13px; padding:8px 12px; border:1px solid #ececf1; border-radius:999px; }

        .hero { display:grid; grid-template-columns:1.05fr .95fr; gap:24px; align-items:center; padding:28px 0 46px; }
        .hero-media { border-radius:22px; overflow:hidden; border:1px solid #e9e9ef; box-shadow:0 14px 36px rgba(0,0,0,.08); }
        .hero-media video { width:100%; height:100%; min-height:410px; object-fit:cover; display:block; }
        .eyebrow { margin:0 0 12px; text-transform:uppercase; letter-spacing:.12em; font-size:11px; color:#5f6675; font-weight:600; }
        h1 { margin:0; font-size:clamp(2rem,5vw,3.95rem); line-height:1.03; letter-spacing:-.03em; font-weight:700; }
        .hero-copy p { color:#4f5663; line-height:1.6; font-size:17px; margin-top:14px; }
        .actions { margin-top:18px; display:flex; gap:10px; flex-wrap:wrap; }
        .btn { text-decoration:none; padding:12px 16px; border-radius:12px; border:1px solid #d8dae3; color:#111; font-weight:600; transition:all .2s ease; }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(0,0,0,.08); }
        .btn.primary { background:#111; color:#fff; border-color:#111; }

        .trust { display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:10px; margin-bottom:8px; }
        .trust div { text-align:center; font-size:12px; color:#5f6675; border:1px solid #ececf1; padding:10px 8px; border-radius:999px; }

        .block { padding:34px 0; }
        h2 { margin:0 0 14px; font-size:clamp(1.5rem,3vw,2.2rem); letter-spacing:-.02em; }
        .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
        .card { border:1px solid #ececf1; border-radius:16px; padding:16px; background:#fff; box-shadow:0 6px 18px rgba(0,0,0,.03); }
        .card h3 { margin:0 0 8px; font-size:20px; letter-spacing:-.01em; }
        .card p { margin:0; color:#5a6070; line-height:1.6; }
        .thumb { height:170px; border-radius:12px; margin-bottom:12px; background-size:cover; background-position:center; }
        .link { display:inline-block; margin-top:10px; color:#0a63ff; text-decoration:none; font-weight:600; }

        .quote { margin:8px auto 0; padding:26px 24px; border:1px solid #ececf1; border-radius:18px; background:linear-gradient(180deg,#fff,#fafbff); }
        .quote p { margin:0; font-size:clamp(1.2rem,2.5vw,1.8rem); letter-spacing:-.02em; color:#1d2430; }

        .about { border-top:1px solid #efeff3; margin-top:22px; padding:34px 0 12px; }
        .about p { color:#5a6070; line-height:1.7; max-width:900px; }

        .contact { border-top:1px solid #efeff3; margin-top:22px; padding:36px 0 70px; }
        .contact p { color:#5a6070; }

        .reveal { animation: rise .7s ease both; }
        .delay { animation-delay:.12s; }
        @keyframes rise { from {opacity:0; transform:translateY(14px);} to {opacity:1; transform:none;} }

        @media (max-width: 920px) {
          .hero { grid-template-columns:1fr; }
          .hero-media video { min-height:280px; }
          .trust { grid-template-columns:1fr 1fr; }
          .shell { width:min(1120px, calc(100% - 24px)); }
        }
      `}</style>
    </main>
  );
}
