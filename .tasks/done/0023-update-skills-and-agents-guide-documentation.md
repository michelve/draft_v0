---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0023-update-skills-and-agents-guide-documentation

## Deliverable

`docs/guides/skills-and-agents.md` is updated with comprehensive documentation of new skill configuration patterns, including argument-hint usage, allowed-tools configuration, fork context, string substitutions, and examples from implemented skills.

## Context and Motivation

After implementing tasks 0014-0022, the skills infrastructure has been significantly enhanced with new configuration capabilities:

- Argument hints for parameter-accepting skills
- Allowed-tools for MCP server integration
- Fork context for isolated workflows
- String substitutions for dynamic parameters
- Explicit user-invocable and name configuration

The existing `docs/guides/skills-and-agents.md` documentation needs updating to reflect these new patterns and provide examples for future skill authors.

Reference: `/memories/session/plan.md` Section "Phase 5: Metadata & Documentation"

## Key Decisions

- Add new section "## Skill Configuration Reference" with all YAML frontmatter fields
- Add new section "## Argument Hints and String Substitutions" with examples
- Add new section "## MCP Server Skills" documenting allowed-tools pattern
- Add new section "## Fork Context for Workflows" explaining when to use context isolation
- Update existing skill tables/lists to reflect consolidation (remove implement-design)
- Include code examples from actual skills (figma-implement-design, adr-writer)
- Add configuration checklist for new skills

## Acceptance Criteria

- [ ] Given docs/guides/skills-and-agents.md, when adding "Skill Configuration Reference" section, then document all YAML fields: name, description, argument-hint, user-invocable, disable-model-invocation, allowed-tools, context, agent, model
- [ ] Given configuration reference, when documenting each field, then include: field type, required/optional, default value, example usage, when to use it
- [ ] Given disable-model-invocation field documented, when explaining, then clarify: prevents auto-triggering, requires manual /skill-name invocation, used for manual-only workflows
- [ ] Given allowed-tools field documented, when explaining, then clarify: primarily for MCP server tools, most skills don't need it, example patterns for Figma/Miro MCP tools
- [ ] Given "Argument Hints and String Substitutions" section added, when documenting, then include: $ARGUMENTS, $0, $1, ${CLAUDE_SESSION_ID} with examples from figma-implement-design and adr-writer
- [ ] Given "MCP Server Skills" section added, when documenting, then include: allowed-tools syntax, Figma MCP example, Miro MCP example, cross-reference to `.claude/settings.json`
- [ ] Given "Fork Context for Workflows" section added, when explaining, then document: when to use fork (complete workflows), when NOT to use fork (tech augmentation), examples: adr-writer, create-tasks, figma-implement-design
- [ ] Given existing skill tables, when updating, then remove implement-design row, keep figma-implement-design and figma as separate entries
- [ ] Given all sections added, when reviewing structure, then sections flow logically: Overview → Configuration Reference → Argument Hints → MCP Skills → Fork Context → Skill Catalog
- [ ] Given documentation complete, when adding checklist, then include: "New Skill Configuration Checklist" with all YAML fields and decision points
- [ ] Given examples included, when referencing skills, then use actual file paths and line numbers: `.claude/skills/figma-implement-design/SKILL.md (lines 5-10)`

## Out of Scope

- Documenting agents (AGENTS.md) - separate documentation file
- Updating orchestrator instructions - separate file with different purpose
- Creating video tutorials or visual diagrams
- Documenting skill performance benchmarks - not implemented yet

## Dependencies

- All tasks 0014-0024 should be complete so documentation reflects final implementation
- Skills should have complete configuration before documenting patterns
- Task 0016 (consolidate Figma skills) must be done to avoid documenting archived skills
- Task 0024 (disable-model-invocation) should be done to document manual-invocation patterns

## Related Code

- `docs/guides/skills-and-agents.md` - primary file to update
- `.claude/skills/figma-implement-design/SKILL.md` - example for argument-hint, allowed-tools, fork context
- `.claude/skills/adr-writer/SKILL.md` - example for argument-hint, string substitutions, fork context
- `.claude/skills/web-design-guidelines/SKILL.md` - example for argument-hint pattern
- `.claude/skills/shadcn/SKILL.md` - example for user-invocable: false
- `.claude/skills/create-tasks/SKILL.md` - example for fork context
- `.claude/skills/skill-creator/SKILL.md` - example for disable-model-invocation: true
- `.claude/skills/web-design-guidelines/SKILL.md` - example for both argument-hint and disable-model-invocation
- `.claude/settings.json` - reference for MCP server tool names

## Verification

```bash
# Verify new sections exist
Select-String -Path "docs/guides/skills-and-agents.md" -Pattern "## Skill Configuration Reference|## Argument Hints|## MCP Server Skills|## Fork Context"
# Expected: 4 section headers found

# Check that implement-design is not referenced (should be consolidated)
Select-String -Path "docs/guides/skills-and-agents.md" -Pattern "implement-design" -NotMatch "figma-implement-design"
# Expected: No matches (or only in historical context like "previously had implement-design")

# Verify examples reference actual files
Select-String -Path "docs/guides/skills-and-agents.md" -Pattern ".claude/skills/.+/SKILL.md"
# Expected: Multiple file path references
```

Manual review: Read through updated guide and verify examples are accurate and helpful

## Verification

```bash
# Run documentation link checker
pnpm dlx markdown-link-check docs/guides/skills-and-agents.md

# Verify all cross-references resolve
Select-String -Path "docs/guides/skills-and-agents.md" -Pattern "\[.*\]\(.*\.md\)"
```
