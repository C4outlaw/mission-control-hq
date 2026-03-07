export async function GET() {
  const hasEmailSource = !!process.env.MISSION_EMAIL_SOURCE_URL;
  const hasCalendarSource = !!process.env.MISSION_CALENDAR_SOURCE_URL;
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

  const social = {
    tiktok: !!process.env.TIKTOK_ACCESS_TOKEN,
    instagram: !!(process.env.INSTAGRAM_ACCESS_TOKEN || process.env.FACEBOOK_ACCESS_TOKEN || process.env.FB_PAGE_ACCESS_TOKEN),
    facebook: !!(process.env.FACEBOOK_ACCESS_TOKEN || process.env.FB_PAGE_ACCESS_TOKEN),
    x: !!(process.env.X_API_KEY && process.env.X_API_SECRET && process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_TOKEN_SECRET),
    youtube: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.YOUTUBE_REFRESH_TOKEN),
    linkedin: !!process.env.LINKEDIN_ACCESS_TOKEN,
    grok: !!(process.env.GROK_API_KEY || process.env.XAI_API_KEY),
  };

  const gmailOAuth = !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    (process.env.GMAIL_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN)
  );

  return Response.json(
    {
      ok: true,
      integrations: {
        emailSource: hasEmailSource,
        calendarSource: hasCalendarSource,
        smtp: hasSmtp,
        gmailOAuth,
        social,
      },
    },
    { status: 200 }
  );
}
