import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.join(process.cwd(), 'data', 'phone-tracker');
const DATA_FILE = path.join(DATA_DIR, 'devices.json');

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ devices: {} }, null, 2), 'utf8');
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw || '{"devices":{}}');
}

async function writeStore(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function isAuthorized(req) {
  const serverToken = process.env.PHONE_TRACKER_TOKEN;
  if (!serverToken) return false;
  const inbound = req.headers.get('x-device-token') || '';
  return inbound && inbound === serverToken;
}

export async function POST(req) {
  try {
    if (!isAuthorized(req)) {
      return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { deviceId, name, lat, lon, accuracy, battery, charging, timestamp } = body || {};

    if (!deviceId || typeof lat !== 'number' || typeof lon !== 'number') {
      return Response.json({ ok: false, error: 'deviceId, lat, lon required' }, { status: 400 });
    }

    const store = await readStore();
    store.devices[deviceId] = {
      deviceId,
      name: name || store.devices?.[deviceId]?.name || 'iPhone',
      lat,
      lon,
      accuracy: typeof accuracy === 'number' ? accuracy : null,
      battery: typeof battery === 'number' ? battery : null,
      charging: typeof charging === 'boolean' ? charging : null,
      timestamp: timestamp || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await writeStore(store);
    return Response.json({ ok: true, device: store.devices[deviceId] });
  } catch (err) {
    return Response.json({ ok: false, error: err?.message || 'update failed' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    if (!isAuthorized(req)) {
      return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const deviceId = url.searchParams.get('deviceId');
    const store = await readStore();

    if (deviceId) {
      return Response.json({ ok: true, device: store.devices?.[deviceId] || null });
    }

    return Response.json({ ok: true, devices: Object.values(store.devices || {}) });
  } catch (err) {
    return Response.json({ ok: false, error: err?.message || 'read failed' }, { status: 500 });
  }
}
