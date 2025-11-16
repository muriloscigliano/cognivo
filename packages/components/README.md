# @cognivo/components

AI-native web components for intelligent dashboards. Built with Lit, works everywhere.

## Features

- 🌐 **Framework-Agnostic** - Works in Vue, React, Angular, Svelte, vanilla JS
- 🤖 **AI-Powered** - Explain, forecast, detect anomalies, and more
- 🎨 **Themeable** - Design tokens, light/dark mode
- 📦 **Tree-Shakeable** - Import only what you need
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📱 **Responsive** - Mobile-first design

## Installation

```bash
pnpm add @cognivo/components @cognivo/adapter-openai
```

## Quick Start

### Vanilla HTML/JS

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { AiInsightCard } from '@cognivo/components';
    import { OpenAiClient } from '@cognivo/adapter-openai';

    // Create AI client
    const aiClient = new OpenAiClient({
      apiKey: 'your-openai-api-key'
    });

    // Get the card element
    const card = document.querySelector('ai-insight-card');

    // Set data and AI client
    card.data = [
      { month: 'Jan', spending: 1200 },
      { month: 'Feb', spending: 1450 },
      { month: 'Mar', spending: 2800 }, // AI will detect this spike!
    ];
    card.aiClient = aiClient;
    card.meta = { unit: 'USD', timeframe: 'monthly' };

    // Listen for results
    card.addEventListener('ai:result', (e) => {
      console.log('AI Result:', e.detail.result);
    });
  </script>
</head>
<body>
  <ai-insight-card
    title="Monthly Spending"
    ai-actions='["explain", "forecast"]'
  >
    <div>Your data visualization here</div>
  </ai-insight-card>
</body>
</html>
```

### Vue 3

```vue
<script setup>
import { ref, onMounted } from 'vue';
import '@cognivo/components';
import { OpenAiClient } from '@cognivo/adapter-openai';

const card = ref(null);

const aiClient = new OpenAiClient({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const data = [
  { month: 'Jan', spending: 1200 },
  { month: 'Feb', spending: 1450 },
  { month: 'Mar', spending: 2800 },
];

onMounted(() => {
  if (card.value) {
    card.value.data = data;
    card.value.aiClient = aiClient;
    card.value.meta = { unit: 'USD', timeframe: 'monthly' };
  }
});

function handleResult(event) {
  console.log('AI Result:', event.detail.result);
}
</script>

<template>
  <ai-insight-card
    ref="card"
    title="Monthly Spending"
    :ai-actions="['explain', 'forecast']"
    @ai:result="handleResult"
  >
    <div>Your chart here</div>
  </ai-insight-card>
</template>
```

### React

```tsx
import { useRef, useEffect } from 'react';
import '@cognivo/components';
import { OpenAiClient } from '@cognivo/adapter-openai';
import type { AiInsightCard } from '@cognivo/components';

function Dashboard() {
  const cardRef = useRef<AiInsightCard>(null);

  const aiClient = new OpenAiClient({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const data = [
    { month: 'Jan', spending: 1200 },
    { month: 'Feb', spending: 1450 },
    { month: 'Mar', spending: 2800 },
  ];

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.data = data;
      cardRef.current.aiClient = aiClient;
      cardRef.current.meta = { unit: 'USD', timeframe: 'monthly' };

      cardRef.current.addEventListener('ai:result', (e) => {
        console.log('AI Result:', e.detail.result);
      });
    }
  }, []);

  return (
    <ai-insight-card
      ref={cardRef}
      title="Monthly Spending"
      ai-actions={JSON.stringify(['explain', 'forecast'])}
    >
      <div>Your chart here</div>
    </ai-insight-card>
  );
}
```

## Components

### AI Components

- `<ai-insight-card>` - Card with AI explanations, forecasts, and insights
- `<ai-thinking-indicator>` - Animated loading indicator
- `<ai-confidence-badge>` - Shows AI confidence score

### Coming Soon

- `<ai-table>` - Table with anomaly detection
- `<ai-mini-chart>` - Chart with AI annotations
- `<ai-forecast-chart>` - Chart with predictions
- `<cg-card>`, `<cg-badge>`, etc. - Base components

## AI Actions

All AI components support these actions:

- `explain` - Explain patterns and trends
- `forecast` - Predict future values
- `detect_anomaly` - Find outliers
- `summarize` - Summarize data
- `classify` - Categorize items
- `optimize` - Suggest improvements
- `compare` - Compare datasets
- `cluster` - Group similar items

## Events

All AI components emit these events:

- `ai:invoke` - Fired when AI action is triggered
- `ai:result` - Fired when AI returns a result
- `ai:error` - Fired when AI encounters an error

## Styling

Components use CSS custom properties (design tokens) for theming:

```css
:root {
  --cg-brand-primary-300: #8B5CF6;
  --cg-brand-ai-accent: #8B5CF6;
  --cg-spacing-md: 16px;
  /* ... many more tokens */
}
```

### Dark Mode

```html
<html data-theme="dark">
  <!-- Components automatically use dark theme -->
</html>
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
