# @cognivo/adapter-openai

OpenAI adapter for Cognivo AI components.

## Installation

```bash
pnpm add @cognivo/adapter-openai
```

## Usage

```typescript
import { OpenAiClient } from '@cognivo/adapter-openai';
import { AiIntent } from '@cognivo/core';

// Create client
const aiClient = new OpenAiClient({
  apiKey: process.env.OPENAI_API_KEY,
  defaultModel: 'gpt-4o-mini', // or 'gpt-4o', 'gpt-4-turbo'
  defaultTemperature: 0.3,
});

// Run an intent
const result = await aiClient.runIntent(AiIntent.EXPLAIN, {
  dataset: [
    { month: 'Jan', spending: 1200 },
    { month: 'Feb', spending: 1450 },
    { month: 'Mar', spending: 2800 }, // Spike!
  ],
  meta: {
    timeframe: 'monthly',
    unit: 'USD',
    dataType: 'spending',
  },
});

console.log(result.explanation);
console.log(result.drivers);
console.log(result.anomalies);
```

## Supported Intents

- ✅ `EXPLAIN` - Explain patterns and trends
- ✅ `FORECAST` - Predict future values
- ✅ `DETECT_ANOMALY` - Find outliers
- ✅ `SUMMARIZE` - Summarize data
- ✅ `CLASSIFY` - Categorize items
- ✅ `OPTIMIZE` - Suggest improvements
- ✅ `COMPARE` - Compare datasets
- ✅ `CLUSTER` - Group similar items

## Streaming Support

```typescript
for await (const partial of aiClient.streamIntent(AiIntent.EXPLAIN, context)) {
  console.log('Partial result:', partial);
}
```

## Models

Recommended models:
- `gpt-4o-mini` - Fast, cost-effective (recommended for production)
- `gpt-4o` - More capable, higher cost
- `gpt-4-turbo` - Legacy, being phased out

## Configuration

```typescript
const client = new OpenAiClient({
  apiKey: 'sk-...',
  defaultModel: 'gpt-4o-mini',
  defaultTemperature: 0.3, // 0 = deterministic, 1 = creative
  defaultMaxTokens: 2000,
  organization: 'org-...', // Optional
});
```

## Error Handling

```typescript
try {
  const result = await aiClient.runIntent(intent, context);
} catch (error) {
  console.error('AI request failed:', error);
}
```

## Structured Outputs

This adapter uses OpenAI's structured outputs feature to guarantee valid JSON responses that match the expected schema.

## License

MIT
