import type { RulePack } from '../types/pack.js';

/**
 * Author a RulePack. Identity-with-validation — surfaces malformed packs at
 * import time rather than at evaluate time.
 */
export function definePack(pack: RulePack): RulePack {
  if (!pack.id || typeof pack.id !== 'string') {
    throw new Error('lens-core: definePack() requires a non-empty string id.');
  }
  if (!pack.version || typeof pack.version !== 'string') {
    throw new Error(`lens-core: definePack(${pack.id}) requires a version string.`);
  }
  if (!Array.isArray(pack.rules)) {
    throw new Error(`lens-core: definePack(${pack.id}).rules must be an array.`);
  }
  if (!Array.isArray(pack.intents)) {
    throw new Error(`lens-core: definePack(${pack.id}).intents must be an array.`);
  }
  return pack;
}
