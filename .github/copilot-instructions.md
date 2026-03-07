---
applyTo: "**"
---

# Copilot Instructions

## Engineering Philosophy

- **First Principles Over Convention** — Question assumptions, understand WHY things work
- **Simple Over Clever** — Solve the actual problem, not the general case
- **Measure, Don't Guess** — Data over intuition for performance claims
- **#NoMessLeftBehind** — Never leave broken builds, every error must be resolved

## Tech Stack

- Frontend: React 19, TypeScript, TanStack Router/Query, Tailwind CSS v4, shadcn/ui
- Backend: Node.js, Express, TypeScript
- Database: Prisma ORM
- State: TanStack Query (server), Zustand (client), React Hook Form (forms)

## Code Standards

- TypeScript strict mode, no `any` unless absolutely necessary
- 4-space indentation
- camelCase (variables/functions), PascalCase (types/components), UPPER_SNAKE_CASE (constants)
- Max 300 lines per component, max 5 nesting levels
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`

## React 19

- No `forwardRef`, `propTypes`, or `React.FC` (all removed in React 19)
- Use `ref` as a regular prop
- Use `React.lazy` + `<Suspense>` for code splitting
- Loading states: LoadingOverlay/SuspenseLoader only (never early return spinners)

## Architecture

- Layered: Route → Controller → Service → Repository → Database
- Feature-based organization, proper separation of concerns
- Monorepo-aware: build only modified services
