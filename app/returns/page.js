import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import LegalPage from '../../components/sections/LegalPage';

export const metadata = {
  title: 'Returns & Refunds',
  description:
    'The Lost Jamaican returns policy: 30 days from delivery, replacements for anything damaged, defective or wrong.',
  alternates: { canonical: 'https://www.myriehq.com/returns' },
};

export default function ReturnsPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <LegalPage title="Returns & Refunds" updated="28 September 2026">
        <p>
          <strong>You have 30 days from the day your order is delivered.</strong> Write to{' '}
          <a href="mailto:myriework@gmail.com">myriework@gmail.com</a> with your order
          number and we will sort it out.
        </p>

        <h2>Damaged, defective, or the wrong item</h2>
        <p>
          If a piece turns up damaged, misprinted, or it simply is not what you ordered,
          we will replace it or refund it in full, and you do not pay return shipping.
          Send a photo of the item with your order number so we can get the replacement
          moving straight away. Please tell us within 30 days of delivery.
        </p>

        <h2>Wrong size or changed your mind</h2>
        <p>
          Every piece is printed to order for you rather than pulled off a shelf, so we
          cannot restock a returned item. Within 30 days of delivery we will still
          exchange it for a different size, or refund it, but the return shipping is
          yours to cover and the item needs to be unworn, unwashed and in its original
          condition.
        </p>
        <p>
          Check the size guide on the product before ordering. If you are between sizes
          or unsure, email us first and we will tell you honestly which way to go.
        </p>

        <h2>Order never arrived</h2>
        <p>
          If tracking says delivered and it is not with you, or the parcel has clearly
          gone missing in transit, tell us. We will chase the carrier and, where it is
          not recoverable, send a replacement.
        </p>

        <h2>Cancelling an order</h2>
        <p>
          Orders go to the printer quickly. Email us as soon as you can and if it has
          not gone to print yet we will cancel it and refund you in full.
        </p>

        <h2>Digital items</h2>
        <p>
          Prompt packs and guides are digital files and are delivered immediately, so
          they are not refundable once downloaded. If a file is broken, will not open,
          or is not what the page described, tell us and we will fix it or refund you.
        </p>

        <h2>How refunds are paid</h2>
        <p>
          Refunds go back to the card you paid with, through Stripe. Once we issue it,
          your bank usually takes a few working days to show it.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
