# Integrations and Infra

## Analytics and Monitoring

- Sentry is configured in sentry.client.config.ts and sentry.server.config.ts.
- Google Analytics uses nuxt-gtag with GTAG_ID.
- Meta Pixel is wired via nuxt-meta-pixel with META_PIXEL_ID.

## SEO and Robots

- Sitemap is generated from server/api/__sitemap__/urls.ts.
- Robots behavior is controlled in nuxt.config.ts via STAGE.

## Third-Party APIs

- YouTube API is used in server/api/homepage-data.get.ts. Requires YOUTUBE_API_KEY and BYCAR_CHANNEL_ID.
- Telegram bot is used in server/api/contact-form.post.ts. Requires TG_BOT_TOKEN and TG_LEADS_CHANNEL_ID.

## Fonts

- nuxt/fonts is enabled and configured in nuxt.config.ts (Google provider).
