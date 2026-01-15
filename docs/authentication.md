# Authentication Architecture

## Overview

This document describes the authentication approach for the Bycar website, a Nuxt SSR application that communicates with a serverless backend API.

## The Challenge

We faced a common problem when migrating from a monolith to serverless:

| Requirement | Constraint |
|-------------|------------|
| Serverless API uses Bearer tokens only | No cookie management on backend |
| Nuxt SSR needs authenticated requests | Server must have access to tokens |
| Users should access `/profile` directly | No client-side redirect dance |
| Other apps (admin, dealer) are SPA-only | They can use localStorage |

## Options Considered

### Option 1: localStorage (Rejected)

```
User → Browser localStorage → Client-side API calls
```

**Why it doesn't work:** localStorage is not available during SSR. When a user navigates directly to `/profile`, the server cannot authenticate the request, resulting in:
- Redirect to login, then back to profile (poor UX)
- Or rendering unauthenticated content, then hydrating (flash of content)

### Option 2: Full API Proxy (Rejected)

```
User → Nuxt Server Routes → Backend API (all calls)
```

**Why we rejected it:**
- Duplicates every API endpoint
- Adds latency to all requests
- Unnecessary complexity
- Backend already handles auth validation

### Option 3: Minimal Auth Proxy (Chosen)

```
Auth calls:  User → Nuxt Server Routes → Backend API → Set cookies
Other calls: User → Backend API directly (Bearer from cookie)
```

**Why this works:**
- Only 4 server routes (login, register, logout, refresh)
- Cookies are httpOnly and secure
- SSR has access to tokens via request cookies
- All other API calls bypass the proxy
- Admin/dealer apps unaffected (use localStorage)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  ┌─────────────┐                              ┌──────────────┐  │
│  │ Auth Actions│                              │ Other API    │  │
│  │ (login,etc) │                              │ Calls        │  │
│  └──────┬──────┘                              └──────┬───────┘  │
│         │                                            │          │
│         │ POST /api/auth/login                       │          │
│         ▼                                            │          │
│  ┌─────────────────────┐                             │          │
│  │ Nuxt Server Routes  │                             │          │
│  │ (cookie management) │                             │          │
│  └──────┬──────────────┘                             │          │
│         │                                            │          │
│         │ POST /auth/login                           │ Bearer   │
│         │ (Bearer token)                             │ token    │
│         ▼                                            │ from     │
│  ┌─────────────────────────────────────────────────┐ │ cookie   │
│  │              Backend API (Serverless)           │◄┘          │
│  │         Returns tokens in response body         │            │
│  └─────────────────────────────────────────────────┘            │
│                                                                  │
│  Nuxt sets httpOnly cookies ◄──── tokens ────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

## Token Flow

### Login/Register

1. User submits credentials via UI
2. `useLoginForm` calls `$fetch('/api/auth/login', { body })`
3. Nuxt server route calls backend API
4. Backend returns `{ user, accessToken, refreshToken }`
5. Nuxt server route sets httpOnly cookies
6. Response returns user data to client
7. Cookies stored in browser

### Authenticated Request (Client)

1. SDK reads token from `document.cookie`
2. Adds `Authorization: Bearer <token>` header
3. Calls backend API directly

### Authenticated Request (SSR)

1. Browser sends cookies with request
2. Nuxt reads token from `req.headers.cookie`
3. SDK adds `Authorization: Bearer <token>` header
4. Calls backend API directly

### Token Refresh

1. SDK interceptor catches 401
2. Calls `/api/auth/refresh` with refresh token
3. Nuxt server route calls backend
4. New tokens returned, cookies updated
5. Original request retried

## Implementation

### Server Routes

| Route | Purpose |
|-------|---------|
| `server/api/auth/login.post.ts` | Proxy login, set cookies |
| `server/api/auth/register.post.ts` | Proxy register, set cookies |
| `server/api/auth/logout.post.ts` | Clear cookies |
| `server/api/auth/refresh.get.ts` | Proxy refresh, update cookies |

### Cookie Configuration

```typescript
// server/utils/auth-cookies.ts
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/'
} as const;

export const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
```

### Unchanged Components

- `app/composables/useAuthService.ts` - TokenResolver still reads cookies
- `@bycar-in-ua/sdk` - SDK unchanged, works with Bearer tokens
- Admin/Dealer apps - Continue using localStorage

## Security Considerations

| Aspect | Implementation |
|--------|----------------|
| XSS Protection | Tokens in httpOnly cookies (not accessible via JS) |
| CSRF Protection | SameSite=lax + Nuxt's built-in CSRF |
| Secure Transport | Secure flag ensures HTTPS only |
| Token Expiry | Short-lived access (1h), longer refresh (7d) |

## Trade-offs

### Pros
- SSR works with authentication
- Minimal code duplication (4 routes)
- Secure cookie storage
- Other apps unaffected
- SDK remains unchanged

### Cons
- Slight added complexity vs pure localStorage
- Auth requests have extra hop through Nuxt
- Must maintain cookie config in sync with backend

## Related Files

- [useAuthService.ts](../app/composables/useAuthService.ts) - Token resolution
- [auth.ts](../layers/profile/stores/auth.ts) - Auth state management
- [useLoginForm.ts](../layers/profile/composables/useLoginForm.ts) - Login flow
