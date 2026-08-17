import "server-only";
import { NextResponse } from 'next/server';
import { getOpenIdConfiguration } from '@/lib/shopify/customer-account/discovery';
import { generatePKCE, generateStateNonce } from '@/lib/shopify/customer-account/pkce';
import { makeTempAuthCookieHeader } from '@/lib/shopify/customer-account/session';

const APP_CALLBACK = 'https://shilpakale.vercel.app/account/callback';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const returnTo = url.searchParams.get('returnTo') || '/account';
    // Prevent open redirects: allow only internal paths
    if (!returnTo.startsWith('/')) {
      return NextResponse.redirect(new URL('/account', url));
    }

    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
    if (!storeDomain) throw new Error('Store domain not configured');

    const openid = await getOpenIdConfiguration(storeDomain);
    const { code_verifier, code_challenge } = await generatePKCE();
    const { state, nonce } = generateStateNonce();

    // Temporary auth state cookie (HttpOnly)
    const temp = { state, nonce, code_verifier, returnTo, createdAt: Date.now() };
    const secret = process.env.AUTH_SESSION_SECRET as string;
    if (!secret) throw new Error('AUTH_SESSION_SECRET missing');
    const cookie = makeTempAuthCookieHeader(temp, secret, process.env.NODE_ENV === 'production');

    const authUrl = new URL(openid.authorization_endpoint);
    authUrl.searchParams.set('client_id', process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID as string);
    authUrl.searchParams.set('scope', 'openid email customer-account-api:full');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', APP_CALLBACK);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('nonce', nonce);
    authUrl.searchParams.set('code_challenge', code_challenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    const res = NextResponse.redirect(authUrl.toString());
    res.headers.append('Set-Cookie', cookie);
    return res;
  } catch {
    return NextResponse.json({ error: 'login_error' }, { status: 500 });
  }
}
