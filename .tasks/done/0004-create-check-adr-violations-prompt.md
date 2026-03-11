---
status: done
created: 2026-03-08
updated: 2026-03-08
---

# 0004-create-check-adr-violations-prompt

## Deliverable

A `.github/prompts/check-adr-violations.prompt.md` file that, when invoked, audits a proposed change or code diff against all existing accepted ADRs, reports any conflicts with the specific ADR that is violated, and offers two resolution paths: (a) modify the change to comply, or (b) supersede the ADR by invoking `write-adr.prompt.md`.

## Context and Motivation

The current ADR system fires reactively only during implementation - it does not catch cases where a proposed change or a PR violates a _previous_ architectural decision. This is the most painful gap: a developer could unknowingly reintroduce `useState + useEffect` for server data (violates ADR 0005 - TanStack Query), or add a raw SQL query (violates ADR 0002 - Prisma Client API only), and the violation only gets caught in code review if someone remembers.

This prompt closes that gap by giving engineers and agents an audit tool they can invoke at any point:

- Before implementing a feature ("would using library X violate any ADR?")
- During PR review ("does this diff conflict with any accepted decisions?")
- Historically ("has this area of the codebase accumulated any ADR drift?")

The violation checker is also the entry point for the **supersede flow** - when a violation is intentional (the decision itself is now wrong), it triggers `write-adr.prompt.md` with `supersedes: NNNN` to formally replace the old ADR.

## Key Decisions

- **Audit prompt, not an agent** - like `write-adr.prompt.md`, a `.prompt.md` file is the right form factor; it runs inside VS Code Copilot Chat with access to file tools and the full codebase
- **Two resolution paths, always offered** - never assume which path the user wants; always present both (comply vs supersede) and wait for the user to choose
- **Load Decision Outcome sections only, not full ADRs** - full ADRs are verbose; the violation check only needs the decision (what was chosen) and consequences (what it ruled out). Load concise summaries unless a full ADR needs to be inspected
- **Input flexibility** - accept: a natural language description, a file path, a code snippet, or a git diff; the prompt normalizes all to the same check
- **Supersede handoff is explicit** - when the user chooses path (b), the prompt instructs the agent to invoke `write-adr.prompt.md` with `supersedes: NNNN`, it does not try to write the new ADR inline
- **No false positives over false negatives** - when uncertain whether something violates an ADR, surface it as a "possible conflict" rather than silently passing; the user decides

## Acceptance Criteria

- [ ] Given a code snippet using `useState + useEffect` to fetch API data, when the prompt runs, then it identifies a conflict with ADR 0005 (TanStack Query over useState+useEffect) and names the specific ADR number and title
- [ ] Given a change description with no ADR conflicts, when the prompt runs, then it returns a clean result with the list of ADRs checked so the user knows the scope of the audit
- [ ] Given a conflict is found, when the result is presented, then both resolution paths are clearly offered: (a) modify the change to comply, (b) supersede the ADR - and the prompt waits for user choice before taking action
- [ ] Given the user selects path (b) supersede, when the prompt continues, then it invokes `write-adr.prompt.md` with `supersedes: NNNN` and does not write the replacement ADR inline itself
- [ ] Given the user selects path (a) comply, when the prompt continues, then it provides a concrete suggestion for how to modify the change to comply with the violated ADR
- [ ] Given a git diff is provided as input, when the prompt runs, then it parses the diff and checks changed lines/patterns against ADR decisions (not file scaffolding)
- [ ] Given only `status: accepted` ADRs exist in the index, when the prompt loads ADRs, then it skips `proposed`, `deprecated`, and `superseded` entries - only accepted decisions can be violated
- [ ] Given `pnpm typecheck` is run after the file is created, then it still passes

## Out of Scope

- Does not replace linting or TypeScript checks - focuses on architectural decisions, not code style
- Does not auto-fix violations - suggests fixes, user approves
- Does not write the superseding ADR itself - hands off to `write-adr.prompt.md`
- No separate violation-detection agent (routed via orchestrator routing table in task 0002)
- No CI/CD integration in this task - that is a future task (could become a pre-commit hook or PR check)

## Dependencies

- Task `0001` must be completed - violation checker hands off to `write-adr.prompt.md` for the supersede flow
- `docs/decisions/README.md` - must be readable to load accepted ADR list (it is)
- Individual ADR files in `docs/decisions/` - must be readable for Decision Outcome section extraction (they are)

## Related Code

- `docs/decisions/README.md` - status column used to filter accepted ADRs
- `docs/decisions/0005-tanstack-over-nextjs.md` - primary example for violation scenario (useState+useEffect vs TanStack Query)
- `docs/decisions/0002-layered-backend-architecture.md` - example: raw SQL violates Prisma-only rule
- `.github/prompts/write-adr.prompt.md` - invoked for supersede path (task 0001)
- `.github/prompts/commit.prompt.md` - style reference for prompt structure

## Verification

```bash
# Prompt file exists
Test-Path ".github/prompts/check-adr-violations.prompt.md"

# Manual test 1 - known violation:
# "@workspace /check-adr-violations review this: const [data, setData] = useState(null); useEffect(() => { fetch('/api/users').then(r => r.json()).then(setData) }, [])"
# Expected: conflict with ADR 0005, both resolution paths offered

# Manual test 2 - clean change:
# "@workspace /check-adr-violations review this: const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })"
# Expected: clean result, list of ADRs checked

# Manual test 3 - supersede flow:
# Trigger violation → select "supersede" → confirm write-adr.prompt.md is invoked with supersedes param

pnpm typecheck
```
