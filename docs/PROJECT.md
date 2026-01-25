# Project Context and Overview

## About This Project

**bycar-website** is a web application built with Nuxt 3 that serves as the main website for the ByCar platform. The project uses modern web technologies including Vue 3, TypeScript, Tailwind CSS, and Pinia for state management.

## Main Goal

The primary goal of this project is to provide a comprehensive, user-friendly platform for the ByCar service. The platform integrates with prediction markets (Polymarket and Kalshi) to provide market-based insights and data.

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with @nuxt/ui
- **State Management**: Pinia
- **Internationalization**: @nuxtjs/i18n
- **Error Tracking**: Sentry
- **Package Manager**: pnpm

## Project Structure

```
website/
├── app/                    # Main application directory
│   ├── components/         # Vue components
│   ├── composables/        # Vue composables
│   ├── pages/              # Route pages
│   ├── stores/             # Pinia stores
│   └── utils/              # Utility functions
├── docs/                   # Project documentation
├── i18n/                   # Internationalization files
├── layers/                 # Nuxt layers
├── public/                 # Static assets
├── server/                 # Server-side code
│   └── api/                # API routes
└── shared/                 # Shared types and utilities
```

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Linting

```bash
pnpm lint
pnpm lint:fix
```

## External Integrations

### Prediction Markets

This project integrates with prediction market platforms to provide real-time market data and insights:

- **Polymarket**: See [docs/POLYMARKET.md](./POLYMARKET.md) for integration details
- **Kalshi**: See [docs/KALSHI.md](./KALSHI.md) for integration details

## Documentation Updates

**Important**: All documentation should be kept up to date. When making significant changes to the codebase:

1. Update relevant documentation files in the `docs/` directory
2. Ensure API documentation is current
3. Update the README.md if the change affects setup or usage
4. Document any new integrations or features

## Related Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)
