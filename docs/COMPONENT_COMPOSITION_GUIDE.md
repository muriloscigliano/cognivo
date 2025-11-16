# Component Composition Guide

A practical guide for building AI-native interfaces using Cognivo's atomic design system.

## 🎯 Quick Reference

### When to Use Each Level

| Level | Use When | Examples |
|-------|----------|----------|
| **Atom** | Single-purpose, indivisible element | Button, Icon, Badge |
| **Molecule** | Combining 2-3 atoms for a simple function | Search bar, Card, List item |
| **Organism** | Complex feature with multiple molecules | Data table, Chart, Navigation |
| **Template** | Page layout with placeholder content | Dashboard layout, Form layout |
| **Page** | Complete page with real content | User dashboard, Chat interface |

---

## 🔨 Building Patterns

### Pattern 1: Progressive Enhancement

Start with base components, add AI enhancements:

```typescript
// Base: Simple metric display
<metric-card value="1,234" label="Revenue"></metric-card>

// Enhanced: Add AI trend
<metric-card value="1,234" label="Revenue">
  <mini-line-chart slot="trend"></mini-line-chart>
  <kpi-delta value="+12%"></kpi-delta>
</metric-card>

// AI-Native: Full AI enhancement
<ai-metric-card value="1,234" label="Revenue">
  <ai-trend-chart slot="trend"></ai-trend-chart>
  <forecast-badge confidence="87">↗ +15% predicted</forecast-badge>
  <ai-insight-card>Revenue trending above forecast</ai-insight-card>
</ai-metric-card>
```

### Pattern 2: Composable Charts

Build charts from atoms and molecules:

```typescript
// Atoms
<forecast-curve data={predictions}></forecast-curve>
<anomaly-highlight points={anomalies}></anomaly-highlight>

// Molecule: Basic chart
<line-chart data={timeseries}>
  <anomaly-highlight points={anomalies}></anomaly-highlight>
</line-chart>

// Organism: AI-enhanced chart
<ai-trend-chart data={timeseries}>
  <forecast-curve slot="overlay" data={predictions}></forecast-curve>
  <anomaly-highlight slot="highlights" points={anomalies}></anomaly-highlight>
  <ai-chart-summary slot="footer">
    Trending upward with 2 anomalies detected
  </ai-chart-summary>
</ai-trend-chart>
```

### Pattern 3: Intelligent Tables

Layer AI capabilities onto tables:

```typescript
// Base table (Organism)
<data-table data={records}>
  <table-header>
    <table-cell>Name</table-cell>
    <table-cell>Value</table-cell>
  </table-header>
</data-table>

// Add AI toolbar (Molecule + Atoms)
<data-table data={records}>
  <ai-table-toolbar slot="toolbar">
    <smart-search-bar></smart-search-bar>
    <ai-cluster-button></ai-cluster-button>
    <ai-explain-button></ai-explain-button>
  </ai-table-toolbar>
  <table-header>...</table-header>
</data-table>

// Fully AI-enhanced
<data-table data={records}>
  <ai-table-toolbar slot="toolbar">
    <smart-search-bar></smart-search-bar>
    <ai-cluster-button @click={handleCluster}></ai-cluster-button>
    <ai-explain-button @click={handleExplain}></ai-explain-button>
  </ai-table-toolbar>

  ${clusteredData.map(cluster => html`
    <ai-table-cluster name=${cluster.name}>
      ${cluster.rows.map(row => html`
        <table-row>
          <table-cell>${row.name}</table-cell>
          <table-cell>
            ${row.value}
            ${row.hasAnomaly ? html`
              <ai-table-anomaly severity="high"></ai-table-anomaly>
            ` : ''}
          </table-cell>
          <ai-table-auto-tag tags=${row.tags}></ai-table-auto-tag>
        </table-row>
      `)}
    </ai-table-cluster>
  `)}
</data-table>
```

---

## 🧩 Common Compositions

### Dashboard Widget

