---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0019-set-user-invocable-configuration-explicitly

## Deliverable

All 21 skills have explicit `user-invocable` configuration in their YAML frontmatter, making skill discoverability settings explicit rather than relying on defaults.

## Context and Motivation

Currently only 1 skill (shadcn) has explicit `user-invocable: false` configured. All other skills rely on the default (implicitly true). By making this explicit:

- Clear intent: we document whether a skill should appear in user menus
- Future-proof: default behavior changes won't affect us
- Learning agent compatibility: explicit settings help AI assistants know what to recommend

**Strategy**: Set `user-invocable: true` for all skills EXCEPT shadcn (which stays false - agent-only component registry).

Reference: `/memories/session/plan.md` Section "Phase 3: Improve Discoverability"

## Key Decisions

- Add `user-invocable: true` to all 20 skills that should be user-discoverable
- Keep `user-invocable: false` only for shadcn (agent-only component management)
- Place in YAML frontmatter directly after `description` field for consistency
- No exceptions: every skill gets explicit configuration

## Acceptance Criteria

- [ ] Given 20 user-invocable skills, when adding configuration, then add `user-invocable: true` to YAML frontmatter after description
- [ ] Given shadcn skill, when reviewing configuration, then verify `user-invocable: false` exists and is unchanged
- [ ] Given all 21 skills, when validating YAML, then frontmatter parses without errors
- [ ] Given all skills configured, when counting user-invocable fields, then find exactly 21 matches (20 true + 1 false)
- [ ] Given consistent formatting, when reviewing frontmatter, then user-invocable appears on same line position across all skills (after description)

List of 20 skills to set `user-invocable: true`:

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
- skill-creator
- skill-developer
- tailwindcss
- task-check
- web-design-guidelines
- writing-tests

## Out of Scope

- Changing shadcn to user-invocable - it must stay agent-only
- Testing skill menu appearance - assumes Claude Code UI works correctly
- Adding user-invocable to archived skills

## Dependencies

- Task 0016 (consolidate Figma skills) should be complete to avoid configuring archived skill
- All SKILL.md files should have YAML frontmatter

## Related Code

- `.claude/skills/shadcn/SKILL.md` - reference for `user-invocable: false` (line ~3-4)
- `.claude/skills/*/SKILL.md` - all 21 skill files to update (20 true + 1 verify false)

## Verification

```bash
# Count total user-invocable fields
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "user-invocable:" | Measure-Object
# Expected: 21 matches

# Count true settings
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "user-invocable: true" | Measure-Object
# Expected: 20 matches

# Count false settings (should only be shadcn)
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "user-invocable: false"
# Expected: 1 match (.claude/skills/shadcn/SKILL.md)

# Validate YAML frontmatter
Get-Content .claude/skills/react/SKILL.md | Select-Object -First 10
# Verify structure is correct
```

Manual test: Type `/` in Claude and verify shadcn does NOT appear in autocomplete menu
