/**
 * @cognivo/compose — Apply a diff to a tree (pure, immutable).
 *
 * `apply(tree, diff)` returns a NEW tree. It refuses a stale diff: if
 * `hash(tree) !== diff.baseHash`, it throws rather than corrupt the tree —
 * this is the mandatory guard from the plan (§5/§10). An agent working from an
 * out-of-date tree fails loudly.
 *
 * Ops are applied in order. Because `add`/`remove`/`move` shift array indices,
 * an agent MUST author ops against the base tree and order them so earlier ops
 * don't invalidate later paths (the diff() generator below does this). We do not
 * re-base paths between ops — that would hide authoring bugs.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { CompositionDiff, DiffOp } from './types.js';
import { getAt, transformAt, insertAt } from '../tree/path.js';
import { hashTree } from '../tree/hash.js';

export class StaleDiffError extends Error {
  constructor(expected: string, actual: string) {
    super(`Stale diff: baseHash ${expected} does not match current tree ${actual}`);
    this.name = 'StaleDiffError';
  }
}

/** Apply one op to a tree, returning the new tree. */
function applyOp(tree: ElementNode, op: DiffOp): ElementNode {
  switch (op.op) {
    case 'add':
      return insertAt(tree, op.path, op.node);

    case 'remove':
      return transformAt(tree, op.path, () => null);

    case 'replace':
      return transformAt(tree, op.path, () => op.node);

    case 'setProp':
      return transformAt(tree, op.path, (node) => {
        const props = { ...node.props };
        if (op.value === null) delete props[op.key];
        else props[op.key] = op.value;
        return { ...node, props };
      });

    case 'move': {
      const moving = getAt(tree, op.from);
      if (!moving) throw new Error(`move: source path does not resolve: ${JSON.stringify(op.from)}`);
      const removed = transformAt(tree, op.from, () => null);
      return insertAt(removed, op.to, moving);
    }
  }
}

/**
 * Apply a diff to a tree. Throws `StaleDiffError` if the diff was computed
 * against a different tree. Returns a new, unshared-on-the-path tree.
 */
export function apply(tree: ElementNode, diff: CompositionDiff): ElementNode {
  const actual = hashTree(tree);
  if (actual !== diff.baseHash) throw new StaleDiffError(diff.baseHash, actual);

  let result = tree;
  for (const op of diff.ops) {
    result = applyOp(result, op);
  }
  return result;
}
