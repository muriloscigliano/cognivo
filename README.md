# Cognivo

**The AI-Native Component Library**

54 Web Components. 19 AI-specific. Framework-agnostic. Dark-first. 70KB gzip.

The only component library purpose-built for AI applications — with streaming text, tool indicators, confidence badges, execution timelines, model selectors, and cognitive bias analysis. Works in React, Vue, Angular, Svelte, or vanilla HTML.

## What's Inside

| Category | Count | Examples |
|----------|-------|---------|
| **Foundation** | 14 | Button, Card, Badge, Callout, Image, Icon, Label, Separator |
| **Forms** | 10 | Input, Select, Checkbox, Radio, Switch, Slider, DatePicker |
| **Data & Navigation** | 11 | Table, Chart, Tabs, Accordion, Steps, CodeBlock, Markdown |
| **AI Display** | 9 | Thinking, Badge, Chat, InsightCard, ResultPanel, StreamingText, Citation, ToolIndicator |
| **AI Workflow** | 7 | DiffPanel, Timeline, Feedback, TokenTracker, PromptEditor, Search, Annotation |
| **AI Visualization** | 3 | Heatmap, ModelSelector, Toast |

## Quick Start

```bash
npm install @cognivo/components @cognivo/tokens
```

```html
<!-- Load tokens -->
<link rel="stylesheet" href="node_modules/@cognivo/tokens/dist/index.css">

<!-- Use components -->
<ai-thinking text="Analyzing data" shimmer></ai-thinking>

<ai-badge score="0.92"></ai-badge>

<ai-token-tracker inputTokens="423" outputTokens="156" cost="0.0024" latency="1200" model="GPT-4o"></ai-token-tracker>

<cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up"></cg-metric-card>
```

### React

```bash
npm install @cognivo/adapter-react @cognivo/components @cognivo/tokens
```

```tsx
import { AiChat, AiBadge, CgButton } from '@cognivo/adapter-react';
import '@cognivo/components'; // Register web components
import '@cognivo/tokens/dist/index.css';

function App() {
  return (
    <div>
      <AiBadge score={0.92} size="lg" />
      <CgButton variant="primary">Click me</CgButton>
    </div>
  );
}
```

### Vue

```bash
npm install @cognivo/adapter-vue @cognivo/components @cognivo/tokens
```

```vue
<script setup>
import { AiThinking, CgCard } from '@cognivo/adapter-vue';
import '@cognivo/components';
import '@cognivo/tokens/dist/index.css';
</script>

<template>
  <CgCard>
    <AiThinking text="Processing" :cancelable="true" />
  </CgCard>
</template>
```

## AI Components — No Competitor Has These

### `<ai-chat>` — Production Chat Interface
Streaming, markdown rendering, message actions (copy/retry/rate), branching, follow-up suggestions, conversation export.

### `<ai-thinking>` — Full Loading System
3 variants (dots, spinner, skeleton), stages, tool call indicators, cancel button, progress bar, 200ms delay.

### `<ai-streaming-text>` — Token-by-Token Renderer
Append text programmatically, markdown support, blinking cursor, XSS-safe.

### `<ai-timeline>` — Execution Transparency
Show agent steps: pending → active → complete → error. Duration bars, expandable details, tool badges.

### `<ai-diff-panel>` — Model Output Comparison
Side-by-side or inline diff with change stats. For A/B testing, prompt iterations.

### `<ai-feedback>` — RLHF Widget
Thumbs, stars, or emoji mode. Issue tags, optional comment, submitted confirmation.

### `<ai-token-tracker>` — Cost & Usage Display
Compact or detailed mode. Input/output tokens, cost, latency, budget progress bar.

### `<ai-model-selector>` — Agent/Model Picker
Cards with capabilities, cost tier, search/filter. Multi-select for comparison.

### `<ai-heatmap>` — Matrix Visualization
Confusion matrices, correlation tables. SVG, tooltips, clickable cells, color scales.

### `<ai-annotation>` — Text Labeling
Highlight text with labels and confidence scores. For ML labeling, document review.

## Generative UI Engine

```bash
npm install @cognivo/gen-ui @cognivo/gen-ui-lit
```

LLMs generate component-lang, Cognivo renders it:

```
root = Stack([header, metrics], "column", "lg")
header = TextContent("Dashboard", "2xl", "bold")
metrics = Stack([kpi1, kpi2], "row", "md")
kpi1 = MetricCard("Revenue", "$2.4M", "+18%", "up")
kpi2 = MetricCard("Users", "14.2K", "+5%", "up")
```

Features:
- Streaming parser (renders tokens as they arrive)
- 54 components registered with Zod schemas
- Cognitive bias analysis (`suggestBiasesForTree()`)
- Token governance (`validateTokenUsage()`)

## Design Tokens

1,768 CSS custom properties with 3-tier architecture:

```
Tier 1 (Core)     → Raw values: --cg-gray-500, --cg-spacing-16
Tier 2 (Semantic)  → Purpose: --cg-color-surface-base-text, --cg-color-action-primary-background
Tier 3 (Component) → Specific: --cg-component-button-height-md
```

Dark/light themes via `data-theme` attribute. Stockify palette with neon lime `#DFFF61` accent.

## Packages

| Package | Description | Size |
|---------|-------------|------|
| `@cognivo/components` | 54 Lit Web Components | 70KB gzip |
| `@cognivo/tokens` | 1,768 CSS custom properties | 95KB |
| `@cognivo/gen-ui` | Streaming parser + registry + bias engine | 63KB |
| `@cognivo/gen-ui-lit` | Lit renderer for gen-ui | 9KB |
| `@cognivo/adapter-react` | 55 React wrappers | 10KB |
| `@cognivo/adapter-vue` | 55 Vue wrappers | 8KB |
| `@cognivo/core` | AI integration core | 49KB |

## Development

```bash
pnpm install
pnpm build          # Build all packages
pnpm dev            # Start showcase at localhost:3456

# Testing
pnpm --filter @cognivo/components test   # 370+ unit tests
pnpm --filter @cognivo/gen-ui test       # 110 parser tests
npx playwright test                       # 20 E2E tests
```

## License

MIT
