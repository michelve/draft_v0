---
name: prisma
description: Prisma ORM patterns including Prisma Client usage, queries, mutations, relations, transactions, and schema management. Use when working with Prisma database operations or schema definitions.
---

# Prisma ORM Patterns

## Purpose

Complete patterns for using Prisma ORM effectively, including query optimization, transaction handling, and the repository pattern for clean data access.

## When to Use This Skill

- Working with Prisma Client for database queries
- Creating repositories for data access
- Using transactions
- Query optimization and N+1 prevention
- Handling Prisma errors

---

## Basic Prisma Usage

### Core Query Patterns

```typescript
import { prisma } from "@server/lib/prisma";

// Find one
const user = await prisma.user.findUnique({
    where: { id: userId },
});

// Find many with filters
const users = await prisma.user.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 10,
});

// Create
const newUser = await prisma.user.create({
    data: {
        email: "user@example.com",
        name: "John Doe",
    },
});

// Update
const updated = await prisma.user.update({
    where: { id: userId },
    data: { name: "Jane Doe" },
});

// Delete
await prisma.user.delete({
    where: { id: userId },
});
```

### Complex Filtering

```typescript
// Multiple conditions
const users = await prisma.user.findMany({
    where: {
        email: { contains: "@example.com" },
        isActive: true,
        createdAt: { gte: new Date("2024-01-01") },
    },
});

// AND/OR conditions
const posts = await prisma.post.findMany({
    where: {
        AND: [{ published: true }, { author: { isActive: true } }],
        OR: [{ title: { contains: "prisma" } }, { content: { contains: "prisma" } }],
    },
});
```

---

## Repository Pattern

### When to Use Repositories

✅ **Use repositories when:**

- Complex queries with joins/includes
- Query used in multiple places
- Need to mock for testing

❌ **Skip repositories for:**

- Simple one-off queries
- Prototyping

### Repository Template

```typescript
import { prisma } from "@server/lib/prisma";
import type { User, Prisma } from "@prisma/client";

export class UserRepository {
    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
            include: { profile: true },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async findActive(): Promise<User[]> {
        return prisma.user.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return prisma.user.create({ data });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return prisma.user.update({ where: { id }, data });
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }
}
```

### Using in Service

```typescript
export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}
```

---

## Transaction Patterns

### Simple Transaction

```typescript
const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
        data: { email: "user@example.com", name: "John" },
    });

    const profile = await tx.userProfile.create({
        data: { userId: user.id, bio: "Developer" },
    });

    return { user, profile };
});
```

### Interactive Transaction

```typescript
const result = await prisma.$transaction(
    async (tx) => {
        const user = await tx.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");

        const updated = await tx.user.update({
            where: { id: userId },
            data: { lastLogin: new Date() },
        });

        await tx.auditLog.create({
            data: { userId, action: "LOGIN", timestamp: new Date() },
        });

        return updated;
    },
    {
        maxWait: 5000, // Wait max 5s to start
        timeout: 10000, // Timeout after 10s
    },
);
```

---

## Query Optimization

### Use select to Limit Fields

```typescript
// ❌ Fetches all fields
const users = await prisma.user.findMany();

// ✅ Only fetch needed fields
const users = await prisma.user.findMany({
    select: {
        id: true,
        email: true,
        name: true,
    },
});

// ✅ Select with relations
const users = await prisma.user.findMany({
    select: {
        id: true,
        email: true,
        profile: {
            select: { firstName: true, lastName: true },
        },
    },
});
```

### Use include Carefully

```typescript
// ❌ Excessive includes
const user = await prisma.user.findUnique({
    where: { id },
    include: {
        posts: { include: { comments: true } },
        workflows: { include: { steps: { include: { actions: true } } } },
    },
});

// ✅ Only include what you need
const user = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
});
```

---

## N+1 Query Prevention

### Problem

```typescript
// ❌ N+1 Query Problem
const users = await prisma.user.findMany(); // 1 query

for (const user of users) {
    // N additional queries
    const profile = await prisma.userProfile.findUnique({
        where: { userId: user.id },
    });
}
```

### Solution 1: Use include

```typescript
// ✅ Single query with include
const users = await prisma.user.findMany({
    include: { profile: true },
});

for (const user of users) {
    console.log(user.profile.bio);
}
```

### Solution 2: Batch Query

```typescript
// ✅ Batch query
const users = await prisma.user.findMany();
const userIds = users.map((u) => u.id);

const profiles = await prisma.userProfile.findMany({
    where: { userId: { in: userIds } },
});

const profileMap = new Map(profiles.map((p) => [p.userId, p]));
```

---

## Relations

### One-to-Many

```typescript
// Get user with posts
const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
        posts: {
            where: { published: true },
            orderBy: { createdAt: "desc" },
            take: 10,
        },
    },
});
```

### Nested Writes

```typescript
// Create user with profile
const user = await prisma.user.create({
    data: {
        email: "user@example.com",
        name: "John Doe",
        profile: {
            create: {
                bio: "Developer",
                avatar: "avatar.jpg",
            },
        },
    },
    include: { profile: true },
});

// Update with nested updates
const user = await prisma.user.update({
    where: { id: userId },
    data: {
        name: "Jane Doe",
        profile: {
            update: { bio: "Senior developer" },
        },
    },
});
```

---

## Error Handling

### Prisma Error Codes

```typescript
import { Prisma } from "@prisma/client";

try {
    await prisma.user.create({
        data: { email: "user@example.com" },
    });
} catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002: Unique constraint violation
        if (error.code === "P2002") {
            throw new ConflictError("Email already exists");
        }

        // P2003: Foreign key constraint failed
        if (error.code === "P2003") {
            throw new ValidationError("Invalid reference");
        }

        // P2025: Record not found
        if (error.code === "P2025") {
            throw new NotFoundError("Record not found");
        }
    }

    console.error(error);
    throw error;
}
```

### Common Error Codes

| Code  | Meaning                       |
| ----- | ----------------------------- |
| P2002 | Unique constraint violation   |
| P2003 | Foreign key constraint failed |
| P2025 | Record not found              |
| P2014 | Relation violation            |

---

## Advanced Patterns

### Aggregations

```typescript
// Count
const count = await prisma.user.count({
    where: { isActive: true },
});

// Aggregate
const stats = await prisma.post.aggregate({
    _count: true,
    _avg: { views: true },
    _sum: { likes: true },
    where: { published: true },
});

// Group by
const postsByAuthor = await prisma.post.groupBy({
    by: ["authorId"],
    _count: { id: true },
});
```

### Upsert

```typescript
// Update if exists, create if not
const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: { lastLogin: new Date() },
    create: {
        email: "user@example.com",
        name: "John Doe",
    },
});
```

---

## TypeScript Patterns

```typescript
import type { User, Prisma } from "@prisma/client";

// Create input type
const createUser = async (data: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({ data });
};

// Include type
type UserWithProfile = Prisma.UserGetPayload<{
    include: { profile: true };
}>;

const user: UserWithProfile = await prisma.user.findUnique({
    where: { id },
    include: { profile: true },
});
```

---

## Best Practices

1. **Use the Singleton Client** - Import `prisma` from `@server/lib/prisma`, never create new instances
2. **Use Repositories for Complex Queries** - Keep data access organized
3. **Select Only Needed Fields** - Improve performance with select
4. **Prevent N+1 Queries** - Use include or batch queries
5. **Use Transactions** - Ensure atomicity for multi-step operations
6. **Handle Errors** - Check for specific Prisma error codes

---

**Related Skills:**

- **nodejs** - Core Node.js patterns and async handling
- **route-tester** - API route testing patterns
