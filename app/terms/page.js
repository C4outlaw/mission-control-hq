import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import LegalPage from '../../components/sections/LegalPage';

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms you agree to when you buy from or use Myrie HQ.',
  alternates: { canonical: 'https://www.myriehq.com/terms' },
};

export default function TermsPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <LegalPage title="Terms of Service" updated="28 September 2026">
        <p>
          This site is operated by Oneil Myrie, trading as Myrie HQ, from Daytona Beach,
          Florida. Using the site or buying from it means you accept what is set out here.
          Contact: <a href="mailto:myriework@gmail.com">myriework@gmail.com</a>.
        </p>

        <h2>Orders and prices</h2>
        <p>
          Prices are in US dollars and are the price at the moment you check out. We try
          hard to keep product photos, descriptions and stock accurate, but if something
          is listed at an obviously wrong price or we cannot fulfil it, we will tell you
          and refund you in full rather than quietly ship something else.
        </p>
        <p>
          Merchandise is printed to order by our print partners. Colours on a screen are
          never an exact match for dye on fabric, and there is a small natural variation
          between printed garments.
        </p>

        <h2>Payment</h2>
        <p>
          Payments are processed by Stripe. We never see or store your card number.
        </p>

        <h2>Shipping</h2>
        <p>
          Items are made to order, so allow a few days for production before the parcel
          ships. Delivery times depend on the carrier and your location. Any customs or
          import charges on international orders are the buyer&rsquo;s responsibility.
        </p>

        <h2>Returns</h2>
        <p>
          Covered in full on our <a href="/returns">Returns &amp; Refunds</a> page.
        </p>

        <h2>Digital products</h2>
        <p>
          Prompt packs and guides are licensed to you for your own work, including
          commercial work on your own channels. You may not resell, repackage or
          redistribute the files themselves.
        </p>

        <h2>Our content</h2>
        <p>
          The films, designs, writing and artwork on this site belong to Myrie HQ. Please
          do not reupload them as your own. If you want to use something, ask &mdash; the
          answer is often yes.
        </p>

        <h2>Accuracy of the films</h2>
        <p>
          The documentaries are researched from published reporting and are offered as
          storytelling and commentary, not as a legal record. Where sources disagree we
          say so. If you spot something wrong, tell us and we will correct it.
        </p>

        <h2>Liability</h2>
        <p>
          We stand behind what we sell and will always replace or refund a bad order. Beyond
          that, our liability is limited to what you paid for the item in question.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Florida, United States.
        </p>

        <h2>Changes</h2>
        <p>
          If these terms change, the date at the top of the page changes with them.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
