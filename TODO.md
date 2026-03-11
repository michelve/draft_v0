# TODO

## Skills

- [ ] Move skills into their own plugins
- [ ] Continuously revise and iterate on existing skills - tighten triggers, improve output quality, reduce hallucinations
- [ ] Build a dedicated Figma workflow skill - design tokens → component → Code Connect in one guided flow
- [ ] Integrate Playwright into the Figma workflow - screenshot Figma frame, implement component, screenshot result, diff for fidelity check

## Prompts

- [ ] Enhance existing prompt templates with richer context and step sequencing
- [ ] Add a `design-review` prompt - compares implemented component against Figma spec using Playwright screenshot diff
- [ ] Add a `onboard` prompt - walks a new team member through the project conventions and AI setup

## Agents

- [ ] Improve agent instructions - clearer exit criteria, better error recovery, tighter scope per agent
- [ ] Add a `design-qa` agent - autonomous Figma-to-screenshot fidelity checker using Playwright

## Setup & Onboarding

- [ ] Build a better init setup flow - user chooses their AI platform at project init (VS Code Copilot, Claude Code, Cursor, etc.) and gets the right skill/instruction files configured automatically
- [ ] Make it easy to opt in/out of individual skills without editing config files manually

## Integrations

- [ ] Playwright + Figma integration - use Playwright to validate implemented designs match Figma specs pixel-by-pixel as part of CI
