---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0027-implement-dynamic-context-injection-with-shell-commands

## Deliverable

Dynamic context injection using `!`command`` preprocessing pattern is implemented in 5-7 high-value skills for Figma metadata, git status, project structure, and package info.

## Context and Motivation

Official Claude Code documentation describes `!`command`` syntax for shell command preprocessing. Commands execute BEFORE skill content is sent to Claude, injecting fresh context automatically.

The shadcn skill already proves this pattern works with `!`npx shadcn@latest diff`` for component version checking.

High-value injection opportunities:

- **Figma skills**: `!`figma get-file-info ...`` for current file metadata
- **Git-based workflows**: `!`git status``, `!`git log --oneline -5`` for repo context
- **Project context**: `!`cat package.json``, `!`ls -la src/`` for structure
- **Development environment**: `!`node --version``, `!`pnpm list --depth=0`` for dependencies

Reference: `/memories/session/plan.md` Phase 1, Step 3

## Key Decisions

- Use shadcn/SKILL.md as reference implementation (lines with `!`npx shadcn@latest diff``)
- Start with 5-7 skills where dynamic context has clear value (MCP-integrated first)
- Validate command safety - never inject user-controlled commands
- Use read-only commands only (git status, cat, ls) - no mutations
- Test each command in PowerShell (Windows) for cross-platform compatibility
- Consider command execution time - keep under 2s for responsiveness

## Acceptance Criteria

- [ ] Given shadcn/SKILL.md, when reading implementation, then document the `!`command`` pattern syntax and placement
- [ ] Given figma skill, when user already has Figma URL in context, then inject `!`figma get-file-info <url>`` to show file metadata
- [ ] Given git-aware workflows (automatic-code-review, refactor-planner), when active, then inject `!`git status --short`` and `!`git log --oneline -5`` for repo context
- [ ] Given project-structure skills (skill-creator, create-tasks), when active, then inject `!`cat package.json`` for dependency context
- [ ] Given skills needing file structure (documentation-architect), when active, then inject `!`tree -L 2 src``(or PowerShell equivalent`Get-ChildItem -Recurse -Depth 2`)
- [ ] Given all command injections, when commands fail (file not found, command not available), then skill gracefully handles empty output
- [ ] Given all implementations, when testing on Windows PowerShell, then commands execute successfully and output is captured
- [ ] Given all implementations, when testing command execution time, then all commands complete under 2 seconds

## Out of Scope

- Custom MCP command integration - keep to standard shell commands for Phase 1
- Command output parsing/formatting - inject raw output, let Claude interpret
- Security sandboxing - rely on read-only command selection (future: validate with allow-list)
- Cross-platform command normalization - start with PowerShell, add Unix alternatives later

## Dependencies

- Task 0025, 0026 complete (Phase 1 Quick Wins should progress together)
- shadcn skill exists as reference (already in codebase)

## Related Code

- `.claude/skills/shadcn/SKILL.md` - REFERENCE IMPLEMENTATION with `!`npx shadcn@latest diff`` around line 30-40
- `.claude/skills/figma/SKILL.md` - candidate for Figma metadata injection
- `.claude/skills/figma-implement-design/SKILL.md` - candidate for Figma + git context
- `.github/skills/automatic-code-review/` - candidate for git status injection (if applicable)
- `.claude/skills/skill-creator/SKILL.md` - candidate for package.json injection
- `.claude/skills/create-tasks/SKILL.md` - candidate for project structure injection

## Verification

```bash
# Test command execution manually first
git status --short
git log --oneline -5
cat package.json
Get-ChildItem -Path src -Recurse -Depth 2 | Select-Object FullName

# Verify skill invocation with injection
# 1. Invoke figma skill with Figma URL, check if metadata appears in context
# 2. Invoke skill-creator, verify package.json content shows automatically
# 3. Check Claude response includes injected data in reasoning
```
