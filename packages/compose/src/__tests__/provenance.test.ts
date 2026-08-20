import { describe, it, expect } from 'vitest';
import { ProvenanceLog, importProvenance } from '../provenance/log.js';
import { diff } from '../diff/diff.js';
import { hashTree } from '../tree/hash.js';
import { dashboard, dashboardEdited } from './fixtures.js';

describe('ProvenanceLog', () => {
  it('records an initial composition then a diff step, chaining parentId', () => {
    const log = new ProvenanceLog();
    const base = dashboard();
    const e0 = log.record({ prompt: 'build a revenue dashboard', diff: null, treeHash: hashTree(base), ts: 1000 });
    const edited = dashboardEdited();
    const e1 = log.record({
      prompt: 'bump revenue and add a cost card',
      diff: diff(base, edited),
      treeHash: hashTree(edited),
      ts: 2000,
    });

    expect(e0.id).toBe(0);
    expect(e0.parentId).toBeNull();
    expect(e0.diff).toBeNull();
    expect(e1.id).toBe(1);
    expect(e1.parentId).toBe(0);
    expect(e1.diff).not.toBeNull();
    expect(log.head()).toBe(e1);
    expect(log.all()).toHaveLength(2);
  });

  it('forwards entries to a sink', () => {
    const captured: number[] = [];
    const log = new ProvenanceLog({ append: (e) => captured.push(e.id) });
    log.record({ prompt: 'a', diff: null, treeHash: 'h0', ts: 1 });
    log.record({ prompt: 'b', diff: null, treeHash: 'h1', ts: 2 });
    expect(captured).toEqual([0, 1]);
  });

  it('export/import round-trips', () => {
    const log = new ProvenanceLog();
    log.record({ prompt: 'a', diff: null, treeHash: 'h0', ts: 1 });
    log.record({ prompt: 'b', diff: null, treeHash: 'h1', ts: 2 });
    const restored = importProvenance(log.export());
    expect(restored.export()).toEqual(log.export());
  });
});
