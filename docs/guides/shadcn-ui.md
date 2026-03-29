# DSAi Components Guide

Draft v0 uses the DSAi Design System - a collection of accessible, composable components that live in your project as source code.

## How It Works

DSAi components live in `src/client/components/ui/` as source files. They use Bootstrap 5.3 utility classes, DSAi design tokens (`--dsai-*` CSS variables), and `cn()` for class merging.

## Imports

Import components using the `@/` path alias:

```tsx
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
```

## The Golden Rule - Never Edit `ui/`

Files in `src/client/components/ui/` must never be modified directly.

If you need project-specific defaults or behaviour, create a wrapper in `src/client/components/`:

```tsx
// src/client/components/app-button.tsx
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps extends ButtonProps {
    loading?: boolean;
}

export function AppButton({ loading, disabled, children, className, ...props }: AppButtonProps) {
    return (
        <Button {...props} disabled={loading || disabled} className={cn(className)}>
            {loading ? <Spinner /> : children}
        </Button>
    );
}
```

## Class Merging with `cn()`

Use `cn()` from `@/lib/utils` for all conditional class logic:

```tsx
import { cn } from "@/lib/utils";

// Conditional classes
<div className={cn("rounded border p-4", isError && "border-danger")} />

// Variant overrides
<Card className={cn("shadow-sm", isPrimary && "border-primary")} />
```

## Styling Rules

- Use DSAi design tokens (`--dsai-*` CSS variables) for colors, spacing, and typography
- Use Bootstrap utility classes for layout and responsive design
- Use `cn()` for conditional class merging
- **Never** use inline `style={}` when a Bootstrap utility or DSAi token exists
- **No `"use client"`** - this project is a Vite SPA, never add the directive

## Common Patterns

### Toasts

Use `sonner` via the `toast()` function:

```tsx
import { toast } from "sonner";

toast.success("User created");
toast.error("Something went wrong");
```

## Available Components

| Component    | Path                                      |
| ------------ | ----------------------------------------- |
| `button`     | `src/client/components/ui/button.tsx`     |
| `typography` | `src/client/components/ui/typography.tsx` |
