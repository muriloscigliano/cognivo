# Cognivo Project Status
**Last Updated**: 2025-12-01
**Status**: Active Development - Phase 1 Complete

---

## 🎯 Project Overview

Cognivo is a cognitive AI framework with two main systems:

1. **Core AI Framework** (`@cognivo/core`) - Intent-based AI integration
2. **Design Advisor** (`@cognivo/design-advisor`) - Cognitive psychology for UX/UI analysis
3. **Component Library** (`@cognivo/components`) - Redesigned web components

---

## 📦 Package Status

### ✅ @cognivo/core (Complete)
**Location**: `/packages/core/`
**Status**: Built and functional
**Build Output**: `/packages/core/dist/`

**Features**:
- Intent-based AI system (`AiIntent` enum)
- Context builder for AI requests
- Base AI client interface
- OpenAI adapter with streaming support
- Result types (AiResult, AiDriver, AiAnomaly, etc.)

**Files**:
```
packages/core/
├── src/
│   ├── intents/types.ts
│   ├── context/builder.ts
│   ├── client/base.ts
│   ├── results/types.ts
│   └── index.ts
├── dist/
│   └── index.js (151.02 kB)
└── package.json
```

---

### ✅ @cognivo/components (Redesigned - Complete)
**Location**: `/packages/components/`
**Status**: Fully redesigned with new styling system
**Build Output**: `/packages/components/dist/`

#### Redesigned Components (42 files fixed)

**Major Components Redesigned**:
1. **ai-thinking.ts** - Animated thinking indicator
   - Features: Dot animation, fade-in/out, customizable colors
   - Props: `variant`, `size`, `label`, `animated`

2. **ai-badge.ts** - AI feature indicator badge
   - Features: Sparkle icon, multiple variants, sizes
   - Props: `variant`, `size`, `icon`, `label`

3. **ai-chat.ts** - Complete chat interface
   - Features: Message history, streaming, thinking states
   - Props: `messages`, `placeholder`, `disabled`, `streaming`

**Styling System**:
- ✅ Fixed all CSS template literals (42 files)
- ✅ Removed CSS template string decorators
- ✅ Added proper Lit 3.x `static styles = css` pattern
- ✅ All TypeScript errors resolved
- ✅ Build passes successfully

**Components by Category**:

*Navigation (5)*:
- breadcrumbs.ts, horizontal-menu.ts, pagination.ts, tabs.ts, vertical-menu.ts

*Data Display (8)*:
- avatar.ts, badge.ts, chip.ts, kbd.ts, progress-circle.ts, progress-linear.ts, stats.ts, tooltip.ts

*Forms (8)*:
- button.ts, checkbox.ts, input.ts, radio.ts, select.ts, slider.ts, switch.ts, textarea.ts

*Feedback (5)*:
- alert.ts, loading.ts, skeleton.ts, spinner.ts, toast.ts

*Layout (4)*:
- card.ts, divider.ts, drawer.ts, modal.ts

*AI-Specific (3)*:
- ai-badge.ts, ai-chat.ts, ai-thinking.ts

*Other (9)*:
- accordion.ts, code.ts, container.ts, dropdown.ts, icon.ts, list.ts, stepper.ts, table.ts, theme-provider.ts

**Test Pages**:
```
/tests/
├── ai-thinking.html (Working ✅)
├── ai-badge.html (Working ✅)
└── ai-chat.html (Working ✅)
```

**Build Status**: ✅ All builds passing
```bash
cd packages/components && pnpm build
# Output: dist/index.js (142.13 kB, gzip: 35.86 kB)
```

---

### ✅ @cognivo/design-advisor (NEW - Phase 1 Complete)
**Location**: `/packages/design-advisor/`
**Status**: Phase 1 Foundation Complete (5/180 biases)
**Build Output**: `/packages/design-advisor/dist/`

#### 🧠 Cognitive Bias Library - Phase 1

**5 Exemplar Biases Complete**:

1. **Anchoring Bias** (1,200+ lines)
   - Category: Perception
   - Impact: Critical
   - Focus: First impressions, pricing, reference points
   - File: `src/biases/anchoring-bias/index.ts`

