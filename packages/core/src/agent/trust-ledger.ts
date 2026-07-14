/**
 * @cognivo/core — TrustLedger.
 *
 * Progressive autonomy made concrete: a per-key counter of "a human approved
 * this exact shape of action, N times, WITHOUT editing it". N clean approvals
 * graduate an action's gate (confirm → notify); a single edit or rejection
 * demotes it back to zero. This is the mechanism the "autonomy is earned over
 * time" idea gestures at and never names.
 *
 * The key is `tool + blast-bucket` (NOT tool alone): trust earned on cheap
 * actions must never be spendable on expensive ones (correction #2).
 */
import type { ActionProposal } from './proposal.js';
import { blastBucket } from './reversibility.js';

/** The human's decision on a proposal. */
export type Decision = 'approved' | 'edited' | 'rejected';

/** `${tool}:${blastBucket}` — the unit trust is earned and spent against. */
export function ledgerKey(p: ActionProposal): string {
  return `${p.tool}:${blastBucket(p.blastRadius)}`;
}

export interface TrustLedger {
  /** Clean consecutive approvals for this proposal's key. */
  autoApprovals(p: ActionProposal): number;
  /** Record a human decision. 'approved' increments; 'edited'/'rejected' reset. */
  record(p: ActionProposal, decision: Decision): void;
}

export class InMemoryTrustLedger implements TrustLedger {
  private counts = new Map<string, number>();

  autoApprovals(p: ActionProposal): number {
    return this.counts.get(ledgerKey(p)) ?? 0;
  }

  record(p: ActionProposal, decision: Decision): void {
    const key = ledgerKey(p);
    if (decision === 'approved') {
      this.counts.set(key, (this.counts.get(key) ?? 0) + 1);
    } else {
      // An edit or rejection means the agent's proposed shape was wrong here.
      // Trust decays hard: reset to zero rather than decrement.
      this.counts.set(key, 0);
    }
  }
}
