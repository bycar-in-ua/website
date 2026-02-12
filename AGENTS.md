# AI Agent Guide

This is the main entry point for agent documentation. Start here, then use the topic docs.

# Project Overview

This repo is a Nuxt 4 app with multiple layers (auth, profile, quiz) and SSR-first data flows.

## Structure at a Glance

- app/ for core UI, pages, stores, composables, and plugins.
- layers/ for feature slices: auth, profile, quiz.
- server/ for server API routes.
- shared/ for shared types and helpers.
- public/ for static assets.

## Entry Points and Global Configuration

- Nuxt config: nuxt.config.ts
- App config: app/app.config.ts
- App shell: app/app.vue

The app shell wraps everything in UApp and renders layout, header, footer, and global features.

## Data, State, and Caching

- Vue Query is configured with SSR hydrate/dehydrate in app/plugins/vue-query.ts.
- Pinia stores live in app/stores and layers/**/stores.
- Use composables for SDK access and shared logic under app/composables and layers/**/composables.

## Routing and Layers

- File-based routes are in app/pages and layers/**/pages.
- Auth protection is handled via middleware in layers/auth/middleware.
- The auth layer provides server routes under layers/auth/server.

## Localization

- Single locale (ua) is configured in i18n/i18n.config.ts.
- Translation seeds come from @bycar-in-ua/sdk and local overrides.

## Styling

- Global styles are in app/assets/css/global.css.
- Theme tokens are imported from @bycar/theme.
- Tailwind content sources include app and layers folders.


## Documentation Index

- [Backend Access and SDKs](docs/agents/data-access.md)
- [Frontend UI and Design](docs/agents/frontend-ui.md)
- [Integrations and Infra](docs/agents/integrations.md)
- [Task Workflow (bd)](docs/agents/workflow.md)
- [Authentication Architecture](docs/authentication.md)

## Critical Rules (Quick Read)

- Do not overuse comments or comment obvious code.
- Prefer Nuxt UI global configuration in app/app.config.ts over per-component ui overrides.
- If UI requirements are unclear, ask for Figma references before implementing.
- Use the SDK-based composables for backend access; avoid ad-hoc fetch calls.
- Follow the bd workflow in docs/agents/workflow.md and never commit without approval.
