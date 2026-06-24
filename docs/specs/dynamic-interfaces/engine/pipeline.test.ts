/**
 * M1 — pipeline governance + execution tests. Plan: ../03-frontier-plan.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/pipeline.test.ts
 */
import { describe, it, expect } from 'vitest';
import { literal, type DatasetEnvelope, type FieldDef } from './contracts.js';
import { type DataManifest, type DataPipeline } from './data-op.js';
import { governPipeline, resolvePipeline } from './pipeline.js';

const FIELDS: FieldDef[] = [
  { key: 'subject', type: 'text', label: 'Subject' },
  { key: 'from', type: 'text', label: 'From' },
  { key: 'dueDate', type: 'date', label: 'Due' },
  { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high', 'urgent'] },
];
const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: FIELDS,
  items: [
    { subject: 'Budget', from: 'Dana', dueDate: '2020-01-01', priority: 'urgent' },
    { subject: 'Lunch', from: 'Sam', dueDate: '2099-01-01', priority: 'low' },
    { subject: 'Retro', from: 'Alex', dueDate: '2099-01-02', priority: 'high' },
  ],
};
const MANIFEST: DataManifest = {
  schemaId: 'inbox.message.v1',
  grants: [
    { field: 'priority', ops: ['filter', 'group'], filterOperators: ['eq', 'in'] },
    { field: 'dueDate', ops: ['filter', 'sort', 'derive'], filterOperators: ['lt', 'gte', 'isEmpty'], deriveFns: ['isOverdue', 'dateBucket'] },
    { field: 'subject', ops: ['sort'] },
    // 'from' read-only (no grant)
  ],
  policy: { maxRows: 100, maxOps: 10, maxGroups: 50 },
};
const NOW = new Date('2021-06-01T00:00:00Z');

describe('M1 — governance rejects ungoverned pipelines (fail-closed)', () => {
  it('rejects an op on an undeclared field', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'ghost', operator: 'eq', value: literal('x') }], outputSchema: FIELDS };
    expect(governPipeline(p, ENV, MANIFEST).ok).toBe(false);
  });
  it('rejects an op the vendor did not grant on that field (default-deny)', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'from', operator: 'eq', value: literal('Dana') }], outputSchema: FIELDS };
    const r = governPipeline(p, ENV, MANIFEST);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.message.includes('does not permit'))).toBe(true);
  });
  it('rejects a filter operator outside the granted subset', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'priority', operator: 'lt', value: literal('high') }], outputSchema: FIELDS };
    expect(governPipeline(p, ENV, MANIFEST).ok).toBe(false); // priority grants eq/in only
  });
  it('rejects an ordered operator on a non-ordered field', () => {
    const m: DataManifest = { ...MANIFEST, grants: [{ field: 'subject', ops: ['filter'], filterOperators: ['lt'] }, ...MANIFEST.grants] };
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'subject', operator: 'lt', value: literal('m') }], outputSchema: FIELDS };
    expect(governPipeline(p, ENV, m).ok).toBe(false); // subject is text, lt is ordered
  });
  it('rejects limit over policy maxRows', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'limit', count: 9999 }], outputSchema: FIELDS };
    expect(governPipeline(p, ENV, MANIFEST).ok).toBe(false);
  });
  it('rejects too many ops (cost cap)', () => {
    const ops = Array.from({ length: 11 }, () => ({ kind: 'sort' as const, field: 'subject', direction: 'asc' as const }));
    const p: DataPipeline = { schemaId: ENV.schemaId, ops, outputSchema: FIELDS };
    expect(governPipeline(p, ENV, MANIFEST).ok).toBe(false);
  });
  it('rejects an outputSchema that mismatches what the ops produce', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'sort', field: 'subject', direction: 'asc' }], outputSchema: [{ key: 'wrong', type: 'text', label: 'x' }] };
    expect(governPipeline(p, ENV, MANIFEST).ok).toBe(false);
  });
});

