import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

function runWhisper(inputPath, outputDir) {
  return new Promise((resolve, reject) => {
    execFile(
      'py',
      [
        '-m',
        'whisper',
        inputPath,
        '--model',
        'tiny.en',
        '--language',
        'en',
        '--fp16',
        'False',
        '--output_dir',
        outputDir,
      ],
      {
        windowsHide: true,
        timeout: 180000,
        env: { ...process.env, PYTHONUTF8: '1' },
      },
      (err) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const inputPath = (body?.path || '').trim();

    if (!inputPath) {
      return Response.json({ ok: false, error: 'Missing audio path' }, { status: 200 });
    }

    const outputDir = path.join(process.cwd(), 'data', 'transcripts');
    await fs.mkdir(outputDir, { recursive: true });

    await runWhisper(inputPath, outputDir);

    const base = path.basename(inputPath, path.extname(inputPath));
    const transcriptPath = path.join(outputDir, `${base}.txt`);
    const text = await fs.readFile(transcriptPath, 'utf8');

    return Response.json({ ok: true, transcriptPath, text }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'Transcription failed' }, { status: 200 });
  }
}
