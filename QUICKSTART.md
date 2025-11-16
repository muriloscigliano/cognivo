# 🚀 Cognivo Quick Start Guide

## See the Components NOW (3 ways)

### Option 1: Open Locally (Easiest!)
```bash
# Just open in your browser:
open demo.html
# or
firefox demo.html
# or double-click demo.html in your file explorer
```

### Option 2: Use the Dev Server
```bash
# AI Chat example (running on port 5174)
cd examples/ai-chat
pnpm dev
# Open http://localhost:5174
```

### Option 3: Deploy to See it Live
```bash
# Deploy to Vercel
vercel --prod

# Or use the standalone demo
cp demo.html public/index.html
vercel --prod
```

## Add Real AI (OpenAI Integration)

### 1. Get an API Key
- Go to https://platform.openai.com/api-keys
- Create a new API key
- Copy it

### 2. Create a Simple AI-Powered Example

Create a file `ai-demo.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cognivo + OpenAI Demo</title>
    <link rel="stylesheet" href="./packages/tokens/index.css">
</head>
<body>
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
        <h1>AI-Powered Financial Analysis</h1>

        <!-- Your components -->
        <ai-thinking-indicator id="thinking"></ai-thinking-indicator>
        <ai-insight-card id="insight"></ai-insight-card>
        <ai-confidence-badge id="confidence"></ai-confidence-badge>

        <button onclick="analyzeData()">🤖 Analyze with AI</button>

        <div id="response" style="margin-top: 1rem; padding: 1rem; background: #f3f4f6;"></div>
    </div>

    <script type="module">
        import { OpenAiClient } from '@cognivo/adapter-openai';
        import { AiIntent } from '@cognivo/core';
        import '@cognivo/components';

        // Configure OpenAI
        const aiClient = new OpenAiClient({
            apiKey: 'YOUR_API_KEY_HERE', // Replace with your actual key
            defaultModel: 'gpt-4o-mini',
            defaultTemperature: 0.3
        });

        // Sample data
        const spendingData = [
            { month: 'Jan', amount: 12450 },
            { month: 'Feb', amount: 11890 },
            { month: 'Mar', amount: 43291 }, // Anomaly!
            { month: 'Apr', amount: 13200 }
        ];

        window.analyzeData = async function() {
            const thinking = document.getElementById('thinking');
            const insight = document.getElementById('insight');
            const confidence = document.getElementById('confidence');
            const response = document.getElementById('response');

            // Show loading
            thinking.style.display = 'block';
            response.textContent = 'AI is analyzing...';

            try {
                // Call OpenAI to detect anomalies
                const result = await aiClient.detectAnomaly(spendingData, {
                    context: {
                        metric: 'Monthly spending',
                        unit: 'USD'
                    }
                });

                // Hide loading
                thinking.style.display = 'none';

                // Show results
                response.textContent = JSON.stringify(result, null, 2);

                // Update components
                confidence.setAttribute('confidence', result.confidence || 0.95);
                insight.setAttribute('title', 'Anomaly Detected');

                console.log('AI Response:', result);
            } catch (error) {
                thinking.style.display = 'none';
                response.textContent = 'Error: ' + error.message;
                console.error(error);
            }
        };
    </script>
</body>
</html>
```

### 3. Run it
```bash
# Install packages if needed
pnpm build

# Open the file
open ai-demo.html
```

## What's Working Right Now

✅ **8 Production Components:**
- `<ai-insight-card>` - Display AI insights with confidence scores
- `<ai-confidence-badge>` - Visual confidence indicators
- `<ai-thinking-indicator>` - Loading states for AI processing
- `<ai-action-button>` - Trigger AI actions
- `<ai-action-group>` - Group multiple AI actions
- `<ai-mini-chart>` - Compact data visualizations
- `<ai-result-panel>` - Display AI results
- `<ai-table>` - Data tables with AI enhancements

✅ **AI Intents (8 types):**
- EXPLAIN - Explain data patterns
- SUMMARIZE - Summarize datasets
- FORECAST - Predict future trends
- DETECT_ANOMALY - Find unusual patterns
- CLASSIFY - Categorize data
- OPTIMIZE - Suggest improvements
- COMPARE - Compare datasets
- CLUSTER - Group similar items

✅ **OpenAI Integration:**
- Ready to use with `@cognivo/adapter-openai`
- Supports GPT-4, GPT-4o, GPT-4o-mini
- Structured outputs with type safety

## Next Steps

1. **See the demo**: Open `demo.html` in your browser
2. **Add your API key**: Create `ai-demo.html` with the code above
3. **Build something**: Use the components in your app!

## Examples to Try

### Example 1: Detect Spending Anomalies
```javascript
const result = await aiClient.detectAnomaly(spendingData, {
    context: { metric: 'spending', unit: 'USD' }
});
```

### Example 2: Forecast Revenue
```javascript
const result = await aiClient.forecast(revenueData, {
    context: { periods: 3, metric: 'revenue' }
});
```

### Example 3: Summarize User Behavior
```javascript
const result = await aiClient.summarize(userData, {
    context: { focus: 'engagement patterns' }
});
```

## Need Help?

- **Components not showing?** Make sure you built the packages: `pnpm build`
- **AI not working?** Check your API key and network connection
- **Styling issues?** Ensure `packages/tokens/index.css` is imported

## Deploy It!

```bash
# To Vercel (recommended)
vercel --prod

# To Netlify
netlify deploy --prod

# To GitHub Pages
# Push to main branch and enable GitHub Pages in repo settings
```

---

**Ready to see it?** Just open `demo.html` in your browser! 🎉
