# Task Workflow

## Change Workflow

1. Pick up or create a task (in whatever tracker is active, if any).
2. Make the change.
3. Ask for review and wait for approval.
4. After approval:
   - Update the task status (close / mark done).
   - git add, commit, push.

Never commit or push without explicit approval.

## Session Completion

When ending a session:

1. File issues for remaining work.
2. Run quality gates (tests, lint, build) if code changed.
3. Update issue status.
4. Ask for final review and get approval.
5. Push to remote (git add, commit, push).
6. Clean up (stashes, prune branches).
7. Verify repo is up to date with origin.
8. Hand off with context for the next session.
