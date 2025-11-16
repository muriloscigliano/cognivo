# Cognivo Component Explorer

An interactive documentation and playground interface for exploring Cognivo components.

## Features

### 📱 Three-Panel Layout

**Left Sidebar (280px)**
- Component list organized by category
- Visual status badges (Ready/Stub)
- Click to load component documentation
- Categories: AI Core, Charts, Display, Data, etc.

**Middle Panel (Flex)**
- Component title and description
- Installation instructions
- Usage examples with code
- Props and events tables
- Live demo area

**Right Sidebar (400px)**
- AI chat assistant
- Ask questions about components
- Get instant answers
- Contextual suggestions

## Usage

Simply open `index.html` in your browser:

```bash
cd examples/component-explorer
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

## Features

- ✅ **Component Navigation** - Browse all 207 components
- ✅ **Live Documentation** - Props, events, examples
- ✅ **AI Chat Assistant** - Get help with any component
- ✅ **Status Indicators** - See which components are ready vs. stubs
- ✅ **Code Examples** - Copy-paste ready code snippets
- ✅ **Responsive Design** - Clean, professional UI

## Customization

### Add More Components

Edit the component list in the left sidebar:

```html
<li class="component-item" data-component="your-component">
  <span class="component-icon">🎯</span>
  <span>YourComponent</span>
  <span class="status-badge ready">Ready</span>
</li>
```

### Integrate Real AI

Replace the `simulateAIResponse()` function with actual OpenAI/Anthropic calls:

```javascript
async function getAIResponse(userMessage) {
  const response = await aiClient.runIntent(
    AiIntent.EXPLAIN,
    {
      dataset: [{ component: activeComponent, question: userMessage }],
      meta: { context: 'documentation' }
    }
  );
  return response.explanation;
}
```

### Load Component Specs Dynamically

Replace the static HTML with dynamic loading:

```javascript
async function loadComponentSpec(componentName) {
  const spec = await fetch(`/api/components/${componentName}`);
  const data = await spec.json();
  renderComponentSpec(data);
}
```

## Future Enhancements

- [ ] Connect to real component registry
- [ ] Live playground with code editor
- [ ] Real AI integration for chat
- [ ] Search functionality
- [ ] Dark mode toggle
- [ ] Export code examples
- [ ] Component comparison view
- [ ] Version history

## Tech Stack

- Pure HTML/CSS/JavaScript (no build step)
- Modern CSS Grid layout
- Vanilla JavaScript for interactions
- Ready for integration with Cognivo components

## License

MIT
