# Getting Started

Set up Draft v0 and start building in under 5 minutes.

## Prerequisites

| Tool        | Version | Install                                                |
| ----------- | ------- | ------------------------------------------------------ |
| **Node.js** | 20+     | [nodejs.org](https://nodejs.org)                       |
| **pnpm**    | 9+      | `npm install -g pnpm`                                  |
| **Git**     | 2.40+   | [git-scm.com](https://git-scm.com)                     |
| **VS Code** | Latest  | [code.visualstudio.com](https://code.visualstudio.com) |

## Installation

```bash
# Clone the repository
git clone https://github.com/michelve/draft_v0.git
cd draft_v0

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env

# Create SQLite database and generate Prisma client
pnpm db:push
```

## Running the Project

```bash
pnpm dev
```

This starts two servers concurrently:

| Server      | URL                   | Purpose              |
| ----------- | --------------------- | -------------------- |
| **Vite**    | http://localhost:5173 | React frontend (SPA) |
| **Express** | http://localhost:3001 | API backend          |

API requests from the frontend are automatically proxied — `/api/*` routes are forwarded from Vite to Express.

## Environment Variables

Edit `.env` to configure your environment:

```bash
DATABASE_URL="file:./dev.db"     # SQLite database path
PORT=3001                         # Express server port
NODE_ENV="development"

# Optional — Figma integration (see Figma guide)
FIGMA_API_KEY=""
FIGMA_FILE_ID=""
FIGMA_PROJECT_ID=""
```

## VS Code Setup

Open the project in VS Code. You will see a notification to install recommended extensions — accept it. These extensions provide:

- **Tailwind CSS IntelliSense** — Class autocomplete and hover previews
- **Prisma** — Schema syntax highlighting and formatting
- **Biome** — Fast linting and formatting
- **ESLint + Prettier** — Additional code quality checks
- **TanStack Router** — Route file support

The workspace is pre-configured with editor settings (4-space tabs, format-on-save, Tailwind class sorting).

## Available Commands

### Development

| Command          | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `pnpm dev`       | Start Vite + Express dev servers         |
| `pnpm build`     | TypeScript check + Vite production build |
| `pnpm typecheck` | Run `tsc --noEmit` on both configs       |

### Code Quality

| Command            | Purpose                   |
| ------------------ | ------------------------- |
| `pnpm lint`        | ESLint check              |
| `pnpm biome:check` | Biome lint + format check |
| `pnpm format`      | Prettier format           |

### Testing

| Command            | Purpose                        |
| ------------------ | ------------------------------ |
| `pnpm test`        | Vitest unit tests              |
| `pnpm test:e2e`    | Playwright end-to-end tests    |
| `pnpm test:e2e:ui` | Playwright with interactive UI |

### Database

| Command            | Purpose                        |
| ------------------ | ------------------------------ |
| `pnpm db:push`     | Push schema changes to SQLite  |
| `pnpm db:generate` | Regenerate Prisma client       |
| `pnpm db:studio`   | Open Prisma Studio (visual DB) |

## Quality Gates

Before committing or pushing code, all of these must pass:

```bash
pnpm typecheck      # Zero TypeScript errors
pnpm biome:check    # Zero Biome lint/format errors
pnpm lint           # Zero ESLint errors
pnpm build          # Clean production build
```

## Next Steps

- [Project Structure](project-structure.md) — Understand the architecture and directory layout
- [Skills & Agents](skills-and-agents.md) — Learn how AI-powered skills and agents accelerate development
- [Figma Integration](figma-integration.md) — Set up Figma-to-code workflow for designers