2. **Loss Aversion** (800+ lines)
   - Category: Decision-Making
   - Impact: Critical
   - Focus: Fear of losing vs. desire to gain
   - File: `src/biases/loss-aversion/index.ts`

3. **Social Proof** (800+ lines)
   - Category: Social
   - Impact: Critical
   - Focus: Following others' actions, testimonials, reviews
   - File: `src/biases/social-proof/index.ts`

4. **Von Restorff Effect** (700+ lines)
   - Category: Perception
   - Impact: Critical
   - Focus: Distinctive items stand out (isolation effect)
   - File: `src/biases/von-restorff-effect/index.ts`

5. **Framing Effect** (700+ lines)
   - Category: Decision-Making
   - Impact: Critical
   - Focus: How presentation affects decisions
   - File: `src/biases/framing-effect/index.ts`

#### 📋 Bias Card Structure (11 Sections)

Each bias implements the complete `BiasCard` interface:

```typescript
interface BiasCard {
  metadata: {
    id, name, aliases, category, relatedCategories, tags
  };

  definition: {
    simple, detailed, psychologyBasis, realWorldExample
  };

  designImpact: {
    description, whenToUse, whenToAvoid, commonMistakes,
    impactAreas: {
      layout, typography, color, interaction, content, accessibility
    }
  };

  examples: {
    good, bad, realWorld, abTests
  };

  detection: {
    visualCues, patterns, checklistQuestions
  };

  intent: Intent<BiasAnalysisInput, BiasAnalysisOutput>;

  guidelines: {
    implementation, dos, donts, bestPractices,
    accessibility, ethics
  };

  resources: {
    papers, books, articles, videos, demos
  };

  relationships: {
    complements, conflicts, confusedWith, hierarchy
  };
}
```

#### 🔧 Infrastructure Complete

**Type System**:
- `src/biases/core/types.ts` - Complete type definitions
- Enums: `BiasCategory`, `ImpactLevel`
- Supporting types: 30+ interfaces for comprehensive bias documentation

**Bias Registry**:
- `src/utils/bias-registry.ts` - Advanced querying system
- Features:
  - Filter by category, tags, impact level
  - Search by name, alias, description
  - Recommendation engine based on design context
  - Statistics and metadata
- Functions:
  - `getAllBiases()`, `getBiasById(id)`
  - `queryBiases(filters)`, `recommendBiases(context)`
  - `getStatistics()`

**Web Components** (Lit 3.x):
1. **`<bias-card>`** - Display individual bias
   - Features: Expandable sections, compact mode, color-coded
   - Props: `bias`, `compact`
   - File: `src/components/bias-card.ts`

2. **`<bias-library>`** - Browse all biases
   - Features: Search, filter, sort, multiple view modes
   - View modes: Grid, Compact, List
   - Filters: Category, impact level, search query
   - File: `src/components/bias-library.ts`

#### 📊 Statistics

- **Total Biases Implemented**: 5
- **Total Biases Planned**: 180
- **Completion**: 2.8% (Phase 1: 100%)
- **Categories Covered**: Perception (2), Decision-Making (2), Social (1)
- **Build Size**: 175.83 kB (46.29 kB gzipped)
- **TypeScript**: All declarations generated

#### 🧪 Test Page

**Location**: `/packages/design-advisor/test.html`
**URL**: `http://127.0.0.1:5173/packages/design-advisor/test.html`

**Features**:
- Full bias library browser
- Search and filter biases
- View detailed bias information
- See examples and detection patterns
- Statistics dashboard

#### 📁 File Structure

