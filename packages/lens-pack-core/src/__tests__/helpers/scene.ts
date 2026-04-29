import type { SceneGraph, SceneNode } from '@cognivo/lens-core';

const ZERO_RECT = { x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };

/**
 * Build a SceneNode from sparse partial data — used by tests that probe
 * fields the Observer doesn't reliably populate in happy-dom (closed shadow
 * roots, component manifests, etc.) and therefore can't be exercised through
 * the full scan() path.
 */
export function makeNode(
  partial: Partial<SceneNode> & Pick<SceneNode, 'id' | 'tag'>
): SceneNode {
  return {
    id: partial.id,
    tag: partial.tag,
    attributes: partial.attributes ?? {},
    rect: partial.rect ?? ZERO_RECT,
    computedStyle: partial.computedStyle ?? {},
    tokenUsage: partial.tokenUsage ?? [],
    children: partial.children ?? [],
    visible: partial.visible ?? true,
    ...(partial.role !== undefined && { role: partial.role }),
    ...(partial.text !== undefined && { text: partial.text }),
    ...(partial.parent !== undefined && { parent: partial.parent }),
    ...(partial.shadowRoot !== undefined && { shadowRoot: partial.shadowRoot }),
    ...(partial.componentManifest !== undefined && { componentManifest: partial.componentManifest }),
    ...(partial.hasClosedShadowRoot !== undefined && { hasClosedShadowRoot: partial.hasClosedShadowRoot }),
  };
}

export function makeGraph(nodes: SceneNode[]): SceneGraph {
  if (nodes.length === 0) throw new Error('makeGraph() requires at least one node.');
  return {
    nodes,
    root: nodes[0]!,
    snapshottedAt: new Date().toISOString(),
    viewport: { width: 1024, height: 768 },
  };
}
