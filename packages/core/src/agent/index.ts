/**
 * @cognivo/core — Agent interaction contract (Plan 01 primitives).
 *
 * Grounding provenance, reversibility classification, blast radius, and the
 * ActionProposal type. The trust layer's foundation.
 */
export type { Provenance } from './provenance.js';
export { isInferenceOnly } from './provenance.js';

export type { Reversibility, BlastScope, BlastRadius } from './reversibility.js';
export { mergeBlastRadius, blastBucket } from './reversibility.js';

export type { ActionProposal } from './proposal.js';
export { isHardStop, assertWellFormed } from './proposal.js';
