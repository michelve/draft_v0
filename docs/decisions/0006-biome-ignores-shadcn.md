---
status: superseded by ADR-0014
date: 2026-03-07
---

# Biome Ignores shadcn/ui Directory

> **Superseded by [ADR 0014 — Migrate to DSAi Design System + Bootstrap 5.3](0014-dsai-bootstrap-migration.md)**

## Context and Problem Statement

Biome's default rules flag issues in shadcn/ui generated component files: import ordering differences, `useImportType` enforcement, and minor formatting mismatches. Since shadcn components are treated as immutable vendor code (see [ADR 0004](0004-shadcn-ui-immutable.md)), reformatting them is counterproductive - changes would be overwritten on the next `npx shadcn@latest add`.

How should we handle Biome lint/format conflicts with shadcn/ui generated files?

## Considered Options

- Disable the conflicting Biome rules globally
- Add Biome overrides scoped to `src/client/components/ui/**`
- Add each shadcn file to Biome's ignore list individually

## Decision Outcome

Chosen option: "Add Biome overrides scoped to `src/client/components/ui/**`", because it precisely targets only the vendor directory without weakening rules for the rest of the codebase.

Configuration in `biome.json`:

```json
{
    "overrides": [
        {
            "includes": ["src/client/components/ui/**"],
            "formatter": { "enabled": false },
            "organizeImports": { "enabled": false },
            "linter": {
                "rules": {
                    "style": {
                        "useImportType": "off"
                    }
                }
            }
        }
    ]
}
```

This disables:

1. **Formatter** - No auto-formatting of shadcn files
2. **Import organization** - No reordering of imports
3. **`useImportType` rule** - No enforcement of `import type` syntax

### Consequences

- Good, because `pnpm biome:check` passes clean without modifying vendor files
- Good, because developers can install new shadcn components without triggering lint errors
- Good, because scoped precisely - only affects `src/client/components/ui/**`, not custom components
- Bad, because actual code issues in `ui/` files won't be caught by Biome (acceptable since these are well-tested upstream components)
- Neutral, because ESLint and TypeScript type checking still apply to `ui/` files (only Biome is disabled)
- Neutral, because the override is documented in `biome.json` and this ADR

## More Information

Related: [ADR 0004 - shadcn/ui Components Are Immutable](0004-shadcn-ui-immutable.md)
