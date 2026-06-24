/**
 * W2 — template version store + undo (the moat). Plan: ../02-build-plan-phase-S-W.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/template-store.test.ts
 */
import { describe, it, expect } from 'vitest';
import { field, literal } from './contracts.js';
import { node, type InterfaceTemplate } from './template.js';
import { TemplateStore, createMemoryTemplateBackend } from './template-store.js';

const tpl = (label: string): InterfaceTemplate => ({
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: { root: node('root', 'TextContent', { text: literal(label) }) },
});
const listTpl: InterfaceTemplate = {
  schemaId: 'inbox.message.v1', root: 'root',
  nodes: { root: node('root', 'TextContent', { text: field('item.subject') }) },
  repeats: { root: { over: field('items'), as: 'item' } },
};

function store() {
  let t = 0;
  return new TemplateStore({
    backend: createMemoryTemplateBackend(),
    now: () => `2026-06-23T00:00:${String(t++).padStart(2, '0')}Z`,
  });
}

const U = 'maya', T = 'inbox-main';

describe('W2 — immutable versioning + lineage', () => {
  it('first save is v1 with no parent', async () => {
    const s = store();
    const v1 = await s.save({ userId: U, templateId: T, intent: 'list', template: listTpl });
    expect(v1.version).toBe(1);
    expect(v1.parentVersion).toBeUndefined();
  });

  it('subsequent saves increment version + record parent', async () => {
    const s = store();
    await s.save({ userId: U, templateId: T, intent: 'list', template: listTpl });
    const v2 = await s.save({ userId: U, templateId: T, intent: 'tasks', template: tpl('tasks') });
    expect(v2.version).toBe(2);
    expect(v2.parentVersion).toBe(1);
  });

  it('getActive returns the latest', async () => {
    const s = store();
    await s.save({ userId: U, templateId: T, intent: 'a', template: tpl('a') });
    await s.save({ userId: U, templateId: T, intent: 'b', template: tpl('b') });
    expect((await s.getActive(U, T))!.intent).toBe('b');
  });
});

describe('W2 — first-class undo (append-only, no hard cut)', () => {
  it('undo restores the previous version as a NEW latest version', async () => {
    const s = store();
    const v1 = await s.save({ userId: U, templateId: T, intent: 'list', template: listTpl });
    await s.save({ userId: U, templateId: T, intent: 'tasks', template: tpl('tasks') });
    const undone = await s.undo(U, T);
    expect(undone!.version).toBe(3); // append-only: new version, not a deletion
    expect(undone!.template).toEqual(v1.template); // content restored
    expect((await s.versions(U, T))).toHaveLength(3); // history intact
  });

  it('undoTo a specific version clones it forward', async () => {
    const s = store();
    const v1 = await s.save({ userId: U, templateId: T, intent: 'v1', template: tpl('one') });
    await s.save({ userId: U, templateId: T, intent: 'v2', template: tpl('two') });
    await s.save({ userId: U, templateId: T, intent: 'v3', template: tpl('three') });
    const back = await s.undoTo(U, T, v1.version);
    expect(back.template).toEqual(v1.template);
    expect((await s.getActive(U, T))!.template).toEqual(v1.template);
  });

  it('undo with no history to undo to returns null', async () => {
    const s = store();
    await s.save({ userId: U, templateId: T, intent: 'only', template: tpl('only') });
    expect(await s.undo(U, T)).toBeNull();
  });
});

describe('W2 — the corpus (the moat)', () => {
  it('corpus lists one active row per distinct interface', async () => {
    const s = store();
    await s.save({ userId: U, templateId: 'inbox', intent: 'a', template: tpl('a') });
    await s.save({ userId: U, templateId: 'inbox', intent: 'b', template: tpl('b') });
    await s.save({ userId: U, templateId: 'calendar', intent: 'c', template: tpl('c') });
    const corpus = await s.corpus(U);
    expect(corpus).toHaveLength(2); // inbox + calendar
    expect(corpus.find((r) => r.templateId === 'inbox')!.intent).toBe('b'); // latest
  });

  it('isolates per user', async () => {
    const s = store();
    await s.save({ userId: 'maya', templateId: 'x', intent: 'a', template: tpl('a') });
    await s.save({ userId: 'sam', templateId: 'x', intent: 'b', template: tpl('b') });
    expect(await s.corpus('maya')).toHaveLength(1);
    expect(await s.corpus('sam')).toHaveLength(1);
  });
});
