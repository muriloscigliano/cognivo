import { describe, it, expect } from 'vitest';
import type { SceneNode } from '@cognivo/lens-core';
import { RuleEngine } from '@cognivo/lens-core';
import rule, { RULE_ID } from '../../rules/tokens/background-as-foreground.js';
import { makeNode, makeGraph } from '../helpers/scene.js';

// This rule is hard to fixture via runFixture because computed-style colors
// are determined by happy-dom's getComputedStyle output, and we can't easily
// inject a specific resolvedToken. Instead, we hand-craft SceneNodes with
// the exact tokenUsage shape the rule consumes — cleanest test path.

function nodeWithUsage(
  property: string,
  resolvedToken: string,
  tier: 0 | 1 | 2 | 3 = 2,
  tag = 'div'
): SceneNode {
  return makeNode({
    id: 'n1',
    tag,
    tokenUsage: [
      {
        tier,
        property,
        rawValue: 'rgb(255, 0, 0)',
        resolvedToken,
        candidates: [resolvedToken],
      },
    ],
  });
}

function ids(nodes: SceneNode[]): string[] {
  const engine = new RuleEngine();
  engine.registerSync([rule]);
  return engine.evaluate(makeGraph(nodes), 'unknown').map((f) => f.ruleId);
}

describe(RULE_ID, () => {
  it('fires when color: consumes a -background- token', () => {
    const node = nodeWithUsage('color', '--cg-color-action-primary-background-default');
    expect(ids([node])).toContain(RULE_ID);
  });

  it('fires when border-color consumes a -background- token', () => {
    const node = nodeWithUsage('border-color', '--cg-color-status-success-background-default');
    expect(ids([node])).toContain(RULE_ID);
  });

  it('fires when fill consumes a -background- token (SVG case)', () => {
    const node = nodeWithUsage('fill', '--cg-color-action-secondary-background-default');
    expect(ids([node])).toContain(RULE_ID);
  });

  it('does not fire when color: consumes a -text- token', () => {
    const node = nodeWithUsage('color', '--cg-color-status-success-text-default');
    expect(ids([node])).not.toContain(RULE_ID);
  });

  it('does not fire when background-color: consumes a -background- token (correct usage)', () => {
    const node = nodeWithUsage('background-color', '--cg-color-action-primary-background-default');
    expect(ids([node])).not.toContain(RULE_ID);
  });

  it('does not fire when token has no -background- in its name', () => {
    const node = nodeWithUsage('color', '--cg-color-surface-base-text');
    expect(ids([node])).not.toContain(RULE_ID);
  });
});
