import type { IntentClassification, PageIntent } from '../types/classifier.js';
import type { SceneGraph } from '../types/scene-graph.js';
import { detectOverride } from './stage1-override.js';
import { heuristicClassify, buildClassification } from './stage2-heuristic.js';
import { getFloor } from './floors.js';

export interface ClassifyOptions {
  /** Force a specific intent, bypassing heuristics. */
  override?: PageIntent;
  /**
   * When true (default), confidence below the floor for the predicted intent
   * causes a fallback to `unknown` (Spec §5.6 — conservative-firing).
   */
  conservativeFiring?: boolean;
}

/**
 * Classify a scene's primary page intent.
 *
 * Cascade (Spec §5.2):
 *   1. Override — `options.override` OR DOM signal (`<meta name="lens-intent">` etc.)
 *   2. Heuristic — sum signal weights, softmax, pick top-1
 *   3. (LLM stage 3 — wired in a later task; out of scope for v1 cascade.)
 */
export function classify(scene: SceneGraph, options?: ClassifyOptions): IntentClassification {
  const programmaticOverride = options?.override;
  if (programmaticOverride) {
    return {
      primary: { intent: programmaticOverride, confidence: 100 },
      secondary: [],
      signals: [],
      stage: 'override',
    };
  }

  const domOverride = detectOverride(scene);
  if (domOverride) {
    return {
      primary: { intent: domOverride, confidence: 100 },
      secondary: [],
      signals: [],
      stage: 'override',
    };
  }

  const heuristic = heuristicClassify(scene);

  const conservative = options?.conservativeFiring ?? true;
  if (conservative) {
    const floor = getFloor(heuristic.intent);
    if (heuristic.confidence < floor) {
      return {
        primary: { intent: 'unknown', confidence: heuristic.confidence },
        secondary: [],
        signals: heuristic.signals,
        stage: 'heuristic',
      };
    }
  }

  return buildClassification(heuristic, 'heuristic');
}

export { INTENT_LIST, INTENT_METADATA, isValidIntent } from './intents.js';
export { INTENT_FLOORS, getFloor } from './floors.js';
export { detectOverride } from './stage1-override.js';
export { heuristicClassify } from './stage2-heuristic.js';
