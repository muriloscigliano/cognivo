import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/dark-pattern/preselected-optional-checkbox.js';

describe(RULE_ID, () => {
  it('fires on a pre-checked newsletter opt-in', () => {
    const spec = fixture('checked-newsletter')
      .render(
        '<form><label><input type="checkbox" checked> Subscribe to our newsletter</label></form>'
      )
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when the label is referenced by for=', () => {
    const spec = fixture('checked-marketing-for-label')
      .render(
        '<form><input id="m" type="checkbox" checked><label for="m">Send me marketing emails</label></form>'
      )
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires when only aria-label exists', () => {
    const spec = fixture('checked-aria-label')
      .render(
        '<form><input type="checkbox" checked aria-label="Receive special offers"></form>'
      )
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a pre-checked "Remember me" (allow-listed)', () => {
    const spec = fixture('checked-remember-me')
      .render(
        '<form><label><input type="checkbox" checked> Remember me on this device</label></form>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a pre-checked "Keep me signed in"', () => {
    const spec = fixture('checked-keep-signed')
      .render(
        '<form><label><input type="checkbox" checked> Keep me signed in</label></form>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on an UNchecked optional opt-in', () => {
    const spec = fixture('unchecked-newsletter')
      .render('<form><label><input type="checkbox"> Subscribe to newsletter</label></form>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a checked checkbox with no opt-in keyword', () => {
    const spec = fixture('checked-generic')
      .render('<form><label><input type="checkbox" checked> I have read the document</label></form>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on terms-acceptance pre-check (different rule territory)', () => {
    const spec = fixture('checked-terms')
      .render(
        '<form><label><input type="checkbox" checked> I agree to the terms of service</label></form>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
