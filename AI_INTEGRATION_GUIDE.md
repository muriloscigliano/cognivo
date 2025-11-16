# AI Integration Guide
## How Cognivo Connects Components to LLMs

---

## Overview

This guide shows **exactly how AI integration works** in Cognivo, from component to LLM and back, with complete code examples.

---

## The AI Flow

```
┌──────────────────┐
│  User clicks     │
│  "Explain" btn   │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│  AiInsightCard component     │
│  - Prepares context          │
│  - Calls aiClient.runIntent()│
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  @cognivo/core               │
│  - Validates intent          │
│  - Builds standardized req   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Adapter (OpenAI/Anthropic)  │
│  - Converts to LLM format    │
│  - Adds prompt engineering   │
│  - Handles streaming         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  LLM API (GPT-4, Claude)     │
│  - Processes request         │
│  - Returns structured JSON   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Adapter parses response     │
│  - Validates schema          │
│  - Converts to AiResult      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Component renders result    │
│  - Shows explanation         │
│  - Displays insights         │
│  - Updates UI                │
└──────────────────────────────┘
```

---

## Core Types & Interfaces

### 1. AI Intent Enum

```typescript
// packages/core/src/intents/types.ts

/**
 * AI Intent - What the user wants AI to do
 */
export enum AiIntent {
  /** Explain why something happened */
  EXPLAIN = 'explain',

  /** Summarize data into key points */
  SUMMARIZE = 'summarize',

  /** Predict future values */
  FORECAST = 'forecast',

  /** Find unusual patterns */
  DETECT_ANOMALY = 'detect_anomaly',

  /** Auto-categorize items */
  CLASSIFY = 'classify',

  /** Suggest improvements */
  OPTIMIZE = 'optimize',

  /** Compare two datasets */
  COMPARE = 'compare',

  /** Group similar items */
  CLUSTER = 'cluster',
}
```

### 2. AI Context

```typescript
// packages/core/src/context/types.ts

/**
 * AI Context - Data sent to the LLM
 */
export interface AiContext<T = unknown> {
  /** All visible data */
  dataset: T[];

  /** User-selected items (optional) */
  selection?: T[];

  /** Metadata about the data */
  meta?: {
    /** Data labels (column names, etc.) */
    labels?: string[];

    /** Time period */
    timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly' | string;

    /** Unit of measurement */
    unit?: 'USD' | 'EUR' | 'count' | string;

    /** Data type hints */
    dataType?: 'spending' | 'revenue' | 'users' | 'events' | string;

    /** Category or domain */
    category?: string;

    /** Additional context */
    [key: string]: unknown;
  };
}
```

### 3. AI Result

```typescript
// packages/core/src/results/types.ts

/**
 * AI Result - Structured output from LLM
 */
export interface AiResult {
  /** Simple text explanation */
  explanation?: string;

  /** Bullet point insights */
  bullets?: string[];

  /** Key drivers/factors */
  drivers?: Array<{
    factor: string;
    impact: number; // -100 to 100
    confidence: number; // 0 to 1
  }>;

  /** Confidence in the analysis */
  confidence?: number; // 0 to 1

  /** Anomaly detection results */
  anomalies?: Array<{
    index: number;
    value: unknown;
    reason: string;
    severity: 'low' | 'medium' | 'high';
  }>;

  /** Forecast predictions */
  forecast?: Array<{
    timestamp: string | number;
    value: number;
    confidence: number;
    lowerBound?: number;
    upperBound?: number;
  }>;

  /** Classifications/tags */
  classifications?: Array<{
    itemIndex: number;
    category: string;
    confidence: number;
  }>;

  /** Recommendations */
  recommendations?: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }>;

  /** Sources/citations */
  sources?: Array<{
    title: string;
    url?: string;
    excerpt?: string;
  }>;
}
```

### 4. AI Client Interface

```typescript
// packages/core/src/client/types.ts

/**
 * AI Client Interface - LLM-agnostic
 * Every adapter must implement this
 */
export interface AiClient {
  /**
   * Run an AI intent with given context
   */
  runIntent<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult>;

  /**
   * Stream an AI intent (optional, for long operations)
   */
  streamIntent?<T = unknown>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>>;
}

export interface AiRequestOptions {
  /** Model to use (provider-specific) */
  model?: string;

  /** Temperature (0-1, lower = more deterministic) */
  temperature?: number;

  /** Maximum tokens to generate */
  maxTokens?: number;

  /** Custom system prompt */
  systemPrompt?: string;

  /** Enable caching (if supported) */
  cache?: boolean;

  /** Timeout in milliseconds */
  timeout?: number;
}
```

