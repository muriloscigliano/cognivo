# Cognitive Bias Library

A comprehensive library of **180 cognitive biases** for AI-powered design analysis and decision support.

## 📚 Overview

This library provides detailed information about cognitive biases to help designers, developers, and AI systems understand how psychological patterns affect user experience and product design.

### Library Stats
- **Total Biases**: 180
- **Categories**: 7 (Cognitive, Social, Memory, Decision-Making, Attribution, Emotional, Perception)
- **Coverage**: From foundational biases to advanced psychological patterns
- **Quality**: Each bias includes psychology research, design examples, and implementation guidelines

## 🚀 Quick Start

```typescript
import {
  allBiases,
  getBiasById,
  getBiasesByCategory,
  searchBiases,
  BiasCategory
} from '@cognivo/design-advisor/biases';

// Get all biases
console.log(`Total biases: ${allBiases.length}`);

// Get a specific bias
const anchoringBias = getBiasById('anchoring-bias');
console.log(anchoringBias.definition.simple);

// Get biases by category
const cognitivebiases = getBiasesByCategory(BiasCategory.COGNITIVE);
console.log(`Cognitive biases: ${cognitivebiases.length}`);

// Search biases
const memoryBiases = searchBiases('memory');
console.log(`Found ${memoryBiases.length} memory-related biases`);
```

## 📖 Core API

### Get Biases

```typescript
// Get all biases
import { allBiases } from '@cognivo/design-advisor/biases';

// Get by ID
import { getBiasById } from '@cognivo/design-advisor/biases';
const bias = getBiasById('confirmation-bias');

// Get by category
import { getBiasesByCategory, BiasCategory } from '@cognivo/design-advisor/biases';
const socialBiases = getBiasesByCategory(BiasCategory.SOCIAL);

// Get by tag
import { getBiasesByTag } from '@cognivo/design-advisor/biases';
const ecommerceBiases = getBiasesByTag('ecommerce');

// Search by name or alias
import { searchBiases } from '@cognivo/design-advisor/biases';
const results = searchBiases('anchor');
```

### Bias Registry

```typescript
import { biasRegistry } from '@cognivo/design-advisor/biases';

// Access any bias by ID
const bias = biasRegistry['anchoring-bias'];

// Get all bias IDs
const allIds = Object.keys(biasRegistry);
```

## 🔧 Utility Functions

### Finding Related Biases

```typescript
import {
  getRelatedBiases,
  getComplementaryBiases,
  getConflictingBiases,
  getConfusedWithBiases
} from '@cognivo/design-advisor/biases';

// Get all related biases
const related = getRelatedBiases('anchoring-bias');

// Get complementary biases (work well together)
const complements = getComplementaryBiases('anchoring-bias');

// Get conflicting biases
const conflicts = getConflictingBiases('anchoring-bias');

// Get commonly confused biases
const confused = getConfusedWithBiases('anchoring-bias');
```

### Advanced Search

```typescript
import {
  searchBiasesByKeyword,
  getBiasesForUseCase,
  getBiasesToAvoid,
  getBiasesForContext
} from '@cognivo/design-advisor/biases';

// Search in all content
const results = searchBiasesByKeyword('decision');

// Find biases for specific use cases
const checkoutBiases = getBiasesForUseCase('checkout');

// Find biases to avoid
const avoidInHealth = getBiasesToAvoid('health');

// Context-based search
const contextBiases = getBiasesForContext({
  categories: [BiasCategory.DECISION_MAKING],
  tags: ['ecommerce', 'pricing'],
  keywords: ['purchase'],
  avoidKeywords: ['social']
});
```

### Filtering & Grouping

```typescript
import {
  getBiasesByCategories,
  getBiasesByTags,
  getBiasesByAllTags,
  groupBiasesByCategory
} from '@cognivo/design-advisor/biases';

// Multiple categories (OR logic)
const biases = getBiasesByCategories([
  BiasCategory.COGNITIVE,
  BiasCategory.DECISION_MAKING
]);

// Multiple tags (OR logic)
const tagged = getBiasesByTags(['ecommerce', 'pricing']);

// Multiple tags (AND logic - must have all)
const allTagged = getBiasesByAllTags(['ecommerce', 'pricing']);

// Group all biases by category
const grouped = groupBiasesByCategory();
console.log(grouped[BiasCategory.COGNITIVE].length);
```

### Learning & Discovery

```typescript
import {
  getRandomBiases,
  createLearningPath,
  getBiasesByResearcher,
  getBiasesByDecade
} from '@cognivo/design-advisor/biases';

// Get random biases for learning
const random = getRandomBiases(5);

// Create a learning path
const path = createLearningPath('anchoring-bias', 3);

// Find biases by researcher
const kahneman = getBiasesByResearcher('Kahneman');

// Find biases by decade
const seventies = getBiasesByDecade(1970);
```

