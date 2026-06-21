/**
 * G0 MockLLM tests. Plan: ../plans/G0-generation.md.
 * Run: node_modules/.bin/vitest run docs/specs/dynamic-interfaces/engine/llm.test.ts
 */
import { describe, it, expect } from 'vitest';
import { MockLLM } from './llm.js';

const req = (user: string, sample?: number) => ({ system: '', user, sample });

describe('G0 — MockLLM is deterministic and intent-routed', () => {
  it('routes task-ish intents to a checkbox tree', async () => {
    const r = await new MockLLM().generate(req('make it a checklist'));
    expect(JSON.stringify(r.tree)).toContain('Checkbox');
  });
  it('routes summary-ish intents to a summary tree', async () => {
    const r = await new MockLLM().generate(req('overview with totals'));
    expect(JSON.stringify(r.tree)).toContain('Inbox summary');
  });
  it('defaults to a list tree', async () => {
    const r = await new MockLLM().generate(req('anything else'));
    expect(r.tree.type).toBe('Stack');
    expect(r.raw).toBe('mock:list');
  });
  it('is deterministic: same input → identical output', async () => {
    const a = await new MockLLM().generate(req('make a task list'));
    const b = await new MockLLM().generate(req('make a task list'));
    expect(JSON.stringify(a.tree)).toBe(JSON.stringify(b.tree));
  });
  it('forceFailure overrides routing', async () => {
    const r = await new MockLLM({ forceFailure: 'unknown-component' }).generate(req('make a list'));
    expect(JSON.stringify(r.tree)).toContain('Nonexistent');
  });
  it('overrides match before defaults', async () => {
    const r = await new MockLLM({
      overrides: [{ match: /calendar/, tree: () => ({ type: 'Calendar', props: {} }) }],
    }).generate(req('show a calendar'));
    expect(r.tree.type).toBe('Calendar');
  });
});
