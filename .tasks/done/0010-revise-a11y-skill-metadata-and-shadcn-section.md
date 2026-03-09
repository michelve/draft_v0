---
status: done
created: 2026-03-09
updated: 2026-03-09
---

# 0010 — Revise a11y skill metadata, utilities table, and add shadcn/Radix section

## Deliverable

The accessibility skill's YAML frontmatter, utilities reference table, and opening sections are
accurate to the draft_v0 stack — no DSAi-specific metadata, no references to non-existent packages,
and a new "shadcn/Radix Built-in Accessibility" section that explains what the installed libraries
already handle automatically.

## Context and Motivation

The accessibility skill at `.github/skills/accessibility/SKILL.md` was authored for a different
project ("DSAi") and references utilities, package paths, and CSS tokens that do not exist in
draft_v0. Before an engineer can use this skill effectively it must be aligned with the actual
stack: React 19, shadcn/ui (Radix-based), Tailwind CSS v4, and `radix-ui` flat package (v1.4.3).

This is the first of four tasks that systematically rewrite discrete sections of the skill file.
It covers the header and the "what the stack already gives you" framing — essential context for
all subsequent sections.

See session plan: `/memories/session/plan.md` and PR discussion for full background.

## Key Decisions

- `radix-ui` flat package (v1.4.3) is already installed — import as `import { FocusScope } from 'radix-ui'`. No new dependency required.
- Custom hooks live in `src/client/hooks/` (shadcn alias `@/hooks`). The directory does not yet exist but the alias is defined in `components.json`.
- Do NOT modify any files outside `.github/skills/accessibility/SKILL.md` in this task.
- Remove DSAi-specific `metadata.author` and `license` frontmatter keys — they don't apply here.

## Acceptance Criteria

- [ ] Given the YAML frontmatter, when read, then it contains no `metadata.author: dsai` key and no `license: Complete terms in LICENSE.txt` key.
- [ ] Given the `description` frontmatter field, when read, then it describes the skill in terms of this project (no "DSAi") and matches the updated scope.
- [ ] Given the "DSAi Accessibility Utilities" table, when the section is read, then it is replaced with a table listing: (a) `FocusScope` from `radix-ui` for focus trapping in modals/dialogs, (b) Tailwind built-in utilities (`sr-only`, `motion-reduce:`, `focus-visible:`, `aria-*:` variants), (c) custom hooks location `src/client/hooks/` (`@/hooks`).
- [ ] Given the skill has no existing "shadcn/Radix Built-in Accessibility" section, when the section is added, then it explains: Dialog, DropdownMenu, Select, Tabs, and Combobox shadcn components already include correct ARIA roles, keyboard navigation, and focus management via Radix primitives — engineers should not re-implement these.
- [ ] Given the revised skill, when grepped for `@dsai-io`, then zero matches are found in this section.
- [ ] Given the revised skill, when grepped for `dsai` (case-insensitive), then zero matches are found anywhere in the sections touched by this task.

## Out of Scope

- Keyboard navigation code examples (task 0011)
- Focus management (`useFocusTrap`/`FocusScope`) code examples (task 0011)
- CSS token replacement (`--dsai-color-*`) (task 0012)
- Focus style Tailwind replacement (task 0012)
- `sr-only` and `motion-reduce:` sections (task 0012)
- Testing section (`jest-axe` replacement) (task 0013)

## Dependencies

- None — this task is self-contained and is the logical starting point for the four-task series.

## Related Code

- `.github/skills/accessibility/SKILL.md` — file to edit (lines 1–26 cover frontmatter + utilities table)
- `components.json` — confirms `@/hooks` alias
- `package.json` — confirms `radix-ui` v1.4.3 is installed
- `src/client/components/ui/button.tsx` — reference for how shadcn components already use `aria-invalid:` and `focus-visible:` Tailwind variants

## Verification

```bash
# Zero DSAi references in the updated sections
grep -i "dsai" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Zero @dsai-io package references
grep "@dsai-io" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Confirm FocusScope import documented correctly
grep "FocusScope" ".github/skills/accessibility/SKILL.md"
# Should show: import { FocusScope } from 'radix-ui'
```
