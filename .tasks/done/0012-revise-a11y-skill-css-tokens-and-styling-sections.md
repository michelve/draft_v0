---
status: done
created: 2026-03-09
updated: 2026-03-09
---

# 0012 - Revise a11y skill CSS tokens, focus styles, sr-only, and motion sections

## Deliverable

The "Color Contrast", "Visible Focus", "Screen Reader Only Text", and "Reduced Motion" sections
of the accessibility skill use Tailwind CSS v4 utilities and the project's actual CSS custom
properties (`--ring`, `--primary`, `--destructive`, `--foreground`, `--background`) - no DSAi
color tokens or raw class names.

## Context and Motivation

The current skill references CSS custom properties that don't exist in draft_v0
(`--dsai-color-gray-900`, `--dsai-color-blue-500`, etc.) and raw CSS class names
(`.dsai-component`, `.dsai-animated`) along with a raw `.sr-only {}` CSS block. The project uses
Tailwind CSS v4 with a CSS-first theme, meaning these are expressed as Tailwind utilities
(`focus-visible:ring-[3px] focus-visible:ring-ring/50`) and built-in classes (`sr-only`,
`motion-reduce:`). An engineer following the current guidance would produce styles that don't
integrate with the design system.

This is the third of four tasks revising the accessibility skill. It covers all purely-styling
guidance sections.

See session plan: `/memories/session/plan.md` for full context.
Reference: `src/client/index.css` for the definitive list of CSS custom properties.

## Key Decisions

- Color tokens come from `src/client/index.css` `@theme inline` block. Use: `--ring`, `--primary`, `--destructive`, `--foreground`, `--background`, `--muted-foreground`. Do NOT invent new var names.
- Focus styles: document Tailwind utilities only - `focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring`. Reference the existing button.tsx implementation as the pattern to follow.
- `sr-only`: replace the raw CSS block entirely with the Tailwind built-in `sr-only` utility. Add `not-sr-only` as the counterpart.
- Reduced motion: replace `.dsai-animated { animation: none; }` with Tailwind `motion-reduce:transition-none motion-reduce:animate-none` variants. Keep the `@media (prefers-reduced-motion: reduce)` CSS block as a secondary option for non-component CSS (e.g., `custom.css`).
- The WCAG 2.1 AA contrast ratio table (4.5:1 / 3:1) is standard - keep it unchanged.
- Color contrast compliant combinations: replace raw hex values with semantic Tailwind classes (`bg-primary text-primary-foreground`, `bg-background text-foreground`, `bg-destructive text-destructive-foreground`).

## Acceptance Criteria

- [ ] Given the color contrast section, when the "DSAi Compliant Combinations" block is read, then it uses Tailwind semantic class pairs (`bg-primary text-primary-foreground`) instead of `--dsai-color-*` variables or hex values.
- [ ] Given the color contrast section, when the WCAG ratio table is read, then it is unchanged (4.5:1 / 3:1 ratios are WCAG AA standard).
- [ ] Given the visible focus section, when the code example is read, then it shows `focus-visible:ring-[3px] focus-visible:ring-ring/50` Tailwind classes, referencing `src/client/components/ui/button.tsx` as the existing pattern to follow.
- [ ] Given the visible focus section, when searched for `.dsai-component`, then zero results are found.
- [ ] Given the screen reader only text section, when read, then the raw CSS `.sr-only { position: absolute; ... }` block is replaced with a note that Tailwind provides the `sr-only` built-in utility, plus the JSX usage example with `<span className="sr-only">`.
- [ ] Given the reduced motion section (CSS Alternative), when read, then `.dsai-animated` is replaced with a generic `.animated` class example in the `@media` block with a note to add it to `src/client/custom.css` if needed.
- [ ] Given the reduced motion section, when the Tailwind variant is documented, then it shows `motion-reduce:transition-none` and `motion-reduce:animate-none` applied as Tailwind utilities inline.
- [ ] Given the revised file, when grepped for `dsai-color` (case-insensitive), then zero matches are found.
- [ ] Given the revised file, when grepped for `.dsai-`, then zero matches are found.
- [ ] Given the revised file, when grepped for `#0a58ca` or `#fafbfc` or `#212529`, then zero hardcoded hex values from the DSAi system remain.

## Out of Scope

- Metadata/frontmatter and utilities table (task 0010)
- Keyboard navigation and focus management code examples (task 0011)
- Testing section (task 0013)
- Adding custom CSS to `src/client/custom.css` - the skill documents the pattern only.
- Modifying `src/client/index.css` - read it as reference, do not change it.

## Dependencies

- Task 0010 completed - ensures the overall skill framing is set before sections are revised.
- Task 0011 can proceed in parallel (different sections of the file).

## Related Code

- `.github/skills/accessibility/SKILL.md` - color contrast section (~lines 310–345), visible focus (~lines 347–368), sr-only (~lines 370–383), CSS reduced motion (~lines 295–307)
- `src/client/index.css` - `@theme inline` block containing `--ring`, `--primary`, `--destructive`, `--foreground`, `--background`, `--muted`, `--muted-foreground` tokens (use these exact names)
- `src/client/components/ui/button.tsx` - the definitive focus-visible pattern in production: `focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`
- `src/client/custom.css` - where project-level CSS overrides live (currently empty; reference for reduced motion guidance)

## Verification

```bash
# Zero DSAi color token references
grep -i "dsai-color" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Zero .dsai- class references
grep "\.dsai-" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# focus-visible Tailwind pattern present
grep "focus-visible:ring" ".github/skills/accessibility/SKILL.md"
# Should show the ring-[3px] pattern

# sr-only Tailwind utility documented
grep "sr-only" ".github/skills/accessibility/SKILL.md"
# Should show className="sr-only" usage

# motion-reduce: Tailwind variant documented
grep "motion-reduce:" ".github/skills/accessibility/SKILL.md"
# Should show motion-reduce:transition-none
```