---

## Complete Example: Spending Analysis

### Step 1: User's Application Code

```vue
<!-- User's dashboard (Vue app) -->
<script setup lang="ts">
import { AiInsightCard } from '@cognivo/vue';
import { ref } from 'vue';

// User's spending data
const monthlySpending = ref([
  { month: 'Jan', spending: 1200, category: 'Marketing' },
  { month: 'Feb', spending: 1450, category: 'Marketing' },
  { month: 'Mar', spending: 2800, category: 'Marketing' }, // Spike!
  { month: 'Apr', spending: 1350, category: 'Marketing' },
]);

function handleResult(result) {
  console.log('AI analysis:', result);
  // {
  //   explanation: "Spending spiked in March due to...",
  //   drivers: [{ factor: "Campaign launch", impact: 85, ... }],
  //   anomalies: [{ index: 2, reason: "133% increase", ... }]
  // }
}
</script>

<template>
  <AiInsightCard
    :data="monthlySpending"
    :ai-actions="['explain', 'forecast']"
    :meta="{
      timeframe: 'monthly',
      unit: 'USD',
      dataType: 'spending',
      category: 'Marketing'
    }"
    @ai:result="handleResult"
  />
</template>
```

### Step 2: Component Prepares Context

```typescript
// packages/vue/src/components/AiInsightCard.vue (internal)

<script setup lang="ts">
import { inject } from 'vue';
import { AiIntent, type AiContext } from '@cognivo/core';

const props = defineProps<{
  data: unknown[];
  aiActions: string[];
  meta?: Record<string, unknown>;
}>();

const emit = defineEmits<{
  'ai:result': [result: AiResult];
}>();

// Get AI client from provider
const aiClient = inject('aiClient');

async function runExplain() {
  // Build context
  const context: AiContext = {
    dataset: props.data,
    meta: props.meta,
  };

  // Call AI client
  const result = await aiClient.runIntent(
    AiIntent.EXPLAIN,
    context
  );

  // Emit result
  emit('ai:result', result);
}
</script>
```

### Step 3: Core Validates and Routes

```typescript
// packages/core/src/client/BaseAiClient.ts

export abstract class BaseAiClient implements AiClient {
  async runIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Validate intent
    if (!Object.values(AiIntent).includes(intent)) {
      throw new Error(`Unknown intent: ${intent}`);
    }

    // Validate context
    if (!context.dataset || context.dataset.length === 0) {
      throw new Error('Context must include dataset');
    }

    // Route to specific implementation
    return this.executeIntent(intent, context, options);
  }

  protected abstract executeIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult>;
}
```

### Step 4: Adapter Calls LLM

```typescript
// packages/adapter-openai/src/OpenAiClient.ts

import OpenAI from 'openai';
import { BaseAiClient, AiIntent, AiContext, AiResult } from '@cognivo/core';

export class OpenAiClient extends BaseAiClient {
  private client: OpenAI;

  constructor(apiKey: string) {
    super();
    this.client = new OpenAI({ apiKey });
  }

  protected async executeIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    // Build prompt based on intent
    const prompt = this.buildPrompt(intent, context);

    // Define structured output schema
    const schema = this.getSchemaForIntent(intent);

    // Call OpenAI with structured outputs
    const response = await this.client.chat.completions.create({
      model: options?.model || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a data analysis assistant. Analyze the provided data and return structured insights.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'analysis_result',
          schema,
        },
      },
      temperature: options?.temperature ?? 0.3,
      max_tokens: options?.maxTokens ?? 1500,
    });

    // Parse and validate response
    const result = JSON.parse(response.choices[0].message.content);
    return this.validateResult(result);
  }

  private buildPrompt(intent: AiIntent, context: AiContext): string {
    const { dataset, meta } = context;

    switch (intent) {
      case AiIntent.EXPLAIN:
        return `Analyze this ${meta?.dataType || 'data'} dataset and explain key patterns, trends, and insights.

Dataset:
${JSON.stringify(dataset, null, 2)}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}
- Category: ${meta?.category || 'unknown'}

