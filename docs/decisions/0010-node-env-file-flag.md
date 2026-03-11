---
status: accepted
date: 2026-03-08
---

# Node --env-file instead of dotenv package

## Context and Problem Statement

The Express dev server needs environment variables (e.g. `DATABASE_URL`, `FIGMA_API_KEY`, `PORT`) loaded from a `.env` file at startup. The conventional approach is to install `dotenv` and call `dotenv/config` at the top of the entry file. With Node.js 20+ this requires an extra runtime dependency. How should we load `.env` variables?

## Considered Options

- `dotenv` package - install as a dependency, call `dotenv/config` or `config()` in `src/server/index.ts`
- Node `--env-file=.env` flag - built-in since Node 20, passed via the dev script, no package required
- `dotenv-expand` - dotenv with variable interpolation support

## Decision Outcome

Chosen option: "Node `--env-file=.env` flag", because Node 20+ supports it natively (no package install, no `require('dotenv/config')` in source), and it is passed transparently via the `tsx watch` command in `package.json`'s `dev` script.

### Consequences

- Good, because zero runtime dependencies added - no `dotenv` in `package.json`
- Good, because the flag is invisible to application code; no import needed in `src/server/index.ts`
- Good, because `tsx` passes CLI flags through to Node, so `tsx watch --env-file=.env src/server/index.ts` works as expected
- Bad, because the `--env-file` flag is only available in Node 20+; projects on older Node versions would need dotenv
- Neutral, because production deployments inject environment variables via the host (Railway, Fly, Vercel) - not via `.env` - so this only affects local dev
