---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0022-standardize-mcp-metadata-and-skill-names

## Deliverable

All 21 skills have explicit `name` fields in YAML frontmatter and MCP server skills (6 total) have consistent `mcp-server` metadata documented, improving clarity and maintainability.

## Context and Motivation

**Current state**:

- Most skills rely on directory name as implicit name (no explicit `name:` field)
- Some Figma skills have `mcp-server: figma` in content, others don't
- Inconsistent metadata documentation

**Target state**:

- Every skill has explicit `name:` field in YAML frontmatter
- MCP server skills have consistent metadata (as YAML comment, not official schema field)
- Clear documentation which skills require MCP servers

Reference: `/memories/session/plan.md` Section "Phase 5: Metadata & Documentation"

## Key Decisions

- Add explicit `name:` field to all 21 skills (first field in YAML frontmatter)
- Use directory name as the name value (lowercase, hyphenated, max 64 chars)
- Add MCP metadata as YAML comment (not official field): `# MCP server required: figma` or `# MCP server required: miro`
- Place MCP comment after `allowed-tools` field for MCP server skills
- Naming convention: lowercase letters, numbers, hyphens only (no underscores)

## Acceptance Criteria

- [ ] Given all 21 skills, when adding name field, then use directory name as value (e.g., `name: adr-writer`)
- [ ] Given name field added, when validating naming convention, then verify lowercase, hyphens only, max 64 characters
- [ ] Given 5 Figma MCP skills, when adding metadata comment, then place `# MCP server required: figma` after allowed-tools
- [ ] Given 1 Miro MCP skill, when adding metadata comment, then place `# MCP server required: miro` after allowed-tools
- [ ] Given all skills updated, when validating YAML, then frontmatter parses without errors (comments don't break parsing)
- [ ] Given all skills updated, when counting explicit names, then find exactly 21 `name:` fields
- [ ] Given MCP skills updated, when counting MCP metadata, then find 6 comments (5 figma + 1 miro)

**MCP Server Skills (6 total)**:

1. implement-design (consolidated into figma-implement-design, skip if archived)
2. figma-implement-design - `# MCP server required: figma`
3. figma - `# MCP server required: figma`
4. code-connect-components - `# MCP server required: figma`
5. create-design-system-rules - `# MCP server required: figma`
6. miro-mcp - `# MCP server required: miro`

**All 21 skills need explicit name**:

- accessibility
- adr-writer
- automatic-code-review
- code-connect-components
- create-design-system-rules
- create-tasks
- figma
- figma-implement-design (consolidated)
- miro-mcp
- nodejs
- playwright-skill
- prisma
- react
- react-best-practices
- route-tester
- shadcn
- skill-creator
- skill-developer
- tailwindcss
- task-check
- web-design-guidelines
- writing-tests

## Out of Scope

- Renaming skills to different names - keep directory names as-is
- Changing directory names - only add explicit `name:` field
- Making MCP metadata an official schema field - it's a comment for human documentation

## Dependencies

- Task 0016 (consolidate Figma skills) should be complete - don't configure archived skills
- Best if tasks 0014-0021 are complete so frontmatter is in final state

## Related Code

- `.claude/skills/*/SKILL.md` - all 21 skill files to update
- `.claude/skills/figma-implement-design/SKILL.md` - example MCP skill
- `.claude/skills/miro-mcp/SKILL.md` - example MCP skill

## Verification

```bash
# Count explicit name fields
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "^name:" | Measure-Object
# Expected: 21 matches

# Verify naming convention (lowercase, hyphens only)
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "^name: [a-z0-9-]+$"
# Expected: All matches follow convention

# Count MCP server metadata comments
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "# MCP server required:" | Measure-Object
# Expected: 6 matches

# Validate YAML frontmatter still parses
Get-Content .claude/skills/react/SKILL.md | Select-Object -First 15
# Verify structure looks correct with name field first
```

Manual test: Verify skill names display correctly in Claude Code skill menu (should match directory names)
