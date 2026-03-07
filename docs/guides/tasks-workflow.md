# Tasks Workflow

Draft v0 uses a file-based task management system in `.tasks/` that integrates with AI skills for creation and verification. Tasks are Markdown files that move through lifecycle directories.

## Why File-Based Tasks?

- **Version controlled** — Task history lives in Git alongside your code
- **AI-readable** — Skills can create, validate, and verify tasks automatically
- **No external tools** — No Jira, Linear, or Trello dependency
- **Convention-driven** — Structured templates ensure consistent, actionable work items

## Directory Structure

```text
.tasks/
├── _template.md         # Template for new tasks
├── README.md            # System documentation
├── backlog/             # Tasks not yet started
├── in-progress/         # Tasks currently being worked on
├── done/                # Completed and verified tasks
└── cancelled/           # Abandoned tasks (with reason)
```

## Task Lifecycle

```text
Created → backlog/
    ↓
Started → in-progress/      (move file when work begins)
    ↓
Verified → done/            (must pass task-check first)

    or

Abandoned → cancelled/      (add a note explaining why)
```

## Creating Tasks

Use the **create-tasks** skill by asking the AI to break down a feature, PRD, or requirement.

**Example prompts:**

- "Create tasks for adding a blog system"
- "Break this PRD down into tasks"
- "Define work items for the user settings page"

The skill uses **Example Mapping** to discover requirements:

```text
Story → Rules → Examples → Questions
```

Each task is saved as `.tasks/backlog/NNNN-short-title.md` using the template.

### Task Template Structure

Every task includes:

| Section                    | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| **YAML Frontmatter**       | Status, created/updated dates               |
| **Deliverable**            | What the user sees when done — one sentence |
| **Context and Motivation** | Why this matters, PRD reference, background |
| **Key Decisions**          | Constraints the engineer must follow        |
| **Acceptance Criteria**    | Given-When-Then checkboxes (testable)       |
| **Out of Scope**           | What this task does NOT cover               |
| **Dependencies**           | What must exist first                       |
| **Related Code**           | Files and patterns to reference             |
| **Verification**           | Commands that prove the task is done        |

### INVEST Validation

Every task must pass the INVEST checklist:

- **I**ndependent — Delivers value alone
- **N**egotiable — Scope can be discussed
- **V**aluable — User/stakeholder sees clear benefit
- **E**stimable — Can be sized confidently
- **S**mall — Fits in one day of work or less
- **T**estable — Has concrete acceptance criteria

## Working on Tasks

1. **Pick a task** from `backlog/`
2. **Move the file** to `in-progress/`
3. **Implement** following the acceptance criteria
4. **Run verification** commands listed in the task
5. **Request verification** with `task-check`

## Verifying Tasks

Before moving a task to `done/`, it must pass the **task-check** agent:

```text
/check <task-id> .tasks/in-progress/NNNN-short-title.md
```

The agent:

1. Reads the task file and acceptance criteria
2. Checks each Given-When-Then criterion
3. Returns one of:
    - **PASS** — All criteria met, move to `done/`
    - **FAIL** — Lists which criteria failed and why
    - **NEED_INFO** — Cannot determine, asks clarifying questions

A task gets **up to 3 attempts**. If it fails all 3, reassess the task scope.

## File Naming

`NNNN-short-title.md` — zero-padded number, lowercase, hyphenated.

Check across **all** subdirectories for the highest existing number and increment by 1.

**Examples:**

- `0001-add-user-registration.md`
- `0002-create-blog-post-api.md`
- `0003-implement-search-filter.md`

## Example Task

```markdown
---
status: in-progress
created: 2026-03-15
updated: 2026-03-16
---

# 0010-add-price-range-filter

## Deliverable

Users can filter products by minimum and maximum price on the search page.

## Acceptance Criteria

- [ ] Given the search page, when I enter a min price of 10 and max price of 50,
      then only products priced between $10–$50 are shown
- [ ] Given an invalid range (min > max), when I submit,
      then a validation error appears and no request is sent
- [ ] Given no price filter, when I search,
      then all products appear regardless of price

## Verification

pnpm typecheck
pnpm test
```

## Integration with Other Systems

| System            | Connection                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Skills**        | `create-tasks` generates tasks; `task-check` verifies them                                                 |
| **Agents**        | `auto-error-resolver` can fix failing verification; `code-architecture-reviewer` validates implementations |
| **ADRs**          | Significant decisions made during a task should be recorded as ADRs                                        |
| **Quality Gates** | Verification always includes `pnpm typecheck`, `pnpm biome:check`, `pnpm build`                            |

## Next Steps

- [Architecture Decisions](architecture-decisions.md) — Record significant decisions made during tasks
- [Skills & Agents](skills-and-agents.md) — Full reference of available skills and agents
