import { describe, it, expect } from 'vitest';
import {
  COMPOSITION_MODIFY_TOOL,
  GRAMMAR_BLOCKED_PREFIX,
  proposeComposition,
  summarizeDiff,
  touchedEntities,
} from '../bridge/action-proposal.js';
import { diff } from '../diff/diff.js';
import { apply, StaleDiffError } from '../diff/apply.js';
import { hashTree } from '../tree/hash.js';
import type { LayoutGrammar } from '../grammar/types.js';
import { el, dashboard, dashboardEdited } from './fixtures.js';
import {
  assertWellFormed,
  isInferenceOnly,
  gate,
  emptyRunContext,
  InMemoryTrustLedger,
  type RunContext,
} from '@cognivo/core';

const grammar: LayoutGrammar = {
  columns: 12,
  regions: [
    { name: 'hero', aboveFold: true },
    { name: 'main' },
  ],
  rules: [
    { kind: 'max-instances', component: 'MetricCard', max: 2 },
    { kind: 'min-span', component: 'InsightCard', cols: 4 },
    { kind: 'max-nesting', depth: 4 },
  ],
};

function propose(over: { baseTree?: ReturnType<typeof dashboard>; target?: ReturnType<typeof dashboard> } = {}) {
  const baseTree = over.baseTree ?? dashboard();
  const target = over.target ?? dashboardEdited();
  const d = diff(baseTree, target);
  return proposeComposition({
    id: 'cp1',
    runId: 'r1',
    prompt: 'add a cost card and bump revenue',
    baseTree,
    diff: d,
    grammar,
  });
}

describe('summarizeDiff', () => {
  it('is a one-line summary mentioning op counts', () => {
    const d = diff(dashboard(), dashboardEdited());
    const summary = summarizeDiff(d);
    expect(summary).not.toContain('\n');
    expect(summary.length).toBeGreaterThan(0);
    expect(summary).toMatch(/\d/);
  });

  it('says "no changes" for an empty diff', () => {
    expect(summarizeDiff({ baseHash: 'h', ops: [] })).toBe('no changes');
  });
});

describe('touchedEntities', () => {
  it('names added nodes by component type and path', () => {
    const d = diff(dashboard(), dashboardEdited());
    const entities = touchedEntities(d);
    expect(entities.length).toBeGreaterThan(0);
    expect(entities.some((e) => e.includes('MetricCard'))).toBe(true);
  });

  it('names setProp ops by key', () => {
    const base = el('Card', { title: 'a' });
    const target = el('Card', { title: 'b' });
    const entities = touchedEntities(diff(base, target));
    expect(entities.some((e) => e.includes('title'))).toBe(true);
  });

  it('dedupes repeated entities', () => {
    const d = diff(dashboard(), dashboardEdited());
    const entities = touchedEntities(d);
    expect(new Set(entities).size).toBe(entities.length);
  });
});

