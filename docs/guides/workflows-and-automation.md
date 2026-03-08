# Workflows & Automation

Draft v0 ships with a full automation layer: GitHub Actions CI/CD pipelines, Dependabot dependency management, and local Git hooks enforced by Husky.

## Overview

| Automation                              | Trigger                                       | Purpose                                     |
| --------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| [CI Pipeline](#ci-pipeline)             | Push / PR to `main`                           | Quality gates + unit tests                  |
| [E2E Tests](#e2e-tests)                 | Push / PR to `main`                           | Playwright browser tests                    |
| [Dependency Review](#dependency-review) | PR touching `package.json` / `pnpm-lock.yaml` | Security vulnerability scan                 |
| [Dependabot](#dependabot)               | Weekly (Monday)                               | Automated dependency updates                |
| [Husky hooks](#local-git-hooks-husky)   | Every `git commit`                            | Lint staged files + validate commit message |

---

## CI Pipeline

**File:** `.github/workflows/ci.yml`
**Triggers:** Every push and pull request targeting `main`

Runs all quality gates in a fixed order, then executes unit tests.

### Step order

```
Install dependencies
  └─ Generate Prisma client        ← must run before typecheck
      └─ Typecheck (tsc --noEmit)
          └─ Biome check
              └─ ESLint
                  └─ Build
                      └─ Push DB schema
                          └─ Unit tests (vitest --run)
```

> **Why Prisma generate comes first:** `@prisma/client` exports (`PrismaClient`, `Prisma`) only exist after `prisma generate` runs. Running typecheck before generation causes `Module has no exported member` errors.

### Environment

| Variable       | Value           | Purpose                              |
| -------------- | --------------- | ------------------------------------ |
| `DATABASE_URL` | `file:./dev.db` | SQLite database path for CI          |
| `NODE_ENV`     | `test`          | Disables certain dev-only behaviours |

### Concurrency

```yaml
concurrency:
    group: ci-${{ github.ref }}
    cancel-in-progress: true
```

Redundant runs for the same branch are cancelled automatically — pushing two commits in quick succession won't queue duplicate jobs.

### Running quality gates locally

These are the exact commands CI runs:

```bash
pnpm db:generate        # generate Prisma client
pnpm typecheck          # tsc --noEmit (both tsconfig.json + tsconfig.node.json)
pnpm biome:check        # Biome lint + format check
pnpm lint               # ESLint
pnpm build              # tsc --noEmit + vite build
pnpm test -- --run      # Vitest (single run, no watch)
```

---

## E2E Tests

**File:** `.github/workflows/e2e.yml`
**Triggers:** Every push and pull request targeting `main`

Runs Playwright browser tests against a freshly started dev server.

### Key details

- **Chromium only** — `playwright install --with-deps chromium` keeps CI fast; Firefox and WebKit are opt-in
- **Full stack** — both Vite (`:5173`) and Express (`:3001`) must be running; the `PORT: 3001` env var ensures Express binds correctly
- **Failure artifacts** — if any test fails, the `playwright-report/` directory is uploaded as a CI artifact (7-day retention) so you can download the HTML report and inspect traces

### Downloading a failure report

1. Go to the failed workflow run on GitHub
2. Scroll to **Artifacts**
3. Download `playwright-report`
4. Open `playwright-report/index.html` in your browser

### Running E2E tests locally

```bash
pnpm test:e2e           # run all tests headlessly
pnpm test:e2e:ui        # open Playwright UI (interactive)
```

Playwright config is in `playwright.config.ts`. The `baseURL` is `http://localhost:5173` — `pnpm dev` must be running before executing tests.

---

## Dependency Review

**File:** `.github/workflows/dependency-review.yml`
**Triggers:** Pull requests targeting `main` that modify `package.json` or `pnpm-lock.yaml`

Scans new and updated dependencies for known security vulnerabilities using the GitHub Advisory Database.

### Behaviour

| Setting        | Value                                    |
| -------------- | ---------------------------------------- |
| Fail threshold | `high` severity or above                 |
| PR comment     | Always — posts a summary table to the PR |

The job only runs when dependency files actually change, keeping it out of unrelated PRs.

---

## Dependabot

**File:** `.github/dependabot.yml`
**Schedule:** Weekly, every Monday

Dependabot opens pull requests to keep dependencies current. PRs are grouped to reduce noise.

### GitHub Actions ecosystem

Dependabot watches all workflows in `.github/workflows/` and automatically replaces `@vX` action tags with pinned commit SHAs. For example:

```yaml
# Before
uses: actions/checkout@v4

# After (Dependabot PR)
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2
```

Pinned SHAs prevent supply-chain attacks — a compromised tag can be moved, but a SHA cannot.

### npm / pnpm ecosystem

Updates are grouped into focused PRs instead of one per package:

| Group         | Packages                                          |
| ------------- | ------------------------------------------------- |
| `dev-tooling` | Biome, ESLint, Prettier, Vite, TypeScript, tsx, … |
| `testing`     | Vitest, Playwright                                |
| `tanstack`    | TanStack Router, Query, and plugins               |
| `prisma`      | Prisma CLI and client                             |
| `types`       | All `@types/*` packages                           |

Ungrouped packages (React, Express, shadcn deps, etc.) get individual PRs so breaking changes are easier to isolate.

---

## Local Git Hooks (Husky)

**Directory:** `.husky/`
**Installed via:** `pnpm install` (triggers the `"prepare": "husky"` script)

Two hooks run automatically on every `git commit`.

### pre-commit — lint staged files

**File:** `.husky/pre-commit`

Runs `lint-staged` before the commit is created. Only files that are staged (`git add`-ed) are processed:

| File pattern                                 | Command                                         |
| -------------------------------------------- | ----------------------------------------------- |
| `*.ts`, `*.tsx`                              | `biome check --write` (lint + format, auto-fix) |
| `*.css`, `*.md`, `*.json`, `*.yaml`, `*.yml` | `prettier --write`                              |

If Biome or Prettier modifies a file, the modified version is included in the commit automatically.

### commit-msg — enforce Conventional Commits

**File:** `.husky/commit-msg`
**Config:** `commitlint.config.cjs`

Validates the commit message against the [Conventional Commits](https://www.conventionalcommits.org/) specification before the commit is finalised.

#### Valid format

```
<type>: <subject>

feat: add user authentication
fix: resolve prisma connection leak
chore: update biome to 2.5.0
docs: add api reference for users endpoint
```

#### Allowed types

| Type       | Use for                                  |
| ---------- | ---------------------------------------- |
| `feat`     | New feature                              |
| `fix`      | Bug fix                                  |
| `refactor` | Code restructuring (no feature/fix)      |
| `docs`     | Documentation only                       |
| `chore`    | Tooling, config, dependency updates      |
| `test`     | Adding or updating tests                 |
| `style`    | Formatting, whitespace (no logic change) |

#### Rules enforced

| Rule                               | Setting        |
| ---------------------------------- | -------------- |
| Type must be one of the above      | error          |
| Subject must be lowercase          | error          |
| Subject must not end with a period | error          |
| Header (type + subject) max length | 100 characters |

#### Example rejection

```
$ git commit -m "Added user login"
✖   subject must be lower-case [subject-case]
✖   type may not be empty [type-empty]
husky - commit-msg script failed (code 1)
```

#### Bypassing hooks (emergency only)

```bash
git commit --no-verify -m "wip: emergency fix"
```

Use sparingly. `--no-verify` skips both pre-commit and commit-msg hooks.

---

## Adding a New Workflow

1. Create `.github/workflows/your-workflow.yml`
2. Use `actions/checkout@v4` — Dependabot will pin it to a SHA on the next Monday run
3. Follow the existing env pattern (`DATABASE_URL`, `NODE_ENV`) if Prisma is needed
4. Add `concurrency` with `cancel-in-progress: true` for branch-scoped jobs
5. Document it in this guide
