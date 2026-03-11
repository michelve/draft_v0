---
status: done
created: 2026-03-10
updated: 2026-03-10
---

# 0035-validate-invocation-control-matrix-against-official-docs

## Deliverable

A validation report confirming all `disable-model-invocation` and `user-invocable` configurations across 23 standard skills match the official invocation control matrix, or documenting intentional deviations with clear rationale.

## Context and Motivation

Official Claude Code documentation provides an invocation control matrix:

| Configuration                  | User Invoke? | Claude Invoke? | Description in Context?     |
| ------------------------------ | ------------ | -------------- | --------------------------- |
| (default)                      | Yes          | Yes            | Yes - always loaded         |
| disable-model-invocation: true | Yes          | No             | No - only when user invokes |
| user-invocable: false          | No           | Yes            | Yes - always loaded         |

Current implementation:

- 4 skills with `disable-model-invocation: true` (playwright-skill, skill-creator, skill-developer, web-design-guidelines)
- 1 skill with `user-invocable: false` (shadcn - agent-only pattern)
- 18 skills with default configuration

Need to validate:

1. All current configurations match intended invocation patterns
2. Configurations align with skill purpose (manual-trigger vs auto-suggest)
3. No skills have conflicting frontmatter fields
4. Document any intentional deviations from official matrix

Reference: `/memories/session/plan.md` Phase 5, Step 11

## Key Decisions

- Cross-reference each skill's configuration against official matrix
- Validate configuration matches skill's intended workflow
- Manual-trigger skills (testing, evaluation) should have `disable-model-invocation: true`
- Agent-only skills (no direct user invocation) should have `user-invocable: false`
- Default configuration appropriate when Claude should auto-suggest skill
- Document findings in session memory for audit trail

## Acceptance Criteria

- [ ] Given official invocation control matrix, when reviewing current skills, then create comparison table mapping each skill to matrix row
- [ ] Given 4 skills with disable-model-invocation: true, when validating purpose, then verify all are manual-trigger workflows (testing, evaluation, opt-in features)
- [ ] Given shadcn skill with user-invocable: false, when validating purpose, then verify it's correctly configured as agent-only skill
- [ ] Given 18 skills with default configuration, when validating purpose, then verify Claude auto-suggestion is appropriate for each (general-purpose, workflow skills)
- [ ] Given all configurations reviewed, when checking for conflicts, then verify no skills have both disable-model-invocation: true AND user-invocable: false (undefined behavior)
- [ ] Given any configuration mismatches found, when determining corrections, then evaluate: change configuration to match matrix, or document intentional deviation with rationale
- [ ] Given automatic-code-review and task-check (agent-only skills), when reviewing structure, then document their invocation pattern (Task tool with subagent_type) as separate from standard skill matrix
- [ ] Given validation complete, when documenting findings, then save to /memories/session/invocation-matrix-validation.md with: configuration table, intentional deviations, recommendations
- [ ] Given findings documented, when configuration changes needed, then update affected SKILL.md frontmatter to align with official matrix

## Out of Scope

- Adding new invocation control options - use official matrix as-is
- Testing invocation behavior end-to-end - validation is configuration review only
- Agent-only skills (automatic-code-review, task-check) - different invocation mechanism via Task tool

## Dependencies

- None - can run in parallel with all other tasks (Phase 5 is continuous)

## Related Code

- All `.claude/skills/*/SKILL.md` frontmatter - review disable-model-invocation and user-invocable fields
- `.claude/skills/shadcn/SKILL.md` - reference for user-invocable: false pattern
- `.claude/skills/playwright-skill/SKILL.md` - reference for disable-model-invocation: true pattern
- Official invocation control matrix (in session memory from original audit)

## Verification

```bash
# Generate configuration inventory
Get-ChildItem -Path "e:\GitHub\draft_v0\.claude\skills" -Filter "SKILL.md" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $skill = $_.Directory.Name

    # Parse YAML frontmatter for these fields
    $hasDisableModel = $content -match "disable-model-invocation:\s*true"
    $hasUserInvocable = $content -match "user-invocable:\s*false"

    [PSCustomObject]@{
        Skill = $skill
        DisableModelInvocation = if ($hasDisableModel) { "true" } else { "default" }
        UserInvocable = if ($hasUserInvocable) { "false" } else { "default" }
        Path = $_.FullName
    }
} | Format-Table -AutoSize

# Validate session memory report exists
Test-Path "e:\GitHub\draft_v0\.tasks\.memories\session\invocation-matrix-validation.md"
```
