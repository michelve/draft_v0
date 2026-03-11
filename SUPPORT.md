# Support

This document explains where to get help with Draft v0 and what to expect when you ask.

## Before You Ask

Check these resources first - your answer is likely already there:

| Resource                                                        | What's covered                         |
| --------------------------------------------------------------- | -------------------------------------- |
| [Getting Started](docs/guides/getting-started.md)               | Installation, prerequisites, first run |
| [Project Structure](docs/guides/project-structure.md)           | Architecture and directory layout      |
| [Skills & Agents](docs/guides/skills-and-agents.md)             | AI ecosystem reference                 |
| [Tasks Workflow](docs/guides/tasks-workflow.md)                 | File-based task management             |
| [Figma Integration](docs/guides/figma-integration.md)           | Design-to-code pipeline setup          |
| [Architecture Decisions](docs/guides/architecture-decisions.md) | Why things are built the way they are  |

## Where to Get Help

### Questions & General Discussion

Open a [GitHub Discussion](https://github.com/michelve/draft_v0/discussions) for:

- "How do I…?" questions about using Draft v0
- Asking for feedback on your approach or design
- Sharing how you're using the project
- Ideas and suggestions

Discussions are the right place for open-ended conversation. They stay searchable and help future users with the same question.

### Bug Reports

Open a [GitHub Issue](https://github.com/michelve/draft_v0/issues) if something is broken - unexpected errors, incorrect behavior, or broken commands. Include:

- What you did (steps to reproduce)
- What you expected to happen
- What actually happened
- Relevant output, logs, or screenshots
- Your OS, Node.js version, and pnpm version

```bash
node --version
pnpm --version
```

### Security Vulnerabilities

**Do not open a public issue for security concerns.**

Use [GitHub Private Vulnerability Reporting](https://github.com/michelve/draft_v0/security/advisories/new) so the details stay confidential until a fix is available. See [SECURITY.md](SECURITY.md) for the full policy and response timeline.

### Feature Requests

Open a [GitHub Issue](https://github.com/michelve/draft_v0/issues) and label it `enhancement`. Describe:

- The problem you're trying to solve
- Your proposed solution (optional)
- Alternatives you've considered

## Response Expectations

This is an open-source project maintained in spare time. There are no SLAs. We aim to:

- Acknowledge new issues and discussions within a few business days
- Prioritize bug reports over feature requests
- Close issues that are duplicates, out of scope, or not actionable with an explanation

## Contributing

If you want to fix a bug or add a feature yourself, see [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow - including how to set up your dev environment, branch strategy, commit conventions, and the PR checklist.
