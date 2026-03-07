import { promises as fs } from 'node:fs';
import path from 'node:path';

const dataDir = path.join(process.cwd(), 'data');

async function ensureJson(fileName, fallback) {
  const filePath = path.join(dataDir, fileName);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

function stamp() {
  return new Date().toLocaleString();
}

async function fetchJsonIfSet(envKey) {
  const url = process.env[envKey];
  if (!url) return null;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function runEmailTriage() {
  const fallback = {
    inbox: [
      { from: 'onlinebanking@ealerts.bankofamerica.com', subject: 'A withdrawal was made over the limit you set', priority: 'urgent' },
      { from: 'ops@vendor.example', subject: 'Invoice due in 2 days', priority: 'today' },
      { from: 'promo@newsletter.example', subject: 'Weekly deals', priority: 'low' },
    ],
  };

  const live = await fetchJsonIfSet('MISSION_EMAIL_SOURCE_URL');
  const local = await ensureJson('email.inbox.json', fallback);
  const data = live || local;

  const inbox = Array.isArray(data?.inbox) ? data.inbox : [];
  const urgent = inbox.filter((m) => m.priority === 'urgent');
  const today = inbox.filter((m) => m.priority === 'today');
  const low = inbox.filter((m) => m.priority === 'low');

  return [
    `[${stamp()}] Email Triage Agent`,
    `Urgent: ${urgent.length} | Today: ${today.length} | Low: ${low.length}`,
    ...urgent.slice(0, 5).map((m) => `- URGENT: ${m.subject} (${m.from})`),
    ...today.slice(0, 5).map((m) => `- TODAY: ${m.subject} (${m.from})`),
    `Source: ${live ? 'Live URL (MISSION_EMAIL_SOURCE_URL)' : 'Local file data/email.inbox.json'}`,
  ].join('\n');
}

async function runCalendarConcierge() {
  const fallback = {
    events: [
      { time: '09:00 AM', title: 'Team check-in', prep: 'Review priority list' },
      { time: '12:30 PM', title: 'Content review', prep: 'Open social queue + analytics' },
      { time: '04:00 PM', title: 'Website sprint', prep: 'Open beachbucket-new-build tasks' },
    ],
  };

  const live = await fetchJsonIfSet('MISSION_CALENDAR_SOURCE_URL');
  const local = await ensureJson('calendar.today.json', fallback);
  const data = live || local;

  const events = Array.isArray(data?.events) ? data.events : [];
  return [
    `[${stamp()}] Calendar Concierge Agent`,
    `Events today: ${events.length}`,
    ...events.slice(0, 8).map((e) => `- ${e.time} • ${e.title} | Prep: ${e.prep || '—'}`),
    `Source: ${live ? 'Live URL (MISSION_CALENDAR_SOURCE_URL)' : 'Local file data/calendar.today.json'}`,
  ].join('\n');
}

async function runSocialOps() {
  const local = await ensureJson('social.queue.json', {
    queue: [
      { platform: 'TikTok', hook: 'POV: You run 3 brands from one dashboard', status: 'draft' },
      { platform: 'Instagram', hook: 'Behind-the-scenes at Beach Bucket', status: 'idea' },
      { platform: 'Facebook', hook: "Today's specials + hours update", status: 'ready' },
    ],
  });
  const queue = Array.isArray(local?.queue) ? local.queue : [];
  return [
    `[${stamp()}] Social Ops Agent`,
    `Queue items: ${queue.length}`,
    ...queue.slice(0, 8).map((q) => `- ${q.platform}: ${q.hook} [${q.status}]`),
    'Source: data/social.queue.json',
  ].join('\n');
}

async function runRevenue() {
  const local = await ensureJson('revenue.kpi.json', { kpi: { leads: 0, closes: 0, revenue: 0, followUps: 3 } });
  const k = local?.kpi || {};
  return [
    `[${stamp()}] Revenue Agent`,
    `Leads: ${k.leads ?? 0} | Closes: ${k.closes ?? 0} | Revenue: $${k.revenue ?? 0}`,
    `Follow-ups due: ${k.followUps ?? 0}`,
    'Source: data/revenue.kpi.json',
  ].join('\n');
}

async function runWebBuild() {
  const local = await ensureJson('webbuild.tasks.json', {
    tasks: [
      'Finalize Beach Bucket full menu migration in new build',
      'Mobile QA + accessibility pass',
      'SEO metadata validation + final preview link',
    ],
  });
  const tasks = Array.isArray(local?.tasks) ? local.tasks : [];
  return [
    `[${stamp()}] Web Build Agent`,
    ...tasks.slice(0, 10).map((t, i) => `${i + 1}. ${t}`),
    'Source: data/webbuild.tasks.json',
  ].join('\n');
}

export async function POST(req) {
  try {
    const { id } = await req.json();
    let text = `[${stamp()}] Agent activated.`;

    if (id === 'email-triage-agent') text = await runEmailTriage();
    else if (id === 'calendar-concierge-agent') text = await runCalendarConcierge();
    else if (id === 'social-ops-agent') text = await runSocialOps();
    else if (id === 'revenue-agent') text = await runRevenue();
    else if (id === 'web-build-agent') text = await runWebBuild();

    return Response.json({ ok: true, text }, { status: 200 });
  } catch {
    return Response.json({ ok: false, text: 'Agent action failed.' }, { status: 200 });
  }
}
