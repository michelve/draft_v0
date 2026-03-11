# shadcn/ui Guide

Draft v0 uses [shadcn/ui](https://ui.shadcn.com/) - a collection of accessible, composable components installed directly as source code into your project.

## How It Works

shadcn/ui is **not a package you import from npm**. Components are copied into your codebase via the CLI, live at `src/client/components/ui/`, and are yours to own. The CLI handles installation, dependency wiring, and style injection.

## Project Configuration

This project's shadcn config is in `components.json`:

| Field             | Value                                        |
| ----------------- | -------------------------------------------- |
| `style`           | `new-york`                                   |
| `rsc`             | `false` - Vite SPA, never add `"use client"` |
| `tailwindVersion` | `v4` - CSS-first via `@theme inline`         |
| `tailwindCssFile` | `src/client/index.css`                       |
| `base`            | `radix` - flat `radix-ui` package            |
| `iconLibrary`     | `lucide` - import from `lucide-react`        |
| `ui alias`        | `@/components/ui`                            |
| `utils alias`     | `@/lib/utils`                                |
| `packageManager`  | `pnpm`                                       |

## Installing Components

Always use `pnpm dlx shadcn@latest` as the CLI runner:

```bash
# Add one or more components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog card table

# Preview what a component adds before installing
pnpm dlx shadcn@latest add button --dry-run
pnpm dlx shadcn@latest add button --diff
```

Components are installed to `src/client/components/ui/`. Import them using the `@/` alias:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
```

## The Golden Rule - Never Edit `ui/`

Files in `src/client/components/ui/` are managed by shadcn and may be updated by the CLI. **Never modify them directly.**

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

Use `cn()` from `@/lib/utils` for all conditional class logic. It combines `clsx` and `tailwind-merge` to avoid class conflicts:

```tsx
import { cn } from "@/lib/utils";

// Conditional classes
<div className={cn("rounded-lg border p-4", isError && "border-destructive bg-red-50")} />

// Variant overrides
<Card className={cn("shadow-sm", isPrimary && "border-primary")} />
```

Never use raw template literals for conditional Tailwind classes - they don't merge correctly.

## Styling Rules

- **Use semantic color tokens**, not raw Tailwind colors: `bg-primary`, `text-muted-foreground`, `border-destructive`
- **Use `size-*`** when width and height are equal: `size-10` not `w-10 h-10`
- **Use `gap-*`** for spacing, not `space-x-*` / `space-y-*`
- **No manual `z-index`** on overlay components - Dialog, Sheet, Popover manage their own stacking
- **No `"use client"`** - this project is a Vite SPA (`rsc: false`), never add the directive

## Common Patterns

### Forms

Use `FieldGroup` and `Field` for form layout - never raw `div` with `space-y-*`:

```tsx
<FieldGroup>
    <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" />
    </Field>
    <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" />
    </Field>
</FieldGroup>
```

For validation:

```tsx
<Field data-invalid>
    <FieldLabel>Email</FieldLabel>
    <Input aria-invalid />
    <FieldDescription>Please enter a valid email address.</FieldDescription>
</Field>
```

### Icons in Buttons

Use `data-icon` - never add sizing classes to icons inside components:

```tsx
import { SearchIcon } from "lucide-react";

// Correct
<Button>
    <SearchIcon data-icon="inline-start" />
    Search
</Button>

// Wrong - no size classes on icons inside components
<Button>
    <SearchIcon className="size-4 mr-2" />
    Search
</Button>
```

### Dialogs

Always include a `DialogTitle` (use `className="sr-only"` if visually hidden):

```tsx
<Dialog>
    <DialogTrigger asChild>
        <Button>Open</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogTitle>Confirm Action</DialogTitle>
        <p>Are you sure?</p>
    </DialogContent>
</Dialog>
```

### Toasts

Use `sonner` via the `toast()` function:

```tsx
import { toast } from "sonner";

toast.success("User created");
toast.error("Something went wrong");
```

## Component Discovery

Find available components without leaving the terminal:

```bash
# Search for components by keyword
pnpm dlx shadcn@latest search table
pnpm dlx shadcn@latest search form

# Get documentation URLs for a component
pnpm dlx shadcn@latest docs button dialog

# View a component's source without installing
pnpm dlx shadcn@latest view sidebar
```

Alternatively, the **shadcn MCP server** is pre-configured in this project - use the `shadcn` skill in Copilot to browse and install components conversationally.

## Updating Components

When upgrading a component while keeping local customizations:

```bash
# 1. Preview what files would change
pnpm dlx shadcn@latest add button --dry-run

# 2. See the exact diff per file
pnpm dlx shadcn@latest add button --diff src/client/components/ui/button.tsx

# 3. Apply only if you've reviewed the diff
pnpm dlx shadcn@latest add button --overwrite
```

Never use `--overwrite` without reviewing the diff first if you have local changes in the file.

## Currently Installed Components

| Component | Path                                  |
| --------- | ------------------------------------- |
| `button`  | `src/client/components/ui/button.tsx` |

Add more as your project grows. Check what's installed anytime:

```bash
pnpm dlx shadcn@latest info
```

## MCP Server (AI-Assisted)

The shadcn MCP server is pre-configured in `.vscode/mcp.json` and `.claude/settings.json`. When using GitHub Copilot or Claude, the `shadcn` skill gives your AI assistant:

- Live project context (installed components, config)
- Component docs and examples on demand
- CLI command generation for your specific setup

Just ask: _"add a data table with sorting"_ or _"show me how to use the Combobox"_ - the skill handles the rest.