Provide:
1. A clear explanation of what's happening in the data
2. Key drivers/factors
3. Any anomalies or notable points
4. Confidence in your analysis`;

      case AiIntent.FORECAST:
        return `Forecast future values for this time series dataset.

Dataset:
${JSON.stringify(dataset, null, 2)}

Metadata:
- Timeframe: ${meta?.timeframe || 'unknown'}
- Unit: ${meta?.unit || 'unknown'}

Provide:
1. Predicted values for the next 3 periods
2. Confidence intervals
3. Explanation of forecast methodology`;

      // ... other intents

      default:
        throw new Error(`Intent not implemented: ${intent}`);
    }
  }

  private getSchemaForIntent(intent: AiIntent) {
    switch (intent) {
      case AiIntent.EXPLAIN:
        return {
          type: 'object',
          properties: {
            explanation: { type: 'string' },
            bullets: {
              type: 'array',
              items: { type: 'string' },
            },
            drivers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  factor: { type: 'string' },
                  impact: { type: 'number' },
                  confidence: { type: 'number' },
                },
                required: ['factor', 'impact', 'confidence'],
              },
            },
            anomalies: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  index: { type: 'number' },
                  value: {},
                  reason: { type: 'string' },
                  severity: { type: 'string', enum: ['low', 'medium', 'high'] },
                },
                required: ['index', 'reason', 'severity'],
              },
            },
            confidence: { type: 'number' },
          },
          required: ['explanation', 'confidence'],
        };

      case AiIntent.FORECAST:
        return {
          type: 'object',
          properties: {
            explanation: { type: 'string' },
            forecast: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  timestamp: { type: 'string' },
                  value: { type: 'number' },
                  confidence: { type: 'number' },
                  lowerBound: { type: 'number' },
                  upperBound: { type: 'number' },
                },
                required: ['timestamp', 'value', 'confidence'],
              },
            },
            confidence: { type: 'number' },
          },
          required: ['explanation', 'forecast', 'confidence'],
        };

      default:
        throw new Error(`Schema not defined for intent: ${intent}`);
    }
  }

  private validateResult(result: unknown): AiResult {
    // Add runtime validation (e.g., using Zod)
    return result as AiResult;
  }
}
```

### Step 5: LLM Response (Structured JSON)

```json
{
  "explanation": "Your marketing spending shows a significant spike in March (133% increase from February), returning to normal levels in April. This pattern suggests a one-time campaign or event.",
  "bullets": [
    "March spending was $2,800, up from $1,450 in February",
    "Represents a 93% increase above the quarterly average",
    "Spending normalized in April, suggesting temporary campaign",
    "Overall trend shows stability around $1,300-$1,400 baseline"
  ],
  "drivers": [
    {
      "factor": "March campaign launch",
      "impact": 85,
      "confidence": 0.9
    },
    {
      "factor": "Seasonal variation",
      "impact": 15,
      "confidence": 0.6
    }
  ],
  "anomalies": [
    {
      "index": 2,
      "value": 2800,
      "reason": "133% increase from previous month, 93% above quarterly average",
      "severity": "high"
    }
  ],
  "confidence": 0.85
}
```

### Step 6: Component Renders Result

```vue
<!-- packages/vue/src/components/AiInsightCard.vue -->

<template>
  <div class="ai-insight-card">
    <!-- Data visualization -->
    <div class="data-section">
      <MiniBarChart :data="data" />
    </div>

    <!-- AI Results -->
    <div v-if="result" class="ai-results">
      <div class="explanation">
        <h4>AI Insights</h4>
        <p>{{ result.explanation }}</p>
      </div>

      <div v-if="result.drivers" class="drivers">
        <h5>Key Drivers</h5>
        <ul>
          <li v-for="driver in result.drivers" :key="driver.factor">
            <strong>{{ driver.factor }}</strong>
            <span class="impact">{{ driver.impact }}% impact</span>
            <ai-confidence-badge :score="driver.confidence" />
          </li>
        </ul>
      </div>

      <div v-if="result.anomalies" class="anomalies">
        <h5>Anomalies Detected</h5>
        <div v-for="anomaly in result.anomalies" :key="anomaly.index">
          <ai-anomaly-badge :severity="anomaly.severity" />
          {{ anomaly.reason }}
        </div>
      </div>
    </div>

    <!-- AI Actions -->
    <div class="actions">
      <AiButton @click="runExplain">Explain</AiButton>
      <AiButton @click="runForecast">Forecast</AiButton>
    </div>
  </div>
</template>
```

