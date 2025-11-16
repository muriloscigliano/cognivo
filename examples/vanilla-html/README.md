# Vanilla HTML Example

This example shows how to use Cognivo components in plain HTML/JavaScript.

## Running the Example

1. **Install dependencies** (in root):
   ```bash
   pnpm install
   ```

2. **Build the packages**:
   ```bash
   pnpm build
   ```

3. **Serve the HTML file**:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node
   npx serve .

   # Or just open index.html in your browser
   ```

4. **Add your OpenAI API key** in the top-right input

5. **Click the AI buttons** to see it in action!

## How It Works

```html
<!-- 1. Import the components -->
<script type="module">
  import '@cognivo/components';
  import { OpenAiClient } from '@cognivo/adapter-openai';

  // 2. Create AI client
  const aiClient = new OpenAiClient({
    apiKey: 'your-api-key'
  });

  // 3. Get the component
  const card = document.querySelector('ai-insight-card');

  // 4. Set properties
  card.data = [...];
  card.aiClient = aiClient;
  card.meta = { unit: 'USD' };

  // 5. Listen for events
  card.addEventListener('ai:result', (e) => {
    console.log(e.detail.result);
  });
</script>

<!-- 6. Use the component -->
<ai-insight-card
  title="Monthly Spending"
  ai-actions='["explain", "forecast"]'
>
  <div>Your data here</div>
</ai-insight-card>
```

## Features Demonstrated

- ✅ AI Insight Card with multiple actions
- ✅ AI Thinking Indicator (loading states)
- ✅ AI Confidence Badges
- ✅ Event handling
- ✅ Dark mode support
- ✅ Responsive design

## Next Steps

- Try different AI actions (explain, forecast, detect_anomaly)
- Customize the styling with CSS custom properties
- Add your own data visualizations
- Integrate with your favorite charting library
