/**
 * M0 — DataOp contract tests. Plan: ../03-frontier-plan.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/data-op.test.ts
 */
import { describe, it, expect } from 'vitest';
import {
  grantFor,
  permitsOp,
  isDataOp,
  ORDERED_TYPES,
  ORDERED_OPERATORS,
  NO_VALUE_OPERATORS,
  type DataManifest,
} from './data-op.js';

const MANIFEST: DataManifest = {
  schemaId: 'inbox.message.v1',
  grants: [
    { field: 'priority', ops: ['filter', 'group'], filterOperators: ['eq', 'in'] },
    { field: 'dueDate', ops: ['filter', 'sort', 'derive'], filterOperators: ['lt', 'gte', 'isEmpty'], deriveFns: ['dateBucket', 'isOverdue'] },
    { field: 'subject', ops: ['sort'] },
    // 'from' has NO grant → read-only data, no ops permitted (default-deny)
  ],
  policy: { maxRows: 500, maxOps: 12, maxGroups: 50 },
};

describe('M0 — per-field default-deny capability', () => {
  it('permitsOp is true only for granted (field, op) pairs', () => {
    expect(permitsOp(MANIFEST, 'priority', 'filter')).toBe(true);
    expect(permitsOp(MANIFEST, 'priority', 'group')).toBe(true);
    expect(permitsOp(MANIFEST, 'priority', 'sort')).toBe(false); // not granted
  });

  it('a field with NO grant denies every op (default-deny)', () => {
    expect(permitsOp(MANIFEST, 'from', 'filter')).toBe(false);
    expect(permitsOp(MANIFEST, 'from', 'sort')).toBe(false);
    expect(permitsOp(MANIFEST, 'nonexistent', 'filter')).toBe(false);
  });

  it('grantFor returns the grant or undefined', () => {
    expect(grantFor(MANIFEST, 'dueDate')?.deriveFns).toEqual(['dateBucket', 'isOverdue']);
    expect(grantFor(MANIFEST, 'from')).toBeUndefined();
  });
});

describe('M0 — DataOp guard', () => {
  it('accepts every op kind', () => {
    for (const kind of ['filter', 'sort', 'group', 'derive', 'aggregate', 'limit']) {
      expect(isDataOp({ kind })).toBe(true);
    }
  });
  it('rejects non-ops', () => {
    expect(isDataOp({ kind: 'evil' })).toBe(false);
    expect(isDataOp(null)).toBe(false);
    expect(isDataOp('filter')).toBe(false);
  });
});

describe('M0 — operator/type classification (injection guards)', () => {
  it('ordered operators + types are correctly classified', () => {
    expect(ORDERED_OPERATORS.has('lt')).toBe(true);
    expect(ORDERED_OPERATORS.has('eq')).toBe(false);
    expect(ORDERED_TYPES.has('number')).toBe(true);
    expect(ORDERED_TYPES.has('date')).toBe(true);
    expect(ORDERED_TYPES.has('text')).toBe(false);
  });
  it('no-value operators are classified (isEmpty/isNotEmpty take no operand)', () => {
    expect(NO_VALUE_OPERATORS.has('isEmpty')).toBe(true);
    expect(NO_VALUE_OPERATORS.has('eq')).toBe(false);
  });
});
