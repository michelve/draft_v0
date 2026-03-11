---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0014-add-argument-hint-to-parameter-accepting-skills

## Deliverable

All 6 skills that accept user arguments have properly configured `argument-hint` fields in their YAML frontmatter, enabling Claude to show users what parameters to provide when invoking the skill.

## Context and Motivation

Currently only 1 skill (web-design-guidelines) has `argument-hint` configured, but 6 skills accept or mention parameters in their content:

- adr-writer (mentions `supersedes: NNNN`)
- implement-design (requires Figma URL)
- figma-implement-design (requires Figma URL + optional node-id)
- code-connect-components (requires Figma URL + node-id)
- figma (requires Figma URL or node-id)
- create-design-system-rules (may accept codebase path)

Without `argument-hint`, users don't know what parameters to provide, and Claude can't properly parse arguments using $ARGUMENTS, $0, $1 variables.

Reference: `/memories/session/plan.md` Section "Phase 1: Critical Configuration"

## Key Decisions

- Use angle brackets `<required>` for required arguments, square brackets `[optional]` for optional
- Follow web-design-guidelines pattern: `argument-hint: "<file-or-pattern>"`
- Use descriptive names that match skill domain (e.g., `<figma-url>` not `<url>`)
- Document what the arguments represent in the skill content using $0, $1, $ARGUMENTS

## Acceptance Criteria

- [ ] Given adr-writer skill, when adding argument-hint, then use `argument-hint: "[supersedes: NNNN]"` (optional parameter for supersede flow)
- [ ] Given implement-design skill, when adding argument-hint, then use `argument-hint: "<figma-url> [node-id]"`
- [ ] Given figma-implement-design skill, when adding argument-hint, then use `argument-hint: "<figma-url> [node-id]"`
- [ ] Given code-connect-components skill, when adding argument-hint, then use `argument-hint: "<figma-url> <node-id>"` (both required)
- [ ] Given figma skill, when adding argument-hint, then use `argument-hint: "<figma-url-or-node-id>"` (flexible parameter)
- [ ] Given create-design-system-rules skill, when reviewing content, then determine if arguments are needed or remove from scope
- [ ] Given all 6 SKILL.md files updated, when validating YAML, then frontmatter parses without errors
- [ ] Given argument-hint added, when user types `/skill-name` in Claude, then autocomplete shows the hint

## Out of Scope

- Implementing string substitutions ($0, $1, $ARGUMENTS) in skill content - covered in task 0021
- Configuring allowed-tools for MCP skills - covered in task 0015
- Adding "When to Use" sections - covered in tasks 0017-0018

## Dependencies

- None - this is the first phase of configuration work

## Related Code

- `.claude/skills/web-design-guidelines/SKILL.md` - reference implementation with `argument-hint: "<file-or-pattern>"`
- `.claude/skills/adr-writer/SKILL.md` - mentions `supersedes: NNNN` parameter around line 50-60
- `.claude/skills/implement-design/SKILL.md` - Figma URL extraction logic
- `.claude/skills/figma-implement-design/SKILL.md` - similar to implement-design
- `.claude/skills/code-connect-components/SKILL.md` - requires fileKey + nodeId
- `.claude/skills/figma/SKILL.md` - flexible URL/node-id handling
- `.claude/skills/create-design-system-rules/SKILL.md` - check if arguments are actually used

## Verification

```bash
# Validate YAML frontmatter syntax
Get-Content .claude/skills/*/SKILL.md | Select-String -Pattern "^---$" -Context 0,20

# Check that all 6 skills have argument-hint
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "argument-hint:" | Measure-Object

# Expected: 7 matches (6 new + 1 existing web-design-guidelines)
```

Manual test: Type `/adr-writer` in Claude and verify hint shows `[supersedes: NNNN]`
