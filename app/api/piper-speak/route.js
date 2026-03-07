import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

function runPiper(text, modelPath, configPath, outputPath) {
  return new Promise((resolve, reject) => {
    const tmpIn = outputPath.replace(/\.wav$/i, '.txt');
    fs.writeFile(tmpIn, text, 'utf8')
      .then(() => {
        execFile(
          'py',
          ['-m', 'piper', '-m', modelPath, '-c', configPath, '-i', tmpIn, '-f', outputPath],
          { windowsHide: true, timeout: 120000 },
          async (err) => {
            try { await fs.unlink(tmpIn); } catch {}
            if (err) return reject(err);
            resolve();
          }
        );
      })
      .catch(reject);
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const text = (body?.text || '').trim();
    if (!text) return Response.json({ ok: false, error: 'Missing text' }, { status: 200 });

    const base = process.cwd();
    const modelPath = path.join(base, 'models', 'piper', 'en_US-lessac-medium.onnx');
    const configPath = path.join(base, 'models', 'piper', 'en_US-lessac-medium.onnx.json');

    const outDir = path.join(base, 'public', 'audio');
    await fs.mkdir(outDir, { recursive: true });
    const outFile = `piper-${Date.now()}.wav`;
    const outPath = path.join(outDir, outFile);

    await runPiper(text, modelPath, configPath, outPath);

    return Response.json({ ok: true, url: `/audio/${outFile}` }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'Piper speak failed' }, { status: 200 });
  }
}
