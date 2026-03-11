# TODO

## Tier 1 — Foundation

These are prerequisites for everything else. Low effort, high impact.

- [ ] Install core shadcn components — `card`, `dialog`, `input`, `label`, `select`, `textarea`, `tabs`, `avatar`, `badge`, `tooltip`, `dropdown-menu`, `sheet`, `sidebar`, `skeleton`, `sonner`, `breadcrumb`
- [ ] App shell / layout — sidebar + header + breadcrumbs using shadcn `sidebar` and `breadcrumb`
- [ ] Error pages — 404 catch-all route, 500 error boundary fallback
- [ ] Loading states — create `SuspenseLoader` and `LoadingOverlay` components (referenced in conventions but don't exist yet)
- [ ] Toast system — install shadcn `sonner`, create a wrapper for consistent toast notifications
- [ ] Dark mode toggle — theme CSS vars exist but there's no toggle; add a theme switcher component
- [ ] Error boundary component — React error boundary for graceful crash recovery
- [ ] Database seed script — `pnpm db:seed` with realistic sample data for dev/demos

## Tier 2 — Testing & Confidence

Build trust in the codebase. Catch regressions before merge.

- [ ] Unit tests — add Vitest tests for user service, user repository, and utility functions (0 tests exist today)
- [ ] API integration tests — test Express routes with `supertest` (CRUD, validation, error codes)
- [ ] React Testing Library setup — component tests with `@testing-library/react` for hooks, forms, query invalidation
- [ ] MSW (Mock Service Worker) — mock API responses in frontend tests and Storybook
- [ ] Accessibility testing — `@axe-core/playwright` in e2e tests for automated WCAG 2.1 AA checks in CI
- [ ] Visual regression testing — Playwright screenshot comparisons in CI to catch unintentional visual changes

## Tier 3 — Delight

Makes the project shine for designers, product, and engineers.

- [ ] Dashboard page — `/dashboard` route with cards, stats, and a data table
- [ ] Component gallery page — internal `/components` route showing all UI components with variants (living style guide)
- [ ] Form example — working create/edit form with React Hook Form + Zod + error states + mutation
- [ ] Storybook — component playground for designers to browse and interact without running the full app
- [ ] OpenAPI / API docs — auto-generate API documentation from route definitions
- [ ] Design token documentation — auto-generate a tokens page from CSS variables (colors, spacing, radii, typography)
- [ ] Figma design token sync — use Figma Variables REST API or Style Dictionary to sync tokens Figma ↔ code

## LSP Servers

- [x] Add TypeScript LSP server (`.lsp.json`) — provides type-aware completions, diagnostics, and refactoring in Claude Code. Bundled in hugin-v0 plugin v1.1.0

## Skills

- [x] Move skills into their own plugins — packaged as `hugin-v0` plugin
- [ ] Continuously revise and iterate on existing skills — tighten triggers, improve output quality, reduce hallucinations
- [ ] Build a dedicated Figma workflow skill — design tokens → component → Code Connect in one guided flow
- [ ] Integrate Playwright into the Figma workflow — screenshot Figma frame, implement component, screenshot result, diff for fidelity check

## Prompts

- [ ] Enhance existing prompt templates with richer context and step sequencing
- [ ] Add a `design-review` prompt — compares implemented component against Figma spec using Playwright screenshot diff
- [ ] Add a `onboard` prompt — walks a new team member through the project conventions and AI setup

## Agents

- [ ] Improve agent instructions — clearer exit criteria, better error recovery, tighter scope per agent
- [ ] Add a `design-qa` agent — autonomous Figma-to-screenshot fidelity checker using Playwright

## Setup & Onboarding

- [ ] Build a better init setup flow — user chooses their AI platform at project init (VS Code Copilot, Claude Code, Cursor, etc.) and gets the right skill/instruction files configured automatically
- [ ] Make it easy to opt in/out of individual skills without editing config files manually

## Integrations

- [ ] Playwright + Figma integration — use Playwright to validate implemented designs match Figma specs pixel-by-pixel as part of CI
