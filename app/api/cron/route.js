import { exec } from 'node:child_process';

function mapStatus(enabled) {
  return enabled ? 'enabled' : 'disabled';
}

function run(cmd, timeout = 3500) {
  return new Promise((resolve) => {
    exec(cmd, { windowsHide: true, timeout }, (err, stdout) => {
      resolve({ err, stdout: stdout || '' });
    });
  });
}

function parseJobs(stdout) {
  const parsed = JSON.parse(stdout || '{}');
  const arr = Array.isArray(parsed.jobs) ? parsed.jobs : (Array.isArray(parsed) ? parsed : []);
  return arr.map((j) => ({
    name: j.name || j.id || j.jobId || 'Unnamed job',
    schedule: j.schedule?.kind === 'cron'
      ? `cron: ${j.schedule.expr}${j.schedule.tz ? ` (${j.schedule.tz})` : ''}`
      : j.schedule?.kind === 'every'
        ? `every ${Math.round((j.schedule.everyMs || 0) / 60000)} min`
        : j.schedule?.kind === 'at'
          ? `at ${j.schedule.at || ''}`
          : 'schedule unknown',
    status: mapStatus(j.enabled !== false),
    purpose: j.payload?.kind || 'task',
  }));
}

export async function GET() {
  try {
    // Newer CLI builds may reject --include-disabled, so try plain list first.
    let result = await run('openclaw cron list --json', 3500);
    if (result.err || !result.stdout.trim()) {
      result = await run('openclaw cron list', 3500);
    }

    if (result.err || !result.stdout.trim()) {
      return Response.json({ ok: false, jobs: [], error: 'cron command unavailable' }, { status: 200 });
    }

    const jobs = parseJobs(result.stdout);
    return Response.json({ ok: true, jobs }, { status: 200 });
  } catch {
    return Response.json({ ok: false, jobs: [], error: 'cron parse failed' }, { status: 200 });
  }
}
