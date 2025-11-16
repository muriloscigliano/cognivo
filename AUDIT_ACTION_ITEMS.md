# Audit Action Items - Implementation Checklist

Based on the comprehensive code audit, here are prioritized action items with implementation examples.

---

## 🔴 CRITICAL (Week 1)

### 1. Add Error Handling to All Async Functions

**Files to Fix:**

#### `packages/adapter-openai/src/client.ts`
```typescript
// BEFORE
protected async executeIntent<T>(
  intent: AiIntent,
  context: AiContext<T>,
  options?: AiRequestOptions
): Promise<AiResult> {
  const userPrompt = buildPrompt(intent, context);
  const schema = schemas[intent];

  const response = await this.client.chat.completions.create({
    model: options?.model || this.config.defaultModel,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: { name: 'analysis_result', schema },
    },
    temperature: options?.temperature ?? this.config.defaultTemperature,
    max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
  });

  const content = response.choices[0]?.message?.content;
  return JSON.parse(content || '{}');
}

// AFTER
protected async executeIntent<T>(
  intent: AiIntent,
  context: AiContext<T>,
  options?: AiRequestOptions
): Promise<AiResult> {
  try {
    // Validate inputs
    if (!context.dataset || context.dataset.length === 0) {
      throw new ValidationError('Dataset cannot be empty');
    }

    if (context.dataset.length > 1000) {
      throw new ValidationError('Dataset too large (max 1000 items)');
    }

    const userPrompt = buildPrompt(intent, context);
    const schema = schemas[intent];

    const response = await this.client.chat.completions.create({
      model: options?.model || this.config.defaultModel,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: 'analysis_result', schema },
      },
      temperature: options?.temperature ?? this.config.defaultTemperature,
      max_tokens: options?.maxTokens ?? this.config.defaultMaxTokens,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new AiClientError('Empty response from OpenAI');
    }

    const result = JSON.parse(content);

    // Validate result structure
    if (!this.validateResult(result, intent)) {
      throw new ValidationError('Invalid AI response structure');
    }

    return result;

  } catch (error) {
    // Handle specific OpenAI errors
    if (error.status === 429) {
      throw new RateLimitError('OpenAI rate limit exceeded. Try again later.');
    }

    if (error.status === 401) {
      throw new AuthenticationError('Invalid OpenAI API key');
    }

    if (error.status === 400) {
      throw new ValidationError(`OpenAI API error: ${error.message}`);
    }

    // Re-throw our custom errors
    if (error instanceof AiClientError) {
      throw error;
    }

    // Wrap unknown errors
    throw new AiClientError('Failed to execute AI intent', { cause: error });
  }
}

private validateResult(result: unknown, intent: AiIntent): boolean {
  // Add schema validation
  return true; // TODO: Implement with Zod
}
```

#### Create Error Classes (`packages/core/src/errors/index.ts`)
```typescript
export class AiClientError extends Error {
  constructor(
    message: string,
    public readonly options?: { cause?: Error; code?: string }
  ) {
    super(message);
    this.name = 'AiClientError';
    if (options?.cause) {
      this.cause = options.cause;
    }
  }
}

export class RateLimitError extends AiClientError {
  constructor(message: string) {
    super(message, { code: 'RATE_LIMIT' });
    this.name = 'RateLimitError';
  }
}

export class AuthenticationError extends AiClientError {
  constructor(message: string) {
    super(message, { code: 'AUTH_ERROR' });
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends AiClientError {
  constructor(message: string) {
    super(message, { code: 'VALIDATION_ERROR' });
    this.name = 'ValidationError';
  }
}

export class TimeoutError extends AiClientError {
  constructor(message: string) {
    super(message, { code: 'TIMEOUT' });
    this.name = 'TimeoutError';
  }
}
```

