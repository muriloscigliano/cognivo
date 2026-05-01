import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/dark-pattern/scarcity-claim.js';

describe(RULE_ID, () => {
  it('fires on "Only 3 left in stock"', () => {
    const spec = fixture('only-N-left')
      .render('<p>Only 3 left in stock — order soon!</p>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on "12 people bought this today"', () => {
    const spec = fixture('social-pressure')
      .render('<span>12 people bought this today</span>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on "Selling fast"', () => {
    const spec = fixture('selling-fast')
      .render('<div>Selling fast — only a few left</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on "Limited time offer"', () => {
    const spec = fixture('limited-time')
      .render('<p>Limited time offer ends today.</p>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on "30% off this hour"', () => {
    const spec = fixture('time-discount')
      .render('<p>30% off this hour only!</p>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on neutral product copy', () => {
    const spec = fixture('neutral-copy')
      .render('<p>This product is excellent — handcrafted in our workshop.</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on "no items in stock" (descriptive, not a pressure tactic)', () => {
    const spec = fixture('out-of-stock')
      .render('<p>Sorry, this product is currently out of stock.</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
