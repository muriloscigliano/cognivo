import type { SceneGraph, SceneNode } from '../types/scene-graph.js';

/**
 * Walk every node in a scene graph including nested shadow trees, depth-first.
 * Shared utility used by signal extractors that need full-page node iteration.
 */
export function* walkAll(graph: SceneGraph): Generator<SceneNode> {
  for (const node of graph.nodes) {
    yield node;
    if (node.shadowRoot) yield* walkAll(node.shadowRoot);
  }
}

/** Concatenate all node text across the graph (with shadow content), space-joined. */
export function collectAllText(graph: SceneGraph): string {
  const parts: string[] = [];
  for (const node of walkAll(graph)) {
    if (node.text) parts.push(node.text);
  }
  return parts.join(' ');
}
