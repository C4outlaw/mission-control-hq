export const metadata = {
  title: 'The Prompt Guide — free AI video prompt pack | The Lost Jamaican',
  description:
    'Free download: 10 copy-and-paste prompts for research, scripting, casting and shots, the photoreal portrait prompt for people who look photographed rather than generated, and the full production system behind The Lost Jamaican documentaries.',
  alternates: { canonical: 'https://www.myriehq.com/subscriber' },
  openGraph: {
    title: 'The Prompt Guide — free AI video prompt pack',
    description:
      'Ten prompts, the photoreal portrait prompt, and the full breakdown of how these documentaries get made. Free.',
    url: 'https://www.myriehq.com/subscriber',
    type: 'website',
    images: [
      {
        url: 'https://www.myriehq.com/free-pack/EXAMPLE-portrait-prompt-output.png',
        width: 1024,
        height: 1280,
        alt: 'A portrait generated with the photoreal portrait prompt',
      },
    ],
  },
};

// Hosted as plain files in the repo rather than behind a signed-grant API, so
// the link just works and there is nothing to configure.
const ZIP =
  'https://github.com/C4outlaw/mission-control-hq/raw/main/public/free-pack/THE-PROMPT-GUIDE.zip';
const BASE = '/free-pack';

const wrap = {
  maxWidth: 660,
  margin: '0 auto',
  padding: '80px 20px',
  fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif',
  color: '#14161a',
};
const button = {
  display: 'block',
  textAlign: 'center',
  padding: '15px 18px',
  fontSize: 17,
  fontWeight: 700,
  color: '#fff',
  background: '#a8791f',
  borderRadius: 7,
  textDecoration: 'none',
  marginTop: 26,
};

export default function SubscriberPack() {
  return (
    <main style={wrap}>
      <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#a8791f', fontWeight: 700, margin: '0 0 12px' }}>
        The Lost Jamaican
      </p>
      <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: '0 0 14px' }}>The Prompt Guide</h1>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a4150' }}>
        Everything below is yours free. One download, four files.
      </p>

      <ul style={{ fontSize: 16, lineHeight: 1.7, color: '#3a4150', paddingLeft: 20 }}>
        <li>
          <b>The Starter Prompt Pack</b> &mdash; ten prompts you can paste into your own model
          tonight, covering research, scripting, casting, shots and quality control.
        </li>
        <li>
          <b>The Photoreal Portrait Prompt</b> &mdash; the master prompt for people who look
          photographed rather than generated, with the reasoning behind every clause.
        </li>
        <li>
          <b>How We Build These Videos</b> &mdash; the full production system behind the episodes.
        </li>
        <li>
          <b>An example image</b> produced by the portrait prompt, so you can see what it does.
        </li>
      </ul>

      <a href={ZIP} style={button}>
        Download The Prompt Guide
      </a>

      <p style={{ marginTop: 26, fontSize: 14, lineHeight: 1.7, color: '#6b7280' }}>
        Prefer the files separately?{' '}
        <a href={`${BASE}/LOST-JAMAICAN-STARTER-PROMPT-PACK.pdf`} style={{ color: '#1b52d6' }}>Starter Prompt Pack</a>{' '}
        &middot;{' '}
        <a href={`${BASE}/THE-PHOTOREAL-PORTRAIT-PROMPT.pdf`} style={{ color: '#1b52d6' }}>Photoreal Portrait Prompt</a>{' '}
        &middot;{' '}
        <a href={`${BASE}/HOW-WE-BUILD-THESE-VIDEOS.pdf`} style={{ color: '#1b52d6' }}>How We Build These Videos</a>
      </p>

      <p style={{ marginTop: 30, fontSize: 14, lineHeight: 1.65, color: '#6b7280' }}>
        Want the full artist packs &mdash; the complete prompt set, model settings and quality gates
        behind a whole episode?{' '}
        <a href="/prompts" style={{ color: '#1b52d6', fontWeight: 600 }}>See the prompt packs</a>.
      </p>
      <p style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: '#8b93a1' }}>
        Licensed for your own channels.
      </p>
    </main>
  );
}
