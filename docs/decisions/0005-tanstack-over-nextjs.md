---
status: accepted
date: 2026-03-07
---

# TanStack Router + Query Over Next.js

## Context and Problem Statement

The project needs a routing and data-fetching solution for the React frontend. The backend is a separate Express API (layered architecture), so the frontend is a pure SPA - no server-side rendering or React Server Components required.

Which routing and data-fetching approach should we use?

## Decision Drivers

- Backend is a separate Express API - no SSR/RSC needed
- Type safety for route params and search params is important
- Need caching, deduplication, and background refetching for server state

## Considered Options

- Next.js - full-framework with App Router, RSC, file-based routing, built-in data fetching
- TanStack Router + TanStack Query - type-safe routing + dedicated data-fetching library, SPA-focused
- React Router + TanStack Query - established routing + dedicated data-fetching
- Remix - full-stack framework with loader/action pattern

## Decision Outcome

Chosen option: "TanStack Router + TanStack Query", because it provides full type safety for an SPA architecture without the complexity of SSR/RSC, and pairs a dedicated data-fetching library with a type-safe router.

- **TanStack Router**: File-based routing in `src/client/routes/`, type-safe route params, auto-generated route tree (`routeTree.gen.ts`)
- **TanStack Query**: `useQuery()` for reads, `useMutation()` for writes, query key-based cache invalidation, 1-min staleTime, 1 retry
- **Vite**: Fast build tool, HMR, no SSR complexity
- **Architecture**: SPA that communicates with Express API via `/api` proxy

### Consequences

- Good, because full type safety for route params and search params (TanStack Router)
- Good, because dedicated data-fetching with caching, deduplication, and background refetching (TanStack Query)
- Good, because no RSC/SSR complexity - simple mental model, fast iteration
- Good, because Vite dev server is significantly faster than Next.js for SPA development
- Good, because clean separation: React handles UI, Express handles API, each can evolve independently
- Bad, because no SSR/SSG - initial page load requires JavaScript execution (acceptable for this project's use case)
- Bad, because TanStack Router is newer and has a smaller ecosystem than React Router or Next.js
- Bad, because must manage the API proxy configuration in Vite (`/api` → Express on :3001)
- Neutral, because file-based routing convention is similar to Next.js - easy mental model
- Neutral, because `routeTree.gen.ts` is auto-generated and must never be manually edited
- Neutral, because QueryClient is configured once in `src/client/lib/query-client.ts`
