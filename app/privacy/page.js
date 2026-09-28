import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import LegalPage from '../../components/sections/LegalPage';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'What Myrie HQ collects, why, who it is shared with, and how to have it deleted.',
  alternates: { canonical: 'https://www.myriehq.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <LegalPage title="Privacy Policy" updated="28 September 2026">
        <p>
          Myrie HQ is run by Oneil Myrie from Daytona Beach, Florida. This page
          explains what we collect, why we collect it, and how to get it removed.
          Questions go to <a href="mailto:myriework@gmail.com">myriework@gmail.com</a>.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Your email address</strong>, when you ask us to send you a free
            prompt pack, sign up for store updates, or contact us.
          </li>
          <li>
            <strong>Order details</strong>, when you buy something: name, shipping
            address, email, and what you ordered.
          </li>
          <li>
            <strong>Basic analytics</strong>: which pages were visited and roughly
            where in the world the visit came from. This is counted in aggregate and
            is not used to identify you.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect or store card numbers. Payments are handled
          by Stripe, and card details go to Stripe directly without passing through us.
        </p>

        <h2>Why we collect it</h2>
        <ul>
          <li>To send you the file or the order you asked for.</li>
          <li>To email you about your order, and to answer you when you write to us.</li>
          <li>
            To occasionally email you when there is a new prompt pack or a new film. Every
            one of those emails can be replied to, and you can ask to be removed at any time.
          </li>
        </ul>
        <p>
          We do not sell your information, and we do not rent or trade mailing lists.
        </p>

        <h2>Who else sees it</h2>
        <p>Only the companies needed to actually deliver what you ordered:</p>
        <ul>
          <li><strong>Stripe</strong> — payment processing.</li>
          <li>
            <strong>Printify and CustomCat</strong> — the printers who make and ship the
            merchandise. They receive your name and shipping address so the parcel can reach you.
          </li>
          <li><strong>Vercel</strong> — hosting for this website.</li>
          <li><strong>Google</strong> — the email account we send from and reply with.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          This site does not use advertising or tracking cookies. Some pages store a small
          amount of information in your own browser (for example, what is in your cart) so
          the site works as you move around it. That information stays on your device.
        </p>

        <h2>How long we keep it</h2>
        <p>
          Order records are kept as long as we need them for accounting and for handling
          returns. Email addresses are kept until you ask us to remove them.
        </p>

        <h2>Your choices</h2>
        <p>
          Write to <a href="mailto:myriework@gmail.com">myriework@gmail.com</a> and ask us
          to send you a copy of what we hold about you, correct it, or delete it. We will
          action it. If you are in a place with specific privacy rights, such as the EU, the
          UK or California, those rights apply here and this is how you exercise them.
        </p>

        <h2>Children</h2>
        <p>
          This site is not directed at children under 13 and we do not knowingly collect
          their information.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the date at the top of the page changes with it.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
