# Skills & Agents

Draft v0 ships with **17 skills**, **8 agents**, and **12 prompt templates** that turn your AI assistant into a domain expert for every part of the stack. This is what makes Draft v0 different — instead of generic AI help, you get contextual guidance that knows your architecture, conventions, and patterns.

## How It Works

```text
You ask a question or request a task
    ↓
AI loads the relevant skill (domain knowledge)
    ↓
Skill provides conventions, patterns, anti-patterns
    ↓
AI generates code that follows YOUR project's rules
```

**Skills** provide domain knowledge — they teach the AI about specific technologies and patterns used in this project.

**Agents** are specialized workers — they perform specific multi-step tasks autonomously (fix errors, review code, plan refactors).

**Prompts** are reusable workflows — one-click commands that chain skills and agents together for common tasks.

## Skills Reference

### Frontend Skills

| Skill                     | Trigger                           | What It Does                                                                |
| ------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| **react**                 | React components, hooks, Suspense | React 19 patterns — no forwardRef, no React.FC, named exports, lazy loading |
| **react-best-practices**  | Performance optimization          | Vercel engineering guidelines for React SPA performance                     |
| **tailwindcss**           | Styling, responsive, dark mode    | Tailwind CSS v4 patterns with CSS-first config, `cn()`, `cva()`             |
| **shadcn-ui**             | UI components                     | shadcn/ui installation, usage, customization (never edit `ui/` files)       |
| **web-design-guidelines** | UI review, accessibility          | Web Interface Guidelines compliance for accessibility and design            |

### Backend Skills

| Skill            | Trigger                   | What It Does                                                                 |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------- |
| **nodejs**       | Express, middleware, APIs | Node.js backend patterns — async/await, error handling, layered architecture |
| **prisma**       | Database, queries, schema | Prisma ORM patterns — Client API, transactions, repository pattern           |
| **route-tester** | API testing               | HTTP route testing patterns with JWT auth and integration tests              |

### Workflow Skills

| Skill                     | Trigger                                  | What It Does                                                                 |
| ------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| **create-tasks**          | "create tasks", "break this down"        | Creates well-formed tasks from PRDs/requirements using Example Mapping       |
| **task-check**            | `/check <id> <path>`                     | Verifies task completion against acceptance criteria (PASS/FAIL/NEED_INFO)   |
| **writing-tests**         | "add tests", test review                 | Test writing principles — naming, assertions, edge case coverage             |
| **playwright-skill**      | "test this", "automate browser", e2e     | Browser automation — detect dev servers, write scripts, test pages and flows |
| **automatic-code-review** | After code changes                       | Semantic code review using project-specific rules                            |

### Design Skills

| Skill                      | Trigger                              | What It Does                                                       |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| **figma**                  | Figma URLs, MCP setup                | Fetches design context, screenshots, variables from Figma via MCP  |
| **figma-implement-design** | "implement this design"              | Translates Figma nodes to production code with 1:1 visual fidelity |
| **miro-mcp**               | Miro boards, diagrams, collaboration | Creates diagrams, docs, tables on Miro boards; reads board content |

### Meta Skills

| Skill             | Trigger                                    | What It Does                                                                  |
| ----------------- | ------------------------------------------ | ----------------------------------------------------------------------------- |
| **skill-creator** | Creating, improving, and evaluating skills | Full authoring workflow: draft, test, eval, iterate, and optimize description |

## Agents Reference

Agents are invoked when a task requires multi-step autonomous work.

| Agent                          | When to Use                       | What It Does                                                                              |
| ------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| **auto-error-resolver**        | Build errors, TypeScript failures | Runs `tsc --noEmit`, categorizes errors, fixes root causes first, verifies zero errors    |
| **code-architecture-reviewer** | After significant code changes    | Reviews code for architectural consistency, TypeScript strict mode, React patterns        |
| **code-refactor-master**       | Code cleanup, file splitting      | Refactors with dependency tracking, enforces 300 LOC max, zero broken imports             |
| **documentation-architect**    | Creating/updating docs            | Systematic context gathering, produces guides and API docs with diagrams                  |
| **plan-reviewer**              | Before starting implementation    | Database impact assessment, gap analysis, risk assessment with mitigations                |
| **principal-engineer**         | Complex technical decisions       | First-principles analysis — questions assumptions, demands benchmarks and data            |
| **refactor-planner**           | Planning code restructuring       | Identifies code smells, documents dependencies, creates step-by-step migration plans      |
| **web-research-specialist**    | Debugging, finding solutions      | Searches GitHub issues, Reddit, Stack Overflow, blogs; compiles findings with reliability |

## Prompt Templates

One-click workflows that combine skills and agents for common tasks. Use them from VS Code's command palette or Copilot chat.

| Prompt             | Purpose                                                                 |
| ------------------ | ----------------------------------------------------------------------- |
| **build-page**     | Design and build a new page with React 19 + TanStack Router + shadcn/ui |
| **figma-to-code**  | Translate a Figma design into production-ready React components         |
| **commit**         | Create a conventional commit with proper format                         |
| **pr**             | Create a changeset and open a pull request                              |
| **gh-new-pr**      | Open a new GitHub PR using GH CLI                                       |
| **gh-debug-issue** | Debug a GitHub issue: analyze → reproduce → fix                         |
| **gh-fix-ci**      | Diagnose and fix CI failures on a pull request                          |
| **gh-pr-comments** | Handle and respond to PR review comments                                |
| **make-moves**     | Work on a specific GitHub issue with analysis and reproduction          |
| **changeset**      | Create version-bump changesets for releases                             |
| **ralph-plan**     | Interactive planning assistant for structured task planning             |
| **create-skill**   | Build, improve, evaluate, and optimize skills — full authoring workflow |

## Rules (Convention Enforcement)

Rules in `.claude/rules/` are always active and enforce project conventions automatically:

| Rule                | Enforces                                                    |
| ------------------- | ----------------------------------------------------------- |
| **express-api**     | API response format, status codes, error handling patterns  |
| **prisma**          | Prisma Client usage, P2002/P2025 error handling, no raw SQL |
| **react**           | React 19 patterns, TanStack Router/Query, named exports     |
| **shadcn-ui**       | Component installation, no direct ui/ modification          |
| **state-and-forms** | TanStack Query for server state, Zustand for client state   |
| **tailwind**        | Tailwind v4 CSS-first config, utility classes, `cn()` usage |
| **codacy**          | Automated code quality analysis after every file edit       |

## What Makes This Different

Traditional projects give AI assistants zero context about architecture decisions, naming conventions, or approved patterns. The result is code that works but does not fit.

Draft v0 skills solve this by giving the AI:

1. **Opinionated patterns** — Not just "use React" but "use React 19 with named exports, no forwardRef, lazy + Suspense for code splitting"
2. **Anti-patterns** — Explicit lists of what NOT to do (no `useState` + `useEffect` for server data, no `default export`, no `React.FC`)
3. **Project-specific conventions** — Path aliases, response formats, error handling patterns that match YOUR codebase
4. **Automated verification** — Code review agents that check generated code against project rules
5. **Design-to-code pipeline** — Figma skills that produce production-ready components, not rough approximations

The result: AI-generated code that passes your quality gates on the first try.

## Next Steps

- [Tasks Workflow](tasks-workflow.md) — How tasks are created, tracked, and verified
- [Figma Integration](figma-integration.md) — Set up the design-to-code pipeline
- [Architecture Decisions](architecture-decisions.md) — How architectural decisions are recorded and tracked
