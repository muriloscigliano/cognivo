/**
 * FIX-1 — REAL adapter tests. These run against the ACTUAL gen-ui library +
 * parser + validateTokenUsage, not a mock. This is the test that means something.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/real-adapter.test.ts
 */
import { describe, it, expect } from 'vitest';
import { type DatasetEnvelope } from './contracts.js';
import { govern } from './governance.js';
import {
  parseRealDsl,
  realRegistry,
  realTokenValidator,
  dataProvenanceRejections,
  elementToUiNode,
} from './real-adapter.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'normal', 'high', 'urgent'] },
  ],
  items: [
    { subject: 'Q4 budget sign-off', priority: 'urgent' },
    { subject: 'Design review notes', priority: 'high' },
  ],
};

const realDeps = { registry: realRegistry, validateTokens: realTokenValidator };

describe('FIX-1 — real DSL parses to an engine UiNode', () => {
  it('converts a real ElementNode tree (typeName → type)', () => {
    const { uiNode, parseRejections } = parseRealDsl(
      'root = Stack([t], "column", "md")\nt = TextContent("Q4 budget sign-off", "medium")',
    );
    expect(parseRejections).toEqual([]);
    expect(uiNode?.type).toBe('Stack');
    const child = (uiNode!.props.children as Array<{ type: string }>)[0];
    expect(child.type).toBe('TextContent');
  });

  it('reports a parse rejection on broken DSL', () => {
    const { uiNode, parseRejections } = parseRealDsl('root = ');
    expect(uiNode).toBeNull();
    expect(parseRejections.some((r) => r.code === 'parse')).toBe(true);
  });
});

describe('FIX-1 — governance runs on a REAL tree', () => {
  it('a real, valid Stack of TextContent passes governance', () => {
    const { uiNode } = parseRealDsl(
      'root = Stack([t], "column", "md")\nt = TextContent("Q4 budget sign-off", "medium")',
    );
    const r = govern(uiNode!, ENV, realDeps);
    expect(r.ok).toBe(true);
    expect(r.rejections).toEqual([]);
  });

  it('a REAL unknown component is rejected by the real registry', () => {
    // Bypass the parser (which would drop unknowns); build the UiNode directly to
    // simulate what a misbehaving model could emit, then govern with the REAL registry.
    const tree = { type: 'TotallyFakeComponent', props: { text: 'x' } } as const;
    const r = govern(tree, ENV, realDeps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'unknown-component')).toBe(true);
  });

  it('real getTagName resolves known components', () => {
    expect(realRegistry.getTagName('Stack')).toBe('cg-stack');
    expect(realRegistry.getTagName('Badge')).toBe('cg-badge');
    expect(realRegistry.getTagName('Nope')).toBeUndefined();
  });
});

describe('FIX-1 — the HONEST firewall: data provenance', () => {
  it('inlined values that exist in the dataset pass', () => {
    const { uiNode } = parseRealDsl(
      'root = Stack([t], "column")\nt = TextContent("Q4 budget sign-off", "medium")',
    );
    expect(dataProvenanceRejections(uiNode!, ENV)).toEqual([]);
  });

  it('fabricated data NOT in the dataset is flagged', () => {
    const { uiNode } = parseRealDsl(
      'root = Stack([t], "column")\nt = TextContent("Everyone secret password is hunter2", "medium")',
    );
    const rej = dataProvenanceRejections(uiNode!, ENV);
    expect(rej.length).toBeGreaterThan(0);
    expect(rej[0].code).toBe('undeclared-field');
  });

  it('structural literals (column/row/md/medium) are never flagged as data', () => {
    const { uiNode } = parseRealDsl('root = Stack([], "column", "md")');
    expect(dataProvenanceRejections(uiNode!, ENV)).toEqual([]);
  });
});

describe('FIX C1 — allowlist-by-construction (no short-token / URL bypass)', () => {
  // Build UiNodes directly to set arbitrary prop names (DSL maps positionally).
  const node = (type: string, props: Record<string, unknown>) => ({ type, props } as never);

  it('a short single-token fabricated string is now REJECTED (was the C1 hole)', () => {
    for (const evil of ['TransferAll', 'FreeMoney', 'sudo', '8675309', 'admin@evil.com']) {
      const rej = dataProvenanceRejections(node('TextContent', { text: evil }), ENV);
      expect(rej.length, `should reject "${evil}"`).toBeGreaterThan(0);
    }
  });

  it('a javascript: / path-traversal string in an ACTION prop is REJECTED (zero bypass)', () => {
    for (const [prop, evil] of [['href', 'javascript:alert(1)'], ['src', '../../etc/passwd'], ['action', 'https://evil.example']]) {
      const rej = dataProvenanceRejections(node('Link', { [prop]: evil }), ENV);
      expect(rej.length, `should reject ${prop}="${evil}"`).toBeGreaterThan(0);
      expect(rej[0].message).toContain('Action/URL');
    }
  });

  it('a structural literal in an ACTION prop is still rejected (no structural bypass for nav)', () => {
    // "row" is a valid structural literal for layout — but not for an href.
    const rej = dataProvenanceRejections(node('Link', { href: 'row' }), ENV);
    expect(rej.length).toBeGreaterThan(0);
  });

  it('a real dataset value in an action prop passes (provenance honored)', () => {
    // ENV has a subject "Q4 budget sign-off"; an action bound to a real value is fine.
    const rej = dataProvenanceRejections(node('Link', { href: 'Q4 budget sign-off' }), ENV);
    expect(rej).toEqual([]);
  });

  it('a real dataset value in a normal prop still passes', () => {
    const rej = dataProvenanceRejections(node('TextContent', { text: 'Design review notes' }), ENV);
    expect(rej).toEqual([]);
  });
});

describe('FIX-1 — real token validator is wired', () => {
  it('a clean real tree yields no token violations', () => {
    const { uiNode } = parseRealDsl('root = Stack([t], "column")\nt = TextContent("Design review notes", "medium")');
    expect(realTokenValidator(uiNode!)).toEqual([]);
  });
});
