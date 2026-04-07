/**
 * Atlas Data Bridge — Type Definitions
 *
 * Bridges the AI Interaction Atlas taxonomy with Cognivo's
 * component library and cognitive bias system.
 *
 * @module @cognivo/design-advisor/atlas/types
 */

// Re-export upstream types we depend on
export type {
  AiTask,
  HumanTask,
  SystemTask,
  DataArtifactDefinition,
  ConstraintDefinition,
  TouchpointDefinition,
  Layer,
  UxNotes,
  ImplementationNotes,
} from '@quietloudlab/ai-interaction-atlas';

// ---------------------------------------------------------------------------
// Cognivo Atlas Bridge Types
// ---------------------------------------------------------------------------

/** The six Atlas dimensions (task families + supporting dimensions). */
export type AtlasDimension =
  | 'ai_tasks'
  | 'human_tasks'
  | 'system_tasks'
  | 'data_artifacts'
  | 'constraints'
  | 'touchpoints';

/** The four Atlas processing layers. */
export type AtlasLayer = 'inbound' | 'internal' | 'outbound' | 'interactive';

/** Maps an Atlas layer name to its upstream ID. */
export const LAYER_ID_MAP: Record<AtlasLayer, string> = {
  inbound: 'layer_inbound',
  internal: 'layer_internal',
  outbound: 'layer_outbound',
  interactive: 'layer_interactive',
} as const;

/** Implementation coverage status within Cognivo. */
export type ImplementationStatus =
  | 'implemented'
  | 'partial'
  | 'planned'
  | 'not-applicable';

/**
 * A Cognivo-enriched view of an Atlas pattern.
 *
 * Wraps the upstream pattern data with Cognivo-specific metadata:
 * which components implement the pattern, which cognitive biases
 * are relevant, and the current implementation status.
 */
export interface AtlasPatternCard {
  /** Upstream Atlas task/artifact/constraint/touchpoint ID. */
  id: string;
  /** Human-readable name. */
  name: string;
  /** Which Atlas dimension this belongs to. */
  dimension: AtlasDimension;
  /** Which processing layer (only for tasks). */
  layer: AtlasLayer;
  /** One-sentence description of what this pattern does. */
  elevatorPitch: string;
  /** UX guidance from the Atlas. */
  uxNotes?: {
    risk?: string | undefined;
    tip?: string | undefined;
    antiPatterns?: string[] | undefined;
  } | undefined;
  /** Implementation maturity and oversight requirements. */
  implementationNotes?: {
    maturity?: string | undefined;
    humanOversight?: string | undefined;
  } | undefined;
  /** Cognivo component tags that implement or support this pattern. */
  cognivoComponents: string[];
  /** Bias IDs from the design-advisor bias library related to this pattern. */
  relatedBiases: string[];
  /** Current implementation status in Cognivo. */
  status: ImplementationStatus;
}

/**
 * Query filters for searching the Atlas registry.
 */
export interface AtlasQuery {
  /** Filter by dimension(s). */
  dimensions?: AtlasDimension[];
  /** Filter by processing layer(s). */
  layers?: AtlasLayer[];
  /** Filter by implementation status(es). */
  status?: ImplementationStatus[];
  /** Free-text search across name, elevator pitch, and UX notes. */
  searchTerm?: string;
  /** Maximum number of results to return. */
  limit?: number;
}

/**
 * Summary statistics for the Atlas bridge.
 */
export interface AtlasBridgeStats {
  totalPatterns: number;
  byDimension: Record<AtlasDimension, number>;
  byLayer: Record<AtlasLayer, number>;
  byStatus: Record<ImplementationStatus, number>;
  totalComponentMappings: number;
  totalBiasMappings: number;
}
