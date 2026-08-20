/**
 * @cognivo/compose — Provenance model.
 *
 * Every commit in the modify loop records how the current composition came to be:
 * the prompt that produced it, the diff that was applied, and the hash of the
 * resulting tree. The chain is replayable and doubles as a dataset for improving
 * default compositions later (plan §2.4).
 */

import type { CompositionDiff } from '../diff/types.js';

export interface ProvenanceEntry {
  /** Monotonic id within a log (0 = initial composition). */
  id: number;
  /** Id of the entry this was applied on top of; null for the initial composition. */
  parentId: number | null;
  /** The user prompt that produced this step. */
  prompt: string;
  /**
   * The diff applied to the parent tree to reach this one. Null for the initial
   * composition (id 0), which is a full tree, not a diff.
   */
  diff: CompositionDiff | null;
  /** Content hash of the tree AFTER this step (see tree/hash.ts). */
  treeHash: string;
  /** Caller-supplied timestamp (ms). The engine never calls Date.now() itself. */
  ts: number;
}

/** A sink that persists provenance entries (DB, file, analytics). */
export interface ProvenanceSink {
  append(entry: ProvenanceEntry): void;
}
