# @cognivo/design-advisor

**Cognitive Psychology-Based Design Analysis System**

A comprehensive library of 180 cognitive biases for UX/UI design analysis, powered by AI.

---

## 🎯 Purpose

This package provides **cognitive bias cards** as a knowledge base for AI agents to analyze and improve design decisions. Each bias card teaches the AI how to detect, analyze, and provide recommendations for cognitive biases in user interfaces.

**This is NOT a design reference tool for humans** (though it can be used that way). It's primarily an **AI knowledge base** that enables intelligent design analysis.

---

## 📊 Status

- **Phase 1**: 5/5 biases ✅ COMPLETE
- **Phase 2**: 0/20 biases 🔜 NEXT
- **Overall**: 5/180 biases (2.8%)

---

## 🧠 Completed Biases (Phase 1)

### Critical Impact Biases

1. **Anchoring Bias** - First impressions and reference points
   - How initial information influences subsequent judgments
   - Example: First price shown becomes the reference point

2. **Loss Aversion** - Fear of losing vs. desire to gain
   - People fear losses 2x more than they value gains
   - Example: "Don't lose your progress" vs "Save your progress"

3. **Social Proof** - Following others' actions
   - People look to others' behavior to guide their own
   - Example: "23 people are viewing this" or "5,000+ reviews"

4. **Von Restorff Effect** - Distinctive items stand out
   - Items that stand out are remembered better (isolation effect)
   - Example: Bright CTA button among neutral elements

5. **Framing Effect** - How presentation affects decisions
   - Same information, different wording, different outcomes
   - Example: "90% success rate" vs "10% failure rate"

---

## 🏗️ Architecture

### Bias Card Structure

Each bias implements a comprehensive 11-section interface:

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
    impactAreas: { layout, typography, color, interaction, content, accessibility }
  };

  examples: {
    good, bad, realWorld, abTests
  };

  detection: {
    visualCues, patterns, checklistQuestions
  };

  intent: Intent<BiasAnalysisInput, BiasAnalysisOutput>; // 🔑 AI ANALYSIS

  guidelines: {
    implementation, dos, donts, bestPractices, accessibility, ethics
  };

  resources: {
    papers, books, articles, videos, demos
  };

  relationships: {
    complements, conflicts, confusedWith, hierarchy
  };
}
```

### AI Intent System

The **most important** part of each bias card is the `intent` section:

```typescript
intent: {
  systemPrompt: `You are an expert in cognitive psychology and UX design...

  Analyze the provided design for [bias name]. Identify:
  1. Pattern 1
  2. Pattern 2
  3. Pattern 3
  ...`,

  outputSchema: {
    detected: boolean,
    confidence: number,
    locations: [...],
    recommendations: [...]
  }
}
```

This teaches the AI **how to analyze** designs for this specific bias.

---

## 📦 Installation

```bash
# From workspace root
pnpm install

# Build
cd packages/design-advisor
pnpm build
```

---

## 🚀 Usage

### Import Biases

```typescript
import {
  anchoringBias,
  lossAversion,
  socialProof,
  vonRestorffEffect,
  framingEffect,
} from '@cognivo/design-advisor';

console.log(anchoringBias.definition.simple);
// "People rely heavily on the first piece of information..."
```

### Query Registry

```typescript
import { registry, queryBiases, recommendBiases } from '@cognivo/design-advisor';

// Get all biases
const all = registry.getAll();

// Search by term
const pricingBiases = queryBiases({
  searchTerm: 'price',
  limit: 5
});

// Filter by category
const perceptionBiases = queryBiases({
  categories: ['perception']
});

// Get recommendations for context
const recommendations = recommendBiases({
  designType: 'web',
  userGoals: ['conversion', 'engagement'],
  industry: 'ecommerce'
});
```

### Use Components

```html
<!DOCTYPE html>
<html>
<head>
  <title>Bias Library</title>
</head>
<body>
  <!-- Browse all biases -->
  <bias-library></bias-library>

  <!-- Display single bias -->
  <bias-card id="card"></bias-card>

  <script type="module">
    import '@cognivo/design-advisor/components';
    import { anchoringBias } from '@cognivo/design-advisor';

    document.getElementById('card').bias = anchoringBias;
  </script>
</body>
</html>
```

---

## 🧪 Test & Demo

```bash
# Start HTTP server
npx http-server -p 5173 -c-1 --cors

