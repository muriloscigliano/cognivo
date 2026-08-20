import { describe, it, expect } from 'vitest';
import { childSlots, walk, nodeCount, maxDepth } from '../tree/traversal.js';
import { el, dashboard } from './fixtures.js';

describe('childSlots — recognizes exactly the three renderer child shapes', () => {
  it('finds children[] as sequential children', () => {
    const slots = childSlots(dashboard());
    const childrenSlots = slots.filter((s) => s.kind === 'children');
    expect(childrenSlots).toHaveLength(2);
    expect(childrenSlots[0]).toMatchObject({ key: 'children', index: 0 });
    expect(childrenSlots[0].node.typeName).toBe('MetricCard');
  });

  it('finds a single nested ElementNode as a slot child', () => {
    const insight = dashboard().props['children'] as any[];
    const slots = childSlots(insight[1]);
    const slot = slots.find((s) => s.kind === 'slot');
    expect(slot).toBeDefined();
    expect(slot!.key).toBe('header');
    expect(slot!.index).toBeNull();
    expect(slot!.node.typeName).toBe('Badge');
  });

  it('finds an array-of-ElementNodes prop as array children', () => {
    const node = el('Table', { rows: [el('Row', { a: 1 }), el('Row', { a: 2 })] });
    const slots = childSlots(node);
    expect(slots.every((s) => s.kind === 'array')).toBe(true);
    expect(slots).toHaveLength(2);
    expect(slots[1]).toMatchObject({ key: 'rows', index: 1 });
  });

  it('does NOT treat data props (strings, numbers, plain arrays) as children', () => {
    const node = el('MetricCard', { title: 'x', value: 5, tags: ['a', 'b'] });
    expect(childSlots(node)).toHaveLength(0);
  });

  it('does NOT treat an array whose first element is not an ElementNode as children', () => {
    const node = el('Chart', { series: [1, 2, 3] });
    expect(childSlots(node)).toHaveLength(0);
  });
});

describe('walk', () => {
  it('visits every node pre-order with correct paths', () => {
    const seen: string[] = [];
    walk(dashboard(), (n, path) => {
      seen.push(`${n.typeName}@${path.length}`);
    });
    expect(seen).toEqual([
      'Stack@0',
      'MetricCard@1',
      'InsightCard@1',
      'Badge@2', // the slotted header, one deeper than its InsightCard parent
    ]);
  });

  it('nodeCount and maxDepth', () => {
    expect(nodeCount(dashboard())).toBe(4);
    expect(maxDepth(dashboard())).toBe(2);
  });
});
