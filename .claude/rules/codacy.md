---
description: "Codacy analysis rules for automated code quality checks"
---

# Codacy Analysis Rules

## After ANY File Edit

Immediately run `codacy_cli_analyze` for each edited file:
- `rootPath`: workspace path
- `file`: path of the edited file
- `tool`: leave empty

If issues are found in new edits, propose and apply fixes.

## After Dependency Changes

After npm/yarn/pnpm install, package.json changes, requirements.txt, pom.xml, or build.gradle modifications:
- Run `codacy_cli_analyze` with `tool: "trivy"`
- If vulnerabilities found: stop, fix them, then continue

## When Codacy CLI Not Installed

Ask the user: "Codacy CLI is not installed. Would you like me to install it now?"
- If yes: run `codacy_cli_install` tool
- If no: inform user they can disable automatic analysis in extension settings

## General Rules

- Use standard filesystem paths (not URL-encoded) for `rootPath`
- Do not analyze for duplicated code or code complexity metrics
- Do not analyze for code coverage
- Do not manually install Codacy CLI via brew, npm, npx, etc.
- When calling with `repository`/`organization` params and getting 404: offer to run `codacy_setup_repository`
