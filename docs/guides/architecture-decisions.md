# Architecture Decisions

Draft v0 uses Architecture Decision Records (ADRs) to capture significant technical decisions. ADRs are Markdown files stored in `docs/decisions/` that explain what was decided, why, and what alternatives were considered.

## Why ADRs?

Without ADRs, future engineers (or your future self) will ask:

- "Why did we choose this framework over that one?"
- "Why is this pattern used instead of the standard approach?"
- "Can I change this, or will something break?"

ADRs prevent decision archaeology. They capture the reasoning at the time it was made, along with trade-offs and consequences.

## Directory Structure

```text
docs/decisions/
├── README.md           # Index of all ADRs
├── _template.md        # Template for new ADRs (MADR 4.0.0)
├── 0001-*.md           # Individual decisions
├── 0002-*.md
└── ...
```

## Current Decisions

| #    | Decision                                  | Status   |
| ---- | ----------------------------------------- | -------- |
| 0001 | Use ADRs to record decisions              | accepted |
| 0002 | Layered backend architecture              | accepted |
| 0003 | Tailwind CSS v4 with CSS-first config     | accepted |
| 0004 | shadcn/ui components are immutable        | accepted |
| 0005 | TanStack Router + Query over Next.js      | accepted |
| 0006 | Biome ignores shadcn/ui directory         | accepted |
| 0007 | Build uses tsc --noEmit instead of tsc -b | accepted |

## When to Write an ADR

Write an ADR when you are:

- Choosing a new framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that someone will question later
- Deprecating or replacing a previous decision

**Do NOT** write an ADR for bug fixes, small refactors, cosmetic changes, adding pages following existing patterns, or installing DSAi components.

## How to Create an ADR

### 1. Find the Next Number

Check `docs/decisions/` for the highest `NNNN` prefix. Increment by 1.

### 2. Copy the Template

```bash
cp docs/decisions/_template.md docs/decisions/NNNN-short-title.md
```

### 3. Fill in the Sections

The template follows [MADR 4.0.0](https://adr.github.io/madr/) format:

| Section                           | Required | Purpose                                       |
| --------------------------------- | -------- | --------------------------------------------- |
| **YAML Frontmatter**              | Yes      | Status and date                               |
| **Title**                         | Yes      | Short descriptive title matching the filename |
| **Context and Problem Statement** | Yes      | What situation led to this decision?          |
| **Considered Options**            | Yes      | What alternatives were evaluated?             |
| **Decision Outcome**              | Yes      | `Chosen option: "X", because Y`               |
| **Consequences**                  | Yes      | Good, Bad, and Neutral outcomes               |
| **Decision Drivers**              | Optional | Factors that influenced the choice            |
| **Pros and Cons**                 | Optional | Detailed comparison of options                |
| **More Information**              | Optional | Links, references, follow-ups                 |

### 4. Set Status

| Status         | Meaning                               |
| -------------- | ------------------------------------- |
| **proposed**   | Under discussion, not yet implemented |
| **accepted**   | Approved and implemented              |
| **deprecated** | No longer relevant                    |
| **superseded** | Replaced by a newer ADR (link to it)  |

### 5. Update the Index

Add the entry to the table in `docs/decisions/README.md`.

## Example ADR

```markdown
---
status: accepted
date: 2026-03-07
---

# Use TanStack Router + Query over Next.js

## Context and Problem Statement

We need a routing and data-fetching solution for the React frontend.
Next.js provides both but couples us to its deployment model and server components.

## Considered Options

- Next.js (App Router with RSC)
- TanStack Router + TanStack Query
- React Router + SWR

## Decision Outcome

Chosen option: "TanStack Router + TanStack Query", because it gives us
file-based routing and powerful data fetching without framework lock-in.
We stay a pure SPA served by Vite, deployed anywhere.

### Consequences

- Good, because we control our build and deployment pipeline
- Good, because TanStack Query provides caching, invalidation, and devtools
- Bad, because we lose SSR/SSG capabilities (acceptable for this SPA)
- Neutral, because TanStack Router is newer with a smaller community
```

## ADRs and Tasks

When working on a task that involves a significant decision:

1. Create the ADR before or alongside implementation
2. Reference the ADR in the task's **Key Decisions** section
3. The AI will suggest writing an ADR when it detects a qualifying decision

## Next Steps

- [Tasks Workflow](tasks-workflow.md) - How ADRs connect to task implementation
- [Skills & Agents](skills-and-agents.md) - Agents that help review architectural decisions
- [Project Structure](project-structure.md) - See where ADRs fit in the project layout
