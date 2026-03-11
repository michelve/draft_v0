# Tasks

Task tracking directory for the Draft v0 project.

## Structure

```text
.tasks/
├── README.md          ← This file
├── _template.md       ← Task template
├── backlog/           ← Tasks not yet started
├── in-progress/       ← Tasks currently being worked on
├── done/              ← Completed tasks
└── cancelled/         ← Cancelled or abandoned tasks
```

## File Naming

`NNNN-short-title.md` - zero-padded number, lowercase, hyphenated.

To find the next number, check across **all** subdirectories for the highest `NNNN` prefix and increment by 1.

## Lifecycle

1. **Created** → saved to `backlog/`
2. **Started** → moved to `in-progress/`
3. **Verified** → moved to `done/` (must pass `task-check` first)
4. **Cancelled** → moved to `cancelled/` with a note explaining why

## Creating Tasks

Use the `create-tasks` skill. Tasks are written using the template and saved to `.tasks/backlog/`.

## Verifying Tasks

Before marking a task complete, run the `task-check` agent:

```bash
/check <task-id> .tasks/in-progress/NNNN-short-title.md
```

The agent returns PASS / FAIL / NEED_INFO. A task must PASS before moving to `done/`.

## Quick Reference

| Action          | Command / Location                             |
| --------------- | ---------------------------------------------- |
| Create tasks    | Use `create-tasks` skill → saves to `backlog/` |
| Start a task    | Move from `backlog/` to `in-progress/`         |
| Verify a task   | `/check <id> .tasks/in-progress/<file>`        |
| Complete a task | Move from `in-progress/` to `done/`            |
| Cancel a task   | Move to `cancelled/` with reason               |
