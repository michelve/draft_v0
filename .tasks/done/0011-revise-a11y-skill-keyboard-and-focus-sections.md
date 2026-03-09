---
status: done
created: 2026-03-09
updated: 2026-03-09
---

# 0011 — Revise a11y skill keyboard navigation and focus management sections

## Deliverable

The "Keyboard Navigation" and "Focus Management" sections of the accessibility skill reference only
vanilla React patterns and `radix-ui` primitives — every code example compiles correctly against the
installed packages in draft_v0.

## Context and Motivation

The accessibility skill at `.github/skills/accessibility/SKILL.md` currently imports custom hooks
(`useKeyPress`, `getArrowKeyHandler`, `useFocusTrap`, `trapFocus`, `createRovingTabindex`) from
`@dsai-io/react`, a package that does not exist in draft_v0. Any engineer following these examples
would get runtime import errors. These two sections are the most heavily code-laden parts of the
skill and contain the most DSAi-specific references.

This is the second of four tasks revising the accessibility skill. It depends on task 0010 (metadata
and framing) being complete.

See session plan: `/memories/session/plan.md` for full context.

## Key Decisions

- `useKeyPress` from `@dsai-io/react` → replace with a vanilla React hook pattern using `useEffect` + `addEventListener('keydown', ...)` stored at `src/client/hooks/useKeyPress.ts` (`@/hooks/useKeyPress`).
- `getArrowKeyHandler` from `@dsai-io/react` → replace with an inline `onKeyDown` handler pattern (no separate utility needed in this project for single-use cases).
- `useFocusTrap` from `@dsai-io/react` → replace with `<FocusScope loop trapped>` from `radix-ui` (already installed v1.4.3). Document as a JSX component, not a hook.
- `trapFocus` (low-level utility) and `createRovingTabindex` from `@dsai-io/react` → remove entirely; Radix handles both use cases.
- `announceToScreenReader` from `@dsai-io/react` → replace with the JSX live region pattern already covered in the ARIA section (no external utility).
- The "Keyboard Keys by Component Type" reference table is WCAG-standard — keep it unchanged.
- `useReducedMotion` from `@dsai-io/react` → replace with a vanilla `window.matchMedia('(prefers-reduced-motion: reduce)')` + `useEffect` hook pattern at `src/client/hooks/useReducedMotion.ts`.
- The "Return Focus Pattern" (pure `useRef` + `useEffect`) is already framework-agnostic — keep it unchanged.

## Acceptance Criteria

- [ ] Given the keyboard navigation section, when the `useKeyPress` hook example is read, then it shows `import { useKeyPress } from '@/hooks/useKeyPress'` and provides the hook implementation using `useEffect` + `addEventListener`.
- [ ] Given the keyboard navigation section, when the `getArrowKeyHandler` example is read, then it is replaced with an equivalent inline `onKeyDown` arrow function handler using `e.key === 'ArrowUp'` etc. — no import required.
- [ ] Given the focus management section, when the `useFocusTrap` example is read, then it is replaced with `<FocusScope loop trapped>` wrapping pattern with `import { FocusScope } from 'radix-ui'`.
- [ ] Given the focus management section, when searched for `trapFocus` or `createRovingTabindex`, then zero results are found.
- [ ] Given the screen reader section, when `announceToScreenReader` is searched, then it is replaced with the JSX `aria-live` region pattern only.
- [ ] Given the reduced motion section, when `useReducedMotion` hook example is read, then it shows a self-contained vanilla hook implementation using `window.matchMedia` (no `@dsai-io/react` import).
- [ ] Given the revised sections, when grepped for `@dsai-io`, then zero matches are found.
- [ ] Given the revised sections, when all code examples are reviewed, then every import statement references either `react`, `radix-ui`, or a local `@/hooks/` path.
- [ ] Given the "Keyboard Keys by Component Type" reference table, when read, then it is unchanged from the original.
- [ ] Given the "Return Focus Pattern" code block, when read, then it is unchanged from the original.

## Out of Scope

- Metadata/frontmatter and utilities table (task 0010)
- CSS token replacement (`--dsai-color-*`) (task 0012)
- Focus style CSS → Tailwind conversion (task 0012)
- `sr-only` raw CSS → Tailwind (task 0012)
- Testing section (task 0013)
- Creating actual hook files in `src/client/hooks/` — the skill documents the pattern; hook creation is separate work triggered by feature tasks.

## Dependencies

- Task 0010 completed — ensures the utilities table framing is in place before code examples are updated.

## Related Code

- `.github/skills/accessibility/SKILL.md` — focus management section (~lines 140–240), keyboard section (~lines 50–110)
- `src/client/components/ui/button.tsx` — example of how `onKeyDown` is handled in this project
- `radix-ui` package docs: `FocusScope` accepts `loop` (cycles Tab) and `trapped` (prevents escape) boolean props; `onEscapeKeyDown` for close callback

## Verification

```bash
# Zero @dsai-io references in entire file
grep "@dsai-io" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# FocusScope import is correct
grep "FocusScope" ".github/skills/accessibility/SKILL.md"
# Should show: import { FocusScope } from 'radix-ui'

# No trapFocus or createRovingTabindex references remain
grep -E "trapFocus|createRovingTabindex" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Local hook imports use @/hooks path
grep "@/hooks" ".github/skills/accessibility/SKILL.md"
# Should show useKeyPress and useReducedMotion imports
```