### Relationships

```typescript
import {
  areBiasesRelated,
  getRelationshipType
} from '@cognivo/design-advisor/biases';

// Check if biases are related
const related = areBiasesRelated('anchoring-bias', 'framing-effect');

// Get relationship type
const type = getRelationshipType('anchoring-bias', 'framing-effect');
// Returns: 'complements' | 'conflicts' | 'confusedWith' | 'none'
```

### Statistics

```typescript
import {
  getBiasStatistics,
  getBiasLibraryStats
} from '@cognivo/design-advisor/biases';

// Basic stats
const stats = getBiasStatistics();
console.log(stats.percentComplete); // "100%"

// Detailed stats
const detailed = getBiasLibraryStats();
console.log(detailed.total); // 180
console.log(detailed.byCategory);
console.log(detailed.byDecade);
console.log(detailed.uniqueTags);
```

## 📊 Bias Structure

Each bias in the library contains:

### Metadata
```typescript
{
  id: string;
  name: string;
  aliases: string[];
  category: BiasCategory;
  relatedCategories: BiasCategory[];
  tags: string[];
}
```

### Definition
```typescript
{
  simple: string;           // One-sentence description
  detailed: string;         // 2-3 paragraph explanation
  psychologyBasis: {
    discoveredBy: string;   // Researcher(s)
    year: number;           // Year discovered
    theory: string;         // Underlying theory
    mechanism: string;      // How it works
  };
  realWorldExample: string; // Non-design example
}
```

### Design Impact
```typescript
{
  description: string;
  whenToUse: UseCase[];      // When to leverage
  whenToAvoid: AvoidCase[];  // When to avoid
  commonMistakes: Mistake[]; // Common errors
  impactAreas: {             // Where it affects design
    userResearch: string;
    interfaceDesign: string;
    contentStrategy: string;
    productDecisions: string;
  };
}
```

### Examples
```typescript
{
  good: DesignExample[];     // ✅ Good examples
  bad: DesignExample[];      // ❌ Bad examples
  realWorld: RealWorldExample[]; // 🌍 Real products
  abTests: ABTestExample[];  // 🧪 A/B tests
}
```

### Detection (for AI)
```typescript
{
  visualCues: VisualCue[];   // What to look for
  patterns: DetectionPattern[]; // Common patterns
  checklistQuestions: string[]; // Questions to ask
}
```

### Guidelines
```typescript
{
  implementation: ImplementationStep[]; // How to implement
  dos: string[];             // Do's
  donts: string[];           // Don'ts
  bestPractices: BestPractice[];
  accessibility: AccessibilityGuideline[];
  ethics: EthicalConsideration[];
}
```

### Relationships
```typescript
{
  complements: string[];     // Work well together
  conflicts: string[];       // Conflict with each other
  confusedWith: string[];    // Often confused
  hierarchy: {
    parent?: string;
    children: string[];
  };
}
```

## 🎯 Categories

### BiasCategory Enum

```typescript
export enum BiasCategory {
  PERCEPTION = 'perception',
  DECISION_MAKING = 'decision-making',
  MEMORY = 'memory',
  SOCIAL = 'social',
  ATTRIBUTION = 'attribution',
  EMOTIONAL = 'emotional',
  COGNITIVE = 'cognitive',
}
```

### Breakdown by Category

- **Cognitive**: ~60 biases - Mental shortcuts, reasoning patterns
- **Social**: ~40 biases - Group dynamics, interpersonal influence
- **Memory**: ~35 biases - Information encoding, storage, retrieval
- **Decision-Making**: ~35 biases - Choice evaluation, commitment
- **Attribution**: ~5 biases - Explaining behavior and causation
- **Emotional**: ~3 biases - Emotional influence on cognition
- **Perception**: ~2 biases - Sensory processing, attention

## 💡 Common Use Cases

### For Design Analysis

```typescript
import { getBiasesForContext, BiasCategory } from '@cognivo/design-advisor/biases';

// Analyze a checkout flow
const checkoutBiases = getBiasesForContext({
  categories: [BiasCategory.DECISION_MAKING],
  tags: ['ecommerce', 'conversion'],
  keywords: ['purchase', 'commit']
});

// Check each bias's design impact
checkoutBiases.forEach(bias => {
  console.log(`${bias.metadata.name}:`);
  console.log(`- When to use: ${bias.designImpact.whenToUse.length} cases`);
  console.log(`- Mistakes: ${bias.designImpact.commonMistakes.length}`);
});
```

