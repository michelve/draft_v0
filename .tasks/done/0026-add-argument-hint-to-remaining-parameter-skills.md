---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0026-add-argument-hint-to-remaining-parameter-skills

## Deliverable

Four additional skills that accept arguments (create-tasks, playwright-skill, route-tester, nodejs) have properly configured `argument-hint` fields, completing the argument-hint rollout across all skills.

## Context and Motivation

Task 0014 added argument-hint to Figma-related skills. The comprehensive audit identified 4 more skills that accept parameters but lack argument-hint configuration:

- **create-tasks**: Accepts task descriptions, PRD references, requirements
- **playwright-skill**: Accepts URLs, test descriptions, page selectors
- **route-tester**: Accepts API route paths to test
- **nodejs**: May accept project paths or configurations (verify during implementation)

Without argument-hint, users don't see parameter guidance when invoking these skills.

Reference: `/memories/session/plan.md` Phase 1, Step 2

## Key Decisions

- Use angle brackets `<required>` for required arguments, square brackets `[optional]` for optional
- Follow established pattern from task 0014
- Verify nodejs actually accepts arguments before adding hint (may be reference-only skill)
- Use domain-appropriate parameter names (e.g., `<url>` for playwright, `<route-path>` for route-tester)

## Acceptance Criteria

- [ ] Given create-tasks skill content, when reviewing for argument usage, then identify what parameters users typically provide (task descriptions, requirements)
- [ ] Given create-tasks/SKILL.md, when adding argument-hint, then use `argument-hint: "<task-description-or-requirements>"`
- [ ] Given playwright-skill content, when reviewing usage patterns, then identify URL and test description parameters
- [ ] Given playwright-skill/SKILL.md, when adding argument-hint, then use `argument-hint: "<url-or-test-description>"`
- [ ] Given route-tester content, when reviewing test patterns, then identify route path parameters
- [ ] Given route-tester/SKILL.md, when adding argument-hint, then use `argument-hint: "<route-path>"`
- [ ] Given nodejs skill content, when reviewing for arguments, then determine if skill accepts parameters or is reference-only
- [ ] Given nodejs skill analysis, when skill accepts parameters, then add appropriate argument-hint; else document as reference-only
- [ ] Given all updated SKILL.md files, when validating YAML, then frontmatter parses without errors
- [ ] Given argument-hint added, when typing skill invocation in Claude, then autocomplete shows the hints

## Out of Scope

- Implementing string substitutions ($ARGUMENTS) in skill content - covered in task 0030
- Adding dynamic context injection - covered in task 0027
- Documenting usage patterns - covered in task 0034

## Dependencies

- Task 0014 (reference implementation for argument-hint patterns)

## Related Code

- `.claude/skills/web-design-guidelines/SKILL.md` - reference implementation with `argument-hint: "<file-or-pattern>"`
- `.claude/skills/create-tasks/SKILL.md` - current implementation, check for parameter usage
- `.claude/skills/playwright-skill/SKILL.md` - current implementation, likely accepts URLs
- `.claude/skills/route-tester/SKILL.md` - current implementation, check for route path parameters
- `.claude/skills/nodejs/SKILL.md` - verify if arguments are used

## Verification

```bash
# Validate YAML syntax
pnpm typecheck

# Test autocomplete
# 1. Type `/create-tasks` in Claude and verify hint shows
# 2. Type `/playwright-skill` and verify hint shows
# 3. Type `/route-tester` and verify hint shows
# 4. Type `/nodejs` (if applicable) and verify hint shows
```
