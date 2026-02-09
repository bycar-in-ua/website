# Task Workflow (bd)

This project uses bd (beads) for issue tracking.

## Quick Reference

- bd onboard
- bd ready
- bd show <id>
- bd update <id> --status in_progress
- bd close <id>

IMPORTANT: Do not run bd sync unless the user explicitly asks for it.

## Change Workflow (Required)

1. Start the task: bd update <id> --status in_progress
2. Make the change.
3. Ask for review and wait for approval.
4. After approval:
   - bd close <id>
   - git add .
   - git commit -m "..."
   - git push

Never commit or push without explicit approval.

## Landing the Plane (Session Completion)

When ending a session:

1. File issues for remaining work.
2. Run quality gates (tests, lint, build) if code changed.
3. Update issue status.
4. Ask for final review and get approval.
5. Push to remote (git add, commit, push).
6. Clean up (stashes, prune branches).
7. Verify repo is up to date with origin.
8. Hand off with context for the next session.
