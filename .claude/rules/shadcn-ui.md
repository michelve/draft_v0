---
description: "shadcn/ui component installation, usage, and extension patterns for src/client/**"
---

# shadcn/ui Conventions

## Installation

- Install components via CLI only: `npx shadcn@latest add <component>`
- Components install to `src/client/components/ui/` as flat files (not folders)
- Config in `components.json`: new-york style, `rsc: false`, tsx, Lucide icons

## Imports

- Import from `@/components/ui/<name>` (e.g., `@/components/ui/button`)
- Radix primitives come from the `radix-ui` package (flat package)
- Use `import type` for type-only imports

## Styling

- Use `cn()` from `@/lib/utils` for conditional class merging
- Use `cva()` from `class-variance-authority` for variant-based component styling
- shadcn components use CSS variables for theming (defined in `index.css`)

## Customization

- **Never** modify files in `components/ui/` directly
- To customize: create a wrapper component outside `ui/` that composes the shadcn component
- Example: `components/app-button.tsx` wraps `ui/button` with project-specific defaults

## Component Patterns

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Variants via props (shadcn built-in)
<Button variant="outline" size="sm">Click</Button>

// Conditional classes
<div className={cn("base-classes", isActive && "active-classes")} />
```
