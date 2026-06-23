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

describe('FIX-1 — real token validator is wired', () => {
  it('a clean real tree yields no token violations', () => {
    const { uiNode } = parseRealDsl('root = Stack([t], "column")\nt = TextContent("Design review notes", "medium")');
    expect(realTokenValidator(uiNode!)).toEqual([]);
  });
});
