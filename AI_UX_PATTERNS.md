# AI UX Design Patterns for Cognivo
## Research-Backed Patterns for AI-Native Components

**Last Updated:** November 16, 2025
**Sources:** Microsoft HAI Guidelines, Google PAIR, State of AI Design, AI UX Patterns

---

## 🎯 Core Principles

### 1. **Make Clear What the System Can Do**
> Users need to understand AI capabilities and limitations upfront

**Implementation in Cognivo:**
- `<ai-action-button>` - Clear action labels ("Explain", "Forecast", "Detect Anomalies")
- `<ai-action-group>` - Show all available AI actions together
- Tooltips explaining what each AI intent does

**Example:**
```html
<ai-action-button action="explain" tooltip="Get AI explanation of data trends">
  Explain This Data
</ai-action-button>
```

---

### 2. **Make Clear How Well the System Works**
> Show confidence scores, accuracy, and uncertainty

**Implementation in Cognivo:**
- `<ai-confidence-badge>` - Always show confidence scores
- Color-coded confidence levels (green/yellow/red)
- Threshold-based display (80%+ high, 50-79% medium, <50% low)

**Tokens:**
```css
--cg-ai-confidence-high-color: #57b86e    /* Green */
--cg-ai-confidence-medium-color: #f9f92e  /* Yellow */
--cg-ai-confidence-low-color: #f42f2f     /* Red */
```

---

### 3. **Support Efficient Invocation**
> Make it easy to trigger AI without disrupting workflow

**Implementation in Cognivo:**
- Inline AI action buttons (not separate screens)
- Keyboard shortcuts for common AI actions
- Context-aware AI suggestions

**Pattern:**
```html
<ai-table>
  <!-- AI actions appear inline on hover/selection -->
  <ai-action-group inline position="row-actions"></ai-action-group>
</ai-table>
```

---

### 4. **Support Efficient Dismissal**
> Let users ignore or dismiss AI suggestions easily

