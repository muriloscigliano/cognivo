import type { PageIntent } from '../types/classifier.js';
import type { SceneGraph } from '../types/scene-graph.js';
import { walkAll } from '../helpers/walk.js';
import { isValidIntent } from './intents.js';

/**
 * Stage 1 — Developer override (Spec §5.2).
 *
 * The escape hatch. The host page tells us what kind of page this is via:
 *   1. `<meta name="lens-intent" content="pricing">`
 *   2. `<cg-lens intent="pricing">` element somewhere on the page
 *   3. `data-lens-intent="pricing"` attribute on `<html>` or `<body>`
 *
 * Returns the resolved PageIntent, or null if no override is declared.
 */
export function detectOverride(scene: SceneGraph): PageIntent | null {
  for (const node of walkAll(scene)) {
    // Meta tag
    if (node.tag === 'meta' && node.attributes['name'] === 'lens-intent') {
      const content = node.attributes['content'];
      if (content && isValidIntent(content)) return content;
    }

    // <cg-lens intent="..."> element
    if (node.tag === 'cg-lens') {
      const intent = node.attributes['intent'];
      if (intent && isValidIntent(intent)) return intent;
    }

    // data-lens-intent on html or body
    if ((node.tag === 'html' || node.tag === 'body') && node.attributes['data-lens-intent']) {
      const intent = node.attributes['data-lens-intent'];
      if (intent && isValidIntent(intent)) return intent;
    }
  }

  return null;
}
