---
status: backlog
created: 2026-03-08
updated: 2026-03-08
---

# 0008 — Add task-context-injector Claude hook

## Deliverable

A `UserPromptSubmit` hook that detects task number references in user messages, reads the matching task file from `.tasks/`, and injects the task's acceptance criteria and deliverable into Claude's context — so every task conversation starts with full spec context automatically.

## Context and Motivation

When working on a task (e.g. "let's do task 0006"), Claude has no automatic access to that task's acceptance criteria, examples, or scope boundaries. Engineers currently copy-paste task content manually. The hook reads the file and injects the relevant sections, eliminating the manual step and reducing the risk of Claude drifting from the acceptance criteria. Born from the hooks planning session (2026-03-08).

## Key Decisions

- **Bash first, PowerShell second** — deliver `task-context-injector.sh` (macOS/Linux) and `task-context-injector.ps1` (Windows)
- **Detection pattern**: match `0\d{3}` (zero-padded 4-digit numbers), `task \d+`, `#\d{3,4}` in the user message (case-insensitive)
- **Search path**: `.tasks/backlog/`, `.tasks/in-progress/`, `.tasks/done/` — search all three, prefer in-progress
- **Inject**: Deliverable + Acceptance Criteria sections only (not the full file — keep injection lean)
- **Graceful fallback**: if no matching task file is found, proceed silently without injection

## Acceptance Criteria

- [ ] Given a message "let's work on task 0006", when the hook runs, then the Deliverable and Acceptance Criteria from `.tasks/backlog/0006-*.md` are injected into Claude's context
- [ ] Given a message "continuing #0005", when the hook runs, then the matching task file content is injected
- [ ] Given a message with no task number (e.g. "fix the button"), when the hook runs, then no injection occurs and the message is passed through unchanged
- [ ] Given a task number with no matching file, when the hook runs, then the message proceeds unchanged (no error)
- [ ] Given a task in `.tasks/in-progress/`, when the hook runs, then it is found and injected (not just backlog)
- [ ] Given macOS/Linux, the `.sh` script executes correctly via bash
- [ ] Given Windows, the `.ps1` script executes correctly via PowerShell
- [ ] Injected content is clearly labeled: `"[Task 0006 context — auto-injected]"` header

## Out of Scope

- Moving tasks between directories (hook is read-only)
- Injecting the full task file (only Deliverable + Acceptance Criteria)
- Creating task files if they don't exist

## Dependencies

- `.claude/hooks/` directory exists (confirmed empty, ready)
- `.tasks/` directory with task files in backlog/in-progress/done (exists)

## Related Code

- `.tasks/backlog/` — task files to read (0001–0009 will exist after current sprint)
- `.tasks/_template.md` — task file structure (defines section names to extract)
- `.github/skills/create-tasks/SKILL.md` — task format reference

## Verification

```bash
# Send "let's work on task 0005" and confirm acceptance criteria appear in Claude's context
# Send a plain message and confirm no injection
# Check task is found across backlog/, in-progress/, done/
cat .claude/settings.json  # confirm UserPromptSubmit hook registered
```
