import "server-only";
import { NextResponse } from 'next/server';
import { getOpenIdConfiguration } from '@/lib/shopify/customer-account/discovery';
import { readSignedCookieFromHeader, clearTempAuthCookieHeader, makeAuthSessionCookieHeader, parseSignedCookie } from '@/lib/shopify/customer-account/session';

function base64UrlDecode(input: string) {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = input.length % 4;
  if (pad === 2) input += '==';
  else if (pad === 3) input += '=';
  return Buffer.from(input, 'base64');
}

async function verifyIdToken(idToken: string, jwksUri: string, expectedNonce: string, expectedIssuer: string, clientId: string) {
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Invalid id_token');
  const [headerB64, payloadB64, sigB64] = parts;
  const header = JSON.parse(base64UrlDecode(headerB64).toString('utf8'));
  const payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));

  // Basic claim checks
  if (payload.nonce !== expectedNonce) throw new Error('nonce_mismatch');
  if (payload.iss !== expectedIssuer) throw new Error('issuer_mismatch');
  const aud = payload.aud;
  if (Array.isArray(aud) ? !aud.includes(clientId) : aud !== clientId) throw new Error('aud_mismatch');
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) throw new Error('id_token_expired');

  // Fetch JWKS and verify signature
  const jwksRes = await fetch(jwksUri);
  if (!jwksRes.ok) throw new Error('jwks_fetch_failed');
  const jwks = await jwksRes.json();
  type JwkKey = { kid?: string };
  const key = (jwks.keys || []).find((k: JwkKey) => k.kid === header.kid);
  if (!key) throw new Error('jwks_key_not_found');

  // Import JWK
  const cryptoKey = await (globalThis.crypto.subtle as SubtleCrypto).importKey('jwk', key, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);

  const signed = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
  const signature = base64UrlDecode(sigB64);
  const ok = await (globalThis.crypto.subtle as SubtleCrypto).verify({ name: 'RSASSA-PKCS1-v1_5' }, cryptoKey, signature, signed);
  if (!ok) throw new Error('invalid_signature');

  return payload;
}

export async function GET(req: Request) {
  try {
    console.log('[customer-auth] callback received');
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    if (error) {
      return NextResponse.redirect(new URL('/account?error=auth_cancelled', url));
    }
    if (!code || !state) return NextResponse.redirect(new URL('/account?error=missing_code', url));

    const cookieHeader = req.headers.get('cookie') || null;
    const signed = readSignedCookieFromHeader(cookieHeader, 'shilpakale_oauth_temp');
    const secret = process.env.AUTH_SESSION_SECRET as string;
    console.log('[customer-auth] temporary OAuth cookie present:', !!signed);
    if (!signed) return NextResponse.redirect(new URL('/account?error=session_missing', url));
    type TempSession = { state: string; code_verifier: string; nonce: string; returnTo?: string };
    const temp = parseSignedCookie(signed, secret) as TempSession | null;
    if (!temp) return NextResponse.redirect(new URL('/account?error=session_invalid', url));
    const stateMatch = temp.state === state;
    console.log('[customer-auth] callback state validation:', stateMatch ? 'passed' : 'failed');
    if (!stateMatch) return NextResponse.redirect(new URL('/account?error=state_mismatch', url));

    const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
    const openid = await getOpenIdConfiguration(storeDomain);

    // Exchange code for tokens
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('client_id', process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID as string);
    body.set('redirect_uri', 'https://shilpakale.vercel.app/account/callback');
    body.set('code', code);
    body.set('code_verifier', temp.code_verifier);

    const tokenRes = await fetch(openid.token_endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!tokenRes.ok) return NextResponse.redirect(new URL('/account?error=token_exchange_failed', url));
    const tokenJson = await tokenRes.json();
    const { access_token, refresh_token, id_token, expires_in } = tokenJson as { access_token?: string; refresh_token?: string; id_token?: string; expires_in?: number };
    console.log('[customer-auth] token exchange:', tokenRes.ok ? 'succeeded' : 'failed');
    if (!id_token) return NextResponse.redirect(new URL('/account?error=no_id_token', url));

    // Verify id_token
    const payload = await verifyIdToken(id_token, openid.jwks_uri, temp.nonce, openid.issuer, process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID as string) as { sub?: string };
    console.log('[customer-auth] id token validation: passed');

    // Build auth session cookie (store tokens server-side as signed cookie)
    const authSession = {
      access_token,
      refresh_token,
      id_token,
      expires_at: Date.now() + (expires_in ? expires_in * 1000 : 0),
      sub: payload.sub,
    };
    const authCookie = makeAuthSessionCookieHeader(authSession, secret, process.env.NODE_ENV === 'production');
    const clearTemp = clearTempAuthCookieHeader(process.env.NODE_ENV === 'production');

    // Diagnose cookie size — browser/server limits are typically ~4096 bytes
    const authCookieBytes = Buffer.byteLength(authCookie, 'utf8');
    console.log('[customer-auth] auth cookie byte length:', authCookieBytes);
    if (authCookieBytes >= 3800) {
      console.log('[customer-auth] auth cookie size warning');
    }

    const redirectTo = temp.returnTo || '/account';
    const res = NextResponse.redirect(new URL(redirectTo, url));
    res.headers.append('Set-Cookie', authCookie);
    res.headers.append('Set-Cookie', clearTemp);
    console.log('[customer-auth] session cookie created');
    console.log('[customer-auth] redirecting authenticated customer to', redirectTo);
    return res;
  } catch {
    return NextResponse.redirect(new URL('/account?error=auth_failure', req.url));
  }
}
