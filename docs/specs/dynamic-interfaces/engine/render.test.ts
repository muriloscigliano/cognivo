/**
 * FIX-2 — renderer mapping test. Uses a dependency-free fake document + the REAL
 * registry to prove the tree→element mapping (tags, nesting, props/attrs). The
 * real-browser proof is the playground page; this proves the logic that can break.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/render.test.ts
 */
import { describe, it, expect } from 'vitest';
import { buildElement, makeFakeDoc } from './render.js';
import { realRegistry, parseRealDsl } from './real-adapter.js';
import type { UiNode } from './resolver.js';

describe('FIX-2 — maps a governed tree to real cg-* tags', () => {
  it('uses the real registry tag names', () => {
    const tree: UiNode = { type: 'Badge', props: { label: 'high', variant: 'warning' } };
    const el = buildElement(tree, realRegistry, makeFakeDoc())!;
    expect(el.tagName).toBe('cg-badge');
    expect(el.props.label).toBe('high');
    expect(el.attributes.variant).toBe('warning');
  });

  it('renders a real parsed Stack→TextContent+Badge tree with correct nesting', () => {
    const { uiNode } = parseRealDsl(
      'root = Stack([t, b], "row", "sm")\nt = TextContent("Design review notes", "medium")\nb = Badge("high", "warning")',
    );
    const el = buildElement(uiNode!, realRegistry, makeFakeDoc())!;
    expect(el.tagName).toBe('cg-stack');
    expect(el.children).toHaveLength(2);
    expect(el.children[0].tagName).toBe('cg-text'); // real library maps TextContent -> cg-text
    expect(el.children[1].tagName).toBe('cg-badge');
    expect(el.children[0].props.text).toBe('Design review notes');
  });

  it('children prop becomes nested elements, not an attribute', () => {
    const { uiNode } = parseRealDsl('root = Stack([t], "column")\nt = TextContent("x", "medium")');
    const el = buildElement(uiNode!, realRegistry, makeFakeDoc())!;
    expect(el.attributes.children).toBeUndefined();
    expect(el.children).toHaveLength(1);
  });

  it('returns null for an unknown tag (governance prevents reaching here)', () => {
    const el = buildElement({ type: 'NopeComponent', props: {} }, realRegistry, makeFakeDoc());
    expect(el).toBeNull();
  });
});
