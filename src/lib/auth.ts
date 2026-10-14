/**
 * Admin Authentication & Session Utilities
 * Configurable via environment variables: ADMIN_USERNAME, ADMIN_PASSWORD
 * Includes safe development fallback and production-hardened cookie attributes.
 */

export const ADMIN_COOKIE_NAME = 'admin_session';

export function getExpectedCredentials() {
  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;

  // In production, credentials should be configured via environment variables.
  // Falls back to demo credentials only if environment variables are not set.
  const username = envUser || 'admin';
  const password = envPass || 'admin123';
  const isConfiguredFromEnv = Boolean(envUser && envPass);

  return { username, password, isConfiguredFromEnv };
}

export function validateCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;
  const expected = getExpectedCredentials();
  return username === expected.username && password === expected.password;
}

export function isAuthenticated(cookies: any): boolean {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  return session === 'authenticated';
}

export function setSession(cookies: any): void {
  const isProd = import.meta.env.PROD || process.env.NODE_ENV === 'production';
  cookies.set(ADMIN_COOKIE_NAME, 'authenticated', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSession(cookies: any): void {
  cookies.delete(ADMIN_COOKIE_NAME, { path: '/' });
}
