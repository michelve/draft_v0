---
description: "Prisma ORM database patterns and error handling for src/server/** and prisma/**"
---

# Prisma ORM Conventions

## Client Setup

- Singleton PrismaClient in `src/server/lib/prisma.ts`
- Uses `globalThis` to prevent multiple instances during hot-reload
- Import: `import { prisma } from "@server/lib/prisma"`

## Schema

- Location: `prisma/schema.prisma`
- Provider: SQLite (default for development)
- Push schema changes: `pnpm db:push` (dev); proper migrations for production
- Generate client: `pnpm db:generate`

## Queries

- Use Prisma Client API — **never** raw SQL
- Use `include` for loading relations
- Use `select` to fetch only needed fields (prevents over-fetching)
- Use `import type` for Prisma-generated types: `import type { User } from "@prisma/client"`

## Error Handling

```ts
import { Prisma } from "@prisma/client";

try {
    const result = await prisma.user.create({ data });
    res.status(201).json({ data: result });
} catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            res.status(409).json({ error: "Conflict", message: "Already exists" });
            return;
        }
        if (error.code === "P2025") {
            res.status(404).json({ error: "Not Found" });
            return;
        }
    }
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
}
```

## Best Practices

- Always handle P2002 (unique constraint) and P2025 (record not found)
- Use transactions for multi-step operations: `prisma.$transaction([...])`
- Never expose Prisma error internals to clients
