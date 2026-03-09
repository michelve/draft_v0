---
name: accessibility
description: Implements WCAG 2.1 AA accessibility for draft_v0 components. Use when ensuring keyboard navigation, screen reader support, focus management, ARIA attributes, or color contrast compliance in React 19 components built with shadcn/ui and Tailwind CSS v4.
---

# Accessibility

Implement WCAG 2.1 AA compliant accessibility in React 19 components using the draft_v0 stack (shadcn/ui, Tailwind CSS v4, `radix-ui` flat package).

## When to Use

- Building interactive components
- Implementing keyboard navigation
- Adding ARIA attributes
- Managing focus states
- Ensuring color contrast compliance
- Supporting screen readers

## Accessibility Utilities in This Project

| Tool / Pattern   | How to Use                                                              | Notes                                                                   |
| ---------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `FocusScope`     | `import { FocusScope } from 'radix-ui'`                                 | Focus trapping for modals/dialogs. `radix-ui` v1.4.3 already installed. |
| `sr-only`        | Tailwind built-in class: `className="sr-only"`                          | Visually hidden, screen-reader visible text.                            |
| `focus-visible:` | Tailwind variant: `focus-visible:ring-[3px] focus-visible:ring-ring/50` | Focus ring on keyboard interaction only.                                |
| `motion-reduce:` | Tailwind variant: `motion-reduce:transition-none`                       | Respects user's reduced-motion preference.                              |
| `aria-*:`        | Tailwind variant: `aria-invalid:border-destructive`                     | Style elements based on ARIA state.                                     |
| Custom hooks     | `src/client/hooks/` (`@/hooks`)                                         | Project-specific hooks (e.g., `useKeyPress`, `useReducedMotion`).       |

## shadcn/Radix Built-in Accessibility

**shadcn/ui components are accessible by default** — they are built on Radix UI primitives that handle ARIA roles, keyboard navigation, and focus management automatically. Do not re-implement what these components already provide:

| Component      | What Radix handles                                                                                 |
| -------------- | -------------------------------------------------------------------------------------------------- |
| `Dialog`       | `role="dialog"`, `aria-modal`, focus trap (`FocusScope`), `Escape` to close, return focus on close |
| `DropdownMenu` | `role="menu"` / `menuitem`, roving tabindex, `Arrow` keys, `Escape` to close                       |
| `Select`       | `role="listbox"` / `option`, `Arrow` keys, type-ahead search                                       |
| `Tabs`         | `role="tablist"` / `tab` / `tabpanel`, `Arrow Left/Right` navigation                               |
| `Checkbox`     | `role="checkbox"`, `Space` to toggle, `aria-checked`                                               |
| `AlertDialog`  | `role="alertdialog"`, focus trap, prevents accidental close                                        |

Install via: `npx shadcn@latest add dialog dropdown-menu select tabs` — components appear in `src/client/components/ui/` and must never be modified directly.

## Keyboard Navigation

### Required Keys by Component Type

| Component     | Keys                                                              |
| ------------- | ----------------------------------------------------------------- |
| Button        | `Enter`, `Space` to activate                                      |
| Link          | `Enter` to navigate                                               |
| Menu/Dropdown | `Arrow Up/Down` to navigate, `Enter` to select, `Escape` to close |
| Tabs          | `Arrow Left/Right` to switch, `Home/End` for first/last           |
| Modal         | `Tab` to cycle focus, `Escape` to close                           |
| Checkbox      | `Space` to toggle                                                 |
| Radio         | `Arrow Up/Down` to change selection                               |

### useKeyPress Hook

Create this hook at `src/client/hooks/useKeyPress.ts` (`@/hooks/useKeyPress`):

```ts
// src/client/hooks/useKeyPress.ts
import { useEffect } from "react";

export function useKeyPress(keys: string[], handler: (e: KeyboardEvent) => void) {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (keys.includes(e.key)) {
                handler(e);
            }
        };
        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
    }, [keys, handler]);
}
```

Usage example:

