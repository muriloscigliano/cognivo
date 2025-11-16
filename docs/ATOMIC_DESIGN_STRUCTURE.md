# Cognivo Atomic Design Structure

A comprehensive breakdown of all 207 components organized by atomic design principles, tailored for AI-native interfaces.

## Atomic Design Hierarchy

```
Atoms (54) → Molecules (68) → Organisms (53) → Templates (20) → Pages (12)
```

---

## 🔬 ATOMS (54 Components)
*The foundational building blocks - indivisible UI elements*

### Text & Typography (7)
- `cg-text` - Base text element
- `heading` - Semantic headings (h1-h6)
- `label` - Form labels and descriptors
- `stat-text` - Statistical text display
- `kpi-number` - Key performance indicator numbers
- `kpi-delta` - Delta/change indicators
- `graph-label` - Graph annotation labels

### Visual Indicators (12)
- `icon` - SVG icon wrapper
- `badge` - Status/count badges
- `chip` - Removable tag chips
- `category-chip` - Category identifiers
- `status-chip` - Status indicators
- `icon-badge` - Badge with icon
- `icon-avatar` - Icon-based avatar
- `message-avatar` - Chat message avatar
- `agent-avatar` - AI agent avatar
- `refund-badge` - Refund status
- `recurring-badge` - Recurring payment indicator
- `discount-badge` - Discount indicator

### AI Indicators (8)
- `ai-loading-indicator` - AI processing state
- `ai-thinking-animation` - Thinking state animation
- `confidence-display` - Confidence percentage
- `explain-tooltip` - Explanation tooltip
- `forecast-badge` - Forecast indicator
- `anomaly-badge` - Anomaly detection badge
- `auto-tag-badge` - Auto-generated tag
- `source-attribution` - AI source citation

### Interactive Controls (11)
- `ai-explain-button` - Trigger explanations
- `ai-summarize-button` - Generate summaries
- `ai-ask-button` - Ask AI questions
- `ai-generate-button` - Generate content
- `ai-cluster-button` - Cluster data
- `ai-tag-button` - Auto-tag content
- `ai-forecast-button` - Generate forecasts
- `ai-detect-anomaly-button` - Detect anomalies
- `ai-suggest-button` - AI suggestions
- `ai-floating-button` - Floating action button
- `payment-button` - Payment submission

### Chart Primitives (9)
- `graph-port` - Graph connection port
- `graph-edge` - Graph connection edge
- `edge-path` - SVG edge path
- `edge-label` - Edge annotation
- `flow-handle` - Flow connection handle
- `tree-branch` - Tree connection
- `connection-line` - Generic connection
- `snap-grid` - Grid overlay
- `forecast-curve` - Forecast line overlay

### List Elements (4)
- `list-item-avatar` - List item icon/avatar
- `list-item-meta` - Metadata display
- `list-divider` - List separator
- `typing-indicator` - Chat typing animation

### Form Elements (3)
- `credit-card-input` - Card number input
- `promo-code` - Promo code input field
- `quick-replies` - Quick reply buttons

---

## 🧬 MOLECULES (68 Components)
*Simple component groups with specific functions*

### Cards (19)
- `data-card` - Generic data container
- `metric-card` - Single metric display
- `category-card` - Category overview
- `comparison-card` - Side-by-side comparison
- `ai-insight-card` - AI-generated insight
- `ai-metric-card` - AI-enhanced metric
- `ai-trend-card` - Trend analysis card
- `ai-forecast-card` - Forecast prediction card
- `ai-anomaly-card` - Anomaly detection card
- `ai-context-card` - Contextual information
- `subscription-card` - Subscription details
- `pricing-card` - Pricing plan card
- `pricing-tier` - Single pricing tier
- `node-card` - Graph node card
- `invoice-item` - Invoice line item
- `invoice-total` - Invoice total display
- `transaction-item` - Transaction record
- `receipt` - Payment receipt
- `checkout-summary` - Checkout overview

### Search & Filters (8)
- `search-bar` - Basic search input
- `smart-search-bar` - AI-enhanced search
- `search-filter` - Filter control
- `filter-chips` - Active filter chips
- `filter-panel` - Filter sidebar
- `sorter` - Sort control
- `group-selector` - Grouping options
- `segment-switcher` - Segment toggle

### Navigation (4)
- `breadcrumbs` - Breadcrumb trail
- `pagination` - Page navigation
- `tab-group` - Tab navigation
- `agent-selector` - AI agent chooser

### List Components (6)
- `list-item` - Single list item
- `ai-list` - AI-enhanced list
- `ai-list-cluster` - Clustered list group
- `ai-auto-tag-list` - Auto-tagged items
- `ai-list-summary` - List summary
- `message-list` - Chat message list

### Table Components (9)
- `table-header` - Table header row
- `table-row` - Table data row
- `table-cell` - Table cell
- `table-selection` - Row selection control
- `table-pagination` - Table pagination
- `table-group-header` - Grouped rows header
- `ai-table-toolbar` - AI table actions
- `ai-table-explain` - Table explanation
- `ai-table-anomaly` - Anomaly highlight in table

