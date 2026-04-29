import { describe, it, expect } from 'vitest';
import type { SceneNode } from '@cognivo/lens-core';
import { RuleEngine } from '@cognivo/lens-core';
import rule, { RULE_ID } from '../../rules/tokens/missing-component-tier3-token.js';
import { makeNode, makeGraph } from '../helpers/scene.js';

function nodeWith(
  tag: string,
  property: string,
  tier: 0 | 1 | 2 | 3,
  rawValue = '8px'
): SceneNode {
  return makeNode({
    id: 'n1',
    tag,
    tokenUsage: [
      { tier, property, rawValue, resolvedToken: tier === 3 ? '--cg-component-x-y' : undefined, candidates: [] },
    ],
  });
}

function ids(nodes: SceneNode[]): string[] {
  const engine = new RuleEngine();
  engine.registerSync([rule]);
  return engine.evaluate(makeGraph(nodes), 'unknown').map((f) => f.ruleId);
}

describe(RULE_ID, () => {
  it('fires on a cg-* element using a tier-1 primitive for border-radius', () => {
    expect(ids([nodeWith('cg-button', 'border-radius', 1)])).toContain(RULE_ID);
  });

  it('fires on an ai-* element using off-grid value for padding', () => {
    expect(ids([nodeWith('ai-thinking', 'padding-top', 0)])).toContain(RULE_ID);
  });

  it('does not fire when the cg-* element uses a tier-3 token', () => {
    expect(ids([nodeWith('cg-button', 'border-radius', 3)])).not.toContain(RULE_ID);
  });

  it('does not fire on plain HTML elements (rule is component-scoped)', () => {
    expect(ids([nodeWith('div', 'border-radius', 1)])).not.toContain(RULE_ID);
  });

  it('does not fire on properties outside the advisory list', () => {
    expect(ids([nodeWith('cg-button', 'background-color', 1)])).not.toContain(RULE_ID);
  });
});
