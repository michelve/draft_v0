---
status: done
created: 2026-03-10
updated: 2026-03-10
---

# 0029-extract-large-reference-material-to-supporting-files

## Deliverable

All skills identified in task 0028 with 300+ lines have large reference sections extracted to supporting files (templates/, examples/, reference/, scripts/), reducing main SKILL.md to under 300 lines with proper cross-references.

## Context and Motivation

Task 0028 audit identified specific skills exceeding 300-line guideline and categorized extractable content. This task executes the extraction plan.

Likely candidates based on domain complexity:

- **skill-creator**: Extract SKILL.md boilerplate template, YAML frontmatter schema
- **figma-implement-design**: Extract component code templates, implementation patterns
- **playwright-skill**: Extract common test patterns, page object examples
- **writing-tests**: Extract BugMagnet edge case checklist (already large reference content)

Benefits:

- Faster skill loading (less content to parse)
- Better maintainability (separate concerns)
- Easier reference updates (modify supporting files without touching main skill)
- Follows official best practice (keep SKILL.md focused on instructions)

Reference: `/memories/session/plan.md` Phase 2, Step 5

## Key Decisions

- Create directory structure: `.claude/skills/<skill-name>/{templates,examples,reference,scripts}/`
- Reference supporting files using markdown links: `See [templates/component.tsx](templates/component.tsx)`
- Keep SKILL.md under 300 lines after extraction (500 is hard limit, 300 is comfortable target)
- Preserve YAML frontmatter in main SKILL.md (never move that)
- Test file references resolve correctly in Claude (use relative paths)

## Acceptance Criteria

- [ ] Given task 0028 audit findings, when reviewing extraction candidates, then confirm specific skills and line ranges documented
- [ ] Given each overweight skill, when creating supporting file structure, then create subdirectories: templates/, examples/, reference/, or scripts/ as needed
- [ ] Given extractable content identified, when moving to supporting files, then maintain original content exactly (no content changes, just moves)
- [ ] Given content moved, when updating main SKILL.md, then replace extracted sections with: "See [description](relative/path)" links
- [ ] Given all extractions complete, when running line count audit, then all modified skills now under 300 lines
- [ ] Given supporting file references added, when invoking skills in Claude, then verify Claude can load and reference supporting content
- [ ] Given all changes, when running pnpm typecheck, then zero TypeScript errors
- [ ] Given all files updated, when validating markdown links, then all references resolve to existing files

## Out of Scope

- Creating new content (templates, examples) - only extract existing content
- Optimizing supporting file organization - keep simple for Phase 2, optimize later if needed
- Updating skill-developer guide with supporting file patterns - covered in task 0034

## Dependencies

- Task 0028 must complete first (provides audit findings and extraction plan)

## Related Code

- `/memories/session/skill-line-audit.md` - audit findings from task 0028 (will be created by that task)
- `.claude/skills/skill-creator/SKILL.md` - likely candidate (meta-content is verbose)
- `.claude/skills/writing-tests/SKILL.md` - likely candidate (has large BugMagnet checklist)
- `.claude/skills/figma-implement-design/SKILL.md` - likely candidate (implementation patterns)
- `.claude/skills/playwright-skill/SKILL.md` - likely candidate (test examples)

## Verification

```bash
# Re-run line count audit to verify reductions
Get-ChildItem -Path "e:\GitHub\draft_v0\.claude\skills" -Filter "SKILL.md" -Recurse |
  ForEach-Object {
    [PSCustomObject]@{
      Skill = $_.Directory.Name
      Lines = (Get-Content $_.FullName | Measure-Object -Line).Lines
    }
  } | Where-Object { $_.Lines -gt 300 } | Format-Table

# Verify supporting files exist
Get-ChildItem -Path "e:\GitHub\draft_v0\.claude\skills" -Directory |
  ForEach-Object {
    Get-ChildItem -Path $_.FullName -Directory |
    Where-Object { $_.Name -in @('templates','examples','reference','scripts') }
  }

# Test skill invocation with supporting files
# 1. Invoke skill with supporting files
# 2. Verify Claude references supporting content in responses
```
