# Cognivo

**AI-Native Component Library** - Transform dashboards into intelligent interfaces.

> ⚠️ **Project Status:** Initial Planning Phase - Not yet ready for production use.

## What is Cognivo?

Cognivo is a component library that embeds AI directly into your UI components. Instead of chatbots, you get:

- 📊 **AI-powered cards** that explain patterns
- 📈 **Smart charts** that forecast trends
- 🔍 **Intelligent tables** that detect anomalies
- 💡 **Contextual insights** embedded in your dashboard

**Not a chatbot library. A component library with AI superpowers.**

## Key Features

✅ **AI-Native** - Built for LLM integration from the ground up
✅ **Framework Support** - Vue 3, React (planned), Svelte (planned)
✅ **LLM-Agnostic** - Works with OpenAI, Anthropic, local models, or custom backends
✅ **Type-Safe** - Full TypeScript support with intelligent autocomplete
✅ **Structured Outputs** - Predictable, schema-validated AI responses
✅ **Designer-Friendly** - Token-based theming, not utility classes

## Architecture

```
┌─────────────────────────────────────────┐
│  Your Application (Vue/React/Svelte)   │
└─────────────────┬───────────────────────┘
                  │
        ┌─────────┼──────────┐
        │         │          │
┌───────▼───┐ ┌──▼──────┐ ┌─▼────────────┐
│@cognivo/  │ │@cognivo/│ │ @cognivo/    │
│vue        │ │react    │ │ primitives   │
│           │ │         │ │ (Web Comp.)  │
└─────┬─────┘ └────┬────┘ └──────┬───────┘
      │            │             │
      └────────────┼─────────────┘
                   │
          ┌────────▼─────────┐
          │  @cognivo/core   │
          │  (AI contracts)  │
          └────────┬─────────┘
                   │
      ┌────────────┼────────────┐
      │            │            │
┌─────▼─────┐ ┌───▼──────┐ ┌──▼──────┐
│ OpenAI    │ │Anthropic │ │ Local   │
│ Adapter   │ │ Adapter  │ │ Adapter │
└───────────┘ └──────────┘ └─────────┘
```

## Quick Example

```vue
<script setup>
import { AiInsightCard } from '@cognivo/vue';

const monthlySpending = [
  { month: 'Jan', amount: 1200 },
  { month: 'Feb', amount: 1450 },
  { month: 'Mar', amount: 2800 }, // AI will detect this spike!
];
</script>

<template>
  <AiInsightCard
    :data="monthlySpending"
    :ai-actions="['explain', 'forecast']"
    :meta="{ unit: 'USD', timeframe: 'monthly' }"
  />
</template>
```

**Result:** Card shows your data + AI insights panel explaining the March spike, predicting April spending.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@cognivo/core` | Framework-agnostic AI logic | 🏗️ In Progress |
| `@cognivo/tokens` | Design tokens (CSS variables) | 📋 Planned |
| `@cognivo/vue` | Vue 3 components | 📋 Planned |
| `@cognivo/react` | React components | 📋 Planned |
| `@cognivo/primitives` | Web Components (Lit) | 📋 Planned |
| `@cognivo/adapter-openai` | OpenAI integration | 📋 Planned |
| `@cognivo/adapter-anthropic` | Anthropic/Claude integration | 📋 Planned |
| `@cognivo/adapter-local` | Local LLM support | 📋 Planned |

## Documentation

📖 See the `/docs` folder for comprehensive guides:

- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Full architecture and roadmap
- [FRAMEWORK_COMPARISON.md](./FRAMEWORK_COMPARISON.md) - Framework approach analysis
- [AI_INTEGRATION_GUIDE.md](./AI_INTEGRATION_GUIDE.md) - How AI integration works
- [TECHNOLOGY_STACK.md](./TECHNOLOGY_STACK.md) - Technology decisions

## Development

This project uses:

- **pnpm** - Fast, disk-efficient package manager
- **Turborepo** - Intelligent monorepo builds
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast builds
- **Vitest** - Modern testing

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Development mode
pnpm dev
```

## Roadmap

### Phase 0: Foundation (Weeks 1-2) ✅ In Progress
- [x] Architecture planning
- [x] Monorepo setup
- [x] Core types and interfaces
- [ ] Design token system
- [ ] Documentation site scaffold

### Phase 1: Core + Vue Basics (Weeks 3-6)
- [ ] OpenAI adapter
- [ ] Anthropic adapter
- [ ] First 20 base components (Vue)
- [ ] Playground demo app

### Phase 2: AI-Enhanced Components (Weeks 7-10)
- [ ] AiInsightCard
- [ ] AiTable
- [ ] AiMiniChart
- [ ] AI loading states

### Phase 3: React Support (Weeks 11-14)
- [ ] Port core components to React
- [ ] React-specific hooks

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for full roadmap.

## Contributing

This project is in early planning stages. Contributions welcome once we reach Phase 1!

## License

MIT © Murilo Scigliano

## Questions?

- 📧 Contact: [GitHub Issues](https://github.com/muriloscigliano/cognivo/issues)
- 📚 Docs: Coming soon
- 💬 Discussions: Coming soon

---

**Status:** 🏗️ **Planning Phase** - Star & watch for updates!
