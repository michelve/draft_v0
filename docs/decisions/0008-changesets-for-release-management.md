---
status: accepted
date: 2026-03-08
---

# Changesets for release management and changelog generation

## Context and Problem Statement

Draft v0 needs a way to manage version bumps and generate changelogs as the project evolves. Without a structured release process, version history is opaque and changelog entries have to be written manually at release time. What is the right tool to manage this?

## Considered Options

- `@changesets/cli` - changeset-based workflow with per-PR changesets accumulated into a release
- `standard-version` / `release-please` - commit-message-driven changelog generation
- Manual versioning - hand-edit `package.json` and `CHANGELOG.md`

## Decision Outcome

Chosen option: "`@changesets/cli`", because it fits a PR-based workflow where contributors describe their change at the time they make it (not at release time), supports monorepo-aware versioning, and integrates with GitHub Actions via the official `changesets/action`.

### Consequences

- Good, because changelogs are written close to the change by the person who made it, giving accurate context
- Good, because the release GitHub Actions workflow (`release.yml`) automates version bumps and publishes changesets automatically
- Good, because patch/minor/major bump types are explicit per changeset, not inferred from commit messages
- Bad, because contributors must remember to create a changeset file alongside their PR - a step the `pr` prompt template handles
- Neutral, because the changeset config (`.changeset/config.json`) pins the base branch and changelog format
