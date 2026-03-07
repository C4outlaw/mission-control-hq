import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_FILE = path.join(process.cwd(), 'data', 'phone-tracker', 'devices.json');

export async function GET() {
  try {
    let devices = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw || '{"devices":{}}');
      devices = Object.values(parsed.devices || {});
    } catch {
      devices = [];
    }

    return Response.json({ ok: true, devices }, { status: 200 });
  } catch (err) {
    return Response.json({ ok: false, error: err?.message || 'failed' }, { status: 500 });
  }
}
