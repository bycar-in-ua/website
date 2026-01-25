# Agent Instructions

This document provides comprehensive context and instructions for AI agents working on this project.

## Project Context

This is the **ByCar** website - a Ukrainian automotive platform built with modern web technologies. The project uses:

- **Framework**: Nuxt 4 (Vue.js 3)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Nuxt UI components
- **State Management**: Pinia
- **Internationalization**: Nuxt i18n (Ukrainian as default)
- **Package Manager**: pnpm

### Project Structure

```
├── app/                    # Main application code
│   ├── components/         # Vue components
│   ├── composables/        # Vue composables (hooks)
│   ├── pages/              # File-based routing pages
│   ├── stores/             # Pinia stores
│   └── utils/              # Utility functions
├── layers/                 # Nuxt layers for modular features
│   ├── profile/            # User profile layer
│   └── quiz/               # Quiz feature layer
├── server/                 # Server API routes
├── shared/                 # Shared utilities and types
├── docs/                   # Project documentation
└── i18n/                   # Internationalization files
```

## Main Goal

The ByCar platform aims to integrate prediction market capabilities using platforms like **Polymarket** and **Kalshi** into its automotive ecosystem. This integration will allow users to engage with prediction markets related to automotive trends, car prices, market movements, and other relevant forecasts.

## About Prediction Markets

### Polymarket

**Polymarket** is a decentralized prediction market platform built on the **Polygon** blockchain. Key information:

- **Website**: https://polymarket.com
- **Documentation**: https://docs.polymarket.com
- **API Documentation**: https://docs.polymarket.com/#api
- **GitHub**: https://github.com/Polymarket

**Key Features:**
- Crypto-based prediction markets
- Real-money trading on outcomes
- Decentralized infrastructure
- Wide variety of market categories

**How to Pull Documentation:**
1. Visit the official docs at https://docs.polymarket.com
2. API reference is available at https://docs.polymarket.com/#api
3. Check their GitHub repositories for SDK and integration examples

### Kalshi

**Kalshi** is a US-regulated prediction market exchange (CFTC-regulated). Key information:

- **Website**: https://kalshi.com
- **Documentation**: https://trading-api.readme.io/reference/getting-started
- **API Documentation**: https://trading-api.readme.io/
- **Blog/Research**: https://kalshi.com/blog

**Key Features:**
- Regulated in the United States
- Event-based contracts
- Real-money trading
- Professional trading interface

**How to Pull Documentation:**
1. Visit the Trading API docs at https://trading-api.readme.io/
2. Getting started guide: https://trading-api.readme.io/reference/getting-started
3. Check their developer portal for integration examples

## Documentation Guidelines

### Where to Find and Update Docs

1. **Project Documentation**: `/docs/` directory
   - `PROJECT.md` - Main project overview and architecture
   - Feature-specific documentation as needed

2. **Agent Instructions**: `.github/agents/` directory
   - `agents.md` - This file with agent context and instructions

3. **Code Documentation**:
   - Use JSDoc comments for TypeScript functions
   - Add inline comments for complex logic

### Updating Documentation After Changes

**IMPORTANT**: Agents MUST update documentation after making significant changes.

#### When to Update Documentation

Update docs after:
- Adding new features or components
- Modifying API integrations
- Changing project architecture
- Adding new dependencies
- Updating configuration
- Fixing significant bugs that change behavior

#### How to Update Documentation

1. **After adding a new feature**:
   - Add feature description to `/docs/PROJECT.md`
   - Update this file if it affects agent context

2. **After modifying API integrations**:
   - Update relevant sections in this file
   - Document any new endpoints or parameters

3. **After architecture changes**:
   - Update the project structure section
   - Document the reasoning for changes

4. **Commit message format**:
   Include `[docs]` prefix when updating documentation:
   ```
   [docs] Update API integration documentation
   ```

## Development Guidelines

### Running the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix
```

### Code Style

- Follow ESLint configuration (stylistic rules enabled)
- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns
- Use Pinia for state management

### Testing

When implementing new features:
1. Write tests if test infrastructure exists
2. Manually verify functionality
3. Check for TypeScript errors
4. Run linting before committing

## Agent Checklist

Before completing any task, ensure:

- [ ] Code follows project conventions
- [ ] TypeScript types are properly defined
- [ ] Linting passes (`pnpm lint`)
- [ ] Documentation is updated for significant changes
- [ ] Changes are properly committed

## Additional Resources

### External APIs and Services

- **Sentry**: Error tracking and monitoring
- **Google Analytics**: Web analytics (via nuxt-gtag)
- **Meta Pixel**: Facebook/Meta tracking
- **Telegram Bot**: Lead notifications (grammy library)

### Useful Links

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Nuxt UI Documentation](https://ui.nuxt.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
