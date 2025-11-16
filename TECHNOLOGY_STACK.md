# Technology Stack & Tooling
## Complete Technology Decisions for Cognivo

---

## Core Stack

### Monorepo Management

**Choice: Turborepo + pnpm**

```json
{
  "name": "cognivo",
  "private": true,
  "workspaces": ["packages/*"],
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

**Why Turborepo:**
- ⚡ Fastest builds with intelligent caching
- 📦 Easy multi-package orchestration
- 🔄 Incremental builds (only rebuild changed packages)
- ☁️ Remote caching support
- 🎯 Better DX than Nx or Lerna

**Why pnpm:**
- 💾 Disk efficient (hard links, single storage)
- 🚀 3x faster than npm
- 🔒 Strict dependency resolution (prevents phantom deps)
- 📦 Workspace protocol support
- 🌍 Widely adopted, stable

**Alternatives Considered:**
- ❌ npm workspaces - Slower, less features
- ❌ Yarn workspaces - Faster but pnpm is better
- ❌ Nx - More complex, overkill for our needs

---

### Language

**Choice: TypeScript 5.5+**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true
  }
}
```

**Key Features We'll Use:**
- ✅ Strict mode (catch errors early)
- ✅ Type inference (less boilerplate)
- ✅ Generics (type-safe AI contexts)
- ✅ Template literal types (for intent strings)
- ✅ Discriminated unions (for result types)
- ✅ Declaration maps (great debugging)

---

### Styling System

**Choice: Vanilla Extract + CSS Variables**

```bash
pnpm add -D @vanilla-extract/css @vanilla-extract/vite-plugin
```

**Example:**

```typescript
// packages/tokens/src/colors.css.ts
import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',

    // AI-specific colors
    aiAccent: '#8B5CF6',
    aiHighlight: '#A78BFA',
    aiBackground: '#F3F4F6',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
});
```

```typescript
// packages/vue/src/components/Card.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@cognivo/tokens';

export const card = style({
  backgroundColor: 'white',
  borderRadius: vars.radius.lg,
  padding: vars.space.md,
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',

  ':hover': {
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
});

export const aiCard = style({
  borderLeft: `4px solid ${vars.color.aiAccent}`,
  backgroundColor: vars.color.aiBackground,
});
```

**Why Vanilla Extract:**
- ✅ Zero runtime (generates static CSS)
- ✅ Type-safe (autocomplete, errors)
- ✅ Framework-agnostic (works everywhere)
- ✅ Themeable (CSS variables)
- ✅ Best DX (better than Tailwind utilities)
- ✅ Tree-shakeable (unused styles removed)

**Why NOT Tailwind:**
- ❌ Verbose className strings
- ❌ No type safety
- ❌ Hard to maintain at scale
- ❌ Not designer-friendly
- ❌ User explicitly doesn't like it

---

### Build Tools

**Choice: Vite 6.x**

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    vanillaExtractPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@cognivo/core'],
    },
  },
});
```

**Why Vite:**
- ⚡ Lightning fast (native ESM)
- 🔥 HMR (instant updates)
- 📦 Built on Rollup (great tree-shaking)
- 🔌 Great plugin ecosystem
- 🎯 Perfect for library builds

---

### Testing

**Choice: Vitest + Testing Library**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/*.css.ts',
      ],
    },
  },
});
```

**Stack:**
- `vitest` - Test runner (Vite-native, fast)
- `@testing-library/vue` - Vue component testing
- `@testing-library/react` - React component testing
- `@testing-library/user-event` - User interactions
- `happy-dom` or `jsdom` - DOM environment

**Example Test:**

```typescript
// AiInsightCard.spec.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { AiInsightCard } from './AiInsightCard.vue';
import { AiIntent } from '@cognivo/core';

describe('AiInsightCard', () => {
  it('renders data correctly', () => {
    const data = [{ month: 'Jan', value: 100 }];

    render(AiInsightCard, {
      props: { data, aiActions: ['explain'] },
    });

    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('calls AI client on explain button click', async () => {
    const mockClient = {
      runIntent: vi.fn().mockResolvedValue({
        explanation: 'Test result',
        confidence: 0.9,
      }),
    };

    render(AiInsightCard, {
      props: { data: [], aiActions: ['explain'] },
      global: {
        provide: { aiClient: mockClient },
      },
    });

    await fireEvent.click(screen.getByText('Explain'));

    expect(mockClient.runIntent).toHaveBeenCalledWith(
      AiIntent.EXPLAIN,
      expect.objectContaining({ dataset: [] })
    );
  });
});
```

