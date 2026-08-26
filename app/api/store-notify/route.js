import nodemailer from 'nodemailer';

// Store launch-notify capture for The Lost Jamaican store.
// Mirrors /api/contact: honeypot, graceful failure, emails the signup to us.
export async function POST(req) {
  try {
    const b = await req.json().catch(() => ({}));
    if (b.company) return Response.json({ ok: true }, { status: 200 });

    const email = String(b.email || '').slice(0, 200).trim();
    const interest = String(b.interest || 'store').slice(0, 100).trim();
    if (!email || !email.includes('@')) {
      return Response.json({ ok: false, error: 'missing-email' }, { status: 200 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.NEWS_FROM || user;
    const to = process.env.CONTACT_TO || 'myriework@gmail.com';

    if (!host || !user || !pass) {
      return Response.json({ ok: false, error: 'email-unavailable' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Store notify signup — ${interest}`,
      text: `New Lost Jamaican store signup from myriehq.com/store\n\nEmail: ${email}\nInterested in: ${interest}\n`,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'send-failed' }, { status: 200 });
  }
}
