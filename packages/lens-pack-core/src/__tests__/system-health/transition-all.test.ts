import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/system-health/transition-all.js';

describe(RULE_ID, () => {
  it('fires on inline style transition: all', () => {
    const spec = fixture('inline-transition-all')
      .render('<div style="transition: all 200ms ease;">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a specific transition property', () => {
    const spec = fixture('transition-color')
      .render('<div style="transition: color 200ms ease;">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a div with no transition', () => {
    const spec = fixture('no-transition')
      .render('<div>x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not match a property that just contains the word "all" (e.g., callback)', () => {
    // We match `all` only at word boundaries with no leading/trailing letters.
    // No realistic transition shorthand contains "callout" / "ballast" so this
    // is a structural test that the rule is using a precise check.
    const spec = fixture('transition-with-allergy-bait')
      .render('<div style="transition: callout-bg 200ms ease;">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
