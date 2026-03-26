# Cognivo

**AI-Native Component Library + Generative UI Engine + Cognitive Bias Analysis**

41 Web Components. Framework-agnostic. Dark-first design. Neon lime accent. The only component library that ships cognitive bias awareness.

## What Makes Cognivo Different

| | Cognivo | OpenUI | Radix | Shoelace |
|--|---------|--------|-------|----------|
| **Framework** | Any (Web Components) | React only | React only | Any (WC) |
| **Generative UI** | Streaming parser + 41 components | Streaming parser + 40 components | No | No |
| **Bias Analysis** | `suggestBiasesForTree()` — finds cognitive biases in generated UI | — | — | — |
| **Token Governance** | `validateTokenUsage()` — rejects magic values | — | — | — |
| **Design Tokens** | 1,760 tokens, 3 tiers, palette generator | OKLCH system | CSS vars | CSS vars |
| **Dark Mode** | Dark-first, 96% coverage | CSS media query | — | — |
| **Bundle** | ~230KB (no React dep) | ~434KB+ (React + Radix + Recharts) | — | — |

## Quick Start

```bash
# Install
pnpm add @cognivo/components @cognivo/tokens

# Use in HTML
<script type="module">
  import '@cognivo/components';
</script>
<link rel="stylesheet" href="@cognivo/tokens/dist/index.css">

<cg-button label="Get Started" variant="primary"></cg-button>
<cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up"></cg-metric-card>
```

```bash
# Use in React
pnpm add @cognivo/adapter-react
```

```tsx
import { CgButton, CgMetricCard } from '@cognivo/adapter-react';

<CgButton label="Get Started" variant="primary" />
<CgMetricCard title="Revenue" value="$2.4M" delta="+18%" trend="up" />
```

## Packages

| Package | Description | Size |
|---------|-------------|------|
| `@cognivo/components` | 41 Lit 3 Web Components across 4 categories | 230KB |
| `@cognivo/tokens` | 1,760 design tokens (3 tiers), palette generator | 94KB CSS |
| `@cognivo/gen-ui` | Streaming parser, component registry, prompt gen, bias engine | 63KB |
| `@cognivo/gen-ui-lit` | Lit renderer for generative UI | 9KB |
| `@cognivo/adapter-react` | 42 React wrappers with TypeScript types | 8KB |
| `@cognivo/adapter-vue` | 42 Vue 3 wrappers | 4KB |
| `@cognivo/core` | AI orchestration (intents, guardrails, resilience, caching) | 49KB |
| `@cognivo/adapter-openai` | OpenAI adapter with structured outputs | 242KB |
| `@cognivo/adapter-anthropic` | Anthropic Claude adapter | 17KB |
| `@cognivo/design-advisor` | 180 cognitive bias cards + registry | 6KB |

## Component Categories

### Foundation (13)
`Stack` · `Separator` · `Text` · `Icon` · `Label` · `Button` · `ButtonGroup` · `Card` · `Badge` · `BadgeGroup` · `Callout` · `Image` · `ImageBlock`

### Forms (9)
`Input` · `Textarea` · `Select` · `Checkbox` · `Radio` · `Switch` · `Slider` · `DatePicker` · `Form`

### Data & Navigation (11)
`MetricCard` · `Table` · `Chart` · `ImageGallery` · `Tabs` · `Accordion` · `Steps` · `Carousel` · `CodeBlock` · `Markdown` · `List` · `Section`

### AI-Native (7) — *The Differentiator*
`AiThinking` · `AiBadge` · `AiInsightCard` · `AiResultPanel` · `AiChartSummary` · `FollowUp` · `AiChat`

## Generative UI Engine

LLMs generate UI by outputting a compact DSL. Cognivo parses it in real-time and renders live Web Components.

```typescript
import { cognivoLibrary, createStreamingParser, suggestBiasesForTree } from '@cognivo/gen-ui';
import { LitRenderer } from '@cognivo/gen-ui-lit';

// 1. Generate system prompt from component library
const prompt = cognivoLibrary.prompt();

// 2. Stream LLM output through the parser
const parser = createStreamingParser(cognivoLibrary.toJSONSchema());
for await (const chunk of llmStream) {
  const result = parser.push(chunk);
  renderer.render(result, container); // Live Web Components appear
}

// 3. Analyze for cognitive biases
const biases = suggestBiasesForTree(result, cognivoLibrary);
// → [{ biasName: "Anchoring Bias", severity: "high", components: ["MetricCard"], recommendation: "..." }]
```

## Design Token System

3-tier architecture with a palette generator:

```
Tier 1 (Primitives)  →  Tier 2 (Semantic)  →  Tier 3 (Component)
  gray-500: #71717A       color-text-muted       component-button-height-md
  spacing-16: 16px        color-surface-card      component-card-radius
  brand-primary: #DFFF61  color-action-primary    component-input-height-lg
```

```bash
# Switch palette
node packages/tokens/generate-from-palette.cjs palettes/my-brand.json
pnpm --filter @cognivo/tokens build
# → Entire design system regenerates
```

## Development

```bash
pnpm install
pnpm build                              # Build all packages
pnpm --filter @cognivo/components test   # Run component tests (273)
pnpm --filter @cognivo/gen-ui test       # Run engine tests (110)

# Start the demo
cd apps/gen-ui-demo && pnpm dev
# → Showcase: /showcase.html
# → Playground: / (supports real OpenAI streaming)
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  @cognivo/gen-ui (Pure TypeScript — zero framework deps)    │
│  Parser · Registry · Prompt Gen · Bias Engine · Validation  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐
│ gen-ui-lit   │ │ React    │ │ Vue      │
│ Lit renderer │ │ wrappers │ │ wrappers │
│ → <cg-*>    │ │ (42)     │ │ (42)     │
└──────────────┘ └──────────┘ └──────────┘
        │
┌──────────────────────────────────────┐
│ @cognivo/components (41 Lit WCs)     │
│ + @cognivo/tokens (1,760 CSS vars)   │
└──────────────────────────────────────┘
```

## License

MIT
