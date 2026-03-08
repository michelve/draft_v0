---
status: accepted
date: 2026-03-08
---

# Use express-rate-limit for API rate limiting

## Context and Problem Statement

The API had no rate limiting, making it trivially easy to brute-force authentication endpoints, cause denial-of-service via high-volume requests, or enumerate database records. Rate limiting is a baseline security control required for any public-facing API (OWASP API Security Top 10 — API4: Unrestricted Resource Consumption).

## Considered Options

- `express-rate-limit` — the canonical Express rate-limiting library; in-process store, zero infra dependencies
- `rate-limiter-flexible` — more advanced (Redis support, sliding window), but requires infra setup for distributed deployments
- `nginx` / reverse-proxy rate limiting — correct at scale but requires infrastructure; not appropriate for a development-first project with a single Node.js process

## Decision Outcome

Chosen option: "express-rate-limit", because it requires no external infrastructure, is idiomatic Express middleware, and provides adequate protection for the current single-process deployment. Redis-backed limiting via `rate-limiter-flexible` or a proxy solution can replace it if the app moves to a multi-instance deployment.

### Consequences

- Good, because API abuse and brute-force attacks are rate-limited at the application layer.
- Good, because `RateLimit-*` headers (draft-8 standard) are exposed so clients can back off gracefully.
- Good, because zero additional infrastructure is needed in development or on a single-server deployment.
- Bad, because the default in-memory store is not shared across multiple Node.js processes — horizontal scaling will require switching to a Redis store.
- Neutral, because the current limits (200 req / 15 min globally) are intentionally permissive; endpoint-specific limits (e.g., stricter on future auth routes) should be added as those routes are introduced.
