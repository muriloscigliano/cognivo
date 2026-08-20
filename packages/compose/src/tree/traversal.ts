/**
 * @cognivo/compose — Canonical tree traversal (THE constitution).
 *
 * `ElementNode` (from @cognivo/gen-ui) has no first-class `children` edge —
 * child nodes live inside `props`. Three places in gen-ui walk the tree
 * independently, each re-deriving "what counts as a child". The diff engine,
 * the linter, and provenance cannot be correct unless there is ONE
 * authoritative answer. This module is it.
 *
 * The child-carrying shapes below mirror EXACTLY what `LitRenderer.setProps`
 * renders as DOM children (see gen-ui-lit/src/lit-renderer.ts):
 *
 *   1. props.children: ElementNode[]      → sequential children       (childKind: 'children')
 *   2. props[key]:      ElementNode       → single slotted child       (childKind: 'slot')
 *   3. props[key]:      ElementNode[]      → array children (also a prop) (childKind: 'array')
 *
 * Any prop value that is NOT one of these three shapes is a data prop, never
 * a child. If the renderer's child rules change, THIS FILE changes with them —
 * and the parity test (see __tests__/traversal.parity) must be updated in lockstep.
 */

import type { ElementNode } from '@cognivo/gen-ui';

/** How a child node is attached to its parent's props. */
export type ChildKind = 'children' | 'slot' | 'array';

/** One child node, tagged with the exact prop location it lives at. */
export interface ChildSlot {
  /** The prop key on the parent (`'children'` for the children-array shape). */
  key: string;
  /** Array index when the child lives in an array (`'children'` or `'array'` kinds); null for `'slot'`. */
  index: number | null;
  /** How this child is attached — determines how diffs address and how it renders. */
  kind: ChildKind;
  /** The child node itself. */
  node: ElementNode;
}

/** Structural type guard matching gen-ui-lit's `isElementNode`. */
export function isElementNode(value: unknown): value is ElementNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as { type?: unknown }).type === 'element' &&
    typeof (value as { typeName?: unknown }).typeName === 'string'
  );
}

/** True when a prop value is an array whose first element is an ElementNode. */
function isElementNodeArray(value: unknown): value is ElementNode[] {
  return Array.isArray(value) && value.length > 0 && isElementNode(value[0]);
}

/**
 * The authoritative list of a node's direct children, in render order:
 * `children` array first (matching DOM append order), then each remaining
 * prop in `Object.entries` order — slot children and array children.
 *
 * Iteration order matches `Object.entries(props)` so it is stable and mirrors
 * how the renderer walks props. `children` is pulled out first only because the
 * renderer appends it as a contiguous run; within other props, entry order holds.
 */
export function childSlots(node: ElementNode): ChildSlot[] {
  const slots: ChildSlot[] = [];
  const props = node.props;

  // Shape 1: props.children as an ElementNode[] (sequential children).
  const children = props['children'];
  if (Array.isArray(children)) {
    children.forEach((child, index) => {
      if (isElementNode(child)) {
        slots.push({ key: 'children', index, kind: 'children', node: child });
      }
    });
  }

  for (const [key, value] of Object.entries(props)) {
    if (key === 'children') continue; // already handled above

    // Shape 2: a single nested ElementNode → slotted child.
    if (isElementNode(value)) {
      slots.push({ key, index: null, kind: 'slot', node: value });
      continue;
    }

    // Shape 3: an array of ElementNodes → array children.
    if (isElementNodeArray(value)) {
      value.forEach((child, index) => {
        if (isElementNode(child)) {
          slots.push({ key, index, kind: 'array', node: child });
        }
      });
    }
  }

  return slots;
}

/** Visitor callback: receives the node and its path from the root. */
export type Visitor = (node: ElementNode, path: NodePath) => void;

/**
 * A stable address for a node within a tree, as a chain of steps from the root.
 * The root itself has an empty path. Each step names the prop key, the child
 * kind, and (for array-shaped children) the index.
 */
export type NodePath = PathStep[];

export interface PathStep {
  key: string;
  kind: ChildKind;
  index: number | null;
}

/**
 * Depth-first pre-order walk. Visits the root, then each child (in `childSlots`
 * order) recursively. `visit` receives the absolute `NodePath` to each node so
 * callers (diff, linter, provenance) can address nodes without re-deriving paths.
 */
export function walk(root: ElementNode, visit: Visitor): void {
  const recurse = (node: ElementNode, path: NodePath): void => {
    visit(node, path);
    for (const slot of childSlots(node)) {
      recurse(slot.node, [...path, { key: slot.key, kind: slot.kind, index: slot.index }]);
    }
  };
  recurse(root, []);
}

/** Count total nodes in a tree (root included). */
export function nodeCount(root: ElementNode): number {
  let n = 0;
  walk(root, () => {
    n += 1;
  });
  return n;
}

/** Maximum nesting depth of a tree (root = depth 0). */
export function maxDepth(root: ElementNode): number {
  let deepest = 0;
  walk(root, (_node, path) => {
    if (path.length > deepest) deepest = path.length;
  });
  return deepest;
}
