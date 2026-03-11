---
status: not-feasible
created: 2026-03-10
updated: 2026-03-10
---

# 0020-configure-fork-context-for-workflow-skills

## Status: NOT FEASIBLE

**Reason:** The `context` and `agent` attributes are NOT supported in Claude Code skill YAML frontmatter according to the linter validation.

**Supported YAML attributes:** argument-hint, compatibility, description, disable-model-invocation, license, metadata, name, user-invocable.

**Attempted:** Added `context: fork` and `agent: default` to 5 workflow skills. All edits failed validation with error: "Attribute 'context' is not supported in skill files."

**Conclusion:** Context isolation and agent routing are NOT configurable via skill frontmatter in the current Claude Code skill system. This feature may have been planned but is not implemented, or may require a different mechanism (e.g., runSubagent tool, skill-rules.json hooks, or future Claude Code features).

**Alternative approaches:**

- Workflow skills can use `disable-model-invocation: true` to require explicit user invocation (already implemented in Task 0024 for some skills)
- Use the `runSubagent` tool explicitly within skill content to spawn isolated contexts programmatically
- Document in skill content that workflows should be treated as independent (user education, not system enforcement)

## Original Deliverable

5 independent workflow skills have `context: fork` and `agent: default` configured in their YAML frontmatter, enabling context isolation for complete workflows that run independently from general coding tasks.

## Context and Motivation

Some skills represent complete, isolated workflows that benefit from running in a forked context:

- Prevents context bleed between workflow and main conversation
- Focuses agent resources on one task at a time
- Cleaner separation between design/planning and implementation phases

**Skills to configure**:

1. **adr-writer** - ADR creation workflow (independent decision recording)
2. **figma-implement-design** (consolidated) - Design-to-code workflow (separate from general coding)
3. **code-connect-components** - Code Connect mapping (distinct from design implementation)
4. **create-design-system-rules** - Design system setup (separate from component work)
5. **create-tasks** - Task breakdown from PRD (independent workflow)

**NOT using fork context**: Generic tech skills (react, prisma, nodejs, tailwindcss) augment existing context.

Reference: `/memories/session/plan.md` Section "Phase 4: Advanced Configuration"

## Key Decisions

- Use `context: fork` to spawn isolated subagent context
- Use `agent: default` (not specialized agent - these are general workflows)
- Only apply to complete workflows, not tech augmentation skills
- Place configuration after `user-invocable` in YAML frontmatter
- Document in skill content why fork isolation benefits the workflow

## Acceptance Criteria

- [ ] Given adr-writer skill, when adding fork configuration, then add `context: fork` and `agent: default` to YAML frontmatter
- [ ] Given figma-implement-design skill (consolidated), when adding fork configuration, then add `context: fork` and `agent: default`
- [ ] Given code-connect-components skill, when adding fork configuration, then add `context: fork` and `agent: default`
- [ ] Given create-design-system-rules skill, when adding fork configuration, then add `context: fork` and `agent: default`
- [ ] Given create-tasks skill, when adding fork configuration, then add `context: fork` and `agent: default`
- [ ] Given all 5 skills updated, when validating YAML, then frontmatter parses without errors
- [ ] Given all 5 skills updated, when counting fork contexts, then find exactly 5 skills with `context: fork`
- [ ] Given fork configuration added, when skill documentation reviewed, then each explains why context isolation benefits the workflow

## Out of Scope

- Using specialized agents (e.g., `agent: plan-reviewer`) - use default agent for these workflows
- Adding fork context to tech skills (react, prisma, etc.) - they should augment existing context
- Testing actual fork behavior - assumes Claude Code fork mechanism works

## Dependencies

- Task 0016 (consolidate Figma skills) must be complete - configure figma-implement-design, not implement-design
- Task 0019 (user-invocable) should be complete for consistent frontmatter structure

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - workflow skill (ADR creation is independent)
- `.claude/skills/figma-implement-design/SKILL.md` - workflow skill (design-to-code isolated)
- `.claude/skills/code-connect-components/SKILL.md` - workflow skill (Code Connect mapping)
- `.claude/skills/create-design-system-rules/SKILL.md` - workflow skill (design system setup)
- `.claude/skills/create-tasks/SKILL.md` - workflow skill (task breakdown from PRD)

## Verification

```bash
# Count skills with fork context
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "context: fork" | Measure-Object
# Expected: 5 matches

# Verify each has agent specified
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "agent: default" | Measure-Object
# Expected: 5+ matches (these 5 plus any others that might exist)

# Check specific skills have fork config
Select-String -Path ".claude/skills/adr-writer/SKILL.md",".claude/skills/figma-implement-design/SKILL.md",".claude/skills/code-connect-components/SKILL.md",".claude/skills/create-design-system-rules/SKILL.md",".claude/skills/create-tasks/SKILL.md" -Pattern "context: fork"
# Expected: 5 matches
```

Manual test: Invoke `/adr-writer` and verify it runs in isolated context (check session logs for fork indicator)
