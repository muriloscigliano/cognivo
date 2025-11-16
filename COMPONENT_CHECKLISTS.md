# Cognivo Component Checklists
## AI-Native Component Design & Development Checklist

**Last Updated:** November 16, 2025
**Based on:** Smashing Magazine Checklists + AI UX Patterns Research

📚 **Related Docs:**
- [AI UX Patterns](./AI_UX_PATTERNS.md) - Research-backed design patterns
- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md) - Component build plan
- [Smashing Checklists](./checklists.md) - Full industry checklist reference

---

## 🎯 Universal Checklist (All AI Components)

### Accessibility & Touch
- [ ] Are hit targets at least 50×50px (48px minimum)?
- [ ] Are all icons large enough to avoid rage-taps (24px+)?
- [ ] Do links, buttons, form elements have enough padding (12px+ vertical)?
- [ ] Do we provide visual feedback on tap (ripple/active state)?
- [ ] Do we space out icons with opposing functions (delete vs. save)?
- [ ] Are all interactive elements keyboard-focusable (Tab, Enter, Esc)?
- [ ] Do we provide proper ARIA labels for screen readers?
- [ ] Have we tested with keyboard-only navigation?
- [ ] Have we tested with screen readers (NVDA, VoiceOver)?
- [ ] Do we support high contrast mode?

### AI Transparency ✨
- [ ] Do we **Make Clear What the System Can Do**?
  - [ ] Clear action labels (verb + noun: "Explain Data")
  - [ ] Tooltips explaining AI capabilities
  - [ ] Examples showing what AI can analyze
- [ ] Do we **Make Clear How Well the System Works**?
  - [ ] Confidence scores always visible
  - [ ] Color-coded certainty levels (green/yellow/red)
  - [ ] Timestamp of analysis ("Analyzed 2 min ago")
- [ ] Do we **Support Efficient Invocation**?
  - [ ] Inline AI actions (not separate screens)
  - [ ] Keyboard shortcuts documented
  - [ ] Context-aware AI suggestions
