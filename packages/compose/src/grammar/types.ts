/**
 * @cognivo/compose — Layout grammar.
 *
 * A host-configurable constraint set the agent's output must satisfy. The linter
 * (linter.ts) validates a tree against it; violations are fed back to the agent
 * for retry (retry.ts) so users never see a broken layout.
 *
 * Rules key on component `typeName` — the one piece of metadata the gen-ui
 * registry actually carries (name/tagName/props/description/biasHints). Rules
 * that would need token/state/agent-card contracts are deliberately out of scope
 * for v0.1 (see plan §10.2).
 */

export type GrammarRule =
  /** A component instance must span at least `cols` grid columns (checked against a `span`/`cols` prop). */
  | { kind: 'min-span'; component: string; cols: number }
  /** At most `max` instances of a component may appear in the whole tree. */
  | { kind: 'max-instances'; component: string; max: number }
  /** A component may only appear inside one of `allowedRegions` (checked against the region ancestor). */
  | { kind: 'region'; component: string; allowedRegions: string[] }
  /** A component must appear in the first region (above the fold). */
  | { kind: 'above-fold'; component: string }
  /** The whole tree may not nest deeper than `depth` (root = 0). */
  | { kind: 'max-nesting'; depth: number };

/** A named layout region and the components it is allowed to contain. */
export interface RegionDef {
  /** Region name, matched against a node's `region` prop. */
  name: string;
  /** Whether this region is "above the fold" (used by the `above-fold` rule). */
  aboveFold?: boolean;
}

export interface LayoutGrammar {
  /** Grid column count (e.g. 12). Used to validate `min-span` upper bounds. */
  columns: number;
  /** Declared regions, in document order (first = top / above-fold default). */
  regions: RegionDef[];
  rules: GrammarRule[];
}

export interface GrammarViolation {
  rule: GrammarRule;
  /** Where the violation is, as a formatted path (see tree/path.ts). */
  path: string;
  /** Human-readable message — also the text fed back to the agent on retry. */
  message: string;
}
