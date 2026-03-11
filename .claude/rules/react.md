---
description: "React 19 component conventions and TanStack patterns for src/client/**"
---

# React 19 + TanStack Conventions

## Components

- Functional components with **named exports** only (no default exports)
- No `forwardRef` - use `ref` as a regular prop
- No `propTypes`, no `React.FC`, no `React.memo` (unless measured bottleneck)
- Structure: types/interfaces → component function → exports
- Max 300 lines per component, max 5 nesting levels

## Loading States

- Use `React.lazy()` + `<Suspense fallback={...}>` for code splitting
- Use LoadingOverlay or SuspenseLoader components for loading UI
- **Never** early-return a spinner before the main render

## Hooks

- Prefix custom hooks with `use`
- Extract reusable hooks to `src/client/hooks/`
- Call hooks at the top level only (enforced by Biome)

## TanStack Router

- File-based routing in `src/client/routes/`
- Use `createFileRoute("/path")` - export as `Route`
- Root layout via `createRootRoute()` in `__root.tsx`
- Route tree is auto-generated (`routeTree.gen.ts` - never edit)

## TanStack Query

- Use `useQuery()` for reads, `useMutation()` for writes
- Query keys: `[entityName, params]` array format (e.g., `["users", { id }]`)
- Invalidate after mutations: `queryClient.invalidateQueries({ queryKey: ["users"] })`
- QueryClient config: 1-min staleTime, 1 retry (already set in `lib/query-client.ts`)
- **Never** use `useState` + `useEffect` for server data - use TanStack Query

## Event Handlers

- Name as `handleX` (e.g., `handleSubmit`, `handleClick`)
- Inline only if single expression; extract to named function otherwise
