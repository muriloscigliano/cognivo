import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/landmark-without-name.js';

describe(RULE_ID, () => {
  it('fires on role=navigation without a name', () => {
    const spec = fixture('nav-no-name')
      .render('<div role="navigation"><a href="/">a</a></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on role=navigation with aria-label', () => {
    const spec = fixture('nav-with-label')
      .render('<div role="navigation" aria-label="Primary"><a href="/">a</a></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on role=navigation with aria-labelledby', () => {
    const spec = fixture('nav-with-labelledby')
      .render(
        '<div><h2 id="primary-nav-h">Primary</h2><div role="navigation" aria-labelledby="primary-nav-h"></div></div>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on role=region without a name', () => {
    const spec = fixture('region-no-name')
      .render('<div role="region">content</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on role=search without a name', () => {
    const spec = fixture('search-no-name')
      .render('<div role="search"><input></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a non-landmark role', () => {
    const spec = fixture('role-button-not-landmark')
      .render('<div role="button">click</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
