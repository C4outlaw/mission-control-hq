async function graphGet(path, token) {
  const res = await fetch(`https://graph.facebook.com/v23.0/${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(token)}`, { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) throw new Error(data?.error?.message || `Graph GET failed (${res.status})`);
  return data;
}

export async function GET() {
  try {
    const userToken = process.env.FACEBOOK_USER_ACCESS_TOKEN || process.env.FACEBOOK_PAGE_ACCESS_TOKEN || '';
    if (!userToken) return Response.json({ ok: false, error: 'Missing FACEBOOK_USER_ACCESS_TOKEN (or fallback token).' }, { status: 200 });

    const perms = await graphGet('me/permissions', userToken);
    const granted = new Set((perms?.data || []).filter((p) => p.status === 'granted').map((p) => p.permission));
    const required = ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'];
    const missing = required.filter((s) => !granted.has(s));

    let pages = [];
    try {
      const acc = await graphGet('me/accounts?fields=id,name,tasks', userToken);
      pages = acc?.data || [];
    } catch {}

    return Response.json({
      ok: true,
      required,
      missing,
      canPost: missing.length === 0,
      pages,
    }, { status: 200 });
  } catch (err) {
    return Response.json({ ok: false, error: err?.message || 'diagnose failed' }, { status: 200 });
  }
}
