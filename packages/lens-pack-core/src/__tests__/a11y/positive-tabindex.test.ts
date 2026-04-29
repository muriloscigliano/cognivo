import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/positive-tabindex.js';

describe(RULE_ID, () => {
  it('fires on tabindex=1', () => {
    const spec = fixture('tabindex-1')
      .render('<button tabindex="1">x</button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on tabindex=99', () => {
    const spec = fixture('tabindex-99')
      .render('<div tabindex="99">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on tabindex=0', () => {
    const spec = fixture('tabindex-0')
      .render('<div tabindex="0">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on tabindex=-1', () => {
    const spec = fixture('tabindex-neg')
      .render('<div tabindex="-1">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on element without tabindex', () => {
    const spec = fixture('no-tabindex')
      .render('<button>x</button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('ignores garbage values like "abc"', () => {
    // parseInt("abc") = NaN; NaN > 0 is false. No finding either way.
    const spec = fixture('tabindex-garbage')
      .render('<div tabindex="abc">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
