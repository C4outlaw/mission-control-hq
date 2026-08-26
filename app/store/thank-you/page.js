export const metadata = { title: 'Order confirmed — The Lost Jamaican' };

export default function StoreThankYou() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '110px 20px', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', color: '#14161a' }}>
      <h1 style={{ fontSize: 34, margin: '0 0 14px' }}>Order confirmed — respect.</h1>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a4150' }}>
        Your piece is going straight into production. You will get a confirmation email now and a
        tracking link as soon as it ships, usually within 3–5 business days.
      </p>
      <p style={{ marginTop: 34 }}>
        <a href="/store" style={{ color: '#1b52d6', fontWeight: 600 }}>Back to the store</a>
      </p>
    </main>
  );
}
