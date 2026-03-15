# bd (beads) — Issue Tracking

bd is a local-first, dependency-aware issue tracker. Use it when the user asks you to track work with bd.

## Quick Start

**Dependency direction (easy to get wrong):**
`bd dep add <blocked> <blocker>` — the first arg is the issue that WAITS, the second is what it waits FOR.
Example: if B can't start until A is done → `bd dep add B A` (A blocks B).

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

## Issue Types

- `bug` — Something broken
- `feature` — New functionality
- `task` — Work item (tests, docs, refactoring)
- `epic` — Large feature with subtasks
- `chore` — Maintenance (dependencies, tooling)

## Priorities

- `0` — Critical (security, data loss, broken builds)
- `1` — High (major features, important bugs)
- `2` — Medium (default)
- `3` — Low (polish, optimization)
- `4` — Backlog (future ideas)

## Agent Workflow

1. **Check ready work**: `bd ready` shows unblocked issues
2. **Claim the task**: `bd update <id> --claim`
3. **Work on it**: Implement, test, document
4. **Discover new work?** Create a linked issue:
   - `bd create "Found bug" --description="Details" -p 1 --deps discovered-from:<parent-id>`
5. **Complete**: `bd close <id> --reason "Done"`

## Sync

bd uses Dolt for version control:

- Each write auto-commits to Dolt history
- Use `bd dolt push` / `bd dolt pull` for remote sync
- Do not run `bd sync` unless the user explicitly asks

## Tips

- Use `--json` flag for programmatic output
- Link discovered work with `discovered-from` dependencies
- Check `bd ready` before asking "what should I work on?"
