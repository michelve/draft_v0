---
status: accepted
date: 2026-03-07
---

# Use Architecture Decision Records

## Context and Problem Statement

Design decisions accumulate over the life of a project but the reasoning behind them is typically lost — living only in Slack threads, PR descriptions, or peoples' heads. Six months later, nobody remembers _why_ something was built a particular way, leading to repeating settled debates, accidentally reverting decisions, and onboarding friction.

How can we preserve architectural decision reasoning in a lightweight, version-controlled way?

## Decision Drivers

- Decision reasoning is lost over time — no single source of truth
- New contributors can't distinguish intentional constraints from accidental ones
- Need a format that lives alongside the code and is easy to write

## Considered Options

- Informal documentation (wiki pages, Notion docs)
- Architecture Decision Records (MADR format in `docs/decisions/`)
- Design docs in PRs only

## Decision Outcome

Chosen option: "Architecture Decision Records (MADR format)", because they are lightweight, version-controlled alongside the code, and follow a well-established community standard.

Each record captures context, considered options, the decision outcome, and its consequences.

ADRs are written when:

- Choosing a framework, library, or significant dependency
- Designing a new architectural layer or pattern
- Changing an existing convention or workflow
- Making a trade-off that future engineers will question

ADRs are NOT needed for bug fixes, small refactors, or following existing patterns.

AI agents are instructed to propose ADRs when making or recommending architectural decisions.

### Consequences

- Good, because decisions are discoverable and searchable in the repo
- Good, because new contributors can understand the "why" behind constraints
- Good, because superseded decisions preserve history — you can trace the evolution
- Bad, because there is small overhead per significant decision (5–10 minutes to write)
- Bad, because ADRs add tokens to AI context when referenced — but only for high-stakes decisions where the tradeoff is worth it
- Neutral, because ADRs are immutable once accepted — to change a decision, create a new ADR that supersedes the old one
