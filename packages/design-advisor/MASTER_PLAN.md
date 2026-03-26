# Cognivo Design Advisor - Master Build Plan

**Goal**: Build 180+ comprehensive cognitive bias cards for design analysis

## 📊 Bias Inventory

### Total Count: 180 Unique Biases

**By Category:**
- **Perception**: 55 biases
- **Decision-Making**: 72 biases
- **Memory**: 30 biases
- **Social**: 45 biases
- **Attribution**: 8 biases
- **Emotional**: 42 biases
- **Cognitive (General)**: 94 biases

*Note: Many biases appear in multiple categories*

---

## 🎯 Build Strategy

### Phase 1: Foundation (5 Exemplar Biases) ✅ COMPLETE
**Goal**: Create perfect templates + infrastructure
**Status**: 5/5 complete

**Biases:**
1. ✅ **Anchoring Bias** - Price/value reference points
2. ✅ **Loss Aversion** - Fear of losing vs gaining
3. ✅ **Social Proof** - Following others' behavior
4. ✅ **Von Restorff Effect** - Isolation/distinctiveness
5. ✅ **Framing Effect** - How information is presented

**Deliverables:**
- Complete type system ✅
- Package structure ✅
- 5 fully documented bias cards ✅
- Bias card component ✅
- Bias library component ✅

---

### Phase 2: High-Impact Design Biases (20 biases) ✅ COMPLETE
**Goal**: Most critical biases for UI/UX designers
**Status**: 20/20 complete

**Biases:**
1. Halo Effect
2. Primacy Effect
3. Recency Effect
4. Serial Position Effect
5. Contrast Effect
6. Peak-End Rule
7. Mere Exposure Effect
8. IKEA Effect
9. Endowment Effect
10. Status Quo Bias
11. Default Effect
12. Decoy Effect
13. Scarcity Bias
14. Bandwagon Effect
15. Confirmation Bias
16. Choice-Supportive Bias
17. Optimism Bias
18. Planning Fallacy
19. Hyperbolic Discounting
20. Availability Heuristic

---

### Phase 3: Medium-Impact Biases (50 biases) ✅ COMPLETE
**Goal**: Important but less frequently leveraged
**Status**: 50/50 complete

**Categories:**
- **Perception** (15): Attentional Bias, Change Blindness, Context Effect, etc.
- **Decision-Making** (15): Ambiguity Effect, Compromise Effect, Denomination Effect, etc.
- **Memory** (10): Flashbulb Memory, Picture Superiority Effect, etc.
- **Social** (10): Authority Bias, In-Group Bias, Conformity, etc.

---

### Phase 4: Remaining Biases (105 biases) ✅ COMPLETE
**Goal**: Complete the library
**Status**: 105/105 complete

---

## 📁 File Structure

```
packages/design-advisor/
├── MASTER_PLAN.md (this file)
├── BIAS_INDEX.md (searchable index)
├── package.json
├── vite.config.ts
├── tsconfig.json
│
├── src/
│   ├── index.ts (main export)
│   │
│   ├── biases/
│   │   ├── core/
│   │   │   ├── types.ts ✅ (complete type system)
│   │   │   └── template.ts (bias card template)
│   │   │
│   │   ├── anchoring-bias/ ✅
│   │   │   └── index.ts (complete exemplar)
│   │   │
│   │   ├── loss-aversion/
│   │   ├── social-proof/
│   │   ├── von-restorff-effect/
│   │   ├── framing-effect/
│   │   │
│   │   └── [175+ more biases...]
│   │   └── index.ts (export all biases)
│   │
│   ├── components/
│   │   ├── bias-card.ts (visual card component)
│   │   ├── bias-analyzer.ts (analyze designs)
│   │   ├── bias-library.ts (browse all biases)
│   │   ├── bias-search.ts (search functionality)
│   │   └── design-scanner.ts (upload designs)
│   │
│   ├── intents/
│   │   ├── analyze-all.ts (analyze for all biases)
│   │   ├── analyze-specific.ts (analyze for specific bias)
│   │   └── compare-designs.ts (compare A vs B)
│   │
│   └── utils/
│       ├── bias-registry.ts (central registry)
│       ├── search.ts (fuzzy search)
│       └── filters.ts (filter by category, tags)
│
└── test/
    ├── bias-playground.html (interactive demo)
    ├── bias-library.html (browse all biases)
    └── design-analyzer.html (upload & analyze)
```

---

## 🏗️ Build Process per Bias

### Template Checklist (Every bias MUST have ALL of these):

- [ ] **Metadata**
  - [ ] ID (kebab-case)
  - [ ] Name
  - [ ] Aliases (2-4)
  - [ ] Primary category
  - [ ] Related categories (1-3)
  - [ ] Tags (5-10)

- [ ] **Definition**
  - [ ] Simple (< 100 chars)
  - [ ] Detailed (2-3 paragraphs)
  - [ ] Psychology basis (discoverer, year, theory, mechanism)
  - [ ] Real-world example (non-design)

- [ ] **Design Impact**
  - [ ] Description
  - [ ] When to use (3-6 use cases with examples)
  - [ ] When to avoid (2-4 avoid cases)
  - [ ] Common mistakes (3-5)
  - [ ] Impact areas (6 areas: layout, typography, color, interaction, content, accessibility)

