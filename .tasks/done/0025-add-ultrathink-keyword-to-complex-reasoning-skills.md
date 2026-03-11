---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0025-add-ultrathink-keyword-to-complex-reasoning-skills

## Deliverable

Four complex reasoning skills (adr-writer, skill-creator, create-design-system-rules, figma-implement-design) have the `ultrathink` keyword added to enable Claude's extended thinking mode for deeper analysis.

## Context and Motivation

Official Claude Code documentation reveals that adding the keyword "ultrathink" anywhere in a SKILL.md file enables extended thinking mode when that skill is active. Extended thinking provides Claude with more reasoning steps for complex decisions.

These 4 skills involve complex reasoning that benefits from extended thinking:

- **adr-writer**: Architecture decisions require analyzing trade-offs, consequences, alternatives
- **skill-creator**: Meta-programming requires planning skill structure, trigger patterns, progressive disclosure
- **create-design-system-rules**: System-wide conventions need analysis of codebase patterns and consistency rules
- **figma-implement-design**: Design-to-code translation requires visual analysis, component mapping, accessibility considerations

Reference: `/memories/session/plan.md` Phase 1, Step 1

## Key Decisions

- Add "ultrathink" as a discrete keyword in the skill content (not in YAML frontmatter)
- Place it in a natural sentence: "This skill uses extended thinking for complex reasoning. ultrathink"
- Add near the top of the skill content (after frontmatter, before main instructions)
- Keep it simple - just the keyword, Claude detects it automatically

## Acceptance Criteria

- [ ] Given adr-writer/SKILL.md, when adding ultrathink, then place it after frontmatter in a natural sentence about architecture analysis
- [ ] Given skill-creator/SKILL.md, when adding ultrathink, then place it after frontmatter explaining meta-programming complexity
- [ ] Given create-design-system-rules/SKILL.md, when adding ultrathink, then place it after frontmatter about system-wide pattern analysis
- [ ] Given figma-implement-design/SKILL.md, when adding ultrathink, then place it after frontmatter explaining design-to-code complexity
- [ ] Given all 4 files updated, when invoking each skill, then observe extended thinking mode activates (check terminal output or Claude response format)
- [ ] Given all changes, when running pnpm typecheck, then zero TypeScript errors
- [ ] Given SKILL.md files updated, when parsing YAML frontmatter, then no syntax errors

## Out of Scope

- Adding ultrathink to other skills - only these 4 high-complexity skills in Phase 1
- Configuring model field - covered in separate task 0031
- Measuring performance impact of extended thinking - future consideration

## Dependencies

- None - this is a Phase 1 quick win with no dependencies

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - current implementation without ultrathink
- `.claude/skills/skill-creator/SKILL.md` - current implementation without ultrathink
- `.claude/skills/create-design-system-rules/SKILL.md` - current implementation without ultrathink
- `.claude/skills/figma-implement-design/SKILL.md` - current implementation without ultrathink

## Verification

```bash
# Verify YAML frontmatter syntax
pnpm typecheck

# Test skill invocation with extended thinking
# 1. Invoke adr-writer with a complex decision scenario
# 2. Observe extended thinking indicators in response
# 3. Repeat for other 3 skills
```
