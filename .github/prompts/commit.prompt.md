---
agent: agent
description: Commit the work you and the user have been doing
---

# Commit

Commit the work you and the user have been doing, following the project's commitlint rules exactly.

## Commitlint Rules (enforced - violations block the commit)

| Rule                  | Requirement                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **type-enum**         | Must be one of: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`                                                 |
| **header-max-length** | Entire first line (type + scope + subject) must be ≤ 100 characters                                                         |
| **subject-case**      | Subject must be **entirely lower-case** - no capitalised words, no acronyms in caps (e.g. `mcp` not `MCP`, `css` not `CSS`) |
| **subject-full-stop** | Subject must NOT end with a period `.`                                                                                      |
| **subject-empty**     | Subject must not be empty                                                                                                   |
| **type-empty**        | Type must not be empty                                                                                                      |

## Message Format

```
<type>: <subject in lower-case, ≤ 100 chars total, no trailing dot>

- bullet point body lines (each ≤ 100 characters)
- one change per bullet
- explain what AND why, not how
```

## Pre-flight Checklist (verify before running git commit)

1. [ ] Type is one of the allowed values above
2. [ ] Subject is entirely lower-case (no capitals anywhere)
3. [ ] Full header line is ≤ 100 characters
4. [ ] Subject does not end with `.`
5. [ ] Every body bullet line is ≤ 100 characters
6. [ ] All changes are staged (`git status` is clean or only has untracked files)

## Workflow

1. Run `git status` to see what is staged
2. If nothing is staged, run `git add -A` (or stage specific files)
3. Construct the commit message following the rules above - double-check subject case
4. Run `git commit -m "<header>" -m "<body>"` (use separate `-m` flags for header and body)
5. If commitlint rejects it, fix the reported rule and retry - do NOT bypass with `--no-verify`
6. After a successful commit, run `git push origin main`

If you are unsure about the type or scope, ask the user before committing.
