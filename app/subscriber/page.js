import { redirect } from 'next/navigation';

// The Prompt Guide is sold on the store now (Myrie, 2026-10-26: no more giveaways).
// Old social links still point here, so send them straight to the pack.
export default function SubscriberPack() {
  redirect('/prompts');
}
