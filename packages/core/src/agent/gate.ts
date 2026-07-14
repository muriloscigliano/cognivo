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
import type { BlastRadius } from './reversibility.js';
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

  // Irreversible is always a human gate; external irreversible demands typed confirm.
  if (p.reversibility === 'irreversible') {
    return runRadius.scope === 'external' ? 'confirm_typed' : 'confirm';
  }

  // Ungrounded (inference-only) non-irreversible actions still need a human look.
  if (isInferenceOnly(p.provenance)) return 'confirm';

  // If the RUN has already reached external irreversible territory, stop acting
  // freely even for an individually-cheap reversible step.
  if (runRadius.scope === 'external' && runRadius.irreversibleSideEffects.length > 0) {
    return 'confirm';
  }

  // Compensable: earned trust can relax it from confirm to notify.
  if (p.reversibility === 'compensable') {
    return ledger.autoApprovals(p) >= GRADUATION_THRESHOLD ? 'notify' : 'confirm';
  }

  // Reversible + grounded + run still contained → act freely, just log it.
  return 'auto';
}
