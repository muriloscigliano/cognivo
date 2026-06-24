/**
 * Dynamic Software Interfaces — a deterministic pipeline-aware mock client.
 * Plan: ../03-frontier-plan.md. Used by the live page so the FRONTIER actually
 * runs (audit "island" fix) without an API key; the real adapter satisfies the
 * same PipelineTemplateClient interface.
 *
 * Routes an intent to {pipeline?, template}:
 *  - "overdue" / "due"  → filter(isOverdue/this-week) before the surface
 *  - "by priority" / "group" / "board" → group(priority) + a board template
 *  - else → no pipeline, the rich surface over raw data
 */

import { field, literal } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { richListTemplate, richTaskTemplate, richSummaryTemplate } from './surface-library.js';
import { type DataPipeline } from './data-op.js';
import { type PipelineTemplateClient, type PipelineTemplateOutput } from './pipeline-generate.js';

const boardOverGroups: InterfaceTemplate = {
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: {
    root: node('root', 'Stack', { direction: literal('row'), gap: literal('md') }, ['card']),
    card: node('card', 'MetricCard', { title: field('item.p'), value: field('item.n') }),
  },
  repeats: { card: { over: field('items'), as: 'item' } },
};

function groupByPriority(): DataPipeline {
  return {
    schemaId: 'inbox.message.v1',
    ops: [{ kind: 'group', by: 'priority', keyAs: 'p', countAs: 'n' }],
    outputSchema: [{ key: 'p', type: 'text', label: 'Priority' }, { key: 'n', type: 'number', label: 'Count' }],
  };
}

function filterOverdue(): DataPipeline {
  // derive isOverdue, then keep only overdue — output keeps the raw fields + the flag.
  return {
    schemaId: 'inbox.message.v1',
    ops: [
      { kind: 'derive', fn: 'isOverdue', from: 'dueDate', as: 'overdue' },
      { kind: 'filter', field: 'overdue', operator: 'eq', value: literal(true) },
    ],
    outputSchema: [
      { key: 'subject', type: 'text', label: 'Subject' },
      { key: 'from', type: 'text', label: 'From' },
      { key: 'dueDate', type: 'date', label: 'Due' },
      { key: 'priority', type: 'enum', label: 'Priority', enumValues: ['low', 'normal', 'high', 'urgent'] },
      { key: 'unread', type: 'bool', label: 'Unread' },
      { key: 'overdue', type: 'bool', label: 'Overdue' },
    ],
  };
}

export class MockPipelineTemplateLLM implements PipelineTemplateClient {
  readonly name = 'mock-pipeline-template';
  async generate(req: { system: string; user: string }): Promise<PipelineTemplateOutput> {
    const intent = req.user.toLowerCase();
    const wantsGroup = /by priority|group|board|kanban|column/.test(intent);
    const wantsOverdue = /overdue|due|this week|today/.test(intent);

    if (wantsGroup) {
      return { pipeline: groupByPriority(), template: boardOverGroups };
    }
    if (wantsOverdue) {
      return { pipeline: filterOverdue(), template: richListTemplate() };
    }
    if (/task|checklist|to-?do/.test(intent)) return { template: richTaskTemplate() };
    if (/summary|overview|total|count/.test(intent)) return { template: richSummaryTemplate() };
    return { template: richListTemplate() };
  }
}
