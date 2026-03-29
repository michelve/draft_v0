# Figma Integration

Draft v0 includes a complete Figma-to-code pipeline that lets designers hand off work and developers implement designs with pixel-perfect accuracy - powered by MCP servers and specialized skills.

## Overview

```text
Designer creates in Figma
    ↓
Developer pastes Figma URL into chat
    ↓
figma skill fetches design context via MCP
    ↓
figma-implement-design skill generates production code
    ↓
Result: React component with Bootstrap CSS, matching the design
```

## Setup

### 1. Get a Figma Personal Access Token

1. Open [Figma](https://www.figma.com)
2. Go to **Settings** → **Account** → **Personal access tokens**
3. Create a token with **File content** read access
4. Copy the token

### 2. Configure Environment Variables

Add to your `.env` file:

```bash
FIGMA_API_KEY="your-personal-access-token"
FIGMA_FILE_ID=""          # Optional: default Figma file
FIGMA_PROJECT_ID=""       # Optional: default Figma project
```

### 3. MCP Servers

Two Figma MCP servers are pre-configured in `.vscode/mcp.json`:

| Server            | Package               | Purpose                                     |
| ----------------- | --------------------- | ------------------------------------------- |
| **figma**         | `figma-developer-mcp` | Fetch design data, screenshots, variables   |
| **figma-console** | `figma-console-mcp`   | Access Figma console for advanced debugging |

Both servers prompt for your API key on first use. You can also set it via the `FIGMA_API_KEY` environment variable.

### 4. Verify Connection

Ask the AI: "Check if Figma MCP is connected"

The **figma** skill will verify the connection and troubleshoot any issues.

## Workflow: Design to Code

### Using the Prompt Template

The fastest way is the **figma-to-code** prompt template:

1. Copy a Figma node URL (right-click a frame → **Copy link**)
2. In Copilot chat, use the prompt: "Implement this Figma design: [paste URL]"
3. The prompt chains the `figma` and `figma-implement-design` skills automatically

### What the Skills Do

**Step 1 - figma skill** fetches from Figma:

- Node structure and hierarchy
- Design tokens (colors, spacing, typography)
- Component properties and variants
- Screenshots for visual reference
- Asset URLs for images and icons

**Step 2 - figma-implement-design skill** translates to code:

- Maps Figma components to DSAi equivalents
- Converts design tokens to Bootstrap CSS classes
- Generates React 19 components with proper patterns
- Applies project conventions (named exports, path aliases, `cn()`)

### Manual Workflow

If you prefer step-by-step control:

1. **Fetch context**: "Get the design context for this Figma node: [URL]"
2. **Review**: Check the returned structure, tokens, and screenshots
3. **Implement**: "Now implement this design as a React component"
4. **Iterate**: "Adjust the spacing to match the design more closely"

## Design Token Mapping

Figma design tokens map to Bootstrap CSS / DSAi theme tokens:

| Figma Token       | Bootstrap Class                            | CSS Variable                         |
| ----------------- | ------------------------------------------ | ------------------------------------ |
| Fill / Background | `bg-background`, `bg-primary`              | `--background`, `--primary`          |
| Text color        | `text-foreground`, `text-muted-foreground` | `--foreground`, `--muted-foreground` |
| Border color      | `border-border`                            | `--border`                           |
| Border radius     | `rounded-md`, `rounded-lg`                 | `--radius`                           |
| Spacing           | `p-4`, `gap-6`, `m-2`                      | Bootstrap defaults                   |
| Typography        | `text-sm`, `font-medium`                   | Bootstrap defaults                   |

Theme tokens are defined in `src/client/index.css`. See the [project structure guide](project-structure.md) for customization.

## Component Mapping

Common Figma patterns map to DSAi components:

| Figma Pattern | DSAi Component | Import                                                         |
| ------------- | -------------- | -------------------------------------------------------------- |
| Button        | `Button`       | `import { Button } from "@/components/ui/button"`              |
| Input field   | `Input`        | `import { Input } from "@/components/ui/input"`                |
| Card          | `Card`         | `import { Card } from "@/components/ui/card"`                  |
| Dialog/Modal  | `Dialog`       | `import { Dialog } from "@/components/ui/dialog"`              |
| Dropdown      | `DropdownMenu` | `import { DropdownMenu } from "@/components/ui/dropdown-menu"` |
| Table         | `Table`        | `import { Table } from "@/components/ui/table"`                |
| Tabs          | `Tabs`         | `import { Tabs } from "@/components/ui/tabs"`                  |
| Toast         | `Sonner`       | `import { Sonner } from "@/components/ui/sonner"`              |

If a Figma component does not map to a DSAi component, a custom component is created in `src/client/components/`.

## Figma Code Connect

For recurring components, you can create `.figma.tsx` files that permanently map your React components to Figma nodes:

```tsx
// src/client/components/button.figma.tsx
import figma from "@figma/code-connect";
import { Button } from "@/components/ui/button";

figma.connect(Button, "https://figma.com/design/FILE_ID/...", {
    props: {
        label: figma.string("Label"),
        variant: figma.enum("Variant", {
            Primary: "default",
            Secondary: "secondary",
            Outline: "outline",
        }),
    },
    example: ({ label, variant }) => <Button variant={variant}>{label}</Button>,
});
```

This enables Figma's Dev Mode to show your exact React code for each component.

## Tips for Designers

1. **Use Auto Layout** - It translates cleanly to Flexbox/Grid
2. **Name your layers** - Meaningful names help generate readable component code
3. **Use components and variants** - They map directly to React component props
4. **Define design tokens** - Colors, spacing, and typography as Figma variables
5. **Share frame links** - Right-click → Copy link gives the developer the exact reference

## Troubleshooting

| Issue                     | Solution                                                          |
| ------------------------- | ----------------------------------------------------------------- |
| "Figma MCP not connected" | Check `FIGMA_API_KEY` in `.env`. Restart VS Code.                 |
| "Cannot fetch node"       | Verify the Figma URL is a frame or component (not the whole file) |
| Wrong colors              | Check that Figma tokens match the theme in `src/client/index.css` |
| Missing component         | Check available DSAi components in `src/client/components/ui/`    |

## Next Steps

- [Getting Started](getting-started.md) - Set up the project
- [Skills & Agents](skills-and-agents.md) - Full reference of Figma skills and other tools
- [Architecture Decisions](architecture-decisions.md) - Record decisions about design system choices
