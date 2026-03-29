---
applyTo: "**"
---

# Orchestrator - Draft v0

Master decision framework for the Draft v0 full-stack application.
Routes tasks to the right skills, agents, and workflows.
For philosophy and code standards, see `copilot-instructions.md`. For domain-specific rules, see `.github/instructions/`.

---

## Architecture Map

### Backend - Layered Architecture

```
Route → Controller → Service → Repository → Prisma (SQLite)
```

| Layer        | Location                   | Responsibility                             | Reference            |
| ------------ | -------------------------- | ------------------------------------------ | -------------------- |
| Routes       | `src/server/routes/`       | HTTP method + path, delegates to ctrl      | `users.ts`           |
| Controllers  | `src/server/controllers/`  | Parse request, call service, send response | `user.controller.ts` |
| Services     | `src/server/services/`     | Business logic, custom error classes       | `user.service.ts`    |
| Repositories | `src/server/repositories/` | Prisma queries, data access only           | `user.repository.ts` |
| Prisma       | `src/server/lib/prisma.ts` | Singleton client (globalThis pattern)      | -                    |
| Schema       | `prisma/schema.prisma`     | Models, relations, constraints             | -                    |

### Frontend - React 19 SPA

| Concern      | Location                      | Pattern                              |
| ------------ | ----------------------------- | ------------------------------------ |
| Pages/Routes | `src/client/routes/`          | TanStack Router file-based routing   |
| Components   | `src/client/components/`      | Feature components + `ui/` (DSAi)    |
| Hooks        | `src/client/hooks/`           | Custom hooks (`use` prefix)          |
| Utilities    | `src/client/lib/`             | `cn()`, `queryClient`, helpers       |
| Entry        | `src/client/main.tsx`         | QueryClientProvider + RouterProvider |
| Styles       | `src/client/index.css`        | Bootstrap 5.3 + DSAi design tokens   |
| Route Tree   | `src/client/routeTree.gen.ts` | AUTO-GENERATED - never edit          |

### Path Aliases

- `@/*` → `src/client/*`
- `@server/*` → `src/server/*`

---

## Skill & Agent Routing

### When to use which skill

| Task                                                 | Skill                        |
| ---------------------------------------------------- | ---------------------------- |
| React components, hooks, Suspense                    | `react`                      |
| React performance optimization                       | `react-best-practices`       |
| Bootstrap styling, responsive, dark mode             | `bootstrap-styling`          |
| Adding/using DSAi components                         | `dsai-components`            |
| Prisma schema, queries, migrations                   | `prisma`                     |
| Node.js/Express backend patterns                     | `nodejs`                     |
| API route testing, integration tests                 | `route-tester`               |
| Figma MCP setup, fetching design data                | `figma`                      |
| Implementing Figma designs into code                 | `figma-implement-design`     |
| Connecting Figma components to code via Code Connect | `code-connect-components`    |
| Generating project-specific Figma-to-code rules      | `create-design-system-rules` |
| Miro boards, diagrams, tables, docs                  | `miro-mcp`                   |
| UI accessibility/design review                       | `web-design-guidelines`      |
| Creating new skills/instructions                     | `skill-creator`              |
| Breaking down PRDs into tasks                        | `create-tasks`               |
| Verifying task completion                            | `task-check`                 |
| Writing tests, edge cases, assertions                | `writing-tests`              |
| Browser automation, e2e testing, UI validation       | `playwright-skill`           |
| Automatic semantic code review                       | `automatic-code-review`      |

### When to use which agent

| Task                                          | Agent                         |
| --------------------------------------------- | ----------------------------- |
| TypeScript / build errors                     | `auto-error-resolver`         |
| Code review, architectural consistency        | `code-architecture-reviewer`  |
| Refactoring execution                         | `code-refactor-master`        |
| Refactoring planning, risk assessment         | `refactor-planner`            |
| Creating / updating documentation             | `documentation-architect`     |
| Review plan before implementation             | `plan-reviewer`               |
| Deep technical / first-principles analysis    | `principal-engineer`          |
| Internet research, debugging solutions        | `web-research-specialist`     |
| Verify task completion before finishing       | `task-check`                  |
| Writing / documenting / superseding an ADR    | `adr-writer`                  |
| Checking if a change violates an existing ADR | `check-adr-violations` prompt |
| Semantic code review on modified files        | `automatic-code-reviewer`     |

---

## ADR Auto-Gate - No User Input Required

The ADR system runs **automatically** at two points. You do not wait for the user to ask.

### Pre-implementation: Violation Check

Before starting any task that involves a qualifying decision, check for ADR conflicts:

**Qualifying decisions (any one triggers the check):**

- Adding a framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that future engineers will question
- Deprecating or replacing a previous decision

**Steps (run silently before implementation):**

