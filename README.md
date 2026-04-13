<p align="center">
  <h1 align="center">Cognivo</h1>
</p>

<p align="center">
  <strong>AI-Native Component Library + Cognitive Design System</strong>
</p>

<p align="center">
  143 Web Components &bull; 1,800+ Design Tokens &bull; 180 Cognitive Biases &bull; React & Vue Adapters
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@cognivo/components"><img src="https://img.shields.io/npm/v/@cognivo/components?style=flat-square&color=dfff61" alt="npm version" /></a>
  <a href="https://github.com/muriloscigliano/cognivo/blob/main/LICENSE"><img src="https://img.shields.io/github/license/muriloscigliano/cognivo?style=flat-square" alt="license" /></a>
  <a href="https://github.com/muriloscigliano/cognivo/actions"><img src="https://img.shields.io/github/actions/workflow/status/muriloscigliano/cognivo/ci.yml?style=flat-square" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@cognivo/components"><img src="https://img.shields.io/npm/dm/@cognivo/components?style=flat-square" alt="downloads" /></a>
</p>

---

143 Web Components built with Lit 3 — framework-agnostic, dark-first, accessible, powered by 1,800+ design tokens and 180 cognitive bias cards.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Your Application                   │
├──────────┬──────────┬──────────┬────────────────────┤
│  React   │   Vue    │  Vanilla │    AI Streaming     │
│ Adapter  │ Adapter  │  HTML    │     gen-ui-lit      │
├──────────┴──────────┴──────────┴────────────────────┤
│              @cognivo/components (143)                │
│         54 Foundation  +  89 AI-Native               │
├─────────────────────┬───────────────────────────────┤
│  @cognivo/tokens    │      @cognivo/core             │
│  1,800+ CSS vars    │  Guardrails, Agents, Caching   │
├─────────────────────┼───────────────────────────────┤
│  @cognivo/gen-ui    │   @cognivo/design-advisor      │
│  Streaming Parser   │   180 Cognitive Biases         │
│  Component Registry │   Psychology-based Analysis    │
│  Bias Engine        │                               │
├─────────────────────┴───────────────────────────────┤
│           @cognivo/adapter-openai                    │
│        OpenAI + Anthropic Integration                │
└─────────────────────────────────────────────────────┘
```

## Installation

```bash
# Core (any framework)
npm install @cognivo/components @cognivo/tokens

# React
npm install @cognivo/adapter-react

# Vue
npm install @cognivo/adapter-vue

# AI integration
npm install @cognivo/core @cognivo/adapter-openai

# Cognitive design advisor
npm install @cognivo/design-advisor
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

### Path 2: AI Streaming UI

```bash
pnpm add @cognivo/components @cognivo/tokens @cognivo/gen-ui @cognivo/gen-ui-lit
```

```typescript
import { cognivoLibrary, createStreamingParser } from '@cognivo/gen-ui';
import { LitRenderer } from '@cognivo/gen-ui-lit';

const renderer = new LitRenderer(cognivoLibrary);
const parser = createStreamingParser(cognivoLibrary.toJSONSchema());

// Feed LLM tokens as they stream in
for await (const token of llmStream) {
  const result = parser.push(token);
  if (result.root) renderer.render(result, container);
}
```

### Path 3: Full Cognitive Stack

```bash
pnpm add @cognivo/components @cognivo/tokens @cognivo/core @cognivo/gen-ui @cognivo/gen-ui-lit @cognivo/adapter-openai @cognivo/design-advisor
```

```typescript
import { OpenAiClient } from '@cognivo/adapter-openai';
import { GenerativeUiClient, suggestBiasesForTree, cognivoLibrary } from '@cognivo/gen-ui';

// Generate UI with bias analysis
const result = await genUiClient.generate('Show a revenue dashboard');
const biases = suggestBiasesForTree(result, cognivoLibrary);
// → [{biasName: "Anchoring", severity: "high", recommendation: "..."}]
```

## Packages

| Package | Description | Version |
|---------|------------|---------|
| [@cognivo/components](packages/components/) | 143 Lit Web Components (54 foundation + 89 AI-native) | 0.3.0 |
| [@cognivo/tokens](packages/tokens/) | 1,800+ design tokens, 3-tier system, palette generator | 0.3.0 |
| [@cognivo/core](packages/core/) | AI integration: guardrails, agents, caching, routing, conversation | 0.3.0 |
| [@cognivo/gen-ui](packages/gen-ui/) | Streaming parser, component registry, bias engine | 0.3.0 |
| [@cognivo/gen-ui-lit](packages/gen-ui-lit/) | Lit renderer for generative UI | 0.3.0 |
| [@cognivo/adapter-openai](packages/adapter-openai/) | OpenAI client with structured outputs | 0.3.0 |
| [@cognivo/adapter-react](packages/adapter-react/) | React wrappers with TypeScript props | 0.3.0 |
| [@cognivo/adapter-vue](packages/adapter-vue/) | Vue wrappers with TypeScript props | 0.3.0 |
| [@cognivo/design-advisor](packages/design-advisor/) | 184 cognitive biases, psychology-based design analysis | 0.0.1 |

## Key Features

- **Dark-first design** — every component designed for dark mode with light mode support
- **Premium interactions** — glassmorphism, ripple effects, spring animations, glow effects
- **5-level elevation system** — consistent shadow depth across the entire library
- **Floating labels** — inputs with labels that shrink and float on focus
- **AI-native components** — streaming text, thinking indicators, chat, reasoning trees
- **Cognitive bias analysis** — 180 biases detected and reported during UI generation
- **Framework adapters** — React and Vue wrappers with full TypeScript support
- **1,107 tests** — comprehensive test coverage across foundation and AI components
- **Accessible** — ARIA, keyboard navigation, focus traps, reduced motion support

## Development

```bash
pnpm install           # Install all dependencies
pnpm build             # Build all packages
pnpm test              # Run all tests
pnpm dev               # Start all dev servers
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/muriloscigliano/cognivo.git
cd cognivo
pnpm install
pnpm build
pnpm test
```

## License

[MIT](./LICENSE) - Murilo Scigliano
