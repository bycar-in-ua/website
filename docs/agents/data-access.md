# Backend Access and SDKs

The app integrates with a cloud backend via SDKs. Prefer SDK clients over raw fetch to keep auth, types, and retries consistent.

## SDKs in Use

- @bycar-in-ua/sdk for core public services and types - deprecated, should not be used to access new entities.
- @bycar-in-ua/vehicles-sdk for vehicle search and filters.
- @bycar-in-ua/auth-sdk for authentication and token refresh.

## Client-Side Service Composables

These are the preferred entry points for SDK usage:

- app/composables/useVehiclesService.ts uses vehiclesApiHost and getBycarFetchClient.
- app/composables/useBrandService.ts uses brandsApiHost and getBycarFetchClient.
- layers/auth/composables/useAuthService.ts uses authApiHost and session tokens.

Create new SDK usage behind a composable so it is cached and consistent.

## Server-Side Auth and Session

- Server auth uses layers/auth/server/utils/get-auth-service.ts.
- Tokens are stored in the user session (see docs/authentication.md).
- Token refresh updates the session via replaceUserSession.

If you add new server endpoints that require auth, reuse getAuthService instead of rebuilding token logic.

## Server API Routes

- server/api/homepage-data.get.ts aggregates homepage data and YouTube videos.
- server/api/contact-form.post.ts sends leads to Telegram via a bot token.
- server/api/__sitemap__/urls.ts builds sitemap entries via VehiclePublicService.

These routes use useRuntimeConfig(event) and should not access process.env directly unless there is no runtimeConfig field.

## Runtime Config Keys

Public runtime config used by SDKs and services:

- public.apiHost
- public.vehiclesApiHost
- public.authApiHost
- public.cdnHost
- public.bycarChannelId
- public.tgBotToken
- public.tgLeadsChannelId
- youtubeApiKey (server)
