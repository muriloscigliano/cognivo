# Cognivo

**AI-native component library with cognitive psychology integration.**

143 Web Components built with Lit 3 — framework-agnostic, dark-first, accessible, powered by 1,800+ design tokens and 184 cognitive bias cards.

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

## Quick Start

### Path 1: Components Only

```bash
pnpm add @cognivo/components @cognivo/tokens
```

```html
<link rel="stylesheet" href="node_modules/@cognivo/tokens/dist/index.css">
<script type="module">
  import '@cognivo/components';
</script>

<cg-button variant="primary">Click me</cg-button>
<cg-input label="Email" type="email"></cg-input>
<cg-card variant="elevated" clickable>
  <ai-thinking variant="dots" label="Analyzing..."></ai-thinking>
</cg-card>
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

## License

MIT
