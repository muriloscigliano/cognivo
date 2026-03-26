# Framework Approach Comparison
## Detailed Analysis for Cognivo AI Component Library

---

## Overview

This document compares different architectural approaches for building Cognivo, with **code examples** showing what the developer experience looks like for each.

---

## Approach 1: Web Components Only (Lit)

### Architecture
```
Application → <ai-insight-card> (Lit Web Component) → @cognivo/core → LLM
```

### Example Usage

```html
<!-- Works in ANY framework -->
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="@cognivo/primitives"></script>
</head>
<body>
  <ai-insight-card
    data='[{"month": "Jan", "spending": 1200}, ...]'
    ai-actions="explain,forecast"
    meta='{"currency": "USD"}'
  ></ai-insight-card>

  <script type="module">
    const card = document.querySelector('ai-insight-card');
    card.addEventListener('ai:result', (e) => {
      console.log(e.detail.result);
    });
  </script>
</body>
</html>
```

```vue
<!-- Vue -->
<template>
  <ai-insight-card
    :data="spending"
    ai-actions="explain,forecast"
    @ai:result="handleResult"
  />
</template>
```

```jsx
// React
function Dashboard() {
  return (
    <ai-insight-card
      data={spending}
      ai-actions="explain,forecast"
      onAiResult={handleResult}
    />
  );
}
```

### Pros
✅ **True Framework Agnostic** - Works literally everywhere
✅ **Future-Proof** - Browser standard, won't be deprecated
✅ **Single Codebase** - Write once, use everywhere
✅ **Encapsulation** - Shadow DOM protects styles

### Cons
❌ **Styling Friction** - Shadow DOM makes theming harder
❌ **Props as Strings** - `data='[...]'` instead of `:data="..."`
❌ **Limited TypeScript** - Can't infer prop types easily
❌ **React Integration** - Event names need conversion (`onAiResult`)
❌ **DevTools** - Less framework-native debugging
❌ **SSR Complexity** - Requires declarative shadow DOM

### Real-World Pain Points

```vue
<!-- BAD: Props must be serialized -->
<ai-insight-card :data="JSON.stringify(complexData)" />

<!-- BAD: No type checking -->
<ai-insight-card ai-actions="typo-here" /> <!-- Fails silently -->

<!-- BAD: Styling is isolated -->
<style>
  /* This won't work because of Shadow DOM */
  ai-insight-card .internal-element {
    color: red;
  }
</style>
```

### Verdict
⚠️ **Good for:** Small, portable primitives (`<ai-thinking-indicator>`)
❌ **Bad for:** Complex, data-heavy components (`<AiTable>`)

---

## Approach 2: Mitosis (Compile to Multiple Frameworks)

### Architecture
```
Mitosis JSX → Compiler → Vue/React/Svelte/Angular components → @cognivo/core → LLM
```

### Example Usage

```tsx
// Source: component.lite.tsx (Mitosis syntax)
import { useState } from '@builder.io/mitosis';

export default function AiInsightCard(props) {
  const [result, setResult] = useState(null);

  async function runAi() {
    const res = await props.aiClient.runIntent('explain', {
      dataset: props.data,
      meta: props.meta,
    });
    setResult(res);
  }

  return (
    <div class="ai-card">
      <h3>{props.title}</h3>
      <button onClick={runAi}>Explain</button>
      {result && <div>{result.explanation}</div>}
    </div>
  );
}
```

**Compiles to:**

```vue
<!-- Vue output -->
<script setup>
import { ref } from 'vue';

const props = defineProps(['data', 'meta', 'aiClient', 'title']);
const result = ref(null);

async function runAi() {
  result.value = await props.aiClient.runIntent('explain', {
    dataset: props.data,
    meta: props.meta,
  });
}
</script>

<template>
  <div class="ai-card">
    <h3>{{ title }}</h3>
    <button @click="runAi">Explain</button>
    <div v-if="result">{{ result.explanation }}</div>
  </div>
</template>
```

```jsx
// React output
import { useState } from 'react';

export function AiInsightCard({ data, meta, aiClient, title }) {
  const [result, setResult] = useState(null);

  async function runAi() {
    const res = await aiClient.runIntent('explain', {
      dataset: data,
      meta,
    });
    setResult(res);
  }

  return (
    <div className="ai-card">
      <h3>{title}</h3>
      <button onClick={runAi}>Explain</button>
      {result && <div>{result.explanation}</div>}
    </div>
  );
}
```

### Pros
✅ **Write Once, Run Everywhere** - True multi-framework
✅ **Native Output** - Generates real Vue/React code
✅ **Type Safety** - TypeScript support
✅ **Framework Features** - Hooks, reactivity work

