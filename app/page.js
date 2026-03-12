const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 10% 0%, #1a2f57 0%, #0a1020 38%, #05070f 100%)',
    color: '#f3f7ff',
  },
  wrap: {
    maxWidth: 1160,
    margin: '0 auto',
    padding: '28px 20px 90px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    padding: '12px 0 22px',
  },
  brand: { fontWeight: 800, letterSpacing: '.08em', fontSize: 14, color: '#8cc4ff' },
  navLinks: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  chip: {
    textDecoration: 'none',
    color: '#d9e9ff',
    border: '1px solid #28486f',
    borderRadius: 999,
    padding: '8px 12px',
    fontSize: 13,
  },
  hero: { padding: '30px 0 22px' },
  kicker: { color: '#89bfff', fontWeight: 700, letterSpacing: '.08em', fontSize: 13, marginBottom: 12 },
  h1: { fontSize: 'clamp(2rem, 5vw, 3.6rem)', lineHeight: 1.05, margin: '0 0 14px', maxWidth: 900 },
  sub: { color: '#c4d8f5', fontSize: 18, lineHeight: 1.55, maxWidth: 760, margin: 0 },
  ctaRow: { display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 },
  btn: {
    textDecoration: 'none',
    borderRadius: 12,
    padding: '12px 16px',
    fontWeight: 600,
    fontSize: 14,
    border: '1px solid #365d8c',
    color: '#e6f2ff',
  },
  btnPrimary: {
    border: 'none',
    color: '#fff',
    background: 'linear-gradient(90deg, #1f8dff 0%, #5a63ff 100%)',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))',
    gap: 12,
    marginTop: 28,
  },
  stat: {
    background: 'linear-gradient(180deg, rgba(27,43,71,.85), rgba(11,18,31,.85))',
    border: '1px solid #2a476f',
    borderRadius: 14,
    padding: '16px 14px',
  },
  statNum: { fontSize: 30, fontWeight: 800, lineHeight: 1.1 },
  statTxt: { color: '#b7ceef', marginTop: 4, fontSize: 13 },
  section: { marginTop: 44 },
  h2: { fontSize: 30, margin: '0 0 10px' },
  p: { color: '#c4d8f5', margin: 0, lineHeight: 1.65 },
  cards: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14, marginTop: 16 },
  card: {
    background: 'linear-gradient(180deg, rgba(20,32,51,.86), rgba(10,16,27,.86))',
    border: '1px solid #263f60',
    borderRadius: 16,
    padding: 18,
  },
  cardTitle: { margin: '0 0 8px', fontSize: 19 },
  cardText: { margin: '0 0 8px', color: '#bfd4f2', lineHeight: 1.55 },
  link: { color: '#7fc6ff', textDecoration: 'none', fontWeight: 600 },
  process: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
    gap: 12,
    marginTop: 14,
  },
  step: {
    border: '1px solid #263f60',
    borderRadius: 14,
    padding: 16,
    background: 'rgba(8,13,24,.75)',
  },
  contact: {
    marginTop: 46,
    border: '1px solid #32537f',
    borderRadius: 18,
    padding: 22,
    background: 'linear-gradient(120deg, rgba(22,40,68,.95), rgba(7,13,24,.95))',
  },
};

const serviceCards = [
  {
    title: 'Marketing Websites',
    text: 'Premium website design and rebuilds for restaurants, cafes, and local service brands that need authority online.',
  },
  {
    title: 'Local SEO Growth',
    text: 'Google visibility strategy for Daytona and Orlando, including GBP optimization, service pages, and ranking-focused content.',
  },
  {
    title: 'Brand & Visual Refresh',
    text: 'Creative direction, image upgrades, and conversion-focused visuals that make your business feel premium.',
  },
  {
    title: 'Automation Systems',
    text: 'Operational workflows that reduce manual work and speed up execution across content, websites, and campaigns.',
  },
];

const projects = [
  {
    title: 'Beach Bucket Website',
    text: 'Restaurant website with menu image workflows, mobile optimization, and public deployment.',
    href: 'https://c4outlaw.github.io/mission-control-hq/',
    cta: 'View Live Project',
  },
  {
    title: 'Magic Menu App',
    text: 'Restaurant operations app for menu workflows, optimization, and execution infrastructure.',
  },
  {
    title: 'Mission Control (Private)',
    text: 'Internal command system secured behind authentication for workflows and automation.',
    href: '/mission-control',
    cta: 'Private Access',
  },
];

