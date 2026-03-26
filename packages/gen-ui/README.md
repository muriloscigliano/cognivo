# @cognivo/gen-ui

Framework-agnostic generative UI engine. Streaming parser, component registry, prompt generation, cognitive bias analysis, and design token governance.

Zero framework dependencies. Works with any renderer.

## Install

```bash
pnpm add @cognivo/gen-ui
```

## Core Features

### 1. Component Registry + Prompt Generation

```typescript
import { cognivoLibrary } from '@cognivo/gen-ui';

// Generate LLM system prompt from 41 registered components
const prompt = cognivoLibrary.prompt();
// → "You are an AI assistant that generates UI using component-lang..."
// → Includes all component signatures, types, streaming rules
```

### 2. Streaming Parser

```typescript
import { createStreamingParser } from '@cognivo/gen-ui';

const parser = createStreamingParser(cognivoLibrary.toJSONSchema());

// Feed LLM chunks as they arrive
for await (const chunk of llmStream) {
  const result = parser.push(chunk);
  // result.root is an ElementNode tree — render it with any framework
}
```

### 3. Cognitive Bias Analysis

```typescript
import { suggestBiasesForTree, formatBiasReport } from '@cognivo/gen-ui';

const biases = suggestBiasesForTree(result, cognivoLibrary);
// → [{ biasName: "Anchoring Bias", severity: "high", components: ["MetricCard"], ... }]

console.log(formatBiasReport(biases));
// → "## Cognitive Bias Analysis\n### 🟠 Anchoring Bias (high)\n..."
```

### 4. Design Token Governance

```typescript
import { validateTokenUsage } from '@cognivo/gen-ui';

const violations = validateTokenUsage(result.root);
// → Warns when LLM generates raw hex colors instead of --cg-* tokens
```

### 5. GenerativeUiClient (End-to-End)

```typescript
import { GenerativeUiClient } from '@cognivo/gen-ui';

const client = new GenerativeUiClient(aiClient, cognivoLibrary);

// One-shot
const result = await client.generate('Show a revenue dashboard');

// Streaming
for await (const result of client.stream('Show a pricing page')) {
  renderer.render(result, container);
}
```

## 110 Tests

```bash
pnpm test
```