---

## Adapter Examples

### Anthropic (Claude) Adapter

```typescript
// packages/adapter-anthropic/src/AnthropicClient.ts

import Anthropic from '@anthropic-ai/sdk';
import { BaseAiClient, AiIntent, AiContext, AiResult } from '@cognivo/core';

export class AnthropicClient extends BaseAiClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    super();
    this.client = new Anthropic({ apiKey });
  }

  protected async executeIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    const prompt = this.buildPrompt(intent, context);

    const response = await this.client.messages.create({
      model: options?.model || 'claude-3-5-sonnet-20241022',
      max_tokens: options?.maxTokens ?? 1500,
      temperature: options?.temperature ?? 0.3,
      system: 'You are a data analysis assistant. Return only valid JSON matching the schema.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse JSON from response
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const result = JSON.parse(content.text);
    return this.validateResult(result);
  }

  // ... similar to OpenAI adapter
}
```

### Local LLM Adapter (Ollama)

```typescript
// packages/adapter-local/src/OllamaClient.ts

import { BaseAiClient, AiIntent, AiContext, AiResult } from '@cognivo/core';

export class OllamaClient extends BaseAiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:11434') {
    super();
    this.baseUrl = baseUrl;
  }

  protected async executeIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): Promise<AiResult> {
    const prompt = this.buildPrompt(intent, context);

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options?.model || 'llama3.1',
        prompt,
        format: 'json',
        stream: false,
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.response);
    return this.validateResult(result);
  }

  // ... similar prompt building
}
```

---

## App Setup

### Vue App Setup

```typescript
// User's main.ts

import { createApp } from 'vue';
import { createAiProvider } from '@cognivo/vue';
import { OpenAiClient } from '@cognivo/adapter-openai';
import App from './App.vue';

const app = createApp(App);

// Create AI client
const aiClient = new OpenAiClient(import.meta.env.VITE_OPENAI_API_KEY);

// Install AI provider
app.use(createAiProvider(aiClient));

app.mount('#app');
```

### React App Setup

```tsx
// User's App.tsx

import { AiProvider } from '@cognivo/react';
import { OpenAiClient } from '@cognivo/adapter-openai';
import Dashboard from './Dashboard';

const aiClient = new OpenAiClient(process.env.REACT_APP_OPENAI_API_KEY);

function App() {
  return (
    <AiProvider client={aiClient}>
      <Dashboard />
    </AiProvider>
  );
}
```

---

## Advanced Features

### Streaming Responses

```typescript
// Adapter with streaming support

export class OpenAiClient extends BaseAiClient {
  async *streamIntent<T>(
    intent: AiIntent,
    context: AiContext<T>,
    options?: AiRequestOptions
  ): AsyncGenerator<Partial<AiResult>> {
    const prompt = this.buildPrompt(intent, context);

    const stream = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    let buffer = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      buffer += content;

      // Try to parse partial JSON
      try {
        const partial = JSON.parse(buffer);
        yield partial;
      } catch {
        // Not yet valid JSON, keep buffering
      }
    }
  }
}
```

```vue
<!-- Component using streaming -->

<script setup>
import { ref } from 'vue';

const result = ref({});

async function streamExplain() {
  for await (const partial of aiClient.streamIntent(AiIntent.EXPLAIN, context)) {
    result.value = { ...result.value, ...partial };
  }
}
</script>

<template>
  <!-- Result updates in real-time -->
  <div>{{ result.explanation }}</div>
</template>
```

### Caching (Anthropic Prompt Caching)

```typescript
// Use prompt caching to reduce costs

const response = await this.client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  system: [
    {
      type: 'text',
      text: 'You are a data analysis assistant...',
      cache_control: { type: 'ephemeral' }, // Cache this
    },
  ],
  messages: [
    {
      role: 'user',
      content: prompt, // Dynamic part
    },
  ],
});
```

---

## Summary

Cognivo's AI integration is:

✅ **LLM-Agnostic** - Swap providers without changing components
✅ **Type-Safe** - Full TypeScript from component to LLM
✅ **Structured** - JSON schemas ensure predictable outputs
✅ **Extensible** - Easy to add new intents and adapters
✅ **Efficient** - Supports streaming, caching, batching
✅ **Simple** - Developers just use `<AiInsightCard>`, magic happens behind scenes

**Next:** Implement core types and first adapter (OpenAI).
