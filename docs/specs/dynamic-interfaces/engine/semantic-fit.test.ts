/**
 * S3 — semantic-fit guardrail tests. Plan: ../02-build-plan-phase-S-W.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/semantic-fit.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { semanticFit } from './semantic-fit.js';

const env = (items: Array<Record<string, unknown>>): DatasetEnvelope => ({
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high'] },
    { key: 'dueDate', type: 'date', label: 'Due' },
    { key: 'items', type: 'text', label: 'Items' },
  ],
  items,
});

const calTemplate: InterfaceTemplate = {
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: { root: node('root', 'Calendar', { value: field('item.dueDate') }) },
  repeats: { root: { over: field('items'), as: 'item' } },
};
const listTemplate: InterfaceTemplate = {
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: { root: node('root', 'TextContent', { text: field('item.subject') }) },
  repeats: { root: { over: field('items'), as: 'item' } },
};

describe('S3 — calendar over sparse dates is flagged (not silently empty)', () => {
  it('warns when few items have a due date', () => {
    const e = env([
      { subject: 'a', priority: 'high', dueDate: '2026-06-21' },
      { subject: 'b', priority: 'low' },
      { subject: 'c', priority: 'low' },
      { subject: 'd', priority: 'low' },
    ]); // 1/4 dated = 25%
    const notes = semanticFit(calTemplate, e, 'show as a calendar');
    expect(notes.some((n) => n.severity === 'warn' && n.message.includes('calendar'))).toBe(true);
    expect(notes.find((n) => n.severity === 'warn')?.suggestion).toBe('show as a list');
  });

  it('does NOT warn when most items have dates', () => {
    const e = env([
      { subject: 'a', priority: 'high', dueDate: '2026-06-21' },
      { subject: 'b', priority: 'low', dueDate: '2026-06-22' },
    ]); // 100% dated
    const notes = semanticFit(calTemplate, e, 'show as a calendar');
    expect(notes.some((n) => n.severity === 'warn')).toBe(false);
  });
});

describe('S3 — board with a uniform group field is flagged', () => {
  it('warns when all items share one priority (single column)', () => {
    const e = env([
      { subject: 'a', priority: 'high' },
      { subject: 'b', priority: 'high' },
    ]);
    const notes = semanticFit(listTemplate, e, 'show as a board grouped by priority');
    expect(notes.some((n) => n.message.includes('single column'))).toBe(true);
  });

  it('does NOT warn when priorities vary', () => {
    const e = env([{ subject: 'a', priority: 'high' }, { subject: 'b', priority: 'low' }]);
    const notes = semanticFit(listTemplate, e, 'board by priority');
    expect(notes.some((n) => n.message.includes('single column'))).toBe(false);
  });
});

describe('S3 — fit notes are advisory, computed from real data', () => {
  it('empty data → an info note, not a crash', () => {
    const notes = semanticFit(listTemplate, env([]), 'show a list');
    expect(notes.some((n) => n.severity === 'info')).toBe(true);
  });

  it('a good-fit list over real data → no notes', () => {
    const e = env([{ subject: 'a', priority: 'high' }, { subject: 'b', priority: 'low' }]);
    expect(semanticFit(listTemplate, e, 'show as a list')).toEqual([]);
  });

  it('summary over very few items suggests a list', () => {
    const e = env([{ subject: 'a', priority: 'high' }]);
    const notes = semanticFit(listTemplate, e, 'give me a summary');
    expect(notes.some((n) => n.suggestion === 'show as a list')).toBe(true);
  });
});
