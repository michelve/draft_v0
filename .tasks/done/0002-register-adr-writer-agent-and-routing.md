---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0002-register-adr-writer-agent-and-routing

## Deliverable

The `adr-writer` agent is discoverable in `AGENTS.md` and appears in the orchestrator routing table in `.github/instructions/orchestrator.instructions.md`, so any agent or engineer can route ADR-related tasks to it by name.

## Context and Motivation

After task `0001` creates the prompt template, the `adr-writer` agent needs to be registered two places:

1. **`AGENTS.md`** — project-level agent registry, read by Copilot and other agents when deciding which agent to invoke
2. **`.github/instructions/orchestrator.instructions.md`** — the master routing table that tells agents when to use which agent

Currently `AGENTS.md` has 8 agents (auto-error-resolver, code-architecture-reviewer, code-refactor-master, documentation-architect, plan-reviewer, principal-engineer, refactor-planner, web-research-specialist). There is no `adr-writer` entry and the orchestrator routing table has no row for ADR tasks.

## Key Decisions

- **Two files, one task** — both edits are tiny (1–2 line insertions) and tightly coupled; splitting would create a dependency chain with no benefit
- **AGENTS.md description format** — match existing entries: single paragraph, action-oriented verbs, describes what the agent does and when it hands off, no markdown headers inside the entry
- **Orchestrator routing trigger wording** — match the `| Task | Agent |` table style already present; trigger column should match how users naturally describe the task

## Acceptance Criteria

- [ ] Given `AGENTS.md` is opened, when searching for `adr-writer`, then an entry is found with a description that covers: reads existing ADRs for context, drafts MADR-format ADR, validates mandatory fields, writes file, updates index, handles supersede flow from violation checker, optionally invokes `web-research-specialist`
- [ ] Given `.github/instructions/orchestrator.instructions.md` is opened, when the "When to use which agent" table is read, then a row exists mapping "writing/creating/documenting architecture decisions (ADRs)" to `adr-writer`
- [ ] Given the orchestrator table is read, when checking for violation detection routing, then a row exists mapping "proposed change may violate an existing ADR / checking architectural compliance" to `check-adr-violations` prompt
- [ ] Given the orchestrator instructions are read end-to-end, when checking for consistency, then no other section contradicts or duplicates the new `adr-writer` routing entry
- [ ] Given `pnpm typecheck` is run after the edits, then it still passes

## Out of Scope

- No skill file (task 0003)
- No violation-checker skill (task 0004)
- No changes to `adr.instructions.md` (already complete)
- No changes to the prompt itself (task 0001)

## Dependencies

- Task `0001` (write-adr prompt template) should be completed first — the agent description references `write-adr.prompt.md`

## Related Code

- `AGENTS.md` — current agent registry; add `adr-writer` entry in alphabetical order
- `.github/instructions/orchestrator.instructions.md` — "When to use which agent" table, "Skill & Agent Routing" section
- Existing agent entries in `AGENTS.md` for description style reference (e.g., `documentation-architect`, `plan-reviewer`)

## Verification

```bash
# Confirm entries exist
Select-String -Path "AGENTS.md" -Pattern "adr-writer"
Select-String -Path ".github\instructions\orchestrator.instructions.md" -Pattern "adr-writer"

pnpm typecheck
```