**Implementation in Cognivo:**
- Close buttons on all AI result panels
- "Don't show again" options
- Non-modal AI results (don't block workflow)

**Pattern:**
```html
<ai-result-panel dismissible remember-dismissal>
  <button slot="close" @click="dismiss()">×</button>
</ai-result-panel>
```

---

### 5. **Mitigate Social Biases**
> Acknowledge AI limitations and potential biases

**Implementation in Cognivo:**
- Disclaimer text in AI results
- Link to "How AI works" documentation
- Diverse representation in examples

**Pattern:**
```html
<ai-result-panel>
  <p slot="disclaimer">
    AI analysis based on historical data. Results may not reflect future trends.
  </p>
</ai-result-panel>
```

---

## 📋 Key AI UX Patterns

### Pattern 1: **Progressive Disclosure**
> Show AI results gradually, starting with summary then details on demand

**Use Cases:**
- Long AI explanations
- Complex forecast data
- Multiple anomalies detected

**Component:** `<ai-result-panel>` with collapsible sections

**Implementation:**
```html
<ai-result-panel>
  <!-- Summary always visible -->
  <h3>Spending increased 93% in March</h3>

  <!-- Details collapsed by default -->
  <details>
    <summary>View Drivers (3)</summary>
    <ul>
      <li>Campaign launch: 85% impact</li>
      <li>Seasonal trend: 15% impact</li>
    </ul>
  </details>
</ai-result-panel>
```

**Tokens needed:**
```json
{
  "ai-result-panel": {
    "summaryFontSize": "18px",
    "detailsFontSize": "14px",
    "expandIcon": "▼"
  }
}
```

---

### Pattern 2: **Confidence Calibration**
> Always show uncertainty/confidence alongside AI predictions

**Use Cases:**
- Forecasts with confidence intervals
- Classifications with probability scores
- Anomaly detection severity

**Component:** `<ai-confidence-badge>`

**Visual Design:**
- High (80%+): Green dot + percentage
- Medium (50-79%): Yellow dot + percentage
- Low (<50%): Red dot + percentage

**Implementation:**
```html
<ai-result-panel>
  <ai-confidence-badge score="0.92" slot="header"></ai-confidence-badge>
  <p>Revenue will likely increase 23% next quarter.</p>
</ai-result-panel>
```

---

### Pattern 3: **Explainable AI**
> Provide reasons/drivers behind AI conclusions

**Use Cases:**
- "Why did this happen?" explanations
- Feature importance in predictions
- Anomaly root causes

**Component:** `<ai-result-panel>` with driver list

**Implementation:**
```html
<ai-result-panel>
  <h3>Top Drivers</h3>
  <ul class="drivers">
    <li>
      <span class="driver-name">Marketing campaign</span>
      <div class="driver-bar" style="width: 85%"></div>
      <span class="driver-impact">85%</span>
    </li>
  </ul>
</ai-result-panel>
```

**Tokens:**
```css
--cg-ai-driver-impact-high-color: #f42f2f      /* Red bar */
--cg-ai-driver-impact-medium-color: #f9f92e    /* Yellow bar */
--cg-ai-driver-impact-low-color: #57b86e       /* Green bar */
```

---

### Pattern 4: **State Visibility**
> Show AI processing state clearly

**States:**
1. **Idle** - Ready for user action (gray)
2. **Processing** - AI is working (purple + spinner)
3. **Streaming** - Results arriving progressively (blue)
4. **Success** - Completed successfully (green)
5. **Error** - Failed (red + error message)

**Component:** `<ai-thinking-indicator>` + state styling

**Implementation:**
```html
<ai-action-button state="processing">
  <ai-thinking-indicator slot="icon"></ai-thinking-indicator>
  Analyzing...
</ai-action-button>
```

**Tokens:**
```css
--cg-ai-state-processing-background: #f5f3ff  /* Light purple */
--cg-ai-state-processing-color: #8b5cf6       /* Purple */
--cg-ai-state-success-background: #b6ffc7     /* Light green */
```

---

### Pattern 5: **Inline Anomaly Highlighting**
> Highlight anomalies directly in data views (tables, charts)

**Use Cases:**
- Unusual spending in table rows
- Outliers in scatter plots
- Unexpected trends in time series

**Components:** `<ai-table>`, `<ai-mini-chart>`

**Visual Design:**
- Critical: Red background + red border + glow
- High: Orange background
- Medium: Yellow background
- Low: Light yellow background

**Implementation:**
```html
<ai-table highlight-anomalies>
  <!-- Rows with anomalies get automatic styling -->
  <tr data-anomaly="high">
    <td>March 2024</td>
    <td class="amount">$43,291</td>
    <td>
      <ai-confidence-badge score="0.95" level="high"></ai-confidence-badge>
    </td>
  </tr>
</ai-table>
```

**Tokens:**
```css
--cg-ai-anomaly-critical-background: #ffeaea
--cg-ai-anomaly-critical-border: #f75e5e
--cg-ai-anomaly-critical-glow: #fcbbbb
```

---

### Pattern 6: **Forecast Visualization**
> Show predictions with confidence bands

**Use Cases:**
- Revenue forecasts
- Demand predictions
- Trend projections

**Component:** `<ai-mini-chart>` with forecast layer

**Visual Design:**
- Historical data: Solid line (brand color)
- Forecast: Dashed line (AI purple)
- Confidence interval: Shaded area (light purple)

**Implementation:**
```html
<ai-mini-chart
  :historical-data="pastRevenue"
  :forecast-data="prediction"
  :confidence-band="{ lower: 0.8, upper: 1.2 }"
  show-forecast
>
</ai-mini-chart>
```

**Tokens:**
```css
--cg-ai-chart-forecastLine: #a78bfa       /* Light purple */
--cg-ai-chart-confidenceBand: #f5f3ff     /* Very light purple */
```

---

### Pattern 7: **Action Feedback Loop**
> Provide immediate feedback after AI actions

**Flow:**
1. User clicks AI button → Button shows "processing" state
2. AI works → Show `<ai-thinking-indicator>`
3. Result ready → Show `<ai-result-panel>` with success state
4. Error occurs → Show error state with retry option

**Implementation:**
```typescript
async function handleAiAction(intent: AiIntent) {
  // 1. Show processing state
  this.state = 'processing'

  try {
    // 2. Run AI
    const result = await aiClient.runIntent(intent, context)

    // 3. Show success
    this.state = 'success'
    this.result = result
  } catch (error) {
    // 4. Show error
    this.state = 'error'
    this.error = error.message
  }
}
```

---

### Pattern 8: **Contextual AI Actions**
> Show AI actions based on data type and user context

**Use Cases:**
- Table row selected → Show "Explain this row"
- Chart region selected → Show "Analyze this period"
- Outlier detected → Show "Investigate anomaly"

**Component:** `<ai-action-group>` with conditional rendering

**Implementation:**
```html
<ai-table @row-selected="showContextualActions">
  <ai-action-group
    v-if="selectedRow"
    :actions="getActionsForRowType(selectedRow)"
  >
  </ai-action-group>
</ai-table>
```

---

## 🎨 Component Design Recommendations

### AI Action Button
**Must-haves:**
- Clear action label (verb + noun: "Explain Data", "Forecast Revenue")
- Icon representing the action (💡 explain, 📊 forecast, 🔍 detect)
- Loading state with spinner
- Disabled state when unavailable
- Tooltip explaining what it does

**Nice-to-haves:**
- Keyboard shortcut hint (e.g., "⌘E")
- Badge showing result count (e.g., "3 anomalies detected")
- Pulse animation when AI suggests using it

---

### AI Result Panel
**Must-haves:**
- Confidence score in header
- Summary text (1-2 sentences)
- Close/dismiss button
- Timestamp ("Analyzed 2 minutes ago")
- Clear visual hierarchy (summary → details)

**Nice-to-haves:**
- Collapsible sections for long content
- Copy result to clipboard
- Share/export result
- "Why?" button for deeper explanation
- Feedback buttons (👍 👎)

---

### AI Table
**Must-haves:**
- Anomaly highlighting (color-coded rows)
- Inline confidence badges
- Row-level AI actions (appear on hover)
- Sort by confidence/anomaly score
- Legend explaining colors

**Nice-to-haves:**
- Bulk AI actions (explain selected rows)
- Export with AI insights
- Historical anomaly tracking
- Smart filters (show only anomalies)

---

### AI Mini Chart
**Must-haves:**
- Forecast line (dashed)
- Confidence band (shaded area)
- Anomaly markers (dots on chart)
- Tooltip with AI insight
- Legend

**Nice-to-haves:**
- Interactive drill-down
- Scenario comparison
- Export chart with insights
- Zoom to forecast period

---

## 🔢 Token Mapping to Patterns

### Pattern → Token Mapping

| Pattern | Tokens Needed | Components |
|---------|---------------|------------|
| Confidence Calibration | `ai.confidence.*` | Badge, Result Panel |
| State Visibility | `ai.state.*` | Action Button, Thinking Indicator |
| Anomaly Highlighting | `ai.anomaly.*` | Table, Chart |
| Forecast Visualization | `ai.chart.*` | Mini Chart |
| Explainable AI | `ai.driver.impact.*` | Result Panel |
| Visual Effects | `ai.effect.*` | All components |

---

## 📊 Priority Patterns for Phase 2

Based on frequency of use in dashboards:

### High Priority (Build First)
1. ✅ **Confidence Calibration** - Every AI result needs this
2. ✅ **State Visibility** - Every AI action shows progress
3. ✅ **Action Feedback Loop** - Core UX flow

### Medium Priority (Build Second)
4. **Explainable AI** - Drivers/factors in results
5. **Inline Anomaly Highlighting** - Tables and charts
6. **Progressive Disclosure** - Long AI results

### Lower Priority (Build Later)
7. **Forecast Visualization** - Specific to time-series
8. **Contextual AI Actions** - Advanced interaction

---

## 🚀 Integration with Implementation Roadmap

### AI Action Button → Patterns Used
- ✅ Make Clear What System Can Do (clear labels)
- ✅ Support Efficient Invocation (inline actions)
- ✅ State Visibility (processing/success/error states)
- ✅ Action Feedback Loop (state transitions)

### AI Result Panel → Patterns Used
- ✅ Make Clear How Well System Works (confidence badge)
- ✅ Progressive Disclosure (collapsible sections)
- ✅ Explainable AI (driver lists, bullets)
- ✅ Support Efficient Dismissal (close button)

### AI Table → Patterns Used
- ✅ Inline Anomaly Highlighting (row colors)
- ✅ Confidence Calibration (badges per row)
- ✅ Contextual AI Actions (row-level actions)
- ✅ Support Efficient Invocation (inline buttons)

### AI Mini Chart → Patterns Used
- ✅ Forecast Visualization (dashed lines, bands)
- ✅ Inline Anomaly Highlighting (markers)
- ✅ Confidence Calibration (band width)
- ✅ Make Clear How Well System Works (legend)

### AI Action Group → Patterns Used
- ✅ Make Clear What System Can Do (show all actions)
- ✅ Support Efficient Invocation (grouped access)
- ✅ Contextual AI Actions (show relevant actions)

---

## ✅ Pattern Checklist for Each Component

Use this checklist when building components:

**For Every AI Component:**
- [ ] Shows AI state (idle/processing/success/error)
- [ ] Provides confidence/uncertainty info
- [ ] Has clear, action-oriented labels
- [ ] Supports keyboard navigation
- [ ] Works in light and dark mode
- [ ] Has accessible ARIA labels
- [ ] Handles errors gracefully

**For AI Result Components:**
- [ ] Shows timestamp of analysis
- [ ] Includes confidence score
- [ ] Provides "Why?" explanation
- [ ] Supports dismissal/closing
- [ ] Uses progressive disclosure for long content
- [ ] Has feedback mechanism (optional)

**For AI Action Components:**
- [ ] Explains what action does (tooltip)
- [ ] Shows loading state clearly
- [ ] Disables when unavailable
- [ ] Provides visual feedback on click
- [ ] Supports efficient invocation (shortcuts)

---

## 📚 References

1. **Microsoft HAI Guidelines** - 18 guidelines for human-AI interaction
2. **Google PAIR Guidebook** - Patterns for explainability and trust
3. **State of AI Design** - Industry survey on AI UX practices
4. **AI UX Patterns** - Community-curated pattern library
5. **Shape of AI** - Emerging AI interaction models
6. **Projects by IF** - Data & AI design patterns

---

## 🎯 Next Steps

1. **Review this document** with each component build
2. **Map patterns to components** in IMPLEMENTATION_ROADMAP.md
3. **Create pattern examples** in Storybook/examples
4. **Test patterns with users** (get feedback)
5. **Iterate based on usage** (analytics + feedback)

---

**Remember:** AI UX is about **transparency, trust, and control**. Every component should help users understand what AI is doing and why.
