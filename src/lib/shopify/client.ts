import "server-only";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION;
const TOKEN = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;

if (!SHOP_DOMAIN || !API_VERSION) {
  console.warn('Shopify environment variables are not fully configured');
}

const endpoint = (domain = SHOP_DOMAIN, version = API_VERSION) =>
  `https://${domain}/api/${version}/graphql.json`;

export type GraphQLError = { message: string; extensions?: Record<string, unknown> };

export class ShopifyHTTPError extends Error {
  status: number;
  body: string;

  constructor(message: string, status: number, body: string) {
    super(message);
    this.name = 'ShopifyHTTPError';
    this.status = status;
    this.body = body;
  }
}

export class ShopifyGraphQLError extends Error {
  errors: GraphQLError[];

  constructor(message: string, errors: GraphQLError[]) {
    super(message);
    this.name = 'ShopifyGraphQLError';
    this.errors = errors;
  }
}

export class ShopifyConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShopifyConfigError';
  }
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!SHOP_DOMAIN || !API_VERSION) {
    throw new ShopifyConfigError('Missing Shopify environment configuration (SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_API_VERSION)');
  }

  const url = endpoint();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (TOKEN) {
    // Use the private storefront token header which our environment provides.
    headers['Shopify-Storefront-Private-Token'] = TOKEN;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ShopifyHTTPError('Shopify HTTP error', res.status, text);
  }

  const json = await res.json();

  if (json.errors && Array.isArray(json.errors) && json.errors.length > 0) {
    throw new ShopifyGraphQLError('Shopify GraphQL errors', json.errors);
  }

  return json.data as T;
}
