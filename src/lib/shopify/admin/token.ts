import "server-only";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const ADMIN_CLIENT_SECRET = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;

type TokenCache = {
  accessToken: string;
  expiresAt: number; // epoch ms
} | null;

let tokenCache: TokenCache = null;

const SAFETY_MARGIN_MS = 5 * 60 * 1000; // 5 minutes

function isTokenValid(cache: TokenCache) {
  if (!cache) return false;
  return Date.now() + SAFETY_MARGIN_MS < cache.expiresAt;
}

export function clearAdminTokenCache() {
  tokenCache = null;
}

export async function getAdminToken(): Promise<string> {
  if (!STORE_DOMAIN || !ADMIN_CLIENT_ID || !ADMIN_CLIENT_SECRET) {
    throw new Error('ADMIN_CONFIG_MISSING');
  }

  if (isTokenValid(tokenCache)) {
    return tokenCache!.accessToken;
  }

  // Request a new token using client_credentials grant
  const endpoint = `https://${STORE_DOMAIN}/admin/oauth/access_token`;
  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');
  body.set('client_id', ADMIN_CLIENT_ID);
  body.set('client_secret', ADMIN_CLIENT_SECRET);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    // Do not include sensitive details in errors
    throw new Error(`ADMIN_TOKEN_REQUEST_FAILED:${res.status}`);
  }

  const json = await res.json().catch(() => null);
  if (!json || !json.access_token) {
    throw new Error('ADMIN_TOKEN_INVALID_RESPONSE');
  }

  const accessToken = String(json.access_token);
  const expiresIn = Number(json.expires_in) || 0;
  const expiresAt = expiresIn ? Date.now() + expiresIn * 1000 : Date.now() + 60 * 60 * 1000;

  tokenCache = { accessToken, expiresAt };

  return accessToken;
}
