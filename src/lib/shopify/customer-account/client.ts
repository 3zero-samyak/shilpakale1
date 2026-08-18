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

export type CustomerAuthResult =
  | { status: 'authenticated'; customer: Record<string, unknown> }
  | { status: 'unauthenticated' }
  | { status: 'api_error' };

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

  session.access_token = access_token;
  if (refresh_token) session.refresh_token = refresh_token;
  if (id_token) session.id_token = id_token;
  session.expires_at = Date.now() + (expires_in ? expires_in * 1000 : 0);

  try {
    const cookieStore = await cookies();
    const signed = buildSignedCookie(session, secret);
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
    return null;
  }

  return session;
}

export async function getAuthenticatedCustomer(): Promise<CustomerAuthResult> {
  console.log('[customer-auth] account lookup started');

  const cookieStore = await cookies();
  const signed = cookieStore.get('shilpakale_auth')?.value;
  const secret = process.env.AUTH_SESSION_SECRET as string;

  console.log('[customer-auth] auth cookie present:', !!signed);
  if (!signed || !secret) return { status: 'unauthenticated' };

  const session = parseSignedCookie(signed, secret) as AuthSession | null;
  const sigValid = session !== null;
  console.log('[customer-auth] auth cookie signature valid:', sigValid);
  console.log('[customer-auth] session parsed:', sigValid);
  if (!session) return { status: 'unauthenticated' };

  console.log('[customer-auth] session access token present:', !!session.access_token);
  console.log('[customer-auth] session refresh token present:', !!session.refresh_token);
  console.log('[customer-auth] session id token present:', !!session.id_token);
  if (!session.access_token) return { status: 'unauthenticated' };

  console.log('[customer-auth] access token type present:', true);

  const expired = !!(session.expires_at && Date.now() > session.expires_at);
  const nearExpiry = !expired && !!(session.expires_at && Date.now() > session.expires_at - REFRESH_THRESHOLD_MS);
  console.log('[customer-auth] session expired:', expired);
  console.log('[customer-auth] refresh required:', expired || nearExpiry);

  if (expired) {
    const refreshed = await tryRefreshSession(session, secret);
    if (!refreshed) {
      try { cookieStore.delete('shilpakale_auth'); } catch { /* ignore */ }
      return { status: 'unauthenticated' };
    }
  } else if (nearExpiry) {
    // Best-effort; leave current token if refresh fails
    await tryRefreshSession(session, secret);
  }

  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN as string;
  let cfg: { graphql_api: string };
  try {
    cfg = await getCustomerAccountApiConfiguration(storeDomain);
    console.log('[customer-auth] customer API discovery: succeeded');
  } catch {
    console.log('[customer-auth] customer API discovery: failed');
    // Discovery failure with a valid session is an API error, not a logout
    return { status: 'api_error' };
  }

  let res: Response;
  try {
    // Shopify Customer Account API requires bare access_token, not Bearer-prefixed
    res = await fetch(cfg.graphql_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: session.access_token,
      },
      body: JSON.stringify({ query: CUSTOMER_QUERY }),
    });
  } catch {
    console.log('[customer-auth] customer API HTTP status: network-error');
    return { status: 'api_error' };
  }

  console.log('[customer-auth] customer API HTTP status:', res.status);
  if (res.status === 401 || res.status === 403) {
    // Token rejected — treat as unauthenticated so the user can re-authenticate
    return { status: 'unauthenticated' };
  }
  if (!res.ok) {
    return { status: 'api_error' };
  }

  const json = await res.json();
  const hasErrors = !!(json.errors && json.errors.length > 0);
  console.log('[customer-auth] customer GraphQL errors present:', hasErrors);

  const customer = json.data?.customer ?? null;
  console.log('[customer-auth] customer returned:', !!customer);

  if (!customer) {
    // GraphQL responded OK but returned no customer — treat as API error, not logout
    console.log('[customer-auth] account lookup result: api-error');
    return { status: 'api_error' };
  }

  console.log('[customer-auth] account lookup result: authenticated');
  return { status: 'authenticated', customer };
}
