---
status: done
created: 2026-03-10
updated: 2026-03-10
---

# 0032-optimize-agent-field-for-fork-context-skills

## Deliverable

The 5 skills using `context: fork` have optimized `agent` field configuration after evaluating Explore (read-only), Plan (planning), and default (general-purpose) agent types, with documented behavioral differences and updated configurations where appropriate.

## Context and Motivation

Currently 5 skills use `context: fork` for subagent execution, but ALL use `agent: default`:

- adr-writer
- code-connect-components
- create-design-system-rules
- create-tasks
- figma-implement-design

Official Claude Code documentation describes 3 agent types:

- **Explore**: Fast read-only codebase exploration and Q&A
- **Plan**: Planning and strategy development
- **default**: General-purpose agent (current configuration)

Potential optimizations:

- **create-tasks**: May benefit from `agent: Plan` (task planning workflow)
- Research-heavy skills: May benefit from `agent: Explore`

Need to evaluate if different agent types produce better results for these specific workflows.

Reference: `/memories/session/plan.md` Phase 3, Step 8

## Key Decisions

- Test each of the 5 fork skills with appropriate alternative agent type
- Use consistent test scenarios for fair comparison (same prompts across agents)
- Document behavioral differences observed: response structure, tool usage, reasoning style
- Make evidence-based changes only - keep default unless clear benefit shown
- Consider workflow alignment: planning tasks → Plan agent, research tasks → Explore agent

## Acceptance Criteria

- [ ] Given official agent documentation, when reviewing agent types, then document Explore, Plan, and default capabilities and constraints
- [ ] Given create-tasks skill, when testing with `agent: Plan`, then compare output quality and structure vs default for 3-5 task creation scenarios
- [ ] Given adr-writer skill, when testing with different agents, then evaluate if Explore/Plan improve architecture decision analysis
- [ ] Given Figma-related skills (code-connect-components, create-design-system-rules, figma-implement-design), when testing with Explore agent, then evaluate if read-only codebase exploration improves design-to-code workflows
- [ ] Given all test scenarios, when documenting behavioral differences, then capture: tool usage patterns, response structure, reasoning depth, execution time, error handling
- [ ] Given test results analyzed, when making optimization decisions, then update agent field only where evidence shows clear improvement in workflow-aligned scenarios
- [ ] Given agent fields updated (if any), when invoking updated skills, then verify new agent type activates correctly and produces expected behavior
- [ ] Given evaluation complete, when documenting findings, then save to /memories/session/agent-field-optimization.md with rationale for changes or keeping defaults

## Out of Scope

- Creating custom agent types - use available types only (Explore, Plan, default)
- Agent performance tuning - use agents as-is from Claude Code
- Testing non-fork skills - only the 5 existing fork skills are in scope
- Agent chaining or multi-agent workflows - single agent per skill only

## Dependencies

- None - can run in parallel with other Phase 3 evaluations (tasks 0030, 0031)

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - current: context: fork, agent: default
- `.claude/skills/code-connect-components/SKILL.md` - current: context: fork, agent: default
- `.claude/skills/create-design-system-rules/SKILL.md` - current: context: fork, agent: default
- `.claude/skills/create-tasks/SKILL.md` - current: context: fork, agent: default - CANDIDATE for Plan agent
- `.claude/skills/figma-implement-design/SKILL.md` - current: context: fork, agent: default

## Verification

```bash
# No automated verification - manual testing and comparison
# Success criteria: session memory optimization report exists

Test-Path "e:\GitHub\draft_v0\.tasks\.memories\session\agent-field-optimization.md"

# Manual test protocol
# 1. Select test scenarios per skill (e.g., create-tasks: "break down complex feature into tasks")
# 2. Invoke skill with default agent, record output characteristics
# 3. Update SKILL.md with alternative agent: Plan or Explore
# 4. Invoke skill with same scenarios, record behavioral differences
# 5. Compare workflow alignment, quality, and efficiency
# 6. Revert or keep agent change based on evaluation
```
