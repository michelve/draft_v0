---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0028-audit-skill-line-counts-and-identify-supporting-file-candidates

## Deliverable

A comprehensive audit report documenting all SKILL.md line counts, identifying skills exceeding 300 lines (with 500 as the hard limit), and listing specific sections that can be extracted to supporting files.

## Context and Motivation

Official Claude Code documentation recommends keeping SKILL.md under 500 lines, using supporting files (templates/, examples/, scripts/, reference/) for large reference material.

Currently unknown which skills exceed this guideline. Need systematic audit to:

1. Identify overweight skills (300+ lines as warning, 500+ as critical)
2. Analyze content structure to find extractable sections
3. Prioritize refactoring candidates by line count + complexity
4. Create extraction plan for task 0029

Reference: `/memories/session/plan.md` Phase 2, Step 4

## Key Decisions

- Audit all 23 standard skills systematically
- Use 300 lines as warning threshold (potential candidates)
- Use 500 lines as critical threshold (must refactor per official docs)
- Categorize extractable content: templates (boilerplate), examples (code samples), reference (documentation), scripts (executable tools)
- Document findings in session memory for task 0029 dependency

## Acceptance Criteria

- [ ] Given .claude/skills/ directory, when running line count audit, then generate report with all 23 standard skill file sizes
- [ ] Given line count report, when identifying overweight skills, then flag all skills with 300+ lines as candidates, 500+ as critical
- [ ] Given each overweight skill, when analyzing content, then categorize sections as: templates/, examples/, reference/, or scripts/
- [ ] Given content analysis, when identifying extractable sections, then document specific line ranges and proposed supporting file names
- [ ] Given audit complete, when prioritizing refactoring, then rank by: (line_count - 300) \* complexity_score
- [ ] Given audit findings, when documenting results, then save to /memories/session/skill-line-audit.md with extraction roadmap
- [ ] Given audit report, when cross-referencing with existing supporting files, then identify skills that already have (but may not reference) supporting content

## Out of Scope

- Actual file extraction and refactoring - covered in task 0029
- Updating skill-developer documentation - covered in task 0034
- Analyzing agent-only skills (automatic-code-review, task-check) - different structure

## Dependencies

- None - this is pure analysis task, no code changes

## Related Code

- `.claude/skills/*/SKILL.md` - all 23 standard skills to audit
- `.claude/skills/shadcn/SKILL.md` - possible reference for how to structure supporting files (if it has any)

## Verification

```bash
# Generate line count report
Get-ChildItem -Path "e:\GitHub\draft_v0\.claude\skills" -Filter "SKILL.md" -Recurse |
  ForEach-Object {
    [PSCustomObject]@{
      Skill = $_.Directory.Name
      Lines = (Get-Content $_.FullName | Measure-Object -Line).Lines
      Path = $_.FullName
    }
  } | Sort-Object -Property Lines -Descending | Format-Table

# Validate session memory file created
Test-Path "e:\GitHub\draft_v0\.tasks\.memories\session\skill-line-audit.md"
```