1. Read all `status: accepted` ADRs from `docs/decisions/README.md`
2. Compare the proposed approach against each ADR's Decision Outcome
3. **No conflict** → proceed with implementation
4. **Conflict found** → stop, name the specific ADR violated, offer two paths:
    - **Comply** - give a concrete alternative that aligns with the ADR
    - **Supersede** - invoke `write-adr.prompt.md` with `supersedes: NNNN`, then proceed

**Do NOT wait for "does this violate an ADR?" - this check is mandatory.**

### Post-decision: ADR Writing

After implementing a qualifying decision, write the ADR **alongside** the implementation - not after.

**Do NOT ask the user if they want an ADR - just write it.**

Invoke `write-adr.prompt.md`. `adr.instructions.md` (`applyTo: "**"`) also enforces this reactively.

### Quick Reference

| Scenario                                | Who triggers it                    |
| --------------------------------------- | ---------------------------------- |
| Implementing an architectural decision  | **Automatic** - orchestrator gate  |
| ADR writing after a qualifying decision | **Automatic** - `adr.instructions` |
| "write an ADR for X"                    | Explicit → `adr-writer` skill      |
| "does this violate an ADR?"             | Explicit → `check-adr-violations`  |

---

## Workflows

### 1. Add a New API Resource

Example: adding a `Post` resource - follow the existing `User` implementation.

0. **ADR gate** - If this resource introduces a new pattern (new auth layer, caching strategy, pagination approach, etc.), run the pre-implementation violation check against accepted ADRs before writing any code
1. **Schema** - Add model to `prisma/schema.prisma`
2. **Push** - `pnpm db:push` then `pnpm db:generate`
3. **Repository** - Create `src/server/repositories/post.repository.ts`
    - Export object with `findAll`, `findById`, `create`, `update`, `delete`
    - Use Prisma Client API only (never raw SQL)
    - Use `import type { Prisma } from "@prisma/client"` for input types
4. **Service** - Create `src/server/services/post.service.ts`
    - Export object with business logic methods
    - Create custom error class (e.g., `PostNotFoundError extends Error`)
    - Throw on not-found - don't return null from service layer
5. **Controller** - Create `src/server/controllers/post.controller.ts`
    - Validate input at this layer
    - Catch `Prisma.PrismaClientKnownRequestError` (P2002 → 409, P2025 → 404)
    - Catch custom errors (e.g., `PostNotFoundError` → 404)
    - Never expose internal error details - return generic 500
6. **Routes** - Create `src/server/routes/posts.ts`
    - Use `Router()` from Express
    - Map HTTP methods to controller functions
7. **Mount** - Add `apiRouter.use("/posts", postsRouter)` in `src/server/routes/index.ts`
8. **Verify** - `pnpm typecheck`

### 2. Add a New Page / Route

1. **Route file** - Create `src/client/routes/my-page.tsx`

    ```tsx
    import { createFileRoute } from "@tanstack/react-router";

    export const Route = createFileRoute("/my-page")({
        component: MyPage,
    });

    function MyPage() {
        return <div>...</div>;
    }
    ```

2. Route tree auto-regenerates - never edit `routeTree.gen.ts`
3. **Data** - Use `useQuery()` for reads, `useMutation()` for writes
4. **Code splitting** - Use `React.lazy()` + `<Suspense>` for heavy components
5. **Styling** - Bootstrap utilities + `cn()` for conditional classes
6. **Verify** - `pnpm typecheck` + `pnpm biome:check`

### 3. Add a UI Component

1. **Check DSAi components first** - Review available DSAi components
    - Components are in `src/client/components/ui/` - never modify these files
2. **Custom wrapper** - If you need project-specific defaults, create a wrapper in `src/client/components/`
3. **Styling** - Use `cn()` for class merging, `cva()` for variant systems
4. **Exports** - Named exports only, no `default export`

### 4. Full-Stack Feature

Combines workflows 1–3 in order:

0. **ADR gate** - Classify the feature: does it introduce a new dependency, pattern, or convention? If yes, run the violation check before writing any code
1. **Prisma model** (if new entity) - schema → push → generate
2. **Backend** (bottom-up) - repository → service → controller → route → mount
3. **Frontend** - route file → data hooks (`useQuery`/`useMutation`) → components
4. **Connect** - Invalidate queries after mutations:
    ```ts
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    ```
5. **ADR** - If a qualifying decision was made during implementation, invoke `write-adr.prompt.md` now (do not ask the user)
6. **Quality gates** - Run all checks (see below)

### 5. Record an Architecture Decision (ADR)

When a task involves a significant decision (new dependency, architectural change, convention shift):

1. **Invoke** - Run `.github/prompts/write-adr.prompt.md`; it handles numbering, template, style, writing, and index update automatically
2. **Supersede** - If replacing an existing ADR, pass `supersedes: NNNN` as context; the prompt marks the old ADR and writes the replacement

