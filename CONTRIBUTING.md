# Contributing to Draft v0

Thank you for your interest in contributing! This document covers everything you need to get started, make changes, and get your work merged.

## Table of Contents

- [Contributing to Draft v0](#contributing-to-draft-v0)
    - [Table of Contents](#table-of-contents)
    - [Code of Conduct](#code-of-conduct)
    - [Getting Started](#getting-started)
        - [Prerequisites](#prerequisites)
        - [Local Setup](#local-setup)
    - [Development Workflow](#development-workflow)
        - [Branch Strategy](#branch-strategy)
        - [Available Scripts](#available-scripts)
    - [Making Changes](#making-changes)
        - [Architecture](#architecture)
        - [Adding a Backend Resource](#adding-a-backend-resource)
        - [Adding a Frontend Page](#adding-a-frontend-page)
        - [Adding a UI Component](#adding-a-ui-component)
    - [Commit Conventions](#commit-conventions)
    - [Pull Request Process](#pull-request-process)
        - [PR Checklist](#pr-checklist)
    - [Quality Gates](#quality-gates)
    - [Architecture Decisions](#architecture-decisions)
    - [Project Conventions](#project-conventions)
        - [TypeScript](#typescript)
        - [React](#react)
        - [Styling](#styling)
        - [API Responses](#api-responses)
        - [File Naming](#file-naming)
    - [Getting Help](#getting-help)

---

## Code of Conduct

This project follows the [Contributor Covenant v2.1](CODE_OF_CONDUCT.md). By participating, you agree to uphold these standards. Report violations via a [GitHub Issue](https://github.com/michelve/draft_v0/issues).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) v9+ (`npm install -g pnpm`)
- Git

### Local Setup

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-username>/draft_v0.git
cd draft_v0

# 2. Install dependencies
pnpm install

# 3. Copy env file and fill in values
cp .env.example .env

# 4. Set up the database
pnpm db:push

# 5. Start the dev servers
pnpm dev
```

- Frontend: <http://localhost:5173>
- API: <http://localhost:3001>

---

## Development Workflow

### Branch Strategy

- `main` - stable, always deployable
- Feature branches: `feat/short-description`
- Bug fix branches: `fix/short-description`
- Docs branches: `docs/short-description`

Always branch off `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/your-feature
```

### Available Scripts

| Command            | Purpose                                      |
| ------------------ | -------------------------------------------- |
| `pnpm dev`         | Start Vite + Express dev servers             |
| `pnpm build`       | TypeScript check + Vite production build     |
| `pnpm typecheck`   | Run `tsc --noEmit` on both configs           |
| `pnpm lint`        | ESLint check                                 |
| `pnpm biome:check` | Biome lint + format check                    |
| `pnpm biome:fix`   | Auto-fix Biome issues                        |
| `pnpm format`      | Prettier format                              |
| `pnpm test`        | Vitest unit tests                            |
| `pnpm test:e2e`    | Playwright end-to-end tests                  |
| `pnpm db:push`     | Push Prisma schema changes to database       |
| `pnpm db:studio`   | Open Prisma Studio (visual DB explorer)      |
| `pnpm db:generate` | Regenerate Prisma client after schema change |

---

## Making Changes

### Architecture

The backend follows a strict layered architecture - keep each layer's responsibility clear:

```text
Route → Controller → Service → Repository → Prisma (SQLite)
```

The frontend uses file-based routing via TanStack Router:

```text
src/client/routes/<page>.tsx  →  auto-registered in routeTree.gen.ts
```

### Adding a Backend Resource

1. Add the Prisma model to `prisma/schema.prisma`
2. Run `pnpm db:push` then `pnpm db:generate`
3. Create `src/server/repositories/<resource>.repository.ts`
4. Create `src/server/services/<resource>.service.ts`
5. Create `src/server/controllers/<resource>.controller.ts`
6. Create `src/server/routes/<resource>s.ts`
7. Mount the router in `src/server/routes/index.ts`
8. Run `pnpm typecheck` to verify

### Adding a Frontend Page

1. Create `src/client/routes/<path>.tsx` using `createFileRoute`
2. The route tree regenerates automatically - never edit `routeTree.gen.ts`
3. Use `useQuery()` for data fetching, `useMutation()` for writes

### Adding a UI Component

DSAi components live in `src/client/components/ui/`. **Never modify these files.** Create wrappers in `src/client/components/` instead.

---

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<optional scope>): <short summary>
```

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature or capability                       |
| `fix`      | Bug fix                                         |
| `refactor` | Code change that is neither a fix nor a feature |
| `docs`     | Documentation only                              |
| `chore`    | Build scripts, config, tooling                  |
| `test`     | Adding or updating tests                        |
| `style`    | Formatting, whitespace (no logic change)        |

**Examples:**

```text
feat(api): add POST /posts endpoint
fix(auth): handle expired JWT tokens correctly
docs: update getting started guide
chore: upgrade Prisma to v6.5
```

---

## Pull Request Process

1. **Run all quality gates** (see below) and fix any failures before opening a PR
2. **Write a clear PR description** - what changed, why, and how to test it
3. **Keep PRs small and focused** - one logical change per PR is easier to review
4. **Reference issues** - use `Closes #123` in the description when applicable
5. **Respond to review feedback** in a timely manner

PRs are squash-merged into `main`.

### PR Checklist

- [ ] All quality gates pass (`typecheck`, `biome:check`, `lint`, `build`)
- [ ] Tests added or updated for new behavior
- [ ] No `any` types introduced without justification
- [ ] No files in `src/client/components/ui/` modified
- [ ] `routeTree.gen.ts` not manually edited
- [ ] ADR written if the change involves a significant design decision (see below)

---

## Quality Gates

All must pass before any commit or PR:

```bash
pnpm typecheck      # Zero TypeScript errors (both tsconfig files)
pnpm biome:check    # Zero Biome lint/format errors
pnpm lint           # Zero ESLint errors
pnpm build          # Clean production build
```

Run them together:

```bash
pnpm typecheck && pnpm biome:check && pnpm lint && pnpm build
```

---

## Architecture Decisions

Significant design choices are documented as Architecture Decision Records (ADRs) in [`docs/decisions/`](docs/decisions/README.md).

**When to write an ADR:**

- Choosing a new framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that future contributors will question

**How to create one:**

1. Find the next number in `docs/decisions/` (highest `NNNN` + 1)
2. Copy `docs/decisions/_template.md` to `docs/decisions/NNNN-short-title.md`
3. Fill in the frontmatter, context, options considered, and decision outcome
4. Add the entry to the index table in `docs/decisions/README.md`

Do **not** write ADRs for bug fixes, small refactors, or cosmetic changes.

---

## Project Conventions

### TypeScript

- Strict mode - no `any` unless absolutely necessary with a comment explaining why
- Use `import type` for type-only imports
- Named exports only - no `default export`

### React

- Functional components only
- No `forwardRef`, `propTypes`, or `React.FC` (removed in React 19)
- Use `ref` as a regular prop
- Use `useQuery()` / `useMutation()` for server data - never `useState` + `useEffect`
- Loading states: use `LoadingOverlay` / `SuspenseLoader`, never early-return spinners

### Styling

- Bootstrap utility classes for all styling
- `cn()` from `@/lib/utils` for conditional class merging
- Never use inline `style={}` for Bootstrap-supported properties

### API Responses

```ts
// Success
res.status(200).json({ data: result });
res.status(201).json({ data: created });

// Error
res.status(400).json({ error: "Bad Request", message: "Details here" });
res.status(404).json({ error: "Not Found", message: "Resource not found" });
res.status(500).json({ error: "Internal Server Error" });
```

### File Naming

- Route files: `kebab-case.tsx`
- Components: `PascalCase.tsx`
- Utilities/hooks: `camelCase.ts`

---

## Getting Help

- **Questions & Discussions** - Open a [GitHub Discussion](https://github.com/michelve/draft_v0/discussions)
- **Bug Reports** - Open a [GitHub Issue](https://github.com/michelve/draft_v0/issues) with steps to reproduce
- **Security Vulnerabilities** - See [SECURITY.md](SECURITY.md) - do **not** open public issues

We aim to respond to all issues and PRs within a few business days.
