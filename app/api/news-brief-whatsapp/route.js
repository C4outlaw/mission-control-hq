import { execFile } from 'node:child_process';

function pickTitles(xml, limit = 3) {
  const titles = [];
  const re = /<title>(.*?)<\/title>/gims;
  let m;
  while ((m = re.exec(xml)) && titles.length < limit + 2) {
    const t = (m[1] || '')
      .replace(/<!\[CDATA\[|\]\]>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .trim();
    if (t && !/rss|news|top stories|latest/i.test(t)) titles.push(t);
  }
  return titles.slice(0, limit);
}

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('fetch failed');
  return await res.text();
}

async function buildBrief() {
  const [nprXml, abcXml, foxXml, localXml] = await Promise.all([
    fetchText('https://feeds.npr.org/1001/rss.xml'),
    fetchText('https://feeds.abcnews.com/abcnews/topstories'),
    fetchText('https://moxie.foxnews.com/google-publisher/latest.xml'),
    fetchText('https://www.wesh.com/topstories-rss'),
  ]);

  const npr = pickTitles(nprXml, 3);
  const abc = pickTitles(abcXml, 3);
  const fox = pickTitles(foxXml, 3);
  const local = pickTitles(localXml, 3);

  return [
    'Daily Brief (NPR/ABC/FOX/Local)',
    '',
    'NPR',
    ...npr.map((t) => `- ${t}`),
    '',
    'ABC',
    ...abc.map((t) => `- ${t}`),
    '',
    'FOX',
    ...fox.map((t) => `- ${t}`),
    '',
    'LOCAL (WESH)',
    ...local.map((t) => `- ${t}`),
  ].join('\n');
}

function sendWhatsApp(message) {
  const to = process.env.NEWS_WHATSAPP_TO || '+16053892273';
  return new Promise((resolve, reject) => {
    execFile('openclaw', ['message', 'send', '--channel', 'whatsapp', '--to', to, '--message', message], { windowsHide: true, timeout: 15000 }, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve({ stdout, stderr });
    });
  });
}

export async function POST() {
  try {
    const brief = await buildBrief();
    await sendWhatsApp(brief);
    return Response.json({ ok: true, text: brief }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'whatsapp send failed' }, { status: 200 });
  }
}
