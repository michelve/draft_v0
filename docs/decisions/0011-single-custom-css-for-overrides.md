---
status: accepted
date: 2026-03-08
---

# Single custom.css file for project-level style overrides

## Context and Problem Statement

Tailwind CSS v4 handles utility classes and design tokens via `src/client/index.css` (`@theme inline`). But some styles cannot be expressed as Tailwind utilities: `@font-face` declarations, `@keyframes`, CSS custom properties not tied to Tailwind tokens, and complex CSS selectors. Where should these live, and how many files should there be?

## Considered Options

- Multiple SCSS partials (`_tokens.scss`, `_typography.scss`, `_animations.scss`) compiled to CSS — structured but requires `sass` dependency and a build step
- Single `custom.scss` file compiled to CSS — simpler but still needs `sass`
- Single `custom.css` file using native CSS nesting — no build step, leverages browser/Vite native CSS support, one file to find everything

## Decision Outcome

Chosen option: "single `src/client/custom.css`", because native CSS nesting (supported by all modern browsers and Vite's PostCSS pipeline) eliminates the need for Sass entirely, one file is easier to locate and reason about, and the scope of project-level overrides is small enough that splitting into partials adds overhead without benefit.

### Consequences

- Good, because no `sass` dependency — one fewer build-time tool
- Good, because `custom.css` is a single known location for every non-utility style: `@font-face`, `@keyframes`, Figma-exported CSS variables, and selector-based overrides
- Good, because import order is enforced in `src/client/main.tsx`: `index.css` (Tailwind) first, `custom.css` second — overrides always win the cascade
- Neutral, because large projects may eventually need to split this file; when that happens a `src/client/styles/` directory with partials is the natural next step
- Bad, because there is no compile-time variable interpolation or mixins — anything requiring Sass features would require adding it back
