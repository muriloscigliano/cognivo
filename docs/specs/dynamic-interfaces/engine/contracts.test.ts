/**
 * F0 contracts test. Plan: ../plans/F0-contracts.md.
 * Run: npx vitest run docs/specs/dynamic-interfaces/engine/contracts.test.ts
 */
import { describe, it, expect } from 'vitest';
import {
  field,
  literal,
  isFieldBinding,
  isLiteralValue,
  hasField,
  getField,
  type DatasetEnvelope,
  type BoundValue,
} from './contracts.js';

const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high'] },
  ],
  items: [],
};

describe('F0 — factories', () => {
  it('field() builds a FieldBinding', () => {
    expect(field('subject')).toEqual({ kind: 'field', key: 'subject' });
  });
  it('literal() builds a LiteralValue', () => {
    expect(literal('hi')).toEqual({ kind: 'literal', value: 'hi' });
    expect(literal(3)).toEqual({ kind: 'literal', value: 3 });
    expect(literal(true)).toEqual({ kind: 'literal', value: true });
  });
});

describe('F0 — guards distinguish bindings from literals (no opaque strings)', () => {
  it('isFieldBinding only true for field bindings', () => {
    expect(isFieldBinding(field('x'))).toBe(true);
    expect(isFieldBinding(literal('x'))).toBe(false);
    expect(isFieldBinding('subject')).toBe(false); // a bare string is NOT a binding
    expect(isFieldBinding(null)).toBe(false);
    expect(isFieldBinding({ kind: 'field' })).toBe(false); // missing key
  });
  it('isLiteralValue only true for literals', () => {
    expect(isLiteralValue(literal('x'))).toBe(true);
    expect(isLiteralValue(field('x'))).toBe(false);
    expect(isLiteralValue({ kind: 'literal', value: {} })).toBe(false); // object not allowed
  });
});

describe('F0 — firewall predicate', () => {
  it('hasField is true only for declared fields', () => {
    expect(hasField(ENV, 'subject')).toBe(true);
    expect(hasField(ENV, 'priority')).toBe(true);
    expect(hasField(ENV, 'password')).toBe(false); // the firewall: undeclared → false
  });
  it('getField returns the def or undefined', () => {
    expect(getField(ENV, 'priority')?.enumValues).toEqual(['low', 'high']);
    expect(getField(ENV, 'nope')).toBeUndefined();
  });
});

describe('F0 — BoundValue type discriminates at runtime', () => {
  it('a BoundValue is exactly one of binding | literal', () => {
    const values: BoundValue[] = [field('subject'), literal('Inbox')];
    const kinds = values.map((v) => v.kind).sort();
    expect(kinds).toEqual(['field', 'literal']);
  });
});
