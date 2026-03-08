# Documentation Guides

Welcome to Draft v0 — a full-stack React 19 + Express scaffold with AI-powered development workflows.

## What Makes Draft v0 Different

Most project scaffolds give you a tech stack and leave you on your own. Draft v0 goes further:

- **17 AI skills** that teach your AI assistant the exact patterns, conventions, and anti-patterns for every part of the stack
- **8 specialized agents** that autonomously fix errors, review code, plan refactors, and research solutions
- **12 prompt templates** that chain skills into one-click workflows (build a page, implement a Figma design, create a PR)
- **File-based task system** with AI-powered creation and verification — no external tools needed
- **Architecture Decision Records** that capture the "why" behind every significant choice
- **Figma-to-code pipeline** that translates designs to production components with 1:1 visual fidelity

The result: AI-generated code that follows your project's rules and passes quality gates on the first try.

## Guides

| Guide                                                 | Description                                                                               |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Getting Started](getting-started.md)                 | Prerequisites, installation, running the project, available commands                      |
| [Project Structure](project-structure.md)             | Directory layout, architecture layers, path aliases, configuration files                  |
| [Skills & Agents](skills-and-agents.md)               | All 17 skills, 8 agents, 12 prompts, and 7 rule files — what they do and when to use them |
| [Tasks Workflow](tasks-workflow.md)                   | File-based task management — creating, tracking, and verifying tasks with AI              |
| [Workflows & Automation](workflows-and-automation.md) | GitHub Actions CI/CD, Dependabot, and local Git hooks (Husky + commitlint)                |
| [Figma Integration](figma-integration.md)             | Setting up Figma MCP, design-to-code workflow, component mapping                          |
| [Architecture Decisions](architecture-decisions.md)   | ADR system — when and how to record technical decisions                                   |

## Quick Start

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev
```

Then open <http://localhost:5173>.

## For Designers

Start with:

1. [Getting Started](getting-started.md) — Get the project running
2. [Figma Integration](figma-integration.md) — Set up the design-to-code pipeline
3. [Skills & Agents](skills-and-agents.md) — Understand which skills help translate designs

## For Developers

Start with:

1. [Getting Started](getting-started.md) — Get the project running
2. [Project Structure](project-structure.md) — Understand the architecture
3. [Skills & Agents](skills-and-agents.md) — See what tools are available
4. [Tasks Workflow](tasks-workflow.md) — How work is tracked and verified
