import { describe, it, expect } from 'vitest';
import { diff } from '../diff/diff.js';
import { apply, StaleDiffError } from '../diff/apply.js';
import { hashTree } from '../tree/hash.js';
import { el, dashboard, dashboardEdited } from './fixtures.js';

describe('diff/apply round-trip — the correctness anchor', () => {
  it('apply(before, diff(before, after)) deep-equals after', () => {
    const before = dashboard();
    const after = dashboardEdited();
    const d = diff(before, after);
    expect(apply(before, d)).toEqual(after);
  });

  it('handles a slot child prop change', () => {
    const before = el('Card', { header: el('Badge', { label: 'a' }) });
    const after = el('Card', { header: el('Badge', { label: 'b' }) });
    expect(apply(before, diff(before, after))).toEqual(after);
  });

  it('handles slot child removal and addition', () => {
    const withSlot = el('Card', { title: 't', header: el('Badge', { label: 'x' }) });
    const withoutSlot = el('Card', { title: 't' });
    expect(apply(withSlot, diff(withSlot, withoutSlot))).toEqual(withoutSlot);
    expect(apply(withoutSlot, diff(withoutSlot, withSlot))).toEqual(withSlot);
  });

  it('handles array child removal (high-index-first ordering)', () => {
    const before = el('Stack', {
      children: [el('A', {}), el('B', {}), el('C', {})],
    });
    const after = el('Stack', { children: [el('A', {})] });
    expect(apply(before, diff(before, after))).toEqual(after);
  });

  it('handles a component swap as a replace', () => {
    const before = el('Stack', { children: [el('MetricCard', { value: 1 })] });
    const after = el('Stack', { children: [el('InsightCard', { title: 't' })] });
    const d = diff(before, after);
    expect(d.ops.some((o) => o.op === 'replace')).toBe(true);
    expect(apply(before, d)).toEqual(after);
  });

  it('handles a root replace when root typeName differs', () => {
    const before = el('Stack', {});
    const after = el('Grid', {});
    expect(apply(before, diff(before, after))).toEqual(after);
  });

  it('setProp with null deletes the prop', () => {
    const before = el('Card', { title: 't', subtitle: 's' });
    const after = el('Card', { title: 't' });
    expect(apply(before, diff(before, after))).toEqual(after);
  });
});

describe('immutability', () => {
  it('does not mutate the input tree', () => {
    const before = dashboard();
    const snapshot = JSON.parse(JSON.stringify(before));
    apply(before, diff(before, dashboardEdited()));
    expect(before).toEqual(snapshot);
  });
});

describe('stale-diff guard', () => {
  it('throws StaleDiffError when baseHash does not match', () => {
    const before = dashboard();
    const d = diff(before, dashboardEdited());
    const drifted = { ...before, props: { ...before.props, region: 'sidebar' } };
    expect(() => apply(drifted, d)).toThrow(StaleDiffError);
  });

  it('baseHash equals hash of the before tree', () => {
    const before = dashboard();
    expect(diff(before, dashboardEdited()).baseHash).toBe(hashTree(before));
  });
});

describe('hashTree', () => {
  it('is stable across prop key ordering', () => {
    const a = el('Card', { title: 't', value: 1 });
    const b = el('Card', { value: 1, title: 't' });
    expect(hashTree(a)).toBe(hashTree(b));
  });

  it('changes when a value changes', () => {
    expect(hashTree(el('Card', { value: 1 }))).not.toBe(hashTree(el('Card', { value: 2 })));
  });
});
