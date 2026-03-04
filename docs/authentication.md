# Authentication Architecture

## Overview

This document describes the authentication approach for the Bycar website, a Nuxt SSR application that communicates with a serverless backend API using `nuxt-auth-utils` for session management.

## The Challenge

We faced a common problem when migrating from a monolith to serverless:

| Requirement | Constraint |
|-------------|------------|
| Serverless API uses Bearer tokens only | No cookie management on backend |
| Nuxt SSR needs authenticated requests | Server must have access to tokens |
| Users should access `/profile` directly | No client-side redirect dance |
| SSR cookie propagation issues | Internal API calls don't share cookies |

### The SSR Cookie Problem

During SSR, when `$fetch('/api/auth')` makes an internal request to a server route, it creates a **synthetic internal event** that doesn't share the same request/response context as the main SSR request. Cookies set via `setCookie()` in these internal handlers do NOT propagate to the browser.

This means token refresh during SSR internal calls would fail silently.

## Solution: `nuxt-auth-utils` with Reactive Refresh

We use `nuxt-auth-utils` to store user identity and tokens in an **encrypted session cookie**. The key insight is:

1. **During SSR**: Trust the session state (user identity is cached in the encrypted cookie)
2. **During client-side**: Let API calls trigger token refresh naturally when needed

This works because:
- The session cookie is encrypted and secure - only our server can read/write it
- User identity is cached at login time and remains valid until logout
- Client-side API calls have proper HTTP request/response context for cookie updates

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Encrypted Session Cookie                     │
├─────────────────────────────────────────────────────────────────┤
│  user: { id, email, phone, firstName, lastName }  ← Client-side │
│  secure: { accessToken, refreshToken }            ← Server-only │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                 │
│  ┌─────────────┐                              ┌──────────────┐  │
│  │ Auth Actions│                              │ Other API    │  │
│  │ (login,etc) │                              │ Calls        │  │
│  └──────┬──────┘                              └──────┬───────┘  │
│         │                                            │          │
│         │ POST /api/auth/login                       │          │
│         ▼                                            │          │
│  ┌─────────────────────┐                             │          │
│  │ Nuxt Server Routes  │                             │          │
│  │ setUserSession()    │                             │          │
│  └──────┬──────────────┘                             │          │
│         │                                            │          │
│         │ POST /auth/login                           │ Bearer   │
│         │ (credentials)                              │ from     │
│         ▼                                            │ session  │
│  ┌─────────────────────────────────────────────────┐ │          │
│  │              Backend API (Serverless)           │◄┘          │
│  │         Returns tokens in response body         │            │
│  └─────────────────────────────────────────────────┘            │
│                                                                 │
│  Session cookie (encrypted) ◄──── user + tokens                 │
└─────────────────────────────────────────────────────────────────┘
```

## Token Flow

### Login/Register

1. User submits credentials via UI
2. `useLoginForm` calls `$fetch('/api/auth/login', { body })`
3. Nuxt server route calls backend API with `defineResponseHandlerWithPublicAuth`
4. Backend returns `{ user, accessToken, refreshToken }`
5. Server calls `setUserSession(event, { user, secure: { accessToken, refreshToken } })`
6. Encrypted session cookie sent to browser
7. Client refreshes session state via `useUserSession().fetch()`

### SSR Page Load (Protected Route)

1. Browser sends encrypted session cookie
2. Auth middleware reads session via `useUserSession()`
3. If `loggedIn && user` → allow access (trust the session)
4. **No API calls during SSR** - avoids cookie propagation issues

### Client-Side API Call (with Token Refresh)

1. Component triggers authenticated API call
2. Server route reads tokens from `getUserSession(event).secure`
3. SDK makes request to backend with `Authorization: Bearer <token>`
4. If 401 → SDK automatically calls refresh endpoint
5. `onTokenRefresh` callback calls `replaceUserSession()` with new tokens
6. Original request retries with new token
7. Updated session cookie sent to browser

### Logout

1. Client calls `$fetch('/api/auth/logout')`
2. Server calls backend logout endpoint
3. Server calls `clearUserSession(event)`
4. Session cookie cleared

## Implementation

### Configuration (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }
  }
})
```

### Type Augmentation (`shared/types/auth.d.ts`)

```typescript
declare module '#auth-utils' {
  interface User {
    id: string
    email: string | null
    phone: string | null
    firstName: string | null
    lastName: string | null
  }
  interface SecureSessionData {
    accessToken: string
    refreshToken: string
  }
}
export {}
```

### Server Routes

| Route | Purpose |
|-------|---------|
| `layers/profile/server/api/auth/login.post.ts` | Login, creates session |
| `layers/profile/server/api/auth/register.post.ts` | Register, creates session |
| `layers/profile/server/api/auth/logout.get.ts` | Logout, clears session |
| `layers/profile/server/api/auth/profile.get.ts` | Get profile (triggers refresh if needed) |

### Auth Service Handler (`layers/profile/server/utils/auth-service-handler.ts`)

Two helper functions for creating API handlers:

- **`defineResponseHandlerWithAuth`** - For authenticated endpoints. Reads tokens from session, configures SDK with `onTokenRefresh` callback.
- **`defineResponseHandlerWithPublicAuth`** - For login/register. Uses unauthenticated SDK client.

### Auth Middleware (`layers/profile/middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn, user, fetch: fetchSession } = useUserSession();

  // Trust session during SSR - no API calls needed
  if (loggedIn.value && user.value) {
    return true;
  }

  // Client-side: try fetching session if not loaded
  if (!loggedIn.value) {
    await fetchSession();
    if (loggedIn.value && user.value) {
      return true;
    }
  }

  // Redirect to login
  return navigateTo({ ... });
});
```

### Auth Store (`layers/profile/stores/auth.ts`)

Wraps `useUserSession()` with additional functionality:

```typescript
const { loggedIn, user, clear, fetch: fetchSession } = useUserSession();

// Exposes: user, userId, name, authenticated, loggedIn
// Methods: login(), logout(), setUser(), fetchSession()
```

## Security Considerations

| Aspect | Implementation |
|--------|----------------|
| XSS Protection | Tokens in `secure` field (never exposed to client JS) |
| Cookie Security | Encrypted session cookie via nuxt-auth-utils |
| Secure Transport | HTTPS only in production |
| Token Expiry | Access (1h), Refresh (7d), Session (7d) |

## Environment Variables

```bash
NUXT_SESSION_PASSWORD=minimum-32-character-secret-key
```

## Related Files

- [auth-service-handler.ts](../layers/profile/server/utils/auth-service-handler.ts) - SDK integration with session
- [auth.ts](../layers/profile/stores/auth.ts) - Auth state management
- [auth.ts](../layers/profile/middleware/auth.ts) - Route protection
- [auth.d.ts](../shared/types/auth.d.ts) - Session type augmentation
- [auth-refactor-summary.md](../auth-refactor-summary.md) - Detailed refactor notes
