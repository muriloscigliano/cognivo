import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/text-contrast-below-aa.js';

describe(RULE_ID, () => {
  it('fires on low-contrast text (#ccc on white)', () => {
    const spec = fixture('low-contrast-text')
      .render('<div style="background-color: #fff"><span style="color: #ccc">low</span></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on high-contrast text (#000 on white)', () => {
    const spec = fixture('high-contrast-text')
      .render('<div style="background-color: #fff"><span style="color: #000">high</span></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on elements with no text content', () => {
    const spec = fixture('no-text')
      .render('<div style="background-color: #fff; color: #ccc"></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
