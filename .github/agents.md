# AI Agent Instructions

This document provides instructions and context for AI agents (Copilot, Claude, etc.) working on this repository.

## Project Context

**Repository**: bycar-in-ua/website  
**Project Name**: bycar-website  
**Framework**: Nuxt 3 (Vue 3 + TypeScript)  
**Package Manager**: pnpm

This is a web application that integrates with prediction market platforms (Polymarket and Kalshi) to provide market-based insights and data.

## Main Goal

The primary goal of this project is to build and maintain a comprehensive prediction market aggregation platform that:
1. Fetches and displays data from multiple prediction market sources
2. Provides a unified interface for users to explore market data
3. Maintains high code quality and documentation standards

## Documentation Locations

### Project Documentation

All documentation is located in the `docs/` directory:

- **`docs/PROJECT.md`**: Main project context, structure, and getting started guide
- **`docs/POLYMARKET.md`**: Polymarket integration documentation and API reference links
- **`docs/KALSHI.md`**: Kalshi integration documentation and API reference links

### External Documentation Sources

When working on prediction market integrations, reference these official sources:

#### Polymarket
- **Official Docs**: [https://docs.polymarket.com](https://docs.polymarket.com)
- **API Reference**: [https://docs.polymarket.com/#api](https://docs.polymarket.com/#api)
- **GitHub**: [https://github.com/Polymarket](https://github.com/Polymarket)

#### Kalshi
- **Official Docs**: [https://kalshi.com/docs](https://kalshi.com/docs)
- **API Reference**: [https://trading-api.readme.io/reference](https://trading-api.readme.io/reference)
- **Developer Portal**: [https://kalshi.com/developers](https://kalshi.com/developers)

## Coding Standards

### Technology Guidelines

- Use TypeScript for all new code
- Follow Vue 3 Composition API patterns with `<script setup>`
- Use Pinia for state management
- Use composables for reusable logic
- Follow existing ESLint configuration (`pnpm lint`)

### File Organization

- Components go in `app/components/`
- Pages go in `app/pages/`
- Composables go in `app/composables/`
- Stores go in `app/stores/`
- API routes go in `server/api/`
- Shared types go in `shared/`

## Critical Instructions for Agents

### Always Update Documentation

**IMPORTANT**: After making significant changes to the codebase, you MUST update the relevant documentation:

1. **For feature additions**: Update `docs/PROJECT.md` with new features or architectural changes
2. **For Polymarket changes**: Update `docs/POLYMARKET.md` with any new integration patterns, endpoints used, or important notes
3. **For Kalshi changes**: Update `docs/KALSHI.md` with any new integration patterns, endpoints used, or important notes
4. **For API changes**: Document new or modified API endpoints
5. **For dependency changes**: Note any significant new dependencies and their purpose

### Before Making Changes

1. Read relevant documentation in `docs/` directory
2. Understand the existing code patterns by exploring similar files
3. Run `pnpm lint` to understand the code style
4. Check for existing tests in similar areas

### After Making Changes

1. Run `pnpm lint:fix` to fix any linting issues
2. Test your changes locally with `pnpm dev`
3. Update documentation as described above
4. Ensure your changes don't break existing functionality

### Working with External APIs

When implementing or modifying Polymarket/Kalshi integrations:

1. **Check official docs first**: Always verify current API specifications
2. **Handle errors gracefully**: Implement proper error handling and retries
3. **Respect rate limits**: Implement appropriate rate limiting and caching
4. **Secure credentials**: Never commit API keys; use environment variables
5. **Document changes**: Update the relevant documentation file

## Environment Setup

Required environment variables (see `.env.example`):

```bash
# Add API credentials as needed
POLYMARKET_API_KEY=
KALSHI_API_KEY=
KALSHI_PRIVATE_KEY=
```

## Common Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Linting
pnpm lint
pnpm lint:fix
```

## Getting Help

If you need more context:
1. Review the documentation in `docs/`
2. Check the official Nuxt 3 docs: https://nuxt.com/docs
3. Review existing code patterns in the repository
4. Check the external API documentation for Polymarket/Kalshi
