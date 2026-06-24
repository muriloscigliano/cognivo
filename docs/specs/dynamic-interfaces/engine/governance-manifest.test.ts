/**
 * FIX C2 — the manifest is now the gate. Tests that govern(manifest) enforces
 * props / value-domains / tokens / nesting (previously dead code).
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/governance-manifest.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope } from './contracts.js';
import { govern, type GovernDeps } from './governance.js';
import { type UiNode } from './resolver.js';
import { type ReshapeManifest } from './reshape-manifest.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [{ key: 'subject', type: 'text', label: 'Subject' }],
  items: [{ subject: 'Budget' }],
};

const MANIFEST: ReshapeManifest = {
  schemaId: 'inbox.message.v1',
  tokens: { groups: { variant: ['neutral', 'danger'] } },
  components: [
    { type: 'Stack', container: true, allowedChildren: ['Card', 'Badge'], props: [{ name: 'direction', source: 'literal', value: { kind: 'enum', oneOf: ['row', 'column'] } }] },
    { type: 'Card', container: true, props: [{ name: 'variant', source: 'literal', value: { kind: 'token', tokenGroup: 'variant' } }] },
    { type: 'Badge', props: [{ name: 'label', source: 'field', value: { kind: 'data' }, required: true }, { name: 'variant', source: 'literal', value: { kind: 'token', tokenGroup: 'variant' } }] },
  ],
};

// registry knows the tags; without the manifest fix, all the below would PASS.
const KNOWN = new Set(['Stack', 'Card', 'Badge', 'Button']);
const deps: GovernDeps = {
  registry: { getTagName: (t) => (KNOWN.has(t) ? `cg-${t.toLowerCase()}` : undefined) },
  validateTokens: () => [],
  manifest: MANIFEST,
};

describe('FIX C2 — manifest enforces prop names', () => {
  it('rejects an undeclared prop on a real component', () => {
    const tree: UiNode = { type: 'Card', props: { variant: literal('neutral'), onClickAction: literal('javascript:evil') } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.where === 'Card.onClickAction')).toBe(true);
  });
});

describe('FIX C2 — manifest enforces value-domains + tokens', () => {
  it('rejects a token value outside the declared token group', () => {
    const tree: UiNode = { type: 'Card', props: { variant: literal('rm-rf') } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.message.includes('permitted'))).toBe(true);
  });
  it('rejects an enum value outside oneOf', () => {
    const tree: UiNode = { type: 'Stack', props: { direction: literal('diagonal') } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
  });
  it('accepts a permitted token + enum', () => {
    const tree: UiNode = { type: 'Card', props: { variant: literal('danger') } };
    const r = govern(tree, ENV, deps);
    expect(r.rejections.filter((x) => x.where?.startsWith('Card')).length).toBe(0);
  });
});

describe('FIX C2 — manifest enforces source (literal vs field)', () => {
  it('rejects a literal where a field is required', () => {
    const tree: UiNode = { type: 'Badge', props: { label: literal('hardcoded'), variant: literal('neutral') } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.where === 'Badge.label')).toBe(true);
  });
  it('accepts a field binding for a field-source prop', () => {
    const tree: UiNode = { type: 'Badge', props: { label: field('subject'), variant: literal('neutral') } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(true);
  });
});

describe('FIX C2 — manifest enforces required props + nesting', () => {
  it('rejects a missing required prop', () => {
    const tree: UiNode = { type: 'Badge', props: { variant: literal('neutral') } }; // label missing
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.where === 'Badge.label')).toBe(true);
  });
  it('rejects a disallowed child', () => {
    const tree: UiNode = { type: 'Stack', props: { direction: literal('row'), children: [{ type: 'Button', props: {} }] } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.where === 'Stack>Button')).toBe(true);
  });
  it('accepts an allowed child', () => {
    const tree: UiNode = { type: 'Stack', props: { direction: literal('row'), children: [{ type: 'Badge', props: { label: field('subject'), variant: literal('neutral') } }] } };
    const r = govern(tree, ENV, deps);
    expect(r.ok).toBe(true);
  });
});

describe('FIX C2 — no manifest → registry-only fallback still works', () => {
  it('without a manifest, a real tag with arbitrary props passes (looser path)', () => {
    const tree: UiNode = { type: 'Card', props: { whatever: literal('x') } };
    const r = govern(tree, ENV, { registry: deps.registry, validateTokens: () => [] });
    expect(r.ok).toBe(true); // documented looser fallback
  });
});