- [ ] Do we **Support Efficient Dismissal**?
  - [ ] Close buttons on all AI results
  - [ ] "Don't show again" option
  - [ ] Non-modal design (doesn't block workflow)
- [ ] Do we **Mitigate Social Biases**?
  - [ ] Disclaimer about limitations
  - [ ] Link to "How AI works" documentation
  - [ ] Clear about data sources used

### Visual Design
- [ ] Does component work in light AND dark mode?
- [ ] Have we designed all interactive states?
  - [ ] Normal/idle
  - [ ] Hover
  - [ ] Active/pressed
  - [ ] Focus (keyboard)
  - [ ] Disabled
  - [ ] Loading
  - [ ] Success
  - [ ] Error
- [ ] Do transitions feel snappy (< 300ms)?
- [ ] Are animations CSS-based for performance?
- [ ] Do we provide loading indicators for async operations?
- [ ] Have we tested with slow network (throttle to 3G)?

### Performance
- [ ] Component < 5KB gzipped (check bundle size)?
- [ ] No layout shift (CLS < 0.1)?
- [ ] Renders in < 100ms (check with Lighthouse)?
- [ ] Works without JavaScript for core functionality?
- [ ] Images lazy-loaded where appropriate?

### Testing
- [ ] Unit tests (Vitest) with 80%+ coverage?
- [ ] Integration tests with AI client mock?
- [ ] Visual regression tests (Storybook)?
- [ ] Accessibility tests (axe-core)?
- [ ] Manual testing on mobile devices?
- [ ] Cross-browser testing (Chrome, Firefox, Safari)?

---

## 🔘 AI Action Button Checklist

### Design & UX
- [ ] **Icon + Label Design**
  - [ ] Do we use clear, benefit-focused labels? ("Explain Data" not "Analyze")
  - [ ] Does the icon match the action type? (💡 explain, 📊 forecast, 🔍 detect)
  - [ ] Is icon size appropriate for the button size (16px sm, 20px md, 24px lg)?
  - [ ] Can we recognize the button purpose without the icon?
  - [ ] Do we support icon-only mode with proper tooltip?

- [ ] **Button Sizes**
  - [ ] Small: 32px height, 8px 12px padding
  - [ ] Medium: 40px height, 12px 16px padding ✅ Default
  - [ ] Large: 48px height, 16px 24px padding
  - [ ] Do button sizes work well together when mixed?

- [ ] **States & Feedback**
  - [ ] **Idle state**: Clear, inviting appearance
  - [ ] **Hover state**: Subtle background change + cursor pointer
  - [ ] **Active/Processing state**:
    - [ ] Shows `<ai-thinking-indicator>` spinner
    - [ ] Button text changes ("Analyzing...")
    - [ ] Button disabled during processing
    - [ ] Uses processing state colors (AI purple)
  - [ ] **Success state** (optional):
    - [ ] Brief checkmark animation
    - [ ] Success color (green)
    - [ ] Auto-revert to idle after 2s
  - [ ] **Error state**:
    - [ ] Red color + error icon
    - [ ] Error message tooltip/inline
    - [ ] Retry option available
  - [ ] **Disabled state**:
    - [ ] Grayed out appearance
    - [ ] "not-allowed" cursor
    - [ ] Tooltip explains why disabled

- [ ] **Interaction**
  - [ ] Can users trigger action via click/tap?
  - [ ] Can users trigger action via Enter key when focused?
  - [ ] Can users trigger action via Space key when focused?
  - [ ] Do we prevent double-clicks (debounce)?
  - [ ] Do we show loading state immediately on click?
  - [ ] Can users cancel long-running AI operations?

- [ ] **Context & Tooltips**
  - [ ] Does tooltip explain what the AI will do?
  - [ ] Does tooltip show keyboard shortcut (if any)?
  - [ ] Does tooltip appear above/below based on available space?
  - [ ] Is tooltip accessible to screen readers?
  - [ ] Can users access tooltip via keyboard (focus)?

### Implementation
- [ ] **Props API**
  ```typescript
  - action: AiIntent (required)
  - size: 'sm' | 'md' | 'lg' = 'md'
  - variant: 'primary' | 'secondary' | 'ghost' = 'primary'
  - disabled: boolean = false
  - loading: boolean = false
  - icon?: string | Component
  - tooltip?: string
  - keyboard-shortcut?: string
  ```

- [ ] **Events**
  - [ ] `ai:action-click` - Fired on button click
  - [ ] `ai:action-triggered` - Fired when AI starts
  - [ ] `ai:action-complete` - Fired when AI finishes
  - [ ] `ai:action-error` - Fired on AI error

- [ ] **Slots**
  - [ ] `icon` - Custom icon slot
  - [ ] `default` - Button label text
  - [ ] `loading` - Custom loading indicator

### Tokens Used
- [ ] `ai.state.idle.*`
- [ ] `ai.state.processing.*`
- [ ] `ai.state.success.*`
- [ ] `ai.state.error.*`
- [ ] `spacing.sm/md/lg`
- [ ] `fontSize.sm/base/md`
- [ ] `fontWeight.medium/semibold`
- [ ] `radius.md`
- [ ] `transition.default`

### Smashing Checklist Integration
- [x] Hit target size (40px+ default)
- [x] Visual feedback on all interactions
- [x] Keyboard accessible
- [x] Disabled state with cursor change
- [x] Loading state with animation
- [x] Tooltip for guidance

---

## 📋 AI Result Panel Checklist

### Design & UX
- [ ] **Layout & Structure**
  - [ ] Do we show a clear header with confidence badge?
  - [ ] Do we use progressive disclosure (summary → details)?
  - [ ] Are sections collapsible for long content (> 3 items)?
  - [ ] Do we group related information together?
  - [ ] Is visual hierarchy clear (h3 → p → ul)?

- [ ] **Header Design**
  - [ ] Do we show confidence score prominently?
  - [ ] Do we display timestamp ("Analyzed 2 minutes ago")?
  - [ ] Do we include a close/dismiss button?
  - [ ] Do we show the AI intent that generated result?
  - [ ] Can users copy/share the result?

- [ ] **Content Display**
  - [ ] **Summary** (always visible):
    - [ ] 1-2 sentence overview
    - [ ] Key finding highlighted
    - [ ] Uses `typography.heading.h3` (Satoshi, 30px)
  - [ ] **Explanation** (collapsible):
    - [ ] Detailed analysis text
    - [ ] Paragraph breaks for readability
    - [ ] Links to related data
  - [ ] **Bullet Points** (collapsible):
    - [ ] Max 5 bullets shown by default
    - [ ] "Show more" for > 5 bullets
    - [ ] Proper list semantics (<ul>/<ol>)
  - [ ] **Drivers/Factors** (collapsible):
    - [ ] Visual bars showing impact %
    - [ ] Color-coded by impact level
    - [ ] Sorted by importance (high → low)
  - [ ] **Anomalies** (if detected):
    - [ ] Highlighted with severity color
    - [ ] Each anomaly has explanation
    - [ ] Link to underlying data point

- [ ] **Dismissal & Interaction**
  - [ ] Can users close the panel easily?
  - [ ] Do we remember dismissal preference?
  - [ ] Can users minimize/maximize the panel?
  - [ ] Can users pin the result for reference?
  - [ ] Do we persist results across page refresh?

- [ ] **Disclaimers & Trust**
  - [ ] Do we include an AI disclaimer?
  - [ ] Do we link to "How AI works" docs?
  - [ ] Do we show data sources used?
  - [ ] Do we provide a way to report issues?
  - [ ] Do we include feedback buttons (👍 👎)?

- [ ] **Progressive Disclosure**
  - [ ] Are `<details>` elements used for collapsible content?
  - [ ] Do `<summary>` elements have clear labels ("View Drivers (3)")?
  - [ ] Do we use proper icons (▼ collapsed, ▲ expanded)?
  - [ ] Do we animate expand/collapse smoothly?
  - [ ] Do we scroll to expanded section if needed?

### Implementation
- [ ] **Props API**
  ```typescript
  - title?: string
  - confidence?: number (0-1)
  - timestamp?: Date
  - dismissible: boolean = true
  - collapsible: boolean = true
  - intent?: AiIntent
  ```

- [ ] **Slots**
  - [ ] `header` - Custom header content
  - [ ] `summary` - Always visible summary
  - [ ] `content` - Main content area
  - [ ] `explanation` - Detailed explanation
  - [ ] `bullets` - Bullet point list
  - [ ] `drivers` - Driver/factor list
  - [ ] `anomalies` - Anomaly details
  - [ ] `disclaimer` - Custom disclaimer text
  - [ ] `footer` - Footer actions

- [ ] **Events**
  - [ ] `ai:result-dismiss` - Panel dismissed
  - [ ] `ai:result-expand` - Section expanded
  - [ ] `ai:result-collapse` - Section collapsed
  - [ ] `ai:result-feedback` - User feedback (👍 👎)

### Tokens Used
- [ ] `ai.result.background`
- [ ] `ai.result.border`
- [ ] `ai.result.padding`
- [ ] `ai.result.borderRadius`
- [ ] `ai.confidence.*`
- [ ] `ai.driver.impact.*`
- [ ] `ai.anomaly.*`
- [ ] `typography.heading.*`
- [ ] `typography.body.*`
- [ ] `spacing.*`

### Smashing Checklist Integration
- [x] Progressive disclosure (collapsible sections)
- [x] Clear visual hierarchy
- [x] Close button positioned consistently
- [x] Keyboard accessible (Tab, Enter, Esc)
- [x] Proper semantic HTML (<details>, <summary>)
- [x] Animated transitions
- [x] Responsive on mobile

---

## 📊 AI Table Checklist

### Design & UX
- [ ] **Column Design**
  - [ ] How many columns do we display on mobile (2-3 max)?
  - [ ] Which columns are most critical to show always?
  - [ ] Do we provide column selector/customization?
  - [ ] Do we use tilted headers to save horizontal space?
  - [ ] Are column headers sticky on scroll?
  - [ ] Can users resize columns?
  - [ ] Can users reorder columns (drag & drop)?

- [ ] **Row Design**
  - [ ] Do we highlight rows on hover?
  - [ ] Do we highlight selected rows clearly?
  - [ ] Do rows expand to show details on tap/click?
  - [ ] Do we use alternating row colors (zebra striping)?
  - [ ] How do we handle very long cell content (truncate/wrap)?
  - [ ] What's the minimum row height (48px for touch)?

- [ ] **Anomaly Highlighting** ✨
  - [ ] **Critical anomalies** (red background + red border + glow):
    - [ ] Clearly stand out from normal rows
    - [ ] Include anomaly icon
    - [ ] Show confidence badge inline
  - [ ] **High severity** (orange/red background):
    - [ ] Distinct but less alarming than critical
  - [ ] **Medium severity** (yellow background):
    - [ ] Noticeable but not overwhelming
  - [ ] **Low severity** (light yellow background):
    - [ ] Subtle highlight
  - [ ] Do we provide a legend explaining colors?
  - [ ] Can users filter to show only anomalies?
  - [ ] Can users sort by anomaly severity?

- [ ] **Confidence Display**
  - [ ] Do we show confidence badge per row?
  - [ ] Where do we place it (dedicated column or inline)?
  - [ ] Do we use color-coding (green/yellow/red)?
  - [ ] Can users sort by confidence score?
  - [ ] Do we explain what confidence means (tooltip)?

- [ ] **AI Actions**
  - [ ] **Row-level actions**:
    - [ ] Do actions appear on hover/tap?
    - [ ] Are actions contextual (relevant to row data)?
    - [ ] Can users "Explain this row"?
    - [ ] Can users "Investigate anomaly"?
    - [ ] Do we use an overflow menu for >3 actions?
  - [ ] **Bulk actions**:
    - [ ] Can users select multiple rows?
    - [ ] Do we show selected count?
    - [ ] Can users "Explain selected" (bulk)?
    - [ ] Can users export selected rows?
  - [ ] **Table-level actions**:
    - [ ] "Detect all anomalies" button
    - [ ] "Explain trends" button
    - [ ] "Export with insights" button

- [ ] **Sorting & Filtering**
  - [ ] Can users sort by any column?
  - [ ] Do we indicate sort direction (▲ ▼)?
  - [ ] Do we support multi-column sorting?
  - [ ] Can users filter by anomaly status?
  - [ ] Can users filter by confidence level?
  - [ ] Do we show active filters as removable chips?
  - [ ] Can users reset all filters quickly?

- [ ] **Mobile Optimization**
  - [ ] Do we transform rows into cards on mobile?
  - [ ] Do cards show the most important data points?
  - [ ] Can users swipe to reveal more details?
  - [ ] Do we provide horizontal scrolling as fallback?
  - [ ] Are column headers fixed during scroll?

- [ ] **Empty & Error States**
  - [ ] What do we show when table is empty?
  - [ ] What do we show when filter returns no results?
  - [ ] How do we handle loading states (skeleton)?
  - [ ] How do we handle errors (retry button)?

- [ ] **Performance**
  - [ ] Do we virtualize rows for large datasets (>100 rows)?
  - [ ] Do we paginate or use infinite scroll?
  - [ ] Do we lazy-load AI insights per row?
  - [ ] Do we debounce sort/filter operations?

### Implementation
- [ ] **Props API**
  ```typescript
  - columns: ColumnDef[] (required)
  - data: T[] (required)
  - highlightAnomalies: boolean = true
  - showConfidence: boolean = true
  - selectable: boolean = false
  - sortable: boolean = true
  - filterable: boolean = true
  - stickyHeader: boolean = true
  - virtualScroll: boolean = false (for >100 rows)
  - aiClient?: AiClient
  ```

- [ ] **Events**
  - [ ] `ai:row-selected` - Row selected
  - [ ] `ai:row-action` - AI action on row
  - [ ] `ai:sort` - Sort changed
  - [ ] `ai:filter` - Filter applied
  - [ ] `ai:bulk-action` - Bulk action triggered

- [ ] **Slots**
  - [ ] `header` - Custom table header
  - [ ] `row` - Custom row template
  - [ ] `cell` - Custom cell template
  - [ ] `empty` - Empty state
  - [ ] `loading` - Loading state
  - [ ] `actions` - Row actions

### Tokens Used
- [ ] `ai.anomaly.critical.*`
- [ ] `ai.anomaly.high.*`
- [ ] `ai.anomaly.medium.*`
- [ ] `ai.anomaly.low.*`
- [ ] `ai.confidence.*`
- [ ] `gray.50` (header bg)
- [ ] `gray.100` (row hover)
- [ ] `gray.300` (borders)
- [ ] `spacing.12/16` (cell padding)

### Smashing Checklist Integration
- [x] Mobile-first approach (cards/horizontal scroll)
- [x] Sticky headers
- [x] Highlight on hover/selection
- [x] Keyboard navigation (arrows, Enter, Space)
- [x] Empty states with helpful messaging
- [x] Loading states (skeleton)
- [x] Column customization
- [x] Responsive design

---

## 📈 AI Mini Chart Checklist

### Design & UX
- [ ] **Chart Type Selection**
  - [ ] Line chart (time series data)
  - [ ] Bar chart (categorical comparison)
  - [ ] Area chart (volume trends)
  - [ ] Scatter plot (correlation analysis)
  - [ ] Do we support multiple chart types?
  - [ ] Can users switch between chart types?

- [ ] **Forecast Visualization** ✨
  - [ ] **Historical data**: Solid line in brand color
  - [ ] **Forecast line**: Dashed line in AI purple
  - [ ] **Confidence band**: Shaded area in light purple
  - [ ] Does band width represent uncertainty?
  - [ ] Do we label forecast start point?
  - [ ] Can users toggle forecast on/off?

- [ ] **Anomaly Markers** ✨
  - [ ] Do anomalies appear as distinct markers (dots/diamonds)?
  - [ ] Are they color-coded by severity?
  - [ ] Do they have a glow effect for visibility?
  - [ ] Can users click anomaly to see details?
  - [ ] Do we show anomaly count in legend?

- [ ] **Tooltip & Interaction**
  - [ ] Does tooltip show on hover/tap?
  - [ ] What data do we show in tooltip?
    - [ ] Date/time
    - [ ] Value
    - [ ] Confidence (if forecast)
    - [ ] Anomaly explanation (if applicable)
  - [ ] Does tooltip follow cursor or snap to data point?
  - [ ] Can users click data point for details?
  - [ ] Can users zoom into a region?
  - [ ] Can users pan left/right?

- [ ] **Legend & Labels**
  - [ ] Do we show a clear legend?
  - [ ] Does legend explain forecast vs. actual?
  - [ ] Does legend show anomaly severity levels?
  - [ ] Are axis labels clear and readable?
  - [ ] Do we show units (%, $, count)?
  - [ ] Do we use abbreviations (K, M, B) for large numbers?

- [ ] **Responsive Design**
  - [ ] Does chart resize on viewport change?
  - [ ] Do we adjust detail level on mobile (fewer labels)?
  - [ ] Do we hide legend on very small screens?
  - [ ] Can we stack multiple metrics vertically on mobile?

- [ ] **Performance**
  - [ ] Do we use Canvas or SVG (Canvas for >1000 points)?
  - [ ] Do we debounce resize events?
  - [ ] Do we lazy-load chart data?
  - [ ] Do we use requestAnimationFrame for animations?

### Implementation
- [ ] **Props API**
  ```typescript
  - data: DataPoint[] (required)
  - chartType: 'line' | 'bar' | 'area' = 'line'
  - showForecast: boolean = false
  - forecastData?: ForecastPoint[]
  - confidenceBand?: { lower: number, upper: number }
  - highlightAnomalies: boolean = true
  - anomalyData?: AnomalyPoint[]
  - responsive: boolean = true
  - height?: number
  - aiClient?: AiClient
  ```

- [ ] **Events**
  - [ ] `ai:chart-click` - Data point clicked
  - [ ] `ai:anomaly-click` - Anomaly marker clicked
  - [ ] `ai:zoom` - Chart zoomed
  - [ ] `ai:pan` - Chart panned

- [ ] **Slots**
  - [ ] `legend` - Custom legend
  - [ ] `tooltip` - Custom tooltip
  - [ ] `empty` - Empty state
  - [ ] `loading` - Loading state

### Tokens Used
- [ ] `ai.chart.forecastLine`
- [ ] `ai.chart.confidenceBand`
- [ ] `ai.chart.anomalyMarker`
- [ ] `ai.chart.trendUp`
- [ ] `ai.chart.trendDown`
- [ ] `ai.chart.gridColor`
- [ ] `ai.chart.axisColor`
- [ ] `brand.primary.*`
- [ ] `fontSize.xs/sm`

### Smashing Checklist Integration
- [x] Responsive sizing
- [x] Tooltip on hover/tap
- [x] Loading states
- [x] Empty states
- [x] Keyboard navigation (Tab to markers)
- [x] Touch gestures (zoom, pan)
- [x] Performance optimization (Canvas for large datasets)

---

## 💬 AI Action Group Checklist

### Design & UX
- [ ] **Layout**
  - [ ] Horizontal layout (default for desktop)
  - [ ] Vertical layout (option for sidebars)
  - [ ] Grid layout (for many actions)
  - [ ] Do we wrap actions on mobile?
  - [ ] Do we use consistent spacing between buttons?

- [ ] **Action Display**
  - [ ] Text + icon (default)
  - [ ] Icon only (with tooltip)
  - [ ] Text only
  - [ ] Can users toggle between display modes?

- [ ] **Overflow Handling**
  - [ ] What happens with > 4 actions?
  - [ ] Do we use a "More" dropdown?
  - [ ] Do we scroll horizontally?
  - [ ] Do we prioritize important actions?
  - [ ] Can users customize which actions show?

- [ ] **Active State**
  - [ ] Do we highlight the active action?
  - [ ] Do we show which action was last used?
  - [ ] Do we remember user's preferences?

- [ ] **Keyboard Navigation**
  - [ ] Can users navigate with arrow keys?
  - [ ] Can users activate with Enter/Space?
  - [ ] Does Tab move between actions?
  - [ ] Do we support Shift+Tab for reverse?

- [ ] **Context Awareness** ✨
  - [ ] Do we show only relevant actions for context?
  - [ ] Do we hide unavailable actions or disable them?
  - [ ] Do we reorder actions by relevance?
  - [ ] Do we suggest a recommended action?

### Implementation
- [ ] **Props API**
  ```typescript
  - actions: AiIntent[] (required)
  - layout: 'horizontal' | 'vertical' | 'grid' = 'horizontal'
  - display: 'icon-text' | 'icon-only' | 'text-only' = 'icon-text'
  - maxVisible: number = 4
  - showTooltips: boolean = true
  - contextual: boolean = true
  ```

- [ ] **Events**
  - [ ] `ai:action` - Action selected
  - [ ] `ai:action-focus` - Action focused
  - [ ] `ai:overflow-open` - Overflow menu opened

- [ ] **Slots**
  - [ ] `actions` - Custom action buttons
  - [ ] `overflow` - Custom overflow menu

### Tokens Used
- [ ] `ai.action.button.*`
- [ ] `spacing.8` (gap between actions)
- [ ] `spacing.16` (group padding)

### Smashing Checklist Integration
- [x] Clear visual grouping
- [x] Consistent spacing
- [x] Keyboard navigation
- [x] Overflow handling
- [x] Responsive layout

---

## 📝 Before Shipping Checklist

### Documentation
- [ ] Component API documented (props, events, slots)
- [ ] Usage examples created
- [ ] Storybook stories added
- [ ] TypeScript types exported
- [ ] README updated

### Testing
- [ ] Unit tests passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] Visual regression tests passing
- [ ] Accessibility audit passed (axe-core)
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Keyboard-only testing completed
- [ ] Screen reader testing completed

### Performance
- [ ] Bundle size < 5KB gzipped
- [ ] Lighthouse score > 90
- [ ] No console errors/warnings
- [ ] No memory leaks
- [ ] No layout shifts (CLS < 0.1)

### Design
- [ ] Design tokens used (no hardcoded values)
- [ ] Light and dark mode working
- [ ] All interactive states designed
- [ ] Responsive on all screen sizes
- [ ] Touch targets meet minimum size (48px)

### Code Quality
- [ ] ESLint passing (no warnings)
- [ ] TypeScript strict mode passing
- [ ] No any types (except where necessary)
- [ ] Code reviewed by peer
- [ ] Changelog updated

---

## 🎯 Success Metrics

**After shipping each component, track:**
- [ ] Usage frequency (how often is it used?)
- [ ] Error rate (how often does it fail?)
- [ ] User feedback score (👍 👎 ratio)
- [ ] Performance metrics (load time, interaction time)
- [ ] Accessibility issues reported
- [ ] Bundle size impact on app

---

**Remember:** Each checkbox is a conversation starter. Use these as a guide, not a rigid checklist. Adapt based on your specific use case and user needs!
