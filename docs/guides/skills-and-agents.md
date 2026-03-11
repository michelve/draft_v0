# Skills & Agents

Draft v0 ships with **20 skills**, **8 agents**, and **12 prompt templates** that turn your AI assistant into a domain expert for every part of the stack. This is what makes Draft v0 different - instead of generic AI help, you get contextual guidance that knows your architecture, conventions, and patterns.

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

**Skills** provide domain knowledge - they teach the AI about specific technologies and patterns used in this project.

**Agents** are specialized workers - they perform specific multi-step tasks autonomously (fix errors, review code, plan refactors).

**Prompts** are reusable workflows - one-click commands that chain skills and agents together for common tasks.

## Skills Reference

### Frontend Skills

| Skill                     | Trigger                           | What It Does                                                                |
| ------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| **react**                 | React components, hooks, Suspense | React 19 patterns - no forwardRef, no React.FC, named exports, lazy loading |
| **react-best-practices**  | Performance optimization          | Vercel engineering guidelines for React SPA performance                     |
| **tailwindcss**           | Styling, responsive, dark mode    | Tailwind CSS v4 patterns with CSS-first config, `cn()`, `cva()`             |
| **shadcn-ui**             | UI components                     | shadcn/ui installation, usage, customization (never edit `ui/` files)       |
| **web-design-guidelines** | UI review, accessibility          | Web Interface Guidelines compliance for accessibility and design            |

### Backend Skills

| Skill            | Trigger                   | What It Does                                                                 |
| ---------------- | ------------------------- | ---------------------------------------------------------------------------- |
| **nodejs**       | Express, middleware, APIs | Node.js backend patterns - async/await, error handling, layered architecture |
| **prisma**       | Database, queries, schema | Prisma ORM patterns - Client API, transactions, repository pattern           |
| **route-tester** | API testing               | HTTP route testing patterns with JWT auth and integration tests              |

### Workflow Skills

| Skill                     | Trigger                              | What It Does                                                                 |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| **create-tasks**          | "create tasks", "break this down"    | Creates well-formed tasks from PRDs/requirements using Example Mapping       |
| **task-check**            | `/check <id> <path>`                 | Verifies task completion against acceptance criteria (PASS/FAIL/NEED_INFO)   |
| **writing-tests**         | "add tests", test review             | Test writing principles - naming, assertions, edge case coverage             |
| **playwright-skill**      | "test this", "automate browser", e2e | Browser automation - detect dev servers, write scripts, test pages and flows |
| **automatic-code-review** | After code changes                   | Semantic code review using project-specific rules                            |

### Design Skills

| Skill                          | Trigger                              | What It Does                                                             |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------ |
| **figma**                      | Figma URLs, MCP setup                | Fetches design context, screenshots, variables from Figma via MCP        |
| **figma-implement-design**     | "implement this design"              | Translates Figma nodes to production code with 1:1 visual fidelity       |
| **code-connect-components**    | "code connect", "connect to Figma"   | Creates Code Connect mappings linking Figma components to code           |
| **create-design-system-rules** | "create design rules", "setup rules" | Generates project-specific design system conventions for Figma workflows |
| **miro-mcp**                   | Miro boards, diagrams, collaboration | Creates diagrams, docs, tables on Miro boards; reads board content       |

### Meta Skills

| Skill                    | Trigger                                    | What It Does                                                                  |
| ------------------------ | ------------------------------------------ | ----------------------------------------------------------------------------- |
| **skill-creator**        | Creating, improving, and evaluating skills | Full authoring workflow: draft, test, eval, iterate, and optimize description |
| **component-visualizer** | "visualize components", "dependency graph" | Generates interactive HTML dependency graph of React component relationships  |

## Agents Reference

Agents are invoked when a task requires multi-step autonomous work.

