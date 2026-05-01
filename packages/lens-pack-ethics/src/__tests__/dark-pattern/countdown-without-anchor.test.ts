import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/dark-pattern/countdown-without-anchor.js';

describe(RULE_ID, () => {
  it('fires on visible HH:MM:SS countdown text without an anchor', () => {
    const spec = fixture('hms-no-anchor')
      .render('<div>Sale ends in 02:14:33</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on visible MM:SS countdown text without an anchor', () => {
    const spec = fixture('ms-no-anchor')
      .render('<span>Hurry — 04:59 left</span>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when wrapped in <time datetime=…>', () => {
    const spec = fixture('hms-with-time-anchor')
      .render('<time datetime="2026-12-31T23:59:59Z">Sale ends in 02:14:33</time>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when ancestor carries data-deadline', () => {
    const spec = fixture('hms-with-data-deadline')
      .render('<div data-deadline="2026-12-31T23:59:59Z"><span>02:14:33</span></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a clock time (12-hour with AM/PM)', () => {
    const spec = fixture('clock-am-pm')
      .render('<p>Open 09:00 AM to 17:00 PM</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on neutral text without colon-numbers', () => {
    const spec = fixture('neutral')
      .render('<p>Welcome to the page.</p>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
