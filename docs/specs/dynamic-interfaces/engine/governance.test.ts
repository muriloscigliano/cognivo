/**
 * F2 governance test. Plan: ../plans/F2-governance.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/governance.test.ts
 *
 * Uses FAKE deps (registry + token validator) so the gate is tested in isolation,
 * decoupled from the real gen-ui library.
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope } from './contracts.js';
import {
  govern,
  type ComponentRegistry,
  type TokenValidator,
  type GovernDeps,
} from './governance.js';
import type { UiNode } from './resolver.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [{ key: 'subject', type: 'text', label: 'Subject' }],
  items: [{ subject: 'Budget' }],
};

// Fake registry: only these types exist.
const KNOWN = new Set(['Stack', 'Row', 'Text', 'Button', 'Checkbox']);
const registry: ComponentRegistry = { getTagName: (t) => (KNOWN.has(t) ? `cg-${t.toLowerCase()}` : undefined) };
const noTokenIssues: TokenValidator = () => [];

const deps = (over: Partial<GovernDeps> = {}): GovernDeps => ({
  registry,
  validateTokens: noTokenIssues,
  ...over,
});

describe('F2 — clean tree passes', () => {
  it('ok:true, resolved non-null, no rejections', () => {
    const tree: UiNode = { type: 'Row', props: { title: field('subject') } };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(true);
    expect(r.rejections).toEqual([]);
    expect(r.resolved).not.toBeNull();
  });
});

describe('F2 — unknown component blocks render', () => {
  it('ok:false, resolved null, unknown-component rejection', () => {
    const tree: UiNode = { type: 'Nonexistent', props: { x: literal('y') } };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(false);
    expect(r.resolved).toBeNull();
    expect(r.rejections.some((x) => x.code === 'unknown-component')).toBe(true);
  });
});

describe('F2 — field firewall (via F1) blocks render', () => {
  it('undeclared field → ok:false', () => {
    const tree: UiNode = { type: 'Row', props: { secret: field('password') } };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'undeclared-field')).toBe(true);
  });
});

describe('F2 — token violations block render', () => {
  it('injected validator returning a violation → ok:false', () => {
    const badTokens: TokenValidator = () => [{ message: 'raw hex #fff', where: 'Row' }];
    const tree: UiNode = { type: 'Row', props: { title: literal('hi') } };
    const r = govern(tree, ENV, deps({ validateTokens: badTokens }));
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'token-violation')).toBe(true);
  });
});

describe('F2 — arity (leftover _args) blocks render', () => {
  it('_args present → arity rejection', () => {
    const tree: UiNode = { type: 'Row', props: { _args: ['stray'] as unknown as never } };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'arity')).toBe(true);
  });
});

describe('F2 — a11y as a generation constraint', () => {
  it('interactive node with no accessible name → a11y rejection', () => {
    const tree: UiNode = { type: 'Button', props: {} };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'a11y')).toBe(true);
  });
  it('interactive node WITH a label passes a11y', () => {
    const tree: UiNode = { type: 'Button', props: { label: literal('Save') } };
    const r = govern(tree, ENV, deps());
    expect(r.rejections.some((x) => x.code === 'a11y')).toBe(false);
  });
  it('label bound to a field counts as an accessible name', () => {
    const tree: UiNode = { type: 'Checkbox', props: { label: field('subject') } };
    const r = govern(tree, ENV, deps());
    expect(r.rejections.some((x) => x.code === 'a11y')).toBe(false);
  });
});

describe('F2 — collects ALL problems (no early-stop)', () => {
  it('unknown component + undeclared field + a11y all reported', () => {
    const tree: UiNode = {
      type: 'Stack',
      props: {
        children: [
          { type: 'Mystery', props: {} }, // unknown
          { type: 'Button', props: {} }, // a11y
          { type: 'Row', props: { x: field('password') } }, // undeclared field
        ],
      },
    };
    const r = govern(tree, ENV, deps());
    expect(r.ok).toBe(false);
    const codes = new Set(r.rejections.map((x) => x.code));
    expect(codes.has('unknown-component')).toBe(true);
    expect(codes.has('a11y')).toBe(true);
    expect(codes.has('undeclared-field')).toBe(true);
  });
});
