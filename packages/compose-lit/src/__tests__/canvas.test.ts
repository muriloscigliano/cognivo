/**
 * <cg-compose-canvas> orchestration: the compose → lint → retry → render loop,
 * and the modify → preview → commit/discard loop, driven by a fake ComposeClient.
 * Verifies grammar-retry feedback is actually threaded back to the client.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import type { ElementNode, Library } from '@cognivo/gen-ui';
import { diff, hashTree } from '@cognivo/compose';
import type { LayoutGrammar, ComposeClient } from '@cognivo/compose';
import '../cg-compose-canvas.js';
import type { CgComposeCanvas } from '../cg-compose-canvas.js';

const TAGS: Record<string, string> = {
  Stack: 'cg-stack',
  MetricCard: 'ai-metric-card',
};
const library = { getTagName: (t: string) => TAGS[t] ?? null } as unknown as Library;

function el(typeName: string, props: Record<string, unknown> = {}): ElementNode {
  return { type: 'element', typeName, props, partial: false };
}

const grammar: LayoutGrammar = {
  columns: 12,
  regions: [{ name: 'main', aboveFold: true }],
  rules: [{ kind: 'max-instances', component: 'MetricCard', max: 2 }],
};

async function mount(client: ComposeClient): Promise<CgComposeCanvas> {
  const canvas = document.createElement('cg-compose-canvas') as CgComposeCanvas;
  canvas.library = library;
  canvas.grammar = grammar;
  canvas.client = client;
  document.body.appendChild(canvas);
  await canvas.updateComplete;
  return canvas;
}

describe('cg-compose-canvas', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('composes a clean tree in one shot and logs provenance', async () => {
    const tree = el('Stack', { region: 'main', children: [el('MetricCard', {})] });
    const canvas = await mount({
      compose: async () => tree,
      modify: async (_p, base) => diff(base, base),
    });
    await canvas.compose('a dashboard', 1000);
    expect(canvas.tree).toEqual(tree);
    expect(canvas.provenance.all()).toHaveLength(1);
    expect(canvas.provenance.all()[0]).toMatchObject({ id: 0, parentId: null, diff: null });
  });

  it('retries with grammar feedback when the first tree violates, then settles', async () => {
    const dirty = el('Stack', {
      region: 'main',
      children: [el('MetricCard', {}), el('MetricCard', {}), el('MetricCard', {})], // 3 > max 2
    });
    const clean = el('Stack', { region: 'main', children: [el('MetricCard', {}), el('MetricCard', {})] });
    const feedbacks: (string | undefined)[] = [];
    let call = 0;
    const canvas = await mount({
      compose: async (_p, feedback) => {
        feedbacks.push(feedback);
        return call++ === 0 ? dirty : clean;
      },
      modify: async (_p, base) => diff(base, base),
    });

    await canvas.compose('too many metrics', 1000);
    // First call has no feedback; retry call carries the violation text.
    expect(feedbacks[0]).toBeUndefined();
    expect(feedbacks[1]).toContain('max allowed is 2');
    expect(canvas.tree).toEqual(clean);
  });

  it('proposeModify → commit swaps the base and logs a diff entry', async () => {
    const base = el('Stack', { region: 'main', children: [el('MetricCard', { value: 1 })] });
    const after = el('Stack', { region: 'main', children: [el('MetricCard', { value: 2 })] });
    const canvas = await mount({
      compose: async () => base,
      modify: async (_p, b) => diff(b, after),
    });
    await canvas.compose('start', 1000);
    const res = await canvas.proposeModify('bump the value');
    expect(res.ok).toBe(true);
    canvas.commit(2000);
    expect(canvas.tree).toEqual(after);
    const log = canvas.provenance.all();
    expect(log).toHaveLength(2);
    expect(log[1]).toMatchObject({ id: 1, parentId: 0 });
    expect(log[1]?.diff).not.toBeNull();
    expect(log[1]?.treeHash).toBe(hashTree(after));
  });

  it('proposeModify rejects a candidate that violates the grammar and discards it', async () => {
    const base = el('Stack', { region: 'main', children: [el('MetricCard', {}), el('MetricCard', {})] });
    const overLimit = el('Stack', {
      region: 'main',
      children: [el('MetricCard', {}), el('MetricCard', {}), el('MetricCard', {})],
    });
    const canvas = await mount({
      compose: async () => base,
      modify: async (_p, b) => diff(b, overLimit),
    });
    await canvas.compose('start', 1000);
    const res = await canvas.proposeModify('add another metric');
    expect(res.ok).toBe(false);
    expect(res.violations.some((v) => v.rule.kind === 'max-instances')).toBe(true);
    expect(canvas.tree).toEqual(base); // base unchanged
    expect(canvas.provenance.all()).toHaveLength(1);
  });

  it('emits a governed composition-proposal on a clean modify', async () => {
    const base = el('Stack', { region: 'main', children: [el('MetricCard', { value: 1 })] });
    const after = el('Stack', { region: 'main', children: [el('MetricCard', { value: 9 })] });
    const canvas = await mount({ compose: async () => base, modify: async (_p, b) => diff(b, after) });
    canvas.runId = 'run-42';
    const details: Array<{ proposal: { id: string; runId: string; tool: string; rationale: string; reversibility: string; provenance: unknown[] }; violations: unknown[] }> = [];
    canvas.addEventListener('composition-proposal', (e) => details.push((e as CustomEvent).detail));
    await canvas.compose('start', 1000);
    await canvas.proposeModify('bump the value');
    expect(details).toHaveLength(1);
    const { proposal, violations } = details[0]!;
    expect(violations).toEqual([]);
    expect(proposal.id).toBe('p0');
    expect(proposal.runId).toBe('run-42');
    expect(proposal.tool).toBe('composition.modify');
    expect(proposal.rationale).toBe('bump the value');
    expect(proposal.reversibility).toBe('reversible');
    expect(proposal.provenance).toEqual([
      { kind: 'document', docId: `tree:${hashTree(base)}` },
      { kind: 'inference' },
    ]);
    // ids are deterministic per canvas
    await canvas.proposeModify('bump the value');
    expect(details[1]!.proposal.id).toBe('p1');
  });

  it('a lint-blocked modify still emits the proposal WITH its violations', async () => {
    const base = el('Stack', { region: 'main', children: [el('MetricCard', {}), el('MetricCard', {})] });
    const overLimit = el('Stack', {
      region: 'main',
      children: [el('MetricCard', {}), el('MetricCard', {}), el('MetricCard', {})],
    });
    const canvas = await mount({
      compose: async () => base,
      modify: async (_p, b) => diff(b, overLimit),
    });
    const details: Array<{ violations: Array<{ rule: { kind: string } }> }> = [];
    canvas.addEventListener('composition-proposal', (e) => details.push((e as CustomEvent).detail));
    await canvas.compose('start', 1000);
    const res = await canvas.proposeModify('add another metric');
    expect(res.ok).toBe(false);
    expect(details).toHaveLength(1);
    expect(details[0]!.violations.some((v) => v.rule.kind === 'max-instances')).toBe(true);
  });

  it('emits composition-committed on commit', async () => {
    const base = el('Stack', { region: 'main', children: [el('MetricCard', { value: 1 })] });
    const after = el('Stack', { region: 'main', children: [el('MetricCard', { value: 9 })] });
    const canvas = await mount({ compose: async () => base, modify: async (_p, b) => diff(b, after) });
    await canvas.compose('start', 1000);
    await canvas.proposeModify('bump');
    let committed: ElementNode | null = null;
    canvas.addEventListener('composition-committed', (e) => {
      committed = (e as CustomEvent).detail.tree;
    });
    canvas.commit(2000);
    expect(committed).toEqual(after);
  });
});