```tsx
import { useKeyPress } from "@/hooks/useKeyPress";

function SearchModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Cmd+K or Ctrl+K to open search
    useKeyPress(["k"], (e) => {
        if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            setIsOpen(true);
        }
    });

    // Escape to close
    useKeyPress(["Escape"], () => setIsOpen(false));

    return isOpen ? <SearchDialog onClose={() => setIsOpen(false)} /> : null;
}
```

### Inline Arrow Key Navigation

For single-use keyboard handlers, use an inline `onKeyDown` — no utility import needed:

```tsx
// Vertical navigation (menus, lists)
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
        e.preventDefault();
        focusPreviousItem();
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        focusNextItem();
    } else if (e.key === "Escape") {
        onClose?.();
    } else if (e.key === "Enter") {
        onActivate?.();
    }
};

// Horizontal navigation (tabs, toolbars)
const handleHorizontal = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") selectPrevious();
    if (e.key === "ArrowRight") selectNext();
};
```

> **Note:** For complex components (menus, comboboxes, data grids), use the shadcn
> `DropdownMenu`, `Select`, or `Combobox` components instead — they handle roving
> tabindex and arrow key navigation automatically via Radix primitives.

## ARIA Attributes

### Interactive Elements

```tsx
// Button with state
<button
  aria-expanded={isOpen}
  aria-controls="menu-id"
  aria-haspopup="menu"
>
  Menu
</button>

// Menu
<ul
  id="menu-id"
  role="menu"
  aria-labelledby="button-id"
>
  <li role="menuitem" tabIndex={-1}>Option 1</li>
  <li role="menuitem" tabIndex={-1}>Option 2</li>
</ul>
```

### Form Elements

```tsx
// Input with error
<div>
    <label id="email-label" htmlFor="email">
        Email
    </label>
    <input
        id="email"
        type="email"
        aria-labelledby="email-label"
        aria-describedby="email-error"
        aria-invalid={hasError}
    />
    {hasError && (
        <span id="email-error" role="alert">
            Please enter a valid email
        </span>
    )}
</div>
```

### Live Regions

```tsx
// Announce dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## Focus Management

### FocusScope (Radix UI)

The `FocusScope` component from `radix-ui` is the standard way to trap focus in modals and
dialogs. It is already installed (`radix-ui` v1.4.3) — no install required.

```tsx
import { FocusScope } from "radix-ui";

function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <FocusScope loop trapped asChild>
            <div role="dialog" aria-modal="true" onKeyDown={(e) => e.key === "Escape" && onClose()}>
                {children}
            </div>
        </FocusScope>
    );
}
```

**Props:**

| Prop                 | Type          | Description                                                              |
| -------------------- | ------------- | ------------------------------------------------------------------------ |
| `trapped`            | `boolean`     | Prevent focus leaving the container                                      |
| `loop`               | `boolean`     | Tab/Shift+Tab cycles within the container                                |
| `asChild`            | `boolean`     | Merge props onto the child element instead of creating a wrapper `<div>` |
| `onMountAutoFocus`   | `(e) => void` | Override the default auto-focus target                                   |
| `onUnmountAutoFocus` | `(e) => void` | Override where focus returns on unmount                                  |

> **Prefer shadcn `Dialog`** over a manual `FocusScope` whenever possible — the
> shadcn `Dialog` component wraps `FocusScope` and also handles `aria-modal`,
> `role="dialog"`, Escape key dismissal, and return focus automatically.

### Return Focus Pattern

```tsx
function Modal({ open, onClose }) {
    const triggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (open) {
            triggerRef.current = document.activeElement as HTMLElement;
        } else {
            triggerRef.current?.focus();
        }
    }, [open]);
}
```

## Screen Reader Announcements

### Live Regions in JSX

Place live region containers in your layout so they persist between renders:

```tsx
// Polite announcements — screen reader finishes current sentence first
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Urgent announcements — interrupts screen reader immediately
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

> **Key rule:** The live region element must exist in the DOM _before_ the message
> is injected. Mounting and populating it at the same time often silences it.

## Reduced Motion

### useReducedMotion Hook

Create this hook at `src/client/hooks/useReducedMotion.ts` (`@/hooks/useReducedMotion`):

```ts
// src/client/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return prefersReducedMotion;
}
```

Usage:

