import "server-only";

export interface OpenIdConfig {
  authorization_endpoint: string;
  token_endpoint: string;
  issuer: string;
  jwks_uri: string;
  end_session_endpoint?: string;
}

export interface CustomerAccountApiConfig {
  graphql_api: string;
}

export async function getOpenIdConfiguration(storeDomain: string): Promise<OpenIdConfig> {
  const url = `https://${storeDomain}/.well-known/openid-configuration`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenID discovery failed (${res.status})`);
  const json = await res.json();
  const required = ['authorization_endpoint','token_endpoint','issuer','jwks_uri'];
  for (const k of required) {
    if (!json[k]) throw new Error(`OpenID discovery missing ${k}`);
  }
  return {
    authorization_endpoint: json.authorization_endpoint,
    token_endpoint: json.token_endpoint,
    issuer: json.issuer,
    jwks_uri: json.jwks_uri,
    end_session_endpoint: json.end_session_endpoint,
  };
}

export async function getCustomerAccountApiConfiguration(storeDomain: string): Promise<CustomerAccountApiConfig> {
  const url = `https://${storeDomain}/.well-known/customer-account-api`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Customer Account API discovery failed (${res.status})`);
  const json = await res.json();
  if (!json.graphql_api) throw new Error('Customer Account API discovery missing graphql_api');
  return { graphql_api: json.graphql_api };
}
