# COGNIVO - AI-Native Component Library
## Comprehensive Project Plan & Architecture

**Last Updated:** November 16, 2025
**Status:** Initial Planning Phase

---

## 📋 Executive Summary

Cognivo is an AI-native component library that transforms how applications integrate intelligence. Unlike chatbot UIs, Cognivo embeds AI directly into visual components (cards, tables, charts) to deliver explanations, forecasts, anomaly detection, and insights within the interface itself.

**Key Differentiators:**
- AI as a feature, not a chatbot
- Structured AI outputs, not conversational text
- Framework-aware UI with LLM-agnostic backend
- Designer-first DX (not developer-centric utilities)
- 170+ components planned

---

## 🎯 Strategic Decisions

### Decision 1: Framework Strategy - **Hybrid Multi-Target Architecture**

After analyzing modern approaches (shadcn, Radix, Lit, Mitosis), we recommend:

#### **Tier 1: Core Logic Layer (Framework-Agnostic)**
- **Technology:** Pure TypeScript
- **Purpose:** AI contracts, adapters, state management, business logic
- **Output:** NPM package `@cognivo/core`

#### **Tier 2: UI Component Layer (Framework-Specific)**
- **Phase 1:** Vue 3 / Nuxt 3 (`@cognivo/vue`)
- **Phase 2:** React / Next.js (`@cognivo/react`)
- **Phase 3:** Svelte / SvelteKit (`@cognivo/svelte`)
- **Rationale:** Better DX than Web Components, framework-native patterns, type-safe

#### **Tier 3: Portable AI Primitives (Web Components)**
- **Technology:** Lit 4.0
- **Purpose:** AI-specific UI elements that work everywhere
- **Examples:** `<ai-thinking-indicator>`, `<ai-confidence-badge>`, `<ai-insight-panel>`
- **Output:** `@cognivo/primitives`

**Why This Approach:**

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Web Components Only** | True interop, future-proof | Shadow DOM complexity, styling friction, slower DX | ❌ Too restrictive |
| **Mitosis (Compile)** | Write once, compile to many | Build complexity, smaller ecosystem, debugging harder | ⚠️ Not mature enough |
| **Framework-Specific Only** | Best DX, native patterns | Lock-in, duplicate work | ⚠️ Too limiting |
| **Hybrid (Recommended)** | Shared logic + native UI + portable primitives | More complex architecture | ✅ Best balance |

---

### Decision 2: Styling Strategy - **Type-Safe Design Tokens + Vanilla Extract**

**Rejection of shadcn/Tailwind Model:**
- Tailwind = utility-first, verbose className strings
- shadcn = copy-paste distribution
- **Problem:** Not designer-friendly, hard to maintain at scale, no type safety

**Our Approach:**

```
┌─────────────────────────────────────────┐
│   Design Tokens (CSS Variables)        │
│   - colors, spacing, typography         │
│   - semantic tokens (primary, danger)   │
│   - component-specific tokens           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│   Vanilla Extract (.css.ts files)      │
│   - Type-safe styling                   │
│   - Zero runtime overhead               │
│   - Build-time static CSS               │
│   - Autocomplete & validation           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│   Component Styles                      │
│   - Scoped classes                      │
│   - Theme-aware                         │
│   - Framework-specific bindings         │
└─────────────────────────────────────────┘
```

**Example:**

```typescript
// tokens.css.ts
export const vars = createTheme({
  color: {
    primary: '#3B82F6',
    aiAccent: '#8B5CF6',
  },
  space: {
    sm: '8px',
    md: '16px',
  }
});

// InsightCard.css.ts
export const card = style({
  backgroundColor: vars.color.primary,
  padding: vars.space.md,
  borderRadius: '12px',
});
```

**Benefits:**
- Type safety (autocomplete, catch errors)
- Zero runtime cost
- Designer-friendly token system
- Framework-agnostic CSS output

---

### Decision 3: AI Architecture - **Universal AI Contract**

