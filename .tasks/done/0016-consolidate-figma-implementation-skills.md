---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0016-consolidate-figma-implementation-skills

## Deliverable

`implement-design` and `figma-implement-design` skills are consolidated into a single skill (`figma-implement-design`), eliminating user confusion about which skill to invoke for Figma-to-code implementation. The `figma` skill remains separate for MCP infrastructure and troubleshooting.

## Context and Motivation

Currently there are 2 overlapping Figma implementation skills:

- `implement-design` - Generic Figma-to-code translation
- `figma-implement-design` - Claims to add "desktop MCP support"

This creates confusion:

- Users don't know which to invoke
- Similar descriptions and SKILL.md structure
- Duplicated logic and maintenance burden
- Both call the same Figma MCP tools

**Decision**: Consolidate into `figma-implement-design` (more comprehensive scope), keep `figma` separate for setup/troubleshooting.

Reference: `/memories/session/plan.md` Section "Phase 2: Consolidate Overlapping Skills"

## Key Decisions

- Keep `figma-implement-design` as the primary implementation skill (broader scope)
- Merge any unique content from `implement-design` into `figma-implement-design`
- Keep `figma` skill as separate infrastructure/setup skill (MCP configuration, troubleshooting, tool discovery)
- Archive `implement-design/SKILL.md` by moving to `.claude/skills/_archived/` directory
- Update skill references in orchestrator instructions and agent routing

## Acceptance Criteria

- [ ] Given `implement-design/SKILL.md`, when reviewing content, then identify any unique sections not present in `figma-implement-design`
- [ ] Given unique content identified, when merging, then add to `figma-implement-design/SKILL.md` appropriately
- [ ] Given `figma-implement-design/SKILL.md` updated, when reviewing description, then verify it mentions both manual URL and MCP-fetched design workflows
- [ ] Given consolidation complete, when moving old skill, then create `.claude/skills/_archived/` directory and move `implement-design/` folder there
- [ ] Given skills consolidated, when updating orchestrator instructions, then change references from "implement-design" to "figma-implement-design" in `.github/instructions/orchestrator.instructions.md`
- [ ] Given skills consolidated, when updating skill table in orchestrator, then remove `implement-design` row, keep `figma-implement-design` and `figma` rows
- [ ] Given all references updated, when searching codebase, then no active references to `implement-design` skill exist (except in \_archived/)
- [ ] Given consolidated skill retained argument-hint and allowed-tools from tasks 0014-0015

## Out of Scope

- Consolidating the `figma` skill itself - it serves a different purpose (infrastructure)
- Testing Figma MCP server connectivity - assumes it works
- Rewriting the entire skill content - only merge unique sections

## Dependencies

- Task 0014 (argument-hint) should be complete so we know which configuration to keep
- Task 0015 (allowed-tools) should be complete so we know which tools are declared
- Both skills should have their Phase 1 configuration applied before merging

## Related Code

- `.claude/skills/implement-design/SKILL.md` - skill to be archived
- `.claude/skills/figma-implement-design/SKILL.md` - primary skill to keep
- `.claude/skills/figma/SKILL.md` - infrastructure skill (keep separate)
- `.github/instructions/orchestrator.instructions.md` - skill routing table (lines ~50-100)
- `docs/guides/skills-and-agents.md` - skill documentation

## Verification

```bash
# Verify implement-design is archived
Test-Path .claude/skills/_archived/implement-design/SKILL.md

# Verify no active references remain
Select-String -Path ".github/**/*.md",".claude/**/*.md" -Pattern "implement-design" -Exclude "*_archived*"
# Expected: No matches (or only in historical docs like guides)

# Verify figma-implement-design exists and has complete config
Get-Content .claude/skills/figma-implement-design/SKILL.md | Select-String -Pattern "argument-hint:|allowed-tools:"
# Expected: Both fields present
```

Manual test: `/figma-implement-design` should be autocompleted by Claude, `/implement-design` should not
