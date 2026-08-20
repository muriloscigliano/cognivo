/**
 * Shared ElementNode fixtures for compose tests. Hand-built trees exercising all
 * three child-carrying shapes: children[], slot, and array-prop children.
 */

import type { ElementNode } from '@cognivo/gen-ui';

export function el(typeName: string, props: Record<string, unknown> = {}): ElementNode {
  return { type: 'element', typeName, props, partial: false };
}

/** A dashboard: root Stack with a children[] of two Cards, one holding a slotted header. */
export function dashboard(): ElementNode {
  return el('Stack', {
    region: 'main',
    children: [
      el('MetricCard', { title: 'Revenue', value: 42, span: 6 }),
      el('InsightCard', {
        title: 'Trend',
        span: 6,
        header: el('Badge', { label: 'new' }), // slot child
      }),
    ],
  });
}

/** Same tree with the second card's value changed and a third card appended. */
export function dashboardEdited(): ElementNode {
  return el('Stack', {
    region: 'main',
    children: [
      el('MetricCard', { title: 'Revenue', value: 99, span: 6 }), // value changed
      el('InsightCard', {
        title: 'Trend',
        span: 6,
        header: el('Badge', { label: 'updated' }), // slot child prop changed
      }),
      el('MetricCard', { title: 'Cost', value: 10, span: 6 }), // appended
    ],
  });
}
