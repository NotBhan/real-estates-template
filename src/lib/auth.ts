/**
 * Admin Authentication & Session Utilities
 * Demo credentials: admin / admin123
 */

export const ADMIN_COOKIE_NAME = 'admin_session';

export function validateCredentials(username?: string, password?: string): boolean {
  return username === 'admin' && password === 'admin123';
}

export function isAuthenticated(cookies: any): boolean {
  const session = cookies.get(ADMIN_COOKIE_NAME)?.value;
  return session === 'authenticated';
}

export function setSession(cookies: any): void {
  cookies.set(ADMIN_COOKIE_NAME, 'authenticated', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSession(cookies: any): void {
  cookies.delete(ADMIN_COOKIE_NAME, { path: '/' });
}
