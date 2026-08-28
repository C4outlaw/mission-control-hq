import { NextResponse } from 'next/server';
import { isPublicApiPath } from './lib/public-api-paths.mjs';

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Marvin Room"' },
  });
}

export function proxy(req) {
  // Public endpoints that must bypass the Marvin Room auth gate.
  // The homepage lead form posts here; it has its own honeypot + validation.
  // The prompt-pack store routes are public by design: checkout is called by the
  // store page, stripe-webhook is authenticated by Stripe's signature, and
  // download is authenticated by its own signed expiring grant token.
  const pathname = req.nextUrl?.pathname || '';
  if (isPublicApiPath(pathname)) return NextResponse.next();

  const user = process.env.MARVIN_ROOM_USER;
  const pass = process.env.MARVIN_ROOM_PASS;

  // Fail closed for protected routes when credentials are not configured.
  if (!user || !pass) {
    return new NextResponse('Marvin Room is locked. Admin must configure credentials.', { status: 503 });
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
  matcher: ['/marvin-room/:path*', '/api/:path*'],
};
