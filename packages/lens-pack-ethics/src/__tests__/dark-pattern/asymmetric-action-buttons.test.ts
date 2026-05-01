import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/dark-pattern/asymmetric-action-buttons.js';

describe(RULE_ID, () => {
  it('fires when accept is bright + decline is muted in the same container', () => {
    // Accept button has bright color (high contrast), decline is muted/grey.
    // The visible-style asymmetry between an accept and decline button is
    // the dark pattern.
    const spec = fixture('cookie-banner-asymmetric')
      .render(
        '<div role="dialog">' +
          '<button style="color: rgb(255, 255, 255); background: rgb(34, 197, 94)">Accept all</button>' +
          '<button style="color: rgb(160, 160, 160)">Decline</button>' +
          '</div>'
      )
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when both buttons share the same color', () => {
    const spec = fixture('cookie-banner-symmetric')
      .render(
        '<div role="dialog">' +
          '<button style="color: rgb(0, 0, 0)">Accept</button>' +
          '<button style="color: rgb(0, 0, 0)">Decline</button>' +
          '</div>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on a single button (no pair)', () => {
    const spec = fixture('single-accept')
      .render('<div role="dialog"><button>Accept</button></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when buttons are not accept/decline (neutral pair)', () => {
    const spec = fixture('neutral-pair')
      .render(
        '<div role="dialog">' +
          '<button style="color: rgb(255, 255, 255)">Edit</button>' +
          '<button style="color: rgb(160, 160, 160)">Delete</button>' +
          '</div>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire outside of a dialog/[role=dialog] context', () => {
    // Asymmetric accept/decline buttons in a footer aren't necessarily a
    // dark pattern — they're often just "Save" + "Cancel" with intentional
    // hierarchy. Confidence stays high only inside dialog-like containers.
    const spec = fixture('footer-pair')
      .render(
        '<footer>' +
          '<button style="color: rgb(255, 255, 255); background: rgb(34, 197, 94)">Accept</button>' +
          '<button style="color: rgb(160, 160, 160)">Decline</button>' +
          '</footer>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires inside a native <dialog> element', () => {
    const spec = fixture('native-dialog')
      .render(
        '<dialog open>' +
          '<button style="color: rgb(255, 255, 255); background: rgb(34, 197, 94)">Allow all</button>' +
          '<button style="color: rgb(160, 160, 160)">Deny all</button>' +
          '</dialog>'
      )
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
