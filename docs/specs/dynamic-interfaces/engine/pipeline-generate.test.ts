/**
 * M2+M3 — generation emits {pipeline, template}; template binds derived data.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/pipeline-generate.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal, type DatasetEnvelope, type FieldDef } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { type ComponentRegistry } from './governance.js';
import { type DataManifest, type DataPipeline } from './data-op.js';
import {
  generateWithPipeline,
  type PipelineTemplateClient,
  type PipelineTemplateOutput,
  type PipelineGenerateDeps,
} from './pipeline-generate.js';

const FIELDS: FieldDef[] = [
  { key: 'subject', type: 'text', label: 'Subject' },
  { key: 'dueDate', type: 'date', label: 'Due' },
  { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'high', 'urgent'] },
];
const ENV: DatasetEnvelope = {
  schemaId: 'inbox.message.v1',
  fields: FIELDS,
  items: [
    { subject: 'Budget', dueDate: '2020-01-01', priority: 'urgent' },
    { subject: 'Old retro', dueDate: '2020-02-01', priority: 'urgent' },
    { subject: 'Lunch', dueDate: '2099-01-01', priority: 'low' },
  ],
};
const MANIFEST: DataManifest = {
  schemaId: 'inbox.message.v1',
  grants: [
    { field: 'dueDate', ops: ['filter', 'derive'], filterOperators: ['lt'], deriveFns: ['isOverdue'] },
    { field: 'priority', ops: ['group', 'filter'], filterOperators: ['eq'] },
  ],
  policy: { maxRows: 100, maxOps: 10, maxGroups: 50 },
};
const NOW = new Date('2021-06-01T00:00:00Z');

const KNOWN = new Set(['Stack', 'Card', 'TextContent', 'Badge', 'MetricCard']);
const registry: ComponentRegistry = { getTagName: (t) => (KNOWN.has(t) ? `cg-${t.toLowerCase()}` : undefined) };

// A board template over a GROUPED collection: binds the derived fields p / n.
const groupedSchema: FieldDef[] = [
  { key: 'p', type: 'text', label: 'Priority' },
  { key: 'n', type: 'number', label: 'Count' },
  { key: 'items', type: 'text', label: 'Items' },
];
const boardOverGroups: InterfaceTemplate = {
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: {
    root: node('root', 'Stack', { direction: literal('row') }, ['col']),
    col: node('col', 'MetricCard', { title: field('item.p'), value: field('item.n') }),
  },
  repeats: { col: { over: field('items'), as: 'item' } },
};
const overdueGroupedPipeline: DataPipeline = {
  schemaId: 'inbox.message.v1',
  ops: [
    { kind: 'filter', field: 'dueDate', operator: 'lt', value: literal('2021-06-01') },
    { kind: 'group', by: 'priority', keyAs: 'p', countAs: 'n' },
  ],
  outputSchema: [{ key: 'p', type: 'text', label: 'Priority' }, { key: 'n', type: 'number', label: 'Count' }],
};

const client = (out: PipelineTemplateOutput): PipelineTemplateClient => ({ name: 'mock', async generate() { return out; } });
const deps = (out: PipelineTemplateOutput): PipelineGenerateDeps => ({ client: client(out), registry, manifest: MANIFEST, now: NOW });
const PROMPT = { system: '', user: '' };

describe('M2+M3 — the governed middleware loop end to end', () => {
  it('pipeline (filter overdue → group by priority) feeds a board template', async () => {
    const r = await generateWithPipeline('overdue grouped by priority as a board', ENV, deps({ pipeline: overdueGroupedPipeline, template: boardOverGroups }), PROMPT);
    expect(r.ok).toBe(true);
    expect(r.rejections).toEqual([]);
    // bound envelope is the DERIVED collection: only urgent had overdue items
    expect(r.boundEnvelope.fields.map((f) => f.key).sort()).toEqual(['n', 'p']);
    // resolved board cards bind the grouped key/count from derived data
    const cards: Array<Record<string, unknown>> = [];
    const walk = (n: { type: string; props: Record<string, unknown>; children: any[] }) => {
      if (n.type === 'MetricCard') cards.push(n.props);
      n.children.forEach(walk);
    };
    walk(r.resolved!);
    expect(cards).toHaveLength(1); // one group: urgent (2 overdue items)
    expect(cards[0].title).toBe('urgent');
    expect(cards[0].value).toBe(2);
  });

  it('no pipeline → template binds the RAW dataset', async () => {
    const listTpl: InterfaceTemplate = {
      schemaId: 'inbox.message.v1', root: 'root',
      nodes: { root: node('root', 'TextContent', { text: field('item.subject') }) },
      repeats: { root: { over: field('items'), as: 'item' } },
    };
    const r = await generateWithPipeline('list', ENV, deps({ template: listTpl }), PROMPT);
    expect(r.ok).toBe(true);
    expect(r.boundEnvelope).toBe(ENV); // raw env, no derivation
  });
});

describe('M2+M3 — fail-closed across both layers', () => {
  it('a pipeline op the vendor forbids → ok:false (pipeline firewall)', async () => {
    const badPipe: DataPipeline = {
      schemaId: 'inbox.message.v1',
      ops: [{ kind: 'sort', field: 'subject', direction: 'asc' }], // subject has no grant
      outputSchema: FIELDS,
    };
    const r = await generateWithPipeline('x', ENV, deps({ pipeline: badPipe, template: boardOverGroups }), PROMPT);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.message.includes('does not permit'))).toBe(true);
  });

  it('template binding a field the DERIVED schema lacks → ok:false (firewall on derived)', async () => {
    const badTpl: InterfaceTemplate = {
      schemaId: 'inbox.message.v1', root: 'root',
      nodes: { root: node('root', 'TextContent', { text: field('item.subject') }) }, // subject gone after group
      repeats: { root: { over: field('items'), as: 'item' } },
    };
    const r = await generateWithPipeline('x', ENV, deps({ pipeline: overdueGroupedPipeline, template: badTpl }), PROMPT);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.code === 'undeclared-field')).toBe(true);
  });

  it('pipeline emitted but no manifest configured → ok:false', async () => {
    const noManifest: PipelineGenerateDeps = { client: client({ pipeline: overdueGroupedPipeline, template: boardOverGroups }), registry, now: NOW };
    const r = await generateWithPipeline('x', ENV, noManifest, PROMPT);
    expect(r.ok).toBe(false);
    expect(r.rejections.some((x) => x.message.includes('no data manifest'))).toBe(true);
  });
});
