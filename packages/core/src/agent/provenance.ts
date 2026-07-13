/**
 * @cognivo/core — Grounding provenance.
 *
 * The honest label for "what did this agent output actually rest on?".
 * Distinct from @cognivo/compose's LINEAGE provenance (how a tree came to be).
 * A proposal carries both axes; never collapse them.
 *
 * The `inference` kind is the load-bearing one: it is the explicit, honest
 * marker for "the model made this up, there is no grounding". Shipping it is
 * what lets the gate refuse to auto-execute ungrounded irreversible actions.
 */
export type Provenance =
  /** Grounded in a specific tool call's result. */
  | { kind: 'tool_result'; toolCallId: string }
  /** Grounded in a document span. `span` is [startChar, endChar]. */
  | { kind: 'document'; docId: string; span?: [number, number] }
  /** The honest one: no grounding. The model inferred this. */
  | { kind: 'inference' };

/**
 * True when NOTHING in the provenance list is grounded — i.e. every entry is
 * `inference`, OR the list is empty. Fails closed: absence of stated grounding
 * counts as inference-only, because "we didn't record grounding" must never be
 * mistaken for "this was grounded".
 */
export function isInferenceOnly(provenance: readonly Provenance[]): boolean {
  if (provenance.length === 0) return true;
  return provenance.every((p) => p.kind === 'inference');
}
