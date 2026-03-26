/**
 * Pattern types for advanced AI client behaviors
 *
 * Self-Refine: generate → critique → refine loop
 * Extended Thinking: chain-of-thought reasoning before final output
 */

import type { AiIntent } from '../intents/types.js';
import type { AiResult } from '../results/types.js';

/**
 * Configuration for the Self-Refine pattern.
 *
 * Controls how many iterations to run and when to stop early.
 */
export interface SelfRefineConfig {
  /** Max generate→critique→refine iterations (default: 2) */
  maxIterations?: number;

  /** Stop refining when this returns true */
  stopWhen?: (result: AiResult, iteration: number) => boolean;

  /** System prompt override for the critique step */
  critiqueSystemPrompt?: string;

  /** System prompt override for the refine step */
  refineSystemPrompt?: string;
}

/**
 * A single step in the refinement trace.
 *
 * Records what happened at each phase of each iteration.
 */
export interface RefinementStep {
  /** Which iteration this step belongs to (1-based) */
  iteration: number;

  /** Phase within the iteration */
  phase: 'generate' | 'critique' | 'refine';

  /** The AiResult produced at this step */
  result: AiResult;
}

/**
 * Full trace of the refinement process.
 *
 * Attached to the final result's metadata as `refinementTrace`.
 */
export interface RefinementTrace {
  /** All steps in chronological order */
  steps: RefinementStep[];

  /** How many full iterations were completed */
  totalIterations: number;

  /** Whether refinement stopped before maxIterations */
  stoppedEarly: boolean;
}

/**
 * Configuration for Extended Thinking pattern.
 *
 * Enables chain-of-thought reasoning for specific intents.
 */
export interface ExtendedThinkingConfig {
  /** Intents that should use extended thinking */
  enabledIntents?: AiIntent[];

  /** System prompt for the thinking step */
  thinkingSystemPrompt?: string;

  /** Whether to include thinking in the final result metadata */
  includeThinkingInResult?: boolean;
}
