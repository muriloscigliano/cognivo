import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/dialog-without-name.js';

describe(RULE_ID, () => {
  it('fires on <dialog> without a name', () => {
    const spec = fixture('dialog-no-name')
      .render('<dialog><p>body</p></dialog>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on <dialog> with aria-label', () => {
    const spec = fixture('dialog-aria-label')
      .render('<dialog aria-label="Confirm delete"><p>body</p></dialog>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on role=dialog without a name', () => {
    const spec = fixture('role-dialog-no-name')
      .render('<div role="dialog"><p>body</p></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on role=alertdialog without a name', () => {
    const spec = fixture('alertdialog-no-name')
      .render('<div role="alertdialog"><p>body</p></div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on role=dialog with aria-labelledby', () => {
    const spec = fixture('role-dialog-labelledby')
      .render(
        '<div><h2 id="d-title">Confirm</h2><div role="dialog" aria-labelledby="d-title"></div></div>'
      )
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