### Charts - Mini (4)
- `mini-bar-chart` - Inline bar chart
- `mini-line-chart` - Inline line chart
- `mini-sparkline` - Sparkline chart
- `mini-donut` - Mini donut chart

### Payment Components (8)
- `payment-method` - Payment method selector
- `billing-info` - Billing details form
- `billing-cycle` - Cycle selector
- `payment-status` - Payment state indicator
- `tax-line` - Tax breakdown
- `total-breakdown` - Total calculation
- `wallet-button` - Digital wallet button
- `stripe-element` - Stripe integration

### Chat Components (6)
- `message-bubble` - Chat message bubble
- `chat-message` - Complete message
- `agent-response` - AI response message
- `chat-suggestions` - Suggested responses
- `conversation-thread` - Thread container
- `chat-input` - Message input field

### Graph Elements (4)
- `graph-node` - Graph node
- `flow-node` - Flow diagram node
- `flow-connector` - Flow connection
- `node-minimap` - Mini navigation map

---

## 🏗️ ORGANISMS (53 Components)
*Complex components composed of molecules and atoms*

### Layout Components (8)
- `layout-grid` - Responsive grid system
- `layout-stack` - Flexbox stack
- `layout-container` - Max-width container
- `layout-section` - Content section
- `layout-sidebar` - Sidebar layout
- `layout-header` - Page header
- `layout-footer` - Page footer
- `dashboard-grid` - Dashboard layout grid

### Data Display (6)
- `data-table` - Full data table
- `table-toolbar` - Table action toolbar
- `table-filters` - Advanced filters
- `data-list` - Structured list
- `kpi-group` - KPI metrics group
- `usage-meter` - Usage display

### Charts - Full (11)
- `bar-chart` - Bar chart
- `line-chart` - Line chart
- `area-chart` - Area chart
- `donut-chart` - Donut chart
- `pie-chart` - Pie chart
- `radar-chart` - Radar chart
- `heatmap-chart` - Heatmap
- `timeline-chart` - Timeline visualization
- `anomaly-highlight` - Anomaly overlay

### AI Charts (3)
- `ai-trend-chart` - AI trend analysis
- `ai-forecast-chart` - AI forecast visualization
- `ai-anomaly-chart` - AI anomaly detection chart

### AI Enhanced Components (7)
- `ai-insights-scroller` - Horizontal insight cards
- `ai-table-cluster` - Auto-clustered table
- `ai-table-auto-tag` - Auto-tagged table rows
- `ai-chart-summary` - Chart AI summary
- `ai-context-summary` - Context summary
- `ai-context-explanation` - Detailed explanation
- `ai-region` - AI-interactive region

### Panels & Modals (9)
- `side-panel` - Side panel overlay
- `drawer-left` - Left drawer
- `drawer-right` - Right drawer
- `modal-dialog` - Modal dialog
- `modal-sheet` - Bottom sheet modal
- `popover` - Popover tooltip
- `flyout-menu` - Flyout menu
- `command-palette` - Command search
- `ai-assistant` - AI assistant panel

### Interactive Components (3)
- `ai-auto-complete` - AI-powered autocomplete
- `ai-quick-actions` - Quick action menu
- `ai-toolbar-actions` - Toolbar with AI actions

### Graph/Canvas - Complex (9)
- `graph-canvas` - Full graph canvas
- `flow-canvas` - Flow diagram canvas
- `dag-canvas` - DAG visualization
- `tree-canvas` - Tree diagram
- `network-graph` - Network visualization
- `force-graph` - Force-directed graph
- `timeline-graph` - Timeline graph
- `dependency-graph` - Dependency visualization
- `mind-map` - Mind map canvas

---

## 📋 TEMPLATES (20 Components)
*Page-level layouts with placeholder content*

### Dashboard Templates (7)
- `dashboard-widget` - Widget container
- `widget-header` - Widget header section
- `widget-body` - Widget content area
- `widget-footer` - Widget footer
- `stats-widget` - Statistics widget
- `chart-widget` - Chart container widget
- `table-widget` - Table container widget

### Pricing Templates (3)
- `pricing-table` - Pricing comparison table
- `pricing-comparison` - Plan comparison
- `plan-selector` - Plan selection template

### Payment Templates (2)
- `payment-form` - Complete payment form
- `payment-history` - Payment history view

### Graph Templates (4)
- `canvas-toolbar` - Canvas controls
- `canvas-minimap` - Canvas navigation
- `canvas-zoom` - Zoom controls
- `canvas-pan` - Pan controls

### Graph Specialized (4)
- `dag-node` - DAG node template
- `dag-edge` - DAG edge template
- `gantt-chart` - Gantt chart template
- `org-chart` - Organization chart

---

## 📄 PAGES (12 Components)
*Complete page implementations*

### Dashboard Pages (5)
- `dashboard-layout` - Main dashboard
- `activity-widget` - Activity feed widget
- `alert-widget` - Alerts widget
- `quick-stats` - Quick stats dashboard
- `metric-grid` - Metrics overview

### Chat Pages (3)
- `chat-container` - Chat interface
- `chat-header` - Chat header
- `multi-agent-chat` - Multi-agent interface