### Cons
❌ **Limited Syntax** - Can't use all framework features
❌ **Debugging** - Harder to trace compiled code
❌ **Ecosystem** - Smaller community, fewer examples
❌ **Build Complexity** - Extra compilation step
❌ **Advanced Features** - Slots, scoped styles harder
❌ **Learning Curve** - New syntax/limitations to learn

### Real-World Pain Points

```tsx
// BAD: Can't use Vue's <Transition>
// BAD: Can't use React Suspense
// BAD: Can't use Svelte's {#await}
// BAD: Can't use framework-specific lifecycle hooks

// LIMITATION: Mitosis has a subset of features
export default function AiCard(props) {
  // ❌ Can't use Vue's computed()
  // ❌ Can't use React's useEffect with cleanup
  // ❌ Can't use Svelte's $: reactive statements

  // Only "common denominator" features work
}
```

### Verdict
⚠️ **Good for:** Simple components, shared logic
❌ **Bad for:** Complex components needing framework-specific features

---

## Approach 3: Framework-Specific (Separate Implementations)

### Architecture
```
@cognivo/vue (Vue components) ──┐
@cognivo/react (React components) ──┼─→ @cognivo/core (shared logic) → LLM
@cognivo/svelte (Svelte components) ─┘
```

### Example Usage

```vue
<!-- @cognivo/vue -->
<script setup lang="ts">
import { AiInsightCard } from '@cognivo/vue';
import { ref } from 'vue';

const spending = ref([
  { month: 'Jan', spending: 1200 },
  { month: 'Feb', spending: 1450 },
]);

function handleResult(result) {
  console.log('AI says:', result.explanation);
}
</script>

<template>
  <AiInsightCard
    :data="spending"
    :ai-actions="['explain', 'forecast']"
    :meta="{ currency: 'USD', timeframe: 'monthly' }"
    @ai:result="handleResult"
  >
    <template #default="{ data, isLoading }">
      <!-- Full Vue features: slots, v-for, transitions -->
      <TransitionGroup name="list">
        <div v-for="item in data" :key="item.month">
          {{ item.month }}: ${{ item.spending }}
        </div>
      </TransitionGroup>
    </template>

    <template #insight="{ result }">
      <!-- Custom insight rendering with full Vue -->
      <div v-if="result.drivers">
        <h4>Key Drivers:</h4>
        <ul>
          <li v-for="driver in result.drivers" :key="driver.factor">
            {{ driver.factor }} ({{ driver.impact }}%)
          </li>
        </ul>
      </div>
    </template>
  </AiInsightCard>
</template>
```

```tsx
// @cognivo/react
import { AiInsightCard } from '@cognivo/react';
import { useState } from 'react';

function Dashboard() {
  const [spending, setSpending] = useState([
    { month: 'Jan', spending: 1200 },
    { month: 'Feb', spending: 1450 },
  ]);

  return (
    <AiInsightCard
      data={spending}
      aiActions={['explain', 'forecast']}
      meta={{ currency: 'USD', timeframe: 'monthly' }}
      onAiResult={(result) => console.log(result)}
    >
      {({ data, isLoading }) => (
        // Full React features: hooks, suspense, etc.
        <React.Suspense fallback={<Loading />}>
          {data.map((item) => (
            <div key={item.month}>
              {item.month}: ${item.spending}
            </div>
          ))}
        </React.Suspense>
      )}
    </AiInsightCard>
  );
}
```

### Pros
✅ **Best DX** - Native framework patterns
✅ **Full Features** - No limitations (slots, hooks, etc.)
✅ **Type Safety** - Full TypeScript inference
✅ **Framework Ecosystem** - All tools work (DevTools, HMR)
✅ **Performance** - No compilation overhead
✅ **Documentation** - Framework-specific guides

### Cons
❌ **Duplicate Work** - Must implement each framework
❌ **Maintenance** - Keep feature parity across frameworks
❌ **Team Knowledge** - Need expertise in multiple frameworks

### Verdict
✅ **Best for:** Production-quality components with great DX

---

## Approach 4: HYBRID (Recommended)

### Architecture
```
┌─────────────────────────────────────────┐
│  @cognivo/core (TypeScript)             │
│  - AI contracts, adapters, logic        │
│  - Framework-agnostic                   │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┼──────────┐
        │         │          │
┌───────▼───┐ ┌──▼──────┐ ┌─▼────────────┐
│@cognivo/  │ │@cognivo/│ │ @cognivo/    │
│vue        │ │react    │ │ primitives   │
│(Native Vue│ │(Native  │ │ (Lit WC)     │
│ components│ │React)   │ │              │
│)          │ │         │ │ Small, truly │
└───────────┘ └─────────┘ │ portable     │
                          │ primitives   │
                          └──────────────┘
```

### What Goes Where?

