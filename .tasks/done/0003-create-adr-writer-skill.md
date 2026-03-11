---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0003-create-adr-writer-skill

## Deliverable

A `SKILL.md` file in both `.github/skills/adr-writer/` and `.claude/skills/adr-writer/` (identical content) that activates the `adr-writer` workflow automatically when users use natural-language trigger phrases like "write an ADR", "document this decision", or "ADR for X".

## Context and Motivation

Tasks `0001` (prompt template) and `0002` (agent registration) make the ADR writer functional. This task adds **discoverability** - the skill system is what enables VS Code Copilot and Claude Code to detect intent and route automatically without the user having to know the agent name or prompt filename.

The project maintains two identical skill directories that must be kept in sync:

- `.github/skills/` - read by VS Code Copilot / GitHub Copilot
- `.claude/skills/` - read by Claude Code

Currently 21 skill folders exist in each. This adds `adr-writer` as the 22nd.

## Key Decisions

- **Mirror both directories** - per project convention (`.claude/rules/`, session notes): both `.github/skills/adr-writer/SKILL.md` and `.claude/skills/adr-writer/SKILL.md` must have identical content; they are committed together
- **Skill content: domain knowledge over instructions** - SKILL.md should encode the MADR domain knowledge (what makes a valid ADR, mandatory/optional sections, when to involve web research) and reference `write-adr.prompt.md` as the action - not re-implement the workflow steps inline
- **Trigger phrases must be specific enough to not fire on generic architecture questions** - "what ADR covers X?" should NOT trigger the adr-writer skill; "write an ADR for X" SHOULD
- **Violation detection triggers must NOT fire this skill** - phrases like "does this violate an ADR?", "check my change against ADRs", "ADR compliance check" route to the `check-adr-violations` skill (task `0004`), not here

## Acceptance Criteria

- [ ] Given `.github/skills/adr-writer/SKILL.md` is created, when `.claude/skills/adr-writer/SKILL.md` is checked, then the content of both files is byte-for-byte identical
- [ ] Given the skill is read, when checking trigger phrases, then at minimum these phrases activate it: "write an ADR", "create an ADR", "document this decision", "ADR for X", "architecture decision record for X", "record this decision"
- [ ] Given the skill is read, when checking trigger phrases, then "what ADR covers X?", "show me the ADR for Y", "does this violate an ADR?", and "check ADR compliance" do NOT appear as triggers (lookup and violation tasks route elsewhere)
- [ ] Given the SKILL.md is read, when checking domain knowledge section, then it covers: MADR 4.0.0 mandatory sections, "Chosen option: X, because Y" phrasing requirement, the index update requirement, the numbering convention, and when to invoke `web-research-specialist`
- [ ] Given the skill is active, when the agent takes action, then it follows the `write-adr.prompt.md` workflow (not a shortcut version)
- [ ] Given `pnpm typecheck` is run, then it still passes (skill files are markdown only)

## Out of Scope

- No changes to the prompt template (task 0001)
- No changes to AGENTS.md (task 0002)
- No UI - skill files are markdown consumed by AI tooling only

## Dependencies

- Task `0001` must be completed - `SKILL.md` references `write-adr.prompt.md`
- Task `0002` must be completed - `SKILL.md` references the `adr-writer` agent

## Related Code

- `.github/skills/create-tasks/SKILL.md` - reference for skill file structure in this project
- `.github/skills/documentation-architect/SKILL.md` - reference for a write-focused skill
- `docs/decisions/_template.md` - MADR 4.0.0 template content to summarize in skill domain knowledge
- `.github/instructions/adr.instructions.md` - rules the skill must align with

## Verification

```bash
# Both files must exist
Test-Path ".github/skills/adr-writer/SKILL.md"
Test-Path ".claude/skills/adr-writer/SKILL.md"

# Content must be identical
$a = Get-FileHash ".github\skills\adr-writer\SKILL.md"
$b = Get-FileHash ".claude\skills\adr-writer\SKILL.md"
if ($a.Hash -eq $b.Hash) { "IDENTICAL ✓" } else { "MISMATCH ✗" }

pnpm typecheck
```
