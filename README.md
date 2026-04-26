<p align="center">
  <h1 align="center">Cognivo</h1>
</p>

<p align="center">
  <strong>AI-Native Component Library + Cognitive Design System</strong>
</p>

<p align="center">
  183 Web Components &bull; 2,630 Design Tokens &bull; 181 Cognitive Biases &bull; React & Vue Adapters
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cognivo/components"><img src="https://img.shields.io/npm/v/@cognivo/components?style=flat-square&color=dfff61" alt="npm version" /></a>
  <a href="https://github.com/muriloscigliano/cognivo/blob/main/LICENSE"><img src="https://img.shields.io/github/license/muriloscigliano/cognivo?style=flat-square" alt="license" /></a>
  <a href="https://github.com/muriloscigliano/cognivo/actions"><img src="https://img.shields.io/github/actions/workflow/status/muriloscigliano/cognivo/ci.yml?style=flat-square" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@cognivo/components"><img src="https://img.shields.io/npm/dm/@cognivo/components?style=flat-square" alt="downloads" /></a>
</p>

---

183 Lit 3 Web Components (88 foundation + 89 AI-native + 6 bias wrappers), backed by a 3-tier design token system (2,630 CSS variables) and a cognitive-psychology design advisor (181 bias cards). Framework-agnostic, dark-first, accessible, with first-party React and Vue adapters, SSR support, streaming generative-UI, and an MCP server for AI-assisted design.

## Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                       Your Application                         │
├──────────┬──────────┬──────────┬────────────┬─────────────────┤
│  React   │   Vue    │ Vanilla  │ Next/Astro │  AI Streaming   │
│ adapter  │ adapter  │   HTML   │    SSR     │  gen-ui-lit     │
├──────────┴──────────┴──────────┴────────────┴─────────────────┤
│                   @cognivo/components (183)                    │
│           88 Foundation · 89 AI-Native · 6 Bias                │
├────────────────────────────┬──────────────────────────────────┤
│     @cognivo/tokens        │          @cognivo/core           │
│  3-tier · 2,630 CSS vars   │  Guardrails · Agents · Caching   │
├────────────────────────────┼──────────────────────────────────┤
│     @cognivo/gen-ui        │     @cognivo/design-advisor      │
│   Streaming parser         │       181 cognitive biases       │
│   Component registry       │        Atlas integration         │
│   Bias engine              │                                  │
├────────────────────────────┴──────────────────────────────────┤
│  adapter-openai · adapter-anthropic · analytics · ssr          │
│  theme-generator · mcp-server · eslint-plugin · claude-skill   │
└───────────────────────────────────────────────────────────────┘
```

## Installation

```bash
# Core (any framework)
npm install @cognivo/components @cognivo/tokens

# Framework adapters
npm install @cognivo/adapter-react
npm install @cognivo/adapter-vue

# AI integration
npm install @cognivo/core @cognivo/adapter-openai
npm install @cognivo/adapter-anthropic

# Generative UI
npm install @cognivo/gen-ui @cognivo/gen-ui-lit

# Cognitive design advisor
npm install @cognivo/design-advisor

# SSR (Next.js / Astro)
npm install @cognivo/ssr
```

### CDN (no build step)

```html
<link rel="stylesheet" href="https://unpkg.com/@cognivo/tokens/dist/index.css" />
<script type="module" src="https://unpkg.com/@cognivo/components/dist/cognivo.min.js"></script>
```

## Quick Start

### Vanilla HTML

```html
<link rel="stylesheet" href="https://unpkg.com/@cognivo/tokens/dist/index.css" />
<script type="module" src="https://unpkg.com/@cognivo/components/dist/cognivo.min.js"></script>

<cg-button variant="primary">Click me</cg-button>
<cg-input label="Email" type="email"></cg-input>
<ai-badge score="0.92" size="md" showPercentage></ai-badge>
```

### React

```tsx
import { CgButton, AiChat } from '@cognivo/adapter-react';
import '@cognivo/tokens/dist/index.css';

function App() {
  return (
    <CgButton variant="primary" onClick={() => alert('Hello!')}>
      Click me
    </CgButton>
  );
}
```

### Vue

```vue
<script setup>
import { CgButton, AiChat } from '@cognivo/adapter-vue';
import '@cognivo/tokens/dist/index.css';
</script>

<template>
  <CgButton variant="primary" @click="handleClick">Click me</CgButton>
</template>
```

### AI streaming UI

```bash
pnpm add @cognivo/components @cognivo/tokens @cognivo/gen-ui @cognivo/gen-ui-lit
```

```typescript
import { cognivoLibrary, createStreamingParser } from '@cognivo/gen-ui';
import { LitRenderer } from '@cognivo/gen-ui-lit';

