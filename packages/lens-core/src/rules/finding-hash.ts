import { hashText } from '../observer/node-id.js';

/**
 * Stable hash for a Finding's `id`. Combines (ruleId, targetNodeId, message-hash)
 * so re-scans of an unchanged page produce identical Finding ids — the UI uses
 * this to dedup overlays across scans.
 *
 * Format: `RRRR-NNNNNNNN-MMMM` (4 + 8 + 4 hex with two dashes = 18 chars).
 */
export function computeFindingHash(input: {
  ruleId: string;
  targetNodeId: string;
  message: string;
}): string {
  const ruleHash = hashText(input.ruleId).slice(0, 4);
  const nodeHash = input.targetNodeId.slice(0, 8);
  const msgHash = hashText(input.message).slice(0, 4);
  return `${ruleHash}-${nodeHash}-${msgHash}`;
}
