# Cognivo Implementation Plan
## Web Components (Lit) - AI-Native Component Library

**Date:** November 16, 2025
**Status:** Phase 0 - Foundation Complete ✅
**Next:** Phase 1 - Core Components & OpenAI Adapter

---

## ✅ Completed: Phase 0 - Foundation

### Planning Documents
- [x] PROJECT_PLAN.md - Complete architecture & roadmap
- [x] FRAMEWORK_COMPARISON.md - Framework approach analysis
- [x] AI_INTEGRATION_GUIDE.md - AI integration examples
- [x] TECHNOLOGY_STACK.md - Technology decisions

### Project Structure
- [x] Monorepo setup (Turborepo + pnpm)
- [x] TypeScript configuration (strict mode)
- [x] ESLint + Prettier configuration
- [x] Package structure created

### Core Package (@cognivo/core)
- [x] AI Intent enum (EXPLAIN, FORECAST, DETECT_ANOMALY, etc.)
- [x] Context and Result type definitions
- [x] Base AI Client interface
- [x] Context Builder with fluent API
- [x] Validation and formatting utilities

### Design Tokens (@cognivo/tokens)
- [x] Transformed from Pay Advantage to Cognivo
- [x] All `--pa--` prefixes renamed to `--cg--`
- [x] Created brand-cognivo.json with AI-focused colors
- [x] Purple/Violet primary (#8B5CF6) for AI accent
- [x] Tech Blue secondary (#3B82F6)
- [x] AI-specific tokens (ai-accent, ai-highlight, ai-background, etc.)
- [x] Style Dictionary build system
- [x] Light and dark theme support
- [x] 3-tier token architecture (Core, Semantic, Component)

---

## 🎯 Architectural Decisions Finalized

### 1. **Web Components with Lit** ✅
**Why:**
- Works in ANY framework (Vue, React, Angular, Svelte, vanilla)
- Future-proof (web standard)
- One codebase, no framework churn
- Perfect for data display components

### 2. **Design System**
```
@cognivo/tokens (CSS custom properties)
    ↓
@cognivo/components (Lit web components)
    ↓
Optional framework wrappers (@cognivo/vue, @cognivo/react)
```

### 3. **AI Architecture**
```
Component → @cognivo/core → Adapter → LLM
```

All AI logic is framework-agnostic. Components just call `aiClient.runIntent()`.

---

## 📦 Package Structure

```
cognivo/
├── packages/
│   ├── core/              ✅ AI logic (TypeScript)
│   ├── tokens/            ✅ Design tokens (Style Dictionary)
│   ├── components/        🆕 Lit web components (NEXT)
│   ├── vue/               🔜 Vue wrapper (optional)
│   ├── react/             🔜 React wrapper (optional)
│   ├── adapter-openai/    🆕 OpenAI integration (NEXT)
│   ├── adapter-anthropic/ 🔜 Anthropic integration
│   └── adapter-local/     🔜 Local LLM support
├── docs/                  🔜 VitePress documentation
└── tools/                 🔜 Build scripts
```

---

## 🚀 Phase 1: Core Components & OpenAI (Weeks 1-4)

### Week 1: Setup & First Component

**Goals:**
- Set up `@cognivo/components` package with Lit
- Create first web component (`<ai-thinking-indicator>`)
- Integrate design tokens
- Prove the concept works

**Tasks:**
1. [ ] Create `packages/components/package.json`
2. [ ] Set up Vite build for Lit components
3. [ ] Create base component structure
4. [ ] Build `<ai-thinking-indicator>` (animated dots)
   - Uses `--cg-brand-ai-accent` token
   - Pulsing animation
   - Size variants (sm, md, lg)
5. [ ] Create simple HTML demo page
6. [ ] Test in vanilla HTML

**Deliverable:** Working `<ai-thinking-indicator>` component

---

### Week 2: OpenAI Adapter

**Goals:**
- Implement `@cognivo/adapter-openai`
- Support structured outputs
- Streaming support
- Test with real API

**Tasks:**
1. [ ] Create `packages/adapter-openai/package.json`
2. [ ] Implement `OpenAiClient extends BaseAiClient`
3. [ ] Build prompt templates for each intent:
   - EXPLAIN
   - FORECAST
   - DETECT_ANOMALY
   - SUMMARIZE
4. [ ] Define JSON schemas for each intent
5. [ ] Implement streaming support
6. [ ] Add error handling and retries
7. [ ] Create example/test file
8. [ ] Document API usage

**Deliverable:** Working OpenAI adapter with all intents

---

### Week 3: First AI Component

**Goals:**
- Build `<ai-insight-card>` - The flagship component
- Integrate OpenAI adapter
- Full AI workflow working end-to-end

**Tasks:**
1. [ ] Create `<ai-insight-card>` component structure
2. [ ] Design slot-based API:
   ```html
   <ai-insight-card>
     <div slot="data">Your content</div>
     <div slot="ai-result">AI insights appear here</div>
   </ai-insight-card>
   ```
3. [ ] Implement AI action buttons (Explain, Forecast)
4. [ ] Context preparation from data
5. [ ] Display AI results (explanation, bullets, drivers)
6. [ ] Loading states with `<ai-thinking-indicator>`
7. [ ] Error handling UI
8. [ ] Confidence badges
9. [ ] Responsive design
10. [ ] Dark theme support

**Deliverable:** Fully functional `<ai-insight-card>` with OpenAI

---

### Week 4: Expand Component Set

**Goals:**
- Build 5 more essential components
- Create playground demo
- Document usage

**Components:**
1. [ ] `<ai-confidence-badge>` - Shows AI confidence score
2. [ ] `<ai-button>` - Trigger AI actions
3. [ ] `<cg-card>` - Base card (no AI)
4. [ ] `<ai-mini-chart>` - Small chart with AI annotations
5. [ ] `<ai-insight-panel>` - Right sidebar for insights

**Playground:**
- [ ] Create `packages/playground/` with Vite
- [ ] Demo all components
- [ ] Live API key input
- [ ] Multiple examples (spending, revenue, users)
- [ ] Toggle light/dark theme

**Deliverable:** 6 working components + interactive playground

---

## 📋 Phase 2: Production Polish (Weeks 5-8)

### Week 5-6: More Components

1. [ ] `<ai-table>` - Table with anomaly detection
2. [ ] `<ai-list>` - List with auto-tagging
3. [ ] `<ai-forecast-chart>` - Chart with predictions
4. [ ] `<ai-anomaly-card>` - Anomaly detection card
5. [ ] `<cg-badge>`, `<cg-chip>`, `<cg-icon>` - Base components

### Week 7: Testing & Accessibility

1. [ ] Unit tests with Web Test Runner
2. [ ] Visual regression tests
3. [ ] WCAG 2.1 AA compliance audit
4. [ ] Keyboard navigation
5. [ ] Screen reader testing
6. [ ] Bundle size optimization

### Week 8: Documentation

1. [ ] VitePress documentation site
2. [ ] Getting started guide
3. [ ] Component API docs
4. [ ] AI integration guide
5. [ ] Example applications
6. [ ] Storybook (optional)

---

## 🔮 Phase 3: Framework Wrappers & More Adapters (Weeks 9-12)

### Week 9-10: Vue Wrapper (Optional)

```vue
<script setup>
import { AiInsightCard } from '@cognivo/vue';
</script>

<template>
  <AiInsightCard
    :data="spending"
    :ai-actions="['explain', 'forecast']"
  />
</template>
```

- Thin wrapper around web components
- Vue-specific props/events
- Type definitions

### Week 11: Anthropic Adapter

- [ ] Implement `AnthropicClient`
- [ ] Support prompt caching
- [ ] Streaming with Claude
- [ ] JSON mode

### Week 12: Local LLM Adapter

- [ ] Implement `OllamaClient`
- [ ] Support llama.cpp
- [ ] Offline/privacy mode
- [ ] Quantized models

---

## 🎨 Design Token Usage Example

```typescript
// packages/components/src/ai-insight-card/styles.ts
import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    background: var(--cg-gray-white);
    border-radius: var(--cg-Border-radius-100);
    padding: var(--cg-spacing-16);
    border-left: 4px solid var(--cg-brand-ai-accent);
  }

  .ai-section {
    background: var(--cg-brand-ai-background);
    border: 1px solid var(--cg-brand-ai-border);
    border-radius: var(--cg-Border-radius-50);
    padding: var(--cg-spacing-12);
  }

  .ai-accent {
    color: var(--cg-brand-ai-accent);
  }

  :host([data-theme="dark"]) {
    background: var(--cg-gray-900);
  }
`;
```

---

## 📊 Component Priority List

### Phase 1 (Weeks 1-4)
1. ✅ `<ai-thinking-indicator>`
2. `<ai-confidence-badge>`
3. `<ai-button>`
4. `<ai-insight-card>` ⭐ Flagship
5. `<cg-card>` (base)
6. `<ai-mini-chart>`
7. `<ai-insight-panel>`

### Phase 2 (Weeks 5-8)
8. `<ai-table>`
9. `<ai-list>`
10. `<ai-forecast-chart>`
11. `<ai-anomaly-card>`
12. `<cg-badge>`, `<cg-chip>`, `<cg-icon>`

### Phase 3 (Weeks 9-12)
13. `<ai-recommendation-panel>`
14. `<ai-comparison-card>`
15. `<ai-cluster-view>`
16. More as needed...

---

## 🛠️ Development Workflow

### Daily Development

```bash
# 1. Install dependencies (first time)
pnpm install

# 2. Build tokens
cd packages/tokens
pnpm build

# 3. Start component development
cd packages/components
pnpm dev

# 4. View playground
cd packages/playground
pnpm dev
```

### Testing

```bash
# Run all tests
pnpm test

# Test specific package
pnpm --filter @cognivo/components test

# Visual tests
pnpm test:visual
```

### Building

```bash
# Build everything
pnpm build

# Build specific package
pnpm --filter @cognivo/components build
```

---

## 🎯 Success Criteria

### Phase 1 Complete When:
- [ ] `<ai-insight-card>` works with real OpenAI API
- [ ] 6+ components built and documented
- [ ] Playground demo is interactive
- [ ] Design tokens fully integrated
- [ ] Light/dark themes working
- [ ] Bundle size < 50kb gzipped

### 1.0 Release Ready When:
- [ ] 20+ components
- [ ] 3+ AI adapters (OpenAI, Anthropic, Local)
- [ ] Full documentation site
- [ ] Test coverage > 80%
- [ ] WCAG 2.1 AA compliant
- [ ] Example applications
- [ ] NPM packages published

---

## 📦 NPM Packages (When Ready)

```bash
npm install @cognivo/components
npm install @cognivo/adapter-openai
npm install @cognivo/tokens  # Optional, auto-included
```

---

## 🚧 Current State

**What Works:**
- ✅ Core AI types and interfaces
- ✅ Design token system
- ✅ AI-focused color palette
- ✅ Monorepo structure
- ✅ Build configuration

**What's Next:**
1. Set up `@cognivo/components` package
2. Build first component (`<ai-thinking-indicator>`)
3. Implement OpenAI adapter
4. Build `<ai-insight-card>`

---

## 📞 Questions & Decisions

### Immediate Decisions Needed:
- [ ] Confirm OpenAI is priority #1 adapter
- [ ] Component naming: `<ai-insight-card>` or `<cg-ai-insight-card>`?
- [ ] Should we support custom icons or use built-in only?

### Nice to Have (Later):
- [ ] Storybook integration?
- [ ] Chrome DevTools extension?
- [ ] Figma plugin for tokens?

---

## 🎉 What We've Built So Far

1. **Complete Architecture** - Web components with Lit
2. **Design Token System** - 3-tier, light/dark, AI-focused
3. **Core Package** - AI contracts, types, utilities
4. **Planning Docs** - 4 comprehensive guides
5. **Project Structure** - Professional monorepo setup

**Ready to start building!** 🚀

---

**Next Command:**
```bash
cd packages/components
# Create package.json and start building!
```