```typescript
// @cognivo/core

/**
 * AI Intent - What the user wants the AI to do
 */
export enum AiIntent {
  EXPLAIN = 'explain',
  SUMMARIZE = 'summarize',
  FORECAST = 'forecast',
  DETECT_ANOMALY = 'detect_anomaly',
  CLASSIFY = 'classify',
  OPTIMIZE = 'optimize',
  COMPARE = 'compare',
  CLUSTER = 'cluster',
}

/**
 * AI Context - Data sent to the LLM
 */
export interface AiContext {
  /** All visible data */
  dataset: unknown[];
  /** User-selected items */
  selection?: unknown[];
  /** Metadata: labels, timeframe, units, types */
  meta?: Record<string, unknown>;
}

/**
 * AI Result - Structured output from LLM
 */
export interface AiResult {
  /** Text explanation */
  explanation?: string;
  /** Bullet points */
  bullets?: string[];
  /** Key drivers */
  drivers?: Array<{ factor: string; impact: number }>;
  /** Confidence score */
  confidence?: number;
  /** Anomaly markers */
  anomalies?: Array<{ index: number; reason: string }>;
  /** Predicted values */
  forecast?: unknown[];
  /** Recommended actions */
  recommendations?: string[];
}

/**
 * AI Client Interface - LLM-agnostic
 */
export interface AiClient {
  runIntent(intent: AiIntent, context: AiContext): Promise<AiResult>;
}
```

**Adapters (Separate Packages):**
- `@cognivo/adapter-openai`
- `@cognivo/adapter-anthropic`
- `@cognivo/adapter-local`
- `@cognivo/adapter-custom`