```typescript
<dashboard-widget>
  <widget-header slot="header">
    <heading level="3">Revenue Trends</heading>
    <ai-quick-actions>
      <ai-explain-button></ai-explain-button>
      <ai-forecast-button></ai-forecast-button>
    </ai-quick-actions>
  </widget-header>

  <widget-body slot="body">
    <ai-trend-chart data={revenue}>
      <forecast-curve data={predictions}></forecast-curve>
      <ai-chart-summary>
        Revenue up 23% vs last month. Forecast: continued growth.
      </ai-chart-summary>
    </ai-trend-chart>
  </widget-body>

  <widget-footer slot="footer">
    <confidence-display value="89"></confidence-display>
    <source-attribution sources={dataSources}></source-attribution>
  </widget-footer>
</dashboard-widget>
```

### AI Chat Interface

```typescript
<multi-agent-chat>
  <chat-header slot="header">
    <heading level="2">AI Assistant</heading>
    <agent-selector
      agents={['GPT-4', 'Claude', 'Custom']}
      selected="Claude">
    </agent-selector>
  </chat-header>

  <message-list slot="messages">
    ${messages.map(msg => html`
      <message-bubble
        role=${msg.role}
        timestamp=${msg.timestamp}>
        <agent-avatar
          slot="avatar"
          agent=${msg.agent}>
        </agent-avatar>
        ${msg.content}
        ${msg.confidence && html`
          <confidence-display
            slot="footer"
            value=${msg.confidence}>
          </confidence-display>
        `}
      </message-bubble>
    `)}
    <typing-indicator ?active=${isTyping}></typing-indicator>
  </message-list>

  <chat-input slot="input">
    <ai-auto-complete
      suggestions=${suggestions}
      @input=${handleInput}>
    </ai-auto-complete>
    <quick-replies
      replies=${quickReplies}
      @select=${handleQuickReply}>
    </quick-replies>
  </chat-input>

  <chat-suggestions slot="suggestions">
    ${suggestedQuestions.map(q => html`
      <chip @click=${() => askQuestion(q)}>${q}</chip>
    `)}
  </chat-suggestions>
</multi-agent-chat>
```

### Pricing Page

```typescript
<layout-container size="xl">
  <layout-section>
    <heading level="1">Choose Your Plan</heading>

    <pricing-table>
      <pricing-tier
        name="Starter"
        price="29"
        currency="$"
        period="month">
        <badge slot="badge" variant="default">Popular</badge>
        <ul slot="features">
          <li>Up to 10 users</li>
          <li>Basic AI features</li>
          <li>Email support</li>
        </ul>
        <payment-button slot="cta">Start Free Trial</payment-button>
        <trial-banner>14-day free trial</trial-banner>
      </pricing-tier>

      <pricing-tier
        name="Pro"
        price="99"
        featured>
        <badge slot="badge" variant="primary">Best Value</badge>
        <ul slot="features">
          <li>Unlimited users</li>
          <li>Advanced AI features</li>
          <li>Priority support</li>
          <li>Custom integrations</li>
        </ul>
        <payment-button slot="cta" variant="primary">
          Upgrade Now
        </payment-button>
      </pricing-tier>

      <pricing-tier
        name="Enterprise"
        price="Custom">
        <ul slot="features">
          <li>Everything in Pro</li>
          <li>Dedicated AI models</li>
          <li>24/7 support</li>
          <li>SLA guarantees</li>
        </ul>
        <payment-button slot="cta" variant="secondary">
          Contact Sales
        </payment-button>
      </pricing-tier>
    </pricing-table>

    <pricing-comparison>
      <!-- Feature comparison matrix -->
    </pricing-comparison>
  </layout-section>
</layout-container>
```

### Graph/Flow Editor

