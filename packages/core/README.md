# @cognivo/core

Core AI integration logic for Cognivo. Framework-agnostic TypeScript package providing:

- AI intent definitions
- Context and result types
- Base AI client interface
- Utilities for data formatting

## Installation

```bash
pnpm add @cognivo/core
```

## Usage

```typescript
import { AiIntent, type AiContext, type AiClient } from '@cognivo/core';

// Define your AI client (or use an adapter)
class MyAiClient implements AiClient {
  async runIntent(intent: AiIntent, context: AiContext) {
    // Your implementation
    return { explanation: 'Result', confidence: 0.9 };
  }
}

// Use it
const client = new MyAiClient();
const result = await client.runIntent(AiIntent.EXPLAIN, {
  dataset: [{ month: 'Jan', spending: 1200 }],
  meta: { unit: 'USD' },
});
```

## License

MIT
