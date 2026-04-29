import { describe, it, expect } from 'vitest';
import { fixture, runFixture } from '@cognivo/lens-core/fixtures';
import rule, { RULE_ID } from '../../rules/tokens/tier1-palette-color.js';

describe(RULE_ID, () => {
  it('fires when color: resolves to an unambiguous palette primitive', () => {
    // rgb(100, 116, 139) = --cg-slate-500 only — no tier-2 alias resolves
    // to this value, so the violation is unambiguous and the rule fires.
    // (Common values like --cg-gray-500 alias to several semantic tokens
    // and we suppress those — see the ambiguity test below.)
    const spec = fixture('slate-on-color')
      .render('<div style="color: rgb(100, 116, 139)">x</div>')
      .withIntent('unknown')
      .expectFinding({ ruleId: RULE_ID });
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when palette primitive is used on a non-color property', () => {
    // padding-top: 8px → --cg-spacing-8. Tier 1 but spacing, not color.
    const spec = fixture('gray-on-spacing')
      .render('<div style="padding-top: 8px">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire when value matches both a palette and a semantic token (ambiguous)', () => {
    // #dfff61 matches --cg-brand-primary-500 (tier 1) AND
    // --cg-color-action-primary-background-default (tier 2). Ambiguous case
    // — assume the semantic form was used.
    const spec = fixture('semantic-color')
      .render('<div style="background-color: #dfff61">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on brand colors (sibling rule core/tokens/tier1-brand-color owns those)', () => {
    // Brand tokens match isBrandToken but not isPaletteToken; this rule skips them.
    const spec = fixture('brand-color')
      .render('<div style="color: rgb(223, 255, 97)">brand</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });

  it('does not fire on off-grid (tier-0) colors', () => {
    const spec = fixture('off-grid-color')
      .render('<div style="color: #abcdef">x</div>')
      .withIntent('unknown')
      .expectNoFinding(RULE_ID);
    expect(runFixture(rule, spec).passed).toBe(true);
  });
});
