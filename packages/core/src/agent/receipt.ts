/**
 * @cognivo/core — ActionReceipt.
 *
 * What happened after a proposal was resolved and executed: what ran, what it
 * touched, and the SPECIFIC compensating affordance for THIS action — never a
 * global undo. Compensation ≠ undo: a voided invoice still exists, a cancelled
 * booking still leaves a record. The receipt says so via
 * `compensationIsDestructiveUndo: false`, so the UI never promises "this never
 * happened".
 */
import type { ActionProposal } from './proposal.js';
import type { Reversibility } from './reversibility.js';

export interface ActionOutcome {
  status: 'executed' | 'failed';
  /** Caller-supplied timestamp (ms). The engine never calls Date.now() itself. */
  ts: number;
  /** Present when status === 'failed'. */
  error?: string;
}

export interface ActionReceipt {
  proposalId: string;
  runId: string;
  tool: string;
  summary: string;
  /** The entities this action touched, snapshotted from the proposal's blast radius. */
  touched: string[];
  reversibility: Reversibility;
  status: 'executed' | 'failed';
  ts: number;
  error?: string;
  /** The concrete compensating action, if any. NOT a global undo. */
  compensation?: { tool: string; input: unknown };
  /**
   * Always false in this model: compensation reverses effect, it does not erase
   * history. The UI must not present it as "undo" / "never happened".
   */
  compensationIsDestructiveUndo: boolean;
}

/** Build a receipt from a resolved proposal and its execution outcome. */
export function toReceipt(p: ActionProposal, outcome: ActionOutcome): ActionReceipt {
  const receipt: ActionReceipt = {
    proposalId: p.id,
    runId: p.runId,
    tool: p.tool,
    summary: p.summary,
    touched: [...p.blastRadius.entities],
    reversibility: p.reversibility,
    status: outcome.status,
    ts: outcome.ts,
    compensationIsDestructiveUndo: false,
  };
  // Only offer a "reverse this" affordance when it is both true and possible:
  // the action must be classified `compensable` AND have actually executed. An
  // irreversible action's compensation is a lie; a failed action never happened.
  if (p.reversibility === 'compensable' && outcome.status === 'executed' && p.compensation) {
    receipt.compensation = p.compensation;
  }
  if (outcome.error !== undefined) receipt.error = outcome.error;
  return receipt;
}
