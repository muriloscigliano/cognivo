/**
 * THE parity test (plan §4). Proves the framework-agnostic `childSlots`
 * traversal agrees with what the real `LitRenderer` actually appends to the DOM.
 * If these ever diverge, diffs would address the wrong element and corrupt the
 * tree — so this test is the safety net that lets the diff engine trust paths.
 *
 * Strategy: render a tree through the real LitRenderer, stamp paths onto the DOM
 * via the lockstep locator, then assert:
 *   (a) every node childSlots reaches has a stamped DOM element, and
 *   (b) the tag of that element matches the node's typeName.
 * Independently, we count the DOM's real (non-slot, non-shimmer) child elements
 * per node and assert it equals the count childSlots yields for that node's
 * children/array kinds — catching any over- or under-claiming.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { LitRenderer } from '@cognivo/gen-ui-lit';
import type { ElementNode, Library } from '@cognivo/gen-ui';
import { childSlots, walk, formatPath } from '@cognivo/compose';
import { rootElementOf, stampPaths, PATH_ATTR, cssEscape } from '../dom-locator.js';

/** getTagName stub covering every typeName the fixtures use. */
const TAGS: Record<string, string> = {
  Stack: 'cg-stack',
  Grid: 'cg-grid',
  MetricCard: 'ai-metric-card',
  InsightCard: 'ai-insight-card',
  Badge: 'cg-badge',
  Table: 'cg-table',
  Row: 'cg-row',
};
const library = {
  getTagName: (t: string) => TAGS[t] ?? null,
} as unknown as Library;

function el(typeName: string, props: Record<string, unknown> = {}): ElementNode {
  return { type: 'element', typeName, props, partial: false };
}

function toResult(root: ElementNode) {
  return {
    root,
    meta: { incomplete: false, unresolved: [], statementCount: 0, validationErrors: [], tokenViolations: [] },
  } as any;
}

/** Real child elements the renderer created (excludes slotted + shimmer). */
function realChildEls(el: HTMLElement): HTMLElement[] {
  return Array.from(el.children).filter(
    (c): c is HTMLElement => c instanceof HTMLElement && !c.hasAttribute('data-partial-indicator') && !c.slot,
  );
}

describe('childSlots ⇄ LitRenderer parity', () => {
  let container: HTMLElement;
  let renderer: LitRenderer;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new LitRenderer(library);
  });

  const trees: Record<string, () => ElementNode> = {
    'children[] array': () =>
      el('Stack', { children: [el('MetricCard', { value: 1 }), el('MetricCard', { value: 2 })] }),
    'single slot child': () =>
      el('InsightCard', { title: 't', header: el('Badge', { label: 'new' }) }),
    'array-prop children': () =>
      el('Table', { rows: [el('Row', { a: 1 }), el('Row', { a: 2 }), el('Row', { a: 3 })] }),
    'mixed: children[] + slot + nesting': () =>
      el('Stack', {
        children: [
          el('MetricCard', { value: 1 }),
          el('InsightCard', { title: 't', header: el('Badge', { label: 'x' }) }),
        ],
      }),
    'deep nesting': () =>
      el('Grid', {
        children: [el('Stack', { children: [el('InsightCard', { header: el('Badge', {}) })] })],
      }),
  };

  for (const [name, make] of Object.entries(trees)) {
    it(`agrees on "${name}"`, () => {
      const tree = make();
      renderer.render(toResult(tree), container);
      const rootEl = rootElementOf(container);
      expect(rootEl, 'root element must be locatable').not.toBeNull();

      stampPaths(tree, rootEl!);

      // (a) + (b): every node childSlots reaches maps to a stamped element with the right tag.
      walk(tree, (node, path) => {
        const key = formatPath(path);
        const stamped = container.querySelector(`[${PATH_ATTR}="${cssEscape(key)}"]`) as HTMLElement | null;
        expect(stamped, `node at ${key} (${node.typeName}) must have a stamped element`).not.toBeNull();
        expect(stamped!.tagName.toLowerCase()).toBe(TAGS[node.typeName]);
      });

      // Real-child counts must match per node (catches over/under-claiming).
      walk(tree, (node, path) => {
        const domEl = container.querySelector(`[${PATH_ATTR}="${cssEscape(formatPath(path))}"]`) as HTMLElement;
        const expectedReal = childSlots(node).filter((s) => s.kind !== 'slot').length;
        expect(realChildEls(domEl).length, `real child count at ${formatPath(path)}`).toBe(expectedReal);
      });
    });
  }
});
