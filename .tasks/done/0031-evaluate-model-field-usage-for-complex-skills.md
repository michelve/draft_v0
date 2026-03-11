---
status: done
created: 2026-03-10
updated: 2026-03-10
---

# 0031-evaluate-model-field-usage-for-complex-skills

## Deliverable

An evaluation report documenting the impact of using the `model` field to specify Claude models for 3-4 complex skills (adr-writer, skill-creator, create-design-system-rules), including quality comparison, performance metrics, and cost implications with recommendation for production adoption.

## Context and Motivation

Official Claude Code documentation describes the `model` field in YAML frontmatter to specify which Claude model to use when a skill is active. Currently ZERO skills use this feature.

Potential benefits for complex reasoning skills:

- **adr-writer**: Architecture decisions need deep analysis, trade-off evaluation
- **skill-creator**: Meta-programming needs planning, template design, trigger pattern optimization
- **create-design-system-rules**: System-wide conventions need codebase analysis, pattern recognition

Need to evaluate:

1. Quality difference with larger/specialized models
2. Performance impact (response time, token usage)
3. Cost implications (rate limits, pricing tiers)
4. When model specification is worth the overhead

Reference: `/memories/session/plan.md` Phase 3, Step 7

## Key Decisions

- Test with 3-4 complex skills identified in audit
- Compare default model vs explicitly specified model for same prompts
- Use consistent test scenarios across models for fair comparison
- Document both qualitative (quality of output) and quantitative (tokens, latency) metrics
- Evaluation only - production adoption decision based on evidence

## Acceptance Criteria

- [ ] Given available Claude models, when reviewing options, then document model names, capabilities, and appropriate use cases (e.g., standard, extended, opus)
- [ ] Given 3-4 candidate skills (adr-writer, skill-creator, create-design-system-rules, possibly figma-implement-design), when adding model field, then specify model name in YAML frontmatter
- [ ] Given test scenarios defined, when invoking skills with default model, then capture baseline metrics: output quality (subjective 1-5 scale), response time, token count
- [ ] Given baseline established, when invoking same skills with specified model field, then capture comparative metrics using identical prompts
- [ ] Given metrics collected, when analyzing results, then document quality improvements (if any), performance differences, and token/cost impacts
- [ ] Given analysis complete, when evaluating trade-offs, then consider: quality gain vs cost increase, when specification is justified, which skills benefit most
- [ ] Given all findings, when documenting recommendations, then save to /memories/session/model-field-evaluation.md with production adoption strategy
- [ ] Given recommendations, when model field provides clear value, then document specific skills to keep model field; else recommend removal and revert to defaults

## Out of Scope

- Testing all 23 skills - focus on 3-4 high-complexity candidates only
- Fine-tuning models - use available Claude models as-is
- Custom model deployment - use standard Claude model names only
- Long-term cost monitoring - Phase 3 evaluation captures point-in-time data

## Dependencies

- Task 0025 complete (ultrathink keyword should be in place for fair comparison)

## Related Code

- `.claude/skills/adr-writer/SKILL.md` - candidate for model evaluation
- `.claude/skills/skill-creator/SKILL.md` - candidate for model evaluation
- `.claude/skills/create-design-system-rules/SKILL.md` - candidate for model evaluation
- `.claude/skills/figma-implement-design/SKILL.md` - possible 4th candidate

## Verification

```bash
# No automated verification - manual testing and analysis
# Success criteria: session memory evaluation report exists

Test-Path "e:\GitHub\draft_v0\.tasks\.memories\session\model-field-evaluation.md"

# Manual test protocol
# 1. Define 3-5 test scenarios per skill (e.g., "create ADR for using GraphQL vs REST")
# 2. Invoke skill with default model, record output + metrics
# 3. Add `model: <specified-model>` to SKILL.md frontmatter
# 4. Invoke skill with same scenarios, record output + metrics
# 5. Compare results, document findings
# 6. Revert or keep model field based on evaluation
```
