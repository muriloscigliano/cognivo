/**
 * @cognivo/compose — Compute a diff between two trees.
 *
 * `diff(before, after)` produces a `CompositionDiff` such that
 * `apply(before, diff(before, after))` deep-equals `after`. Used for:
 *   - round-trip tests (the correctness anchor of the whole package),
 *   - recording what an agent actually changed (provenance),
 *   - deriving the ghost-preview overlay (which nodes changed).
 *
 * This is a structural diff, NOT a minimal edit script. It emits, for each node
 * reached by the canonical traversal:
 *   - `setProp` for each non-child prop that changed,
 *   - `replace` when a child's typeName changed (different component),
 *   - recursion when a child kept its typeName (same component, patch in place),
 *   - `add`/`remove` for children present on only one side.
 *
 * Ops are ordered so applying them in sequence against `before` is safe:
 * removals within an array are emitted high-index-first so earlier ops don't
 * shift the paths of later ones.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { CompositionDiff, DiffOp } from './types.js';
import type { NodePath, ChildSlot } from '../tree/traversal.js';
import { childSlots, isElementNode } from '../tree/traversal.js';
import { hashTree } from '../tree/hash.js';

/** Non-child props of a node (everything childSlots does not claim). */
function dataProps(node: ElementNode): Record<string, unknown> {
  const childKeys = new Set(childSlots(node).map((s) => s.key));
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node.props)) {
    if (childKeys.has(key)) continue;
    out[key] = value;
  }
  return out;
}

function valueChanged(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** Diff the non-child props at a node, emitting setProp ops. */
function diffProps(before: ElementNode, after: ElementNode, path: NodePath, ops: DiffOp[]): void {
  const a = dataProps(before);
  const b = dataProps(after);
  for (const key of Object.keys(b)) {
    if (valueChanged(a[key], b[key])) ops.push({ op: 'setProp', path, key, value: b[key] });
  }
  for (const key of Object.keys(a)) {
    if (!(key in b)) ops.push({ op: 'setProp', path, key, value: null });
  }
}

/** Group child slots by their prop key so each container is diffed as a unit. */
function groupByKey(slots: ChildSlot[]): Map<string, ChildSlot[]> {
  const map = new Map<string, ChildSlot[]>();
  for (const slot of slots) {
    const list = map.get(slot.key);
    if (list) list.push(slot);
    else map.set(slot.key, [slot]);
  }
  return map;
}

/** Recursively diff two nodes known to share a typeName. */
function diffNode(before: ElementNode, after: ElementNode, path: NodePath, ops: DiffOp[]): void {
  diffProps(before, after, path, ops);

  const beforeByKey = groupByKey(childSlots(before));
  const afterByKey = groupByKey(childSlots(after));
  const keys = new Set([...beforeByKey.keys(), ...afterByKey.keys()]);

  for (const key of keys) {
    const bs = beforeByKey.get(key) ?? [];
    const as = afterByKey.get(key) ?? [];
    // A key only enters `keys` if it has ≥1 slot on some side, so `sample` exists.
    const sample = as[0] ?? bs[0];
    if (sample === undefined) continue;

    if (sample.kind === 'slot') {
      diffSlotChild(bs[0], as[0], key, path, ops);
    } else {
      diffArrayChildren(bs, as, key, sample.kind, path, ops);
    }
  }
}

/** Diff a single slotted child (0 or 1 on each side). */
function diffSlotChild(
  before: ChildSlot | undefined,
  after: ChildSlot | undefined,
  key: string,
  path: NodePath,
  ops: DiffOp[],
): void {
  const step = { key, kind: 'slot' as const, index: null };
  if (before && !after) {
    ops.push({ op: 'remove', path: [...path, step] });
  } else if (!before && after) {
    ops.push({ op: 'add', path: [...path, step], node: after.node });
  } else if (before && after) {
    if (before.node.typeName !== after.node.typeName) {
      ops.push({ op: 'replace', path: [...path, step], node: after.node });
    } else {
      diffNode(before.node, after.node, [...path, step], ops);
    }
  }
}

/**
 * Diff two positional child arrays. Positional (index-aligned): the common
 * prefix is diffed in place, the tail is added or removed. Removals are emitted
 * high-index-first so they don't shift lower indices before they're processed.
 */
function diffArrayChildren(
  before: ChildSlot[],
  after: ChildSlot[],
  key: string,
  kind: 'children' | 'array',
  path: NodePath,
  ops: DiffOp[],
): void {
  const min = Math.min(before.length, after.length);
  for (let i = 0; i < min; i++) {
    const bSlot = before[i];
    const aSlot = after[i];
    if (!bSlot || !aSlot) continue;
    const step = { key, kind, index: i };
    const b = bSlot.node;
    const a = aSlot.node;
    if (b.typeName !== a.typeName) {
      ops.push({ op: 'replace', path: [...path, step], node: a });
    } else {
      diffNode(b, a, [...path, step], ops);
    }
  }
  // Additions: append in ascending order at the growing tail.
  for (let i = min; i < after.length; i++) {
    const aSlot = after[i];
    if (!aSlot) continue;
    ops.push({ op: 'add', path: [...path, { key, kind, index: i }], node: aSlot.node });
  }
  // Removals: high-index-first so earlier splices don't shift later paths.
  for (let i = before.length - 1; i >= min; i--) {
    ops.push({ op: 'remove', path: [...path, { key, kind, index: i }] });
  }
}

/**
 * Compute the diff turning `before` into `after`. If the roots are different
 * components, the diff is a single root replace.
 */
export function diff(before: ElementNode, after: ElementNode): CompositionDiff {
  const ops: DiffOp[] = [];
  if (before.typeName !== after.typeName) {
    ops.push({ op: 'replace', path: [], node: after });
  } else {
    diffNode(before, after, [], ops);
  }
  return { baseHash: hashTree(before), ops };
}

// Re-export for callers that only import the diff module.
export { isElementNode };