export default function HomePage() {
  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <nav style={styles.nav}>
          <div style={styles.brand}>MYRIE HQ</div>
          <div style={styles.navLinks}>
            <a style={styles.chip} href="#services">Services</a>
            <a style={styles.chip} href="#work">Work</a>
            <a style={styles.chip} href="#areas">Areas</a>
            <a style={styles.chip} href="#contact">Contact</a>
          </div>
        </nav>

        <header style={styles.hero}>
          <p style={styles.kicker}>DAYTONA + ORLANDO MARKETING SYSTEMS</p>
          <h1 style={styles.h1}>We build premium growth systems for local businesses that want to dominate online.</h1>
          <p style={styles.sub}>
            Myrie HQ helps restaurants, coffee shops, and local brands modernize their website, strengthen Google visibility, and turn traffic into real customers.
          </p>
          <div style={styles.ctaRow}>
            <a style={{ ...styles.btn, ...styles.btnPrimary }} href="#contact">Book a Strategy Call</a>
            <a style={styles.btn} href="#work">See Recent Work</a>
            <a style={styles.btn} href="/mission-control">Mission Control (Private)</a>
          </div>

          <div style={styles.stats}>
            <article style={styles.stat}>
              <div style={styles.statNum}>24/7</div>
              <div style={styles.statTxt}>Execution mindset with fast turnaround.</div>
            </article>
            <article style={styles.stat}>
              <div style={styles.statNum}>Daytona</div>
              <div style={styles.statTxt}>Primary local growth market.</div>
            </article>
            <article style={styles.stat}>
              <div style={styles.statNum}>Orlando</div>
              <div style={styles.statTxt}>Expansion market for service and SEO growth.</div>
            </article>
            <article style={styles.stat}>
              <div style={styles.statNum}>Premium</div>
              <div style={styles.statTxt}>Modern creative direction and polished delivery.</div>
            </article>
          </div>
        </header>

        <section id="services" style={styles.section}>
          <h2 style={styles.h2}>What We Build</h2>
          <p style={styles.p}>End-to-end marketing and web systems designed to make your business look elite and convert better.</p>
          <div style={styles.cards}>
            {serviceCards.map((item) => (
              <article key={item.title} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" style={styles.section}>
          <h2 style={styles.h2}>Featured Work</h2>
          <div style={styles.cards}>
            {projects.map((item) => (
              <article key={item.title} style={styles.card}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={styles.link}>
                    {item.cta || 'Open'}
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section id="areas" style={styles.section}>
          <h2 style={styles.h2}>Local Coverage</h2>
          <p style={styles.p}>
            We are actively building campaigns and web growth systems for businesses in Daytona Beach and Orlando, with an emphasis on hospitality, food, and local services.
          </p>
          <div style={styles.process}>
            <article style={styles.step}><strong>1. Strategy</strong><p style={styles.cardText}>Positioning, goals, and opportunity mapping.</p></article>
            <article style={styles.step}><strong>2. Build</strong><p style={styles.cardText}>Website, SEO, brand assets, and conversion systems.</p></article>
            <article style={styles.step}><strong>3. Launch</strong><p style={styles.cardText}>Deployment, indexing, and visibility acceleration.</p></article>
            <article style={styles.step}><strong>4. Scale</strong><p style={styles.cardText}>Continuous optimization and growth execution.</p></article>
          </div>
        </section>

        <section id="contact" style={styles.contact}>
          <h2 style={styles.h2}>Contact Myrie for Marketing</h2>
          <p style={styles.p}>If you want your business to look premium and convert better online, let’s build your system.</p>
          <div style={styles.ctaRow}>
            <a style={{ ...styles.btn, ...styles.btnPrimary }} href="mailto:myriework@gmail.com">myriework@gmail.com</a>
            <a style={styles.btn} href="tel:+16053892273">+1 (605) 389-2273</a>
          </div>
        </section>
      </div>
    </main>
  );
}