**Why Vitest:**
- ⚡ Fast (Vite-powered)
- 🎯 Jest-compatible API
- 📸 Snapshot testing
- 🔍 Great error messages
- 🎨 UI mode for debugging

---

### Documentation

**Choice: VitePress 1.x**

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Cognivo',
  description: 'AI-Native Component Library',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quickstart' },
          ],
        },
        {
          text: 'AI Integration',
          items: [
            { text: 'AI Concepts', link: '/guide/ai-concepts' },
            { text: 'AI Client Setup', link: '/guide/ai-client' },
            { text: 'Adapters', link: '/guide/adapters' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'AI-Enhanced',
          items: [
            { text: 'AiInsightCard', link: '/components/ai-insight-card' },
            { text: 'AiTable', link: '/components/ai-table' },
            { text: 'AiMiniChart', link: '/components/ai-mini-chart' },
          ],
        },
      ],
    },
  },
});
```

**Why VitePress:**
- 🚀 Vite-powered (fast)
- 🎨 Vue-powered (can embed live components)
- 📝 Markdown-based
- 🎯 Great for library docs
- 🌙 Dark mode built-in

---

### Linting & Formatting

**Choice: ESLint + Prettier + TypeScript ESLint**

```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import vue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@typescript-eslint': typescript },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    plugins: { vue },
    rules: {
      'vue/multi-word-component-names': 'error',
      'vue/require-prop-types': 'error',
    },
  },
];
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

---

### Web Components (Lit)

**Choice: Lit 4.0**

```bash
pnpm add lit
```

