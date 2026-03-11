# Project Instructions

## Engineering Philosophy

- **First Principles Over Convention** - Question assumptions, understand WHY things work
- **Simple Over Clever** - Solve the actual problem, not the general case
- **Measure, Don't Guess** - Data over intuition for performance claims
- **#NoMessLeftBehind** - Never leave broken builds. Every error must be resolved

## Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Router/Query, Tailwind CSS v4, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: Prisma ORM (SQLite default)
- **State**: TanStack Query (server), Zustand (client), React Hook Form + Zod (forms)
- **Build**: Vite 6, TypeScript strict mode
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting/Formatting**: Biome, ESLint, Prettier (with Tailwind plugin)
- **Design**: Figma Code Connect, Figma MCP servers
- **Plugin**: [hugin-v0](https://github.com/michelve/hugin-v0) (skills, agents, hooks, MCP servers)

## Code Standards

- TypeScript strict mode - no `any` unless absolutely necessary
- 4-space indentation, double quotes, semicolons, trailing commas
- Naming: camelCase (variables/functions), PascalCase (types/components), UPPER_SNAKE_CASE (constants)
- Max 300 lines per component, max 5 levels of nesting
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`

## Architecture

- Layered: Route → Controller → Service → Repository → Database
- Feature-based organization with proper separation of concerns
- Relative imports within modules, absolute/alias imports across modules
- Path aliases: `@/*` → `src/client/*`, `@server/*` → `src/server/*`

## React 19

- No `forwardRef` (removed), no `propTypes` (removed), no `React.FC` (removed)
- Use `ref` as a regular prop
- Functional components only with named exports
- Use `React.lazy` + `<Suspense>` for code splitting
- Loading states: use LoadingOverlay/SuspenseLoader (never early returns with spinners)

## Error Handling

- Custom error classes extending `Error`
- Typed error responses with consistent structure
- Catch Prisma errors: P2002 (unique), P2025 (not found) explicitly
- Never expose internal errors to clients

## Available Agents

The following specialized agents can be invoked for specific tasks:

| Agent                        | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| `auto-error-resolver`        | Fix TypeScript compilation and build errors systematically   |
| `code-architecture-reviewer` | Review code for best practices and architectural consistency |
| `code-refactor-master`       | Refactor code for better organization and maintainability    |
| `documentation-architect`    | Create and enhance documentation                             |
| `plan-reviewer`              | Review development plans before implementation               |
| `principal-engineer`         | First-principles engineering analysis (Carmack-style)        |
| `refactor-planner`           | Analyze code structure and create refactoring plans          |
| `web-research-specialist`    | Research solutions on the internet                           |

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm db:push        # creates SQLite database
pnpm dev             # Vite on :5173, Express on :3001
```

## Available Scripts

```bash
pnpm dev              # Start dev servers (Vite + Express)
pnpm build            # TypeScript check + Vite build
pnpm typecheck        # Run tsc --noEmit on both configs
pnpm lint             # ESLint check
pnpm format           # Prettier format
pnpm biome:check      # Biome lint + format check
pnpm test             # Vitest unit tests
pnpm test:e2e         # Playwright e2e tests
pnpm test:e2e:ui      # Playwright UI mode
pnpm db:push          # Push Prisma schema to database
pnpm db:studio        # Open Prisma Studio
pnpm db:generate      # Generate Prisma client
```

## Plugin

This project uses the [hugin-v0](https://github.com/michelve/hugin-v0) Claude Code plugin for skills, agents, hooks, and MCP servers.

```bash
# Install (in Claude Code)
/plugin marketplace add michelve/hugin-v0
/plugin install hugin-v0@michelve

# Local testing
claude --plugin-dir ./path/to/hugin-v0
```

## Project Structure

```text
src/
├── client/              # React 19 SPA (Vite)
│   ├── routes/          # TanStack Router file-based routes
│   ├── components/      # Shared components (shadcn/ui in ui/)
│   ├── lib/             # Utilities (cn, query-client)
│   └── hooks/           # Custom React hooks
├── server/              # Express API
│   ├── routes/          # API route handlers
│   ├── controllers/     # Request parsing + response sending
│   ├── services/        # Business logic + custom error classes
│   ├── repositories/    # Prisma queries, data access only
│   └── lib/             # Shared (prisma client)
prisma/
└── schema.prisma        # Database schema (SQLite default)
e2e/
└── *.spec.ts            # Playwright e2e tests
```

## Adding UI Components

```bash
npx shadcn@latest add button card dialog    # install shadcn components
```

Components install to `src/client/components/ui/`. Import with `@/components/ui/button`.

## Figma Integration

- **Code Connect**: Create `.figma.tsx` files to map components to Figma nodes
- **MCP Servers**: `figma-developer-mcp` and `figma-console-mcp` configured in `.vscode/mcp.json`
- **Env vars**: Set `FIGMA_API_KEY`, `FIGMA_FILE_ID` in `.env` (see `.env.example`)
