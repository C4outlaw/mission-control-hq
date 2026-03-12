import { NextResponse } from 'next/server';

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Mission Control"' },
  });
}

export function proxy(req) {
  const user = process.env.MISSION_CONTROL_USER;
  const pass = process.env.MISSION_CONTROL_PASS;

  // Fail closed for protected routes when credentials are not configured.
  if (!user || !pass) {
    return new NextResponse('Mission Control is locked. Admin must configure credentials.', { status: 503 });
  }

  const auth = req.headers.get('authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorizedResponse();

  const encoded = auth.split(' ')[1] || '';
  let decoded = '';
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorizedResponse();
  }

  const idx = decoded.indexOf(':');
  if (idx === -1) return unauthorizedResponse();

  const inUser = decoded.slice(0, idx);
  const inPass = decoded.slice(idx + 1);

  if (inUser !== user || inPass !== pass) return unauthorizedResponse();

  return NextResponse.next();
}

export const config = {
  matcher: ['/mission-control/:path*', '/api/:path*'],
};
