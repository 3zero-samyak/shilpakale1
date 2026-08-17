import "server-only";
import { createHmac } from 'crypto';

const TEMP_COOKIE = 'shilpakale_oauth_temp';
const AUTH_COOKIE = 'shilpakale_auth';

function base64UrlEncodeJson(obj: unknown) {
  const json = JSON.stringify(obj);
  return Buffer.from(json).toString('base64url');
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function buildSignedCookie(valueObj: unknown, secret: string) {
  const payload = base64UrlEncodeJson(valueObj);
  const sig = sign(payload, secret);
  return `${payload}.${sig}`;
}

export function parseSignedCookie(signed: string, secret: string) {
  try {
    const [payload, sig] = signed.split('.');
    if (!payload || !sig) return null;
    const expected = sign(payload, secret);
    if (!timingSafeEqual(expected, sig)) return null;
    const json = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return cryptoTimingEqual(aBuf, bBuf);
}

function cryptoTimingEqual(a: Buffer, b: Buffer) {
  if (a.length !== b.length) return false;
  let res = 0;
  for (let i = 0; i < a.length; i++) res |= a[i] ^ b[i];
  return res === 0;
}

export function makeTempAuthCookieHeader(obj: unknown, secret: string, secure = true) {
  const signed = buildSignedCookie(obj, secret);
  const maxAge = 60 * 10; // 10 minutes
  const parts = [`${TEMP_COOKIE}=${signed}`, `Max-Age=${maxAge}`, 'HttpOnly', `Path=/`, 'SameSite=Lax'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function makeAuthSessionCookieHeader(obj: unknown, secret: string, secure = true) {
  const signed = buildSignedCookie(obj, secret);
  const maxAge = 60 * 60 * 24 * 30; // 30 days
  const parts = [`${AUTH_COOKIE}=${signed}`, `Max-Age=${maxAge}`, 'HttpOnly', `Path=/`, 'SameSite=Lax'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearTempAuthCookieHeader(secure = true) {
  const parts = [`${TEMP_COOKIE}=deleted`, 'Max-Age=0', 'HttpOnly', `Path=/`, 'SameSite=Lax'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function clearAuthSessionCookieHeader(secure = true) {
  const parts = [`${AUTH_COOKIE}=deleted`, 'Max-Age=0', 'HttpOnly', `Path=/`, 'SameSite=Lax'];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function readSignedCookieFromHeader(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';').map((s) => s.trim());
  for (const p of parts) {
    if (p.startsWith(name + '=')) return p.slice(name.length + 1);
  }
  return null;
}

export { TEMP_COOKIE, AUTH_COOKIE };
