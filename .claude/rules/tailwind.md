---
description: "Tailwind CSS v4 styling patterns and conventions"
---

# Tailwind CSS v4 Conventions

## Configuration

- CSS-first config — no `tailwind.config.js` file
- Theme defined via `@theme inline` in `src/client/index.css`
- Color system uses oklch values for consistent color space
- Dark mode via `@custom-variant dark` (class-based)

## File Locations

| Purpose                                                                 | File                                                      |
| ----------------------------------------------------------------------- | --------------------------------------------------------- |
| Tailwind theme tokens (colors, spacing, radii)                          | `src/client/index.css` — `@theme inline` block            |
| Custom CSS (@font-face, @keyframes, CSS vars, Figma exports, overrides) | `src/client/custom.css`                                   |
| Vite-processed images/icons (imported in TS)                            | `src/client/assets/images/` or `src/client/assets/icons/` |
| Static fonts referenced by URL in CSS                                   | `public/fonts/`                                           |

## Class Utilities

- Use `cn()` from `@/lib/utils` to merge conditional classes (uses `tailwind-merge`)
- Use `cva()` for reusable variant systems (uses `class-variance-authority`)
- Tailwind-aware functions: `cn`, `cva`, `clsx` (configured in Prettier + VS Code)

## Styling Rules

- Use utility classes for all styling — avoid custom CSS unless truly necessary
- Avoid `@apply` except in `@layer base` for global defaults
- **Never** use inline `style={}` when an equivalent Tailwind utility exists
- Mobile-first responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` breakpoints

## Theme Tokens

- Colors: `bg-background`, `text-foreground`, `border-border`, etc.
- Component colors: `bg-primary`, `text-primary-foreground`, `bg-muted`, etc.
- Use semantic token names (not raw oklch values) in components

## Patterns

```tsx
// Conditional classes
<div className={cn("rounded-lg border p-4", isError && "border-destructive")} />

// Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />

// Dark mode
<div className="bg-background text-foreground dark:bg-zinc-950" />
```
