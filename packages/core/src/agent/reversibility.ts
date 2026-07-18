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
 * A blast bucket used as part of a TrustLedger key (correction #2, HIGH-2).
 *
 * Three axes so earned autonomy on cheap actions can't be spent on expensive
 * ones:
 *  - scope:      self | workspace | external
 *  - magnitude:  order-of-magnitude of entity count — m0 (0), m1 (1-9),
 *                m2 (10-99), m3 (100-999), m4 (1000+, capped).
 *  - side-effect: x1 if it causes ANY irreversible side effect, else x0.
 *
 * A 1-entity harmless action (`self:m1:x0`) and a 99-entity + email.send action
 * (`external:m2:x1`) therefore key DIFFERENTLY — cheap approvals never graduate
 * a dangerous action.
 */
export function blastBucket(b: BlastRadius): string {
  const count = b.entities.length;
  const magnitude = count === 0 ? 'm0' : `m${Math.min(4, String(count).length)}`;
  const sideEffectAxis = b.irreversibleSideEffects.length > 0 ? 'x1' : 'x0';
  return `${b.scope}:${magnitude}:${sideEffectAxis}`;
}