**Key Principles:**
1. **LLM doesn't know about Vue/React** - Only receives standardized requests
2. **Structured outputs** - JSON schema validation, type-safe results
3. **Adapter pattern** - Swap providers without changing components
4. **Streaming support** - Real-time updates for long operations

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        APPLICATION LAYER                            │
│                   (Developer's SaaS/Dashboard)                      │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
                ┌─────────────▼──────────────┐
                │   AI Provider Setup        │
                │  <AiProvider client={...}> │
                └─────────────┬──────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌─────────▼─────────┐  ┌───────▼────────┐
│  @cognivo/vue  │  │  @cognivo/react   │  │ @cognivo/svelte│
│                │  │                   │  │                │
│ Vue Components │  │ React Components  │  │Svelte Component│
│                │  │                   │  │                │
│ - AiInsightCard│  │ - AiInsightCard   │  │- AiInsightCard │
│ - AiTable      │  │ - AiTable         │  │- AiTable       │
│ - AiMiniChart  │  │ - AiMiniChart     │  │- AiMiniChart   │
└───────┬────────┘  └─────────┬─────────┘  └───────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   @cognivo/core    │
                    │                    │
                    │ - AI Contracts     │
                    │ - Intent Registry  │
                    │ - Context Builder  │
                    │ - State Management │
                    │ - Type Definitions │
                    └─────────┬──────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐  ┌─────────▼─────────┐  ┌───────▼────────┐
│ @cognivo/      │  │  @cognivo/         │  │ @cognivo/      │
│ adapter-openai │  │ adapter-anthropic  │  │ adapter-local  │
└───────┬────────┘  └─────────┬─────────┘  └───────┬────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │    LLM Services    │
                    │                    │
                    │ OpenAI │ Claude    │
                    │ Local  │ Custom    │
                    └────────────────────┘

PLUS:

┌─────────────────────────────────────────────────────────────┐
│              @cognivo/primitives (Web Components)           │
│                                                             │
│  <ai-thinking-indicator>  <ai-confidence-badge>            │
│  <ai-insight-panel>       <ai-source-list>                 │
│                                                             │
│  → Works in ANY framework (Vue, React, Angular, vanilla)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Monorepo Structure

```
cognivo/
├── packages/
│   ├── core/                      # @cognivo/core
│   │   ├── src/
│   │   │   ├── contracts/         # AI interfaces
│   │   │   ├── intents/           # Intent definitions
│   │   │   ├── context/           # Context builders
│   │   │   ├── state/             # State management
│   │   │   └── types/             # TypeScript types
│   │   └── package.json
│   │
│   ├── tokens/                    # @cognivo/tokens
│   │   ├── src/
│   │   │   ├── colors.css.ts      # Color tokens
│   │   │   ├── spacing.css.ts     # Spacing tokens
│   │   │   ├── typography.css.ts  # Typography tokens
│   │   │   └── themes/            # Light/dark themes
│   │   └── package.json
│   │
│   ├── primitives/                # @cognivo/primitives (Lit)
│   │   ├── src/
│   │   │   ├── ai-thinking/
│   │   │   ├── ai-confidence/
│   │   │   └── ai-insight-panel/
│   │   └── package.json
│   │
│   ├── vue/                       # @cognivo/vue
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── base/          # Card, Panel, Table, etc.
│   │   │   │   ├── ai-enhanced/   # AiInsightCard, AiTable, etc.
│   │   │   │   ├── charts/        # MiniChart, LineChart, etc.
│   │   │   │   └── actions/       # AiButton, AiActionMenu
│   │   │   ├── composables/       # Vue composables
│   │   │   ├── styles/            # .css.ts files
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── react/                     # @cognivo/react (Phase 2)
│   ├── svelte/                    # @cognivo/svelte (Phase 3)
│   │
│   ├── adapter-openai/            # @cognivo/adapter-openai
│   ├── adapter-anthropic/         # @cognivo/adapter-anthropic
│   ├── adapter-local/             # @cognivo/adapter-local
│   │
│   └── playground/                # Development playground
│       ├── vue-demo/
│       ├── react-demo/
│       └── shared-examples/
│
├── docs/                          # Documentation site
│   ├── guide/
│   ├── components/
│   └── examples/
│
├── tools/                         # Build tools, scripts
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.json
└── turbo.json                     # Turborepo config
```

---

## 🛠️ Technology Stack

### Core Technologies

| Layer | Technology | Why |
|-------|------------|-----|
| **Package Manager** | pnpm | Faster, disk-efficient, workspace support |
| **Monorepo Tool** | Turborepo | Best-in-class build caching and orchestration |
| **Language** | TypeScript 5.x | Type safety, autocomplete, better DX |
| **Styling** | Vanilla Extract | Type-safe, zero-runtime, framework-agnostic CSS |
| **Design Tokens** | CSS Variables | Standard, themeable, widely supported |
| **Web Components** | Lit 4.0 | Lightweight, reactive, best WC framework |
| **Testing** | Vitest | Fast, Vite-native, great DX |
| **Documentation** | VitePress | Fast, Vue-powered, markdown-based |

### Framework-Specific

| Framework | Version | Additional Tools |
|-----------|---------|------------------|
| **Vue** | 3.5+ | Composition API, `<script setup>`, auto-import |
| **React** | 19+ | React Server Components ready |
| **Svelte** | 5+ | Runes, modern reactivity |

### AI/LLM Integration

| Provider | Package | Support |
|----------|---------|---------|
| **OpenAI** | `openai` | GPT-4, structured outputs |
| **Anthropic** | `@anthropic-ai/sdk` | Claude, prompt caching |
| **Local Models** | `ollama` / `llama.cpp` | Privacy-first, offline |
| **Custom** | Axios/Fetch | REST API wrapper |

---

## 🎨 Component Design System

### Component Categories (170+ planned)

**1. Base Layout (8 components)**
- LayoutGrid, LayoutSection, LayoutStack, LayoutContainer, LayoutSidebar, LayoutHeader, LayoutFooter, DashboardGrid

**2. Base Display (23 components)**
- Text, Heading, Label, StatText, Icon, Badge, Chip, KpiNumber, KpiDelta, etc.

**3. Data Display (18 components)**
- Table, List, DataCard, MetricCard, TransactionList, etc.

**4. Charts (18 components)**
- MiniBarChart, LineChart, DonutChart, AnomalyHighlight, ForecastCurve, etc.

**5. Interactive (14 components)**
- SearchBar, FilterPanel, SmartSearchBar, Sorter, Pagination, etc.

**6. AI-Enhanced (27 components)** ⭐
- AiInsightCard, AiTable, AiMiniChart, AiForecastCard, AiAnomalyCard, etc.

**7. AI Actions (12 components)** ⭐
- AiButton, AiExplainButton, AiForecastButton, AiActionMenu, etc.

**8. Panels & Drawers (9 components)** ⭐
- AiInsightPanel, AiExplainPanel, AiSidebar, AiResultModal, etc.

**9. System & Utility (16 components)** ⭐
- AiProvider, AiClient, AiLoadingIndicator, AiConfidenceBadge, etc.

### Component API Pattern

Every AI-enhanced component follows this pattern:

```vue
<template>
  <AiInsightCard
    :data="monthlySpending"
    :ai-actions="['explain', 'forecast']"
    :meta="{
      timeframe: 'monthly',
      currency: 'USD',
      category: 'spending'
    }"
    @ai:invoke="handleInvoke"
    @ai:result="handleResult"
    @ai:error="handleError"
  >
    <!-- Custom content slot -->
    <template #default="{ aiResult, isLoading }">
      <!-- Render data -->
    </template>

    <!-- Custom insight rendering -->
    <template #insight="{ result }">
      <!-- Custom AI result display -->
    </template>
  </AiInsightCard>
</template>
```

**Key Features:**
- `:data` - The dataset to visualize
- `:ai-actions` - Which AI capabilities to enable
- `:meta` - Context metadata for AI
- `@ai:*` - AI lifecycle events
- Slots for customization

---

## 🚀 Implementation Phases

### Phase 0: Foundation (Weeks 1-2)
- [ ] Set up monorepo (Turborepo + pnpm)
- [ ] Configure TypeScript, linting, formatting
- [ ] Create `@cognivo/core` package structure
- [ ] Define AI contracts and types
- [ ] Set up design token system
- [ ] Configure Vanilla Extract
- [ ] Create documentation site scaffold

### Phase 1: Core + Vue Basics (Weeks 3-6)
- [ ] Implement core AI client interface
- [ ] Build OpenAI adapter
- [ ] Build Anthropic adapter
- [ ] Create first 20 base components (Vue):
  - Layout: Grid, Section, Stack, Container
  - Display: Card, Text, Heading, Badge, KpiNumber
  - Data: Table, List, DataCard
  - Charts: MiniBarChart, MiniLineChart
- [ ] Implement styling system
- [ ] Create playground/demo app
- [ ] Write initial documentation

### Phase 2: AI-Enhanced Components (Weeks 7-10)
- [ ] AiInsightCard (flagship component)
- [ ] AiTable with classification/anomaly
- [ ] AiMiniChart with explanations
- [ ] AiForecastCard
- [ ] AiAnomalyCard
- [ ] AiInsightPanel (right sidebar)
- [ ] AiButton, AiActionMenu
- [ ] AI loading states and animations
- [ ] Confidence badges and source attribution

### Phase 3: Advanced AI Features (Weeks 11-14)
- [ ] Streaming AI responses
- [ ] AI context caching
- [ ] Multi-intent composition
- [ ] AI-driven clustering
- [ ] Auto-tagging system
- [ ] Smart search integration
- [ ] AI recommendations engine
- [ ] Batch AI operations

### Phase 4: Web Components Primitives (Weeks 15-16)
- [ ] Set up Lit package
- [ ] `<ai-thinking-indicator>`
- [ ] `<ai-confidence-badge>`
- [ ] `<ai-insight-panel>`
- [ ] `<ai-source-list>`
- [ ] Framework integration guides

### Phase 5: React Support (Weeks 17-20)
- [ ] Create `@cognivo/react` package
- [ ] Port 20 base components
- [ ] Port 10 AI-enhanced components
- [ ] React-specific hooks
- [ ] React playground
- [ ] React documentation

### Phase 6: Polish & Production (Weeks 21-24)
- [ ] Complete all 170+ components
- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance optimization
- [ ] Bundle size optimization
- [ ] Documentation completion
- [ ] Example applications
- [ ] Migration guides
- [ ] 1.0 Release

---

## 📊 Success Metrics

### Developer Experience
- ⏱️ **Time to First AI Component:** < 5 minutes
- 📝 **Lines of Code to Add AI:** < 10 lines
- 🎯 **Type Safety:** 100% typed, zero `any`
- 📦 **Bundle Size:** < 50kb gzipped for base components

### Component Quality
- ♿ **Accessibility:** WCAG 2.1 AA compliant
- 🧪 **Test Coverage:** > 80%
- 📱 **Responsive:** Mobile-first, all breakpoints
- 🎨 **Themeable:** Full dark mode support

### AI Integration
- 🔌 **LLM Agnostic:** 3+ adapters (OpenAI, Anthropic, Local)
- ⚡ **Streaming:** Real-time AI updates
- 💰 **Cost Efficient:** Prompt caching, batching
- 🎯 **Accuracy:** Structured outputs, schema validation

---

## 🎯 Competitive Analysis

| Feature | Cognivo | shadcn/ui | Radix UI | MUI | Ant Design |
|---------|---------|-----------|----------|-----|------------|
| **AI-Native** | ✅ Core feature | ❌ | ❌ | ❌ | ❌ |
| **Type-Safe Styling** | ✅ Vanilla Extract | ⚠️ Tailwind | ❌ Headless | ✅ Emotion | ⚠️ Less |
| **Framework Agnostic** | ✅ Multi-target | ❌ React only | ⚠️ React + adapters | ❌ React | ❌ React |
| **LLM Integration** | ✅ Built-in | ❌ | ❌ | ❌ | ❌ |
| **Distribution** | 📦 NPM packages | 📋 Copy-paste | 📦 NPM | 📦 NPM | 📦 NPM |
| **Customization** | ✅ Tokens + code | ✅ Full code access | ✅ Headless | ⚠️ Theme object | ⚠️ Less vars |
| **Designer-Friendly** | ✅ Token-based | ❌ Utility classes | ❌ Headless | ⚠️ Theme object | ✅ |

**Cognivo's Unique Position:**
- **Only AI-native component library**
- **Better than shadcn:** NPM packages, type-safe styling, framework-agnostic core
- **Better than MUI/Ant:** AI features, modern architecture, smaller bundle
- **Better than Radix:** Complete components, AI integration, visual design included

---

## 🚨 Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **LLM API Changes** | High | Abstract via adapters, version pinning |
| **Framework Churn** | Medium | Core logic agnostic, UI layer separate |
| **Styling Complexity** | Medium | Vanilla Extract + tokens, clear docs |
| **Bundle Size** | Medium | Tree-shaking, code splitting, lazy loading |
| **AI Costs** | High | Caching, batching, local model support |
| **Adoption** | High | Great docs, examples, migration guides |
| **Scope Creep** | High | Phased releases, MVP first |

---

## 💡 Open Questions & Decisions Needed

### 1. Naming Convention
- **Current:** Cognivo (cognitive + reactive)
- **Alternatives:** Tekoha, IntelliUI, AiComponents
- **Decision:** Stick with Cognivo?

### 2. Licensing
- **Options:** MIT, Apache 2.0, Dual (Open + Pro)
- **Recommendation:** MIT for library, commercial for hosted services

### 3. Hosting/Distribution
- **NPM:** Public registry (free, standard)
- **GitHub Packages:** Private option
- **JSR:** Modern registry (Deno/TypeScript-first)

### 4. AI Provider Priority
- **Phase 1:** OpenAI (most common)
- **Phase 2:** Anthropic (best for reasoning)
- **Phase 3:** Local (privacy)
- **Order OK?**

### 5. Vue vs React First
- **You mentioned Vue 3/Nuxt 3**
- **But React has larger market**
- **Decision:** Start Vue, port to React in Phase 5?

---

## 📚 Next Steps

### Immediate Actions
1. **Approve this plan** - Review and confirm architecture decisions
2. **Set up repository** - Initialize monorepo structure
3. **Configure tooling** - Turborepo, TypeScript, Vanilla Extract
4. **Create core package** - Define AI contracts
5. **Build first component** - Proof of concept
6. **Design token system** - Colors, spacing, typography

### Week 1 Checklist
- [ ] Finalize project name (Cognivo?)
- [ ] Initialize Git repository structure
- [ ] Configure monorepo (pnpm + Turborepo)
- [ ] Set up TypeScript configs
- [ ] Install core dependencies
- [ ] Create initial packages: `core`, `tokens`, `vue`
- [ ] Define AI contract interfaces
- [ ] Set up design tokens (CSS variables)
- [ ] Configure Vanilla Extract
- [ ] Create first proof-of-concept component
- [ ] Set up documentation site

---

## 📖 References

### Research Sources
- [shadcn/ui Architecture](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lit 4.0 Web Components](https://lit.dev/)
- [Mitosis Framework](https://mitosis.builder.io/)
- [Vanilla Extract](https://vanilla-extract.style/)
- [Design Tokens Best Practices](https://css-tricks.com/what-are-design-tokens/)

### Inspiration
- Vercel AI SDK (AI streaming patterns)
- Stripe Dashboard (clean data visualization)
- Linear (modern component design)
- Notion (AI integration UX)

---

**Document Version:** 1.0
**Author:** Planning Team
**Review Date:** November 16, 2025
