import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const link = body?.link || 'http://100.79.184.65:3002';

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.NEWS_FROM || user;
    const to = process.env.NEWS_TO || 'emailmyrie@gmail.com';

    if (!host || !user || !pass) {
      return Response.json({ ok: false, error: 'Missing SMTP env vars' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: 'Mission Control Link',
      text: `Here is your Mission Control link:\n\n${link}`,
    });

    return Response.json({ ok: true, to, link }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'send failed' }, { status: 200 });
  }
}
