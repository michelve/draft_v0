---
status: accepted
date: 2026-03-29
---

# Migrate to Vite 8 with Rolldown and Oxc

## Context and Problem Statement

The project uses Vite 6 for development and production builds. Vite 8 replaces the underlying bundler (Rollup → Rolldown) and JavaScript transformer/minifier (esbuild → Oxc), representing a significant shift in the build toolchain. Should we upgrade to Vite 8 and adopt the new Rolldown/Oxc pipeline?

## Decision Drivers

- Vite 6 will stop receiving security patches as Vite 8 becomes the active release
- Rolldown is significantly faster than Rollup for bundling
- Oxc is faster than esbuild for JavaScript transformation and minification
- Lightning CSS (now default for CSS minification) produces better output
- `@vitejs/plugin-react` v6 requires Vite 8 and drops Babel in favor of Oxc-native React Refresh

## Considered Options

- Stay on Vite 6
- Upgrade to Vite 7 (intermediate, still uses Rollup/esbuild)
- Upgrade directly to Vite 8 (Rolldown/Oxc)

## Decision Outcome

Chosen option: "Upgrade directly to Vite 8", because the project's Vite config is minimal (no custom `rollupOptions`, `esbuild` options, SSR config, or Babel plugins), making this a low-risk upgrade with substantial build performance improvements and long-term support benefits.

### Consequences

- Good, because production builds are faster (Rolldown + Oxc pipeline)
- Good, because CSS minification with Lightning CSS produces slightly smaller output
- Good, because `@vitejs/plugin-react` v6 removes Babel dependency entirely, reducing install size and build overhead
- Good, because the project stays on an actively maintained Vite version
- Neutral, because `build.rollupOptions` is deprecated in favor of `build.rolldownOptions` (we don't use either)
- Neutral, because `esbuild` remains as a transitive dependency (via `tsx` and `@tanstack/router-generator`)
- Bad, because CJS interop behavior changed slightly, which could surface as runtime issues with certain third-party packages

### Confirmation

- `pnpm typecheck` passes with zero errors on both tsconfig projects
- `pnpm build` completes successfully with Rolldown bundler output
- `pnpm dev` starts the Vite 8 dev server with HMR and React Fast Refresh working
- No peer dependency conflicts with existing plugins (`@tanstack/router-plugin`, `vitest`)

## More Information

- [Vite 8 Migration Guide (from v7)](https://vite.dev/guide/migration) — covers Rolldown, Oxc, and CJS interop changes
- [Vite 7 Migration Guide (from v6)](https://v7.vite.dev/guide/migration) — covers Node.js 18 drop, browser target update
- [@vitejs/plugin-react v6 Changelog](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/CHANGELOG.md) — Babel removal, Vite 8 requirement
- Versions: `vite` 6.4.1 → 8.0.3, `@vitejs/plugin-react` 4.7.0 → 6.0.1
