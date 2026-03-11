# Project Agents

This file describes available AI agents and their capabilities. Recognized by GitHub Copilot and Cursor.

## adr-writer

Write, validate, and commit Architecture Decision Records in MADR 4.0.0 format. Reads the ADR index to determine the next number, loads the template and recent ADRs for style context, drafts all mandatory sections, validates phrasing ("Chosen option: X, because Y"), writes to `docs/decisions/NNNN-title.md`, and updates the README index. Handles the supersede flow when triggered by the violation checker - marks the old ADR as `superseded` and writes the replacement. Invokes `web-research-specialist` for external evidence grounding when requested. Use when creating, documenting, or superseding any architectural decision.

## auto-error-resolver

Automatically resolve TypeScript compilation and build errors systematically. Runs `tsc --noEmit`, categorizes errors, fixes root causes first, then cascading errors. Verifies zero compilation errors before finishing. Monorepo-aware.

## code-architecture-reviewer

Review code for best practices, architectural consistency, and system integration. Checks TypeScript strict mode compliance, layered architecture adherence, React/TanStack Query patterns, and integration with existing services. Saves reviews with critical/important/minor severity.

## code-refactor-master

Refactor code for better organization, cleaner architecture, and improved maintainability. Tracks all file dependencies before moving files. Enforces max 300 LOC per component, max 5 nesting levels. Replaces improper loading patterns with LoadingOverlay/SuspenseLoader. Zero broken imports guarantee.

## documentation-architect

Create, update, or enhance documentation for any codebase part. Systematic context gathering from memory, /docs/, and source files. Produces developer guides, API docs, data flow diagrams. Follows best practices for hierarchy, code examples, and cross-references.

## plan-reviewer

Review development plans before implementation. Deep system analysis, database impact assessment, gap analysis (error handling, rollback, monitoring), risk assessment with mitigation strategies. Catches issues before they become implementation roadblocks.

## principal-engineer

Apply rigorous first-principles engineering analysis (John Carmack-style thinking). Questions assumptions, challenges best practices, demands benchmarks and data. "Simple over clever" - eliminates unnecessary complexity. Analyzes time/space complexity and performance implications.

## refactor-planner

Analyze code structure and create comprehensive refactoring plans with risk assessment. Identifies code smells, documents dependencies and breaking changes, creates step-by-step migration plans with effort estimates.

## web-research-specialist

Research information on the internet for debugging, finding solutions, and gathering comprehensive information. Generates multiple search query variations, searches GitHub issues, Reddit, Stack Overflow, blogs, and official docs. Compiles findings with source links and reliability assessments.