#### Update Component to Handle Errors (`packages/components/src/components/ai-insight-card/ai-insight-card.ts`)
```typescript
@customElement('ai-insight-card')
export class AiInsightCard extends LitElement {
  @state() private error: Error | null = null;
  @state() private isLoading = false;

  private async handleAiAction(intent: AiIntent) {
    if (!this.aiClient) {
      this.error = new Error('AI client not configured');
      return;
    }

    try {
      this.isLoading = true;
      this.error = null;

      const context = this.buildContext();
      const result = await this.aiClient.runIntent(intent, context);

      this.result = result;
      this.dispatchEvent(new AiResultEvent(result));

    } catch (error) {
      this.error = error as Error;
      this.dispatchEvent(new AiErrorEvent(error as Error));

      // Log for debugging (remove in production)
      console.error('AI Intent failed:', {
        intent,
        error: error.message,
        code: error.code,
      });
    } finally {
      this.isLoading = false;
    }
  }

  private renderError() {
    if (!this.error) return null;

    return html`
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <div class="error-content">
          <h4>AI Analysis Failed</h4>
          <p>${this.error.message}</p>
          ${this.error.name === 'RateLimitError'
            ? html`<p class="error-hint">Try again in a few minutes.</p>`
            : null}
          ${this.error.name === 'AuthenticationError'
            ? html`<p class="error-hint">Check your API key configuration.</p>`
            : null}
        </div>
        <button @click=${this.clearError} class="error-dismiss">Dismiss</button>
      </div>
    `;
  }
}
```

**Checklist:**
- [ ] Add error classes to `@cognivo/core`
- [ ] Update `OpenAiClient` with try-catch
- [ ] Update all components to handle errors
- [ ] Add error UI components
- [ ] Test error scenarios

---

### 2. Write Tests for Production Components

**Setup Test Environment:**

```bash
# Install dependencies (already in package.json)
pnpm add -D @open-wc/testing @web/test-runner @web/test-runner-playwright
```

**Example Test: `ai-insight-card.test.ts`**

