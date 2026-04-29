import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/link-without-name.js';

describe(RULE_ID, () => {
  it('fires on an <a> with no visible text and no aria-label', () => {
    const spec = fixture('icon-link-no-label')
      .render('<a href="/x"><svg></svg></a>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a link with text', () => {
    const spec = fixture('link-with-text')
      .render('<a href="/x">Read more</a>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a link with aria-label', () => {
    const spec = fixture('link-with-aria-label')
      .render('<a href="/x" aria-label="Open settings"><svg></svg></a>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on an empty <a>', () => {
    const spec = fixture('empty-anchor')
      .render('<a href="/x"></a>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a link whose only child is an <img alt>', () => {
    const spec = fixture('link-with-img-alt')
      .render('<a href="/x"><img src="profile.png" alt="View profile"></a>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a link whose icon SVG carries a <title>', () => {
    const spec = fixture('link-with-svg-title')
      .render('<a href="/x"><svg><title>Open settings</title></svg></a>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a page with no links', () => {
    const spec = fixture('no-links')
      .render('<p>just text</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
