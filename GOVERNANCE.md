# Governance

This document describes how Draft v0 is maintained and how decisions are made.

## Project Status

Draft v0 is a personal open-source project, currently maintained by a single person. It is in early development (v0.1.x). The governance model reflects that reality — lightweight, transparent, and honest about the current scale.

## Roles

### Maintainer

**[@michelve](https://github.com/michelve)** — project creator and sole maintainer.

Responsibilities:

- Final say on roadmap direction, accepted features, and breaking changes
- Reviewing and merging pull requests
- Triaging issues and discussions
- Cutting releases
- Maintaining the security policy and responding to vulnerability reports

### Contributors

Anyone who opens an issue, submits a pull request, or participates in discussions is a contributor. There is no formal contributor tier beyond that at this stage.

Consistent, high-quality contributions may lead to an invitation to become a co-maintainer as the project grows.

## Decision Making

### Day-to-day decisions

The maintainer makes routine decisions (merging PRs, closing issues, dependency updates) without a formal process.

### Significant decisions

Changes that affect the project's architecture, conventions, tooling choices, or public API are documented as Architecture Decision Records (ADRs) in [`docs/decisions/`](docs/decisions/README.md). ADRs are written when:

- A new framework, library, or significant dependency is adopted
- An existing convention or workflow is changed
- A trade-off is made that future contributors will question

Anyone can propose an ADR. Open a PR with the proposed record — it will be reviewed and discussed before being accepted.

### Feature requests and roadmap

The project roadmap is not formally published. Priorities are set by the maintainer based on:

1. Bug severity — broken things come first
2. Alignment with the project's core purpose (AI-augmented full-stack scaffold)
3. Community interest expressed via GitHub reactions and discussion

Feature requests that are out of scope, overly complex, or that conflict with the project's direction may be closed without implementation — this is not a rejection of the person, just a scoping decision.

## Contributions

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow — setup, branching, commit conventions, quality gates, and the PR checklist.

All contributions are subject to:

- The [Code of Conduct](CODE_OF_CONDUCT.md) — respectful, constructive participation is required
- The [MIT License](LICENSE) — by submitting a PR, you agree your contribution will be licensed under MIT

## Releases

There is no fixed release cadence. Releases are cut when:

- A meaningful set of features or fixes has accumulated
- A critical bug fix needs to ship

Releases follow [Semantic Versioning](https://semver.org/):

- `MAJOR` — breaking changes to the scaffold's public API or conventions
- `MINOR` — new features, backward-compatible
- `PATCH` — bug fixes, documentation updates, dependency bumps

Pre-1.0 releases (`0.x`) may include breaking changes in `MINOR` versions.

## Code of Conduct Enforcement

Violations of the [Code of Conduct](CODE_OF_CONDUCT.md) should be reported via a [GitHub Issue](https://github.com/michelve/draft_v0/issues) or privately through GitHub's contact mechanisms.

The maintainer will review all reports and take appropriate action, which may include a warning, temporary suspension from participation, or a permanent ban from the project — depending on severity and history.

## Changing This Document

Proposed changes to this governance document should be submitted as a pull request. Significant changes will be discussed openly before being merged.

## Growing Beyond a Solo Project

If this project grows to the point where a single maintainer is a bottleneck, governance will evolve — additional maintainers may be added, a steering committee formed, or the project donated to a foundation. Any such changes will be announced publicly and documented here.
