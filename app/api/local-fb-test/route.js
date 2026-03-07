import { exec } from 'node:child_process';

export async function POST() {
  return new Promise((resolve) => {
    const cmd = 'powershell -ExecutionPolicy Bypass -File "C:\\Users\\email\\.openclaw\\workspace\\mission-control\\automation\\run-facebook-post-test.ps1"';
    exec(cmd, { windowsHide: true, timeout: 120000 }, (err, stdout, stderr) => {
      if (err) {
        resolve(Response.json({ ok: false, error: stderr || err.message || 'run failed' }, { status: 200 }));
        return;
      }
      resolve(Response.json({ ok: true, output: (stdout || '').trim() }, { status: 200 }));
    });
  });
}
