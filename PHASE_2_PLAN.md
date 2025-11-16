# Phase 2 Plan - Build + Test Strategy
## AI Chat Demo as Testing Environment

**Created:** November 16, 2025
**Goal:** Build components while simultaneously creating a real testing environment

---

## 🎯 The Strategy: Build + Test Simultaneously

### Approach 1: Just Build Components ❌
```
Build Component → Write Unit Tests → Ship → Hope it works
```
**Problems:**
- No real-world testing
- Hard to see components in action
- Miss integration issues
- No visual feedback during development

### Approach 2: Build Components + AI Chat Demo ✅ **RECOMMENDED**
```
Build Component → Add to Chat Demo → Test Visually → Iterate → Ship
```
**Benefits:**
- ✅ Visual feedback immediately
- ✅ Real integration testing
- ✅ Living documentation (demo = docs)
- ✅ Dog-fooding (we use our own components)
- ✅ User feedback early
- ✅ Showcase for potential users

---

## 🏗️ Two-Track Development

### Track 1: Components (Priority #1)
Build production-ready components one-by-one:
1. AI Action Button
2. AI Result Panel
3. AI Table
4. AI Mini Chart
5. AI Action Group

### Track 2: AI Chat Demo (Priority #2)
Build a simple chat interface to test components:
- Basic chat UI
- Message history
- AI responses using our components
- Test all 8 AI intents

**Rule:** Components are MORE important. Demo is for testing only.

---

## 📁 Project Structure

```
examples/
├── vanilla-html/          # Existing simple example
│   └── index.html
└── ai-chat/              # NEW: AI Chat Demo
    ├── index.html        # Chat interface
    ├── main.ts           # App logic
    ├── styles.css        # Chat-specific styles
    ├── components/       # Demo-specific components
    │   ├── chat-message.ts
    │   ├── chat-input.ts
    │   └── chat-sidebar.ts
    └── README.md         # How to run the demo
```

**Key principle:** Demo lives in `examples/`, NOT main codebase

---

## 🎨 AI Chat Demo Features

### Must-Have Features (MVP)
- [ ] Chat input with send button
- [ ] Message history display
- [ ] AI response rendering with our components
- [ ] Switch between 8 AI intents
- [ ] Sample datasets (spending, revenue, users)
- [ ] Clear chat button

### Should-Have Features
- [ ] Dark mode toggle
- [ ] Dataset selector (spending/revenue/metrics)
- [ ] Save/load chat history
- [ ] Copy AI responses
- [ ] Keyboard shortcuts (Enter to send, Ctrl+K to clear)

### Nice-to-Have Features
- [ ] Multiple conversations (tabs)
- [ ] Export chat to PDF/Markdown
- [ ] Share conversation link
- [ ] Feedback buttons on responses

---

## 🔄 Development Workflow

### Week 1-2: Foundation
**Day 1-2:** Build AI Action Button
- Component implementation
- Unit tests
- Add to Chat Demo (as action buttons in chat)

**Day 3-4:** Build AI Result Panel
- Component implementation
- Unit tests
- Add to Chat Demo (render AI responses)

**Day 5:** Chat Demo MVP
- Basic chat UI
- Wire up components
- Test end-to-end flow

### Week 3-4: Data Components
**Day 1-4:** Build AI Table
- Component implementation
- Unit tests
- Add to Chat Demo (table in AI responses)

**Day 5:** Integration testing
- Test table with real data
- Test anomaly highlighting
- Test row-level actions

### Week 5-6: Visualization
**Day 1-3:** Build AI Mini Chart
- Component implementation
- Unit tests
- Add to Chat Demo (charts in responses)

**Day 4:** Build AI Action Group
- Component implementation
- Unit tests
- Add to Chat Demo (multiple actions)

**Day 5:** Polish Chat Demo
- Add all should-have features
- Visual polish
- Performance optimization

---

## 💬 Chat Demo Architecture

### Simple Conversation Flow

