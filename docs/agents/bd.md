# bd (beads) — Issue Tracking

bd is a local-first, dependency-aware issue tracker. Use it when the user asks you to track work with bd.

Run `bd prime` for workflow context.

**Quick reference:**
- `bd ready` - Find unblocked work
- `bd create "Title" --type task --priority 2` - Create issue
- `bd close <id>` - Complete work
- `bd dolt push` - Push beads to remote

**Dependency direction (CRITICAL — easy to get wrong):**
`--deps <id>` means "this new task **depends on** (is blocked by) `<id>`".
`bd dep A --blocks B` means "A must finish before B can start".
When task ordering is Phase 1 → Phase 2 → Phase 3:
- Phase 2 `--deps Phase1-id` (Phase 2 depends on Phase 1) ✓
- Phase 1 `--deps Phase2-id` ✗ WRONG — this reverses the chain
Always verify with `bd ready` after creating tasks — only the **first** task in the chain should appear.

For full workflow details: `bd prime`