See `adr.instructions.md` for the qualifying-decision list and `write-adr.prompt.md` for the full 10-step workflow.

### 6. Create & Verify Tasks

When breaking down a PRD, feature request, or bug report into actionable work:

1. **Load skill** - Read `create-tasks` skill for full methodology
2. **Discover** - Apply Example Mapping (Story → Rules → Examples → Questions)
3. **Split** - If task fails splitting signals (>3-4 rules, multiple actors, AND in name), use SPIDR
4. **Write** - Use `.tasks/_template.md` and save to `.tasks/backlog/NNNN-short-title.md`
5. **Validate** - Every task must pass INVEST: Independent, Negotiable, Valuable, Estimable, Small (≤1 day), Testable
6. **Start** - Move task from `backlog/` to `in-progress/` when work begins
7. **Verify** - Before marking complete, invoke `task-check` agent (max 3 attempts)
8. **Complete** - On PASS, move task from `in-progress/` to `done/`

---

## Quality Gates

Before any commit or PR, all must pass:

```bash
pnpm typecheck      # Zero TypeScript errors (both configs)
pnpm biome:check    # Zero Biome lint/format errors
pnpm lint           # Zero ESLint errors
pnpm build          # Clean build (tsc --noEmit + vite build)
```

After file edits: Codacy CLI analysis (per `codacy.instructions.md`).
After dependency changes: Codacy CLI with Trivy for security scanning.

## Post-Task: Task Lifecycle + Commit

### Task lifecycle (mandatory - do not skip)

Whenever you begin or finish work that corresponds to a task file in `.tasks/`:

**When starting work on a task:**

1. Move the file: `backlog/NNNN-*.md` → `in-progress/NNNN-*.md`
2. Update frontmatter: `status: in-progress`

**When completing a task:**

1. Invoke `task-check` agent to verify all acceptance criteria pass (max 3 attempts)
2. On PASS: move the file `in-progress/NNNN-*.md` → `done/NNNN-*.md`, update frontmatter: `status: done`
3. On FAIL: address the failing criteria and retry

Do this **automatically** - do not wait for the user to ask.

### Commit offer (mandatory - do not skip)

After completing **any** task that modifies files (feature, fix, refactor, docs, config, skill update), always end your response by asking:

> "Would you like me to commit these changes?"

- Do NOT commit automatically - always ask first
- If the user says yes, follow the `commit` prompt template (`.github/prompts/commit.prompt.md`)
- Use the commitlint rules: lowercase subject, type from `feat|fix|refactor|docs|chore|test|style`, header ≤ 100 chars, no trailing dot
- If multiple logical groups of changes exist, suggest splitting into separate commits
- Skip the offer only when the user has already committed or explicitly said they will handle it

---

## Anti-Patterns

These are hard rules - never do any of these:

| Don't                                                | Do instead                                                      |
| ---------------------------------------------------- | --------------------------------------------------------------- |
| `useState` + `useEffect` for server data             | `useQuery()` / `useMutation()` from TanStack Query              |
| Modify files in `src/client/components/ui/`          | Create a wrapper component in `src/client/components/`          |
| Edit `routeTree.gen.ts`                              | Add/modify route files - tree auto-regenerates                  |
| Use `tsc -b` in build scripts                        | Use `tsc --noEmit` - Vite handles bundling                      |
| Expose Prisma/internal errors to API clients         | Log server-side, return generic error to client                 |
| Use raw SQL queries                                  | Use Prisma Client API                                           |
| Use `React.FC`, `forwardRef`, `propTypes`            | Regular function components, `ref` as prop (React 19)           |
| Use `default export`                                 | Named exports only                                              |
| Use inline `style={}` for Bootstrap-supported styles | Use Bootstrap utility classes                                   |
| Create `.js` files in `src/`                         | TypeScript only (`.ts` / `.tsx`)                                |
| Use `any` type                                       | Use proper types - `any` only as last resort with justification |
| Early-return loading spinners                        | Use `LoadingOverlay` / `SuspenseLoader` components              |

---

## Reference Templates

### API Response Format

```ts
// Success
res.status(200).json({ data: result });
res.status(201).json({ data: created });

// Error
res.status(400).json({ error: "Bad Request", message: "Details here" });
res.status(404).json({ error: "Not Found", message: "Resource not found" });
res.status(409).json({ error: "Conflict", message: "Already exists" });
res.status(500).json({ error: "Internal Server Error" });
```

### Query Key Convention

```ts
["users"][("users", { id })][("users", { status })]; // List all // Single by ID // Filtered list
```

### Custom Error Class

```ts
export class PostNotFoundError extends Error {
    constructor(id: string) {
        super(`Post with id "${id}" not found`);
        this.name = "PostNotFoundError";
    }
}
```

### Route File Skeleton

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/path")({
    component: PageName,
});

function PageName() {
    return <div className="...">...</div>;
}
```
