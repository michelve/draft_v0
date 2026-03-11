---
description: "Express API route conventions and error handling for src/server/**"
---

# Express API Conventions

## Route Structure

- All routes under `/api` prefix
- Use `express.Router()` in `src/server/routes/`
- Mount routers in `src/server/index.ts`
- Layered architecture: route handler → service → repository (Prisma)

## Request Handling

- Parse JSON body via `express.json()` (already configured)
- Validate input with Zod schemas before processing
- Use async/await - wrap handlers in try/catch

## Response Format

```ts
// Success
res.status(200).json({ data: result });
res.status(201).json({ data: created });

// Error
res.status(400).json({ error: "Bad Request", message: "Details here" });
res.status(404).json({ error: "Not Found", message: "Resource not found" });
res.status(500).json({ error: "Internal Server Error" });
```

## Status Codes

- `200` - OK (read, update)
- `201` - Created (new resource)
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Internal Server Error

## Error Handling

- Catch all errors in route handlers - never let exceptions crash the server
- **Never** expose internal error details (stack traces, SQL, Prisma internals) in responses
- Log errors server-side with `console.error`
- Return generic message to client with appropriate status code

## Environment

- Port: `process.env.PORT` with fallback to `3001`
- CORS enabled via `cors()` middleware
