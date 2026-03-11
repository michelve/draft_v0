---
status: backlog
created: 2026-03-10
updated: 2026-03-10
---

# 0015-configure-allowed-tools-for-skills

## Deliverable

Skills have appropriate `allowed-tools` arrays configured in their YAML frontmatter:

- 6 MCP server skills (5 Figma + 1 Miro) declare specific MCP tools
- Skills that need restricted general tool access have appropriate restrictions
- Most skills can omit this field (unrestricted access is fine for general-purpose skills)

## Context and Motivation

Currently no skills have `allowed-tools` configured, meaning skills have unrestricted access to all available tools.

**For MCP server skills**, unrestricted access can lead to:

- Skills using inappropriate MCP tools (e.g., Figma skill calling Miro tools)
- Increased context pollution from irrelevant MCP tool definitions
- Unclear expectations about which MCP tools a skill will use

**For general tools** (read_file, grep_search, semantic_search, etc.), most skills benefit from unrestricted access. Only use `allowed-tools` for general tools if a skill needs specific restrictions (e.g., read-only access).

**Primary focus**: Configure MCP server skills to declare exactly which MCP tools they need.

Reference: `/memories/session/plan.md` Section "Phase 1: Critical Configuration"

## Key Decisions

- **MCP tools**: Names must match those defined in `.claude/settings.json` under `mcp-servers` configuration
- Use YAML array syntax in frontmatter: `allowed-tools: [tool1, tool2]` or multi-line
- Include all tools the skill might invoke, not just the primary one
- Figma skills need multiple tools (design context, screenshots, assets, variables, Code Connect)
- Miro skill needs diagram, table, and content creation tools
- **General tools**: Most skills don't need restrictions - omit `allowed-tools` for unrestricted access
- Only restrict general tools if skill has specific needs (future consideration, not required for this task)

## Acceptance Criteria

- [ ] Given `.claude/settings.json`, when reviewing mcp-servers config, then extract exact Figma tool names (figma\_\_\* pattern)
- [ ] Given `.claude/settings.json`, when reviewing mcp-servers config, then extract exact Miro tool names (miro\_\_\* pattern)
- [ ] Given implement-design skill, when adding allowed-tools, then include: `figma__get_design_context`, `figma__get_screenshot`, `figma__get_assets`, `figma__get_variables`
- [ ] Given figma-implement-design skill, when adding allowed-tools, then include same tools as implement-design
- [ ] Given figma skill, when adding allowed-tools, then include all Figma MCP tools (infrastructure skill)
- [ ] Given code-connect-components skill, when adding allowed-tools, then include: `figma__get_code_connect_suggestions`, `figma__get_design_context`
- [ ] Given create-design-system-rules skill, when adding allowed-tools, then include: `figma__create_design_system_rules`, `figma__get_variables`
- [ ] Given miro-mcp skill, when adding allowed-tools, then include: `miro__draft_diagram_new`, `miro__context_get_board_docs`, `miro__create_table`, `miro__add_content_to_board`
- [ ] Given all 6 SKILL.md files updated, when validating YAML, then frontmatter parses without errors
- [ ] Given allowed-tools configured, when skill runs, then only declared tools are accessible (verify via skill invocation logs)

## Out of Scope

- Testing actual MCP server connectivity - assumes servers are configured
- Adding graceful degradation for missing MCP servers - future enhancement
- Restricting general tools (read_file, grep_search) - most skills need unrestricted access
- Read-only tool restrictions - not needed for current skill set, can add later if needed

## Dependencies

- `.claude/settings.json` must have `mcp-servers` configuration with tool definitions
- Figma MCP server must be installed and configured (or skip Figma skills)
- Miro MCP server must be installed and configured (or skip Miro skill)

## Related Code

- `.claude/settings.json` - MCP server tool name reference (search for `mcp-servers` section)
- `.claude/skills/implement-design/SKILL.md` - primary Figma implementation skill
- `.claude/skills/figma-implement-design/SKILL.md` - alternate Figma implementation skill
- `.claude/skills/figma/SKILL.md` - Figma infrastructure skill
- `.claude/skills/code-connect-components/SKILL.md` - Figma Code Connect skill
- `.claude/skills/create-design-system-rules/SKILL.md` - Figma design system skill
- `.claude/skills/miro-mcp/SKILL.md` - Miro integration skill

## Verification

```bash
# Check settings.json for MCP server tool names
Get-Content .claude/settings.json | Select-String -Pattern "mcp-servers" -Context 0,50

# Verify all 6 skills have allowed-tools
Select-String -Path ".claude/skills/*/SKILL.md" -Pattern "allowed-tools:" | Measure-Object
# Expected: 6 matches

# Validate YAML syntax
pnpm exec js-yaml .claude/skills/implement-design/SKILL.md
```

Manual test: Invoke a Figma skill and check logs to verify only declared tools are called