### For Learning & Research

```typescript
import { createLearningPath, getBiasesByResearcher } from '@cognivo/design-advisor/biases';

// Create a learning curriculum
const startBias = 'anchoring-bias';
const curriculum = createLearningPath(startBias, 5);

curriculum.forEach((bias, index) => {
  console.log(`${index + 1}. ${bias.metadata.name}`);
  console.log(`   ${bias.definition.simple}`);
});

// Study biases by researcher
const kahnemanBiases = getBiasesByResearcher('Kahneman');
console.log(`Kahneman contributed ${kahnemanBiases.length} biases`);
```

### For AI-Powered Analysis

```typescript
import { allBiases } from '@cognivo/design-advisor/biases';

// Prepare biases for AI analysis
const biasesForAI = allBiases.map(bias => ({
  id: bias.metadata.id,
  name: bias.metadata.name,
  description: bias.definition.simple,
  category: bias.metadata.category,
  visualCues: bias.detection.visualCues,
  patterns: bias.detection.patterns,
  checklistQuestions: bias.detection.checklistQuestions
}));

// Use in AI prompt
const prompt = `Analyze this design for these biases:\n${
  biasesForAI.slice(0, 10).map(b =>
    `- ${b.name}: ${b.description}`
  ).join('\n')
}`;
```

## 🔬 Research Integration

### Access Research Data

```typescript
import { getBiasById } from '@cognivo/design-advisor/biases';

const bias = getBiasById('confirmation-bias');

// Psychology research
const research = bias.definition.psychologyBasis;
console.log(`Discovered by: ${research.discoveredBy}`);
console.log(`Year: ${research.year}`);
console.log(`Theory: ${research.theory}`);
console.log(`Mechanism: ${research.mechanism}`);

// Real-world examples
console.log(`Example: ${bias.definition.realWorldExample}`);

// Research resources
bias.resources.research.forEach(resource => {
  console.log(`📚 ${resource.title} (${resource.year})`);
  console.log(`   ${resource.url}`);
});
```

## 🎨 Design Guidelines

### Get Implementation Steps

```typescript
import { getBiasById } from '@cognivo/design-advisor/biases';

const bias = getBiasById('anchoring-bias');

// Implementation guide
bias.guidelines.implementation.forEach((step, index) => {
  console.log(`${index + 1}. ${step.title}`);
  console.log(`   ${step.description}`);
  step.codeExample && console.log(`   Code: ${step.codeExample}`);
});

// Do's and Don'ts
console.log('\n✅ DO:');
bias.guidelines.dos.forEach(d => console.log(`  - ${d}`));

console.log('\n❌ DON\'T:');
bias.guidelines.donts.forEach(d => console.log(`  - ${d}`));
```

### Check Ethical Considerations

```typescript
import { getBiasById } from '@cognivo/design-advisor/biases';

const bias = getBiasById('scarcity-bias');

// Ethical guidelines
bias.guidelines.ethics.forEach(ethic => {
  console.log(`⚠️  ${ethic.principle}`);
  console.log(`   Concern: ${ethic.concern}`);
  console.log(`   Guideline: ${ethic.guideline}`);
});
```

## 📈 Performance

- **Bundle Size**: ~7 MB raw, ~1.8 MB gzipped
- **Tree-shakeable**: Import only what you need
- **Type-safe**: Full TypeScript support
- **Zero dependencies**: Pure TypeScript implementation

## 🤝 Contributing

The bias library is part of the Cognivo design advisor system. Each bias follows a strict schema defined in `core/types.ts`.

### Adding a New Bias

1. Create directory: `src/biases/[bias-id]/`
2. Create `index.ts` following the BiasCard interface
3. Add to exports in `src/biases/index.ts`
4. Update documentation

### Enriching Existing Biases

1. Find the bias file: `src/biases/[bias-id]/index.ts`
2. Add real-world examples, A/B tests, or design examples
3. Improve psychology research citations
4. Add detection patterns for AI analysis

## 📚 References

This library synthesizes research from:
- Kahneman, Tversky (Judgment under Uncertainty, 1974)
- Cialdini (Influence, 2006)
- Ariely (Predictably Irrational, 2008)
- Thaler, Sunstein (Nudge, 2008)
- And 100+ additional psychology papers

## 📝 License

Part of the Cognivo project. See root LICENSE file.

## 🔗 Related Packages

- `@cognivo/design-advisor` - AI-powered design analysis using this library
- `@cognivo/core` - Core types and utilities
- `@cognivo/adapter-openai` - OpenAI integration

---

**Version**: 1.0.0
**Last Updated**: 2025
**Total Biases**: 180
**Status**: ✅ Complete
