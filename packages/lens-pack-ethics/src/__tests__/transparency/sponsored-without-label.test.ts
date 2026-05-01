import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/transparency/sponsored-without-label.js';

describe(RULE_ID, () => {
  it('fires when class contains "sponsored" but text has no label', () => {
    const spec = fixture('class-sponsored-no-label')
      .render('<div class="sponsored-card"><h3>Special offer from a brand</h3></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when class contains "ad-banner" but no label', () => {
    const spec = fixture('class-ad-banner-no-label')
      .render('<div class="ad-banner"><a href="/x">Buy this now</a></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when data-sponsored is present without a visible label', () => {
    const spec = fixture('data-sponsored-no-label')
      .render('<article data-sponsored><h2>Brand X review</h2><p>This is great</p></article>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when "Sponsored" text is visible inside', () => {
    const spec = fixture('sponsored-with-label')
      .render(
        '<div class="sponsored-card"><span>Sponsored</span><h3>Brand promotion</h3></div>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when "Advertisement" text is visible', () => {
    const spec = fixture('ad-with-advert-label')
      .render('<div class="ad-slot"><span>Advertisement</span><a>Buy</a></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on plain content with no sponsored markers', () => {
    const spec = fixture('plain-content')
      .render('<div><h2>Editorial content</h2><p>Normal article.</p></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not falsely match unrelated classes containing "ad" substring', () => {
    // "header" / "padding-foo" must NOT match. We require strict patterns:
    // class must contain "sponsored", "promo", "ad-" (with hyphen), "promoted".
    const spec = fixture('false-positive-padding')
      .render('<div class="header padding-medium"><h1>Hello</h1></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
