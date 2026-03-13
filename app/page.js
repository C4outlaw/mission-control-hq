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
    video: '/assets/work/beachbucket-featured.mp4',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Magic Menu App',
    copy: 'Operations-focused concept for menu and restaurant workflow growth.',
    href: 'https://savory-studio.vercel.app/dashboard',
    label: 'Open Magic Menu App',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  },
];

const heroVideo =
  'https://videos.pexels.com/video-files/854252/854252-hd_1920_1080_24fps.mp4';

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
        <div className="brand">Let Us Optimize Your Business And Watch Your Sales Skyrocket</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="/magic-menu">Magic Menu</a>
          <a href="/about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero full-hero reveal">
        <video className="hero-video" autoPlay muted loop playsInline poster={heroPoster}>
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-copy shell delay">
          <p className="eyebrow">DAYTONA + ORLANDO MARKETING SYSTEMS</p>
          <h1 className="glass-title">Build A Brand That Looks Premium, Ranks Locally, And Converts.</h1>
          <p>
            Myrie HQ helps restaurants and local businesses launch modern websites, improve local visibility,
            and scale with clean marketing systems.
          </p>
          <div className="actions">
            <a className="btn primary" href="#contact">Book strategy call</a>
            <a className="btn" href="#work">See work</a>
            <a className="btn" href="/magic-menu">Open Magic Menu App</a>
          </div>
        </div>
      </section>

      <section className="shell trust">
        <div>Web Design</div>
        <div>Local SEO</div>
        <div>Brand Creative</div>
        <div>Automation</div>
        <div>Menu Engineering</div>
        <div>Product Photo Reimagined</div>
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
              {item.video ? (
                <video className="thumb-video" autoPlay muted loop playsInline preload="metadata">
                  <source src={item.video} type="video/mp4" />
                </video>
              ) : (
                <div className="thumb" style={{ backgroundImage: `url(${item.image})` }} />
              )}
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

      <section id="buy" className="shell block">
        <h2>Get Magic Menu</h2>
        <p className="buy-sub">We are packaging Magic Menu for direct download on desktop (.exe) and Android (.apk). Launch price: <strong>$9.99</strong>.</p>
        <div className="grid">
          <article className="card">
            <h3>Desktop Download (.exe)</h3>
            <p>Install on your computer and run Magic Menu as a desktop app.</p>
            <a className="btn" href="mailto:myriework@gmail.com?subject=Magic%20Menu%20Desktop%20Waitlist">Join Desktop Waitlist</a>
          </article>
          <article className="card">
            <h3>Android Download (.apk)</h3>
            <p>Install Magic Menu on Android devices for mobile workflow access.</p>
            <a className="btn" href="mailto:myriework@gmail.com?subject=Magic%20Menu%20Android%20Waitlist">Join Android Waitlist</a>
          </article>
        </div>
      </section>

      <section id="about" className="shell about">
        <h2>About O’Neill Myrie</h2>
        <div className="about-grid">
          <img src="/assets/profile/myrie.jpg" alt="O’Neill Myrie" className="about-photo" />
          <div>
            <p>
              O’Neill Myrie is General Manager at The Beach Bucket and founder of Myrie HQ, combining hospitality operations with modern marketing systems for local business growth.
            </p>
            <a className="link" href="/about">Read full story</a>
          </div>
        </div>
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
        .brand { font-weight:800; letter-spacing:.06em; font-size:clamp(1.4rem, 3.2vw, 2.4rem); text-shadow:0 2px 6px rgba(0,0,0,.18); line-height:1; }
        nav { display:flex; gap:10px; }
        nav a {
          text-decoration:none;
          color:#1b2230;
          font-size:13px;
          padding:8px 12px;
          border:1px solid transparent;
          border-radius:999px;
          background:
            linear-gradient(#ffffff,#ffffff) padding-box,
            linear-gradient(110deg,#7aa8ff,#9a7bff,#63d2ff) border-box;
          box-shadow:0 6px 18px rgba(34,64,120,.08);
          text-shadow:0 1px 1px rgba(255,255,255,.65);
        }

        .hero { position:relative; }
        .full-hero { min-height:70vh; margin-top:10px; border-radius:24px; overflow:hidden; }
        .hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
        .hero-overlay { position:absolute; inset:0; background:linear-gradient(115deg, rgba(8,10,14,.32) 10%, rgba(8,10,14,.14) 52%, rgba(8,10,14,.28) 100%); }
        .hero-copy { position:relative; z-index:1; padding:64px 0 64px; max-width:900px; }
        .eyebrow { margin:0 0 12px; text-transform:uppercase; letter-spacing:.12em; font-size:11px; color:#edf3ff; font-weight:600; text-shadow:0 2px 8px rgba(0,0,0,.45); }
        .glass-title { margin:0; font-size:clamp(2rem,5vw,4.4rem); line-height:1.03; letter-spacing:-.03em; font-weight:700; color:rgba(255,255,255,.94); text-shadow:0 3px 20px rgba(0,0,0,.38), 0 1px 1px rgba(255,255,255,.55); -webkit-text-stroke:1px rgba(255,255,255,.22); }
        .hero-copy p { color:#f4f7ff; line-height:1.6; font-size:18px; margin-top:14px; max-width:680px; text-shadow:0 2px 10px rgba(0,0,0,.35); }
        .actions { margin-top:18px; display:flex; gap:10px; flex-wrap:wrap; }
        .btn { text-decoration:none; padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,.55); color:#fff; font-weight:600; transition:all .2s ease; background:rgba(255,255,255,.08); backdrop-filter: blur(8px); }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 8px 18px rgba(0,0,0,.18); }
        .btn.primary { background:#fff; color:#111; border-color:#fff; }

        .trust { display:flex; justify-content:center; align-items:center; gap:10px; flex-wrap:nowrap; margin:6px auto 14px; overflow-x:auto; padding-bottom:2px; }
        .trust div { text-align:center; font-size:clamp(.82rem, 1.1vw, .98rem); font-weight:700; letter-spacing:-.005em; color:#1a2230; border:1px solid transparent; padding:10px 12px; border-radius:14px; white-space:nowrap; background:linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(110deg,#6f9dff,#9a79ff,#53d1ff) border-box; box-shadow:0 8px 18px rgba(29,61,118,.08); }

        .block { padding:34px 0; }
        h2 { margin:0 0 14px; font-size:clamp(1.5rem,3vw,2.2rem); letter-spacing:-.02em; }
        .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
        .card {
          border:1px solid transparent;
          border-radius:16px;
          padding:16px;
          background:
            linear-gradient(#ffffff,#ffffff) padding-box,
            linear-gradient(130deg,#c8d8ff,#e2d2ff,#b8f0ff) border-box;
          box-shadow:0 10px 24px rgba(38,66,115,.08);
        }
        .card h3 { margin:0 0 8px; font-size:20px; letter-spacing:-.01em; text-shadow:0 1px 1px rgba(255,255,255,.8); }
        .card p { margin:0; color:#4f5663; line-height:1.6; text-shadow:0 1px 1px rgba(255,255,255,.55); }
        .buy-sub { color:#5a6070; margin:0 0 14px; }
        #buy .card { position:relative; overflow:hidden; }
        #buy .btn { margin-top:12px; display:inline-flex; align-items:center; justify-content:center; color:#111; border:1px solid transparent; background:linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(110deg,#0a84ff,#7b61ff,#36c9ff) border-box; box-shadow:0 8px 18px rgba(12,85,220,.14); backdrop-filter:none; }
        #buy .btn:hover { color:#111; box-shadow:0 10px 22px rgba(12,85,220,.2); }
        .thumb { height:170px; border-radius:12px; margin-bottom:12px; background-size:cover; background-position:center; }
        .thumb-video { width:100%; height:170px; object-fit:cover; border-radius:12px; margin-bottom:12px; display:block; }
        .link { display:inline-block; margin-top:10px; color:#0a63ff; text-decoration:none; font-weight:600; }

        .quote { margin:8px auto 0; padding:26px 24px; border:1px solid #ececf1; border-radius:18px; background:linear-gradient(180deg,#fff,#f7f9ff); box-shadow:0 10px 24px rgba(34,64,120,.06); }
        .quote p { margin:0; font-size:clamp(1.2rem,2.5vw,1.8rem); letter-spacing:-.02em; color:#1d2430; text-shadow:0 1px 1px rgba(255,255,255,.8); }

        .about { border-top:1px solid #efeff3; margin-top:22px; padding:34px 0 12px; }
        .about-grid { display:grid; grid-template-columns:220px 1fr; gap:16px; align-items:start; }
        .about-photo { width:100%; border-radius:14px; border:1px solid #e5e7eb; box-shadow:0 10px 20px rgba(0,0,0,.08); }
        .about p { color:#4f5663; line-height:1.7; max-width:900px; text-shadow:0 1px 1px rgba(255,255,255,.6); margin-top:0; }

        .contact { border-top:1px solid #efeff3; margin-top:22px; padding:36px 0 70px; }
        .contact p { color:#4f5663; text-shadow:0 1px 1px rgba(255,255,255,.6); }
        .contact .btn { color:#111; border:1px solid transparent; background:linear-gradient(#fff,#fff) padding-box, linear-gradient(120deg,#c9d8ff,#dfd4ff,#b7ecff) border-box; backdrop-filter:none; }
        .contact .btn.primary { background:#111; color:#fff; border-color:#111; }

        .reveal { animation: rise .7s ease both; }
        .delay { animation-delay:.12s; }
        @keyframes rise { from {opacity:0; transform:translateY(14px);} to {opacity:1; transform:none;} }

        @media (max-width: 920px) {
          .full-hero { min-height:62vh; border-radius:18px; }
          .hero-copy { padding:40px 0 42px; }
          .hero-video { min-height:62vh; }
          .trust { justify-content:flex-start; gap:8px; }
          .about-grid { grid-template-columns:1fr; }
          .about-photo { max-width:280px; }
          .shell { width:min(1120px, calc(100% - 24px)); }
        }
      `}</style>
    </main>
  );
}
