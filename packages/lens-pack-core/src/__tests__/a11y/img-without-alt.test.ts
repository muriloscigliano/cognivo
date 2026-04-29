import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/img-without-alt.js';

describe(RULE_ID, () => {
  it('fires on an img with no alt attribute', () => {
    const spec = fixture('img-without-alt')
      .render('<img src="cat.jpg">')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    const result = runFixture(rule, spec);
    expect(result.passed, result.reason).toBe(true);
  });

  it('does not fire on an img with descriptive alt', () => {
    const spec = fixture('img-with-descriptive-alt')
      .render('<img src="cat.jpg" alt="A grey tabby">')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    const result = runFixture(rule, spec);
    expect(result.passed, result.reason).toBe(true);
  });

  it('does not fire on a decorative img with empty alt', () => {
    // alt="" is the WCAG-sanctioned opt-out for purely decorative images.
    const spec = fixture('img-with-empty-alt-decorative')
      .render('<img src="border.jpg" alt="">')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    const result = runFixture(rule, spec);
    expect(result.passed, result.reason).toBe(true);
  });

  it('fires when at least one img in a group is missing alt', () => {
    const spec = fixture('imgs-mixed')
      .render('<div><img src="ok.jpg" alt="OK"><img src="bad.jpg"></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    const result = runFixture(rule, spec);
    expect(result.passed, result.reason).toBe(true);
  });

  it('does not fire on a page with no images', () => {
    const spec = fixture('no-imgs')
      .render('<div><p>Hello, world.</p></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    const result = runFixture(rule, spec);
    expect(result.passed, result.reason).toBe(true);
  });
});