```typescript
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { AiInsightCard } from './ai-insight-card.js';
import { AiIntent } from '@cognivo/core';

describe('AiInsightCard', () => {
  describe('Rendering', () => {
    it('renders with default properties', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card></ai-insight-card>`
      );

      expect(el).to.exist;
      expect(el.title).to.equal('');
      expect(el.aiActions).to.deep.equal([]);
    });

    it('renders title correctly', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card title="Test Card"></ai-insight-card>`
      );

      const title = el.shadowRoot!.querySelector('.card-title');
      expect(title?.textContent).to.equal('Test Card');
    });

    it('renders AI action buttons', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain", "forecast"]'></ai-insight-card>`
      );

      const buttons = el.shadowRoot!.querySelectorAll('.ai-button');
      expect(buttons).to.have.length(2);
    });
  });

  describe('AI Integration', () => {
    it('emits ai:invoke event when button clicked', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain"]'></ai-insight-card>`
      );

      el.data = [{ value: 100 }];

      let eventFired = false;
      let eventIntent: AiIntent | null = null;

      el.addEventListener('ai:invoke', ((e: CustomEvent) => {
        eventFired = true;
        eventIntent = e.detail.intent;
      }) as EventListener);

      const button = el.shadowRoot!.querySelector('.ai-button') as HTMLElement;
      button.click();

      await waitUntil(() => eventFired);

      expect(eventFired).to.be.true;
      expect(eventIntent).to.equal(AiIntent.EXPLAIN);
    });

    it('displays loading state during AI request', async () => {
      const mockClient = {
        runIntent: () => new Promise(resolve => setTimeout(resolve, 100)),
      };

      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain"]'></ai-insight-card>`
      );

      el.aiClient = mockClient;
      el.data = [{ value: 100 }];

      const button = el.shadowRoot!.querySelector('.ai-button') as HTMLElement;
      button.click();

      await el.updateComplete;

      const loader = el.shadowRoot!.querySelector('ai-thinking-indicator');
      expect(loader).to.exist;
    });

    it('displays AI result after successful request', async () => {
      const mockClient = {
        runIntent: async () => ({
          explanation: 'Test explanation',
          confidence: 0.95,
        }),
      };

      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain"]'></ai-insight-card>`
      );

      el.aiClient = mockClient;
      el.data = [{ value: 100 }];

      const button = el.shadowRoot!.querySelector('.ai-button') as HTMLElement;
      button.click();

      await waitUntil(() => el.result !== null);

      expect(el.result?.explanation).to.equal('Test explanation');
    });

    it('displays error message on AI failure', async () => {
      const mockClient = {
        runIntent: async () => {
          throw new Error('API Error');
        },
      };

      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain"]'></ai-insight-card>`
      );

      el.aiClient = mockClient;
      el.data = [{ value: 100 }];

      const button = el.shadowRoot!.querySelector('.ai-button') as HTMLElement;
      button.click();

      await el.updateComplete;
      await waitUntil(() => el.error !== null);

      const errorEl = el.shadowRoot!.querySelector('.error-container');
      expect(errorEl).to.exist;
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card title="Revenue"></ai-insight-card>`
      );

      expect(el.getAttribute('role')).to.equal('region');
      expect(el.getAttribute('aria-label')).to.include('Revenue');
    });

    it('buttons are keyboard accessible', async () => {
      const el = await fixture<AiInsightCard>(
        html`<ai-insight-card ai-actions='["explain"]'></ai-insight-card>`
      );

      const button = el.shadowRoot!.querySelector('.ai-button') as HTMLElement;
      expect(button.getAttribute('tabindex')).to.not.equal('-1');
    });
  });
});
```

**Run Tests:**
```bash
cd packages/components
pnpm test

# Watch mode during development
pnpm test:watch
```

**Target Coverage:**
- ai-insight-card: 85%
- ai-table: 85%
- ai-mini-chart: 85%
- ai-thinking-indicator: 90%
- ai-confidence-badge: 90%

---

### 3. Fix Security Issues

#### Remove Hardcoded API Keys from Examples

**File: `examples/vanilla-html/index.html`**

```html
<!-- BEFORE -->
<script type="module">
  const aiClient = new OpenAiClient({
    apiKey: 'sk-...'  // ❌ Hardcoded
  });
</script>

<!-- AFTER -->
<script type="module">
  // Get API key from environment or prompt
  const apiKey = localStorage.getItem('openai_api_key') ||
    prompt('Enter your OpenAI API key (will be stored locally):');

  if (!apiKey) {
    alert('API key required to run this demo');
    throw new Error('Missing API key');
  }

  // Store for next visit
  localStorage.setItem('openai_api_key', apiKey);

  const aiClient = new OpenAiClient({ apiKey });

  // Add button to clear stored key
  document.querySelector('#clear-key')?.addEventListener('click', () => {
    localStorage.removeItem('openai_api_key');
    location.reload();
  });
</script>

<!-- Add UI for key management -->
<div class="api-key-manager">
  <button id="clear-key">Clear Stored API Key</button>
  <p class="note">Your API key is stored locally and never sent to Cognivo</p>
</div>
```

#### Add Input Validation

**File: `packages/adapter-openai/src/prompts.ts`**

```typescript
// BEFORE
export function buildPrompt(intent: AiIntent, context: AiContext): string {
  const { dataset, meta } = context;

  return `Analyze this ${meta?.dataType || 'data'} dataset...
Dataset:
${JSON.stringify(dataset, null, 2)}
`;
}

// AFTER
const MAX_DATASET_SIZE = 1000;
const MAX_STRING_LENGTH = 10000;
const MAX_DATASET_JSON_SIZE = 100000; // 100KB

export function buildPrompt(intent: AiIntent, context: AiContext): string {
  const { dataset, meta } = context;

  // Validate dataset size
  if (!Array.isArray(dataset)) {
    throw new ValidationError('Dataset must be an array');
  }

  if (dataset.length === 0) {
    throw new ValidationError('Dataset cannot be empty');
  }

  if (dataset.length > MAX_DATASET_SIZE) {
    throw new ValidationError(
      `Dataset too large: ${dataset.length} items (max: ${MAX_DATASET_SIZE})`
    );
  }

  // Sanitize string inputs
  const sanitizedMeta = sanitizeMeta(meta || {});

  // Serialize and check size
  const datasetJson = JSON.stringify(dataset, null, 2);
  if (datasetJson.length > MAX_DATASET_JSON_SIZE) {
    throw new ValidationError(
      `Dataset JSON too large: ${datasetJson.length} chars (max: ${MAX_DATASET_JSON_SIZE})`
    );
  }

  const dataType = sanitizedMeta.dataType || 'data';

  return `Analyze this ${dataType} dataset and provide insights.

Context:
- Timeframe: ${sanitizedMeta.timeframe || 'unknown'}
- Unit: ${sanitizedMeta.unit || 'unknown'}
- Data Type: ${dataType}

Dataset (${dataset.length} items):
${datasetJson}

Instructions:
${getIntentInstructions(intent)}
`;
}

function sanitizeMeta(meta: AiContextMeta): AiContextMeta {
  const sanitized: AiContextMeta = {};

  if (meta.dataType) {
    sanitized.dataType = sanitizeString(meta.dataType, 50);
  }

  if (meta.timeframe) {
    sanitized.timeframe = sanitizeString(meta.timeframe, 20);
  }

  if (meta.unit) {
    sanitized.unit = sanitizeString(meta.unit, 20);
  }

  // Copy other safe properties
  for (const [key, value] of Object.entries(meta)) {
    if (!sanitized[key] && typeof value === 'string') {
      sanitized[key] = sanitizeString(value, 100);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

function sanitizeString(input: string, maxLength: number): string {
  // Remove potentially dangerous characters
  const cleaned = input
    .replace(/[<>{}[\]\\]/g, '')  // Remove injection chars
    .replace(/\n\n+/g, '\n')       // Normalize newlines
    .trim();

  // Truncate to max length
  return cleaned.substring(0, maxLength);
}
```

#### Configure Security Auditing

**File: `.github/workflows/security.yml`**

```yaml
name: Security Audit

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    # Run weekly on Monday at 9 AM UTC
    - cron: '0 9 * * 1'

jobs:
  audit:
    name: Dependency Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run pnpm audit
        run: pnpm audit --audit-level=moderate

      - name: Check for security issues
        run: |
          # Fail if high or critical vulnerabilities
          pnpm audit --audit-level=high --json > audit-result.json || true
          if grep -q '"severity": "high"\|"severity": "critical"' audit-result.json; then
            echo "High or critical vulnerabilities found!"
            exit 1
          fi
```

**Add to `package.json`:**
```json
{
  "scripts": {
    "security:audit": "pnpm audit --audit-level=moderate",
    "security:fix": "pnpm audit --fix",
    "security:check": "pnpm audit --audit-level=high"
  }
}
```

---

## 🟡 HIGH PRIORITY (Week 2-3)

### 4. Add CI/CD Pipeline

**File: `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Format check
        run: pnpm prettier --check .

  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        run: pnpm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build packages
        run: pnpm build

      - name: Check bundle size
        run: |
          cd packages/components
          ls -lh dist/index.js
          # Fail if bundle > 100KB
          size=$(stat -f%z dist/index.js 2>/dev/null || stat -c%s dist/index.js)
          if [ $size -gt 102400 ]; then
            echo "Bundle too large: $size bytes (max: 102400)"
            exit 1
          fi
```

---

## Checklist Summary

### Week 1 (Critical)
- [ ] Create error classes in `@cognivo/core/src/errors`
- [ ] Add try-catch to all `async` functions
- [ ] Add error UI to components
- [ ] Write 50+ unit tests for 8 production components
- [ ] Remove hardcoded API keys from examples
- [ ] Add input validation and sanitization
- [ ] Configure security audit workflow

### Week 2-3 (High)
- [ ] Set up CI/CD pipeline
- [ ] Achieve 80% test coverage
- [ ] Add integration tests
- [ ] Configure automated releases
- [ ] Add bundle size monitoring

### Week 4-8 (Implementation)
- [ ] Implement top 20 stub components
- [ ] Add E2E tests for key user flows
- [ ] Performance benchmarks
- [ ] Accessibility audit

---

**Track Progress:**
Create GitHub issues for each item and link them to a project board for visibility.