```
packages/design-advisor/
├── src/
│   ├── biases/
│   │   ├── core/
│   │   │   └── types.ts (Gold standard interface)
│   │   ├── anchoring-bias/
│   │   │   └── index.ts (Exemplar #1)
│   │   ├── loss-aversion/
│   │   │   └── index.ts (Exemplar #2)
│   │   ├── social-proof/
│   │   │   └── index.ts (Exemplar #3)
│   │   ├── von-restorff-effect/
│   │   │   └── index.ts (Exemplar #4)
│   │   ├── framing-effect/
│   │   │   └── index.ts (Exemplar #5)
│   │   └── index.ts (Exports + registry)
│   ├── utils/
│   │   └── bias-registry.ts (Advanced querying)
│   ├── components/
│   │   ├── bias-card.ts (Display component)
│   │   ├── bias-library.ts (Browse component)
│   │   └── index.ts
│   └── index.ts (Main package entry)
├── dist/ (Build output)
│   ├── index.js
│   ├── biases/
│   ├── utils/
│   └── components/
├── test.html (Interactive demo)
├── MASTER_PLAN.md (4-phase build strategy)
├── BIAS_INDEX.md (Catalog of all 180 biases)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

#### 📖 Planning Documents

**MASTER_PLAN.md**:
- Phase 1: Foundation (5 biases) ✅ COMPLETE
- Phase 2: High-Impact (20 biases) 🔜 NEXT
- Phase 3: Medium-Impact (50 biases) 📅 PLANNED
- Phase 4: Remaining (105 biases) 📅 PLANNED

**BIAS_INDEX.md**:
- Complete catalog of all 180 biases
- Organized by category, impact, alphabetically
- Build status tracking
- Quick navigation

#### 🎯 Export API

```typescript
// Import biases
import {
  anchoringBias,
  lossAversion,
  socialProof,
  vonRestorffEffect,
  framingEffect,
} from '@cognivo/design-advisor';

// Use registry
import { registry, queryBiases, recommendBiases } from '@cognivo/design-advisor';

// Get statistics
import { getStatistics } from '@cognivo/design-advisor';

// Use components
import '@cognivo/design-advisor/components';
// <bias-library></bias-library>
// <bias-card .bias=${anchoringBias}></bias-card>
```

---

## 🚀 Build Status

### All Packages Build Successfully ✅

```bash
# Core
cd packages/core && pnpm build
# ✅ dist/index.js (151.02 kB)

# Components
cd packages/components && pnpm build
# ✅ dist/index.js (142.13 kB)

# Design Advisor
cd packages/design-advisor && pnpm build
# ✅ dist/index.js (175.83 kB)
```

---

## 🌐 HTTP Server (Running)

**Process**: Background Bash 4a0ba2
**Command**: `npx -y http-server -p 5173 -c-1 --cors`
**Location**: `/Users/muriloscigliano/Cursor/cognivo-1`
**Status**: ✅ Running

### Available Test Pages

1. **AI Components**:
   - `http://127.0.0.1:5173/tests/ai-thinking.html`
   - `http://127.0.0.1:5173/tests/ai-badge.html`
   - `http://127.0.0.1:5173/tests/ai-chat.html`

2. **Design Advisor**:
   - `http://127.0.0.1:5173/packages/design-advisor/test.html`

3. **Core Adapters**:
   - `http://127.0.0.1:5173/packages/adapters/openai/test.html`

---

## 🔨 Recent Work Completed

### Session 1: Component Redesign (42 Files)
✅ Fixed CSS template literal syntax in all components
✅ Updated to Lit 3.x styling pattern
✅ Resolved all TypeScript build errors
✅ Built and tested AI components (thinking, badge, chat)
✅ All 42 components building successfully

### Session 2: Design Advisor System (NEW)
✅ Created package structure and configuration
✅ Designed comprehensive `BiasCard` type system
✅ Built 5 exemplar cognitive bias cards (4,200+ lines)
✅ Implemented bias registry with advanced querying
✅ Created 2 Lit components (bias-card, bias-library)
✅ Generated planning documents (MASTER_PLAN, BIAS_INDEX)
✅ Built and tested complete system
✅ Created interactive test page

---

## 📝 Git Status

**Branch**: `main`
**Modified Files**:
- `STYLING_AUDIT.md` (Modified)
- `.claude/` (Untracked - session files)

**Recent Commits**:
```
e1fda88 Fix tokens build paths and update simulation pages
0e17620 Merge pull request #4
e9a4490 fix: Resolve all remaining TypeScript build errors - build now passes! ✅
6abcedf Fix remaining TypeScript build errors
cb6a67c fix: Correct CSS template literal syntax in 42 component files
```

---

## 🎯 Next Steps & Remaining Work

