/**
 * A2 — template resolver tests. Architecture: ../01-architecture.md §L3.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/template-resolver.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { resolveTemplate, type RenderNode } from './template-resolver.js';

const ENV = (items: Array<Record<string, unknown>>): DatasetEnvelope => ({
  schemaId: 'inbox.message.v1',
  fields: [
    { key: 'subject', type: 'text', label: 'Subject' },
    { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high'] },
    { key: 'items', type: 'text', label: 'Items' }, // collection marker for repeats
  ],
  items,
});

// A list template: a Stack repeating a RichRow over the items, binding fields.
const LIST_TPL: InterfaceTemplate = {
  schemaId: 'inbox.message.v1',
  root: 'root',
  nodes: {
    root: node('root', 'Stack', { direction: literal('column') }, ['row']),
    row: node('row', 'RichRow', { title: field('item.subject'), badge: field('item.priority') }),
  },
  repeats: { row: { over: field('items'), as: 'item' } },
};

const flatten = (n: RenderNode, out: RenderNode[] = []): RenderNode[] => {
  out.push(n); n.children.forEach((c) => flatten(c, out)); return out;
};

describe('A2 — bindings resolve to LIVE data', () => {
  it('repeat expands one row per item, binding each item field', () => {
    const env = ENV([
      { subject: 'Budget', priority: 'high' },
      { subject: 'Lunch?', priority: 'low' },
    ]);
    const { root, rejections } = resolveTemplate(LIST_TPL, env);
    expect(rejections).toEqual([]);
    const rows = flatten(root!).filter((n) => n.type === 'RichRow');
    expect(rows).toHaveLength(2);
    expect(rows[0].props.title).toBe('Budget');
    expect(rows[0].props.badge).toBe('high');
    expect(rows[1].props.title).toBe('Lunch?');
  });

  it('literals pass through unchanged', () => {
    const { root } = resolveTemplate(LIST_TPL, ENV([{ subject: 'x', priority: 'low' }]));
    expect(root!.props.direction).toBe('column');
  });
});

describe('A2 — THE future-proof property: re-render on data change, NO LLM', () => {
  it('the SAME template renders different output as data changes', () => {
    const r1 = resolveTemplate(LIST_TPL, ENV([{ subject: 'First', priority: 'high' }]));
    const r2 = resolveTemplate(LIST_TPL, ENV([
      { subject: 'First', priority: 'high' },
      { subject: 'Second', priority: 'low' },
      { subject: 'Third', priority: 'high' },
    ]));
    const rows1 = flatten(r1.root!).filter((n) => n.type === 'RichRow');
    const rows2 = flatten(r2.root!).filter((n) => n.type === 'RichRow');
    expect(rows1).toHaveLength(1);
    expect(rows2).toHaveLength(3); // same template, more data, zero regeneration
    expect(rows2[2].props.title).toBe('Third');
  });

  it('stable ids carry the repeat index (keyed reconcile input)', () => {
    const { root } = resolveTemplate(LIST_TPL, ENV([{ subject: 'a', priority: 'low' }, { subject: 'b', priority: 'high' }]));
    const ids = flatten(root!).filter((n) => n.type === 'RichRow').map((n) => n.id);
    expect(ids[0]).toContain('#0');
    expect(ids[1]).toContain('#1');
    expect(new Set(ids).size).toBe(ids.length); // unique
  });
});

describe('A2 — firewall is enforced at resolve time (fail-closed)', () => {
  it('a binding to an undeclared field → root null + rejection', () => {
    const bad: InterfaceTemplate = {
      schemaId: 's', root: 'r',
      nodes: { r: node('r', 'Text', { text: field('password') }) },
    };
    const { root, rejections } = resolveTemplate(bad, ENV([{ subject: 'x', priority: 'low' }]));
    expect(root).toBeNull();
    expect(rejections.some((x) => x.code === 'undeclared-field')).toBe(true);
  });

  it('a repeat binding to an undeclared item field → rejection', () => {
    const bad: InterfaceTemplate = {
      schemaId: 's', root: 'root',
      nodes: {
        root: node('root', 'Stack', {}, ['row']),
        row: node('row', 'Text', { text: field('item.ssn') }),
      },
      repeats: { row: { over: field('items'), as: 'item' } },
    };
    const { root, rejections } = resolveTemplate(bad, ENV([{ subject: 'x', priority: 'low' }]));
    expect(root).toBeNull();
    expect(rejections.some((x) => x.message.includes('ssn'))).toBe(true);
  });

  it('data is never fabricated — values come only from items', () => {
    const env = ENV([{ subject: 'Real subject', priority: 'high' }]);
    const { root } = resolveTemplate(LIST_TPL, env);
    const titles = flatten(root!).filter((n) => n.type === 'RichRow').map((n) => n.props.title);
    expect(titles).toEqual(['Real subject']); // exactly the data, nothing invented
  });
});
