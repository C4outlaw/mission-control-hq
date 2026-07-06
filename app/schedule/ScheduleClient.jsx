'use client';
import { useEffect, useState } from 'react';

// When the scheduler has a public URL (NEXT_PUBLIC_SCHEDULER_URL), send the
// visitor straight to it — it has its own sign-in. Cookies must be first-party,
// so this is a full navigation, not an iframe.
export default function ScheduleClient({ schedulerUrl }) {
  const [redirecting, setRedirecting] = useState(Boolean(schedulerUrl));

  useEffect(() => {
    if (schedulerUrl) {
      window.location.replace(schedulerUrl);
    }
  }, [schedulerUrl]);

  return (
    <section className="schedule-gate">
      <div className="shell">
        <div className="schedule-card">
          <span className="schedule-mark">M</span>
          <h1>Staff Schedule</h1>
          {redirecting ? (
            <p>Taking you to the scheduler sign-in…</p>
          ) : (
            <>
              <p>
                The Beach Bucket scheduling portal is being moved to its new home
                online. Team members: ask a manager for your username and
                password — sign-in will be required here once it&rsquo;s live.
              </p>
              <a className="schedule-cta" href="/#contact">Questions? Contact us</a>
            </>
          )}
        </div>
      </div>

      <style>{`
        .schedule-gate { padding: 160px 0 120px; min-height: 62vh; display: flex; align-items: center; }
        .schedule-card { max-width: 560px; margin: 0 auto; text-align: center; padding: 56px 44px; border-radius: 22px; background: var(--panel, #fff); box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 28px 70px rgba(0,0,0,.12); }
        .schedule-mark { display: inline-grid; place-items: center; width: 58px; height: 58px; border-radius: 16px; background: #0f2530; color: #ffd166; font-weight: 800; font-size: 28px; margin-bottom: 20px; }
        .schedule-card h1 { font-size: clamp(1.9rem, 4vw, 2.6rem); margin: 0 0 14px; letter-spacing: -0.03em; }
        .schedule-card p { max-width: 44ch; margin: 0 auto 26px; line-height: 1.6; }
        .schedule-cta { display: inline-block; padding: 12px 22px; border-radius: 999px; background: #0f2530; color: #fff; text-decoration: none; font-weight: 600; }
        .schedule-cta:hover { opacity: .9; }
      `}</style>
    </section>
  );
}
