---
status: superseded by ADR-0014
date: 2026-03-07
---

# shadcn/ui Components Are Immutable

> **Superseded by [ADR 0014 — Migrate to DSAi Design System + Bootstrap 5.3](0014-dsai-bootstrap-migration.md)**

## Context and Problem Statement

shadcn/ui installs components as source code into `src/client/components/ui/`. This is different from typical npm packages - the files are fully owned by the project. However, modifying these files creates maintenance problems: `npx shadcn@latest add` overwrites manual changes, Biome/ESLint rules conflict with shadcn's generated code style, and each new component installation would require re-applying manual fixes.

Should we modify shadcn component files to match our project conventions, or treat them as immutable?

## Decision Drivers

- Biome flagged 3 issues in `button.tsx` (import order, import type, formatting)
- Initial fix of reformatting the file was the wrong approach - changes would be overwritten
- Need a sustainable strategy as more shadcn components are added

## Considered Options

- Modify shadcn files to match project lint rules
- Treat shadcn files as immutable vendor code and create wrappers

## Decision Outcome

Chosen option: "Treat shadcn files as immutable vendor code and create wrappers", because it is sustainable across component additions and aligns with shadcn/ui's intended usage pattern.

Rules:

1. **Never modify shadcn component files directly** - create wrapper components in `src/client/components/` instead
2. **Biome ignores the `ui/` directory** via overrides in `biome.json` (formatter disabled, import organization off, `useImportType` off)
3. **Wrappers compose** the shadcn component with project-specific defaults

Example wrapper:

```tsx
// src/client/components/app-button.tsx
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function AppButton({ className, ...props }: ButtonProps) {
    return <Button className={cn("custom-defaults", className)} {...props} />;
}

export { AppButton };
```

### Consequences

- Good, because safe to run `npx shadcn@latest add` at any time without losing changes
- Good, because no Biome/ESLint conflicts with shadcn's generated code
- Good, because clear separation between vendor UI primitives and project customizations
- Good, because consistent with shadcn/ui's intended usage pattern
- Bad, because wrapper components add a thin layer of indirection
- Bad, because developers must know to create wrappers instead of modifying `ui/` files directly
- Neutral, because the Biome override in `biome.json` is well-documented and scoped precisely to `src/client/components/ui/**`
