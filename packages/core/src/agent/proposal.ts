/**
 * @cognivo/core — ActionProposal.
 *
 * Every agent action is a PROPOSAL OBJECT, not a side effect. This is the
 * structural shift the whole trust contract hangs off: the agent proposes,
 * a gate decides, a human confirms where required, and only then does the
 * effect happen — with a receipt.
 *
 * Generalized from lens-core's domain-specific `AgentFixProposal`. Note the
 * deliberate ABSENCE of a `confidence` number: LLM self-reported confidence is
 * not calibrated and manufactures trust. Grounding (`provenance`) replaces it.
 */
import type { Provenance } from './provenance.js';
import { isInferenceOnly } from './provenance.js';
import type { Reversibility, BlastRadius } from './reversibility.js';

export interface ActionProposal<TInput = unknown> {
  id: string;
  runId: string;
  /** e.g. 'email.send', 'invoice.create'. */
  tool: string;
  input: TInput;
  /** Human-readable, one line. */
  summary: string;
  /** Why this, now. */
  rationale: string;
  /** Alternative shapes the human could pick instead. */
  alternatives?: { summary: string; input: TInput }[];
  reversibility: Reversibility;
  blastRadius: BlastRadius;
  /** What this rests on. Empty or all-inference ⇒ ungrounded (fails closed). */
  provenance: Provenance[];
  /** Required when reversibility === 'compensable'. The compensating action. */
  compensation?: { tool: string; input: unknown };
}

/**
 * The hard-stop rule: an irreversible action grounded ONLY in inference must
 * NEVER auto-execute, regardless of autonomy level or earned trust. Returns
 * true when the proposal is in that forbidden zone.
 */
export function isHardStop(p: ActionProposal): boolean {
  return p.reversibility === 'irreversible' && isInferenceOnly(p.provenance);
}

/**
 * Runtime well-formedness check. A `compensable` proposal MUST carry a
 * compensation (a voided-invoice-style undo affordance). Throws otherwise.
 */
export function assertWellFormed(p: ActionProposal): void {
  if (p.reversibility === 'compensable' && !p.compensation) {
    throw new Error(
      `ActionProposal ${p.id} is 'compensable' but has no compensation action`,
    );
  }
}
