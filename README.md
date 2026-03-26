# Cognivo

**The AI-Native Component Library**

108 Web Components. 73 AI-specific. Framework-agnostic. Dark-first. 133KB gzip.

The most comprehensive component library purpose-built for AI applications. Covers every pattern from basic UI to multi-agent orchestration, RAG, safety guardrails, evaluation, and production DevOps. Works in React, Vue, Angular, Svelte, or vanilla HTML.

## What's Inside

| Category | Count | Examples |
|----------|-------|---------|
| **Foundation** | 14 | Button, Card, Badge, Callout, Image, Icon, Label, Separator |
| **Forms** | 10 | Input, Select, Checkbox, Radio, Switch, Slider, DatePicker |
| **Data & Navigation** | 11 | Table, Chart, MetricCard, Tabs, Accordion, Steps, CodeBlock |
| **AI Display** | 10 | Thinking, Badge, Chat, InsightCard, ResultPanel, StreamingText, Citation, DataCard |
| **AI Workflow** | 11 | DiffPanel, Timeline, Feedback, Search, Annotation, AgentCard, ReasoningTree, Guardrail, RagPanel |
| **AI Visualization** | 6 | Heatmap, ModelSelector, Toast, ContextWindow, EvalScorecard, SourceGraph |
| **AI Controls** | 3 | MemoryPanel, ConfidenceSlider, FormGenerator |
| **AI Production** | 10 | WorkflowBuilder, AbTest, DataTable, CostDashboard, BatchProgress |
| **AI Collaboration** | 10 | Presence, FileUpload, AudioPlayer, Onboarding, UsageMeter, StatusPage |
| **AI DevOps** | 10 | AnalyticsChart, ApiKeyManager, TestRunner, WebhookConfig, DebugConsole |
| **AI Essentials** | 13 | Sidebar, CommandPalette, Avatar, ProgressSteps, JsonViewer, CopyButton, ActionPreview, CaptureFlow, KpiGrid, AlertCard, RevealAnimation, RichMessage, ToolCardResolver |

## Quick Start

```bash
npm install @cognivo/components @cognivo/tokens
```

```html
<!-- Load tokens -->
<link rel="stylesheet" href="node_modules/@cognivo/tokens/dist/index.css">

<!-- Use any component -->
<ai-thinking text="Analyzing data" shimmer></ai-thinking>
<ai-badge score="0.92"></ai-badge>
<ai-data-card title="Invoice #1042" icon="📄"></ai-data-card>
<cg-metric-card title="Revenue" value="$2.4M" delta="+18%" trend="up"></cg-metric-card>
```

### React

```bash
npm install @cognivo/adapter-react @cognivo/components @cognivo/tokens
```

```tsx
import { AiChat, AiBadge, AiDataCard, CgButton } from '@cognivo/adapter-react';
import '@cognivo/components';
import '@cognivo/tokens/dist/index.css';

function App() {
  return (
    <div>
      <AiBadge score={0.92} size="lg" />
      <AiDataCard title="Order" fields={[
        { label: 'Total', value: '$129.99', type: 'currency' },
        { label: 'Status', value: 'Shipped', type: 'status', status: 'success' },
      ]} />
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
import { AiThinking, AiKpiGrid, CgCard } from '@cognivo/adapter-vue';
import '@cognivo/components';
import '@cognivo/tokens/dist/index.css';
</script>

<template>
  <CgCard>
    <AiThinking text="Processing" :cancelable="true" />
    <AiKpiGrid :kpis="[
      { label: 'Revenue', value: '$2.4M', delta: '+18%', trend: 'up' },
      { label: 'Users', value: '14.2K', delta: '+5%', trend: 'up' },
    ]" />
  </CgCard>
</template>
```

## AI-Native Components — What No One Else Has

