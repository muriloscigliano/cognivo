/**
 * @cognivo/compose — Path resolution and node mutation helpers.
 *
 * A `NodePath` (see traversal.ts) addresses a node as a chain of steps from the
 * root. This module turns a path into (a) the node it points at, and (b) an
 * immutable setter that returns a new tree with that node added/removed/replaced.
 *
 * All mutations are PURE: they never touch the input tree. Structural sharing is
 * used where cheap (siblings not on the mutation path are reused by reference).
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { NodePath, PathStep } from './traversal.js';
import { isElementNode } from './traversal.js';

/** Serialize a path to a human-readable string, e.g. `root/children[2]/header`. */
export function formatPath(path: NodePath): string {
  if (path.length === 0) return 'root';
  const steps = path.map((s) => (s.index === null ? s.key : `${s.key}[${s.index}]`));
  return `root/${steps.join('/')}`;
}

/** Structural equality of two paths. */
export function pathsEqual(a: NodePath, b: NodePath): boolean {
  if (a.length !== b.length) return false;
  return a.every((s, i) => {
    const o = b[i];
    return o !== undefined && s.key === o.key && s.kind === o.kind && s.index === o.index;
  });
}

/** Read the node at `path`, or null if the path does not resolve. */
export function getAt(root: ElementNode, path: NodePath): ElementNode | null {
  let current: ElementNode = root;
  for (const step of path) {
    const next = readStep(current, step);
    if (!next) return null;
    current = next;
  }
  return current;
}

/** Follow one step down from a node; null if it doesn't resolve to an ElementNode. */
function readStep(node: ElementNode, step: PathStep): ElementNode | null {
  const value = node.props[step.key];
  if (step.kind === 'slot') {
    return isElementNode(value) ? value : null;
  }
  // 'children' or 'array' — value is an ElementNode[]
  if (Array.isArray(value) && step.index !== null) {
    const child: unknown = value[step.index];
    return isElementNode(child) ? child : null;
  }
  return null;
}

/** Shallow clone of a node (props object copied one level; children shared). */
function cloneNode(node: ElementNode): ElementNode {
  return { ...node, props: { ...node.props } };
}

/**
 * Return a new tree with the node at `path` transformed by `fn`. If `fn` returns
 * null the node is REMOVED from its container. The parent chain is cloned; all
 * off-path siblings are shared by reference.
 *
 * Throws if the path does not resolve — callers guard with `getAt` first, or rely
 * on the diff engine's `baseHash` check to have already validated the tree.
 */
export function transformAt(
  root: ElementNode,
  path: NodePath,
  fn: (node: ElementNode) => ElementNode | null,
): ElementNode {
  const step = path[0];
  if (step === undefined) {
    const result = fn(root);
    if (!result) throw new Error('Cannot remove the root node');
    return result;
  }

  const rest = path.slice(1);
  const parent = cloneNode(root);
  const value = parent.props[step.key];

  if (step.kind === 'slot') {
    if (!isElementNode(value)) throw new Error(`No slot child at ${step.key}`);
    if (rest.length === 0) {
      const result = fn(value);
      if (result) parent.props[step.key] = result;
      else delete parent.props[step.key];
    } else {
      parent.props[step.key] = transformAt(value, rest, fn);
    }
    return parent;
  }

  // 'children' | 'array' — value is an ElementNode[]
  if (!Array.isArray(value) || step.index === null) {
    throw new Error(`No array child at ${step.key}[${String(step.index)}]`);
  }
  const arr = value.slice();
  const child: unknown = arr[step.index];
  if (!isElementNode(child)) throw new Error(`No child node at ${step.key}[${step.index}]`);

  if (rest.length === 0) {
    const result = fn(child);
    if (result) arr[step.index] = result;
    else arr.splice(step.index, 1);
  } else {
    arr[step.index] = transformAt(child, rest, fn);
  }
  parent.props[step.key] = arr;
  return parent;
}

/**
 * Insert `node` into the container addressed by the last step of `path`.
 * For array containers the last step's index is the insertion position
 * (clamped to [0, length]); for slot containers it sets the slot prop.
 */
export function insertAt(root: ElementNode, path: NodePath, node: ElementNode): ElementNode {
  const last = path[path.length - 1];
  if (last === undefined) throw new Error('Cannot insert at the root path');
  const parentPath = path.slice(0, -1);

  return transformAt(root, parentPath, (parent) => {
    const clone = cloneNode(parent);
    if (last.kind === 'slot') {
      clone.props[last.key] = node;
      return clone;
    }
    const existing = clone.props[last.key];
    const arr = Array.isArray(existing) ? existing.slice() : [];
    const at = last.index === null ? arr.length : Math.max(0, Math.min(last.index, arr.length));
    arr.splice(at, 0, node);
    clone.props[last.key] = arr;
    return clone;
  });
}
