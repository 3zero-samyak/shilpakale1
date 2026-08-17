import "server-only";

async function sha256(input: Uint8Array) {
  const hash = await globalThis.crypto.subtle.digest('SHA-256', input as unknown as BufferSource);
  return new Uint8Array(hash);
}

function base64UrlEncode(bytes: Uint8Array) {
  let str = Buffer.from(bytes).toString('base64');
  str = str.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  return str;
}

export function randomString(length = 64) {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(length));
  return base64UrlEncode(bytes).slice(0, length);
}

export async function generatePKCE() {
  const code_verifier = randomString(64);
  const data = new TextEncoder().encode(code_verifier);
  const digest = await sha256(data);
  const code_challenge = base64UrlEncode(digest);
  return { code_verifier, code_challenge, code_challenge_method: 'S256' };
}

export function generateStateNonce() {
  const state = randomString(32);
  const nonce = randomString(32);
  return { state, nonce };
}