| Agent                          | When to Use                       | What It Does                                                                              |
| ------------------------------ | --------------------------------- | ----------------------------------------------------------------------------------------- |
| **auto-error-resolver**        | Build errors, TypeScript failures | Runs `tsc --noEmit`, categorizes errors, fixes root causes first, verifies zero errors    |
| **code-architecture-reviewer** | After significant code changes    | Reviews code for architectural consistency, TypeScript strict mode, React patterns        |
| **code-refactor-master**       | Code cleanup, file splitting      | Refactors with dependency tracking, enforces 300 LOC max, zero broken imports             |
| **documentation-architect**    | Creating/updating docs            | Systematic context gathering, produces guides and API docs with diagrams                  |
| **plan-reviewer**              | Before starting implementation    | Database impact assessment, gap analysis, risk assessment with mitigations                |
| **principal-engineer**         | Complex technical decisions       | First-principles analysis - questions assumptions, demands benchmarks and data            |
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
| **create-skill**   | Build, improve, evaluate, and optimize skills - full authoring workflow |

---

## Skill Configuration Reference

Skills are configured via YAML frontmatter in `SKILL.md` files. Each field controls different aspects of skill behavior, discoverability, and execution.

### Core Fields

| Field           | Type   | Required | Default        | Purpose                                                                   |
| --------------- | ------ | -------- | -------------- | ------------------------------------------------------------------------- |
| **name**        | string | Optional | directory name | Skill identifier (lowercase, hyphens, numbers only, max 64 chars)         |
| **description** | string | Optional | first para     | Helps Claude decide when to use this skill - use phrasing users would say |
| **version**     | string | Optional | -              | Semantic version (e.g., `1.0.0`)                                          |
| **license**     | string | Optional | -              | License identifier (e.g., `MIT`)                                          |

### Discoverability Fields

| Field              | Type    | Required | Default | Purpose                                                                         |
| ------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------- |
| **user-invocable** | boolean | Optional | `true`  | If `true`, skill appears in `/` menu. Set `false` for background knowledge only |
| **argument-hint**  | string  | Optional | -       | Shown in autocomplete UI, format: `[issue-number]` or `[filename] [format]`     |

### Execution Control Fields

| Field                        | Type    | Required | Default | Purpose                                                                            |
| ---------------------------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------- |
| **disable-model-invocation** | boolean | Optional | `false` | If `true`, prevents auto-triggering. Use for manual-only workflows                 |
| **context**                  | string  | Optional | -       | Set `fork` to run skill in isolated subagent context                               |
| **agent**                    | string  | Optional | -       | Which subagent when `context: fork`. Options: `default`, `Explore`, `Plan`, custom |
| **model**                    | string  | Optional | -       | Claude model to use when skill is active (e.g., `claude-sonnet-4.5`)               |

### MCP Integration Fields

| Field                      | Type   | Required | Default | Purpose                                                             |
| -------------------------- | ------ | -------- | ------- | ------------------------------------------------------------------- |
| **metadata.allowed-tools** | array  | Optional | -       | Whitelist specific MCP tools. Nest under `metadata:`, not top-level |
| **metadata.mcp-server**    | string | Optional | -       | MCP server name (e.g., `figma`, `miro`) - documentation only        |

### Advanced Fields

| Field     | Type   | Required | Default | Purpose                                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------------------- |
| **hooks** | object | Optional | -       | Skill-scoped lifecycle hooks (e.g., `UserPromptSubmit`) |

### Example Frontmatter

```yaml
---
name: "figma-implement-design"
description: "Translate Figma nodes into production-ready code with 1:1 visual fidelity using the Figma MCP workflow."
argument-hint: "Figma URL (https://figma.com/design/:fileKey/:fileName?node-id=1-2)"
user-invocable: true
context: fork
agent: default
metadata:
    allowed-tools:
        - figma__get_design_context
        - figma__get_screenshot
        - figma__get_assets
    mcp-server: figma
---
```

---

## Argument Hints and String Substitutions

