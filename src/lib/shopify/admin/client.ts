import "server-only";
import type { AdminGraphQLResponse } from './types';
import { getAdminToken, clearAdminTokenCache } from './token';

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION;

async function doAdminRequest(token: string, query: string, variables?: Record<string, unknown>): Promise<Response> {
  const endpoint = `https://${STORE_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
}

export async function shopifyAdminGraphQL(query: string, variables?: Record<string, unknown> | undefined): Promise<AdminGraphQLResponse<unknown>> {
  if (!STORE_DOMAIN || !ADMIN_API_VERSION) {
    throw new Error('ADMIN_CONFIG_MISSING');
  }

  // Obtain token (cached internally)
  const token = await getAdminToken();

  // First attempt
  let res = await doAdminRequest(token, query, variables as Record<string, unknown> | undefined);

  // If unauthorized, clear cache and retry once
  if (res.status === 401) {
    clearAdminTokenCache();
    const freshToken = await getAdminToken();
    res = await doAdminRequest(freshToken, query, variables as Record<string, unknown> | undefined);
  }

  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`ADMIN_INVALID_JSON:${res.status}`);
  }

  if (!res.ok) {
    const maybe = json as { errors?: { message: string }[] } | null;
    const err: AdminGraphQLResponse<unknown> = { errors: maybe?.errors ?? [{ message: `HTTP ${res.status}` }] };
    return err;
  }

  return json as AdminGraphQLResponse<unknown>;
}
