# Agent Instructions

## Documentation

| Topic | File |
|-------|------|
| Authentication | [docs/authentication.md](docs/authentication.md) |

---

## Task Management (bd)

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
```

**IMPORTANT:** Do NOT use `bd sync` unless explicitly requested by the user. BD sync creates commits on the staging branch and should only be used when the user specifically asks for it.

### Change Workflow

**ALWAYS follow this workflow for any code changes:**

1. **Start the task** - Update issue status: `bd update <id> --status in_progress`
2. **Make the change** - Implement the requested modification
3. **Ask for review** - Present changes to user and ask for approval
4. **Wait for approval** - Do NOT commit until user explicitly approves
5. **After approval, complete the task:**
   ```bash
   bd close <id>        # Close the task
   git add .
   git commit -m "..."
   git push
   ```

**NEVER commit or push changes without explicit user approval.**

### Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **Ask for final review** - Present all changes and get user approval
5. **PUSH TO REMOTE** - After approval, this is MANDATORY:
   ```bash
   git add .
   git commit -m "..."
   git push
   git status           # MUST show "up to date with origin"
   ```
6. **Clean up** - Clear stashes, prune remote branches
7. **Verify** - All changes committed AND pushed
8. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- NEVER commit without user approval
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- If push fails, resolve and retry until it succeeds
