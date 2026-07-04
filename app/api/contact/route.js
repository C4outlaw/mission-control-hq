import nodemailer from 'nodemailer';

// Lead-capture endpoint for the homepage contact form.
// Mirrors the existing nodemailer routes; fails gracefully (never throws) so the
// form can fall back to showing email/phone if SMTP isn't configured.
export async function POST(req) {
  try {
    const b = await req.json().catch(() => ({}));

    // Honeypot — bots fill hidden "company"; treat as success and drop.
    if (b.company) return Response.json({ ok: true }, { status: 200 });

    const name = String(b.name || '').slice(0, 200).trim();
    const restaurant = String(b.restaurant || '').slice(0, 200).trim();
    const phone = String(b.phone || '').slice(0, 60).trim();
    const email = String(b.email || '').slice(0, 200).trim();
    const message = String(b.message || '').slice(0, 4000).trim();

    if (!name || (!phone && !email)) {
      return Response.json({ ok: false, error: 'missing-fields' }, { status: 200 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.NEWS_FROM || user;
    const to = process.env.CONTACT_TO || 'myriework@gmail.com';

    if (!host || !user || !pass) {
      // No SMTP configured — relay through FormSubmit so inquiries still reach
      // the inbox. (One-time: FormSubmit emails an activation link to `to` on
      // the first submission; after that clicks-through automatically.)
      try {
        const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // FormSubmit requires a web origin; identify as the live site.
            Origin: 'https://www.myriehq.com',
            Referer: 'https://www.myriehq.com/',
          },
          body: JSON.stringify({
            _subject: `New website lead — ${name}${restaurant ? ' · ' + restaurant : ''}`,
            _template: 'table',
            _captcha: 'false',
            Name: name,
            Restaurant: restaurant || '—',
            Phone: phone || '—',
            Email: email || '—',
            Message: message || '—',
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && (data.success === 'true' || data.success === true)) {
          return Response.json({ ok: true }, { status: 200 });
        }
        console.error('[contact] FormSubmit relay declined:', res.status, data.message || data);
      } catch (err) {
        console.error('[contact] FormSubmit relay failed:', err?.message);
      }
      return Response.json({ ok: false, error: 'email-unavailable' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: `New website lead — ${name}${restaurant ? ' · ' + restaurant : ''}`,
      text:
        `New lead from myriehq.com\n\n` +
        `Name: ${name}\n` +
        `Restaurant: ${restaurant || '—'}\n` +
        `Phone: ${phone || '—'}\n` +
        `Email: ${email || '—'}\n\n` +
        `Message:\n${message || '—'}\n`,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: 'send-failed' }, { status: 200 });
  }
}