describe('proposeComposition', () => {
  it('produces a well-formed reversible proposal wrapping the diff', () => {
    const { proposal } = propose();
    expect(() => assertWellFormed(proposal)).not.toThrow();
    expect(proposal.id).toBe('cp1');
    expect(proposal.runId).toBe('r1');
    expect(proposal.tool).toBe(COMPOSITION_MODIFY_TOOL);
    expect(proposal.reversibility).toBe('reversible');
    expect(proposal.rationale).toBe('add a cost card and bump revenue');
    expect(proposal.blastRadius.scope).toBe('self');
    expect(proposal.blastRadius.irreversibleSideEffects).toEqual([]);
    expect(proposal.blastRadius.entities.length).toBeGreaterThan(0);
  });

  it('grounding provenance: document (the base tree) + inference — NOT inference-only', () => {
    const baseTree = dashboard();
    const { proposal } = propose({ baseTree });
    expect(proposal.provenance).toEqual([
      { kind: 'document', docId: `tree:${hashTree(baseTree)}` },
      { kind: 'inference' },
    ]);
    expect(isInferenceOnly(proposal.provenance)).toBe(false);
  });

  it('candidate is exactly apply(base, diff) and a clean result lints clean', () => {
    const baseTree = dashboard();
    const target = dashboardEdited();
    const d = diff(baseTree, target);
    const { candidate, violations } = proposeComposition({
      id: 'cp1', runId: 'r1', prompt: 'p', baseTree, diff: d, grammar,
    });
    expect(candidate).toEqual(apply(baseTree, d));
    expect(candidate).toEqual(target);
    expect(violations).toEqual([]);
  });

  it('linter-as-gate: a violating candidate returns violations AND the proposal', () => {
    // dashboardEdited has 2 MetricCards; add a 3rd → breaks max-instances: 2.
    const target = dashboardEdited();
    (target.props['children'] as unknown[]).push(el('MetricCard', { title: 'x', value: 1, span: 6 }));
    const { proposal, violations } = propose({ target });
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0]!.rule).toMatchObject({ kind: 'max-instances', component: 'MetricCard' });
    expect(proposal.tool).toBe(COMPOSITION_MODIFY_TOOL); // still constructed — UI shows WHY it was blocked
  });

  it('a blocked proposal is stamped so it survives serialization distinguishably', () => {
    const target = dashboardEdited();
    (target.props['children'] as unknown[]).push(el('MetricCard', { title: 'x', value: 1, span: 6 }));
    const { proposal, violations } = propose({ target });
    expect(proposal.summary.startsWith(GRAMMAR_BLOCKED_PREFIX)).toBe(true);
    expect(
      proposal.blastRadius.entities.filter((e) => e.startsWith('grammar-violation:')).length,
    ).toBe(violations.length);
    // clean proposals carry neither marker
    const clean = propose();
    expect(clean.proposal.summary.startsWith(GRAMMAR_BLOCKED_PREFIX)).toBe(false);
    expect(clean.proposal.blastRadius.entities.some((e) => e.startsWith('grammar-violation:'))).toBe(false);
  });

  it('a stale diff throws StaleDiffError (concurrency guard intact)', () => {
    const d = diff(dashboard(), dashboardEdited());
    const otherTree = el('Stack', { children: [el('Badge', { label: 'x' })] });
    expect(() => proposeComposition({
      id: 'cp1', runId: 'r1', prompt: 'p', baseTree: otherTree, diff: d, grammar,
    })).toThrow(StaleDiffError);
  });

  it('input carries the diff verbatim', () => {
    const baseTree = dashboard();
    const d = diff(baseTree, dashboardEdited());
    const { proposal } = proposeComposition({
      id: 'cp1', runId: 'r1', prompt: 'p', baseTree, diff: d, grammar,
    });
    expect(proposal.input).toBe(d);
  });
});

describe('composition proposals through the core gate', () => {
  it('clean reversible grounded composition gates auto on a contained run', () => {
    const { proposal } = propose();
    expect(gate(proposal, emptyRunContext('r1'), new InMemoryTrustLedger())).toBe('auto');
  });

  it("a damaged RunContext gates a composition 'confirm' (host must thread the context — see composition-resolved)", () => {
    const { proposal } = propose();
    const damaged: RunContext = {
      runId: 'r1',
      cumulativeBlastRadius: { scope: 'workspace', entities: ['db'], irreversibleSideEffects: ['sent email'] },
    };
    expect(gate(proposal, damaged, new InMemoryTrustLedger())).toBe('confirm');
  });
});

describe('public API surface — bridge', () => {
  it('re-exports the bridge from the package root', async () => {
    const mod = await import('../index.js');
    expect(typeof mod.proposeComposition).toBe('function');
    expect(typeof mod.summarizeDiff).toBe('function');
    expect(typeof mod.touchedEntities).toBe('function');
    expect(mod.COMPOSITION_MODIFY_TOOL).toBe('composition.modify');
  });
});