describe('M1 — execution is pure + deterministic', () => {
  it('filter keeps only matching rows', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'priority', operator: 'eq', value: literal('high') }], outputSchema: FIELDS };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    expect(r.output!.items.map((i) => (i as Record<string, unknown>).subject)).toEqual(['Retro']);
  });
  it('sort orders rows, stable + total', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'sort', field: 'subject', direction: 'asc' }], outputSchema: FIELDS };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    expect(r.output!.items.map((i) => (i as Record<string, unknown>).subject)).toEqual(['Budget', 'Lunch', 'Retro']);
  });
  it('derive(isOverdue) appends a bool from a closed built-in (no eval)', () => {
    const out: FieldDef[] = [...FIELDS, { key: 'overdue', type: 'bool', label: 'Overdue' }];
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'derive', fn: 'isOverdue', from: 'dueDate', as: 'overdue' }], outputSchema: out };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    const overdue = r.output!.items.map((i) => (i as Record<string, unknown>).overdue);
    expect(overdue).toEqual([true, false, false]); // only the 2020 item is overdue at 2021
  });
  it('group partitions into deterministic buckets with counts', () => {
    const out: FieldDef[] = [{ key: 'p', type: 'text', label: 'P' }, { key: 'n', type: 'number', label: 'N' }];
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'group', by: 'priority', keyAs: 'p', countAs: 'n' }], outputSchema: out };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    const groups = r.output!.items.map((i) => (i as Record<string, unknown>).p);
    expect(groups).toEqual(['high', 'low', 'urgent']); // sorted, deterministic
  });
  it('a derived collection is a DatasetEnvelope (binds downstream unchanged)', () => {
    const out: FieldDef[] = [{ key: 'p', type: 'text', label: 'P' }, { key: 'n', type: 'number', label: 'N' }];
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'group', by: 'priority', keyAs: 'p', countAs: 'n' }], outputSchema: out };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    expect(r.output!.schemaId).toBe(ENV.schemaId);
    expect(r.output!.fields).toEqual(out); // fields === proven outputSchema
  });
  it('an ungoverned pipeline never executes (output null)', () => {
    const p: DataPipeline = { schemaId: ENV.schemaId, ops: [{ kind: 'filter', field: 'from', operator: 'eq', value: literal('Dana') }], outputSchema: FIELDS };
    const r = resolvePipeline(p, ENV, MANIFEST, { now: NOW });
    expect(r.output).toBeNull();
  });
});

describe('FIX H2 — type-correct comparators (no mixed-type corruption)', () => {
  const numEnv: DatasetEnvelope = {
    schemaId: 'inbox.message.v1',
    fields: [{ key: 'amount', type: 'number', label: 'Amount' }, { key: 'subject', type: 'text', label: 'S' }],
    items: [{ amount: 10, subject: 'a' }, { amount: 9, subject: 'b' }, { amount: '100', subject: 'c' }, { amount: 2, subject: 'd' }],
  };
  const numManifest: DataManifest = {
    schemaId: 'inbox.message.v1',
    grants: [{ field: 'amount', ops: ['sort', 'aggregate'], aggregateFns: ['min', 'max'] }],
    policy: { maxRows: 100, maxOps: 10, maxGroups: 50 },
  };

  it('min over a number field with a numeric-string value returns 2, not "100"', () => {
    const out: FieldDef[] = [{ key: 'lo', type: 'number', label: 'Lo' }];
    const p: DataPipeline = { schemaId: 'inbox.message.v1', ops: [{ kind: 'aggregate', entries: [{ fn: 'min', field: 'amount', as: 'lo' }] }], outputSchema: out };
    const r = resolvePipeline(p, numEnv, numManifest, { now: NOW });
    expect(Number((r.output!.items[0] as Record<string, unknown>).lo)).toBe(2); // was "100" with the bug
  });

  it('numeric sort is monotonic even with a string value mixed in', () => {
    const p: DataPipeline = { schemaId: 'inbox.message.v1', ops: [{ kind: 'sort', field: 'amount', direction: 'asc' }], outputSchema: numEnv.fields };
    const r = resolvePipeline(p, numEnv, numManifest, { now: NOW });
    const amts = r.output!.items.map((i) => Number((i as Record<string, unknown>).amount));
    expect(amts).toEqual([2, 9, 10, 100]); // numeric order, not lexicographic
  });
});

describe('FIX H1 — group cardinality cap (DoS guard)', () => {
  it('a group exceeding maxGroups overflows to a rejection, not an unbounded map', () => {
    const manyEnv: DatasetEnvelope = {
      schemaId: 'inbox.message.v1',
      fields: [{ key: 'id', type: 'text', label: 'Id' }],
      items: Array.from({ length: 20 }, (_, i) => ({ id: `id-${i}` })), // 20 distinct
    };
    const m: DataManifest = { schemaId: 'inbox.message.v1', grants: [{ field: 'id', ops: ['group'] }], policy: { maxRows: 100, maxOps: 10, maxGroups: 5 } };
    const out: FieldDef[] = [{ key: 'k', type: 'text', label: 'K' }, { key: 'n', type: 'number', label: 'N' }];
    const p: DataPipeline = { schemaId: 'inbox.message.v1', ops: [{ kind: 'group', by: 'id', keyAs: 'k', countAs: 'n' }], outputSchema: out };
    const r = resolvePipeline(p, manyEnv, m, { now: NOW });
    expect(r.output).toBeNull();
    expect(r.rejections.some((x) => x.message.includes('cardinality cap'))).toBe(true);
  });
});
