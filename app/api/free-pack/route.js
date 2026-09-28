import nodemailer from 'nodemailer';

// Free-pack email capture for myriehq.com/subscriber.
// Two jobs: email the pack to the person (which is what verifies the address),
// and record the address where it can be found again.
//
// There is no database on this site, so the list lives in the owner's inbox.
// Every capture mail carries a fixed `LIST|<email>|<source>|<iso date>` line and
// a fixed subject prefix, so the whole list can be pulled back out of Gmail with
// a search for "[LIST]" and parsed from those lines. That is the export path
// until the list is big enough to justify a real provider.
const PACK_URL = 'https://www.myriehq.com/free-pack/THE-PROMPT-GUIDE.zip';
const SUBJECT_TAG = '[LIST]';

export async function POST(req) {
  try {
    const b = await req.json().catch(() => ({}));
    if (b.company) return Response.json({ ok: true }, { status: 200 }); // honeypot

    const email = String(b.email || '').slice(0, 200).trim().toLowerCase();
    const source = String(b.source || 'subscriber').slice(0, 60).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: 'missing-email' }, { status: 200 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.NEWS_FROM || user;
    const owner = process.env.CONTACT_TO || 'myriework@gmail.com';

    // The download must never depend on mail working, so a mail failure is not
    // an error the visitor sees - the page hands them the file either way.
    if (!host || !user || !pass) {
      return Response.json({ ok: true, mailed: false }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host, port, secure: port === 465, auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: email,
      subject: 'The Prompt Guide — your download',
      text:
        'Here is The Prompt Guide.\n\n' +
        PACK_URL + '\n\n' +
        'Inside: ten copy-and-paste prompts for research, scripting, casting and shots, ' +
        'the photoreal portrait prompt, and the full breakdown of how The Lost Jamaican ' +
        'documentaries get made.\n\n' +
        'You will hear from us when there is a new pack or a new film worth your time. ' +
        'Reply to this email any time - it comes straight to us.\n\n' +
        'The Lost Jamaican\nmyriehq.com',
    });

    await transporter.sendMail({
      from,
      to: owner,
      replyTo: email,
      subject: `${SUBJECT_TAG} ${email}`,
      text: `LIST|${email}|${source}|${new Date().toISOString()}\n`,
    });

    return Response.json({ ok: true, mailed: true }, { status: 200 });
  } catch {
    return Response.json({ ok: true, mailed: false }, { status: 200 });
  }
}
