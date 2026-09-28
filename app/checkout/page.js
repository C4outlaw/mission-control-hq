import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import { CATALOGUE } from '../../lib/store-unified';

// Meta's checkout URL endpoint.
//
// When someone taps Checkout in a Facebook or Instagram shop, Meta sends them
// here with the cart in the query string, in the format its own sample code
// parses: ?products=<id>:<qty>,<id>:<qty>&coupon=<code>
//
// The ids are catalogue ids, which identify a design rather than a size, so we
// cannot drop straight into Stripe - the shopper still has to choose a size.
// This page shows them exactly what they picked, so Meta's test sees the right
// products, then hands them to the store with that piece already open.
export const metadata = {
  title: 'Your selection',
  description: 'Confirm your selection and check out on myriehq.com.',
  robots: { index: false, follow: false },
};

function parseProducts(raw) {
  if (!raw) return [];
  return String(raw)
    .split(',')
    .map((entry) => {
      const [id, qty] = entry.split(':');
      const item = CATALOGUE.find((p) => p.id === (id || '').trim());
      if (!item) return null;
      const n = Number.parseInt(qty, 10);
      return { item, qty: Number.isFinite(n) && n > 0 ? n : 1 };
    })
    .filter(Boolean);
}

const money = (c) => `$${(c / 100).toFixed(2)}`;

export default async function MetaCheckoutPage({ searchParams }) {
  const { products = '', coupon = '' } = await searchParams;
  const lines = parseProducts(products);
  const total = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0);
  const first = lines[0]?.item;

  return (
    <main className="myrie-marketing">
      <SiteNav />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '120px 20px 96px' }}>
        <p style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#a8791f', fontWeight: 700, margin: '0 0 12px' }}>
          The Lost Jamaican
        </p>
        <h1 style={{ fontSize: 'clamp(1.9rem, 5vw, 2.6rem)', lineHeight: 1.15, margin: '0 0 28px' }}>
          {lines.length ? 'Your selection' : 'Pick up where you left off'}
        </h1>

        {lines.length === 0 ? (
          <>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#b9c6dc' }}>
              We could not read that selection. Everything is still in the store.
            </p>
            <a href="/store" style={btn}>Go to the store</a>
          </>
        ) : (
          <>
            {lines.map(({ item, qty }) => (
              <div key={item.id} style={row}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} width={72} height={90}
                     style={{ objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#e8f1ff' }}>{item.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 14, color: '#8492a9' }}>
                    {item.kindName}{qty > 1 ? ` — ${qty}` : ''}
                  </p>
                </div>
                <p style={{ margin: 0, fontWeight: 600, color: '#e8f1ff' }}>{money(item.price * qty)}</p>
              </div>
            ))}

            <div style={{ ...row, borderBottom: 'none', paddingTop: 18 }}>
              <p style={{ margin: 0, flex: 1, color: '#b9c6dc' }}>Subtotal</p>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 18, color: '#e8f1ff' }}>{money(total)}</p>
            </div>

            {coupon ? (
              <p style={{ fontSize: 14, color: '#b9c6dc', margin: '4px 0 0' }}>
                Code <strong style={{ color: '#e8f1ff' }}>{String(coupon).slice(0, 40)}</strong> will be applied at checkout.
              </p>
            ) : null}

            <a href={first ? `/store?p=${encodeURIComponent(first.id)}` : '/store'} style={btn}>
              Choose your size and check out
            </a>
            <p style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.6, color: '#8492a9' }}>
              Every piece is printed to order, so we need your size before we can take payment.
              Payment is taken securely on this site.
            </p>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

const row = {
  display: 'flex',
  gap: 14,
  alignItems: 'center',
  padding: '14px 0',
  borderBottom: '1px solid #223047',
};

const btn = {
  display: 'block',
  textAlign: 'center',
  padding: '15px 18px',
  fontSize: 17,
  fontWeight: 700,
  color: '#fff',
  background: '#a8791f',
  borderRadius: 7,
  textDecoration: 'none',
  marginTop: 28,
};