```typescript
// User types message
User: "Explain my spending trends"

  ↓

// Chat detects intent from message
Intent Detection: "explain" intent

  ↓

// Show action buttons (our AI Action Button component)
<ai-action-button action="explain">Explain Spending</ai-action-button>

  ↓

// User clicks button → AI processes
AI Client: runIntent('explain', { dataset: spendingData })

  ↓

// Show result in chat (our AI Result Panel component)
<ai-result-panel>
  <ai-confidence-badge score="0.92"></ai-confidence-badge>
  <h3>Spending increased 93% in March</h3>
  <ul>
    <li>Campaign launch: 85% impact</li>
    <li>Seasonal trend: 15% impact</li>
  </ul>
</ai-result-panel>
```

### Message Types

**1. User Messages**
```html
<div class="message user">
  <p>Explain my spending trends</p>
</div>
```

**2. AI Action Messages** (our components!)
```html
<div class="message ai-actions">
  <p>I can help with that. Choose an action:</p>
  <ai-action-group :actions="['explain', 'forecast', 'detect_anomaly']">
  </ai-action-group>
</div>
```

**3. AI Result Messages** (our components!)
```html
<div class="message ai-result">
  <ai-result-panel>
    <!-- AI insights here -->
  </ai-result-panel>
</div>
```

**4. AI Table/Chart Messages** (our components!)
```html
<div class="message ai-data">
  <ai-table :data="spendingData" highlight-anomalies>
  </ai-table>
</div>
```

---

## 🎯 Component Testing via Chat

### How Each Component Gets Tested

**AI Action Button:**
- Chat shows action buttons for each intent
- Test all 8 intents (explain, forecast, etc.)
- Test sizes (sm, md, lg)
- Test states (idle, processing, success, error)
- Test keyboard shortcuts

**AI Result Panel:**
- Every AI response uses this component
- Test with different result types (bullets, drivers, anomalies)
- Test progressive disclosure (collapsible sections)
- Test dismiss/close functionality
- Test timestamps and confidence scores

**AI Table:**
- Show data tables in AI responses
- Test anomaly highlighting with real data
- Test sorting/filtering
- Test row-level AI actions
- Test mobile responsiveness

**AI Mini Chart:**
- Embed charts in AI responses
- Test forecast visualization
- Test anomaly markers
- Test tooltips and interaction
- Test different chart types

**AI Action Group:**
- Group multiple actions in chat
- Test horizontal/vertical layouts
- Test overflow handling (>4 actions)
- Test keyboard navigation

---

## 📊 Sample Datasets for Testing

### Dataset 1: Monthly Spending
```javascript
const spendingData = [
  { month: 'Jan', amount: 12450, anomaly: false },
  { month: 'Feb', amount: 11890, anomaly: false },
  { month: 'Mar', amount: 43291, anomaly: true },  // 93% spike
  { month: 'Apr', amount: 13200, anomaly: false },
  // ... more data
]
```

### Dataset 2: User Metrics
```javascript
const userMetrics = [
  { date: '2024-01-01', signups: 234, churn: 12 },
  { date: '2024-01-02', signups: 156, churn: 8 },
  // ... more data
]
```

### Dataset 3: Revenue by Product
```javascript
const revenueData = [
  { product: 'Pro Plan', revenue: 45000, growth: 0.23 },
  { product: 'Enterprise', revenue: 128000, growth: 0.45 },
  // ... more data
]
```

---

## 🚀 Implementation Priority

### Phase 2A: Core Components (Weeks 1-2)
**Must build before demo is useful:**
1. ✅ AI Action Button (4-6 hours)
2. ✅ AI Result Panel (6-8 hours)
3. ✅ Basic Chat UI (4 hours)

**After these 3, we have a working demo!**

### Phase 2B: Data Components (Weeks 3-4)
**Add data visualization:**
4. ✅ AI Table (12-16 hours)
5. ✅ Integration with chat demo (2 hours)

### Phase 2C: Polish (Weeks 5-6)
**Complete the set:**
6. ✅ AI Mini Chart (10-14 hours)
7. ✅ AI Action Group (6-8 hours)
8. ✅ Demo polish & features (4-6 hours)

