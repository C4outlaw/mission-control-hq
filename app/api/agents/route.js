import { promises as fs } from 'node:fs';
import path from 'node:path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'agents.local.json');
    const raw = await fs.readFile(filePath, 'utf8');
    const agents = JSON.parse(raw);

    if (!Array.isArray(agents)) {
      return Response.json({ ok: false, agents: [], error: 'invalid agents file' }, { status: 200 });
    }

    return Response.json({ ok: true, agents }, { status: 200 });
  } catch {
    return Response.json({ ok: false, agents: [], error: 'agents file unavailable' }, { status: 200 });
  }
}
