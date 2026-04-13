# Contributing to Cognivo

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/muriloscigliano/cognivo.git
cd cognivo

# Install dependencies (requires pnpm 9+ and Node.js 20+)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Start dev mode (watch all packages)
pnpm dev
```

## Project Structure

```
cognivo/
├── packages/
│   ├── components/       # 143 Lit web components
│   ├── tokens/           # 1,800+ design tokens
│   ├── core/             # AI client interfaces
│   ├── adapter-react/    # React wrappers
│   ├── adapter-vue/      # Vue wrappers
│   ├── adapter-openai/   # OpenAI adapter
│   ├── adapter-anthropic/# Anthropic adapter
│   ├── design-advisor/   # 180 cognitive biases
│   ├── gen-ui/           # Streaming UI parser
│   ├── gen-ui-lit/       # Lit renderer
│   └── mcp-server/       # MCP server for AI agents
├── docs/                 # Astro documentation site
└── apps/                 # Demo applications
```

## Making Changes

### 1. Create a branch

```bash
git checkout -b feat/my-feature
```

### 2. Make your changes

Follow these conventions:

- **Components**: Use Shadow DOM via Lit, prefix with `cg-` (foundation) or `ai-` (AI-native)
- **CSS**: All values from design tokens — no raw hex, no magic numbers
- **Tokens**: Follow the 3-tier system (Tier 3 > Tier 2 > Tier 1)
- **TypeScript**: Strict mode, no `any` types
- **Tests**: Add tests for new components/features

### 3. Add a changeset

If your change affects a published package:

```bash
pnpm changeset
```

This will prompt you to:
1. Select which packages are affected
2. Choose the semver bump type (patch/minor/major)
3. Write a summary of the change

### 4. Run checks

```bash
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm type-check   # Check types
pnpm lint         # Lint code
```

### 5. Submit a PR

Push your branch and open a pull request against `main`.

## Code Conventions

### Token System

All CSS values must come from design tokens:

```css
/* Correct */
padding: var(--cg-spacing-16);
background: var(--cg-color-action-primary-background-default);
border-radius: var(--cg-component-button-radius-md);

/* Wrong */
padding: 16px;
background: #3b82f6;
border-radius: 8px;
```

### Component Naming

- Foundation: `<cg-button>`, `<cg-input>`, `<cg-modal>`
- AI-native: `<ai-chat>`, `<ai-badge>`, `<ai-reasoning-tree>`
- Design advisor: `<bias-card>`, `<bias-atlas>`

### Commit Messages

Use conventional commits:

```
feat: add new cg-date-range-picker component
fix: correct focus trap in cg-modal
docs: update token tier documentation
test: add tests for ai-chat streaming
```

## Releasing

Releases are automated via GitHub Actions + Changesets:

1. Merge PRs with changesets to `main`
2. The publish workflow creates a "Version Packages" PR
3. Merging that PR publishes to npm automatically

## Questions?

Open an issue on [GitHub](https://github.com/muriloscigliano/cognivo/issues).