```typescript
// packages/primitives/src/ai-thinking-indicator/index.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ai-thinking-indicator')
export class AiThinkingIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      gap: 4px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ai-accent-color, #8B5CF6);
      animation: pulse 1.4s infinite ease-in-out;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; }
      40% { opacity: 1; }
    }
  `;

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  render() {
    return html`
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ai-thinking-indicator': AiThinkingIndicator;
  }
}
```

**Why Lit:**
- 🪶 Lightweight (~5kb)
- ⚡ Fast (no virtual DOM)
- 🎯 Standard web components
- 🔥 Great DX (decorators, reactive)
- 🌍 Framework-agnostic

---

### Vue Integration

**Choice: Vue 3.5+ with Composition API**

```typescript
// packages/vue/src/index.ts
import type { App, Plugin } from 'vue';
import type { AiClient } from '@cognivo/core';

// Components
export { default as AiInsightCard } from './components/AiInsightCard.vue';
export { default as AiTable } from './components/AiTable.vue';
export { default as Card } from './components/Card.vue';

// Composables
export { useAiClient } from './composables/useAiClient';
export { useAiIntent } from './composables/useAiIntent';

// Provider
export function createAiProvider(client: AiClient): Plugin {
  return {
    install(app: App) {
      app.provide('aiClient', client);
    },
  };
}
```

```typescript
// packages/vue/src/composables/useAiIntent.ts
import { ref, inject } from 'vue';
import { AiIntent, type AiContext, type AiResult } from '@cognivo/core';

export function useAiIntent() {
  const aiClient = inject('aiClient');
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const result = ref<AiResult | null>(null);

  async function run<T>(intent: AiIntent, context: AiContext<T>) {
    loading.value = true;
    error.value = null;

    try {
      result.value = await aiClient.runIntent(intent, context);
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }

    return result.value;
  }

  return {
    loading,
    error,
    result,
    run,
  };
}
```

---

### React Integration (Phase 2)

**Choice: React 19+ with Hooks**

```typescript
// packages/react/src/index.ts
export { AiProvider, useAiClient } from './context/AiProvider';
export { useAiIntent } from './hooks/useAiIntent';
export { AiInsightCard } from './components/AiInsightCard';
```

```tsx
// packages/react/src/hooks/useAiIntent.ts
import { useState, useCallback } from 'react';
import { useAiClient } from '../context/AiProvider';
import { AiIntent, type AiContext, type AiResult } from '@cognivo/core';

export function useAiIntent() {
  const aiClient = useAiClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);

  const run = useCallback(
    async <T,>(intent: AiIntent, context: AiContext<T>) => {
      setLoading(true);
      setError(null);

      try {
        const res = await aiClient.runIntent(intent, context);
        setResult(res);
        return res;
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [aiClient]
  );

  return { loading, error, result, run };
}
```

---

### AI/LLM SDKs

**OpenAI:**

```bash
pnpm add openai
```

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
```

**Anthropic:**

```bash
pnpm add @anthropic-ai/sdk
```

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
```

**Ollama (Local):**

```bash
# Just use fetch, no package needed
```

```typescript
const response = await fetch('http://localhost:11434/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    model: 'llama3.1',
    prompt: '...',
  }),
});
```

---

### Version Control

**Git Conventions:**

```bash
# Branch naming
feature/ai-insight-card
fix/table-rendering
docs/api-reference
chore/update-deps

# Commit messages (Conventional Commits)
feat(vue): add AiInsightCard component
fix(core): handle empty dataset in context builder
docs(guide): add AI integration examples
chore(deps): update vite to 6.0.0
```

**Changesets for Versioning:**

```bash
pnpm add -D @changesets/cli
```

```markdown
<!-- .changeset/amazing-ai-card.md -->
---
'@cognivo/vue': minor
'@cognivo/core': patch
---

Add AiInsightCard component with explain and forecast intents
```

**Why Changesets:**
- 📦 Automatic versioning
- 📝 Auto-generated changelogs
- 🔄 Handles inter-package dependencies
- 🚀 Publish workflow automation

---

### CI/CD

**GitHub Actions:**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run test
      - run: pnpm run build

  publish:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4

      - run: pnpm install
      - run: pnpm run build

      - name: Publish to NPM
        run: pnpm changeset publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Development Tools

### VS Code Extensions

Required:
- `Vue.volar` - Vue 3 support
- `dbaeumer.vscode-eslint` - ESLint
- `esbenp.prettier-vscode` - Prettier
- `styled-components.vscode-styled-components` - Vanilla Extract syntax

Recommended:
- `GitHub.copilot` - AI assistance
- `eamodio.gitlens` - Git supercharged
- `usernamehw.errorlens` - Inline errors

### Package Scripts

```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "eslint .",
    "format": "prettier --write .",
    "type-check": "turbo run type-check",
    "changeset": "changeset",
    "version": "changeset version",
    "publish": "turbo run build && changeset publish"
  }
}
```

---

## Package Dependency Strategy

### Core Dependencies

```json
// packages/core/package.json
{
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  }
}
```

### Vue Package

```json
// packages/vue/package.json
{
  "peerDependencies": {
    "vue": "^3.5.0",
    "@cognivo/core": "workspace:*"
  },
  "dependencies": {
    "@cognivo/tokens": "workspace:*"
  }
}
```

**Key Principles:**
- ✅ Use `peerDependencies` for framework (Vue, React)
- ✅ Use `workspace:*` for internal packages
- ✅ Minimal dependencies (avoid bloat)
- ✅ Tree-shakeable exports

---

## Summary

| Category | Technology | Why |
|----------|-----------|-----|
| **Monorepo** | Turborepo + pnpm | Fast, efficient, best DX |
| **Language** | TypeScript 5.5+ | Type safety, great tooling |
| **Styling** | Vanilla Extract | Type-safe, zero-runtime |
| **Build** | Vite 6.x | Fast, modern, great for libs |
| **Testing** | Vitest | Fast, Vite-native |
| **Docs** | VitePress | Fast, Vue-powered |
| **Linting** | ESLint + Prettier | Standard, configurable |
| **Web Components** | Lit 4.0 | Lightweight, modern |
| **Vue** | Vue 3.5+ | Best DX, modern reactivity |
| **React** | React 19+ | Largest ecosystem |
| **Versioning** | Changesets | Automatic, reliable |
| **CI/CD** | GitHub Actions | Free, integrated |

**Next:** Set up monorepo structure with these tools!
