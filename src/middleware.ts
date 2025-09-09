import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname } = url;

  // protecting API
  if (pathname.startsWith('/api')) {
    const origin = request.headers.get('origin') ?? '';

    // const allowedFromEnv = [process.env.NEXT_PUBLIC_SITE_URL]; - hosted domain
    const allowedFromEnv: string[] = [];

    const isLocalhost =
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin.startsWith('http://0.0.0.0:');

    const isAllowed =
      isLocalhost || (origin && allowedFromEnv.includes(origin));

    if (request.method === 'OPTIONS') {
      if (!origin || !isAllowed) {
        return new NextResponse(null, { status: 204 });
      }
      const res = new NextResponse(null, { status: 204 });
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      );
      res.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      res.headers.set('Vary', 'Origin');
      return res;
    }

    if (origin && !isAllowed) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const res = NextResponse.next();
    if (origin && isAllowed) {
      res.headers.set('Access-Control-Allow-Origin', origin);
      res.headers.set('Access-Control-Allow-Credentials', 'true');
      res.headers.set('Vary', 'Origin');
    }
    return res;
  }

  // protecting UI
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next|favicon.ico|sign-in|sign-out|about-us|statistics|$|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.css$|.*\\.js$).*)',
  ],
};
