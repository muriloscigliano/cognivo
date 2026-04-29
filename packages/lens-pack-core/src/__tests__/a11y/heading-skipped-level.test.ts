import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/heading-skipped-level.js';

describe(RULE_ID, () => {
  it('fires when h1 is followed by h3', () => {
    const spec = fixture('h1-then-h3')
      .render('<div><h1>A</h1><h3>B</h3></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when h1 is followed by h2', () => {
    const spec = fixture('h1-then-h2')
      .render('<div><h1>A</h1><h2>B</h2></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a single heading at any level', () => {
    const spec = fixture('only-h2')
      .render('<div><h2>only</h2></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when h2 is followed by h4', () => {
    const spec = fixture('h2-then-h4')
      .render('<div><h2>A</h2><h4>B</h4></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when stepping back up (h3 -> h2)', () => {
    const spec = fixture('h3-then-h2')
      .render('<div><h2>A</h2><h3>B</h3><h2>C</h2></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires only on the offending heading, not earlier ones', () => {
    // h1 -> h2 -> h4 should fire only on h4 (skipped h3)
    const spec = fixture('one-skip-mid-doc')
      .render('<div><h1>A</h1><h2>B</h2><h4>C</h4></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
