---
status: done
created: 2026-03-10
updated: 2026-03-10
---

# 0030-research-and-evaluate-hooks-field-for-skills

## Deliverable

A comprehensive evaluation document in session memory detailing the `hooks` field functionality, available hook types, skill-scoped vs global hooks differences, and recommendations for which 3-5 standard skills would benefit from hook integration with proof-of-concept implementation.

## Context and Motivation

Official Claude Code documentation mentions `hooks` field in YAML frontmatter for skill-scoped lifecycle hooks, but ZERO standard skills currently use this feature.

The automatic-code-review agent-only skill has a `hooks/` directory with hook implementations, but uses a different pattern (global hooks, not skill-scoped).

Need research to:

1. Understand available hook types (UserPromptSubmit, PreToolUse, others?)
2. Clarify skill-scoped hooks vs global hooks (.claude/hooks/)
3. Identify use cases: workflow triggers, input validation, MCP coordination, context injection
4. Determine which skills would benefit most from hooks

Reference: `/memories/session/plan.md` Phase 3, Step 6

## Key Decisions

- Research phase only - implementation in POC form, not production rollout
- Focus on skill-scoped hooks (frontmatter field), not global hooks
- Evaluate benefits vs complexity before recommending broader adoption
- Document hook types, lifecycle, and scoping rules for future reference
- Consider maintenance burden - hooks add indirection and debugging complexity

## Acceptance Criteria

- [ ] Given official Claude Code documentation, when searching for hooks reference, then locate complete hooks documentation (may require additional URL fetch if not in current cache)
- [ ] Given hooks documentation, when reviewing available types, then document all hook types (UserPromptSubmit, PreToolUse, others) with lifecycle descriptions
- [ ] Given hooks documentation, when comparing skill-scoped vs global, then document scoping rules and when each is appropriate
- [ ] Given hooks understanding, when analyzing current skills, then identify 3-5 candidates that would benefit from hook integration
- [ ] Given candidate skills identified, when defining use cases, then document specific workflows: pre-validation (check prerequisites), post-processing (cleanup), tool coordination (MCP), context injection (gather data before skill loads)
- [ ] Given use case analysis, when selecting POC candidate, then choose 1 skill for proof-of-concept implementation
- [ ] Given POC skill selected, when implementing hook, then add `hooks` field to frontmatter and create hook handler
- [ ] Given POC implementation, when testing hook triggers, then verify lifecycle fires correctly and skill behavior changes as expected
- [ ] Given all research and testing, when documenting findings, then save to /memories/session/hooks-evaluation.md with recommendations for broader adoption or deferral

## Out of Scope

- Production rollout of hooks across all skills - Phase 3 is evaluation only
- Complex hook logic - keep POC simple (validation or logging)
- Hook debugging infrastructure - use console logging for POC
- Interaction with global hooks - focus on skill-scoped only

## Dependencies

- Official hooks documentation (may need to fetch additional pages beyond current cache)

## Related Code

- `.github/skills/automatic-code-review/hooks/` - reference implementation (global hooks pattern)
- `.claude/hooks/` - existing global hooks directory
- Official Claude Code hooks documentation (URL TBD based on official docs structure)

## Verification

```bash
# No code verification - this is research task
# Success criteria: session memory file exists with complete analysis

Test-Path "e:\GitHub\draft_v0\.tasks\.memories\session\hooks-evaluation.md"

# If POC implemented, test hook trigger
# 1. Invoke skill with hook
# 2. Verify hook handler executes (check console logs)
# 3. Verify skill behavior reflects hook logic
```
