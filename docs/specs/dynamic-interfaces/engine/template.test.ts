/**
 * A1 — flat template contract tests. Architecture: ../01-architecture.md §L2.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/template.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal } from './contracts.js';
import {
  validateTemplate,
  templateFieldKeys,
  node,
  isBoundValue,
  type InterfaceTemplate,
} from './template.js';

const TPL: InterfaceTemplate = {
  schemaId: 'inbox.message.v1',
  root: 'root',
  nodes: {
    root: node('root', 'Stack', { direction: literal('column') }, ['row']),
    row: node('row', 'RichRow', { title: field('subject'), badge: field('priority') }),
  },
  repeats: { row: { over: field('items'), as: 'item' } },
};

describe('A1 — structural integrity', () => {
  it('a well-formed template has no issues', () => {
    expect(validateTemplate(TPL)).toEqual([]);
  });

  it('flags a missing root', () => {
    const bad = { ...TPL, root: 'ghost' };
    expect(validateTemplate(bad).some((i) => i.problem.includes('root'))).toBe(true);
  });

  it('flags a dangling child reference', () => {
    const bad: InterfaceTemplate = {
      ...TPL,
      nodes: { ...TPL.nodes, root: node('root', 'Stack', {}, ['nope']) },
    };
    expect(validateTemplate(bad).some((i) => i.problem.includes('child "nope"'))).toBe(true);
  });

  it('flags a node whose id disagrees with its map key', () => {
    const bad: InterfaceTemplate = {
      ...TPL,
      nodes: { ...TPL.nodes, row: node('WRONG', 'RichRow', {}) },
    };
    expect(validateTemplate(bad).some((i) => i.problem.includes('!='))).toBe(true);
  });

  it('detects a cycle', () => {
    const cyclic: InterfaceTemplate = {
      schemaId: 's',
      root: 'a',
      nodes: {
        a: node('a', 'Stack', {}, ['b']),
        b: node('b', 'Stack', {}, ['a']),
      },
    };
    expect(validateTemplate(cyclic).some((i) => i.problem === 'cycle detected')).toBe(true);
  });

  it('flags a repeat whose host node is missing', () => {
    const bad: InterfaceTemplate = { ...TPL, repeats: { ghost: { over: field('items'), as: 'x' } } };
    expect(validateTemplate(bad).some((i) => i.problem.includes('repeat host'))).toBe(true);
  });
});

describe('A1 — field key collection (firewall input)', () => {
  it('collects binding keys from props and repeats', () => {
    expect(templateFieldKeys(TPL).sort()).toEqual(['items', 'priority', 'subject']);
  });
  it('ignores literals (they are not data references)', () => {
    const t: InterfaceTemplate = {
      schemaId: 's', root: 'r',
      nodes: { r: node('r', 'Text', { text: literal('Inbox') }) },
    };
    expect(templateFieldKeys(t)).toEqual([]);
  });
});

describe('A1 — data enters props ONLY as a BoundValue', () => {
  it('isBoundValue accepts bindings + literals, rejects raw values', () => {
    expect(isBoundValue(field('subject'))).toBe(true);
    expect(isBoundValue(literal('x'))).toBe(true);
    expect(isBoundValue('raw string')).toBe(false); // a raw inlined value is illegal
    expect(isBoundValue(42)).toBe(false);
  });
});
