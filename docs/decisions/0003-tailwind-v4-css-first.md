---
status: accepted
date: 2026-03-07
---

# Tailwind CSS v4 with CSS-First Config

## Context and Problem Statement

The project needs a styling solution that works well with React 19, supports dark mode, and integrates cleanly with shadcn/ui components.

Which CSS framework and configuration approach should we use?

## Considered Options

- Tailwind CSS v3 — stable, `tailwind.config.js` based, well-documented
- Tailwind CSS v4 — CSS-first config via `@theme inline`, better performance, native Vite plugin
- CSS Modules — scoped styles but poor DX for responsive/dark mode
- Styled Components — runtime CSS-in-JS, conflicts with SSR patterns

## Decision Outcome

Chosen option: "Tailwind CSS v4", because it eliminates the JavaScript config file, offers a native Vite plugin for faster builds, and provides a CSS-first configuration model that keeps theming in CSS where it belongs.

Configuration details:

- CSS-first configuration via `@theme inline` in `src/client/index.css`
- `@tailwindcss/vite` plugin (not PostCSS)
- oklch color space for consistent color perception
- Class-based dark mode via `@custom-variant dark (&:is(.dark *))`
- `cn()` utility (clsx + tailwind-merge) for conditional class merging
- `cva()` from class-variance-authority for variant-based component styling

### Consequences

- Good, because no `tailwind.config.js` file — all theming lives in CSS where it belongs
- Good, because oklch colors produce perceptually uniform palettes
- Good, because native Vite plugin is faster than PostCSS-based setup
- Good, because `cn()` prevents class conflicts when composing Tailwind utilities
- Bad, because Tailwind v4 is newer — some community plugins/guides still reference v3 patterns
- Bad, because oklch values are less human-readable than hex/HSL
- Bad, because AI skills and documentation need to be kept in sync with v4 conventions (we already fixed this)
- Neutral, because `@apply` is still available but discouraged outside `@layer base`
- Neutral, because breakpoints remain mobile-first: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