```typescript
<flow-canvas
  width="100%"
  height="600px"
  @nodeClick=${handleNodeClick}
  @edgeCreate=${handleEdgeCreate}>

  <canvas-toolbar slot="toolbar">
    <canvas-zoom
      min="0.25"
      max="2"
      value="1">
    </canvas-zoom>
    <canvas-pan></canvas-pan>
    <ai-quick-actions>
      <ai-suggest-button>Suggest connections</ai-suggest-button>
      <ai-cluster-button>Auto-layout</ai-cluster-button>
    </ai-quick-actions>
  </canvas-toolbar>

  <canvas-minimap slot="minimap"></canvas-minimap>

  <node-palette slot="palette">
    <node-card type="input">Input</node-card>
    <node-card type="process">Process</node-card>
    <node-card type="output">Output</node-card>
    <node-card type="ai">AI Step</node-card>
  </node-palette>

  ${nodes.map(node => html`
    <flow-node
      id=${node.id}
      x=${node.x}
      y=${node.y}
      type=${node.type}>
      <graph-label>${node.label}</graph-label>
      ${node.inputs.map(input => html`
        <flow-handle type="input" id=${input.id}></flow-handle>
      `)}
      ${node.outputs.map(output => html`
        <flow-handle type="output" id=${output.id}></flow-handle>
      `)}
    </flow-node>
  `)}

  ${edges.map(edge => html`
    <flow-connector
      from=${edge.source}
      to=${edge.target}>
      <edge-label>${edge.label}</edge-label>
    </flow-connector>
  `)}

  <snap-grid size="20" show></snap-grid>
</flow-canvas>
```

---

## 🎨 Styling Patterns

### Using Design Tokens

All components consume design tokens:

```typescript
// In component styles
static override styles = [
  baseStyles,
  css`:host {
    padding: ${tokens.spacing.md};
    background: ${tokens.color.grayWhite};
    border-radius: ${tokens.radius.lg};
    font-family: ${tokens.font.family.base};
    font-size: ${tokens.font.size.base};
  }`
];
```

### Theming with CSS Custom Properties

Components expose CSS custom properties for theming:

```typescript
<ai-insight-card
  style="
    --card-bg: var(--cg-color-primary-bg);
    --card-border: var(--cg-color-primary);
    --card-radius: var(--cg-radius-xl);
  ">
  High confidence insight
</ai-insight-card>
```

### Responsive Patterns

Use built-in responsive utilities:

```typescript
<layout-grid
  cols="1"
  cols-md="2"
  cols-lg="3"
  gap="lg">
  <metric-card></metric-card>
  <metric-card></metric-card>
  <metric-card></metric-card>
</layout-grid>
```

---

## 🔄 State Management Patterns

### Local State (Simple)

```typescript
@customElement('my-component')
class MyComponent extends LitElement {
  @state() private isLoading = false;
  @property({ type: Array }) data = [];

  async fetchData() {
    this.isLoading = true;
    this.data = await api.getData();
    this.isLoading = false;
  }
}
```

### Context (Shared State)

```typescript
// Provide AI context
<ai-provider apiKey={key} model="gpt-4">
  <my-dashboard></my-dashboard>
</ai-provider>

// Consume in child components
@customElement('my-dashboard')
class MyDashboard extends LitElement {
  @consume({ context: aiContext })
  private ai!: AIClient;

  async getInsights() {
    return await this.ai.generateInsights(this.data);
  }
}
```

### Events (Communication)

```typescript
// Parent component
<ai-table-toolbar
  @explain=${this.handleExplain}
  @cluster=${this.handleCluster}>
</ai-table-toolbar>

// Child component dispatches
this.dispatchEvent(new CustomEvent('explain', {
  detail: { rows: selectedRows },
  bubbles: true,
  composed: true
}));
```

---

## ⚡ Performance Patterns

### Lazy Loading

```typescript
// Load heavy components on demand
const FlowCanvas = lazy(() => import('./graph/flow-canvas.js'));

<${FlowCanvas} nodes={nodes} edges={edges}></${FlowCanvas}>
```

### Virtual Scrolling

```typescript
<data-list
  items={largeDataset}
  virtualScroll
  itemHeight="60">
  ${(item) => html`
    <list-item>
      <list-item-avatar src=${item.avatar}></list-item-avatar>
      ${item.name}
    </list-item>
  `}
</data-list>
```

