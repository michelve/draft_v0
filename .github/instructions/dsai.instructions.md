---
applyTo: "src/client/**"
---

# DSAi Component Conventions

## Components

- DSAi components live in `src/client/components/ui/` as flat files (not folders)
- Components are pre-installed — no CLI installation needed

## Imports

- Import from `@/components/ui/<name>` (e.g., `@/components/ui/button`)
- Use `import type` for type-only imports

## Styling

- Use `cn()` from `@/lib/utils` for conditional class merging
- Use `cva()` from `class-variance-authority` for variant-based component styling
- DSAi components use CSS variables for theming (`--dsai-*` tokens defined in `index.css`)

## Customization

- **Never** modify files in `components/ui/` directly
- To customize: create a wrapper component outside `ui/` that composes the DSAi component
- Example: `components/app-button.tsx` wraps `ui/button` with project-specific defaults

## Component Patterns

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Variants via props (DSAi built-in)
<Button variant="outline" size="sm">Click</Button>

// Conditional classes
<div className={cn("base-classes", isActive && "active-classes")} />
```
