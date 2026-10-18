import Stripe from 'stripe';
import { stickerPackById, packLinks } from '../../../lib/print-pack';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Your download', robots: { index: false, follow: false } };

const wrap = { minHeight: '100vh', background: '#141414', color: '#f3eee4', padding: '64px 20px', fontFamily: 'system-ui, sans-serif' };
const card = { maxWidth: 640, margin: '0 auto' };
const btn = { display: 'block', padding: '16px 18px', margin: '10px 0', background: '#009b3a', color: '#fff', borderRadius: 10, textDecoration: 'none', fontWeight: 700 };

// The session id in the URL is unguessable, but it is still verified with Stripe: no paid session, no links.
async function paidSession(sid) {
  if (!sid || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(sid) || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const s = await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(sid);
    return s.payment_status === 'paid' && stickerPackById(s.metadata?.pack) ? s : null;
  } catch {
    return null;
  }
}

export default async function PackThankYou({ searchParams }) {
  const { sid } = await searchParams;
  const session = await paidSession(sid);

  if (!session) {
    return (
      <main style={wrap}>
        <div style={card}>
          <h1 style={{ fontSize: 30, margin: '0 0 12px' }}>We couldn&apos;t confirm that payment</h1>
          <p>If you just paid, give it a moment and refresh. Still stuck? Reply to your Stripe receipt email and we will send your files.</p>
          <p><a href="/store" style={{ color: '#f0b900' }}>Back to the store</a></p>
        </div>
      </main>
    );
  }

  const pack = stickerPackById(session.metadata.pack);
  const links = packLinks(session.id, pack);
  return (
    <main style={wrap}>
      <div style={card}>
        <p style={{ color: '#f0b900', letterSpacing: 3, fontSize: 13, margin: 0 }}>THE LOST JAMAICAN</p>
        <h1 style={{ fontSize: 36, margin: '8px 0 12px' }}>Thank you! Walk good.</h1>
        <p>
          Your {pack.name.replace('The Lost Jamaican — ', '')} is ready.{' '}
          {pack.book
            ? 'Tap the book link, then Download. It saves as one PDF that opens on any phone or computer.'
            : `It is split into ${links.length} zip files so each one downloads fast. Download all of them.`}
        </p>
        {links.map((l) => (
          <a key={l.url} href={l.url} style={btn}>
            {pack.book ? '' : 'Download: '}{l.label} <span style={{ fontWeight: 400, opacity: 0.85 }}>({l.items ? `${l.items} files, ` : ''}{l.mb} MB)</span>
          </a>
        ))}
        <p style={{ opacity: 0.75, fontSize: 14 }}>
          {pack.book
            ? 'We also emailed these links to you. They work for 14 days. Cultural and food content only, not medical advice. Personal use only.'
            : 'We also emailed these links to you. They work for 14 days. Stickers are transparent PNGs, and the sheets print on US Letter sticker paper (any wall prints in your pack print at 8x10 or 16x20). Personal use only.'}
        </p>
      </div>
    </main>
  );
}
