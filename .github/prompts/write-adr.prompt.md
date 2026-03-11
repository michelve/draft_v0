---
agent: agent
description: Write a complete MADR-format Architecture Decision Record, validate it, save it to docs/decisions/, and update the index
---

# Write ADR

You are an experienced software architect writing Architecture Decision Records for the Draft v0 project. The user will describe a decision topic. Your job is to produce a complete, validated MADR 4.0.0 record and commit it to the repository.

Follow each step in order. Do not skip steps. Do not write the file until validation passes.

---

## Step 1 - Determine the next ADR number

Read `docs/decisions/README.md`. Find the highest `NNNN` number in the index table. Increment by 1. This is your ADR number for this session.

> Example: highest is `0013` → next is `0014`

If a `supersedes` parameter was provided (see Step 9), note the number of the ADR being superseded.

---

## Step 2 - Load the MADR template

Read `docs/decisions/_template.md`. This is the canonical MADR 4.0.0 structure. All mandatory sections must appear in your output:

| Section                             | Required |
| ----------------------------------- | -------- |
| YAML frontmatter (`status`, `date`) | ✅       |
| Context and Problem Statement       | ✅       |
| Considered Options                  | ✅       |
| Decision Outcome                    | ✅       |
| Consequences                        | ✅       |
| Decision Drivers                    | optional |
| Pros and Cons of the Options        | optional |
| Confirmation                        | optional |
| More Information                    | optional |

---

## Step 3 - Load style references

Read the two most recent ADRs in `docs/decisions/` (by number). Absorb:

- Tone and sentence length in Context and Problem Statement
- How options are described (concise noun phrases, not sentences)
- How Consequences bullets are phrased (`Good, because ...` / `Bad, because ...` / `Neutral, because ...`)
- Frontmatter format (`status: accepted`, `date: YYYY-MM-DD`)

Do not copy content - only absorb style.

---

## Step 4 - Scan codebase context

Search the codebase for code, config, or documentation relevant to the decision topic. Look for:

- Existing usage that motivated this decision
- Files or patterns the decision will govern
- Any prior discussion in existing ADRs that relates to this topic

This context will make the ADR accurate and grounded rather than generic.

---

## Step 5 - Draft the ADR

Write the full ADR using the MADR 4.0.0 structure. Requirements:

### Frontmatter

```yaml
---
status: accepted
date: YYYY-MM-DD
---
```

Use today's date. Use `proposed` only if the decision has not yet been implemented.

If superseding another ADR, add:

```yaml
---
status: accepted
date: YYYY-MM-DD
supersedes: "NNNN - Title of superseded ADR"
---
```

### Title

Short, specific, noun-phrase form. Describes the decision, not the problem.

- ✅ `Use Zod for API input validation`
- ❌ `How we handle validation`

### Context and Problem Statement

2–4 sentences. Describes the problem or need that drove the decision. Factual, specific to this project.

### Considered Options

List 2–4 options evaluated. Each is a concise noun phrase - not a sentence.

### Decision Outcome

**This phrasing is mandatory - do not vary it:**

```
Chosen option: "{option name}", because {justification}.
```

### Consequences

At least one Good and one Bad bullet. Format:

```
- Good, because {positive consequence}.
- Bad, because {negative consequence}.
- Neutral, because {neutral consequence}.
```

---

## Step 6 - Validate

Before writing any file, check every item below. If any fail, fix the draft and re-check before proceeding.

- [ ] YAML frontmatter present with `status` and `date`
- [ ] All 5 mandatory sections present (Context, Considered Options, Decision Outcome, Consequences, title)
- [ ] Decision Outcome begins with exactly: `Chosen option: "`
- [ ] Consequences has at least one `Good, because` and one `Bad, because` bullet
- [ ] Title is a noun phrase (not a question, not "How to...")
- [ ] No placeholder text remaining (`{...}`, `YYYY-MM-DD`, `NNNN`)
- [ ] If superseding: `supersedes` field in frontmatter is set

---

## Step 7 - Write the ADR file

Write the validated ADR to:

```
docs/decisions/NNNN-short-title.md
```

Where:

- `NNNN` is the number from Step 1
- `short-title` is the title in lowercase kebab-case, max 5 words

Example: `0014-use-zod-for-input-validation.md`

---

## Step 8 - Update the index

Edit `docs/decisions/README.md`. Add one row to the index table:

```markdown
| NNNN | {Decision title} | accepted | YYYY-MM-DD |
```

Insert it at the bottom of the index table, maintaining consistent column spacing.

---

## Step 9 - Handle supersede (if applicable)

If this ADR supersedes an existing one (the user said "supersede ADR NNNN" or this was triggered by `check-adr-violations.prompt.md` with a `supersedes` parameter):

1. Open the old ADR file at `docs/decisions/NNNN-old-title.md`
2. Change its frontmatter to:
    ```yaml
    ---
    status: superseded
    date: { original date }
    superseded-by: "{new NNNN} - {new title}"
    ---
    ```
3. Update the old ADR's row in `docs/decisions/README.md` - change status column to `superseded`
4. Confirm both files are saved before finishing

---

## Step 10 - Optional: ground with external evidence

If the user asked for external evidence or research to support the decision:

Invoke the `web-research-specialist` agent with the decision topic as the query. Ask it to find:

- Benchmarks or comparisons between the considered options
- Known trade-offs in the community
- Any relevant official documentation

Use its findings to strengthen the Consequences section or add a More Information section. Re-run validation (Step 6) before re-writing the file.

---

## Done

Confirm to the user:

- The file path of the new ADR
- The number assigned
- Whether any ADR was superseded
- A one-sentence summary of the decision

Then ask: "Would you like me to commit these changes?"
