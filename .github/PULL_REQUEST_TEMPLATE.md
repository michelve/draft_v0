# Pull Request

## Summary

<!-- What does this PR do? One or two sentences. -->

## Type of Change

<!-- Check all that apply -->

- [ ] `feat` - New feature
- [ ] `fix` - Bug fix
- [ ] `refactor` - Code change that is not a fix or feature
- [ ] `docs` - Documentation only
- [ ] `chore` - Build, tooling, or config change
- [ ] `test` - Adding or updating tests

## Related Issues

<!-- Link issues this PR closes or is related to -->
<!-- Use "Closes #123" to auto-close the issue on merge -->

Closes #

## What Changed

<!-- Bullet points describing the specific changes made -->

-
-

## How to Test

<!-- Steps a reviewer can follow to verify the change works -->

1.
2.

## Quality Gates

<!-- All must pass before requesting review -->

- [ ] `pnpm typecheck` - zero TypeScript errors
- [ ] `pnpm biome:check` - zero Biome lint/format errors
- [ ] `pnpm lint` - zero ESLint errors
- [ ] `pnpm build` - clean production build

## Checklist

- [ ] Tests added or updated for new behavior
- [ ] No `any` types introduced without justification
- [ ] No files in `src/client/components/ui/` modified
- [ ] `routeTree.gen.ts` not manually edited
- [ ] ADR written if this involves a significant design decision ([when to write one](docs/decisions/README.md))

## Screenshots

<!-- If the change affects the UI, add before/after screenshots -->
<!-- Delete this section if not applicable -->
