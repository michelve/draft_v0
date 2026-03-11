---
status: needs-research
created: 2026-03-10
updated: 2026-03-10
---

# 0021-implement-string-substitutions-in-skills

## Status: NEEDS RESEARCH

**Reason:** Cannot verify if string substitution variables ($ARGUMENTS, $0, $1, ${CLAUDE_SESSION_ID}) are supported in Claude Code skill content.

**Current evidence:**

- No existing skills use these variables (searched all SKILL.md files)
- No documentation found in skill-developer skill about substitution syntax
- Task 0020 (context/agent attributes) failed because those YAML fields weren't supported - suggests task assumptions may be based on planned but unimplemented features

**Before proceeding:**

- Need to verify with Claude Code documentation or Anthropic resources if substitution variables are supported
- Need to test if variables actually get replaced at runtime
- May need to use alternative approaches (e.g., parsing arguments in skill content manually)

**If feature exists:** Implement as planned (document $0/$1 for positional args, ${CLAUDE_SESSION_ID} for session tracking)  
**If feature doesn't exist:** Mark as not-feasible or implement alternative argument handling strategy

## Original Deliverable

All skills that accept arguments properly reference parameter variables ($ARGUMENTS, $0, $1) and workflow skills include session tracking (${CLAUDE_SESSION_ID}) in their content, enabling dynamic parameter handling and session correlation.

## Context and Motivation

Claude Code supports string substitutions in skill content:

- `$ARGUMENTS` - All arguments passed when invoking
- `$0`, `$1`, `$N` - Positional arguments (shorthand for $ARGUMENTS[0], $ARGUMENTS[1], etc.)
- `${CLAUDE_SESSION_ID}` - Current session ID for tracking/logging
- `${CLAUDE_SKILL_DIR}` - Skill directory (for bundled scripts - not applicable yet)

Currently no skills use these variables. By implementing substitutions:

- Skills can parse and validate user-provided arguments
- Workflow skills can log session IDs for tracking
- Clear documentation for how arguments are processed

Reference: `/memories/session/plan.md` Section "Phase 4: Advanced Configuration"

## Key Decisions

- Use `$0`, `$1` for positional arguments (simpler than `$ARGUMENTS[0]`)
- Use `$ARGUMENTS` for flexible/optional parameters or when parsing complex inputs
- Add `${CLAUDE_SESSION_ID}` to workflow skills for session tracking/logging
- Document variable usage in skill content (in "Usage" or "Arguments" section)
- Don't use `${CLAUDE_SKILL_DIR}` yet (no bundled scripts exist)

## Acceptance Criteria

**Argument-Accepting Skills (6 total):**

- [ ] Given adr-writer skill, when implementing substitution, then document: "When invoked with $ARGUMENTS containing 'supersedes: NNNN', mark ADR NNNN as superseded"
- [ ] Given figma-implement-design skill, when implementing substitution, then document: "Extract file key and node ID from $0 (Figma URL). If $1 is provided, use as specific node ID to implement"
- [ ] Given code-connect-components skill, when implementing substitution, then document: "Connect Figma component at $0 (file key) and $1 (node ID) to code component"
- [ ] Given figma skill, when implementing substitution, then document: "Process $ARGUMENTS as Figma URL or node ID for flexible handling"
- [ ] Given create-design-system-rules skill, when implementing substitution, then document how $0 is used (if arguments are actually expected)
- [ ] Given web-design-guidelines skill (existing argument-hint), when implementing substitution, then document: "Review files matching $ARGUMENTS pattern against Web Interface Guidelines"

**Workflow Skills with Session Tracking (5 total):**

- [ ] Given adr-writer skill, when adding session tracking, then include: "Log ADR creation session: ${CLAUDE_SESSION_ID}"
- [ ] Given create-tasks skill, when adding session tracking, then include: "Track task creation session: ${CLAUDE_SESSION_ID}"
- [ ] Given figma-implement-design skill, when adding session tracking, then include: "Track design implementation session: ${CLAUDE_SESSION_ID}"
- [ ] Given code-connect-components skill, when adding session tracking, then include: "Track Code Connect mapping session: ${CLAUDE_SESSION_ID}"
- [ ] Given create-design-system-rules skill, when adding session tracking, then include: "Track design system setup session: ${CLAUDE_SESSION_ID}"

**Validation:**

- [ ] Given all skills updated, when reviewing content, then variable references ($0, $1, etc.) are documented in appropriate sections
- [ ] Given workflow skills updated, when checking session tracking, then ${CLAUDE_SESSION_ID} appears in logging/tracking context

## Out of Scope

- Bundled scripts using `${CLAUDE_SKILL_DIR}` - no bash/python scripts exist yet
- Testing actual variable substitution - assumes Claude Code mechanism works
- Complex argument parsing logic - keep documentation simple

## Dependencies

- Task 0014 (argument-hint configuration) must be complete - can't document variables without hints
- Skills should have YAML frontmatter with argument-hint before adding content references

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - mentions supersedes parameter, document $ARGUMENTS usage
- `.claude/skills/figma-implement-design/SKILL.md` - document $0 (URL), $1 (node-id)
- `.claude/skills/code-connect-components/SKILL.md` - document $0 (file key), $1 (node-id)
- `.claude/skills/figma/SKILL.md` - document $ARGUMENTS for flexible URL/node-id
- `.claude/skills/create-design-system-rules/SKILL.md` - check if $0 needed for codebase path
- `.claude/skills/web-design-guidelines/SKILL.md` - document $ARGUMENTS for file pattern
- `.claude/skills/create-tasks/SKILL.md` - add ${CLAUDE_SESSION_ID} for tracking

## Verification

```bash
# Count skills using positional arguments
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "\$0|\$1|\$2" | Measure-Object
# Expected: At least 3 skills (figma-implement-design, code-connect-components, web-design-guidelines)

# Count skills using $ARGUMENTS
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "\$ARGUMENTS" | Measure-Object
# Expected: At least 3 skills (adr-writer, figma, create-design-system-rules)

# Count skills using session ID
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "\$\{CLAUDE_SESSION_ID\}" | Measure-Object
# Expected: 5 matches (workflow skills)
```

Manual test: Invoke `/figma-implement-design https://figma.com/file/ABC123` and verify $0 is extracted correctly
