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

<!-- BEGIN BEADS INTEGRATION -->
## Issue Tracking with bd (beads)

**IMPORTANT**: This project uses **bd (beads)** for ALL issue tracking. Do NOT use markdown TODOs, task lists, or other tracking methods.

### Why bd?

- Dependency-aware: Track blockers and relationships between issues
- Git-friendly: Dolt-powered version control with native sync
- Agent-optimized: JSON output, ready work detection, discovered-from links
- Prevents duplicate tracking systems and confusion

### Quick Start

**Check for ready work:**

```bash
bd ready --json
```

**Create new issues:**

```bash
bd create "Issue title" --description="Detailed context" -t bug|feature|task -p 0-4 --json
bd create "Issue title" --description="What this issue is about" -p 1 --deps discovered-from:bd-123 --json
```

**Claim and update:**

```bash
bd update <id> --claim --json
bd update bd-42 --priority 1 --json
```

**Complete work:**

```bash
bd close bd-42 --reason "Completed" --json
```

### Issue Types

- `bug` - Something broken
- `feature` - New functionality
- `task` - Work item (tests, docs, refactoring)
- `epic` - Large feature with subtasks
- `chore` - Maintenance (dependencies, tooling)

### Priorities

- `0` - Critical (security, data loss, broken builds)
- `1` - High (major features, important bugs)
- `2` - Medium (default, nice-to-have)
- `3` - Low (polish, optimization)
- `4` - Backlog (future ideas)

### Workflow for AI Agents

1. **Check ready work**: `bd ready` shows unblocked issues
2. **Claim your task atomically**: `bd update <id> --claim`
3. **Work on it**: Implement, test, document
4. **Discover new work?** Create linked issue:
   - `bd create "Found bug" --description="Details about what was found" -p 1 --deps discovered-from:<parent-id>`
5. **Complete**: `bd close <id> --reason "Done"`

### Auto-Sync

bd automatically syncs via Dolt:

- Each write auto-commits to Dolt history
- Use `bd dolt push`/`bd dolt pull` for remote sync
- No manual export/import needed!

### Important Rules

- ✅ Use bd for ALL task tracking
- ✅ Always use `--json` flag for programmatic use
- ✅ Link discovered work with `discovered-from` dependencies
- ✅ Check `bd ready` before asking "what should I work on?"
- ❌ Do NOT create markdown TODO lists
- ❌ Do NOT use external issue trackers
- ❌ Do NOT duplicate tracking systems

For more details, see README.md and docs/QUICKSTART.md.

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

<!-- END BEADS INTEGRATION -->
