/**
 * Atlas Data Bridge
 *
 * Connects the AI Interaction Atlas taxonomy to Cognivo's component
 * library and cognitive bias system. Provides a unified query interface
 * for understanding which components implement which AI interaction
 * patterns and which cognitive biases are relevant.
 *
 * @module @cognivo/design-advisor/atlas
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type {
  AtlasDimension,
  AtlasLayer,
  ImplementationStatus,
  AtlasPatternCard,
  AtlasQuery,
  AtlasBridgeStats,
} from './types.js';

export { LAYER_ID_MAP } from './types.js';

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export {
  AtlasRegistry,
  atlasRegistry,
  getAllPatterns,
  queryPatterns,
  getPatternsForComponent,
  getComponentsForPattern,
  getBiasesForPattern,
  getAtlasBridgeStats,
} from './atlas-registry.js';

// ---------------------------------------------------------------------------
// Pattern Data
// ---------------------------------------------------------------------------

export {
  ALL_ATLAS_PATTERNS,
  AI_PATTERN_CARDS,
  HUMAN_PATTERN_CARDS,
  SYSTEM_PATTERN_CARDS,
} from './patterns.js';

// ---------------------------------------------------------------------------
// Mappings
// ---------------------------------------------------------------------------

export { COMPONENT_PATTERN_MAP } from './mappings/component-pattern-map.js';
export { BIAS_PATTERN_MAP } from './mappings/bias-pattern-map.js';

// ---------------------------------------------------------------------------
// Workflow Audit Engine
// ---------------------------------------------------------------------------

export {
  auditWorkflow,
} from './workflow-audit.js';

export type {
  WorkflowAuditInput,
  BiasRisk,
  AtlasGap,
  WorkflowAuditResult,
} from './workflow-audit.js';

// ---------------------------------------------------------------------------
// Recommendation Engine
// ---------------------------------------------------------------------------

export {
  recommendComponents,
} from './recommend.js';

export type {
  ComponentRecommendation,
} from './recommend.js';
