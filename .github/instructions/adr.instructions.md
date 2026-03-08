---
applyTo: "**"
---

# Architecture Decision Records (ADRs)

When making significant architectural or design decisions, record them in `docs/decisions/`.

## When to Write an ADR

- Choosing a framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that future engineers will question
- Deprecating or replacing a previous decision

Do NOT write an ADR for bug fixes, small refactors, cosmetic changes, adding pages following existing patterns, or installing shadcn/ui components.

## How to Create an ADR

1. Find the next number: check `docs/decisions/` for the highest `NNNN` prefix, increment by 1
2. Copy `docs/decisions/_template.md` as `docs/decisions/NNNN-short-title.md`
3. Fill in YAML frontmatter (status, date), Context and Problem Statement, Considered Options, Decision Outcome (with `Chosen option: "X", because Y` phrasing), and Consequences (`* Good/Bad/Neutral, because ...`)
4. Set status to `proposed` (or `accepted` if the decision is already implemented)
5. Add the entry to the index table in `docs/decisions/README.md`
6. Optional sections (Decision Drivers, Confirmation, Pros and Cons of the Options, More Information) can be included when relevant

## File Naming

`NNNN-short-title.md` — zero-padded number, lowercase, hyphenated.

## Status Values

- **proposed** — Under discussion, not yet implemented
- **accepted** — Approved and implemented
- **deprecated** — No longer relevant
- **superseded** — Replaced by a newer ADR (link to it)

## Agent Requirement — Non-Optional

When implementing a task that involves a qualifying decision (see "When to Write an ADR" above), you **MUST** write the ADR as part of the same task — not as a follow-up suggestion, not optional.

- Write the ADR **before or alongside** the implementation, not after
- If the implementation is already done, write the ADR immediately in the same response
- Do NOT ask the user if they want an ADR — just write it
- Reference the template and existing ADRs in `docs/decisions/` for style consistency

The only exception is the explicit "Do NOT write" list above (bug fixes, small refactors, cosmetic changes, adding pages following existing patterns, installing shadcn/ui components).
