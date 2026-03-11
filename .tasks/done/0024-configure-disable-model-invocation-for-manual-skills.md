---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0024-configure-disable-model-invocation-for-manual-skills

## Deliverable

4 skills that should only be manually invoked (not auto-triggered) have `disable-model-invocation: true` configured in their YAML frontmatter, preventing Claude from automatically loading these skills and requiring explicit user invocation with `/skill-name`.

## Context and Motivation

Some skills represent specialized workflows that should only run when explicitly requested by the user, not automatically triggered by conversation context:

- **skill-creator** - User explicitly wants to create/modify a skill
- **skill-developer** - Learning resource about skill mechanics, not an active workflow
- **playwright-skill** - Browser automation workflow (shouldn't auto-trigger on "test" mentions)
- **web-design-guidelines** - Manual audit workflow (user explicitly requests UI review)

Setting `disable-model-invocation: true` prevents these skills from being auto-loaded based on conversation context, reducing false positives and ensuring intentional invocation.

**From Claude Code docs**: "Set to true to prevent Claude from automatically loading this skill. Use for workflows you want to trigger manually with /name. Default: false."

Reference: `/memories/session/plan.md` Section "Further Considerations #1"

## Key Decisions

- Set `disable-model-invocation: true` for 4 manual-invocation-only skills
- These skills remain `user-invocable: true` (appear in / menu) but won't auto-trigger
- Place in YAML frontmatter after `user-invocable` field for consistency
- Skills with clear trigger phrases (like adr-writer) should NOT have this - they benefit from auto-triggering
- Workflow skills with fork context (task 0020) might auto-trigger, but that's intentional isolation

## Acceptance Criteria

- [ ] Given skill-creator skill, when adding disable-model-invocation, then set `disable-model-invocation: true` in YAML frontmatter
- [ ] Given skill-developer skill, when adding disable-model-invocation, then set `disable-model-invocation: true` in YAML frontmatter
- [ ] Given playwright-skill skill, when adding disable-model-invocation, then set `disable-model-invocation: true` in YAML frontmatter
- [ ] Given web-design-guidelines skill, when adding disable-model-invocation, then set `disable-model-invocation: true` in YAML frontmatter
- [ ] Given all 4 skills updated, when validating YAML, then frontmatter parses without errors
- [ ] Given all 4 skills updated, when counting disable-model-invocation, then find exactly 4 matches
- [ ] Given these 4 skills, when verifying user-invocable, then all still have `user-invocable: true` (manual invocation via / menu is allowed)
- [ ] Given skill descriptions, when reviewing, then each explains it requires explicit invocation (add note if missing)

## Out of Scope

- Adding disable-model-invocation to workflow skills with fork context - they should auto-trigger when appropriate
- Testing actual auto-trigger prevention - assumes Claude Code mechanism works
- Changing which skills are user-invocable (task 0019 handles that)

## Dependencies

- Task 0019 (user-invocable configuration) should be complete for consistent frontmatter structure
- Best if run after tasks 0014-0022 so these skills have their full configuration

## Related Code

- `.claude/skills/skill-creator/SKILL.md` - manual-only (user explicitly creates skills)
- `.claude/skills/skill-developer/SKILL.md` - manual-only (learning resource, not active workflow)
- `.claude/skills/playwright-skill/SKILL.md` - manual-only (browser automation, shouldn't auto-trigger)
- `.claude/skills/web-design-guidelines/SKILL.md` - manual-only (explicit audit workflow)

## Verification

```bash
# Count skills with disable-model-invocation
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "disable-model-invocation: true" | Measure-Object
# Expected: 4 matches

# Verify specific skills have it
Select-String -Path ".claude/skills/skill-creator/SKILL.md",".claude/skills/skill-developer/SKILL.md",".claude/skills/playwright-skill/SKILL.md",".claude/skills/web-design-guidelines/SKILL.md" -Pattern "disable-model-invocation: true"
# Expected: 4 matches

# Verify these skills still have user-invocable: true
Select-String -Path ".claude/skills/skill-creator/SKILL.md",".claude/skills/skill-developer/SKILL.md",".claude/skills/playwright-skill/SKILL.md",".claude/skills/web-design-guidelines/SKILL.md" -Pattern "user-invocable: true"
# Expected: 4 matches
```

Manual test: Mention "I want to test the UI" in conversation - web-design-guidelines should NOT auto-trigger; must invoke with `/web-design-guidelines`
