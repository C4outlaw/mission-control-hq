import nodemailer from 'nodemailer';

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
  if (!res.ok) throw new Error(`fetch failed ${url}`);
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

  const text = [
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

  return text;
}

export async function POST() {
  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.NEWS_FROM || user;
    const to = process.env.NEWS_TO || 'emailmyrie@gmail.com';

    if (!host || !user || !pass) {
      return Response.json(
        {
          ok: false,
          error: 'Missing SMTP env vars: SMTP_HOST, SMTP_USER, SMTP_PASS',
        },
        { status: 200 }
      );
    }

    const brief = await buildBrief();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: `Daily News Brief - ${new Date().toLocaleString()}`,
      text: brief,
    });

    return Response.json({ ok: true, text: brief }, { status: 200 });
  } catch (e) {
    return Response.json({ ok: false, error: 'send failed' }, { status: 200 });
  }
}
