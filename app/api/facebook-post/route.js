async function graphGet(path, token) {
  const res = await fetch(`https://graph.facebook.com/v23.0/${path}${path.includes('?') ? '&' : '?'}access_token=${encodeURIComponent(token)}`, {
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) throw new Error(data?.error?.message || `Graph GET failed (${res.status})`);
  return data;
}

async function graphPost(path, params) {
  const body = new URLSearchParams(params);
  const res = await fetch(`https://graph.facebook.com/v23.0/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) throw new Error(data?.error?.message || `Graph POST failed (${res.status})`);
  return data;
}

async function resolvePageCreds() {
  const pageIdEnv = process.env.FACEBOOK_PAGE_ID || '';
  const pageTokenEnv = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || process.env.FB_PAGE_ACCESS_TOKEN || '';
  const userToken = process.env.FACEBOOK_USER_ACCESS_TOKEN || '';

  if (pageIdEnv && pageTokenEnv) return { pageId: pageIdEnv, pageToken: pageTokenEnv, source: 'env-page' };
  if (!userToken) throw new Error('Missing page token. Set FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_USER_ACCESS_TOKEN.');

  const accounts = await graphGet('me/accounts?fields=id,name,access_token,tasks', userToken);
  const pages = Array.isArray(accounts?.data) ? accounts.data : [];
  if (!pages.length) throw new Error('No pages available for this user token.');

  const target = pages.find((p) => p.id === pageIdEnv) || pages[0];
  return { pageId: target.id, pageToken: target.access_token, source: 'derived-user-token' };
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message || '';
    const imageUrl = body?.imageUrl || '';
    if (!message.trim() && !imageUrl.trim()) {
      return Response.json({ ok: false, error: 'message or imageUrl required' }, { status: 200 });
    }

    const { pageId, pageToken, source } = await resolvePageCreds();

    let result;
    if (imageUrl.trim()) {
      result = await graphPost(`${pageId}/photos`, {
        access_token: pageToken,
        caption: message,
        url: imageUrl,
      });
    } else {
      result = await graphPost(`${pageId}/feed`, {
        access_token: pageToken,
        message,
      });
    }

    return Response.json({ ok: true, pageId, source, result }, { status: 200 });
  } catch (err) {
    return Response.json({ ok: false, error: err?.message || 'facebook post failed' }, { status: 200 });
  }
}
