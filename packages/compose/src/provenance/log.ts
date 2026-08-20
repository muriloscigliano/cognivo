/**
 * @cognivo/compose — In-memory provenance log with a pluggable sink.
 *
 * Records the commit chain of a composition session. Timestamps are passed IN by
 * the caller — the engine never calls Date.now() (keeps it pure/testable and
 * matches the framework's no-ambient-clock rule).
 */

import type { ProvenanceEntry, ProvenanceSink } from './types.js';
import type { CompositionDiff } from '../diff/types.js';

export interface RecordInput {
  prompt: string;
  /** null for the initial composition (id 0). */
  diff: CompositionDiff | null;
  /** Hash of the resulting tree. */
  treeHash: string;
  /** Caller-supplied timestamp (ms). */
  ts: number;
}

export class ProvenanceLog {
  private entries: ProvenanceEntry[] = [];
  private sink: ProvenanceSink | undefined;

  constructor(sink?: ProvenanceSink) {
    this.sink = sink;
  }

  /** Append a step. Parent is the previous entry (null for the first). Returns it. */
  record(input: RecordInput): ProvenanceEntry {
    const parent = this.entries[this.entries.length - 1] ?? null;
    const entry: ProvenanceEntry = {
      id: this.entries.length,
      parentId: parent ? parent.id : null,
      prompt: input.prompt,
      diff: input.diff,
      treeHash: input.treeHash,
      ts: input.ts,
    };
    this.entries.push(entry);
    this.sink?.append(entry);
    return entry;
  }

  /** All entries, oldest first. */
  all(): readonly ProvenanceEntry[] {
    return this.entries;
  }

  /** The most recent entry, or null on an empty log. */
  head(): ProvenanceEntry | null {
    return this.entries[this.entries.length - 1] ?? null;
  }

  /** Serialize for export (the dataset). */
  export(): ProvenanceEntry[] {
    return this.entries.map((e) => ({ ...e }));
  }
}

/** Rebuild a log from exported entries (for replay/inspection). */
export function importProvenance(entries: ProvenanceEntry[], sink?: ProvenanceSink): ProvenanceLog {
  const log = new ProvenanceLog(sink);
  for (const e of entries) {
    log.record({ prompt: e.prompt, diff: e.diff as CompositionDiff | null, treeHash: e.treeHash, ts: e.ts });
  }
  return log;
}