### ⚠️ IMPORTANT: 175 Biases Remaining

**Completed**: 5 biases (2.8%)
**Remaining**: 175 biases (97.2%)
**Total Goal**: 180 biases

**📖 See NEXT_STEPS.md for complete details on all 175 remaining biases!**

### Immediate - Phase 2 (20 High-Impact Biases)

**START HERE when you resume work**

1. **Attentional Bias** - What grabs user attention
2. **Change Blindness** - Users miss unhighlighted changes
3. **Context Effect** - Surrounding items affect perception
4. **Priming** - Early exposure influences decisions
5. **Picture Superiority Effect** - Images > text for memory
6. **Processing Difficulty Effect** - Harder to read = less trusted
7. **Salience Bias** - Most noticeable = most important
8. **Selective Perception** - See what you expect
9. **Spacing Effect** - Spaced learning aids retention
10. **Illusory Truth Effect** - Repetition feels true
11. **Reciprocity Norm** - Give before you ask
12. **Authority Bias** - Trust experts
13. **In-Group Bias** - Favor your own group
14. **Conformity** - Following the crowd
15. **Commitment Bias** - Stick with initial choices
16. **Cognitive Dissonance** - Reduce conflicting beliefs
17. **Dunning–Kruger Effect** - Beginners overestimate skill
18. **False Consensus Effect** - Assume others agree
19. **Fundamental Attribution Error** - Blame people not circumstances
20. **Self-Serving Bias** - Credit success, blame others for failure

**Time Estimate**: ~30-40 hours (1-2 hours per bias)

### Short-term - Phase 3 (50 Medium-Impact Biases)

**After Phase 2 is complete**

Categories:
- 10 Perception biases (Forer Effect, Mere Exposure, Contrast Effect, etc.)
- 15 Decision-Making biases (Availability Heuristic, Bandwagon, Default Effect, etc.)
- 10 Memory biases (Google Effect, Misinformation Effect, etc.)
- 10 Social biases (Halo Effect, Groupthink, etc.)
- 5 Emotional biases (Affect Heuristic, Empathy Gap, etc.)

**Time Estimate**: ~75-100 hours
**Progress at completion**: 75/180 (41.7%)

### Long-term - Phase 4 (105 Remaining Biases)

**Complete the library**

Categories:
- 45 more Perception biases
- 30 more Decision-Making biases
- 10 more Memory biases
- 15 more Social & Attribution biases
- 10 more Emotional & Cognitive biases

**Time Estimate**: ~150-200 hours
**Final Progress**: 180/180 (100%) ✅

### Beyond Biases (After Phase 4)

1. **AI Integration**
   - Create AI agent using bias cards for analysis
   - Build screenshot upload and analysis
   - Real-time design feedback system

2. **Production Features**
   - Bias comparison tool
   - Relationship visualizer
   - Interactive playground

3. **Distribution**
   - Browser extension for live analysis
   - Figma/Sketch plugins
   - Publish to npm

---

## 📋 Complete Remaining Bias List (175)

**See `/packages/design-advisor/NEXT_STEPS.md` for full details**

### Phase 2: High-Impact (20 remaining)
- Attentional Bias, Change Blindness, Context Effect, Priming, Picture Superiority Effect, Processing Difficulty Effect, Salience Bias, Selective Perception, Spacing Effect, Illusory Truth Effect, Reciprocity Norm, Authority Bias, In-Group Bias, Conformity, Commitment Bias, Cognitive Dissonance, Dunning–Kruger Effect, False Consensus Effect, Fundamental Attribution Error, Self-Serving Bias

### Phase 3: Medium-Impact (50 remaining)
- Forer Effect, Mere Exposure Effect, Contrast Effect, Cross-Race Effect, Hindsight Bias, Primacy Effect, Recency Effect, Serial Position Effect, Negativity Bias, Peak-End Rule, Availability Heuristic, Bandwagon Effect, Default Effect, Decoy Effect, Endowment Effect, Hyperbolic Discounting, IKEA Effect, Optimism Bias, Planning Fallacy, Sunk Cost Fallacy, Status Quo Bias, Choice-Supportive Bias, Confirmation Bias, Illusion of Control, Overconfidence Effect, Google Effect, Misinformation Effect, Mood-Congruent Memory Bias, Next-In-Line Effect, Rosy Retrospection, Source Amnesia, Zeigarnik Effect, Duration Neglect, Flashbulb Memory, Testing Effect, Halo Effect, Groupthink, Just-World Hypothesis, Outgroup Homogeneity Bias, Prejudice, Stereotype, Backfire Effect, Group Polarization, Moral Credential Effect, Social Desirability Bias, Affect Heuristic, Empathy Gap, Impact Bias, Projection Bias, Wishful Thinking

