import { describe, expect, it } from 'vitest';

import { applyBias, applyBiasSchema } from '../server/tools/apply-bias.js';

describe('apply_bias', () => {
  it('wraps the first matching target tag', () => {
    const html = '<cg-stack><cg-button label="Buy"></cg-button></cg-stack>';
    const out = applyBias(
      applyBiasSchema.parse({ html, targetTag: 'cg-button', bias: 'scarcity' }),
    );
    expect(out.applied).toBe(true);
    expect(out.biasId).toBe('scarcity-bias');
    expect(out.html).toContain('<bias-scarcity>');
    expect(out.html).toContain('<cg-button label="Buy">');
    expect(out.html).toContain('</bias-scarcity>');
    // Original outer stack preserved
    expect(out.html.startsWith('<cg-stack>')).toBe(true);
  });

  it('returns applied=false when target tag is missing', () => {
    const html = '<cg-stack><cg-text text="Hello"></cg-text></cg-stack>';
    const out = applyBias(
      applyBiasSchema.parse({ html, targetTag: 'cg-button', bias: 'anchoring' }),
    );
    expect(out.applied).toBe(false);
    expect(out.html).toBe(html);
    expect(out.biasId).toBe('anchoring-bias');
    expect(out.suggestion).toMatch(/not found/i);
  });

  it('passes biasProps through to the wrapper', () => {
    const html = '<cg-card padding="lg"><cg-text text="Pro"></cg-text></cg-card>';
    const out = applyBias(
      applyBiasSchema.parse({
        html,
        targetTag: 'cg-card',
        bias: 'anchoring',
        biasProps: { label: 'Most Popular', strength: 'high', emphasized: true },
      }),
    );
    expect(out.applied).toBe(true);
    expect(out.html).toContain('<bias-anchoring label="Most Popular" strength="high" emphasized>');
    // Original card content untouched
    expect(out.html).toContain('<cg-card padding="lg">');
    expect(out.html).toContain('</cg-card></bias-anchoring>');
  });

  it('handles self-closing target tags', () => {
    const html = '<cg-stack><cg-input name="email" /></cg-stack>';
    const out = applyBias(
      applyBiasSchema.parse({ html, targetTag: 'cg-input', bias: 'commitment' }),
    );
    expect(out.applied).toBe(true);
    expect(out.html).toContain('<bias-commitment><cg-input name="email" /></bias-commitment>');
  });

  it('preserves sibling content outside the wrapped target', () => {
    const html =
      '<cg-text text="before"></cg-text><cg-button label="Act"></cg-button><cg-text text="after"></cg-text>';
    const out = applyBias(
      applyBiasSchema.parse({ html, targetTag: 'cg-button', bias: 'social-proof' }),
    );
    expect(out.applied).toBe(true);
    expect(out.html.startsWith('<cg-text text="before">')).toBe(true);
    expect(out.html.endsWith('<cg-text text="after"></cg-text>')).toBe(true);
    expect(out.html).toContain('<bias-social-proof><cg-button label="Act"></cg-button></bias-social-proof>');
  });
});