# Open demo
open http://127.0.0.1:5173/packages/design-advisor/test.html
```

**Demo Features**:
- Browse all biases
- Search and filter
- View detailed information
- See examples and detection patterns
- Multiple view modes (Grid, Compact, List)

---

## 📁 File Structure

```
packages/design-advisor/
├── src/
│   ├── biases/
│   │   ├── core/
│   │   │   └── types.ts           # Gold standard BiasCard interface
│   │   ├── anchoring-bias/
│   │   │   └── index.ts           # 1,200+ lines
│   │   ├── loss-aversion/
│   │   │   └── index.ts           # 800+ lines
│   │   ├── social-proof/
│   │   │   └── index.ts           # 800+ lines
│   │   ├── von-restorff-effect/
│   │   │   └── index.ts           # 700+ lines
│   │   ├── framing-effect/
│   │   │   └── index.ts           # 700+ lines
│   │   └── index.ts               # Exports + registry
│   ├── utils/
│   │   └── bias-registry.ts       # Advanced querying
│   ├── components/
│   │   ├── bias-card.ts           # Display component
│   │   ├── bias-library.ts        # Browse component
│   │   └── index.ts
│   └── index.ts                   # Main entry point
├── dist/                          # Build output
├── test.html                      # Interactive demo
├── MASTER_PLAN.md                 # 4-phase build strategy
├── BIAS_INDEX.md                  # Catalog of 180 biases
└── README.md                      # This file
```

---

## 🎯 Next Steps (Phase 2)

Build next 20 high-impact biases:

1. Attentional Bias
2. Change Blindness
3. Context Effect
4. Priming
5. Picture Superiority Effect
6. Processing Difficulty Effect
7. Salience Bias
8. Selective Perception
9. Spacing Effect
10. Illusory Truth Effect
11. Reciprocity Norm
12. Authority Bias
13. In-Group Bias
14. Conformity
15. Commitment Bias
16. Cognitive Dissonance
17. Dunning–Kruger Effect
18. False Consensus Effect
19. Fundamental Attribution Error
20. Self-Serving Bias

See `MASTER_PLAN.md` for complete roadmap.

---

## 📚 Resources

### Planning Documents
- **MASTER_PLAN.md** - Complete 4-phase build strategy
- **BIAS_INDEX.md** - Searchable catalog of all 180 biases

### Type System
- **src/biases/core/types.ts** - Complete TypeScript interfaces

### Components
- **src/components/bias-card.ts** - Interactive bias display
- **src/components/bias-library.ts** - Full library browser

---

## 🔧 API Reference

### Main Exports

```typescript
// Biases
export {
  anchoringBias,
  lossAversion,
  socialProof,
  vonRestorffEffect,
  framingEffect,
}

// Registry
export {
  BiasRegistry,
  registry,
  getAllBiases,
  getBiasById,
  queryBiases,
  recommendBiases,
  getStatistics,
}

// Types
export type {
  BiasCard,
  Intent,
  BiasAnalysisInput,
  BiasAnalysisOutput,
  // ... (30+ types)
}

export {
  BiasCategory,
  ImpactLevel,
}

// Components
export {
  BiasCardElement,
  BiasLibraryElement,
}

// Metadata
export const VERSION = '0.0.1';
export const LIBRARY_INFO = { ... };
```

### BiasCategory Enum

```typescript
enum BiasCategory {
  PERCEPTION = 'perception',
  DECISION_MAKING = 'decision-making',
  MEMORY = 'memory',
  SOCIAL = 'social',
  ATTRIBUTION = 'attribution',
  EMOTIONAL = 'emotional',
  COGNITIVE = 'cognitive',
}
```

### ImpactLevel Enum

```typescript
enum ImpactLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
```

---

## 🎨 Component Props

### `<bias-card>`

```typescript
interface BiasCardElement {
  bias?: BiasCard;      // The bias to display
  compact?: boolean;    // Compact view mode (default: false)
}
```

### `<bias-library>`

No props - fully self-contained with internal state management.

**Features**:
- Search by name, alias, tag
- Filter by category and impact level
- View modes: Grid, Compact, List
- Statistics dashboard

---

## 🧪 Testing

```bash
# Type check
pnpm type-check

# Build
pnpm build

# Verify build output
ls -lh dist/
```

---

## 📊 Statistics

```typescript
import { getStatistics } from '@cognivo/design-advisor';

const stats = getStatistics();
console.log(stats);
/*
{
  total: 5,
  byCategory: {
    perception: 2,
    'decision-making': 2,
    social: 1,
    // ...
  },
  byImpact: {
    critical: 30,
    high: 0,
    medium: 0,
    low: 0
  },
  totalTags: 47,
  tags: ['pricing', 'first-impression', ...],
  phase1Complete: 5,
  totalPlanned: 180,
  percentComplete: '2.8%'
}
*/
```

---

## 🤝 Contributing

When adding new biases:

1. Copy an existing bias as template (e.g., `anchoring-bias/index.ts`)
2. Follow the complete `BiasCard` interface - **NO SHORTCUTS**
3. Fill all 11 sections comprehensively
4. Add to `src/biases/index.ts` exports
5. Update `BIAS_INDEX.md` progress
6. Build and test

**Quality Standard**: Each bias should be 700-1200 lines with:
- Detailed definitions
- Real-world examples
- A/B test results
- Detection patterns
- AI intent configuration
- Implementation guidelines
- Academic resources

---

## 📄 License

Part of the Cognivo project.

---

## 🎉 Achievements

- ✅ Complete type system
- ✅ 5 exemplar bias cards (gold standard)
- ✅ Advanced registry system
- ✅ Interactive components
- ✅ Comprehensive planning docs
- ✅ All builds passing
- ✅ Zero TypeScript errors

**Phase 1: COMPLETE** 🎊

Next: Build 20 high-impact biases (Phase 2)
