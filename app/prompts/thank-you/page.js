export const metadata = { title: 'Thank you — MyrieHQ Prompt Packs' };

export default function ThankYou() {
  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '90px 20px', fontFamily: 'Segoe UI, Helvetica, Arial, sans-serif', color: '#14161a' }}>
      <h1 style={{ fontSize: 34, margin: '0 0 14px' }}>Payment received — thank you.</h1>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: '#3a4150' }}>
        Your download link is on its way to the email address you used at checkout. It usually
        lands within a minute. The link stays live for 72 hours.
      </p>
      <p style={{ fontSize: 15, lineHeight: 1.65, color: '#5a6478' }}>
        Nothing in your inbox? Check spam first, then email us and we'll reissue it right away.
      </p>
      <p style={{ marginTop: 34 }}>
        <a href="/prompts" style={{ color: '#1b52d6', fontWeight: 600 }}>Back to the packs</a>
      </p>
    </main>
  );
}
