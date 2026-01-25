# Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_URL` | API endpoint URL | `https://api.bycar.in.ua` |
| `CDN_URL` | CDN endpoint URL | `https://cdn.bycar.in.ua` |
| `GITHUB_TOKEN` | GitHub token for private packages | - |

## Optional Variables

### Analytics

| Variable | Description |
|----------|-------------|
| `GTAG_ID` | Google Analytics tag ID |
| `META_PIXEL_ID` | Meta (Facebook) Pixel ID |
| `SENTRY_DSN` | Sentry error tracking DSN |

### YouTube Integration

| Variable | Description |
|----------|-------------|
| `BYCAR_CHANNEL_ID` | ByCar YouTube channel ID |
| `YOUTUBE_API_KEY` | YouTube Data API key |

### Telegram Bot

| Variable | Description |
|----------|-------------|
| `TG_BOT_TOKEN` | Telegram bot token |
| `TG_LEADS_CHANNEL_ID` | Channel ID for leads notifications |

### Application

| Variable | Description | Default |
|----------|-------------|---------|
| `STAGE` | Environment stage | `production` |
