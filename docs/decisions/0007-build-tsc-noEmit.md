---
status: accepted
date: 2026-03-07
---

# Build Uses tsc --noEmit Instead of tsc -b

## Context and Problem Statement

The original build script used `tsc -b` (project build mode), which compiles TypeScript and emits `.js` output files. This caused stray `.js` files alongside `.ts` sources, a TanStack Router conflict (emitted `index.js` conflicted with `index.tsx`), and redundancy since Vite already handles transpilation.

Should the build script use `tsc` for compilation or only for type checking?

## Decision Drivers

- 7+ stray `.js` files appeared in `src/client/` and root
- TanStack Router threw "Found route at both" error due to `index.js` / `index.tsx` conflict
- Vite already handles transpilation - `tsc` output is redundant

## Considered Options

- Keep `tsc -b` and add `.js` files to `.gitignore`
- Switch to `tsc --noEmit` (type-check only, Vite handles the build)

## Decision Outcome

Chosen option: "Switch to `tsc --noEmit`", because it eliminates the root cause of stray files and the TanStack Router conflict rather than working around them.

Changed the build script from:

```json
"build": "tsc -b && vite build"
```

To:

```json
"build": "tsc --noEmit && tsc --noEmit -p tsconfig.node.json && vite build"
```

This runs TypeScript as a **type checker only** (no file emission) for both configs, then lets Vite handle the actual build.

Also added `!**/*.gen.js` to Biome's file exclusions to prevent future conflicts with generated files.

### Consequences

- Good, because no stray `.js` files polluting the source tree
- Good, because TanStack Router route conflicts eliminated
- Good, because clear separation of concerns: TypeScript checks types, Vite builds the bundle
- Good, because both `tsconfig.json` (client) and `tsconfig.node.json` (server/build) are type-checked
- Bad, because two `tsc` invocations instead of one (negligible performance impact)
- Bad, because developers must understand that `tsc` is only used for type checking, not compilation
- Neutral, because `pnpm typecheck` script already used `tsc --noEmit` - this just aligns the build script
- Neutral, because `.gitignore` should already exclude `*.js` in `src/` but the root cause is now fixed

## More Information

The stray files that were cleaned up:

- `src/client/routes/index.js`
- `src/client/routes/__root.js`
- `src/client/lib/utils.js`
- `src/client/lib/query-client.js`
- `src/client/main.js`
- `src/client/routeTree.gen.js`
- `vite.config.js`
