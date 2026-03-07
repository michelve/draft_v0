---
applyTo: "**"
---

# Orchestrator — Draft v0

Master decision framework for the Draft v0 full-stack application.
Routes tasks to the right skills, agents, and workflows.
For philosophy and code standards, see `copilot-instructions.md`. For domain-specific rules, see `.claude/rules/`.

---

## Architecture Map

### Backend — Layered Architecture

```
Route → Controller → Service → Repository → Prisma (SQLite)
```

| Layer        | Location                   | Responsibility                             | Reference            |
| ------------ | -------------------------- | ------------------------------------------ | -------------------- |
| Routes       | `src/server/routes/`       | HTTP method + path, delegates to ctrl      | `users.ts`           |
| Controllers  | `src/server/controllers/`  | Parse request, call service, send response | `user.controller.ts` |
| Services     | `src/server/services/`     | Business logic, custom error classes       | `user.service.ts`    |
| Repositories | `src/server/repositories/` | Prisma queries, data access only           | `user.repository.ts` |
| Prisma       | `src/server/lib/prisma.ts` | Singleton client (globalThis pattern)      | —                    |
| Schema       | `prisma/schema.prisma`     | Models, relations, constraints             | —                    |

### Frontend — React 19 SPA

| Concern      | Location                      | Pattern                              |
| ------------ | ----------------------------- | ------------------------------------ |
| Pages/Routes | `src/client/routes/`          | TanStack Router file-based routing   |
| Components   | `src/client/components/`      | Feature components + `ui/` (shadcn)  |
| Hooks        | `src/client/hooks/`           | Custom hooks (`use` prefix)          |
| Utilities    | `src/client/lib/`             | `cn()`, `queryClient`, helpers       |
| Entry        | `src/client/main.tsx`         | QueryClientProvider + RouterProvider |
| Styles       | `src/client/index.css`        | Tailwind v4 theme (`@theme inline`)  |
| Route Tree   | `src/client/routeTree.gen.ts` | AUTO-GENERATED — never edit          |

### Path Aliases

- `@/*` → `src/client/*`
- `@server/*` → `src/server/*`

---

## Skill & Agent Routing

### When to use which skill

| Task                                    | Skill                    |
| --------------------------------------- | ------------------------ |
| React components, hooks, Suspense       | `react`                  |
| React performance optimization          | `react-best-practices`   |
| Tailwind styling, responsive, dark mode | `tailwindcss`            |
| Adding/using shadcn/ui components       | `shadcn`                 |
| Prisma schema, queries, migrations      | `prisma`                 |
| Node.js/Express backend patterns        | `nodejs`                 |
| API route testing, integration tests    | `route-tester`           |
| Figma MCP setup, fetching design data   | `figma`                  |
| Implementing Figma designs into code    | `figma-implement-design` |
| UI accessibility/design review          | `web-design-guidelines`  |
| Creating new skills/instructions        | `skill-developer`        |

### When to use which agent

| Task                                       | Agent                        |
| ------------------------------------------ | ---------------------------- |
| TypeScript / build errors                  | `auto-error-resolver`        |
| Code review, architectural consistency     | `code-architecture-reviewer` |
| Refactoring execution                      | `code-refactor-master`       |
| Refactoring planning, risk assessment      | `refactor-planner`           |
| Creating / updating documentation          | `documentation-architect`    |
| Review plan before implementation          | `plan-reviewer`              |
| Deep technical / first-principles analysis | `principal-engineer`         |
| Internet research, debugging solutions     | `web-research-specialist`    |

---

## Workflows

### 1. Add a New API Resource

Example: adding a `Post` resource — follow the existing `User` implementation.

1. **Schema** — Add model to `prisma/schema.prisma`
2. **Push** — `pnpm db:push` then `pnpm db:generate`
3. **Repository** — Create `src/server/repositories/post.repository.ts`
    - Export object with `findAll`, `findById`, `create`, `update`, `delete`
    - Use Prisma Client API only (never raw SQL)
    - Use `import type { Prisma } from "@prisma/client"` for input types
4. **Service** — Create `src/server/services/post.service.ts`
    - Export object with business logic methods
    - Create custom error class (e.g., `PostNotFoundError extends Error`)
    - Throw on not-found — don't return null from service layer
5. **Controller** — Create `src/server/controllers/post.controller.ts`
    - Validate input at this layer
    - Catch `Prisma.PrismaClientKnownRequestError` (P2002 → 409, P2025 → 404)
    - Catch custom errors (e.g., `PostNotFoundError` → 404)
    - Never expose internal error details — return generic 500
6. **Routes** — Create `src/server/routes/posts.ts`
    - Use `Router()` from Express
    - Map HTTP methods to controller functions
7. **Mount** — Add `apiRouter.use("/posts", postsRouter)` in `src/server/routes/index.ts`
8. **Verify** — `pnpm typecheck`

### 2. Add a New Page / Route

1. **Route file** — Create `src/client/routes/my-page.tsx`

    ```tsx
    import { createFileRoute } from "@tanstack/react-router";

    export const Route = createFileRoute("/my-page")({
        component: MyPage,
    });

    function MyPage() {
        return <div>...</div>;
    }
    ```

2. Route tree auto-regenerates — never edit `routeTree.gen.ts`
3. **Data** — Use `useQuery()` for reads, `useMutation()` for writes
4. **Code splitting** — Use `React.lazy()` + `<Suspense>` for heavy components
5. **Styling** — Tailwind utilities + `cn()` for conditional classes
6. **Verify** — `pnpm typecheck` + `pnpm biome:check`

### 3. Add a UI Component

1. **Check shadcn first** — `npx shadcn@latest add [component]`
    - Installs to `src/client/components/ui/` — never modify these files
2. **Custom wrapper** — If you need project-specific defaults, create a wrapper in `src/client/components/`
3. **Styling** — Use `cn()` for class merging, `cva()` for variant systems
4. **Exports** — Named exports only, no `default export`

### 4. Full-Stack Feature

Combines workflows 1–3 in order:

1. **Prisma model** (if new entity) — schema → push → generate
2. **Backend** (bottom-up) — repository → service → controller → route → mount
3. **Frontend** — route file → data hooks (`useQuery`/`useMutation`) → components
4. **Connect** — Invalidate queries after mutations:
    ```ts
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    ```
5. **Quality gates** — Run all checks (see below)

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

---

## Anti-Patterns

These are hard rules — never do any of these:

| Don't                                               | Do instead                                                      |
| --------------------------------------------------- | --------------------------------------------------------------- |
| `useState` + `useEffect` for server data            | `useQuery()` / `useMutation()` from TanStack Query              |
| Modify files in `src/client/components/ui/`         | Create a wrapper component in `src/client/components/`          |
| Edit `routeTree.gen.ts`                             | Add/modify route files — tree auto-regenerates                  |
| Use `tsc -b` in build scripts                       | Use `tsc --noEmit` — Vite handles bundling                      |
| Expose Prisma/internal errors to API clients        | Log server-side, return generic error to client                 |
| Use raw SQL queries                                 | Use Prisma Client API                                           |
| Use `React.FC`, `forwardRef`, `propTypes`           | Regular function components, `ref` as prop (React 19)           |
| Use `default export`                                | Named exports only                                              |
| Use inline `style={}` for Tailwind-supported styles | Use Tailwind utility classes                                    |
| Create `.js` files in `src/`                        | TypeScript only (`.ts` / `.tsx`)                                |
| Use `any` type                                      | Use proper types — `any` only as last resort with justification |
| Early-return loading spinners                       | Use `LoadingOverlay` / `SuspenseLoader` components              |

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
