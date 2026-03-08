---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0007 — Add adr-gate Claude hook

## Deliverable

A `UserPromptSubmit` hook that detects qualifying architectural decision keywords in user messages and injects a system-level reminder to run the ADR violation check — making the orchestrator's ADR auto-gate truly automatic rather than relying on Claude's recall.

## Context and Motivation

The orchestrator mandates an ADR violation check before any qualifying implementation, but this relies on Claude choosing to do it based on instruction recall. The hook fires before Claude processes the message, injecting the reminder unconditionally when trigger keywords are present. Born from the hooks planning session (2026-03-08).

## Key Decisions

- **Bash first, PowerShell second** — deliver `adr-gate.sh` (macOS/Linux) and `adr-gate.ps1` (Windows)
- **Inject, don't block** — return `{"decision": "inject", "content": "..."}` appending a system note to the prompt; do not block since keyword matches may be innocent (e.g. "install the dependencies")
- **Keyword set** (case-insensitive): `install`, `add library`, `add package`, `use X instead`, `switch to`, `migrate`, `replace`, `new pattern`, `new layer`, `new convention`, `deprecate`
- **Injected message**: `"⚠️ ADR Gate: This message may describe a qualifying architectural decision. Before implementing, silently check all accepted ADRs in docs/decisions/README.md for conflicts. See orchestrator.instructions.md § ADR Auto-Gate."`

## Acceptance Criteria

- [ ] Given a message containing "install shadcn", when the hook runs, then the ADR gate reminder is injected into the prompt context
- [ ] Given a message containing "switch to Zustand for all state", when the hook runs, then the reminder is injected
- [ ] Given a message containing "fix the button color", when the hook runs, then no injection occurs (no keyword match)
- [ ] Given a message containing "add a new route", when the hook runs, then no injection occurs (route ≠ qualifying keyword)
- [ ] Given macOS/Linux, the `.sh` script executes correctly via bash
- [ ] Given Windows, the `.ps1` script executes correctly via PowerShell
- [ ] The injected message references the specific orchestrator section so Claude knows where to look

## Out of Scope

- Actually running the ADR check (the hook only injects the reminder — Claude does the check)
- Detecting violations itself (that is `check-adr-violations.prompt.md`'s job)

## Dependencies

- `.claude/hooks/` directory exists (confirmed empty, ready)
- `docs/decisions/README.md` — must exist with accepted ADR index (exists: 0001–0013)
- `.github/instructions/orchestrator.instructions.md` — ADR Auto-Gate section (exists)

## Related Code

- `.github/prompts/check-adr-violations.prompt.md` — the violation check workflow the reminder points to
- `.github/instructions/adr.instructions.md` — qualifying decision criteria reference
- `docs/decisions/README.md` — ADR index Claude reads during the check

## Verification

```bash
# Send a message with "install" to Claude and confirm injected system note appears in Claude's context
# Send a plain message and confirm no injection
cat .claude/settings.json  # confirm UserPromptSubmit hook registered
```
