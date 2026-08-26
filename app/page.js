import { redirect } from 'next/navigation';

// The Lost Jamaican store is the front door of myriehq.com.
// The marketing agency site lives at /agency.
export default function Home() {
  redirect('/store');
}
