/**
 * The shop owner's view of every order.
 *
 * Behind the Marvin Room gate in proxy.js, so it uses the login that already
 * exists. The one thing it must make impossible to miss is a paid order the
 * print house never received.
 */

import OrdersBoard from './OrdersBoard';
import './orders.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Orders | Marvin Room' };

export default function MarvinOrdersPage() {
  return (
    <main className="mo-page">
      <header className="mo-head">
        <p className="mo-eyebrow">Marvin Room</p>
        <h1>Orders</h1>
        <p className="mo-lede">
          Every paid order and whether the print house has it. Anything marked
          <strong> not yet with the printer</strong> is money taken with nothing being made.
        </p>
      </header>
      <OrdersBoard />
    </main>
  );
}
