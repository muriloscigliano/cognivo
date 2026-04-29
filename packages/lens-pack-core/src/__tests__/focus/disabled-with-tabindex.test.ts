import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/focus/disabled-with-tabindex.js';

describe(RULE_ID, () => {
  it('fires on [disabled] + tabindex=0', () => {
    const spec = fixture('disabled-tabindex-0')
      .render('<button disabled tabindex="0">x</button>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on aria-disabled=true + tabindex=0', () => {
    const spec = fixture('aria-disabled-tabindex-0')
      .render('<div role="button" aria-disabled="true" tabindex="0">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on disabled with tabindex=-1', () => {
    const spec = fixture('disabled-tabindex-neg')
      .render('<button disabled tabindex="-1">x</button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on disabled without any tabindex', () => {
    const spec = fixture('disabled-no-tabindex')
      .render('<button disabled>x</button>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on aria-disabled=false', () => {
    const spec = fixture('aria-disabled-false')
      .render('<div aria-disabled="false" tabindex="0">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
