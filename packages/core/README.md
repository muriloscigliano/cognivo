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

## Size budget

`pnpm size` (run in CI) limits `dist/index.js` to **14.94 KB gzip**. That is the size measured on 2026-11-16 (15,298 B) — the package had already grown past its earlier 14 KB budget, so the limit records the current size rather than an aim. It should come down: the limit is lowered whenever the package shrinks, and is never raised past a measured size.

## License

MIT
