import { describe, expect, it } from 'vitest';

import { generatePage, generatePageSchema } from '../server/tools/generate-page.js';

describe('generate_page', () => {
  it('pricing: returns 3 tiers with anchoring on the middle card', () => {
    const input = generatePageSchema.parse({ description: 'a pricing page with 3 tiers' });
    const out = generatePage(input);
    expect(out.template).toBe('pricing');
    expect(out.components).toContain('cg-card');
    expect(out.components).toContain('cg-button');
    expect(out.biases).toContain('bias-anchoring');
    expect(out.html).toMatch(/<cg-card/);
    expect(out.html).toMatch(/<bias-anchoring/);
  });

  it('landing: contains navbar, hero text, callout, CTA', () => {
    const input = generatePageSchema.parse({ description: 'landing page marketing hero' });
    const out = generatePage(input);
    expect(out.template).toBe('landing');
    expect(out.components).toContain('cg-navbar');
    expect(out.components).toContain('cg-callout');
    expect(out.components).toContain('cg-button');
  });

  it('dashboard: includes sidebar, metric cards, chart, data table', () => {
    const input = generatePageSchema.parse({ description: 'admin dashboard with kpi overview' });
    const out = generatePage(input);
    expect(out.template).toBe('dashboard');
    expect(out.components).toContain('cg-sidebar');
    expect(out.components).toContain('cg-metric-card');
    expect(out.components).toContain('cg-chart');
    expect(out.components).toContain('ai-data-table');
  });

  it('settings: includes sidebar, input, switch, danger button', () => {
    const input = generatePageSchema.parse({ description: 'user account settings and preferences' });
    const out = generatePage(input);
    expect(out.template).toBe('settings');
    expect(out.components).toContain('cg-sidebar');
    expect(out.components).toContain('cg-input');
    expect(out.components).toContain('cg-switch');
    expect(out.html).toMatch(/type="danger"/);
  });

  it('unknown description falls back to generic stack + card', () => {
    const input = generatePageSchema.parse({ description: 'an interplanetary widget showcase' });
    const out = generatePage(input);
    expect(out.template).toBe('generic');
    expect(out.components).toContain('cg-stack');
    expect(out.components).toContain('cg-card');
    // The description text should be embedded in the generic card
    expect(out.html).toContain('interplanetary widget showcase');
  });

  it('respects the components allowlist', () => {
    const input = generatePageSchema.parse({
      description: 'pricing page',
      components: ['cg-stack', 'cg-text'],
    });
    const out = generatePage(input);
    // Only allowlisted tags should remain
    for (const tag of out.components) {
      expect(['cg-stack', 'cg-text']).toContain(tag);
    }
  });

  it('applies darkMode marker to root', () => {
    const input = generatePageSchema.parse({ description: 'chat assistant', darkMode: true });
    const out = generatePage(input);
    expect(out.html).toContain('data-theme="dark"');
  });

  it('clamps to maxDepth', () => {
    const input = generatePageSchema.parse({ description: 'pricing page', maxDepth: 1 });
    const out = generatePage(input);
    // Depth-1 tree means the root has no children after clamping
    expect(out.tree.children ?? []).toHaveLength(0);
  });
});
