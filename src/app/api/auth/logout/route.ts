import "server-only";
import { NextResponse } from 'next/server';
import { getOpenIdConfiguration } from '@/lib/shopify/customer-account/discovery';
import { readSignedCookieFromHeader, parseSignedCookie, clearAuthSessionCookieHeader } from '@/lib/shopify/customer-account/session';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || null;
    const signed = readSignedCookieFromHeader(cookieHeader, 'shilpakale_auth');
    const secret = process.env.AUTH_SESSION_SECRET as string;
    let id_token: string | undefined;
    if (signed && secret) {
      const session = parseSignedCookie(signed, secret) as { id_token?: string } | null;
      id_token = session?.id_token;
    }

    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
    let endSessionUrl: string | null = null;
    if (storeDomain) {
      try {
        const openid = await getOpenIdConfiguration(storeDomain);
        if (openid.end_session_endpoint && id_token) {
          const u = new URL(openid.end_session_endpoint);
          u.searchParams.set('id_token_hint', id_token);
          u.searchParams.set('post_logout_redirect_uri', 'https://shilpakale.vercel.app/');
          endSessionUrl = u.toString();
        }
      } catch {
        // ignore discovery failure
      }
    }

    const clear = clearAuthSessionCookieHeader(process.env.NODE_ENV === 'production');
    const redirectTo = endSessionUrl || '/';
    const res = NextResponse.redirect(redirectTo);
    res.headers.append('Set-Cookie', clear);
    return res;
  } catch {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
