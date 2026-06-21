/**
 * Dynamic Software Interfaces — F1: field-binding resolver (the real firewall).
 *
 * Plan: ../plans/F1-resolver.md.  Build principle: no shortcuts — the firewall is
 * enforced HERE, in code, on the real path. A FieldBinding to a key the dataset
 * does not declare produces a structured GovernanceRejection and a null result.
 * No render can proceed off an undeclared field, regardless of what the LLM emitted.
 *
 * F1 is parser-agnostic: it operates on a minimal UiNode shape so it does not
 * couple to the DSL text parser (a later unit). The DSL parser will produce
 * UiNodes whose data-bound props are FieldBindings (F0).
 */

import {
  type DatasetEnvelope,
  type FieldBinding,
  type BoundValue,
  type GovernanceRejection,
  isFieldBinding,
  isLiteralValue,
  hasField,
} from './contracts.js';

// ─── The tree F1 operates on ──────────────────────────────────────────────────

export type PropValue = BoundValue | UiNode | UiNode[];

export interface UiNode {
  /** Component type name, e.g. "Stack", "RichRow". */
  type: string;
  props: Record<string, PropValue>;
}

/** A node after resolution: FieldBindings replaced by their dataset value(s). */
export interface ResolvedNode {
  type: string;
  props: Record<string, unknown>;
}

export interface ResolveResult {
  /** The resolved tree, or null if ANY rejection occurred (fail-closed). */
  resolved: ResolvedNode | null;
  /** Every rejection found — we never stop at the first (vision §5.4: show all). */
  rejections: GovernanceRejection[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isUiNode(v: unknown): v is UiNode {
  return (
    typeof v === 'object' &&
    v !== null &&
    typeof (v as { type?: unknown }).type === 'string' &&
    typeof (v as { props?: unknown }).props === 'object' &&
    !isFieldBinding(v) &&
    !isLiteralValue(v)
  );
}

/**
 * Resolve a single FieldBinding against the dataset.
 * - If the field is undeclared → push a rejection, return undefined (fail-closed).
 * - If itemIndex given → that item's value for the field.
 * - Otherwise → a field descriptor { key, label, type } for layouts that map all items.
 */
function resolveBinding(
  b: FieldBinding,
  env: DatasetEnvelope,
  itemIndex: number | undefined,
  rejections: GovernanceRejection[],
): unknown {
  if (!hasField(env, b.key)) {
    rejections.push({
      code: 'undeclared-field',
      message: `Cannot reference field "${b.key}" — it is not in the dataset's declared fields.`,
      where: b.key,
    });
    return undefined; // fail-closed: no value leaks for an undeclared field
  }
  const def = env.fields.find((f) => f.key === b.key)!;
  if (itemIndex !== undefined) {
    const item = env.items[itemIndex] as Record<string, unknown> | undefined;
    return item ? item[b.key] : undefined;
  }
  return { kind: 'field-descriptor', key: def.key, label: def.label, type: def.type };
}

function resolveProp(
  value: PropValue,
  env: DatasetEnvelope,
  itemIndex: number | undefined,
  rejections: GovernanceRejection[],
): unknown {
  if (isFieldBinding(value)) return resolveBinding(value, env, itemIndex, rejections);
  if (isLiteralValue(value)) return value.value;
  if (Array.isArray(value)) {
    // Recurse into genuine UiNodes; leave non-node array items (e.g. stray
    // _args) untouched rather than treating them as nodes.
    return value.map((child) =>
      isUiNode(child) ? resolveNode(child, env, itemIndex, rejections) : child,
    );
  }
  if (isUiNode(value)) return resolveNode(value, env, itemIndex, rejections);
  // Unknown prop shape — pass through untouched (the parser guarantees shapes;
  // this is defensive, not a happy path).
  return value;
}

function resolveNode(
  node: UiNode,
  env: DatasetEnvelope,
  itemIndex: number | undefined,
  rejections: GovernanceRejection[],
): ResolvedNode {
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(node.props)) {
    props[k] = resolveProp(v, env, itemIndex, rejections);
  }
  return { type: node.type, props };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Resolve a UI tree against a dataset, enforcing the field firewall.
 * Fail-closed: if any FieldBinding references an undeclared field, `resolved`
 * is null and every offending binding is reported in `rejections`.
 */
export function resolveTree(
  tree: UiNode,
  env: DatasetEnvelope,
  itemIndex?: number,
): ResolveResult {
  const rejections: GovernanceRejection[] = [];
  const resolved = resolveNode(tree, env, itemIndex, rejections);
  return { resolved: rejections.length === 0 ? resolved : null, rejections };
}

/** Every field key the tree references (declared or not), including nested. */
export function collectFieldBindings(tree: UiNode): string[] {
  const keys = new Set<string>();
  const walkValue = (v: PropValue): void => {
    if (isFieldBinding(v)) keys.add(v.key);
    // An array prop may hold non-node items (e.g. a stray _args array); recurse
    // only into genuine UiNodes, ignore the rest. Mirror resolveProp's guarding.
    else if (Array.isArray(v)) v.forEach((c) => isUiNode(c) && walkNode(c));
    else if (isUiNode(v)) walkNode(v);
  };
  const walkNode = (n: UiNode): void => {
    for (const v of Object.values(n.props)) walkValue(v);
  };
  walkNode(tree);
  return [...keys];
}
