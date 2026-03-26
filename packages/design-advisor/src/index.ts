/**
 * @cognivo/design-advisor
 *
 * Cognitive psychology-based design analysis and advisory system.
 * Provides a comprehensive library of cognitive biases with AI-powered
 * analysis capabilities for improving design decisions.
 *
 * @module @cognivo/design-advisor
 * @version 0.0.1
 */

// ============================================================================
// BIAS LIBRARY
// ============================================================================

export {
  // Phase 1 Biases
  anchoringBias,
  lossAversion,
  socialProof,
  vonRestorffEffect,
  framingEffect,

  // Registry
  biasRegistry,
  allBiases,
  getBiasById,
  getBiasesByCategory,
  getBiasesByTag,
  searchBiases,
  getBiasStatistics,
} from './biases/index.js';

// ============================================================================
// ADVANCED REGISTRY
// ============================================================================

export {
  BiasRegistry,
  registry,
  getAllBiases,
  queryBiases,
  recommendBiases,
  getStatistics,
} from './utils/bias-registry.js';

export type {
  BiasQuery,
  BiasAnalysisContext,
  BiasRecommendation,
} from './utils/bias-registry.js';

// ============================================================================
// LAZY REGISTRY
// ============================================================================

export { LazyBiasRegistry } from './utils/lazy-bias-registry.js';

// ============================================================================
// TYPES
// ============================================================================

export type {
  BiasCard,
  Intent,
  UseCase,
  AvoidCase,
  Mistake,
  ImpactAssessment,
  DesignExample,
  RealWorldExample,
  ABTestExample,
  TestMetrics,
  VisualCue,
  DetectionPattern,
  ImplementationStep,
  BestPractice,
  AccessibilityGuideline,
  EthicalConsideration,
  Resource,
  BiasAnalysisInput,
  BiasAnalysisOutput,
  BiasFind,
  Location,
  Recommendation,
} from './biases/core/types.js';

export { BiasCategory, ImpactLevel } from './biases/core/types.js';

// ============================================================================
// COMPONENTS
// ============================================================================

export { BiasCardElement, BiasLibraryElement } from './components/index.js';

// ============================================================================
// VERSION
// ============================================================================

export const VERSION = '0.0.1';

export const LIBRARY_INFO = {
  name: '@cognivo/design-advisor',
  version: VERSION,
  description: 'Cognitive psychology-based design analysis and advisory system',
  phase: 1,
  biasesComplete: 180,
  biasesPlanned: 180,
  status: 'phase-1-complete',
} as const;
