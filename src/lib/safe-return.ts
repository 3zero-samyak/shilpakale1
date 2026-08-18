// Server-only helpers to validate internal returnTo paths
export function isSafeReturnTo(path: string | null | undefined) {
  if (!path) return false;
  // Must start with a single '/'
  if (!path.startsWith('/')) return false;
  // Disallow protocol-like or double-slash patterns
  if (/^\/\//.test(path)) return false;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(path)) return false; // scheme:
  if (/\\\\/.test(path)) return false; // backslashes
  // Prevent absolute URLs
  try {
    const u = new URL(path, 'https://example.invalid');
    // If origin differs and path contained a scheme, reject
    if (u.origin !== 'https://example.invalid' && path.includes('://')) return false;
  } catch {
    return false;
  }
  return true;
}

export function sanitizeReturnTo(raw: string | null | undefined) {
  if (!raw) return '/account';
  if (isSafeReturnTo(raw)) return raw;
  // As a fallback, if raw had query components but began with '/', attempt to keep only the path+query
  try {
    const url = new URL(raw, 'https://example.invalid');
    const candidate = url.pathname + (url.search || '');
    if (isSafeReturnTo(candidate)) return candidate;
  } catch {}
  return '/account';
}
