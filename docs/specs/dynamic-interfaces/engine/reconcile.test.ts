/**
 * A3 — keyed reconcile tests. Architecture: ../01-architecture.md §L3.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/reconcile.test.ts
 *
 * The key proof: across re-renders, unchanged nodes keep the SAME element object
 * (identity preserved) — no remount, no flicker, focus/scroll/input survive.
 */
import { describe, it, expect } from 'vitest';
import { createTestReconciler } from './reconcile.js';
import { type RenderNode } from './template-resolver.js';
import { type ComponentRegistry } from './governance.js';

const registry: ComponentRegistry = {
  getTagName: (t) => (['Stack', 'RichRow', 'Badge', 'Text'].includes(t) ? `cg-${t.toLowerCase()}` : undefined),
};

const stack = (id: string, children: RenderNode[]): RenderNode => ({ id, type: 'Stack', props: {}, children });
const row = (id: string, title: string): RenderNode => ({ id, type: 'RichRow', props: { title }, children: [] });

describe('A3 — initial render', () => {
  it('creates the tree and mounts a root', () => {
    const { reconciler, getRoot } = createTestReconciler(registry);
    const stats = reconciler.render(stack('root', [row('r0', 'A'), row('r1', 'B')]));
    expect(stats.created).toBe(3);
    expect(getRoot()!.tagName).toBe('cg-stack');
    expect(getRoot()!.children).toHaveLength(2);
    expect(getRoot()!.children[0].props.title).toBe('A');
  });
});

describe('A3 — keyed reconcile preserves identity (THE no-flicker property)', () => {
  it('unchanged rows keep the SAME element object across re-render', () => {
    const { reconciler, getRoot } = createTestReconciler(registry);
    reconciler.render(stack('root', [row('r0', 'A'), row('r1', 'B')]));
    const before0 = getRoot()!.children[0];
    const before1 = getRoot()!.children[1];

    // Re-render with r0 changed, r1 unchanged.
    reconciler.render(stack('root', [row('r0', 'A-edited'), row('r1', 'B')]));
    const after0 = getRoot()!.children[0];
    const after1 = getRoot()!.children[1];

    expect(after0).toBe(before0); // same element object — updated in place, not recreated
    expect(after1).toBe(before1); // untouched
    expect(after0.props.title).toBe('A-edited'); // prop updated
  });

  it('updates only what changed (stats reflect minimal work)', () => {
    const { reconciler } = createTestReconciler(registry);
    reconciler.render(stack('root', [row('r0', 'A'), row('r1', 'B')]));
    const stats = reconciler.render(stack('root', [row('r0', 'A2'), row('r1', 'B')]));
    expect(stats.created).toBe(0); // nothing new created
    expect(stats.updated).toBeGreaterThanOrEqual(1); // r0 updated
  });
});

describe('A3 — add / remove by id', () => {
  it('adds a new row without recreating existing ones', () => {
    const { reconciler, getRoot } = createTestReconciler(registry);
    reconciler.render(stack('root', [row('r0', 'A')]));
    const before0 = getRoot()!.children[0];
    const stats = reconciler.render(stack('root', [row('r0', 'A'), row('r1', 'B')]));
    expect(getRoot()!.children).toHaveLength(2);
    expect(getRoot()!.children[0]).toBe(before0); // existing reused
    expect(stats.created).toBe(1); // only the new one created
  });

  it('removes a row that is gone', () => {
    const { reconciler, getRoot } = createTestReconciler(registry);
    reconciler.render(stack('root', [row('r0', 'A'), row('r1', 'B')]));
    const stats = reconciler.render(stack('root', [row('r0', 'A')]));
    expect(getRoot()!.children).toHaveLength(1);
    expect(stats.removed).toBe(1);
  });
});

describe('A3 — same id, different type → replace', () => {
  it('replaces an element whose type changed', () => {
    const { reconciler, getRoot } = createTestReconciler(registry);
    reconciler.render(stack('root', [{ id: 'x', type: 'RichRow', props: { title: 'a' }, children: [] }]));
    reconciler.render(stack('root', [{ id: 'x', type: 'Badge', props: { label: 'a' }, children: [] }]));
    expect(getRoot()!.children[0].tagName).toBe('cg-badge');
  });
});
