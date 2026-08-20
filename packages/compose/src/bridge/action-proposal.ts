/**
 * Agent-contract bridge — Plan 07 of the Agent Interaction Contract.
 *
 * Wraps a compose `CompositionDiff` as a core `ActionProposal<CompositionDiff>`
 * so governed UI composition rides the same trust rails as every other agent
 * action: the layout-grammar linter is the structural gate (evaluated on the
 * APPLIED candidate, never the raw ops), the ghost renderer is the preview,
 * and `StaleDiffError` is the concurrency guard (propagated, not swallowed).
 *
 * Two provenance axes meet here and MUST stay separate:
 * - core's GROUNDING provenance (what the diff's content rests on) goes on the
 *   proposal: the base tree it rewrites (`document`) plus the model's layout
 *   choices (`inference`).
 * - compose's LINEAGE provenance (`ProvenanceEntry`: prompt→diff→treeHash) is
 *   untouched — it remains the commit-time record kept by `ProvenanceLog`.
 */
import type { ElementNode } from '@cognivo/gen-ui';
import type { ActionProposal } from '@cognivo/core';
import type { CompositionDiff, DiffOp } from '../diff/types.js';
import { apply } from '../diff/apply.js';
import { hashTree } from '../tree/hash.js';
import { lint } from '../grammar/linter.js';
import type { LayoutGrammar, GrammarViolation } from '../grammar/types.js';
import { formatPath } from '../tree/path.js';

/** The tool name composition modifications carry on the trust ledger. */
export const COMPOSITION_MODIFY_TOOL = 'composition.modify';

export interface CompositionProposalInput {
  /** Caller-supplied proposal id (no randomness in the engine). */
  id: string;
  runId: string;
  /** The user prompt that produced the diff — becomes the rationale. */
  prompt: string;
  baseTree: ElementNode;
  diff: CompositionDiff;
  grammar: LayoutGrammar;
}

export interface CompositionProposalResult {
  proposal: ActionProposal<CompositionDiff>;
  /** `apply(baseTree, diff)` — the tree the linter judged and the ghost previews. */
  candidate: ElementNode;
  /** Structural gate: non-empty means the candidate breaks the layout grammar. */
  violations: GrammarViolation[];
}

/** One-line human summary of a diff: op counts by kind. */
export function summarizeDiff(diff: CompositionDiff): string {
  if (diff.ops.length === 0) return 'no changes';
  const counts = new Map<string, number>();
  for (const op of diff.ops) {
    counts.set(op.op, (counts.get(op.op) ?? 0) + 1);
  }
  const parts = [...counts.entries()].map(([kind, n]) => `${n} ${kind}`);
  const noun = diff.ops.length === 1 ? 'change' : 'changes';
  return `${diff.ops.length} ${noun}: ${parts.join(', ')}`;
}

function describeOp(op: DiffOp): string {
  switch (op.op) {
    case 'add':
      return `add ${op.node.typeName} @ ${formatPath(op.path)}`;
    case 'remove':
      return `remove @ ${formatPath(op.path)}`;
    case 'replace':
      return `replace with ${op.node.typeName} @ ${formatPath(op.path)}`;
    case 'setProp':
      return `set ${op.key} @ ${formatPath(op.path)}`;
    case 'move':
      return `move ${formatPath(op.from)} → ${formatPath(op.to)}`;
  }
}

/** Human-legible list of what a diff touches, deduped, for the blast radius. */
export function touchedEntities(diff: CompositionDiff): string[] {
  return [...new Set(diff.ops.map(describeOp))];
}

/**
 * Build the governed proposal for a composition modification.
 *
 * Throws `StaleDiffError` when the diff's baseHash does not match `baseTree` —
 * surface it as a proposal invalidation (recompose against the current tree),
 * never as a crash.
 */
export function proposeComposition(input: CompositionProposalInput): CompositionProposalResult {
  const candidate = apply(input.baseTree, input.diff); // throws StaleDiffError when stale
  const violations = lint(candidate, input.grammar);

  const proposal: ActionProposal<CompositionDiff> = {
    id: input.id,
    runId: input.runId,
    tool: COMPOSITION_MODIFY_TOOL,
    input: input.diff,
    summary: summarizeDiff(input.diff),
    rationale: input.prompt,
    // The base tree + discard() is a perfect undo: nothing leaves the surface.
    reversibility: 'reversible',
    blastRadius: {
      scope: 'self',
      entities: touchedEntities(input.diff),
      irreversibleSideEffects: [],
    },
    provenance: [
      { kind: 'document', docId: `tree:${hashTree(input.baseTree)}` },
      { kind: 'inference' },
    ],
  };

  return { proposal, candidate, violations };
}
