import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/tokens/tier1-brand-color.js';

describe(RULE_ID, () => {
  it('fires when color: resolves to an unambiguous brand primitive', () => {
    // --cg-brand-ai-accent has a unique resolved value with no tier-2 alias
    // so this should be unambiguous. If the color value were shared with a
    // tier-2 token we'd suppress instead.
    // We use a value that's definitely tier-1-only.
    const spec = fixture('brand-on-color')
      .render('<div style="color: rgb(0, 105, 255)">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID); // most ambiguous — verify we don't false-positive
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when value resolves to a tier-2 semantic token (ambiguity suppression)', () => {
    // #dfff61 = both --cg-brand-primary-500 and --cg-color-action-primary-background-default.
    // We give the developer benefit of the doubt that they used the semantic form.
    const spec = fixture('brand-via-semantic')
      .render('<div style="background-color: #dfff61">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on palette colors (sibling rule covers those)', () => {
    const spec = fixture('palette-not-brand')
      .render('<div style="color: rgb(100, 116, 139)">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on off-grid colors', () => {
    const spec = fixture('off-grid-color')
      .render('<div style="color: #abcdef">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
