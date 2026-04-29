import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/tokens/raw-color-no-token.js';

describe(RULE_ID, () => {
  it('fires on a hex color that matches no Cognivo token', () => {
    const spec = fixture('off-grid')
      .render('<div style="color: #abcdef">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when the value matches any token', () => {
    // #71717a = --cg-gray-500 (and several semantic tokens). Tier 1, not tier 0.
    const spec = fixture('token-color')
      .render('<div style="color: #71717a">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on fully-transparent values (deliberate "no fill")', () => {
    const spec = fixture('transparent')
      .render('<div style="color: rgba(99, 99, 99, 0)">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on numeric off-grid values (this rule is colors-only)', () => {
    const spec = fixture('numeric-property')
      .render('<div style="padding-top: 13px">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
