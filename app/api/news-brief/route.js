function pickTitles(xml, limit = 4) {
  const titles = [];
  const re = /<title>(.*?)<\/title>/gims;
  let m;
  while ((m = re.exec(xml)) && titles.length < limit + 1) {
    const t = (m[1] || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').trim();
    if (t && !/rss|news|top stories|latest/i.test(t)) titles.push(t);
  }
  return titles.slice(0, limit);
}

async function fetchText(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`fetch failed ${url}`);
  return await res.text();
}

export async function GET() {
  try {
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

    return Response.json({ ok: true, text, sections: { npr, abc, fox, local } });
  } catch (e) {
    return Response.json({ ok: false, error: 'news brief unavailable' }, { status: 200 });
  }
}
