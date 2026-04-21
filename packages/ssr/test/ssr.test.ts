import { describe, it, expect } from 'vitest';
import { html, renderToString } from '../src/index.js';
import '@cognivo/components';

describe('@cognivo/ssr', () => {
  it('renders a cg-button to declarative shadow DOM', () => {
    const result = renderToString(html`<cg-button>Hello</cg-button>`);
    expect(result).toContain('<cg-button');
    // @lit-labs/ssr emits both the legacy `shadowroot` and spec-compliant
    // `shadowrootmode` attribute on the same <template> for broad browser
    // compat — assert on the modern attribute.
    expect(result).toMatch(/<template[^>]*shadowrootmode="open"/);
    expect(result).toContain('Hello');
  });

  it('renders multiple components in a tree', () => {
    const result = renderToString(html`
      <cg-card>
        <cg-button>Action</cg-button>
      </cg-card>
    `);
    expect(result).toContain('<cg-card');
    expect(result).toContain('<cg-button');
    // Both custom elements should receive their own declarative shadow root.
    const shadowRoots = result.match(/shadowrootmode="open"/g) ?? [];
    expect(shadowRoots.length).toBeGreaterThanOrEqual(2);
  });

  it('includes styles inside the shadow root', () => {
    const result = renderToString(html`<cg-button>X</cg-button>`);
    expect(result).toMatch(/<style/);
  });
});
