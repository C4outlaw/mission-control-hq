import { verifyGrant } from '../../../lib/prompt-packs';
import { stickerPackById, bookPartUrls } from '../../../lib/print-pack';
import BookDownloader from './BookDownloader';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Download your book', robots: { index: false, follow: false } };

const wrap = { minHeight: '100vh', background: '#141414', color: '#f3eee4', padding: '64px 20px', fontFamily: 'system-ui, sans-serif' };
const card = { maxWidth: 640, margin: '0 auto' };

// The emailed book link lands here. The signed grant names the book; only after it verifies are
// short-lived grants for the encrypted slices minted and handed to the in-browser assembler.
export default async function BookDownload({ searchParams }) {
  const { t } = await searchParams;
  const grant = verifyGrant(t);
  const book = grant && grant.book ? stickerPackById(grant.book) : null;

  if (!book || !book.book) {
    return (
      <main style={wrap}>
        <div style={card}>
          <h1 style={{ fontSize: 30, margin: '0 0 12px' }}>This download link is invalid or has expired</h1>
          <p>Reply to your Stripe receipt email with your order reference and we will send a fresh link.</p>
          <p><a href="/store" style={{ color: '#f0b900' }}>Back to the store</a></p>
        </div>
      </main>
    );
  }

  return (
    <main style={wrap}>
      <div style={card}>
        <p style={{ color: '#f0b900', letterSpacing: 3, fontSize: 13, margin: 0 }}>THE LOST JAMAICAN</p>
        <h1 style={{ fontSize: 32, margin: '8px 0 12px' }}>{book.name.replace('The Lost Jamaican — ', '')}</h1>
        <BookDownloader
          urls={bookPartUrls(grant.sid, book)}
          fileName={book.pdf.file}
          bytes={book.pdf.bytes}
          sha256={book.pdf.sha256}
        />
        <p style={{ opacity: 0.75, fontSize: 14, marginTop: 24 }}>
          Keep this page open until the download finishes. The book saves as one {book.pdf.pages}-page PDF. Cultural and food content only, not medical advice. Personal use only.
        </p>
      </div>
    </main>
  );
}
