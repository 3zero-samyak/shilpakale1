import "server-only";
import { cookies } from 'next/headers';
import { parseSignedCookie, buildSignedCookie } from './session';
import { getCustomerAccountApiConfiguration, getOpenIdConfiguration } from './discovery';
import { CUSTOMER_QUERY } from './queries';

type AuthSession = {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_at?: number;
  sub?: string;
  [k: string]: unknown;
};

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // refresh if token expires within 5 minutes
const _refreshAttempted = new WeakSet<object>();

async function tryRefreshSession(session: AuthSession, secret: string) {
  if (!session?.refresh_token) return null;
  // Prevent repeated refresh attempts within the same request (ephemeral only)
  if (_refreshAttempted.has(session as object)) return null;
  _refreshAttempted.add(session as object);

  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
  if (!storeDomain) return null;

  const openid = await getOpenIdConfiguration(storeDomain);

  const body = new URLSearchParams();
  body.set('grant_type', 'refresh_token');
  body.set('client_id', process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID as string);
  body.set('refresh_token', session.refresh_token);

  const tokenRes = await fetch(openid.token_endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!tokenRes.ok) return null;
  const tokenJson = await tokenRes.json();
  const { access_token, refresh_token, id_token, expires_in } = tokenJson as { access_token?: string; refresh_token?: string; id_token?: string; expires_in?: number };
  if (!access_token) return null;

  // update session fields (do not expose these to client)
  session.access_token = access_token;
  if (refresh_token) session.refresh_token = refresh_token;
  if (id_token) session.id_token = id_token;
  session.expires_at = Date.now() + (expires_in ? expires_in * 1000 : 0);

  // Persist updated signed cookie
  try {
    const cookieStore = await cookies();
    const signed = buildSignedCookie(session, secret);
    // set cookie with similar options as makeAuthSessionCookieHeader
    cookieStore.set({
      name: 'shilpakale_auth',
      value: signed,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch {
    // If we cannot persist the refreshed session, treat as failure
    return null;
  }

  return session;
}

export async function getAuthenticatedCustomer() {
  const cookieStore = await cookies();
  const signed = cookieStore.get('shilpakale_auth')?.value;
  const secret = process.env.AUTH_SESSION_SECRET as string;
  if (!signed || !secret) return null;
  const session = parseSignedCookie(signed, secret) as AuthSession | null;
  if (!session || !session.access_token) return null;
  // Refresh if token is expired or will expire within the threshold
  if (session.expires_at && Date.now() > session.expires_at) {
    // token already expired - attempt refresh
    const refreshed = await tryRefreshSession(session, secret);
    if (!refreshed) {
      try {
        cookieStore.delete('shilpakale_auth');
      } catch {}
      return null;
    }
  } else if (session.expires_at && Date.now() > session.expires_at - REFRESH_THRESHOLD_MS) {
    // token close to expiry - attempt refresh proactively
    const refreshed = await tryRefreshSession(session, secret);
    if (!refreshed) {
      // leave existing token if refresh fails but token still valid; if refresh fails and token later expires, subsequent calls will attempt refresh again
    }
  }

  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
  const cfg = await getCustomerAccountApiConfiguration(storeDomain);

  const res = await fetch(cfg.graphql_api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({ query: CUSTOMER_QUERY }),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.customer ?? null;
}
