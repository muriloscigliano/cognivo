/**
 * @cognivo/compose — Serializable composition diff.
 *
 * A `CompositionDiff` is what an agent emits to MODIFY an existing composition,
 * instead of re-streaming a whole tree. It targets `ElementNode` paths through
 * `props` (see tree/traversal.ts) — deliberately NOT RFC-6902 JSON-Patch, because
 * our addresses are prop-path/child-kind pairs (not JSON pointers) and `move`
 * needs first-class support for the "reorder a region" case the grammar cares about.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { NodePath } from '../tree/traversal.js';

export type DiffOp =
  /** Insert `node` into a container at `path` (path's last step = insertion site). */
  | { op: 'add'; path: NodePath; node: ElementNode }
  /** Remove the node at `path`. */
  | { op: 'remove'; path: NodePath }
  /** Replace the whole node at `path` with `node`. */
  | { op: 'replace'; path: NodePath; node: ElementNode }
  /** Set a single (non-child) prop on the node at `path`. `value: null` deletes it. */
  | { op: 'setProp'; path: NodePath; key: string; value: unknown }
  /** Move the node at `from` to the container site `to`. */
  | { op: 'move'; from: NodePath; to: NodePath };

export interface CompositionDiff {
  /** Hash of the tree this diff was computed against (see tree/hash.ts). */
  baseHash: string;
  ops: DiffOp[];
}
