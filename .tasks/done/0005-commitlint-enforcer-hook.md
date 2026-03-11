---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0005 - Add commitlint-enforcer Claude hook

## Deliverable

A `PreToolUse` hook that intercepts `git commit` terminal commands and blocks them if the commit message violates commitlint rules - before git or lint-staged even runs.

## Context and Motivation

The commit convention (type: subject, ≤100 chars, lowercase, no trailing dot) is enforced by lint-staged _after_ the commit message is already written. The hook catches violations _before_ the `run_in_terminal` tool call executes, meaning zero malformed commits ever reach git history. Born from the hooks planning session (2026-03-08).

## Key Decisions

- **Bash first, PowerShell second** - deliver `commitlint-enforcer.sh` (macOS/Linux) and `commitlint-enforcer.ps1` (Windows) together
- **Block, don't warn** - return `{"decision": "block", "reason": "..."}` with the corrected format shown; the cost of a false positive is low (just re-run with a valid message)
- **Register in `.claude/settings.json`** under `"hooks": { "PreToolUse": [...] }` with a `tool_name` matcher for `run_in_terminal`
- **Valid types**: `feat|fix|refactor|docs|chore|test|style` - exactly as defined in `copilot-instructions.md`

## Acceptance Criteria

- [ ] Given `git commit -m "Add new feature"`, when the hook runs, then the tool call is blocked and the corrected format `feat: add new feature` is shown
- [ ] Given `git commit -m "feat: add user authentication"`, when the hook runs, then the tool call proceeds unblocked
- [ ] Given `git commit -m "feat: add user authentication."` (trailing dot), when the hook runs, then the tool call is blocked
- [ ] Given `git commit -m "feat: add a commit message that is longer than one hundred characters in total length here"`, when the hook runs, then the tool call is blocked with the character count shown
- [ ] Given a non-commit terminal command (e.g. `pnpm typecheck`), when the hook runs, then the tool call proceeds unblocked
- [ ] Given macOS/Linux, the `.sh` script executes correctly via bash
- [ ] Given Windows, the `.ps1` script executes correctly via PowerShell
- [ ] Both scripts are registered in `.claude/settings.json` with platform-appropriate command

## Out of Scope

- Multi-line commit bodies (only validate the subject line / `-m` flag value)
- `git commit` without `-m` flag (interactive editor commits)
- Amend commits (`--amend`)

## Dependencies

- `.claude/hooks/` directory exists (confirmed empty, ready)
- `.claude/settings.json` has `"hooks": {}` placeholder (ready for population)

## Related Code

- `.claude/settings.json` - hook registration target
- `.github/instructions/copilot-instructions.md` - commitlint rules source (type list, length limit)
- `.github/prompts/commit.prompt.md` - commit convention reference

## Verification

```bash
# Trigger a bad commit via Claude and confirm it is blocked
# Trigger a good commit via Claude and confirm it goes through
# Check .claude/settings.json has PreToolUse hook registered
cat .claude/settings.json
```