### Phase 4: Remaining (105 biases)
- Attentional Blink, Blind Spot Bias, Boundary Extension, Capgras Delusion, Cheerleader Effect, Cocktail Party Effect, Cryptomnesia, Curse of Knowledge, Egocentric Bias, Extrinsic Incentive Bias, Fading Affect Bias, False Memory, Functional Fixedness, Hard-Easy Effect, Hostile Attribution Bias, Illusory Correlation, Information Bias, Introspection Illusion, Law of Triviality, Less-Is-Better Effect, Levels-of-Processing Effect, Mere Ownership Effect, Misattribution of Memory, Outcome Bias, Own-Race Bias, Pareidolia, Persistence of Memory, Post-Purchase Rationalization, Representativeness Heuristic, Selective Exposure, Self-Fulfilling Prophecy, Semmelweis Reflex, Social Comparison Bias, Subjective Validation, Suggestibility, Survivorship Bias, Telescoping Effect, Texas Sharpshooter Fallacy, Third-Person Effect, Tip-of-the-Tongue, Trait Ascription Bias, Weber–Fechner Law, Weapon Focus, Well-Traveled Road Effect, Ambiguity Effect, Base Rate Fallacy, Belief Bias, Ben Franklin Effect, Bias Blind Spot, Bizarreness Effect, Clustering Illusion, Common Knowledge Effect, Common Sense Fallacy, Compassion Fade, Compromise Effect, Conjunction Fallacy, Courtesy Bias, Decision Fatigue, Defensive Attribution Hypothesis, Denomination Effect, Disposition Effect, Essentialism, Exaggerated Expectation, False Dilemma, False Uniqueness Effect, Focusing Effect, Frequency Illusion, Gambler's Fallacy, Identifiable Victim Effect, Insensitivity to Sample Size, Irrational Escalation, Look-Ahead Bias, Money Illusion, Naïve Cynicism, Availability Cascade, Childhood Amnesia, Generation Effect, Leveling and Sharpening, Memory Inhibition, Picture Superiority Effect, Positivity Effect, Reminiscence Bump, Spacing Effect, Weapon Focus Effect, Actor–Observer Bias, Benevolent Sexism, Conformity, False Attribution, Group Attribution Error, Illusory Superiority, Moral Luck, Naïve Realism, Normalcy Bias, Not Invented Here, Observer-Expectancy Effect, Reactance, Social Identity Theory, Ultimate Attribution Error, System Justification, Emotional Contagion, Emotional Reasoning, Ostrich Effect, Pessimism Bias, Placebo Effect, Pro-Innovation Bias, Reference Dependence, Risk Compensation, Omission Bias, Zero-Risk Bias

---

## 📖 Essential Documents for Resuming Work

1. **QUICK_START.md** - Fast reference guide to resume work
2. **NEXT_STEPS.md** - Complete roadmap with all 175 remaining biases
3. **MASTER_PLAN.md** - 4-phase build strategy
4. **BIAS_INDEX.md** - Searchable catalog of all 180 biases
5. **PROJECT_STATUS.md** - This file (complete overview)

---

## 🔧 Development Commands

### Install Dependencies
```bash
# Root
pnpm install

# Specific package
cd packages/design-advisor && pnpm install
```

### Build
```bash
# All packages (from root)
pnpm build

# Single package
cd packages/design-advisor && pnpm build
```

### Development Server
```bash
# HTTP server (already running)
npx http-server -p 5173 -c-1 --cors

# Or from root
pnpm dev
```

### Type Checking
```bash
# All packages
pnpm type-check

# Single package
cd packages/components && pnpm type-check
```

