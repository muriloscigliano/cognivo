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
 * True when NOTHING in the provenance list is grounded — i.e. no entry is a
 * `tool_result` or `document`. This includes the empty list, all-`inference`
 * lists, AND lists whose entries carry an UNKNOWN kind (proposals are
 * serializable, so a deserialized entry can violate the TS type). Fails closed:
 * only a recognized grounding kind counts as grounded, because "we didn't record
 * (recognizable) grounding" must never be mistaken for "this was grounded".
 */
export function isInferenceOnly(provenance: readonly Provenance[]): boolean {
  return !provenance.some((p) => p.kind === 'tool_result' || p.kind === 'document');
}
