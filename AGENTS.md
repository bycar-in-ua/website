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
- Translations are maintained directly in i18n/i18n.config.ts.

## Styling

- Global styles are in app/assets/css/global.css.
- Theme tokens are imported from @bycar/theme.
- Tailwind content sources include app and layers folders.


## Documentation Index

- [Backend Access and SDKs](docs/agents/data-access.md)
- [Frontend UI and Design](docs/agents/frontend-ui.md)
- [Integrations and Infra](docs/agents/integrations.md)
- [Task Workflow](docs/agents/workflow.md)
- [bd (beads) Issue Tracking](docs/agents/bd.md)
- [Authentication Architecture](docs/authentication.md)

## Critical Rules (Quick Read)

- Do not overuse comments or comment obvious code.
- Prefer Nuxt UI global configuration in app/app.config.ts over per-component ui overrides.
- If UI requirements are unclear, ask for Figma references before implementing.
- Use the SDK-based composables for backend access; avoid ad-hoc fetch calls.
- Follow the workflow in docs/agents/workflow.md and never commit without approval.

## Issue Tracking

The project may use **bd (beads)** or **Jira** for issue tracking, depending on the session. Use whichever the user asks for; if neither is mentioned, don't force one.

- **bd** — local-first, dependency-aware tracker. See [docs/agents/bd.md](docs/agents/bd.md) for full reference.
- **Jira** — used via MCP. Follow standard Jira workflows when asked.

## Session Completion

When ending a work session:

1. **File issues for remaining work** — in whichever tracker is active, or just mention them in the handoff.
2. **Run quality gates** (if code changed) — tests, linters, builds.
3. **Update issue status** — close finished work, update in-progress items.
4. **Push to remote**:
   ```bash
   git pull --rebase
   git push
   git status  # should show "up to date with origin"
   ```
5. **Clean up** — clear stashes, prune remote branches.
6. **Hand off** — provide context for the next session.