Skills can accept arguments when invoked (e.g., `/skill-name arg1 arg2`) and use string substitutions to access them.

### Supported Variables

| Variable               | Description                      | Example                                |
| ---------------------- | -------------------------------- | -------------------------------------- |
| `$ARGUMENTS`           | All arguments as a single string | `supersedes: 0005`                     |
| `$ARGUMENTS[N]`        | Positional argument (0-based)    | `$ARGUMENTS[0]` = first arg            |
| `$N`                   | Shorthand for `$ARGUMENTS[N]`    | `$0` = first, `$1` = second            |
| `${CLAUDE_SESSION_ID}` | Unique session identifier        | `0fb89cd8-e751-49cd-bc71-95cb99d63cb4` |
| `${CLAUDE_SKILL_DIR}`  | Absolute path to skill directory | `/path/to/.claude/skills/figma`        |

### How to Document Arguments

Add an `## Arguments` section to your skill explaining how variables are used:

**Example from `adr-writer/SKILL.md`:**

```markdown
## Arguments

When invoking this skill with arguments:

- `$ARGUMENTS` - Optional supersede directive in format `supersedes: NNNN`
    - Example: `/adr-writer supersedes: 0005`
    - The skill parses this to mark ADR 0005 as superseded

If invoked without arguments, the skill will create a new ADR without superseding any previous decision.
```

**Example from `figma-implement-design/SKILL.md`:**

```markdown
## Arguments

When invoking this skill with arguments:

- `$0` or `$ARGUMENTS[0]` - Figma URL in format `https://figma.com/design/:fileKey/:fileName?node-id=1-2`
    - The skill extracts `:fileKey` (file identifier) and `1-2` (node ID) from the URL
    - Example: `/figma-implement-design https://figma.com/design/abc123/MyDesign?node-id=10-25`
- `$1` or `$ARGUMENTS[1]` - Optional explicit node-id override
    - Example: `/figma-implement-design https://figma.com/design/abc123/MyDesign 10-25`
```

### Session Tracking for Workflows

Workflow skills should document `${CLAUDE_SESSION_ID}` usage to enable tracing:

````markdown
## Session Tracking

This skill uses `${CLAUDE_SESSION_ID}` to track workflow execution:

```typescript
const sessionId = process.env.CLAUDE_SESSION_ID;
console.log(`[${sessionId}] Starting workflow: ${workflowName}`);
```

This allows correlation between:

- Workflow start/completion events
- MCP tool invocations
- Git commits containing workflow outputs
- Subsequent reviews or iterations

Use the session ID to trace the full lifecycle from initiation to completion.
````

---

## MCP Server Skills

Skills that interact with MCP servers (Figma, Miro, GitHub, etc.) should explicitly whitelist allowed tools for security and clarity.

### Configuration Pattern

Use `metadata.allowed-tools` to specify which MCP tools the skill may invoke. **Must be nested under `metadata:`**, not top-level.

```yaml
---
name: "figma"
description: "Fetch design context, screenshots, and assets from Figma using MCP"
user-invocable: true
metadata:
    allowed-tools:
        - figma__get_design_context
        - figma__get_screenshot
        - figma__get_assets
        - figma__get_variables
    # MCP server required: figma
