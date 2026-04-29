import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/a11y/input-without-label.js';

describe(RULE_ID, () => {
  it('fires on a bare <input type=text>', () => {
    const spec = fixture('bare-text-input')
      .render('<input type="text">')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('fires on a default-type <input> (no type attr)', () => {
    const spec = fixture('default-type-input')
      .render('<input>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on an input with aria-label', () => {
    const spec = fixture('input-with-aria-label')
      .render('<input type="email" aria-label="Your email">')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on an input matched by a <label for=>', () => {
    const spec = fixture('input-with-label-for')
      .render('<div><label for="em">Email</label><input id="em" type="email"></div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on type=hidden / submit / checkbox / radio (out of v1 scope)', () => {
    const cases = ['hidden', 'submit', 'button', 'reset', 'image', 'checkbox', 'radio'];
    for (const t of cases) {
      const spec = fixture(`input-skip-${t}`)
        .render(`<input type="${t}">`)
        .withIntent('unknown')
        .expectNoFinding(RULE_ID);
      expect(runFixture(rule, spec).passed, `type=${t}`).toBe(true);
    }
  });

  it('fires on bare password / search / tel / url / number inputs', () => {
    const cases = ['password', 'search', 'tel', 'url', 'number'];
    for (const t of cases) {
      const spec = fixture(`input-bare-${t}`)
        .render(`<input type="${t}">`)
        .withIntent('unknown')
        .expectFinding({ ruleId: RULE_ID });
      expect(runFixture(rule, spec).passed, `type=${t}`).toBe(true);
    }
  });
});
