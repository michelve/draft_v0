---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0018-add-when-to-use-sections-to-workflow-skills

## Deliverable

4 workflow/meta skills (skill-creator, skill-developer, route-tester, shadcn) have explicit "When to Use" sections that clarify their activation context and improve triggering accuracy.

## Context and Motivation

These skills currently lack explicit trigger patterns:

- **skill-creator** - Broad scope "create skills", unclear when to activate
- **skill-developer** - Focuses on mechanics ("how") not context ("when")
- **route-tester** - "API testing" is vague, needs specific triggers
- **shadcn** - Agent-only, but agents need to know when to invoke it

Unlike tech skills (task 0017), these are specialized workflows that need context-specific triggers.

Reference: `/memories/session/plan.md` Section "Phase 3: Improve Discoverability"

## Key Decisions

- skill-creator triggers: "create new skill", "modify skill", "benchmark skill", "skill performance", "add SKILL.md"
- skill-developer triggers: "skill architecture", "skill hooks", "progressive disclosure", "skill-rules.json", "skill structure"
- route-tester triggers: "test API endpoint", "test authentication", "integration test", "API route test", "test Express route"
- shadcn (agent-only) triggers: "when agent needs component registry", "add shadcn component", "install ui component", "component docs lookup"
- Follow adr-writer pattern: include explicit "Do NOT trigger" exclusions where helpful

## Acceptance Criteria

- [ ] Given skill-creator skill, when adding "When to Use" section, then include triggers: "create new skill", "modify existing skill", "benchmark skill performance", "measure skill variance", "optimize skill description", "add SKILL.md", "skill eval"
- [ ] Given skill-developer skill, when adding "When to Use" section, then include triggers: "skill architecture", "skill hooks", "progressive disclosure", "skill-rules.json", "trigger patterns", "enforcement levels", "session tracking"
- [ ] Given route-tester skill, when adding "When to Use" section, then include triggers: "test API endpoint", "write integration test", "test authentication", "test Express route", "API route testing", "JWT cookie test"
- [ ] Given shadcn skill (agent-only), when adding "When to Use" section, then include context: "agent should invoke when user asks to add shadcn component", "component registry lookup", "project presets", "components.json work"
- [ ] Given shadcn section added, when noting user-invocability, then document that user-invocable is false (agent-only)
- [ ] Given all 4 skills updated, when format reviewed, then each has H2 "## When to Use" section with bulleted list
- [ ] Given all 4 skills updated, when testing triggers, then Claude activates skill when conditions met

## Out of Scope

- Tech skills (nodejs, react, prisma, tailwindcss) - covered in task 0017
- Changing shadcn from agent-only to user-invocable - it should stay agent-only
- Complete rewrite of skill content - only add/update the section

## Dependencies

- None - independent documentation work
- Can run in parallel with task 0017

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - reference pattern for explicit triggers and "Do NOT" exclusions (lines ~5-10)
- `.claude/skills/accessibility/SKILL.md` - reference pattern for "When to Use" section structure
- `.claude/skills/skill-creator/SKILL.md` - add section here
- `.claude/skills/skill-developer/SKILL.md` - add section here
- `.claude/skills/route-tester/SKILL.md` - add section here
- `.claude/skills/shadcn/SKILL.md` - add section here, note user-invocable: false

## Verification

```bash
# Verify all 4 skills have "When to Use" section
Select-String -Path ".claude/skills/skill-creator/SKILL.md",".claude/skills/skill-developer/SKILL.md",".claude/skills/route-tester/SKILL.md",".claude/skills/shadcn/SKILL.md" -Pattern "## When to Use"
# Expected: 4 matches

# Verify shadcn has user-invocable: false
Select-String -Path ".claude/skills/shadcn/SKILL.md" -Pattern "user-invocable: false"
# Expected: 1 match
```

Manual test: Say "I want to create a new skill for X" and verify skill-creator is activated
