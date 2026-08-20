import { describe, it, expect } from 'vitest';
import { lint } from '../grammar/linter.js';
import { formatRetryFeedback } from '../grammar/retry.js';
import type { LayoutGrammar } from '../grammar/types.js';
import { el } from './fixtures.js';

const grammar: LayoutGrammar = {
  columns: 12,
  regions: [
    { name: 'hero', aboveFold: true },
    { name: 'main' },
    { name: 'sidebar' },
  ],
  rules: [
    { kind: 'max-instances', component: 'MetricCard', max: 2 },
    { kind: 'min-span', component: 'InsightCard', cols: 4 },
    { kind: 'region', component: 'Nav', allowedRegions: ['sidebar'] },
    { kind: 'above-fold', component: 'HeroBanner' },
    { kind: 'max-nesting', depth: 3 },
  ],
};

describe('lint', () => {
  it('passes a clean tree', () => {
    const tree = el('Stack', {
      region: 'main',
      children: [el('MetricCard', { span: 6 }), el('InsightCard', { span: 6 })],
    });
    expect(lint(tree, grammar)).toEqual([]);
  });

  it('flags max-instances', () => {
    const tree = el('Stack', {
      region: 'main',
      children: [el('MetricCard', {}), el('MetricCard', {}), el('MetricCard', {})],
    });
    const v = lint(tree, grammar);
    expect(v).toHaveLength(1);
    expect(v[0].rule.kind).toBe('max-instances');
    expect(v[0].message).toContain('appears 3 times');
  });

  it('flags min-span below minimum', () => {
    const tree = el('Stack', { region: 'main', children: [el('InsightCard', { span: 2 })] });
    const v = lint(tree, grammar);
    expect(v.some((x) => x.rule.kind === 'min-span' && x.message.includes('spans 2'))).toBe(true);
  });

  it('flags a span wider than the grid', () => {
    const tree = el('Stack', { region: 'main', children: [el('InsightCard', { span: 16 })] });
    const v = lint(tree, grammar);
    expect(v.some((x) => x.message.includes('grid only has 12'))).toBe(true);
  });

  it('flags region violations using ancestor region', () => {
    const tree = el('Stack', { region: 'main', children: [el('Nav', {})] });
    const v = lint(tree, grammar);
    expect(v.some((x) => x.rule.kind === 'region')).toBe(true);
  });

  it('flags above-fold when component is not in an above-fold region', () => {
    const tree = el('Stack', { region: 'main', children: [el('HeroBanner', {})] });
    const v = lint(tree, grammar);
    expect(v.some((x) => x.rule.kind === 'above-fold')).toBe(true);
  });

  it('allows above-fold component when in the hero region', () => {
    const tree = el('Stack', { region: 'hero', children: [el('HeroBanner', {})] });
    expect(lint(tree, grammar).some((x) => x.rule.kind === 'above-fold')).toBe(false);
  });

  it('flags max-nesting (depth 4 exceeds max 3)', () => {
    // A@0 → B@1 → C@2 → D@3 → E@4 — E is one level past the depth-3 limit.
    const deep = el('A', {
      children: [el('B', { children: [el('C', { children: [el('D', { children: [el('E', {})] })] })] })],
    });
    const v = lint(deep, grammar);
    expect(v.some((x) => x.rule.kind === 'max-nesting')).toBe(true);
  });

  it('allows nesting exactly at the max depth', () => {
    const atLimit = el('A', { children: [el('B', { children: [el('C', { children: [el('D', {})] })] })] });
    expect(lint(atLimit, grammar).some((x) => x.rule.kind === 'max-nesting')).toBe(false);
  });
});

describe('formatRetryFeedback', () => {
  it('returns empty string for no violations', () => {
    expect(formatRetryFeedback([])).toBe('');
  });

  it('numbers each violation message', () => {
    const tree = el('Stack', {
      region: 'main',
      children: [el('MetricCard', {}), el('MetricCard', {}), el('MetricCard', {})],
    });
    const text = formatRetryFeedback(lint(tree, grammar));
    expect(text).toContain('1. ');
    expect(text).toContain('layout grammar');
  });
});
