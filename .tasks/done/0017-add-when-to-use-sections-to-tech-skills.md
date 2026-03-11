---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0017-add-when-to-use-sections-to-tech-skills

## Deliverable

4 generic technology skills (nodejs, react, prisma, tailwindcss) have explicit "When to Use" sections with specific trigger phrases that help Claude understand when to apply each skill.

## Context and Motivation

Generic tech skills currently have vague descriptions like "Use when working with X". This makes it unclear when Claude should activate the skill. By adding explicit "When to Use" sections with specific trigger phrases, we improve skill activation accuracy.

Current state:

- **nodejs** - "when building Node.js backend"
- **react** - "when working with React components"
- **prisma** - "when working with Prisma"
- **tailwindcss** - "when styling with Tailwind"

Target state: Explicit trigger patterns like accessibility skill's "When to Use" section.

Reference: `/memories/session/plan.md` Section "Phase 3: Improve Discoverability"

## Key Decisions

- Follow the accessibility skill pattern: dedicated ## When to Use section with bulleted trigger phrases
- Include both user phrases ("create component") and technical terms ("Suspense boundary")
- Cover React 19 specific patterns (no forwardRef, ref as prop, etc.)
- Map to actual draft_v0 architecture (Express, Prisma, TanStack patterns)
- Keep skill descriptions focused - don't turn into full documentation

## Acceptance Criteria

- [ ] Given nodejs skill, when adding "When to Use" section, then include triggers: "create Express API", "add middleware", "configure Node.js server", "async/await patterns", "error handling", "layered architecture"
- [ ] Given react skill, when adding "When to Use" section, then include triggers: "create component", "use hooks", "Suspense boundary", "lazy loading", "React 19 patterns", "ref as prop", "component structure"
- [ ] Given prisma skill, when adding "When to Use" section, then include triggers: "database query", "Prisma schema", "add model", "migration", "Prisma Client", "relations", "transactions"
- [ ] Given tailwindcss skill, when adding "When to Use" section, then include triggers: "style component", "add Tailwind classes", "responsive design", "dark mode", "Tailwind v4", "theme configuration", "utility classes"
- [ ] Given all 4 skills updated, when reviewing format, then each has H2 "## When to Use" section with bulleted list
- [ ] Given all 4 skills updated, when testing trigger phrases, then Claude activates skill when user mentions any listed trigger
- [ ] Given "When to Use" sections added, when skill descriptions remain, then they stay concise (description should reference "When to Use" or stay high-level)

## Out of Scope

- Adding "When to Use" to meta skills (skill-creator, skill-developer) - covered in task 0018
- Adding "When to Use" to route-tester or shadcn - covered in task 0018
- Complete rewrite of skill content - only add the new section
- Documenting every Tailwind utility or React hook - keep focused on when to trigger

## Dependencies

- None - independent documentation work

## Related Code

- `.claude/skills/accessibility/SKILL.md` - reference pattern for "When to Use" section (lines ~10-20)
- `.claude/skills/nodejs/SKILL.md` - add section here
- `.claude/skills/react/SKILL.md` - add section here
- `.claude/skills/prisma/SKILL.md` - add section here
- `.claude/skills/tailwindcss/SKILL.md` - add section here
- `.claude/rules/react.md` - React 19 conventions to reference
- `.claude/rules/prisma.md` - Prisma patterns to reference
- `.claude/rules/express-api.md` - Node.js/Express patterns to reference
- `.claude/rules/tailwind.md` - Tailwind v4 patterns to reference

## Verification

```bash
# Verify all 4 skills have "When to Use" section
Select-String -Path ".claude/skills/nodejs/SKILL.md",".claude/skills/react/SKILL.md",".claude/skills/prisma/SKILL.md",".claude/skills/tailwindcss/SKILL.md" -Pattern "## When to Use"
# Expected: 4 matches

# Check that each has bulleted list (at least 3 triggers)
Select-String -Path ".claude/skills/nodejs/SKILL.md" -Pattern "^- " | Measure-Object
# Expected: 5+ bullet points
```

Manual test: Say "I want to create a React component with Suspense" and verify react skill is activated
