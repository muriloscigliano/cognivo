import { describe, it, expect } from 'vitest';
import { RuleEngine } from '@cognivo/lens-core';
import rule, { RULE_ID } from '../../rules/system-health/closed-shadow-root-unauditable.js';
import { makeNode, makeGraph } from '../helpers/scene.js';

/**
 * `hasClosedShadowRoot` is set by the Observer during scan() if the host has
 * `attachShadow({mode:'closed'})`. happy-dom does not let user code observe
 * closed shadow roots through normal means, so we hand-craft a SceneGraph for
 * this rule's tests rather than going through the fixture runner.
 */
describe(RULE_ID, () => {
  it('fires when a node has hasClosedShadowRoot=true', () => {
    const node = makeNode({ id: 'n1', tag: 'cg-thing', hasClosedShadowRoot: true });
    const engine = new RuleEngine();
    engine.registerSync([rule]);
    const findings = engine.evaluate(makeGraph([node]), 'unknown');
    expect(findings.some((f) => f.ruleId === RULE_ID)).toBe(true);
  });

  it('does not fire when no nodes have closed shadow roots', () => {
    const node = makeNode({ id: 'n1', tag: 'div' });
    const engine = new RuleEngine();
    engine.registerSync([rule]);
    const findings = engine.evaluate(makeGraph([node]), 'unknown');
    expect(findings.some((f) => f.ruleId === RULE_ID)).toBe(false);
  });

  it('fires once per closed-shadow-root host', () => {
    const a = makeNode({ id: 'n1', tag: 'x-a', hasClosedShadowRoot: true });
    const b = makeNode({ id: 'n2', tag: 'x-b', hasClosedShadowRoot: true });
    const c = makeNode({ id: 'n3', tag: 'div' });
    const engine = new RuleEngine();
    engine.registerSync([rule]);
    const findings = engine.evaluate(makeGraph([a, b, c]), 'unknown').filter((f) => f.ruleId === RULE_ID);
    expect(findings).toHaveLength(2);
  });
});
