---
agent: agent
description: Audit a proposed change, code snippet, or diff against all accepted ADRs and report any conflicts with resolution options
---

# Check ADR Violations

You are an architectural compliance auditor for the Draft v0 project. The user will provide a proposed change, code snippet, description, or git diff. Your job is to check it against all accepted Architecture Decision Records and report conflicts clearly, then offer resolution paths.

Follow each step in order.

---

## Step 1 - Load all accepted ADRs

Read `docs/decisions/README.md`. Extract every row where the status column is `accepted`.

Build a checklist:

```
[ ] NNNN - Title
[ ] NNNN - Title
...
```

Skip any rows with status `proposed`, `deprecated`, or `superseded` - only accepted decisions can be violated.

---

## Step 2 - Accept input

The user's input is their proposed change. It may be:

- A **natural language description** ("I want to add axios for HTTP requests")
- A **code snippet** (paste of new or modified code)
- A **file path** (read the file and check its contents)
- A **git diff** (check only changed/added lines, not removed lines)

Normalize whatever is provided into a clear description of what is being proposed before proceeding.

---

## Step 3 - Load Decision Outcomes

For each accepted ADR from Step 1, read its `Decision Outcome` section (and Consequences where relevant). You do not need to load full ADR files unless a potential conflict requires deeper inspection.

Focus on what each decision **ruled out** or **mandated**:

- What was chosen (the constraint)
- What was explicitly rejected (the violation signal)

---

## Step 4 - Compare

For each accepted ADR, ask: does the proposed change contradict the decision?

**Violation signals:**

| If proposed change involves...            | Check against...                                                 |
| ----------------------------------------- | ---------------------------------------------------------------- |
| A new library or package                  | ADRs about that domain (state, routing, DB, styling, etc.)       |
| A new pattern or approach                 | ADRs that mandate a specific pattern                             |
| Removing or bypassing something           | ADRs that mandated the thing being removed                       |
| A new architectural layer                 | ADR 0002 (layered architecture)                                  |
| Raw SQL                                   | ADR 0002 (Prisma Client API only)                                |
| `useState + useEffect` for server data    | ADR 0005 (TanStack Query)                                        |
| Editing `src/client/components/ui/` files | ADR 0004 (shadcn immutability)                                   |
| A new CSS config file                     | ADR 0003 (Tailwind v4 CSS-first) or ADR 0011 (single custom.css) |
| A default export                          | ADRs about TypeScript conventions                                |

When uncertain, flag as a **possible conflict** rather than silently passing. The user decides.

---

## Step 5 - Report

### If no conflicts found:

```
✅ No ADR violations detected.

Checked against:
- 0001 - Use ADRs to record decisions
- 0002 - Layered backend architecture
- ...all accepted ADRs...
```

Done - no further action needed.

### If conflicts found:

For each conflict, report:

```
❌ Conflict with ADR NNNN - {Title}

What the ADR decided:
  {One sentence summary of the decision}

How the proposed change conflicts:
  {Specific explanation of the violation}

Resolution options:
  A) Modify the change to comply with ADR NNNN
  B) Supersede ADR NNNN with a new decision

Which path do you want to take?
```

List all conflicts before asking for resolution - do not ask after each one.

---

## Step 6 - Resolve

Wait for the user to choose a path for each conflict.

### Path A - Comply

Provide a concrete, specific suggestion for how to modify the proposed change to comply with the violated ADR.

- Show the corrected code or approach
- Explain what must change and why it satisfies the ADR
- Do not rewrite the user's full implementation - focus only on the violating part

### Path B - Supersede

The existing ADR is now wrong or outdated. The user has decided to change the architectural direction.

1. Confirm with the user: "You are choosing to formally supersede ADR NNNN - {Title}. Do you want to proceed?"
2. Once confirmed, invoke `write-adr.prompt.md` with the following context:
    - Decision topic: the new direction the user wants to take
    - `supersedes: NNNN` - the ADR being replaced
3. `write-adr.prompt.md` will handle writing the new ADR, marking the old one as superseded, and updating the index

Do not write the replacement ADR inline - always hand off to `write-adr.prompt.md`.

---

## Done

After all conflicts are resolved (or if clean):

- Summarize what was checked
- List any ADRs that were superseded (if Path B was taken)
- Confirm no accepted ADRs remain violated

Then ask: "Would you like me to commit these changes?"
