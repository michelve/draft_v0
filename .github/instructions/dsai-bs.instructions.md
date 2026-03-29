---
applyTo: "src/client/**"
---

# Bootstrap 5.3 + DSAi Styling Conventions

## Configuration

- Bootstrap 5.3 via npm, DSAi design tokens via CSS variables
- Dark mode via Bootstrap's `data-bs-theme` attribute
- Custom overrides in `src/client/custom.css` only (ADR 0011)

## File Locations

| Purpose                                                  | File                                                      |
| -------------------------------------------------------- | --------------------------------------------------------- |
| DSAi design tokens (`--dsai-*` CSS variables)            | `src/client/index.css`                                    |
| Custom CSS (@font-face, @keyframes, CSS vars, overrides) | `src/client/custom.css`                                   |
| Vite-processed images/icons (imported in TS)             | `src/client/assets/images/` or `src/client/assets/icons/` |
| Static fonts referenced by URL in CSS                    | `public/fonts/`                                           |

## Class Utilities

- Use `cn()` from `@/lib/utils` to merge conditional classes
- Use `cva()` for reusable variant systems (uses `class-variance-authority`)

## Styling Rules

- Use Bootstrap utility classes for all styling - avoid custom CSS unless truly necessary
- **Never** use inline `style={}` when an equivalent Bootstrap utility exists
- Mobile-first responsive: `sm`, `md`, `lg`, `xl`, `xxl` breakpoints

## Theme Tokens

- Colors use DSAi design tokens (`--dsai-*` CSS variables)
- Use semantic token names (not raw hex/rgb values) in components

## Patterns

```tsx
// Conditional classes
<div className={cn("rounded border p-4", isError && "border-danger")} />

// Responsive
<div className="row g-4">
    <div className="col-12 col-md-6 col-lg-4">...</div>
</div>
```

// Dark mode

<div className="bg-background text-foreground dark:bg-zinc-950" />
```
