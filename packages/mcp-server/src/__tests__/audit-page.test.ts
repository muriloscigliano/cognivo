import { describe, expect, it } from 'vitest';

import { auditPage, auditPageSchema } from '../server/tools/audit-page.js';

describe('audit_page', () => {
  it('passes a clean Cognivo snippet', () => {
    const html = `
      <cg-stack direction="column" gap="md">
        <cg-text text="Hello" as="h1"></cg-text>
        <cg-text text="World"></cg-text>
      </cg-stack>
    `;
    const out = auditPage(auditPageSchema.parse({ html }));
    expect(out.valid).toBe(true);
    expect(out.issues.filter((i) => i.level === 'error')).toHaveLength(0);
    expect(out.stats.foundationComponents).toBeGreaterThan(0);
  });

  it('flags unknown Cognivo-prefixed tags', () => {
    const html = '<cg-not-real></cg-not-real>';
    const out = auditPage(auditPageSchema.parse({ html }));
    expect(out.valid).toBe(false);
    expect(out.issues.some((i) => i.rule === 'unknown-component' && i.tag === 'cg-not-real')).toBe(true);
    expect(out.stats.unknownTags).toBe(1);
  });

  it('flags <img> missing alt', () => {
    const html = '<img src="/hero.png">';
    const out = auditPage(auditPageSchema.parse({ html }));
    expect(out.issues.some((i) => i.rule === 'a11y-img-alt')).toBe(true);
    expect(out.valid).toBe(false);
  });

  it('computes accurate stats across foundation, ai, bias tags', () => {
    const html = `
      <cg-stack>
        <cg-text text="a"></cg-text>
        <ai-chat></ai-chat>
        <bias-anchoring>
          <cg-button label="Go"></cg-button>
        </bias-anchoring>
      </cg-stack>
    `;
    const out = auditPage(auditPageSchema.parse({ html }));
    expect(out.stats.aiComponents).toBe(1);
    expect(out.stats.biasComponents).toBe(1);
    expect(out.stats.foundationComponents).toBe(3); // cg-stack, cg-text, cg-button
    expect(out.stats.totalComponents).toBe(5);
    expect(out.stats.unknownTags).toBe(0);
  });

  it('strict flag escalates warnings to errors', () => {
    // A lone cg-stack with a single child triggers the empty-wrapper warning.
    const html = '<cg-stack><cg-text text="only"></cg-text></cg-stack>';
    const loose = auditPage(auditPageSchema.parse({ html }));
    expect(loose.valid).toBe(true);
    expect(loose.issues.some((i) => i.level === 'warning' && i.rule === 'empty-wrapper')).toBe(true);

    const strict = auditPage(auditPageSchema.parse({ html, strict: true }));
    expect(strict.valid).toBe(false);
    expect(strict.issues.some((i) => i.level === 'error' && i.rule === 'empty-wrapper')).toBe(true);
  });

  it('flags missing required props on cg-button', () => {
    const html = '<cg-button></cg-button>';
    const out = auditPage(auditPageSchema.parse({ html }));
    expect(
      out.issues.some(
        (i) => (i.rule === 'missing-required-prop' || i.rule === 'a11y-button-label') && i.tag === 'cg-button',
      ),
    ).toBe(true);
    expect(out.valid).toBe(false);
  });
});
