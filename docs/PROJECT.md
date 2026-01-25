# ByCar Project Documentation

## Overview

ByCar is a Ukrainian automotive platform designed to provide comprehensive car-related services. The platform is built with modern web technologies and aims to integrate prediction market capabilities for automotive-related forecasts.

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Nuxt 4 | Full-stack Vue.js framework |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first CSS framework |
| Nuxt UI | UI component library |
| Pinia | State management |
| Nuxt i18n | Internationalization |
| Sentry | Error tracking |
| pnpm | Package manager |

## Architecture

### Application Layers

The project uses Nuxt's layer system for modular organization:

1. **Main Application** (`/app`)
   - Core website functionality
   - Shared components and utilities

2. **Profile Layer** (`/layers/profile`)
   - User profile management
   - Authentication-related features

3. **Quiz Layer** (`/layers/quiz`)
   - Interactive quiz functionality
   - User engagement features

### Server-Side

- API routes in `/server/api`
- Server middleware and utilities

### Shared Code

- Common types and utilities in `/shared`

## Feature Documentation

### Prediction Markets Integration

The platform plans to integrate prediction market functionality using:

- **Polymarket**: Decentralized, crypto-based prediction markets
- **Kalshi**: US-regulated prediction market exchange

See `.github/agents/agents.md` for detailed API documentation links.

### Internationalization

- Default locale: Ukrainian (`ua`)
- Strategy: No URL prefix
- Translation files: `/i18n` directory

### Analytics & Tracking

- Google Analytics (gtag)
- Meta Pixel
- Sentry for error tracking

## Development

### Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Install dependencies: `pnpm install`
4. Start development server: `pnpm dev`

### Key Commands

```bash
pnpm dev        # Start development server (port 4000)
pnpm build      # Production build
pnpm lint       # Check code style
pnpm lint:fix   # Auto-fix code style issues
```

### Environment Variables

Key environment variables (see `.env.example`):

- `API_URL`: Backend API endpoint
- `CDN_URL`: CDN host for assets
- `SENTRY_DSN`: Sentry error tracking
- `GTAG_ID`: Google Analytics ID
- `META_PIXEL_ID`: Meta/Facebook Pixel ID
- `TG_BOT_TOKEN`: Telegram bot token for notifications

## Contributing

### Documentation Updates

When making significant changes:

1. Update relevant documentation in `/docs`
2. Update agent context in `.github/agents/agents.md` if needed
3. Use `[docs]` prefix in commit messages for doc changes

### Code Conventions

- Follow ESLint stylistic rules
- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Keep components small and focused

## Roadmap

- [ ] Prediction market integration (Polymarket/Kalshi)
- [ ] Enhanced user engagement features
- [ ] Expanded automotive data services

## Changelog

### v1.3.0 (Current)
- Initial project setup with Nuxt 4
- Profile and quiz layers
- Core automotive platform features
