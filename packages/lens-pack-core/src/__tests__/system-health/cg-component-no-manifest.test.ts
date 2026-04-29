import { describe, it, expect } from 'vitest';
import type { SceneNode } from '@cognivo/lens-core';
import { RuleEngine } from '@cognivo/lens-core';
import rule, { RULE_ID } from '../../rules/system-health/cg-component-no-manifest.js';
import { makeNode, makeGraph } from '../helpers/scene.js';

function evaluateRule(nodes: SceneNode[]): string[] {
  const engine = new RuleEngine();
  engine.registerSync([rule]);
  return engine.evaluate(makeGraph(nodes), 'unknown').map((f) => f.ruleId);
}

describe(RULE_ID, () => {
  it('fires on a cg-* element with no manifest', () => {
    const ids = evaluateRule([makeNode({ id: 'a', tag: 'cg-button' })]);
    expect(ids).toContain(RULE_ID);
  });

  it('fires on an ai-* element with no manifest', () => {
    const ids = evaluateRule([makeNode({ id: 'a', tag: 'ai-avatar' })]);
    expect(ids).toContain(RULE_ID);
  });

  it('does not fire when the component carries a manifest', () => {
    const ids = evaluateRule([
      makeNode({
        id: 'a',
        tag: 'cg-button',
        componentManifest: { tagName: 'cg-button', engagedBiasIds: [] },
      }),
    ]);
    expect(ids).not.toContain(RULE_ID);
  });

  it('does not fire on plain HTML elements', () => {
    const ids = evaluateRule([makeNode({ id: 'a', tag: 'div' })]);
    expect(ids).not.toContain(RULE_ID);
  });

  it('does not fire on bias-* wrappers (only cg- and ai- are checked)', () => {
    const ids = evaluateRule([makeNode({ id: 'a', tag: 'bias-anchoring' })]);
    expect(ids).not.toContain(RULE_ID);
  });
});
