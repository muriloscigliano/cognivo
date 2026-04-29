import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/button-without-name.js';

describe(RULE_ID, () => {
  it('fires on a <button> with no visible text and no aria-label', () => {
    const spec = fixture('icon-only-button-no-label')
      .render('<button><svg width="16" height="16"></svg></button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a <button> with text', () => {
    const spec = fixture('button-with-text')
      .render('<button>Submit</button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a <button> with aria-label', () => {
    const spec = fixture('button-with-aria-label')
      .render('<button aria-label="Close"><svg></svg></button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('treats aria-label="" as missing (whitespace does not count)', () => {
    const spec = fixture('button-empty-aria-label')
      .render('<button aria-label="   "><svg></svg></button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on [role=button] with empty content and no name', () => {
    const spec = fixture('role-button-no-name')
      .render('<div role="button"></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on icon-only button when SVG has <title>', () => {
    const spec = fixture('svg-title-button')
      .render('<button><svg><title>Save</title></svg></button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a button whose only child is an <img alt>', () => {
    const spec = fixture('button-with-img-alt')
      .render('<button><img src="x.png" alt="Save"></button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a page with no buttons', () => {
    const spec = fixture('no-buttons')
      .render('<p>just text</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
