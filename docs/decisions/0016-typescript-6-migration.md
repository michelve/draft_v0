---
status: accepted
date: 2026-03-29
---

# Migrate to TypeScript 6

## Context and Problem Statement

TypeScript 6.0 is the transition release between the JavaScript-based TypeScript 5.x compiler and the upcoming TypeScript 7.0 Go-native port. Staying on TypeScript 5.9 means missing important default changes and deprecation warnings that prepare the codebase for TypeScript 7.0.

## Decision Drivers

- TypeScript 6.0 changes many defaults (`types`, `rootDir`, `strict`, `noUncheckedSideEffectImports`) to improve build performance and safety
- `baseUrl` is deprecated in favor of explicit `paths` entries without a lookup root
- `DOM.Iterable` is merged into `DOM` lib, simplifying configuration
- TypeScript 6 is the required bridge to adopt TypeScript 7 (Go-native) when it releases
- `noUncheckedSideEffectImports` defaulting to `true` catches unresolved side-effect imports

## Considered Options

- Stay on TypeScript 5.9 — no changes, delays eventual TS 7 migration
- Upgrade to TypeScript 6 and fix all deprecation warnings
- Upgrade to TypeScript 6 with `ignoreDeprecations: "6.0"` — defers cleanup

## Decision Outcome

Chosen option: "Upgrade to TypeScript 6 and fix all deprecation warnings", because it prepares the codebase for TypeScript 7.0 without technical debt and aligns defaults with modern best practices.

### Changes Made

- **`typescript`**: 5.9.3 → 6.0.2
- **Both tsconfigs**: Added `"types": ["node"]` (TS 6 defaults `types` to `[]`)
- **Both tsconfigs**: Removed deprecated `"baseUrl": "."` (paths already use `./` prefix, so behavior unchanged)
- **`tsconfig.json`**: Removed `"DOM.Iterable"` from `lib` (now included in `"DOM"`)
- **`src/client/vite-env.d.ts`**: Created with `/// <reference types="vite/client" />` to satisfy `noUncheckedSideEffectImports` for CSS imports

### Confirmation

- `pnpm typecheck` — zero errors on both tsconfig projects
- `pnpm build` — 162 modules transformed successfully
- Dev server starts and serves correctly

## Consequences

- Good, because the codebase has zero deprecation warnings and is ready for TypeScript 7.0
- Good, because `noUncheckedSideEffectImports: true` catches typos in side-effect imports
- Good, because removing `baseUrl` prevents accidental module resolution via root lookup
- Neutral, because `typescript-eslint@8.57.2` has a peer dep warning (`<6.0.0`) until their next release ships TS 6 support (PR already merged)
- Bad, because some downstream tools (eslint) may not formally support TS 6 yet, causing peer dep warnings
