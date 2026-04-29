import type { SceneNode, SceneQuery } from '@cognivo/lens-core';

/**
 * Map of node id → SceneNode, built once per detect() call so that
 * descendant walks in `hasAccessibleName` don't pay an O(N) graph search per
 * candidate. Caller responsibility: build with `buildNodeLookup(scene)` at the
 * top of detect().
 */
export type NodeLookup = ReadonlyMap<string, SceneNode>;

export function buildNodeLookup(scene: SceneQuery): NodeLookup {
  const m = new Map<string, SceneNode>();
  for (const node of scene.raw.nodes) m.set(node.id, node);
  return m;
}

/**
 * Does the node carry a non-empty aria-supplied name?
 * Used for elements whose text content is NOT their accessible name —
 * landmarks, dialogs, regions — where the name must be supplied externally.
 */
export function hasAriaName(node: SceneNode): boolean {
  const ariaLabel = node.attributes['aria-label'];
  if (typeof ariaLabel === 'string' && ariaLabel.trim() !== '') return true;

  const ariaLabelledBy = node.attributes['aria-labelledby'];
  if (typeof ariaLabelledBy === 'string' && ariaLabelledBy.trim() !== '') return true;

  return false;
}

/**
 * Does the node carry a non-empty accessible name?
 *
 * Approximates the WAI-ARIA name calculation, in priority order:
 *   1. aria-label / aria-labelledby
 *   2. textContent (covers `<svg><title>`, plain text, etc.)
 *   3. descendant `<img>` with a non-empty alt — img has no textContent of
 *      its own, so we have to walk for it explicitly. Used by buttons + links.
 *
 * NOT consulted: associated `<label for=>` (input-specific, handled by
 * input-without-label).
 */
export function hasAccessibleName(node: SceneNode, lookup: NodeLookup): boolean {
  if (hasAriaName(node)) return true;
  if (typeof node.text === 'string' && node.text.trim() !== '') return true;
  if (hasDescendantImgWithAlt(node, lookup)) return true;
  return false;
}

function hasDescendantImgWithAlt(root: SceneNode, lookup: NodeLookup): boolean {
  const stack = [...root.children];
  while (stack.length > 0) {
    const id = stack.pop()!;
    const node = lookup.get(id);
    if (!node) continue;
    if (node.tag === 'img') {
      const alt = node.attributes['alt'];
      if (typeof alt === 'string' && alt.trim() !== '') return true;
    }
    if (node.children.length > 0) stack.push(...node.children);
  }
  return false;
}
