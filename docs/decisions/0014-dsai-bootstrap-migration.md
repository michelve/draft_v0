---
status: accepted
date: 2026-03-29
---

# Migrate from Tailwind CSS v4 + shadcn/ui to DSAi Design System + Bootstrap 5.3

## Context and Problem Statement

The project originally used Tailwind CSS v4 (CSS-first config) with shadcn/ui components for styling and UI primitives (see ADR 0003, ADR 0004, ADR 0006). As the project's design system matured, we needed a token pipeline that integrates directly with Figma exports, produces multiple output formats (CSS, SCSS, JS, TS, JSON), and aligns with the DSAi design system tooling used across the organization.

Should we continue with Tailwind CSS v4 + shadcn/ui, or migrate to the DSAi design system with Bootstrap 5.3 as the utility framework?

## Decision Drivers

- Need a Figma-to-code token pipeline that syncs design tokens automatically (`pnpm figma:sync`)
- Need multi-format token output (CSS custom properties, SCSS variables, JS/TS constants, JSON) for cross-platform consumption
- Need Bootstrap 5.3 compatibility for the organization's shared component library
- Need structured design token collections (color, typography, spacing, shadow, border, layout) with light/dark theme support
- shadcn/ui components are tightly coupled to Tailwind CSS and Radix UI — they cannot be reused in a Bootstrap-based system

## Considered Options

- Keep Tailwind CSS v4 + shadcn/ui (status quo)
- Migrate to DSAi design system + Bootstrap 5.3
- Migrate to vanilla CSS custom properties without a framework

## Decision Outcome

Chosen option: "Migrate to DSAi design system + Bootstrap 5.3", because it provides an integrated token pipeline from Figma to code, produces multi-format outputs for cross-platform use, and aligns with the organization's Bootstrap-based component standards.

Key changes:

- **Removed**: `tailwindcss`, `@tailwindcss/vite`, `class-variance-authority`, `clsx`, `tailwind-merge`, `shadcn/ui` CLI and all shadcn components
- **Added**: `bootstrap` (5.3.8), `@dsai-io/tools`, `@dsai-io/figma-tokens`, `sass`, `style-dictionary`
- **Token source**: JSON files in `src/collections/` (color, typography, spacing, shadow, border, layout)
- **Token build**: `pnpm tokens:build` runs the DSAi pipeline (validate → transform → multi-theme → sync → sass-theme → postprocess)
- **Generated output**: `src/generated/` with subdirectories for css, scss, js, ts, json
- **Theme integration**: `src/scss/dsai-theme-bs.scss` maps DSAi tokens to Bootstrap 5.3 variables
- **Dark mode**: `[data-dsai-theme="dark"]` attribute selector + `prefers-color-scheme` media query
- **CSS variable prefix**: `--dsai-*` for all design tokens
- **Components**: Custom components using Bootstrap 5.3 classes (e.g., FSM-based Button in `src/client/components/ui/button/`)

### Consequences

- Good, because design tokens sync directly from Figma via `pnpm figma:sync` — no manual translation
- Good, because multi-format output (CSS, SCSS, JS, TS, JSON) enables token consumption across platforms
- Good, because Bootstrap 5.3 provides a mature utility class system and grid layout
- Good, because structured token collections with WCAG compliance metadata improve design-to-code fidelity
- Good, because the build pipeline is configurable via `dsai.config.mjs` with clear separation of concerns
- Bad, because Bootstrap 5.3 has a larger CSS footprint than Tailwind's purged output
- Bad, because existing Tailwind-specific documentation, skills, and instructions must be updated
- Bad, because shadcn/ui's ready-made accessible components (Dialog, Select, DropdownMenu) must be rebuilt or replaced with Bootstrap equivalents
- Neutral, because the `src/client/components/ui/` directory is repurposed for custom Bootstrap-based components instead of shadcn vendor components

### Confirmation

- `pnpm tokens:build` completes without errors and produces all output formats in `src/generated/`
- `pnpm build` produces a clean production build with Bootstrap + DSAi theme
- No references to `tailwindcss`, `shadcn`, `@tailwindcss/vite`, `clsx`, or `tailwind-merge` remain in `package.json`
- All components render correctly with Bootstrap utility classes and DSAi CSS custom properties

## More Information

Supersedes:

- [ADR 0003 — Tailwind CSS v4 with CSS-first config](0003-tailwind-v4-css-first.md)
- [ADR 0004 — shadcn/ui components are immutable](0004-shadcn-ui-immutable.md)
- [ADR 0006 — Biome ignores shadcn/ui directory](0006-biome-ignores-shadcn.md)
