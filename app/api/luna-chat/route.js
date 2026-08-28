import nodemailer from 'nodemailer';
import { answerLunaQuestion } from '../../../lib/luna-knowledge.mjs';

const clean = (value, max = 200) => String(value || '').trim().slice(0, max);

async function notifyMyrie({ name, contact, preference, message }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({
    from: process.env.NEWS_FROM || user,
    to: process.env.CONTACT_TO || 'myriework@gmail.com',
    subject: `Luna needs Myrie — ${preference} ${name}`,
    text: `Luna could not answer this website question.\n\nName: ${name}\nContact: ${contact}\nPreferred follow-up: ${preference}\n\nQuestion:\n${message}`,
    html: `<h2>Luna needs Myrie</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Contact:</strong> ${escapeHtml(contact)}</p><p><strong>Follow-up:</strong> ${escapeHtml(preference)}</p><p><strong>Question:</strong><br>${escapeHtml(message)}</p>`,
  });
  return true;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.company) return Response.json({ status: 'answered', reply: 'Thank you.', needsContact: false });
    const message = clean(body.message, 2000);
    const result = answerLunaQuestion(message);
    if (!body.escalate) return Response.json(result);

    const name = clean(body.name);
    const contact = clean(body.contact);
    const preference = clean(body.preference, 10).toLowerCase();
    if (!name || !contact || !['text', 'call'].includes(preference)) {
      return Response.json({ status: 'error', reply: 'Add your name, contact, and choose text or call.', needsContact: true });
    }
    const sent = await notifyMyrie({ name, contact, preference, message });
    if (!sent) {
      return Response.json({ status: 'error', reply: 'Please call Myrie directly at 386-795-8727.', needsContact: true });
    }
    return Response.json({
      status: 'escalated',
      reply: `Thank you, ${name}. I sent your question to Myrie for a ${preference} follow-up.`,
      needsContact: false,
    });
  } catch {
    return Response.json({ status: 'error', reply: 'Please call Myrie directly at 386-795-8727.', needsContact: false });
  }
}
