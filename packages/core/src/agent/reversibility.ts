/**
 * @cognivo/core — Reversibility classification + blast radius.
 *
 * Reversibility is a CLASSIFICATION, not a principle. "Every action reversible"
 * is unshippable (you cannot un-send an email). The class drives the gate.
 *
 * - reversible:   edit draft, add tag, generate a component  → act freely, log it
 * - compensable:  create invoice→void, book→cancel           → act, but the receipt
 *                                                               shows the compensating
 *                                                               action (NOT an undo —
 *                                                               a voided invoice still
 *                                                               exists)
 * - irreversible: send email, capture payment, delete prod   → preview + explicit
 *                                                               human confirm, always
 */
export type Reversibility = 'reversible' | 'compensable' | 'irreversible';

/** How far an action's effects reach. */
export type BlastScope = 'self' | 'workspace' | 'external';

export interface BlastRadius {
  scope: BlastScope;
  /** The concrete things this touches, by name/id. */
  entities: string[];
  /** Irreversible effects this action (or run) will cause. Accumulates across a run. */
  irreversibleSideEffects: string[];
}

const SCOPE_RANK: Record<BlastScope, number> = { self: 0, workspace: 1, external: 2 };

/**
 * Merge two blast radii into the cumulative radius of doing both. Scope widens
 * to the max; entities and irreversible side effects union. This is how a run's
 * TOTAL blast radius is computed from its steps (correction #1).
 */
export function mergeBlastRadius(a: BlastRadius, b: BlastRadius): BlastRadius {
  const scope = SCOPE_RANK[a.scope] >= SCOPE_RANK[b.scope] ? a.scope : b.scope;
  return {
    scope,
    entities: [...new Set([...a.entities, ...b.entities])],
    irreversibleSideEffects: [...new Set([...a.irreversibleSideEffects, ...b.irreversibleSideEffects])],
  };
}

/**
 * A coarse magnitude bucket used as part of a TrustLedger key (correction #2).
 * "large" if it touches many entities; else "small". Combined with scope so
 * earned autonomy on cheap actions can't be spent on expensive ones.
 */
export function blastBucket(b: BlastRadius): string {
  const magnitude = b.entities.length >= 100 ? 'lg' : 'sm';
  return `${b.scope}:${magnitude}`;
}
