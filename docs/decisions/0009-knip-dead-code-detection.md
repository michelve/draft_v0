---
status: accepted
date: 2026-03-08
---

# Knip for dead code and unused dependency detection

## Context and Problem Statement

As the project grows, unused exports, unreferenced files, and stale dependencies accumulate silently. TypeScript and Biome do not catch unused exports across module boundaries or unused `package.json` entries. How do we keep the codebase lean without manual audits?

## Considered Options

- `knip` — static analysis tool that finds unused files, exports, and dependencies across the whole project graph
- `ts-prune` — finds unused TypeScript exports only, no dependency awareness
- `depcheck` — finds unused `package.json` dependencies only, no code-level analysis
- No tooling — rely on manual review

## Decision Outcome

Chosen option: "`knip`", because it combines unused file, export, and dependency detection in one tool, understands TypeScript path aliases and project references, and outputs actionable results in CI without blocking the build.

### Consequences

- Good, because unused code and dependencies are surfaced automatically in CI on every push
- Good, because `knip.config.ts` allows precise ignoring of generated files (`routeTree.gen.ts`) and intentionally-kept packages (`tailwindcss`, `@figma/code-connect`)
- Good, because the CI step uses `continue-on-error: true` so knip findings are informational, not blocking
- Neutral, because the `ignoreDependencies` list must be maintained as new dev-only packages are added
- Bad, because knip has false-positives for packages consumed indirectly (e.g. PostCSS plugins), requiring manual ignore entries
