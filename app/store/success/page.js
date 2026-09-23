/**
 * Where Stripe sends a buyer after paying.
 *
 * Every CustomCat checkout has always pointed here and this page did not
 * exist, so the last thing a paying customer saw was a 404 -- no order
 * number, no confirmation, no way to tell whether the money had gone
 * anywhere. It reads the session straight back from Stripe so what it shows
 * is the order itself, not a guess.
 */

import Link from 'next/link';
import { stripeClient, toOrderView, money } from '../../../lib/order-view';
import '../store.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Order confirmed | The Lost Jamaican' };

export default async function SuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams;

  let order = null;
  let error = null;
  if (sessionId) {
    try {
      const stripe = stripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent'],
      });
      order = toOrderView(session);
    } catch {
      error = 'We could not find that order. If you were charged, it exists — use the order lookup below.';
    }
  } else {
    error = 'No order reference was passed back from checkout.';
  }

  return (
    <main className="ord-page">
      <div className="ord-wrap">
        {order && order.status.state !== 'unpaid' ? (
          <>
            <p className="ord-eyebrow">The Lost Jamaican</p>
            <h1 className="ord-head">Thank you. Your order is in.</h1>
            <p className="ord-lede">
              A receipt is on its way to <strong>{order.email}</strong>. Keep the order
              number below — it is all you need to check on this order any time.
            </p>

            <div className="ord-number">
              <span>Order number</span>
              <strong>{order.number}</strong>
            </div>

            <dl className="ord-facts">
              <div><dt>Status</dt><dd>{order.status.label}</dd></div>
              <div><dt>Total paid</dt><dd>{money(order.total)}</dd></div>
              <div><dt>Shipping</dt><dd>{money(order.shipping)}</dd></div>
              {order.address && (
                <div>
                  <dt>Shipping to</dt>
                  <dd>
                    {order.name ? `${order.name}, ` : ''}
                    {order.address.line1}
                    {order.address.line2 ? `, ${order.address.line2}` : ''}, {order.address.city},{' '}
                    {order.address.state} {order.address.postal_code}
                  </dd>
                </div>
              )}
            </dl>

            <p className="ord-note">{order.status.detail}</p>

            {order.status.tracking && (
              <div className="ord-track">
                <span>Tracking number</span>
                <strong>{order.status.tracking}</strong>
                {order.status.trackingUrl && (
                  <a className="ord-btn" href={order.status.trackingUrl} target="_blank" rel="noreferrer">
                    Track this parcel
                  </a>
                )}
              </div>
            )}

            <div className="ord-actions">
              <Link className="ord-btn" href={`/store/orders?number=${order.number}&email=${encodeURIComponent(order.email || '')}`}>
                Check on this order
              </Link>
              <Link className="ord-btn is-quiet" href="/store">Keep shopping</Link>
            </div>
          </>
        ) : (
          <>
            <p className="ord-eyebrow">The Lost Jamaican</p>
            <h1 className="ord-head">We could not load that order</h1>
            <p className="ord-lede">{error || 'This order has not been paid.'}</p>
            <div className="ord-actions">
              <Link className="ord-btn" href="/store/orders">Look up an order</Link>
              <Link className="ord-btn is-quiet" href="/store">Back to the shop</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
