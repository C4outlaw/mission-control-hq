import SiteNav from '../../components/layout/SiteNav';
import Footer from '../../components/layout/Footer';
import ScheduleClient from './ScheduleClient';

export const metadata = {
  title: 'Staff Schedule · Myrie HQ',
  description: 'The Beach Bucket staff scheduling portal — sign in to view your shifts and messages.',
  alternates: { canonical: 'https://www.myriehq.com/schedule' },
  robots: { index: false },
};

export default function SchedulePage() {
  return (
    <main className="myrie-marketing">
      <SiteNav />
      <ScheduleClient schedulerUrl={process.env.NEXT_PUBLIC_SCHEDULER_URL || ''} />
      <Footer />
    </main>
  );
}
