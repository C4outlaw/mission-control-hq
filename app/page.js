const styles = {
  site: { maxWidth: 1080, margin: '0 auto', padding: '28px 20px 80px', color: '#eaf2ff' },
  hero: { padding: '40px 0 20px' },
  eyebrow: { letterSpacing: '.14em', fontWeight: 700, color: '#7ec8ff', marginBottom: 10 },
  h1: { fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.1, margin: '0 0 14px' },
  lede: { fontSize: '1.05rem', maxWidth: 720, color: '#d3e4ff' },
  actions: { display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 },
  btn: { border: '1px solid #35557a', color: '#eaf2ff', textDecoration: 'none', padding: '11px 16px', borderRadius: 10, display: 'inline-block' },
  btnPrimary: { background: 'linear-gradient(90deg, #1b89ff, #4f5bff)', borderColor: 'transparent' },
  section: { marginTop: 38 },
  h2: { fontSize: '1.55rem', margin: '0 0 12px' },
  grid: { display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' },
  card: { background: '#101826', border: '1px solid #22344f', borderRadius: 14, padding: 16 },
  cardP: { color: '#c8d8f2', margin: '0 0 10px' },
  ul: { color: '#d3e4ff', paddingLeft: 18 },
  contact: { background: '#0e1622', border: '1px solid #22344f', borderRadius: 14, padding: 18 },
};

export default function HomePage() {
  return (
    <main style={styles.site}>
      <header style={styles.hero}>
        <p style={styles.eyebrow}>MYRIE HQ</p>
        <h1 style={styles.h1}>Modern systems, marketing, and apps built to perform.</h1>
        <p style={styles.lede}>
          I build practical digital systems — from restaurant websites to automation dashboards — that help businesses move faster.
        </p>
        <div style={styles.actions}>
          <a style={{ ...styles.btn, ...styles.btnPrimary }} href="#apps">View Apps</a>
          <a style={styles.btn} href="/mission-control">Mission Control (Private)</a>
          <a style={styles.btn} href="#contact">Contact Myrie for Marketing</a>
        </div>
      </header>

      <section id="apps" style={styles.section}>
        <h2 style={styles.h2}>Apps</h2>
        <div style={styles.grid}>
          <article style={styles.card}>
            <h3>Magic Menu</h3>
            <p style={styles.cardP}>AI-powered menu, recipe, and operations assistant for food businesses.</p>
          </article>
          <article style={styles.card}>
            <h3>Beach Bucket Website</h3>
            <p style={styles.cardP}>Live restaurant website optimized for mobile, menu browsing, and rapid updates.</p>
            <a href="https://c4outlaw.github.io/mission-control-hq/" target="_blank" rel="noopener noreferrer" style={{ color: '#7ec8ff' }}>Open Project</a>
          </article>
          <article style={styles.card}>
            <h3>Mission Control (Private)</h3>
            <p style={styles.cardP}>Internal command dashboard used for automation and execution workflows.</p>
          </article>
        </div>
      </section>

      <section id="work" style={styles.section}>
        <h2 style={styles.h2}>Recent Work</h2>
        <ul style={styles.ul}>
          <li>Built and deployed production websites with custom domains.</li>
          <li>Automated social and ops workflows for faster execution.</li>
          <li>Implemented performance and reliability improvements for live apps.</li>
        </ul>
      </section>

      <section id="contact" style={{ ...styles.section, ...styles.contact }}>
        <h2 style={styles.h2}>Contact Myrie for Marketing</h2>
        <p style={styles.cardP}>Need help with web, local SEO, automation, or growth systems? Let’s build it.</p>
        <a style={{ ...styles.btn, ...styles.btnPrimary }} href="mailto:myriework@gmail.com">Email: myriework@gmail.com</a>
      </section>
    </main>
  );
}