---
```

### Figma MCP Tools

Available tools from `figma-developer-mcp` server:

- `figma__get_design_context` - Fetch component structure, styles, properties
- `figma__get_screenshot` - Render visual preview of node
- `figma__get_assets` - Export SVG icons, images
- `figma__get_variables` - Retrieve design tokens (colors, spacing)
- `figma__create_component` - Create new Figma component (write operation)
- `figma__update_node` - Modify existing node properties (write operation)

### Miro MCP Tools

Available tools from `miro-mcp` server:

- `miro__draft_diagram_new` - Create new diagram in declarative format
- `miro__board_get_items` - Fetch existing board items
- `miro__diagram_edit` - Update diagram content
- `miro__create_table` - Generate tables on boards
- `miro__create_shape` - Add shapes (rectangles, circles, etc.)
- `miro__create_text` - Add text items
- `miro__create_sticky_note` - Add sticky notes
- `miro__create_connector` - Draw connections between items

### MCP Server Configuration

MCP servers are registered in `.vscode/mcp.json` (VS Code + GitHub Copilot) or `.claude/settings.json` (Claude Code). See [Figma Integration](figma-integration.md) for setup instructions.

---

## Fork Context for Workflows

Some skills need **isolated execution context** to prevent cross-contamination between workflow runs. Use `context: fork` to run skills in a clean subagent.

### When to Use Fork Context

**Use `context: fork` for:**

- Complete workflows that generate files (e.g., `adr-writer`, `create-tasks`, `figma-implement-design`)
- Multi-step processes requiring clean slate (no cached tool results from prior conversations)
- Workflows where session isolation improves reliability

**Do NOT use `context: fork` for:**

- Tech augmentation skills that add domain knowledge (e.g., `react`, `prisma`, `nodejs`, `tailwindcss`)
- Skills that should inherit context from the main conversation
- Read-only operations that benefit from existing context

### Agent Selection

When using `context: fork`, specify which subagent to use via the `agent:` field:

| Agent Value       | When to Use                                                   |
| ----------------- | ------------------------------------------------------------- |
| `default`         | General workflows requiring write operations (creating files) |
| `Explore`         | Read-only research or analysis tasks                          |
| `Plan`            | Planning and decomposition tasks                              |
| `general-purpose` | Fallback for workflows not fitting other categories           |
| `<custom-name>`   | Project-specific agent configurations                         |

### Examples

**adr-writer** - Uses fork for isolated ADR creation:

```yaml
---
name: "adr-writer"
description: "Write Architecture Decision Records in MADR 4.0.0 format"
context: fork
agent: default
---
```

**create-tasks** - Uses fork to cleanly generate task files:

```yaml
---
name: "create-tasks"
description: "Create well-formed tasks from PRDs and requirements"
context: fork
agent: default
---
```

**react** - NO fork, augments existing context:

```yaml
---
name: "react"
description: "React 19 component patterns and hooks"
user-invocable: true
# No context: fork - this skill augments existing conversations
---
```

---

## Creating New Skills

Use this checklist when creating a new skill to ensure proper configuration:

### Configuration Checklist

- [ ] **Choose name** - Lowercase, hyphens only, max 64 chars, descriptive
- [ ] **Write description** - Match phrasing users would say, be specific about triggers
- [ ] **Add argument-hint** - If skill accepts parameters, show format (e.g., `[filename] [format]`)
- [ ] **Set user-invocable** - Default `true` (appears in menu), set `false` only for background knowledge
- [ ] **Set disable-model-invocation** - Default `false`, set `true` for manual-only workflows
- [ ] **Add allowed-tools** - If MCP skill, list specific tool names under `metadata.allowed-tools`
- [ ] **Add mcp-server comment** - If MCP skill, add comment: `# MCP server required: figma`
- [ ] **Set context: fork** - Only if complete workflow needs isolation (5 skills currently use this)
- [ ] **Set agent** - If using `context: fork`, specify which subagent (usually `default`)
- [ ] **Document Arguments** - If skill uses `$ARGUMENTS`, `$0`, `$1`, add `## Arguments` section
- [ ] **Document Session Tracking** - If workflow skill, add `## Session Tracking` section for `${CLAUDE_SESSION_ID}`
- [ ] **Add "When to Use"** - Optional but recommended - list trigger phrases for better discoverability

### Decision Tree Examples

**Creating a Figma workflow skill?**
→ `user-invocable: true`, `context: fork`, `agent: default`, `metadata.allowed-tools: [figma__*]`, add Arguments + Session Tracking sections

