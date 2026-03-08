---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0006 — Add anti-pattern-guard Claude hook

## Deliverable

A `PreToolUse` hook that scans file content before any `.ts`/`.tsx` write and emits a structured warning if any of the 12 hard anti-patterns from the orchestrator are detected — catching drift at write-time, not in code review.

## Context and Motivation

The anti-pattern rules in `orchestrator.instructions.md` rely on Claude remembering them mid-edit. This hook fires deterministically before every file write, regardless of context window state. Born from the hooks planning session (2026-03-08).

## Key Decisions

- **Bash first, PowerShell second** — deliver `anti-pattern-guard.sh` (macOS/Linux) and `anti-pattern-guard.ps1` (Windows)
- **Warn, don't block** — return `{"decision": "warn", "message": "..."}` identifying the specific anti-pattern hit and the rule it violates; blocking risks false positives on legitimate edge cases
- **Targeted patterns only** — scan for the 5 highest-signal violations (listed below); avoid noisy broad matches
- **Scope to `.ts`/`.tsx` files only** — ignore markdown, JSON, CSS writes

## Anti-Patterns to Detect

| Pattern                                  | Detection heuristic                                                                | Rule violated      |
| ---------------------------------------- | ---------------------------------------------------------------------------------- | ------------------ |
| `useState` + `useEffect` for server data | Both within 10 lines of each other in same file with a `fetch(` or API call nearby | Use TanStack Query |
| `React.FC`                               | String literal match `React.FC`                                                    | React 19 — removed |
| `forwardRef`                             | String literal match `forwardRef(`                                                 | React 19 — removed |
| `propTypes`                              | String literal match `.propTypes =`                                                | React 19 — removed |
| `export default function` in `.tsx`      | Match `export default function`                                                    | Named exports only |

## Acceptance Criteria

- [ ] Given a `.tsx` file write containing `React.FC`, when the hook runs, then a warning is emitted naming the anti-pattern and the rule
- [ ] Given a `.tsx` file write containing `export default function`, when the hook runs, then a warning is emitted
- [ ] Given a `.ts` file write with no anti-patterns, when the hook runs, then no warning is emitted and the write proceeds
- [ ] Given a `.json` or `.md` file write, when the hook runs, then it exits immediately without scanning
- [ ] Given macOS/Linux, the `.sh` script executes correctly via bash
- [ ] Given Windows, the `.ps1` script executes correctly via PowerShell
- [ ] The warning message names: (1) which anti-pattern was found, (2) the corrected approach, (3) the rule source

## Out of Scope

- Fixing the anti-pattern automatically (hook only warns — Claude decides the fix)
- Scanning existing files not being written in the current tool call
- Detecting `any` type (too many false positives in legitimate type assertions)

## Dependencies

- `.claude/hooks/` directory exists (confirmed empty, ready)
- Task 0005 can be implemented independently — no ordering requirement

## Related Code

- `.github/instructions/orchestrator.instructions.md` — anti-patterns table (source of truth)
- `.claude/rules/react.md` — React 19 constraints
- `src/client/components/` — example components to test against

## Verification

```bash
# Create a test .tsx file via Claude with React.FC and confirm warning fires
# Create a clean .tsx file via Claude and confirm no warning
# Check .claude/settings.json has PreToolUse hook registered for file edit tools
cat .claude/settings.json
```
