import type { H3Event } from "h3";

/**
 * Base cookie configuration for auth cookies
 * - httpOnly: Prevents client-side JavaScript access (XSS protection)
 * - secure: Ensures cookies are only sent over HTTPS
 * - sameSite: Prevents CSRF attacks
 * - path: Cookie available across entire site
 */
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
} as const;

/**
 * Access token expiration time in seconds (1 hour)
 */
export const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour

/**
 * Refresh token expiration time in seconds (7 days)
 */
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Cookie names for auth tokens
 */
export const ACCESS_TOKEN_COOKIE = "bycar-access-token";
export const REFRESH_TOKEN_COOKIE = "bycar-refresh-token";

/**
 * Sets the access token cookie with appropriate security settings
 */
export function setAccessTokenCookie(event: H3Event, token: string) {
  setCookie(event, ACCESS_TOKEN_COOKIE, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
}

/**
 * Sets the refresh token cookie with appropriate security settings
 */
export function setRefreshTokenCookie(event: H3Event, token: string) {
  setCookie(event, REFRESH_TOKEN_COOKIE, token, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

/**
 * Sets both access and refresh token cookies
 */
export function setAuthCookies(
  event: H3Event,
  tokens: { accessToken: string;
    refreshToken: string; },
) {
  setAccessTokenCookie(event, tokens.accessToken);
  setRefreshTokenCookie(event, tokens.refreshToken);
}

/**
 * Clears all auth cookies (used for logout)
 */
export function clearAuthCookies(event: H3Event) {
  deleteCookie(event, ACCESS_TOKEN_COOKIE);
  deleteCookie(event, REFRESH_TOKEN_COOKIE);
}
