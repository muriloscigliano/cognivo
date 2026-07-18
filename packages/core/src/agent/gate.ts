/**
 * @cognivo/core — The gate.
 *
 * Autonomy is a per-action POLICY resolved at runtime, not a product-level dial.
 * `gate()` maps a proposal (plus the run's cumulative context and the trust
 * ledger) to one of four outcomes. Pure and total.
 *
 * Order of checks matters and encodes the three corrections:
 *   1. hard-stop (irreversible + inference-only) → confirm, unconditionally.
 *   2. the run's CUMULATIVE blast radius, merged with this proposal, drives
 *      escalation — not the proposal in isolation.
 *   3. earned trust (ledger, keyed on tool+blast-bucket) can only RELAX a
 *      compensable action from confirm → notify; it can never relax an
 *      irreversible or inference-only one.
 */
import type { ActionProposal } from './proposal.js';
import { isHardStop } from './proposal.js';
import { isInferenceOnly } from './provenance.js';
import type { BlastRadius, Reversibility } from './reversibility.js';
import { mergeBlastRadius } from './reversibility.js';
import type { TrustLedger } from './trust-ledger.js';

export type Gate = 'auto' | 'notify' | 'confirm' | 'confirm_typed';

/** The minimal run state the gate needs. Plan 06 extends this into RunCheckpoint. */
export interface RunContext {
  runId: string;
  /** Blast radius accrued by all prior steps in this run (correction #1). */
  cumulativeBlastRadius: BlastRadius;
}

/** A fresh run context with an empty (self, nothing) cumulative radius. */
export function emptyRunContext(runId: string): RunContext {
  return { runId, cumulativeBlastRadius: { scope: 'self', entities: [], irreversibleSideEffects: [] } };
}

/** Graduation threshold: clean approvals needed to relax compensable → notify. */
const GRADUATION_THRESHOLD = 10;

export function gate(p: ActionProposal, context: RunContext, ledger: TrustLedger): Gate {
  // Correction #3: hard-stop is absolute. No context, no ledger, ever relaxes it.
  if (isHardStop(p)) return 'confirm';

  // Correction #1: escalate on the run's cumulative radius merged with this step.
  const runRadius = mergeBlastRadius(context.cumulativeBlastRadius, p.blastRadius);

  // FIX 1: fail CLOSED on malformed runtime input. `reversibility` comes from
  // LLM output; TS types are erased. A value that is not exactly one of the
  // three known classes (missing, 'unknown', 'Irreversible', …) must never fall
  // through to an 'auto'/'notify' path — treat it as the most-restrictive case.
  // Same for a missing/invalid provenance list (handled below via isInferenceOnly,
  // which fails closed on unknown kinds too).
  const KNOWN_REVERSIBILITY: readonly Reversibility[] = ['reversible', 'compensable', 'irreversible'];
  if (!KNOWN_REVERSIBILITY.includes(p.reversibility) || !Array.isArray(p.provenance)) {
    return runRadius.scope === 'external' ? 'confirm_typed' : 'confirm';
  }

  // Irreversible is always a human gate; external irreversible demands typed confirm.
  if (p.reversibility === 'irreversible') {
    return runRadius.scope === 'external' ? 'confirm_typed' : 'confirm';
  }

  // Ungrounded (inference-only) non-irreversible actions still need a human look.
  if (isInferenceOnly(p.provenance)) return 'confirm';

  // FIX 2: if the RUN has already caused irreversible damage at ANY scope
  // (a deleted prod row is workspace-scoped but still irreversible), stop acting
  // freely even for an individually-cheap reversible step.
  if (runRadius.irreversibleSideEffects.length > 0) {
    return 'confirm';
  }

  // Compensable: earned trust can relax it from confirm to notify.
  if (p.reversibility === 'compensable') {
    return ledger.autoApprovals(p) >= GRADUATION_THRESHOLD ? 'notify' : 'confirm';
  }

  // Reversible + grounded + run still contained → act freely, just log it.
  return 'auto';
}
