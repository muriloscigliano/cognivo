/**
 * @cognivo/compose — Governed runtime composition.
 *
 * Adds the modify loop over agent-composed Cognivo UI: a canonical tree
 * traversal, a serializable diff/patch engine, a host-configurable layout
 * grammar + linter, and a provenance record. Renders through @cognivo/gen-ui's
 * existing ElementNode tree — it never forks the tree type, registry, or renderer.
 *
 * Framework-agnostic. Deps: @cognivo/gen-ui, @cognivo/core (agent-contract bridge), zod.
 */

// ─── Tree (the canonical traversal is the constitution) ──────────────────────
export {
  childSlots,
  walk,
  isElementNode,
  nodeCount,
  maxDepth,
} from './tree/traversal.js';
export type { ChildSlot, ChildKind, NodePath, PathStep, Visitor } from './tree/traversal.js';

export { formatPath, pathsEqual, getAt, transformAt, insertAt } from './tree/path.js';
export { hashTree } from './tree/hash.js';

// ─── Diff / patch ────────────────────────────────────────────────────────────
export { diff } from './diff/diff.js';
export { apply, StaleDiffError } from './diff/apply.js';
export type { CompositionDiff, DiffOp } from './diff/types.js';

// ─── Layout grammar ──────────────────────────────────────────────────────────
export { lint } from './grammar/linter.js';
export { formatRetryFeedback } from './grammar/retry.js';
export type { LayoutGrammar, GrammarRule, GrammarViolation, RegionDef } from './grammar/types.js';

// ─── Provenance ──────────────────────────────────────────────────────────────
export { ProvenanceLog, importProvenance } from './provenance/log.js';
export type { ProvenanceEntry, ProvenanceSink } from './provenance/types.js';
export type { RecordInput } from './provenance/log.js';

// ─── Client (provider-neutral composition seam) ──────────────────────────────
export { createLlmComposeClient } from './client/llm-client.js';
export type { ComposeClient, TextCompletion } from './client/types.js';
export type { LlmComposeClientOptions } from './client/llm-client.js';

// ─── Agent-contract bridge (Plan 07: composition as a governed ActionProposal) ─
export {
  proposeComposition,
  summarizeDiff,
  touchedEntities,
  COMPOSITION_MODIFY_TOOL,
} from './bridge/action-proposal.js';
export type { CompositionProposalInput, CompositionProposalResult } from './bridge/action-proposal.js';
