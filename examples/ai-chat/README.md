# Cognivo AI Chat Demo

This is a testing environment for Cognivo AI components. As we build components, they're integrated into this chat interface for visual feedback and integration testing.

## Features

- 🎯 **All 8 AI Intents**: Test every AI action (explain, forecast, detect_anomaly, etc.)
- 📊 **Sample Datasets**: Three datasets to test with (spending, revenue, users)
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 💬 **Real-time Chat**: Interactive chat interface
- 📈 **Stats Tracking**: Track messages and AI actions

## Components Integrated

- ✅ **AI Action Button** - Trigger AI actions
- ✅ **AI Thinking Indicator** - Loading state
- ✅ **AI Confidence Badge** - Show confidence scores
- 🔲 AI Result Panel (coming soon)
- 🔲 AI Table (coming soon)
- 🔲 AI Mini Chart (coming soon)

## Running the Demo

### Development Mode

```bash
# From the ai-chat directory
pnpm run dev
```

This will start a local server with hot reload.

### Build for Production

```bash
pnpm run build
```

## Usage

1. **Select a Dataset**: Choose from spending, revenue, or user metrics
2. **Click an AI Action**: Click any of the 8 AI action buttons in the sidebar
3. **Watch the Result**: See the AI component in action
4. **Test Interactions**: Try different combinations of actions and datasets

## Development Workflow

When building a new component:

1. Build the component in `packages/components/`
2. Import it in `main.ts`
3. Add it to the appropriate message type
4. Test visually in the chat interface
5. Iterate based on feedback

## Sample Data

### Spending Dataset
Monthly spending with one anomaly (March 93% spike)

### Revenue Dataset
Revenue by product with growth rates

### User Metrics
Daily signups and churn data

## Next Steps

- [ ] Integrate AI Result Panel
- [ ] Add AI Table for data display
- [ ] Add AI Mini Chart for visualizations
- [ ] Connect real OpenAI API
- [ ] Add more sample datasets
- [ ] Add conversation history export