### Agent Orchestration
- **`<ai-agent-card>`** — Multi-agent status with handoff chain and capabilities
- **`<ai-reasoning-tree>`** — Expandable chain-of-thought visualizer
- **`<ai-guardrail>`** — Safety filter with policy checks and admin override
- **`<ai-rag-panel>`** — RAG document display with relevance scores
- **`<ai-workflow-builder>`** — Visual DAG for agent workflow definition

### AI Display & Chat
- **`<ai-chat>`** — Production chat with streaming, markdown, actions, branching
- **`<ai-streaming-text>`** — Token-by-token renderer with cursor
- **`<ai-rich-message>`** — Chat message with embedded cards and actions
- **`<ai-data-card>`** — Compact key-value display (invoice, order, profile — any data)
- **`<ai-tool-card-resolver>`** — Dynamic card renderer for tool call results

### Observability & Evaluation
- **`<ai-context-window>`** — Token budget tracker with segmented bar
- **`<ai-eval-scorecard>`** — LLM evaluation grades (A-F) with score bars
- **`<ai-token-tracker>`** — Cost, latency, and token usage display
- **`<ai-cost-dashboard>`** — Aggregate usage over time with budget
- **`<ai-debug-console>`** — Request/response inspector

### Production & DevOps
- **`<ai-ab-test>`** — Side-by-side model/prompt comparison with voting
- **`<ai-batch-progress>`** — Batch job progress with success/fail segments
- **`<ai-api-key-manager>`** — API key CRUD with masked display
- **`<ai-test-runner>`** — AI evaluation test results display
- **`<ai-feature-flag>`** — Feature flag toggles for AI capabilities
- **`<ai-webhook-config>`** — Webhook endpoint management
- **`<ai-version-selector>`** — Model version picker with rollout %
- **`<ai-changelog>`** — Version history feed

### Collaboration & UX
- **`<ai-presence>`** — Online user indicators
- **`<ai-file-upload>`** — Drag-drop file upload for AI processing
- **`<ai-capture-flow>`** — Multi-step: upload → preview → process → result
- **`<ai-onboarding>`** — Step-by-step AI feature tutorial
- **`<ai-command-palette>`** — ⌘K command palette with fuzzy search
- **`<ai-action-preview>`** — Confirmation before executing AI actions

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
- 108 components registered with Zod schemas
- Cognitive bias analysis (`suggestBiasesForTree()`)
- Token governance (`validateTokenUsage()`)

## Design Tokens

1,768 CSS custom properties with 3-tier architecture:

```
Tier 1 (Core)     → Raw values: --cg-gray-500, --cg-spacing-16
Tier 2 (Semantic)  → Purpose: --cg-color-surface-base-text
Tier 3 (Component) → Specific: --cg-component-button-height-md
```

Dark/light themes via `data-theme` attribute. Stockify palette with neon lime `#DFFF61` accent.

## Packages

| Package | Description | Size |
|---------|-------------|------|
| `@cognivo/components` | 108 Lit Web Components | 133KB gzip |
| `@cognivo/tokens` | 1,768 CSS custom properties | 95KB |
| `@cognivo/gen-ui` | Streaming parser + registry + bias engine | 63KB |
| `@cognivo/gen-ui-lit` | Lit renderer for gen-ui | 9KB |
| `@cognivo/adapter-react` | 109 React wrappers | 14KB |
| `@cognivo/adapter-vue` | 109 Vue wrappers | 12KB |
| `@cognivo/core` | AI integration core | 49KB |

## vs Competition

| Library | Total | AI-Native | Framework | Bundle |
|---------|-------|-----------|-----------|--------|
| **Cognivo** | **108** | **73** | **Any** (Web Components) | **133KB** |
| Shoelace | 60 | 0 | Any (WC) | 80KB |
| shadcn/ui | 50 | 5 | React only | varies |
| OpenUI | 47 | 5 | React only | 434KB |
| Radix | 30 | 0 | React only | varies |
| assistant-ui | 25 | 25 | React only | varies |
| Vercel AI SDK | 15 | 15 | React only | varies |

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