---

## 📦 Package Dependencies

### @cognivo/core
- No external dependencies (framework-agnostic)

### @cognivo/components
- `lit@^3.1.0`
- `@cognivo/core@workspace:*`

### @cognivo/design-advisor
- `lit@^3.3.1`
- `@cognivo/core@workspace:*`

### Dev Dependencies (All Packages)
- `typescript@^5.9.3`
- `vite@^6.4.1`
- `vite-plugin-dts@^4.5.4`

---

## 🎨 Design System

### Component Styling Pattern (All Components)
```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  override render() {
    return html`<div>Content</div>`;
  }
}
```

### Bias Card Pattern (Design Advisor)
```typescript
import type { BiasCard } from '../biases/core/types.js';
import { BiasCategory, ImpactLevel } from '../biases/core/types.js';

export const myBias: BiasCard = {
  metadata: { /* ... */ },
  definition: { /* ... */ },
  designImpact: { /* ... */ },
  examples: { /* ... */ },
  detection: { /* ... */ },
  intent: { /* ... */ },
  guidelines: { /* ... */ },
  resources: { /* ... */ },
  relationships: { /* ... */ },
};
```

---

## 📊 Project Metrics

### Code Statistics
- **Total Packages**: 6
- **Component Files**: 42
- **Bias Cards**: 5 (of 180 planned)
- **Lines of Code**: ~15,000+
- **Build Size**: ~469 kB total (123 kB gzipped)

### Completion Status
- ✅ Core Framework: 100%
- ✅ Components Redesign: 100%
- ✅ Design Advisor Phase 1: 100%
- 🔄 Design Advisor Phase 2: 0%
- 📅 Design Advisor Phase 3: 0%
- 📅 Design Advisor Phase 4: 0%

**Overall Design Advisor Progress**: 2.8% (5/180 biases)

---

## 🐛 Known Issues

### None currently! ✅

All TypeScript errors resolved.
All builds passing.
All test pages working.

---

## 💡 Key Insights

### Component Architecture
- Lit 3.x requires `static override styles` for proper TypeScript compliance
- CSS template literals must use `css` tag, not template strings
- `override` modifier required for all overridden LitElement methods

### Bias Card Design
- Each bias needs 11 comprehensive sections
- AI Intent section is most critical for agent functionality
- Real-world examples and A/B tests provide best learning value
- Impact assessment across 6 design areas ensures complete coverage

### Registry Pattern
- Central registry enables powerful querying and recommendation
- Context-based recommendations help AI suggest relevant biases
- Statistics provide visibility into library completeness

---

## 🔗 Important Links

### Documentation
- Lit Documentation: https://lit.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs

### Project Files
- MASTER_PLAN: `/packages/design-advisor/MASTER_PLAN.md`
- BIAS_INDEX: `/packages/design-advisor/BIAS_INDEX.md`
- STYLING_AUDIT: `/STYLING_AUDIT.md`

### Test Pages
- Components: `/tests/*.html`
- Design Advisor: `/packages/design-advisor/test.html`

---

## 👤 Session Info

**User**: muriloscigliano
**Project**: Cognivo
**Location**: `/Users/muriloscigliano/Cursor/cognivo-1`
**Platform**: macOS (Darwin 25.0.0)
**Date**: 2025-12-01

---

## 🎉 Achievements This Session

1. ✅ Successfully redesigned all 42 components with Lit 3.x
2. ✅ Created comprehensive design advisor package from scratch
3. ✅ Built 5 complete exemplar bias cards (gold standard)
4. ✅ Implemented advanced bias registry system
5. ✅ Created 2 functional Lit components for bias visualization
6. ✅ Generated complete planning documents for 180-bias library
7. ✅ All builds passing, zero TypeScript errors
8. ✅ Interactive test pages working perfectly

**Total Work**: ~4,200+ lines of bias content, 42 component fixes, complete package infrastructure

---

## 🚦 Status: READY TO CONTINUE

All systems operational. Phase 1 complete.
Ready to proceed with Phase 2: 20 High-Impact Biases.

**Next Session**: Pick up from MASTER_PLAN.md Phase 2 or continue with other project work.
