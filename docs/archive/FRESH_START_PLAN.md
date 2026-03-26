# FRESH START PLAN - Incremental Approach

## 🎯 **Goal**

Build Cognivo **one component at a time**, validating each step before moving forward.

## 📋 **Phase 0: Setup (30 minutes)**

### **Step 1: Archive Current Components**
```bash
mkdir -p archive
mv packages/components archive/components-attempt-1
mv examples archive/examples-attempt-1
```

### **Step 2: Keep What Works**
Keep these folders untouched:
- ✅ `packages/tokens/` - Working perfectly
- ✅ `packages/core/` - Good architecture
- ✅ `packages/adapter-openai/` - Built successfully

### **Step 3: Create Fresh Structure**
```
packages/
  components/           # ← Start fresh here
    src/
      components/
        ai-thinking/    # ← First component only
      index.ts
    package.json
    vite.config.ts
```

---

## 🎨 **Phase 1: ONE Component (1 hour)**

### **Goal: Get `<ai-thinking-indicator>` working in browser**

### **Step 1.1: Create Minimal Component (15 min)**
```typescript
// packages/components/src/components/ai-thinking/ai-thinking.ts
import { LitElement, html, css } from 'lit';

export class AiThinking extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      gap: 6px;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #8b5cf6;
      border-radius: 50%;
      animation: pulse 1.4s ease-in-out infinite;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `;

  render() {
    return html`
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    `;
  }
}
```

### **Step 1.2: Register Component (5 min)**
```typescript
// packages/components/src/index.ts
import { AiThinking } from './components/ai-thinking/ai-thinking.js';

// Register component
customElements.define('ai-thinking', AiThinking);

console.log('✅ ai-thinking registered');

export { AiThinking };
```

### **Step 1.3: Simple Build Config (10 min)**
```typescript
// packages/components/vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['lit'],
    },
  },
});
```

### **Step 1.4: Build It (2 min)**
```bash
cd packages/components
pnpm install lit
pnpm build
```

### **Step 1.5: Test Page (10 min)**
```html
<!-- test/test-one.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Test: AI Thinking</title>
</head>
<body>
  <h1>Test: AI Thinking Indicator</h1>

  <h2>Component:</h2>
  <ai-thinking></ai-thinking>

  <h2>Debug:</h2>
  <div id="status"></div>

  <script type="module">
    import '../packages/components/dist/index.js';

    setTimeout(() => {
      const isDefined = customElements.get('ai-thinking');
      const status = document.getElementById('status');

      if (isDefined) {
        status.innerHTML = '✅ Component registered and working!';
        status.style.color = 'green';
      } else {
        status.innerHTML = '❌ Component not registered';
        status.style.color = 'red';
      }
    }, 100);
  </script>
</body>
</html>
```

### **Step 1.6: VALIDATE ✅**
1. Start server: `python3 -m http.server 8080`
2. Open: `http://localhost:8080/test/test-one.html`
3. **See spinning dots** ← MUST SEE THIS
4. **See green checkmark** ← MUST SEE THIS
5. **Console shows "✅ ai-thinking registered"** ← MUST SEE THIS

**DO NOT PROCEED** until this works!

---

## 🎨 **Phase 2: Add Second Component (1 hour)**

### **Only start if Phase 1 works!**

### **Step 2.1: Create `<ai-badge>` Component**
Simple badge showing confidence score.

### **Step 2.2: Register It**
Add to `src/index.ts`

### **Step 2.3: Build**
`pnpm build`

### **Step 2.4: Test Page**
Create `test/test-two.html` with both components

### **Step 2.5: VALIDATE ✅**
Both components must work before Phase 3

---

## 🎨 **Phase 3: Add Data Card (1 hour)**

### **Only start if Phase 2 works!**

### **Step 3.1: Create `<kpi-card>`**
Card with title, value, trend.

### **Step 3.2: Use Tokens**
Import and use CSS variables from tokens package

### **Step 3.3: Build & Test**
Create `test/test-three.html`

### **Step 3.4: VALIDATE ✅**

---

## 🎨 **Phase 4: Add Chart (2 hours)**

### **Only start if Phase 3 works!**

### **Step 4.1: Create `<bar-chart>`**
Simple bar chart with SVG

### **Step 4.2: Add Data Props**
Make it accept data array

### **Step 4.3: Build & Test**

### **Step 4.4: VALIDATE ✅**

---

## 🎨 **Phase 5: Create Demo Page (1 hour)**

### **Only start if Phase 4 works!**

Create beautiful demo showing all 4 components:
- `<ai-thinking>`
- `<ai-badge>`
- `<kpi-card>`
- `<bar-chart>`

**This is your MVP showcase!**

---

## 🤖 **Phase 6: Add AI Integration (2 hours)**

### **Only start if Phase 5 works!**

### **Step 6.1: Create `<ai-chat>` Component**
Simple chat interface

### **Step 6.2: Connect OpenAI Adapter**
Use existing `@cognivo/adapter-openai`

### **Step 6.3: Test with Real API**

### **Step 6.4: VALIDATE ✅**

---

## 🚀 **Phase 7: Expand (Ongoing)**

Now you have proven process:

1. Create 1 new component
2. Build
3. Test
4. Validate
5. **Only then** create next component

Add components in this order:
1. `<ai-insight-card>` - AI insights display
2. `<data-card>` - Data display
3. `<line-chart>` - Line chart visualization
4. `<ai-confidence-badge>` - Confidence score
5. ... continue one by one

---

## ✅ **Success Criteria**

### **After Phase 1:**
- [ ] ONE component works perfectly in browser
- [ ] Can see it rendering
- [ ] Console shows registration
- [ ] Test page validates it

### **After Phase 5 (MVP):**
- [ ] 4 components working
- [ ] Beautiful demo page
- [ ] All components use design tokens
- [ ] Clean, simple build process
- [ ] Documented and tested

### **After Phase 6:**
- [ ] AI chat works with real API
- [ ] Can analyze data
- [ ] End-to-end flow validated

---

## 🔑 **Key Rules**

1. **NEVER skip validation** - If current phase doesn't work, FIX IT before continuing
2. **One component at a time** - Don't be tempted to add multiple
3. **Test in browser** - Build process doesn't matter if browser doesn't work
4. **Keep it simple** - No complex build setup until needed
5. **Manual is OK** - Manual registration is fine, decorators can come later

---

## 🗓️ **Timeline**

- **Day 1 (Today):**
  - Phase 0: Setup ✅
  - Phase 1: First component ✅
  - Phase 2: Second component ✅

- **Day 2:**
  - Phase 3: Data card
  - Phase 4: Chart
  - Phase 5: Demo page

- **Day 3:**
  - Phase 6: AI integration
  - Polish and document

- **Week 2+:**
  - Phase 7: Add components incrementally
  - One component per day
  - Build library gradually

---

## 🎯 **Decision Point**

**Are you ready to start fresh with this approach?**

- [ ] Yes - Let's archive current components and start Phase 0
- [ ] Not yet - Want to discuss the plan first
- [ ] Try to fix current components - Keep debugging what we have

**My recommendation: Start fresh. The current setup is too broken to fix efficiently.**

---

## 📁 **Next Steps**

If you decide to start fresh:

1. I'll archive current components
2. Create minimal structure
3. Build first component together
4. Validate it works
5. Only then continue

**We'll do this together, step by step, validating at each stage.**

Ready to start?
