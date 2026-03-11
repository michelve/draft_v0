---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0009 - Add quality-gate-reminder Claude hook

## Deliverable

A `PostToolUse` hook that fires after any `.ts`/`.tsx` file edit and injects a reminder to run `pnpm typecheck` and `pnpm biome:check` before committing - eliminating the most common cause of push failures.

## Context and Motivation

Quality gate failures on push (TypeScript errors, Biome violations) most commonly occur because the checks were skipped after an edit. The orchestrator lists these as required before every commit, but Claude has to remember to invoke them. A PostToolUse hook fires deterministically after every qualifying file write, making the reminder unavoidable. Born from the hooks planning session (2026-03-08).

## Key Decisions

- **Bash first, PowerShell second** - deliver `quality-gate-reminder.sh` (macOS/Linux) and `quality-gate-reminder.ps1` (Windows)
- **PostToolUse hook** - fires after the tool call completes (file is already written)
- **Scope**: only trigger on `.ts` and `.tsx` file edits; ignore `.md`, `.json`, `.css`, `.prisma` writes
- **Inject once per session** - track whether reminder was already injected this session to avoid repetitive noise; reset on new conversation
- **Message**: `"TypeScript file modified - run pnpm typecheck && pnpm biome:check before committing."`

## Acceptance Criteria

- [ ] Given a `.tsx` file is written by Claude, when the hook runs, then the quality gate reminder is injected into the next Claude response
- [ ] Given a `.ts` file is written by Claude, when the hook runs, then the reminder is injected
- [ ] Given a `.md` file is written by Claude, when the hook runs, then no reminder is injected
- [ ] Given a `.json` file is written by Claude, when the hook runs, then no reminder is injected
- [ ] Given macOS/Linux, the `.sh` script executes correctly via bash
- [ ] Given Windows, the `.ps1` script executes correctly via PowerShell
- [ ] The reminder names the two specific commands (`pnpm typecheck`, `pnpm biome:check`) not just "run quality gates"

## Out of Scope

- Actually running the checks (hook only reminds - engineer or Claude decides when to run)
- Tracking which specific file was edited (reminder is generic per session, not per file)
- Prisma schema edits (different check: `pnpm db:push`)

## Dependencies

- `.claude/hooks/` directory exists (confirmed empty, ready)
- Can be implemented independently of tasks 0005–0008

## Related Code

- `.github/instructions/orchestrator.instructions.md` - Quality Gates section (source of truth for which commands)
- `.github/instructions/codacy.instructions.md` - Codacy analysis step that also runs after file edits
- `package.json` - confirms `typecheck` and `biome:check` script names

## Verification

```bash
# Edit a .tsx file via Claude and confirm reminder appears in response
# Edit a .md file via Claude and confirm no reminder
pnpm typecheck   # should be zero errors
pnpm biome:check # should be zero errors
cat .claude/settings.json  # confirm PostToolUse hook registered
```