**Creating a tech augmentation skill?**
→ `user-invocable: true`, NO `context: fork`, add "When to Use" section with trigger phrases, NO Arguments needed

**Creating a manual-only workflow?**
→ `user-invocable: true`, `disable-model-invocation: true`, document when to manually invoke

**Creating background knowledge only?**
→ `user-invocable: false` (rare - only `shadcn` uses this currently)

### Template Structure

```markdown
---
name: "my-skill"
description: "What this skill does in user-friendly language"
argument-hint: "[optional parameter format]"
user-invocable: true
context: fork # if workflow needs isolation
agent: default # if context: fork is set
metadata:
    allowed-tools: # if MCP skill
        - tool_name_1
        - tool_name_2
    # MCP server required: server-name
---

# Skill Title

## Overview

[Brief description]

## When to Use

- Trigger phrase 1
- Trigger phrase 2
- Trigger phrase 3

## Prerequisites

[What must be set up first]

## Required Workflow

[Step-by-step instructions]

## Arguments

[If skill accepts parameters, document $ARGUMENTS usage]

## Session Tracking

[If workflow skill, document ${CLAUDE_SESSION_ID} usage]

## Examples

[Real-world usage patterns]

## Additional Resources

[Links to docs, related skills]
```

---

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

## Hooks (Claude Code)

Hooks in `.claude/hooks/` run automatically at specific points in the Claude Code workflow - before writing files, after edits, on every user message. They enforce rules without relying on the AI to remember them.

Registered in `.claude/settings.json`.

| Hook                      | Event                                    | Triggers On                                         | Behavior                                                                                  |
| ------------------------- | ---------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **commitlint-enforcer**   | `PreToolUse` / `Bash`                    | `git commit -m` commands                            | **Blocks** commits with invalid type prefix, uppercase, trailing dot, or >100 char header |
| **anti-pattern-guard**    | `PreToolUse` / `Write\|Edit\|MultiEdit`  | `.ts` / `.tsx` writes                               | **Warns** on `React.FC`, `forwardRef(`, `.propTypes =`, `export default function`         |
| **adr-gate**              | `UserPromptSubmit`                       | Keywords: install, switch to, migrate, new pattern… | **Injects** ADR violation check reminder before Claude processes the prompt               |
| **task-context-injector** | `UserPromptSubmit`                       | Task numbers: `0005`, `task 5`, `#0005`             | **Injects** Deliverable + Acceptance Criteria from the matching task file                 |
| **quality-gate-reminder** | `PostToolUse` / `Write\|Edit\|MultiEdit` | `.ts` / `.tsx` writes                               | **Reminds** to run `pnpm typecheck && pnpm biome:check` before committing                 |

Hooks receive JSON via stdin and write to stdout. Exit 0 = allow (output appended to context), exit 2 = block (output shown as error).

---

## What Makes This Different

Traditional projects give AI assistants zero context about architecture decisions, naming conventions, or approved patterns. The result is code that works but does not fit.

Draft v0 skills solve this by giving the AI:

1. **Opinionated patterns** - Not just "use React" but "use React 19 with named exports, no forwardRef, lazy + Suspense for code splitting"
2. **Anti-patterns** - Explicit lists of what NOT to do (no `useState` + `useEffect` for server data, no `default export`, no `React.FC`)
3. **Project-specific conventions** - Path aliases, response formats, error handling patterns that match YOUR codebase
4. **Automated verification** - Code review agents that check generated code against project rules
5. **Design-to-code pipeline** - Figma skills that produce production-ready components, not rough approximations

The result: AI-generated code that passes your quality gates on the first try.

## Next Steps

- [Tasks Workflow](tasks-workflow.md) - How tasks are created, tracked, and verified
- [Figma Integration](figma-integration.md) - Set up the design-to-code pipeline
- [Architecture Decisions](architecture-decisions.md) - How architectural decisions are recorded and tracked
