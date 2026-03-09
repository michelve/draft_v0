---
status: done
created: 2026-03-09
updated: 2026-03-09
---

# 0013 — Revise a11y skill testing section from jest-axe to Vitest and Playwright

## Deliverable

The "Testing Accessibility" section of the skill provides a correct, runnable testing approach
that works with the project's actual test stack (Vitest for unit tests, Playwright for e2e) and
does not reference `jest-axe`, which is not installed.

## Context and Motivation

The current skill's testing section shows:

```tsx
import { axe } from 'jest-axe';
it('has no accessibility violations', async () => { ... });
```

`jest-axe` is not installed in draft_v0 (only `vitest` v3.0.0 and `@playwright/test` v1.58.2
exist). An engineer following this guidance would get a module not found error immediately.
Separately, the `it()` global is Jest syntax — Vitest uses `test()` or `it()` from explicit
imports. The section also omits any guidance on e2e a11y testing, which is a natural fit given
Playwright is already installed.

This is the final (fourth) of four tasks revising the accessibility skill.

See session plan: `/memories/session/plan.md` for full context.

## Key Decisions

- Do NOT add `jest-axe` or `vitest-axe` to `package.json` in this task — the skill should document the approach and note what to install if the engineer wants automated a11y testing.
- Primary recommendation: Playwright + `@axe-core/playwright` for e2e a11y audits, since Playwright is already installed and configured (`playwright.config.ts` exists).
- Secondary option: `vitest-axe` for component-level unit tests (explicitly mark as "install if needed").
- Vitest syntax: use `import { test, expect } from 'vitest'` — not Jest globals.
- The existing checklist at the bottom of the skill (`- [ ] All interactive elements keyboard accessible` etc.) is correct and complete — keep it unchanged.
- Removed the `axe` unit test block. Manual testing guidance (checklist + browser devtools) should be the default until the engineer opts in to an automated tool.

## Acceptance Criteria

- [ ] Given the testing section, when read, then `jest-axe` is not referenced anywhere.
- [ ] Given the testing section, when the Playwright approach is documented, then it shows: `npm install -D @axe-core/playwright` (optional install note), the correct import `import AxeBuilder from '@axe-core/playwright'`, and a usage example within a `test()` block that calls `await new AxeBuilder({ page }).analyze()`.
- [ ] Given the testing section, when the Vitest approach is documented, then it shows `import { test, expect } from 'vitest'` (not Jest globals) and notes `vitest-axe` as an optional install.
- [ ] Given the testing section when the browser devtools approach is documented, then it mentions the Accessibility panel in Chrome DevTools and the axe DevTools or Wave browser extensions as zero-setup options.
- [ ] Given the accessibility checklist at the end of the skill, when read, then it is unchanged from the original.
- [ ] Given the revised file, when grepped for `jest-axe`, then zero matches are found.
- [ ] Given the revised file, when grepped for `@dsai-io`, then zero matches are found anywhere in the entire file (final cleanup verification covering all four tasks).

## Out of Scope

- Installing `@axe-core/playwright` or `vitest-axe` as project dependencies (separate task if the team decides to adopt automated a11y testing)
- Creating actual test files
- Metadata/frontmatter (task 0010)
- Keyboard/focus code examples (task 0011)
- CSS/styling sections (task 0012)

## Dependencies

- Tasks 0010, 0011, 0012 should be completed first — this task is the final pass and includes a whole-file `@dsai-io` grep as a completion gate.

## Related Code

- `.github/skills/accessibility/SKILL.md` — testing section (~lines 385–400) and checklist section (~lines 402–415)
- `playwright.config.ts` — confirms Playwright is configured and the test setup exists
- `e2e/home.spec.ts` — example of existing Playwright test structure to match style/syntax

## Verification

```bash
# Zero jest-axe references
grep "jest-axe" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Zero @dsai-io references (whole-file final check)
grep "@dsai-io" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Zero dsai references anywhere (whole-file final check)
grep -i "dsai" ".github/skills/accessibility/SKILL.md"
# Should return nothing

# Playwright approach documented
grep "axe-core/playwright" ".github/skills/accessibility/SKILL.md"
# Should show the @axe-core/playwright import

# Vitest syntax (not Jest globals)
grep "from 'vitest'" ".github/skills/accessibility/SKILL.md"
# Should show import { test, expect } from 'vitest'
```
