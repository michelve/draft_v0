---
status: backlog
created: 2026-03-08
updated: 2026-03-08
---

# 0001-create-write-adr-prompt-template

## Deliverable

A `.github/prompts/write-adr.prompt.md` file that, when invoked in VS Code Copilot Chat, walks the agent through the full ADR-writing workflow: reads context from existing ADRs, drafts a complete MADR-format decision record, validates it, writes the file to `docs/decisions/NNNN-short-title.md`, and updates the index in `docs/decisions/README.md` — all in one invocation.

## Context and Motivation

The project mandates ADR writing for qualifying decisions (`docs/decisions/adr.instructions.md`), but currently there is no named entry point or prompt that packages the full workflow. Engineers have to remember all the rules manually. The plan was developed by adapting a multi-agent ADR writer article ([piethein.medium.com](https://piethein.medium.com/building-an-architecture-decision-record-writer-agent-a74f8f739271)) to Draft v0's existing toolchain. The article's three-agent chain (Writer → Validator → Markdown Writer) maps cleanly to a single prompt with named steps.

The plan notes are stored at `/memories/session/plan.md` (session scope). Key decisions are captured in the Key Decisions section below.

**Current state**: 13 ADRs exist (`docs/decisions/0001` – `0013`), next number is `0014`.

## Key Decisions

- **Prompt, not a Python app** — We already have VS Code file tools, MADR template, and 13 reference ADRs. A `.prompt.md` file is the right form factor for this project.
- **Inline validator step** — No separate validator agent. Validation is a named, numbered step inside the prompt that must pass before the file is written.
- **Web research is optional** — Include a conditional step that invokes `web-research-specialist` agent only when the user explicitly asks for external evidence grounding.
- **9-step workflow** — Read index → Read template → Read style references → Scan codebase for context → Draft → Validate → Write file → Update index → (Optional) web research.
- **MADR 4.0.0 format** — Mandatory sections: YAML frontmatter (`status`, `date`), Context and Problem Statement, Considered Options, Decision Outcome (`Chosen option: "X", because Y` phrasing), Consequences (`* Good/Bad/Neutral, because ...`).
- **Supersede flow support** — When invoked by the violation checker (task `0004`) to replace an existing ADR, `write-adr.prompt.md` must accept a `supersedes: NNNN` parameter that: sets `status: superseded` on the old ADR, adds a link to the replacement, and sets `status: accepted` on the new one.

## Acceptance Criteria

- [ ] Given `docs/decisions/README.md` shows the highest number is 0013, when the prompt runs, then it determines the next number is `0014` and names the file `0014-<slug>.md`
- [ ] Given the user provides a decision topic, when the prompt completes, then all 5 mandatory MADR sections are present in the output file (frontmatter, Context, Considered Options, Decision Outcome, Consequences)
- [ ] Given the prompt completes successfully, when `docs/decisions/README.md` is checked, then it contains a new row in the index table with the correct number, title, and status
- [ ] Given the Decision Outcome section is drafted, when validation runs, then the phrasing matches `Chosen option: "X", because Y` exactly
- [ ] Given a mandatory section is missing or incomplete, when the validation step runs, then the prompt stops and asks the user to provide the missing information before writing the file
- [ ] Given the user requests external evidence, when the optional step is reached, then the prompt instructs the agent to invoke the `web-research-specialist` agent before finalizing the ADR
- [ ] Given the prompt is invoked with a `supersedes: NNNN` parameter (from the violation checker), when the workflow completes, then the old ADR file has `status: superseded` + a `superseded-by: NNNN` link, and the new ADR has `status: accepted`
- [ ] Given the file is written, when `pnpm typecheck` is run, then it still passes (prompt file does not introduce TS errors)

## Out of Scope

- No Python app, Gradio UI, Streamlit, or Azure OpenAI setup
- No separate `adr-writer` agent (registered in task 0002)
- No skill file (created in task 0003)
- Does not handle bulk ADR creation (one per invocation)
- Violation detection — detecting that a proposed change conflicts with an existing ADR is handled by task `0004` (`check-adr-violations`)

## Dependencies

- `docs/decisions/_template.md` — must exist (it does, MADR 4.0.0)
- `docs/decisions/README.md` — must exist and contain index table (it does, 13 rows)
- `.github/prompts/` directory — must exist (it does, 12 prompts already)

## Related Code

- `docs/decisions/_template.md` — the MADR 4.0.0 template to embed/reference in prompt steps
- `docs/decisions/README.md` — read for numbering, write to update index
- `.github/instructions/adr.instructions.md` — rules the prompt must comply with
- `.github/prompts/commit.prompt.md` — style reference for how prompts are structured in this project
- `docs/decisions/0013-*.md` (and nearby) — style reference for ADR phrasing

## Verification

```bash
# No build artifacts — verify prompt file exists and is valid markdown
Test-Path ".github/prompts/write-adr.prompt.md"

# Invoke the prompt manually with a test topic:
# "@workspace /write-adr document the decision to use Zod for input validation"
# Then confirm:
# 1. File docs/decisions/0014-use-zod-for-input-validation.md was created
# 2. All 5 mandatory MADR sections present
# 3. Decision Outcome uses "Chosen option: ..." phrasing
# 4. docs/decisions/README.md index table has new row for 0014

pnpm typecheck
```
