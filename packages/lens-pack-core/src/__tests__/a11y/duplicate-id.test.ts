import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/duplicate-id.js';

describe(RULE_ID, () => {
  it('fires when two elements share the same id', () => {
    const spec = fixture('two-same-id')
      .render('<div><span id="x">a</span><span id="x">b</span></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when three elements share the same id', () => {
    const spec = fixture('three-same-id')
      .render('<div><span id="x">a</span><span id="x">b</span><span id="x">c</span></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when ids are unique', () => {
    const spec = fixture('unique-ids')
      .render('<div><span id="a">1</span><span id="b">2</span></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when no elements have ids', () => {
    const spec = fixture('no-ids')
      .render('<div><span>1</span><span>2</span></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('treats empty id="" as not-an-id (no finding)', () => {
    const spec = fixture('empty-ids')
      .render('<div><span id="">1</span><span id="">2</span></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