### Graph Pages (2)
- `node-palette` - Node creation palette
- `node-group` - Grouped nodes view

### Banners (2)
- `trial-banner` - Trial notification
- `upgrade-prompt` - Upgrade CTA

---

## 🎯 AI-Specific Component Patterns

### AI Enhancement Layers
Components that add AI capabilities to existing components:

```
Base Component + AI Enhancement = AI-Native Component

table + ai-table-explain = Explainable Table
chart + ai-chart-summary = Self-Explaining Chart
list + ai-list-cluster = Auto-Clustered List
```

### Confidence & Attribution
All AI components should support:
- `confidence` - Confidence score (0-100)
- `sources` - Attribution data
- `explanation` - How AI arrived at result

### AI System Components
System-level AI infrastructure:
- `ai-provider` - AI service context
- `ai-client` - API client
- `ai-intent-registry` - Intent mapping
- `ai-context-builder` - Context assembly
- `ai-debug-panel` - Debug interface

---

## 📦 Component Composition Examples

### Example 1: AI-Enhanced Dashboard
```
dashboard-layout (Page)
├── dashboard-grid (Organism)
│   ├── stats-widget (Template)
│   │   ├── kpi-group (Organism)
│   │   │   ├── kpi-number (Atom)
│   │   │   ├── kpi-delta (Atom)
│   │   │   └── forecast-badge (Atom)
│   ├── chart-widget (Template)
│   │   ├── ai-trend-chart (Organism)
│   │   │   └── forecast-curve (Atom)
│   │   └── ai-chart-summary (Organism)
│   └── ai-insights-scroller (Organism)
│       └── ai-insight-card (Molecule)
```

### Example 2: AI Data Table
```
data-table (Organism)
├── ai-table-toolbar (Molecule)
│   ├── ai-explain-button (Atom)
│   ├── ai-cluster-button (Atom)
│   └── smart-search-bar (Molecule)
├── table-header (Molecule)
├── table-row (Molecule)
│   ├── table-cell (Molecule)
│   └── ai-table-anomaly (Molecule)
└── ai-table-auto-tag (Molecule)
```

### Example 3: Multi-Agent Chat
```
multi-agent-chat (Page)
├── chat-header (Page Component)
│   └── agent-selector (Molecule)
├── message-list (Molecule)
│   ├── message-bubble (Molecule)
│   │   ├── agent-avatar (Atom)
│   │   └── confidence-display (Atom)
│   └── typing-indicator (Atom)
├── chat-suggestions (Molecule)
└── chat-input (Molecule)
    └── ai-auto-complete (Organism)
```

---

## 🔄 Benefits of This Structure

### For Developers
- **Clear Hierarchy**: Easy to understand component relationships
- **Reusability**: Atoms and molecules are highly reusable
- **Maintainability**: Changes cascade predictably
- **Scalability**: Add new components at any level

### For Designers
- **Consistency**: Shared atoms ensure visual consistency
- **Flexibility**: Mix and match molecules for new patterns
- **Documentation**: Clear component taxonomy
- **Prototyping**: Build quickly with pre-made organisms

### For AI Systems
- **Pattern Recognition**: Clear component boundaries
- **Code Generation**: AI can generate valid compositions
- **Analysis**: Easier to analyze and suggest improvements
- **Accessibility**: Consistent patterns improve a11y

---

## 📊 Component Distribution

| Level      | Count | % of Total | Purpose                          |
|------------|-------|------------|----------------------------------|
| Atoms      | 54    | 26%        | Foundational elements            |
| Molecules  | 68    | 33%        | Simple composed units            |
| Organisms  | 53    | 26%        | Complex feature components       |
| Templates  | 20    | 10%        | Layout patterns                  |
| Pages      | 12    | 6%         | Complete page implementations    |
| **Total**  | **207** | **100%** | **Full component library**       |

---

## 🎨 Design Token Integration

All components use the token system:

```typescript
// Spacing (atoms)
tokens.spacing.xs → 4px
tokens.spacing.sm → 8px
tokens.spacing.md → 16px
tokens.spacing.lg → 24px
tokens.spacing.xl → 32px

// Colors (atoms)
tokens.color.primary
tokens.color.gray50-900
tokens.color.success/warning/danger

// Typography (atoms)
tokens.font.family.base → Inter Variable
tokens.font.family.display → Satoshi Variable
tokens.font.size.xs-2xl

// Radius (molecules)
tokens.radius.sm/md/lg/xl/full

// Shadows (organisms)
tokens.shadow.sm/md/lg
```

---

## 🚀 Next Steps

1. **Create Component Stories**: Storybook examples for each level
2. **Document Patterns**: Common composition patterns
3. **Build Templates**: Pre-built page templates
4. **AI Training**: Feed this structure to AI tools
5. **Design System**: Figma library matching atomic structure

---

## 📚 References

- [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- [Atomic Design in 2025](https://medium.com/design-bootcamp/atomic-design-in-2025-from-rigid-theory-to-flexible-practice-91f7113b9274)
- [Building Design Systems with Atomic Principles](https://kajoo.ai/blog/building-design-systems-with-atomic-principles)
