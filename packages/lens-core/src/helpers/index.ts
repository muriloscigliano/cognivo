import type { RuleHelpers } from '../types/rule.js';
import { parsePrice } from './price-parser.js';
import { getComponentManifest } from './component-manifest.js';

export { parsePrice } from './price-parser.js';
export { createSceneQuery } from './scene-query.js';
export { getComponentManifest } from './component-manifest.js';
export { walkAll, collectAllText } from './walk.js';
export { clamp01to100, clamp, softmax } from './math.js';

/**
 * Build the RuleHelpers bundle that the engine passes into rule callbacks.
 * Constructed once per evaluate() pass; rules cannot mutate it.
 */
export function createRuleHelpers(): RuleHelpers {
  return {
    parsePrice,
    getComponentManifest,
  };
}