```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion";

function AnimatedComponent() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <div
            style={{
                transition: prefersReducedMotion ? "none" : "transform 0.3s ease",
            }}
        >
            Content
        </div>
    );
}
```

### Tailwind Variant (preferred)

For most cases, use Tailwind's `motion-reduce:` variant directly on the element —
no hook required:

```tsx
<div className="transition-transform duration-300 motion-reduce:transition-none">
  Content
</div>

<div className="animate-spin motion-reduce:animate-none">
  <Spinner />
</div>
```

### CSS Alternative

For project-level CSS overrides, add to `src/client/custom.css`:

```css
@media (prefers-reduced-motion: reduce) {
    .animated {
        animation: none;
        transition: none;
    }
}
```

## Color Contrast

### Minimum Ratios (WCAG AA)

| Content            | Ratio |
| ------------------ | ----- |
| Normal text        | 4.5:1 |
| Large text (18pt+) | 3:1   |
| UI components      | 3:1   |

### Compliant Combinations (Project Design System)

Use Tailwind semantic class pairs that map to the oklch tokens in `src/client/index.css`:

```tsx
// Body text on page background (−16:1 contrast) ✔
<p className="text-foreground bg-background">...</p>

// Primary action buttons (verified against --primary oklch(0.205 0 0)) ✔
<Button className="bg-primary text-primary-foreground">Action</Button>

// Destructive / error state ✔
<span className="bg-destructive text-destructive-foreground">Error</span>

// Secondary / muted surfaces ✔
<div className="bg-secondary text-secondary-foreground">...</div>

// Avoid — muted-foreground on white is borderline and fails for small text
<span className="text-muted-foreground">Caption</span> {/* verify at your font size */}
```

> Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to
> verify oklch values from `src/client/index.css` when adding new color combinations.

## Visible Focus

This project uses Tailwind's `focus-visible:` variant. The pattern is already established
in `src/client/components/ui/button.tsx` — follow it:

```tsx
// ✔ Correct — Tailwind focus-visible utilities (matches project button pattern)
<button className="focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]">
    Click me
</button>;

// For custom interactive elements, add focus-visible: classes via cn()
import { cn } from "@/lib/utils";

<div
    role="button"
    tabIndex={0}
    className={cn(
        "rounded-md px-4 py-2",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
    )}
/>;
```

> Never use `focus:` alone for ring styles — `focus-visible:` only shows the ring
> on keyboard interaction, not on mouse click (better UX).
> Never override with raw CSS — always use Tailwind utilities so the `--ring` token
> from the design system applies consistently.

## Screen Reader Only Text

Tailwind provides a built-in `sr-only` utility — no custom CSS required:

```tsx
<button>
  <Icon name="close" />
  <span className="sr-only">Close modal</span>
</button>

// To reverse sr-only (make visible again):
<span className="not-sr-only">Visible text</span>
```

The `sr-only` class hides content visually while keeping it accessible to screen readers.
Use it for icon-only buttons, decorative separators with labels, and skip links.

## Testing Accessibility

### Browser DevTools (zero setup)

- **Chrome DevTools** → Elements panel → Accessibility tab: inspect the a11y tree, roles, and properties for any element
- **axe DevTools** browser extension (free tier): full page audit with issue explanations
- **WAVE** browser extension: visual overlay of a11y issues

### Playwright + @axe-core/playwright (e2e — recommended)

Playwright is already configured in this project. Add `@axe-core/playwright` as an optional dev dependency for automated audits:

```bash
npm install -D @axe-core/playwright
```

```ts
// e2e/a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home page has no accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
});

// Scope to a specific component
test("modal is accessible", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open" }).click();
    const results = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
    expect(results.violations).toEqual([]);
});
```

### Vitest + vitest-axe (unit tests — optional)

For component-level a11y checks, install `vitest-axe` if needed:

```bash
npm install -D vitest-axe
```

```ts
import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';

test('component has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  expect(await axe(container)).toHaveNoViolations();
});
```

## Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus visible on all focusable elements
- [ ] ARIA roles and attributes correct
- [ ] Color contrast meets 4.5:1 for text
- [ ] Form inputs have associated labels
- [ ] Error messages announced to screen readers
- [ ] Modal traps focus and returns on close
- [ ] No content relies on color alone