---

## 🎨 Demo Visual Design

### Chat Layout
```
┌─────────────────────────────────────────┐
│  Cognivo AI Chat          [☀️ 🌙]  ⚙️  │  Header
├─────────────────────────────────────────┤
│                                         │
│  👤 Show me spending anomalies          │  User message
│                                         │
│  🤖 I found 2 anomalies in March:       │  AI response
│  ┌─────────────────────────────────┐   │
│  │ AI Result Panel Component       │   │  Our component!
│  │ [Confidence: 95%]               │   │
│  │                                 │   │
│  │ • March spike: +93%             │   │
│  │ • Caused by: Campaign launch   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  👤 Show me the data table              │  User message
│                                         │
│  🤖 Here's the spending data:           │  AI response
│  ┌─────────────────────────────────┐   │
│  │ AI Table Component              │   │  Our component!
│  │ [March row highlighted in red]  │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
│ Type a message...              [Send] │  Input
└─────────────────────────────────────────┘
```

---

## 🔧 Technical Stack for Demo

**Frontend:**
- Vanilla TypeScript (keep it simple)
- Lit for chat-specific components
- Our Cognivo components (obviously!)
- CSS custom properties (use our tokens)

**AI Integration:**
- @cognivo/adapter-openai
- User provides their own API key (like vanilla-html example)
- Store API key in localStorage

**State Management:**
- Simple message array
- No complex state library needed
- Use Lit reactive properties

---

## ✅ Success Criteria

**Demo is successful when:**
- [ ] All 5 components are integrated and working
- [ ] Can test all 8 AI intents
- [ ] Works on mobile and desktop
- [ ] Dark mode supported
- [ ] < 3 seconds to first response
- [ ] No console errors
- [ ] Accessible via keyboard
- [ ] Sample datasets included
- [ ] README with setup instructions

---

## 🎯 Key Benefits of This Approach

### 1. Visual Feedback Loop 👀
See components in action immediately, catch UI issues fast

### 2. Real Integration Testing 🔗
Components interact with each other, find integration bugs

### 3. Living Documentation 📚
Demo shows how to use components better than docs

### 4. Dog-Fooding 🐕
We use our own components, feel the pain points

### 5. User Feedback Early 💬
People can try it and give feedback before v1.0

### 6. Showcase for Adoption 🚀
"Try the demo" is better than "read the docs"

### 7. Development Motivation 🔥
Seeing it work in real-time is more fun than unit tests

---

## 🚦 Decision: Build Components First, Demo Second

**Priority order:**
1. Build component (4-16 hours)
2. Write unit tests (2-4 hours)
3. Add to demo (1-2 hours)
4. Test visually + iterate (1 hour)
5. Ship component

**Time split:**
- 70% building components
- 20% testing
- 10% demo integration

---

## 📝 Next Steps

**Immediate (Today):**
1. ✅ Approve this plan (or adjust it)
2. 🔨 Start building AI Action Button
3. 📝 Add to demo as we build

**This Week:**
- [ ] AI Action Button complete
- [ ] AI Result Panel complete
- [ ] Basic Chat Demo MVP working
- [ ] Can test end-to-end flow

**This Month:**
- [ ] All 5 components complete
- [ ] Full-featured Chat Demo
- [ ] Dark mode working
- [ ] Sample datasets included
- [ ] README written

---

## 🎯 Recommendation

**YES! Build the AI Chat Demo alongside components!**

**Proposed structure:**
```
Phase 2A: Core (Week 1-2)
├── AI Action Button → Add to demo
├── AI Result Panel → Add to demo
└── Chat Demo MVP → Wire it all up

Phase 2B: Data (Week 3-4)
├── AI Table → Add to demo
└── Test with real datasets

Phase 2C: Complete (Week 5-6)
├── AI Mini Chart → Add to demo
├── AI Action Group → Add to demo
└── Polish + ship
```

**Let's start NOW with AI Action Button + Basic Chat UI!** 🚀
