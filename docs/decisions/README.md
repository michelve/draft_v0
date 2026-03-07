# Architecture Decision Records

Records of significant architectural and design decisions for Draft v0.

## Format

Each ADR follows the [MADR 4.0.0](https://adr.github.io/madr/) (Markdown Architectural Decision Records) template:

- **Status**: proposed | accepted | deprecated | superseded (in YAML frontmatter)
- **Context and Problem Statement**: What is the issue driving the decision?
- **Considered Options**: What alternatives were evaluated?
- **Decision Outcome**: What was chosen and why?
- **Consequences**: Good/Bad/Neutral trade-offs

## Index

| #    | Decision                                  | Status   | Date       |
| ---- | ----------------------------------------- | -------- | ---------- |
| 0001 | Use ADRs to record decisions              | accepted | 2026-03-07 |
| 0002 | Layered backend architecture              | accepted | 2026-03-07 |
| 0003 | Tailwind CSS v4 with CSS-first config     | accepted | 2026-03-07 |
| 0004 | shadcn/ui components are immutable        | accepted | 2026-03-07 |
| 0005 | TanStack Router + Query over Next.js      | accepted | 2026-03-07 |
| 0006 | Biome ignores shadcn/ui directory         | accepted | 2026-03-07 |
| 0007 | Build uses tsc --noEmit instead of tsc -b | accepted | 2026-03-07 |

## Naming Convention

Files: `NNNN-short-title.md` (zero-padded, lowercase, hyphenated)

## When to Write an ADR

- Choosing a framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that future engineers will question
- Deprecating or replacing a previous decision

You do NOT need an ADR for:

- Bug fixes, small refactors, or cosmetic changes
- Adding a new page/route following existing patterns
- Installing a shadcn/ui component