### Memoization

```typescript
@customElement('expensive-chart')
class ExpensiveChart extends LitElement {
  @property({ type: Array }) data = [];

  private processedData = memoize((data) => {
    return this.expensiveCalculation(data);
  });

  render() {
    const chartData = this.processedData(this.data);
    return html`<line-chart data=${chartData}></line-chart>`;
  }
}
```

---

## 🧪 Testing Patterns

### Unit Tests (Atoms)

```typescript
describe('Badge', () => {
  it('renders with variant', async () => {
    const el = await fixture(html`
      <badge variant="primary">New</badge>
    `);
    expect(el.variant).to.equal('primary');
    expect(el).shadowDom.to.equal('<span class="badge primary">New</span>');
  });
});
```

### Integration Tests (Molecules)

```typescript
describe('SearchBar', () => {
  it('emits search event on submit', async () => {
    const el = await fixture(html`<smart-search-bar></smart-search-bar>`);
    const searchSpy = sinon.spy();
    el.addEventListener('search', searchSpy);

    el.value = 'test query';
    el.submit();

    expect(searchSpy).to.have.been.calledWith(
      sinon.match({ detail: { query: 'test query' } })
    );
  });
});
```

### E2E Tests (Organisms/Pages)

```typescript
describe('Dashboard', () => {
  it('displays AI insights', async () => {
    await page.goto('/dashboard');

    await page.waitForSelector('ai-insight-card');
    const insights = await page.$$('ai-insight-card');

    expect(insights.length).toBeGreaterThan(0);

    const confidence = await page.$eval(
      'confidence-display',
      el => el.value
    );
    expect(confidence).toBeGreaterThan(70);
  });
});
```

---

## 📦 Package Exports

Components are organized by atomic level:

```typescript
// Import by level
import { Badge, Icon, Chip } from '@cognivo/atoms';
import { SearchBar, MetricCard } from '@cognivo/molecules';
import { DataTable, FlowCanvas } from '@cognivo/organisms';

// Import by category
import { LayoutGrid, LayoutStack } from '@cognivo/layout';
import { AiInsightCard, AiTrendChart } from '@cognivo/ai-enhanced';
import { ChatContainer, MessageBubble } from '@cognivo/chat';

// Import everything
import * from '@cognivo/components';
```

---

## 🚀 Best Practices

### ✅ Do

- **Compose from smaller pieces**: Build organisms from molecules and atoms
- **Use slots for flexibility**: Allow consumers to customize layouts
- **Expose CSS custom properties**: Enable theming without breaking encapsulation
- **Emit custom events**: Use standard event patterns for communication
- **Follow token system**: Use design tokens for consistency
- **Document compositions**: Show common usage patterns
- **Test at each level**: Unit test atoms, integration test molecules

### ❌ Don't

- **Create monolithic components**: Break down into smaller pieces
- **Hardcode styles**: Use design tokens
- **Skip accessibility**: Always include ARIA attributes
- **Ignore mobile**: Build responsive by default
- **Overcomplicate atoms**: Keep atoms simple and focused
- **Tight coupling**: Use events and context, not direct references
- **Ignore performance**: Lazy load, virtualize, memoize

---

## 📚 Learn More

- [Atomic Design Structure](./ATOMIC_DESIGN_STRUCTURE.md) - Full component hierarchy
- [Design Tokens](../packages/components/src/styles/tokens.ts) - Token reference
- [Component Checklist](./COMPONENT_CHECKLIST.md) - Quality checklist
- [AI UX Patterns](./AI_UX_PATTERNS.md) - AI-specific patterns

---

## 🎯 Next Steps

1. **Explore Examples**: Check the `/examples` directory
2. **Read API Docs**: Component-specific documentation
3. **View Storybook**: Interactive component explorer
4. **Build Something**: Start with a template, customize with molecules
5. **Share Patterns**: Contribute new composition patterns

---

*Last updated: 2025-11-16*