const renderer = new LitRenderer(cognivoLibrary);
const parser = createStreamingParser(cognivoLibrary.toJSONSchema());

for await (const token of llmStream) {
  const result = parser.push(token);
  if (result.root) renderer.render(result, container);
}
```

### Full cognitive stack

```typescript
import { OpenAiClient } from '@cognivo/adapter-openai';
import { GenerativeUiClient, suggestBiasesForTree, cognivoLibrary } from '@cognivo/gen-ui';

const result = await genUiClient.generate('Show a revenue dashboard');
const biases = suggestBiasesForTree(result, cognivoLibrary);
// → [{ biasName: 'Anchoring', severity: 'high', recommendation: '...' }]
```

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [@cognivo/components](packages/components/) | 183 Lit Web Components (88 foundation · 89 AI-native · 6 bias) | 0.4.0 |
| [@cognivo/tokens](packages/tokens/) | 3-tier design tokens · 2,630 CSS vars · palette generator · WCAG validator | 0.4.0 |
| [@cognivo/core](packages/core/) | AI client: streaming, guardrails, caching, resilience, routing, observability | 0.4.0 |
| [@cognivo/gen-ui](packages/gen-ui/) | Streaming parser, component registry, bias engine (zero framework deps) | 0.4.0 |
| [@cognivo/gen-ui-lit](packages/gen-ui-lit/) | Lit renderer for generative UI trees | 0.4.0 |
| [@cognivo/adapter-openai](packages/adapter-openai/) | OpenAI client with structured outputs | 0.4.0 |
| [@cognivo/adapter-anthropic](packages/adapter-anthropic/) | Anthropic Claude adapter | 0.3.0 |
| [@cognivo/adapter-react](packages/adapter-react/) | React wrappers with TypeScript props | 0.4.0 |
| [@cognivo/adapter-vue](packages/adapter-vue/) | Vue 3 wrappers with TypeScript props | 0.4.0 |
| [@cognivo/design-advisor](packages/design-advisor/) | 181 cognitive bias cards · Atlas integration · registry | 0.4.0 |
| [@cognivo/ssr](packages/ssr/) | @lit-labs/ssr integration for Next.js and Astro | 0.4.0 |
| [@cognivo/analytics](packages/analytics/) | Opt-in, privacy-first component interaction analytics | 0.4.0 |
| [@cognivo/theme-generator](packages/theme-generator/) | CLI + SDK: prompts → tier-2 token overrides (`cognivo-theme`) | 0.4.0 |
| [@cognivo/mcp-server](packages/mcp-server/) | MCP server exposing Cognivo tools to Claude / Cursor / Windsurf | 0.4.0 |
| [@cognivo/eslint-plugin](packages/eslint-plugin-cognivo/) | ESLint rules enforcing token + interaction conventions | 0.4.0 |
| [@cognivo/claude-code-skill](packages/claude-code-skill/) | Claude Code skill for design-system-aware UI generation | private |

## Key Features

- **Dark-first design** — every component designed for dark mode with light mode support
- **3-tier token system** — core primitives → semantic → component, 2,630 CSS variables
- **5-level elevation** — consistent shadow depth across the library
- **AI-native components** — streaming text, thinking indicators, chat, reasoning trees, agent steps
- **Cognitive bias analysis** — 181 biases with a `suggestBiasesForTree()` engine
- **Generative UI** — streaming JSON parser + Lit renderer, works with any LLM
- **SSR-ready** — declarative Shadow DOM for Next.js and Astro
- **Framework adapters** — React + Vue wrappers with full TypeScript support
- **2,235 tests** across 156 files — comprehensive coverage
- **Accessible** — ARIA, keyboard navigation, focus traps, reduced motion

## Development

```bash
pnpm install           # Install all dependencies
pnpm build             # Build all packages (Turborepo cached)
pnpm test              # Run all tests
pnpm dev               # Start all dev servers (parallel)
pnpm type-check        # TypeScript validation
pnpm lint              # ESLint
pnpm test:e2e          # Playwright e2e tests
pnpm test:visual       # Playwright visual regression
```

### Per-package builds

```bash
pnpm --filter @cognivo/core build
pnpm --filter @cognivo/components build
pnpm --filter @cognivo/design-advisor build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/muriloscigliano/cognivo.git
cd cognivo
pnpm install
pnpm build
pnpm test
```

## License

[MIT](./LICENSE) · Murilo Scigliano
