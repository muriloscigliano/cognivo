# 🚀 Cognivo Implementation Roadmap
## Component-by-Component Build Strategy

**Last Updated:** November 16, 2025
**Status:** Post Phase 1 - Token System Complete

---

## 🎯 Build Philosophy

**One component at a time, production-ready:**
1. ✅ Design tokens FIRST (just completed!)
2. 🔨 Build component + TypeScript types
3. 🧪 Add tests (Vitest + Testing Library)
4. 📖 Document with examples
5. ✨ Polish accessibility (ARIA, keyboard nav)
6. 🚀 Ship to examples

**Why component-by-component?**
- ✅ Ensures each component is production-ready
- ✅ Gather feedback early and iterate
- ✅ Avoid token bloat (only add what's needed)
- ✅ Maintain high quality standards

---

## 📊 Top 5 Priority Components

Based on **dashboard frequency + AI value-add + reusability:**

### 1. 🔘 **AI Action Button** (Highest Priority)
**Why first?** Every AI component needs action buttons. Most reusable.

**Use Cases:**
- "Explain this data"
- "Forecast next month"
- "Detect anomalies"
- Trigger any AI intent

**Features:**
- Multiple sizes (sm, md, lg)
- Icon + label support
- Loading states (with `<ai-thinking-indicator>`)
- Disabled state
- Keyboard accessible
- Event: `ai:action-triggered`

**Tokens Needed (Tier 3):**
```json
{
  "ai-action-button": {
    "background": { "$value": "{ai.action.button.background}" },
    "backgroundHover": { "$value": "{ai.action.button.backgroundHover}" },
    "border": { "$value": "{ai.action.button.border}" },
    "color": { "$value": "{ai.action.button.color}" },
    "padding": {
      "sm": { "$value": "6px 12px" },
      "md": { "$value": "8px 16px" },
      "lg": { "$value": "12px 24px" }
    }
  }
}
```

**Component API:**
```html
<ai-action-button
  action="explain"
  size="md"
  loading
  disabled
  icon="sparkles"
>
  Explain
</ai-action-button>
```

**Estimated Time:** 4-6 hours (component + tests + docs)

---

### 2. 📋 **AI Result Panel** (Priority #2)
**Why second?** Need consistent way to display AI responses across all components.

**Use Cases:**
- Show explanation text
- Display bullet points
- Show confidence scores
- List drivers/factors
- Highlight anomalies

**Features:**
- Slot for custom content
- Built-in layouts for common result types
- Confidence badge integration
- Collapsible sections
- Dark mode support

**Tokens Needed (Tier 3):**
```json
{
  "ai-result-panel": {
    "background": { "$value": "{ai.result.background}" },
    "border": { "$value": "{ai.result.border}" },
    "padding": { "$value": "{ai.result.padding}" },
    "borderRadius": { "$value": "{ai.result.borderRadius}" },
    "sectionGap": { "$value": "16px" },
    "headerPadding": { "$value": "12px 16px" }
  }
}
```

**Component API:**
```html
<ai-result-panel>
  <div slot="header">
    <ai-confidence-badge score="0.92"></ai-confidence-badge>
  </div>

  <div slot="content">
    <p>Spending increased 93% in March due to campaign launch.</p>
    <ul>
      <li>Campaign impact: 85%</li>
      <li>Seasonal trend: 15%</li>
    </ul>
  </div>
</ai-result-panel>
```

**Estimated Time:** 6-8 hours

---

### 3. 📊 **AI Table** (Priority #3)
**Why third?** Tables are in EVERY dashboard. Huge AI value-add.

**Use Cases:**
- Highlight anomalies in table rows
- Show confidence scores per row
- AI-powered sorting/filtering
- Explain specific data points
- Classify/tag rows

**Features:**
- Column definitions
- Anomaly highlighting
- Inline confidence badges
- Row-level AI actions
- Sortable/filterable
- Responsive (horizontal scroll)

**Tokens Needed (Tier 3):**
```json
{
  "ai-table": {
    "headerBackground": { "$value": "{gray.50}" },
    "rowHover": { "$value": "{gray.100}" },
    "anomalyRow": {
      "background": { "$value": "{ai.anomaly.low.background}" },
      "border": { "$value": "{ai.anomaly.medium.border}" }
    },
    "cellPadding": { "$value": "12px 16px" },
    "borderColor": { "$value": "{gray.300}" }
  }
}
```

**Component API:**
```html
<ai-table
  :columns="[
    { key: 'month', label: 'Month' },
    { key: 'spending', label: 'Spending', type: 'currency' },
    { key: 'anomaly', label: 'Status', type: 'anomaly' }
  ]"
  :data="tableData"
  :ai-client="aiClient"
  highlight-anomalies
>
</ai-table>
```

**Estimated Time:** 12-16 hours (most complex component)

---

### 4. 📈 **AI Mini Chart** (Priority #4)
**Why fourth?** Visual data needs AI annotations. High impact.

**Use Cases:**
- Sparklines with AI insights
- Trend indicators
- Forecast overlays
- Anomaly markers on chart

**Features:**
- Chart.js or D3 integration (or custom SVG)
- AI annotation layer
- Tooltip with AI insights
- Responsive sizing
- Multiple chart types (line, bar, area)

**Tokens Needed (Tier 3):**
```json
{
  "ai-chart": {
    "forecastLine": { "$value": "{brand.ai.highlight}" },
    "confidenceBand": { "$value": "{brand.ai.background}" },
    "anomalyMarker": { "$value": "{ai.anomaly.high.color}" },
    "trendUp": { "$value": "{green.500}" },
    "trendDown": { "$value": "{red.500}" },
    "gridColor": { "$value": "{gray.200}" }
  }
}
```

**Component API:**
```html
<ai-mini-chart
  :data="chartData"
  :ai-client="aiClient"
  show-forecast
  show-anomalies
  chart-type="line"
>
</ai-mini-chart>
```

**Estimated Time:** 10-14 hours (charting complexity)

---

### 5. 💬 **AI Action Group** (Priority #5)
**Why fifth?** Reusable group of AI buttons. Cleaner API.

**Use Cases:**
- Show multiple AI actions together
- Consistent spacing/layout
- Toggle between actions
- Dropdown for many actions

**Features:**
- Horizontal/vertical layout
- Icon-only or text+icon
- Dropdown overflow (>4 actions)
- Keyboard navigation
- Active state tracking

**Component API:**
```html
<ai-action-group
  :actions="['explain', 'forecast', 'detect_anomaly']"
  layout="horizontal"
  @action="handleAction"
>
</ai-action-group>
```

**Estimated Time:** 6-8 hours

---

## 🗓️ Suggested Timeline

**Week 1-2: Foundation Components**
- [ ] Day 1-2: AI Action Button
- [ ] Day 3-4: AI Result Panel
- [ ] Day 5: Integration tests for both

**Week 3-4: Data Components**
- [ ] Day 1-4: AI Table (most complex)
- [ ] Day 5: AI Table examples + docs

**Week 5-6: Visualization**
- [ ] Day 1-3: AI Mini Chart
- [ ] Day 4: AI Action Group
- [ ] Day 5: Integration examples

**Week 7-8: Polish & Examples**
- [ ] Build comprehensive dashboard example
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Documentation site

---

## 📦 Tier 3 Token Strategy

**When to add component tokens:**
1. Build the component FIRST with inline styles
2. Identify repeated values
3. Extract to tier 3 tokens
4. Rebuild tokens with `node build.js`
5. Update component to use tokens

**Component token file structure:**
```
packages/tokens/tier3-component/
  ├── ai-action-button.json  ← Create when building AI Action Button
  ├── ai-result-panel.json   ← Create when building AI Result Panel
  ├── ai-table.json          ← Create when building AI Table
  ├── ai-mini-chart.json     ← Create when building AI Mini Chart
  └── ai-action-group.json   ← Create when building AI Action Group
```

**Example: ai-action-button.json**
```json
{
  "ai-action-button": {
    "background": {
      "$type": "color",
      "$value": "{brand.ai.background}",
      "$description": "AI action button background"
    },
    "backgroundHover": {
      "$type": "color",
      "$value": "{brand.ai.highlight}",
      "$description": "AI action button hover state"
    },
    "color": {
      "$type": "color",
      "$value": "{brand.ai.accent}",
      "$description": "AI action button text color"
    },
    "padding": {
      "sm": {
        "$type": "dimension",
        "$value": "6px 12px",
        "$description": "Small button padding"
      },
      "md": {
        "$type": "dimension",
        "$value": "8px 16px",
        "$description": "Medium button padding"
      },
      "lg": {
        "$type": "dimension",
        "$value": "12px 24px",
        "$description": "Large button padding"
      }
    }
  }
}
```

---

## 🎨 Missing Tier 2 Tokens to Add Now

Before building components, let's add these missing tier 2 semantic tokens:

### AI Operation States
```json
{
  "ai": {
    "state": {
      "idle": {
        "color": { "$value": "{gray.500}" },
        "background": { "$value": "{gray.100}" }
      },
      "processing": {
        "color": { "$value": "{brand.ai.accent}" },
        "background": { "$value": "{brand.ai.background}" }
      },
      "streaming": {
        "color": { "$value": "{blue.500}" },
        "background": { "$value": "{blue.100}" }
      },
      "success": {
        "color": { "$value": "{green.500}" },
        "background": { "$value": "{green.100}" }
      },
      "error": {
        "color": { "$value": "{red.500}" },
        "background": { "$value": "{red.100}" }
      }
    }
  }
}
```

### Data Visualization
```json
{
  "ai": {
    "chart": {
      "forecastLine": { "$value": "{brand.ai.highlight}" },
      "confidenceBand": { "$value": "{brand.ai.background}" },
      "anomalyMarker": { "$value": "{ai.anomaly.high.color}" },
      "trendUp": { "$value": "{green.500}" },
      "trendDown": { "$value": "{red.500}" },
      "gridColor": { "$value": "{gray.200}" }
    }
  }
}
```

### Visual Effects
```json
{
  "ai": {
    "effect": {
      "glow": {
        "color": { "$value": "{brand.ai.glow}" },
        "blur": { "$value": "8px" }
      },
      "shimmer": {
        "from": { "$value": "{gray.200}" },
        "to": { "$value": "{gray.300}" },
        "duration": { "$value": "1500ms" }
      },
      "backdropBlur": { "$value": "8px" }
    }
  }
}
```

---

## ✅ Checklist: Before Building Each Component

**Pre-work:**
- [ ] Review existing components (ai-insight-card, ai-confidence-badge, ai-thinking-indicator)
- [ ] Identify reusable patterns
- [ ] Check if tier 2 tokens exist (if not, add them)
- [ ] Design component API (props, events, slots)

**During Build:**
- [ ] TypeScript types for all props
- [ ] Lit component with shadow DOM
- [ ] Event-driven architecture
- [ ] Accessibility (ARIA, keyboard, focus)
- [ ] Loading states
- [ ] Error states
- [ ] Dark mode support

**Post-Build:**
- [ ] Unit tests (Vitest)
- [ ] Integration tests with AI client
- [ ] Create tier 3 tokens if needed
- [ ] Document in README
- [ ] Add to examples/vanilla-html
- [ ] Update PHASE_X_COMPLETE.md

---

## 🎯 Success Metrics

**After each component:**
- ✅ Works in vanilla HTML, Vue, React
- ✅ TypeScript types exported
- ✅ 80%+ test coverage
- ✅ WCAG 2.1 AA compliant
- ✅ < 5KB gzipped per component
- ✅ Dark mode supported
- ✅ Documented with examples

---

## 🚀 Next Immediate Steps

1. **Add missing tier 2 tokens** (AI states, chart colors, effects)
2. **Start with AI Action Button** (simplest, most reusable)
3. **Create tier 3 token file** for button
4. **Build + test + document**
5. **Integrate into ai-insight-card** to replace inline buttons
6. **Move to next component**

---

**Ready to start building?** Let's tackle AI Action Button first! 🔘✨
