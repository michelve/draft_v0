# Project Structure

Draft v0 is a full-stack TypeScript application with a React 19 frontend and Express backend, connected through a layered architecture.

## High-Level Overview

```text
draft_v0/
├── src/
│   ├── client/          # React 19 SPA (served by Vite)
│   └── server/          # Express API (runs on Node.js)
├── prisma/              # Database schema and migrations
├── e2e/                 # Playwright end-to-end tests
├── docs/                # Documentation (guides, ADRs)
├── .tasks/              # Task management system
├── .github/             # Skills, agents, prompts, instructions
├── .claude/             # Rules, skills, agents (mirrored)
└── .vscode/             # Editor config, MCP servers
```

## Frontend - React 19 SPA

```text
src/client/
├── routes/              # TanStack Router file-based routes
│   ├── __root.tsx       # Root layout (wraps all pages)
│   └── index.tsx        # Home page (/)
├── components/          # Shared components
│   └── ui/              # DSAi components (DO NOT EDIT)
├── lib/                 # Utilities
│   ├── utils.ts         # cn() helper for class merging
│   └── query-client.ts  # TanStack Query client config
├── hooks/               # Custom React hooks
├── main.tsx             # App entry point
└── index.css            # Bootstrap 5.3 + DSAi design tokens
```

### Key Concepts

**File-based routing** - Create a file in `src/client/routes/` and it becomes a route automatically. The route tree (`routeTree.gen.ts`) is auto-generated - never edit it manually.

```tsx
// src/client/routes/about.tsx → becomes /about
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: AboutPage,
});

function AboutPage() {
    return <div className="p-8">About us</div>;
}
```

**DSAi components** are in `src/client/components/ui/` and must never be modified directly. If you need to customize a component, create a wrapper in `src/client/components/`.

**Data fetching** uses TanStack Query - never `useState` + `useEffect` for server data:

```tsx
import { useQuery } from "@tanstack/react-query";

const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then((r) => r.json()),
});
```

## Backend - Express API (Layered Architecture)

```text
src/server/
├── routes/              # HTTP route definitions
│   ├── index.ts         # Route mounting (/api/...)
│   └── users.ts         # /api/users routes
├── controllers/         # Request parsing, response sending
│   └── user.controller.ts
├── services/            # Business logic, validation
│   └── user.service.ts
├── repositories/        # Prisma queries, data access
│   └── user.repository.ts
├── lib/
│   └── prisma.ts        # Prisma client singleton
└── index.ts             # Express app setup
```

### Request Flow

Every API request follows this path:

```text
HTTP Request
    ↓
Route (src/server/routes/)       → Maps URL + method to controller
    ↓
Controller (src/server/controllers/) → Parses request, calls service, sends response
    ↓
Service (src/server/services/)   → Business logic, throws custom errors
    ↓
Repository (src/server/repositories/) → Prisma queries, data access only
    ↓
Prisma (src/server/lib/prisma.ts)    → Database operations (SQLite)
```

**Why layers?** Each layer has one job. Routes know about HTTP. Controllers know about request/response. Services know about business rules. Repositories know about the database. This makes code testable and prevents coupling.

### Response Format

All API responses follow a consistent shape:

```ts
// Success
{ data: result }          // 200 OK or 201 Created

// Error
{ error: "Not Found", message: "User not found" }  // 404
{ error: "Bad Request", message: "Invalid email" }  // 400
{ error: "Internal Server Error" }                   // 500
```

## Database - Prisma ORM

```text
prisma/
├── schema.prisma        # Database models and relations
└── dev.db               # SQLite database file (gitignored)
```

The schema defines your data models. When you change it:

```bash
pnpm db:push       # Apply changes to database
pnpm db:generate   # Regenerate TypeScript types
```

Use `pnpm db:studio` to open a visual database browser.

## Path Aliases

Instead of deep relative imports (`../../../lib/utils`), use aliases:

| Alias       | Resolves To    | Used In       |
| ----------- | -------------- | ------------- |
| `@/*`       | `src/client/*` | Frontend code |
| `@server/*` | `src/server/*` | Backend code  |

```ts
// Instead of: import { cn } from "../../../lib/utils"
import { cn } from "@/lib/utils";

// Instead of: import { prisma } from "../../lib/prisma"
import { prisma } from "@server/lib/prisma";
```

## Configuration Files

| File                 | Purpose                                |
| -------------------- | -------------------------------------- |
| `vite.config.ts`     | Vite build config, dev proxy, plugins  |
| `tsconfig.json`      | Client TypeScript config (strict mode) |
| `tsconfig.node.json` | Server TypeScript config               |
| `biome.json`         | Biome linter/formatter rules           |
| `eslint.config.js`   | ESLint rules                           |
| `.prettierrc`        | Prettier formatting                    |
| `components.json`    | DSAi component configuration           |
| `.env`               | Environment variables (gitignored)     |

## AI Configuration

```text
.github/
├── skills/              # 17 domain-specific skill guides
├── agents/              # 8 specialized AI agents
├── prompts/             # 12 reusable prompt templates
└── instructions/        # 3 global instruction files

.claude/
├── rules/               # 7 domain-specific rule files
├── skills/              # Mirrored skills for Claude
└── agents/              # Mirrored agents for Claude

.vscode/
└── mcp.json             # 6 MCP server configurations
```

See [Skills & Agents](skills-and-agents.md) for details on how these work together.

## Testing

```text
e2e/                     # Playwright end-to-end tests
├── *.spec.ts            # Test specifications
└── playwright.config.ts # Playwright configuration
```

Unit tests use Vitest and live alongside the code they test.

## Documentation

```text
docs/
├── guides/              # You are here - usage guides
└── decisions/           # Architecture Decision Records (ADRs)

.tasks/                  # Task management system
├── _template.md         # Task template
├── backlog/             # Tasks not started
├── in-progress/         # Tasks being worked on
├── done/                # Completed tasks
└── cancelled/           # Abandoned tasks
```

## Next Steps

- [Skills & Agents](skills-and-agents.md) - How AI skills and agents accelerate your workflow
- [Figma Integration](figma-integration.md) - Design-to-code workflow
- [Tasks Workflow](tasks-workflow.md) - How tasks are created, tracked, and verified
