import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/aria-hidden-focusable.js';

describe(RULE_ID, () => {
  it('fires on a button with aria-hidden=true', () => {
    const spec = fixture('button-aria-hidden')
      .render('<button aria-hidden="true">x</button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on aria-hidden + tabindex=0', () => {
    const spec = fixture('div-aria-hidden-tabindex-0')
      .render('<div aria-hidden="true" tabindex="0">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when tabindex=-1 (programmatic focus only is fine)', () => {
    const spec = fixture('aria-hidden-tabindex-neg')
      .render('<div aria-hidden="true" tabindex="-1">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on aria-hidden=false', () => {
    const spec = fixture('aria-hidden-false')
      .render('<button aria-hidden="false">x</button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a non-focusable aria-hidden element (plain div)', () => {
    const spec = fixture('aria-hidden-div')
      .render('<div aria-hidden="true">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on aria-hidden <a href> (link is focusable by default)', () => {
    const spec = fixture('aria-hidden-link')
      .render('<a href="/" aria-hidden="true">x</a>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
