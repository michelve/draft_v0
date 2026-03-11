---
status: accepted
date: 2026-03-07
---

# Layered Backend Architecture

## Context and Problem Statement

The Express backend needs a clear separation of concerns to keep business logic testable, prevent route handlers from becoming monolithic, and make it easy to add new API resources without ambiguity about where code belongs.

How should we structure the backend to balance separation of concerns with development speed?

## Considered Options

- Flat handlers - all logic in route files
- Controller + Service - two layers
- Route → Controller → Service → Repository - four layers with clear boundaries

## Decision Outcome

Chosen option: "Route → Controller → Service → Repository", because it provides the clearest separation of concerns and makes each layer independently testable.

- **Routes** (`src/server/routes/`) - HTTP method + path only, delegates to controller
- **Controllers** (`src/server/controllers/`) - Parse request, call service, format response, handle HTTP errors
- **Services** (`src/server/services/`) - Business logic, custom error classes, never touches `req`/`res`
- **Repositories** (`src/server/repositories/`) - Prisma queries only, no business logic

The `User` resource serves as the reference implementation for all future resources.

### Consequences

- Good, because each layer is independently testable (mock the layer below)
- Good, because adding a new resource is mechanical - copy the User pattern
- Good, because business logic in services is framework-agnostic (could swap Express for Fastify)
- Good, because error handling is centralized in controllers
- Bad, because more files per resource (4 files vs 1 for flat handlers)
- Bad, because simple CRUD operations feel over-engineered at this scale
- Neutral, because custom error classes (e.g., `UserNotFoundError`) replace null returns from the service layer
- Neutral, because Prisma error codes (P2002, P2025) are caught exclusively in the controller layer

## Pros and Cons of the Options

### Flat handlers

- Good, because minimal boilerplate - one file per resource
- Bad, because logic becomes monolithic as features grow
- Bad, because business logic is tightly coupled to Express `req`/`res`

### Controller + Service

- Good, because separates HTTP concerns from business logic
- Bad, because services often mix data access with business logic
- Neutral, because common in Express tutorials but lacks a clear data access boundary