- [ ] **Examples**
  - [ ] Good examples (3-5 with code)
  - [ ] Bad examples (2-3 with code)
  - [ ] Real-world examples (3-5 actual products)
  - [ ] A/B test examples (1-2 with metrics)

- [ ] **Detection**
  - [ ] Visual cues (3-5)
  - [ ] Patterns (3-5)
  - [ ] Checklist questions (8-12)

- [ ] **AI Intent**
  - [ ] System prompt (comprehensive)
  - [ ] Output schema (structured JSON)

- [ ] **Guidelines**
  - [ ] Implementation steps (4-6)
  - [ ] Do's (8-12)
  - [ ] Don'ts (8-12)
  - [ ] Best practices (3-6)
  - [ ] Accessibility guidelines (3-5 WCAG)
  - [ ] Ethical considerations (3-5)

- [ ] **Resources**
  - [ ] Papers (2-5)
  - [ ] Books (2-4)
  - [ ] Articles (2-4)
  - [ ] Videos (1-3)
  - [ ] Demos (1-2)

- [ ] **Relationships**
  - [ ] Complements (3-6 bias IDs)
  - [ ] Conflicts (1-3 bias IDs)
  - [ ] Confused with (2-4 bias IDs)
  - [ ] Hierarchy (parent/children)

---

## 🎨 Component Requirements

### 1. Bias Card Component (`<bias-card>`)
Visual display of a single bias

**Props:**
- `biasId: string` - Which bias to display
- `mode: 'compact' | 'full'` - Display mode
- `sections: string[]` - Which sections to show

**Features:**
- Expandable sections
- Code examples with syntax highlighting
- Real-world examples carousel
- Resources with links
- Related biases navigation

### 2. Bias Library (`<bias-library>`)
Browse all biases

**Features:**
- Grid/list view toggle
- Filter by category, tags
- Sort by name, impact, popularity
- Search (fuzzy)
- Category navigation
- Tag cloud

### 3. Bias Analyzer (`<bias-analyzer>`)
Analyze designs for biases

**Input:**
- Screenshot upload
- URL input
- HTML/CSS input
- Design description

**Output:**
- Detected biases with confidence scores
- Visual highlights on design
- Recommendations
- Priority matrix
- Export report

### 4. Design Scanner (`<design-scanner>`)
Upload and scan interface

**Features:**
- Drag & drop upload
- URL fetcher
- Screenshot capture
- Multiple design comparison
- History of analyzed designs

---

## 📈 Progress Tracking

### Phase 1: Foundation (5/5) ✅
- [x] Type system (types.ts)
- [x] Package setup
- [x] Anchoring Bias
- [x] Loss Aversion
- [x] Social Proof
- [x] Von Restorff Effect
- [x] Framing Effect
- [x] Bias Card Component
- [x] Bias Library Component

### Phase 2: High-Impact (20/20) ✅

### Phase 3: Medium-Impact (50/50) ✅

### Phase 4: Remaining (105/105) ✅

---

## 🚀 Automation & Efficiency

### Templates
- Bias card template with placeholders
- Code example template
- A/B test template
- Resource citation template

### Batch Processing
- Group similar biases (e.g., all memory biases)
- Reuse examples where appropriate
- Share research citations across related biases

### Quality Checks
- Automated validation of required fields
- Spell check
- Citation verification
- Code example testing

---

## 🎯 Success Metrics

### Completeness
- [ ] All 180 biases documented
- [ ] Every bias has all required fields
- [ ] All code examples tested
- [ ] All resources verified

### Quality
- [ ] Each bias > 1000 lines of content
- [ ] 3+ real-world examples per bias
- [ ] 2+ code examples per bias
- [ ] Scientific citations for all claims

### Usability
- [ ] All components functional
- [ ] Search works effectively
- [ ] Analyzer provides useful insights
- [ ] Documentation is comprehensive

---

## 📝 Next Steps (Immediate)

1. ✅ Create this master plan
2. ⏳ Build Loss Aversion bias (exemplar 2)
3. ⏳ Build Social Proof bias (exemplar 3)
4. ⏳ Build Von Restorff Effect bias (exemplar 4)
5. ⏳ Build Framing Effect bias (exemplar 5)
6. ⏳ Create Bias Card component
7. ⏳ Create simple analyzer
8. ⏳ Build Phase 1 playground
9. ⏳ Review & refine before Phase 2

---

## 📚 Research Sources (Reusable)

### Foundational Books
- "Thinking, Fast and Slow" - Kahneman
- "Predictably Irrational" - Ariely
- "Influence" - Cialdini
- "The Art of Thinking Clearly" - Dobelli

### Key Papers
- Tversky & Kahneman (1974) - Heuristics & Biases
- Kahneman & Tversky (1979) - Prospect Theory
- Cialdini et al. (various) - Persuasion research

### Design Resources
- Nielsen Norman Group articles
- Interaction Design Foundation
- Baymard Institute research
- UX Collective articles

---

**Last Updated**: 2026-02-28
**Current Phase**: All phases complete
**Overall Progress**: 180/180 biases (100%)
