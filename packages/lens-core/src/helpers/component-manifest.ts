import type { SceneNode, ComponentManifestRef } from '../types/scene-graph.js';

const COGNIVO_TAG_PREFIXES = ['cg-', 'ai-', 'bias-'] as const;

/**
 * Resolve the component-manifest reference for a SceneNode.
 *
 * If the Observer attached a manifest during scan (via component-aware
 * integration), return that. Otherwise infer from tag prefix conventions:
 *  - `cg-*` / `ai-*` / `bias-*` are recognized as Cognivo custom elements.
 *  - The `engagedBiasIds` array is left empty here; the rule engine fills it
 *    by consulting `@cognivo/components` manifests at runtime if available.
 *
 * Returns undefined for plain HTML nodes — saves rules from null-checking.
 */
export function getComponentManifest(node: SceneNode): ComponentManifestRef | undefined {
  if (node.componentManifest) return node.componentManifest;

  const isCognivoTag = COGNIVO_TAG_PREFIXES.some((prefix) => node.tag.startsWith(prefix));
  if (!isCognivoTag) return undefined;

  const variant = node.attributes['variant'];
  const state = node.attributes['state'] ?? node.attributes['data-state'];

  return {
    tagName: node.tag,
    engagedBiasIds: [],
    ...(variant !== undefined && { variant }),
    ...(state !== undefined && { state }),
  };
}
