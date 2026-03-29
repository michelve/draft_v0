---
applyTo: "src/**"
description: "TypeScript types, interfaces, and utility conventions"
---

# Types & Utilities

## TypeScript Conventions

- **Strict mode** - no `any` unless absolutely unavoidable (add an inline comment explaining why)
- Prefer `type` for unions, intersections, mapped types, and aliases
- Prefer `interface` for object shapes that may be extended (component props, API response shapes)
- Use `import type` for type-only imports - keeps runtime bundle clean
- Infer from Zod schemas rather than redeclaring: `type MyForm = z.infer<typeof mySchema>`
- Infer from Prisma rather than redeclaring: `import type { User } from "@prisma/client"`

## Where to Put Types

| Type                                           | Location                                                      |
| ---------------------------------------------- | ------------------------------------------------------------- |
| Component props                                | Co-located at the top of the component file                   |
| Shared client types used across multiple files | `src/client/types/` (create if needed, one file per domain)   |
| Server request/response shapes                 | Co-located in the controller or a `src/server/types/` file    |
| Zod-inferred form types                        | Co-located with the schema (same file or same feature folder) |
| Prisma model types                             | Import directly from `@prisma/client` - do not redeclare      |

## Utility Functions (`src/client/lib/`)

### Existing utilities - use these, do not recreate

| Export          | File                             | Purpose                                                    |
| --------------- | -------------------------------- | ---------------------------------------------------------- |
| `cn(...inputs)` | `src/client/lib/utils.ts`        | Merge CSS classes (clsx + class merging)                   |
| `queryClient`   | `src/client/lib/query-client.ts` | Singleton TanStack Query client (1-min staleTime, 1 retry) |

### Adding new utilities

- Add to `src/client/lib/utils.ts` if it's a small, general-purpose helper
- Create a new file in `src/client/lib/` only when the helper is domain-specific or large enough to warrant its own module (e.g., `src/client/lib/date.ts`)
- **Named exports only** - no default exports
- No side effects in utility files
- Do not add utilities for one-off operations; only extract when used in 2+ places

## Naming Conventions

| Kind                    | Convention            | Example                           |
| ----------------------- | --------------------- | --------------------------------- |
| Types / Interfaces      | PascalCase            | `UserProfile`, `ApiResponse<T>`   |
| Type aliases            | PascalCase            | `SortDirection = 'asc' \| 'desc'` |
| Utility functions       | camelCase             | `formatDate`, `cn`                |
| Constants               | UPPER_SNAKE_CASE      | `MAX_PAGE_SIZE`                   |
| Enum-like const objects | UPPER_SNAKE_CASE keys | `{ ASC: 'asc', DESC: 'desc' }`    |

## Path Aliases

- `@/*` → `src/client/*` - use for all cross-module imports within the client
- `@server/*` → `src/server/*` - use for server-side cross-module imports
- Never use relative `../../../` paths that cross feature or layer boundaries

## Generic Patterns

```ts
// API response wrapper - use for typed fetch helpers
type ApiResponse<T> = {
    data: T;
};

// Paginated response - matches server pagination meta shape
type PaginatedResponse<T> = {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

// Nullable vs optional - be explicit
type WithId<T> = T & { id: string }; // extend, don't duplicate
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
```
