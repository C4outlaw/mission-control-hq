/**
 * The place a buyer comes back to.
 *
 * Reached from the confirmation page with both fields already filled, or
 * typed in cold from a receipt email.
 */

import OrderLookup from './OrderLookup';
import '../store.css';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Check on your order | The Lost Jamaican',
  description: 'Look up a Lost Jamaican order with your order number and email.',
};

export default async function OrdersPage({ searchParams }) {
  const { number = '', email = '' } = await searchParams;

  return (
    <main className="ord-page">
      <div className="ord-wrap">
        <p className="ord-eyebrow">The Lost Jamaican</p>
        <h1 className="ord-head">Check on your order</h1>
        <p className="ord-lede">
          Your order number is on your receipt and on the page you saw after paying.
          It looks like <strong>TLJ-XXXXXXXX</strong>.
        </p>
        <OrderLookup initialNumber={number} initialEmail={email} />
      </div>
    </main>
  );
}