**@cognivo/core (Framework-Agnostic TypeScript):**
- AI client interfaces
- Intent definitions
- Context builders
- Adapters (OpenAI, Anthropic, etc.)
- State management utilities
- Type definitions

**@cognivo/vue, @cognivo/react (Framework-Specific):**
- Complex data components (Table, List, Grid)
- AI-enhanced cards (AiInsightCard, AiForecastCard)
- Charts (AiMiniChart, AiTrendChart)
- Panels (AiInsightPanel)
- Layout components

**@cognivo/primitives (Lit Web Components):**
- `<ai-thinking-indicator>` (loading animation)
- `<ai-confidence-badge>` (confidence score)
- `<ai-source-list>` (citations)
- Small, stateless UI elements

### Example: The Best of All Worlds

```vue
<!-- Vue app using HYBRID approach -->
<script setup>
import { AiInsightCard } from '@cognivo/vue'; // Native Vue component
import '@cognivo/primitives'; // Web Components auto-register

const spending = ref([...]);
</script>

<template>
  <!-- Native Vue component with full features -->
  <AiInsightCard
    :data="spending"
    :ai-actions="['explain']"
    @ai:result="handleResult"
  >
    <template #loading>
      <!-- Portable Web Component works everywhere -->
      <ai-thinking-indicator size="large" />
    </template>

    <template #insight="{ result }">
      <div>
        <p>{{ result.explanation }}</p>
        <!-- Portable confidence badge -->
        <ai-confidence-badge :score="result.confidence" />
      </div>
    </template>
  </AiInsightCard>
</template>
```

```tsx
// Same primitives work in React!
import { AiInsightCard } from '@cognivo/react';
import '@cognivo/primitives';

function Dashboard() {
  return (
    <AiInsightCard data={spending} aiActions={['explain']}>
      {({ isLoading, result }) => (
        <>
          {isLoading && <ai-thinking-indicator size="large" />}
          {result && (
            <>
              <p>{result.explanation}</p>
              <ai-confidence-badge score={result.confidence} />
            </>
          )}
        </>
      )}
    </AiInsightCard>
  );
}
```

### Pros
✅ **Best DX** - Native framework experience for complex components
✅ **Portability** - Small primitives work everywhere
✅ **Shared Logic** - Core AI code reused across frameworks
✅ **Progressive** - Start with one framework, add others later
✅ **No Compromises** - Use full framework features where needed
✅ **Maintainable** - Clear separation of concerns

### Cons
⚠️ **Initial Complexity** - More packages to set up
⚠️ **Must Choose** - Still need to pick Vue vs React first

---

## Decision Matrix

| Criteria | Web Components | Mitosis | Framework-Specific | **HYBRID** |
|----------|----------------|---------|--------------------|-----------:|
| **Developer Experience** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Type Safety** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Framework Portability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐⭐⭐ |
| **Full Framework Features** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Maintenance Burden** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Bundle Size** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Ecosystem Integration** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Future-Proof** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **AI-Specific Needs** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Designer-Friendly** | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **TOTAL** | 29/50 | 33/50 | 42/50 | **47/50** |

---

## Recommendation: HYBRID

### Phase 1: Start with Vue + Core
```
packages/
├── core/          # ← Shared AI logic (TypeScript)
├── tokens/        # ← Design tokens (CSS variables)
├── vue/           # ← Vue 3 components
└── primitives/    # ← Small Lit Web Components
```

### Phase 2: Add React
```
packages/
├── core/          # ← Already done ✅
├── tokens/        # ← Already done ✅
├── primitives/    # ← Already done ✅
├── vue/           # ← Already done ✅
└── react/         # ← NEW: Reuse core, primitives
```

### Benefits
1. **Start Fast** - Focus on Vue first (as you mentioned)
2. **Reuse Core** - AI logic written once
3. **Portable Primitives** - Small WC elements work everywhere
4. **No Lock-In** - React/Svelte teams can use primitives immediately
5. **Best DX** - Native patterns for each framework
6. **Future-Proof** - Can add Svelte, Angular, etc. later

---

## Final Recommendation

```
┌─────────────────────────────────────────────────────┐
│  HYBRID ARCHITECTURE                                 │
│                                                      │
│  Core Logic: TypeScript (framework-agnostic)        │
│  Main Components: Vue 3 (Phase 1) + React (Phase 2) │
│  Portable Primitives: Lit Web Components            │
│  Styling: Vanilla Extract + Design Tokens           │
│  Distribution: NPM packages (@cognivo/*)            │
└─────────────────────────────────────────────────────┘
```

This gives you:
- ✅ Best developer experience
- ✅ Framework flexibility
- ✅ Shared AI logic
- ✅ Type safety
- ✅ Future-proof
- ✅ Designer-friendly
- ✅ Production-ready

**Next Step:** Set up monorepo with `core`, `tokens`, `vue`, `primitives`.
