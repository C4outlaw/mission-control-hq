import { execFile } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const AUDIO_EXT_BY_TYPE = {
  'audio/webm': '.webm',
  'audio/ogg': '.ogg',
  'audio/wav': '.wav',
  'audio/mpeg': '.mp3',
  'audio/mp4': '.m4a',
};

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
    let inputPath = '';
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const audio = form.get('audio');

      if (audio && typeof audio.arrayBuffer === 'function') {
        const recordingsDir = path.join(process.cwd(), 'data', 'recordings');
        await fs.mkdir(recordingsDir, { recursive: true });

        const ext = AUDIO_EXT_BY_TYPE[audio.type] || path.extname(audio.name || '') || '.webm';
        const safeName = `mission-mic-${Date.now()}${ext}`;
        inputPath = path.join(recordingsDir, safeName);
        await fs.writeFile(inputPath, Buffer.from(await audio.arrayBuffer()));
      }
    } else {
      const body = await req.json();
      inputPath = (body?.path || '').trim();
    }

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
  } catch (error) {
    return Response.json({ ok: false, error: error?.message || 'Transcription failed' }, { status: 200 });
  }
}
