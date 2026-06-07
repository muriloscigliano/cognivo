import type { Finding } from '../types/findings.js';

/**
 * The runtime contract every agent implementation honors.
 *
 *  - explain() streams a human-readable explanation of a finding,
 *    yielding tokens / sentence fragments as they arrive.
 *  - suggestFix() produces a structured fix proposal for `codeable`
 *    findings; returns null when fixCategory === 'judgment' (no
 *    deterministic fix is possible).
 *
 * Implementations: AiClientAgent (real LLM via @cognivo/core), CassetteAgent
 * (deterministic test replay), NoOpAgent (default — throws). All three live
 * in this package.
 */
export interface LensAgent {
  explain(finding: Finding): AsyncIterable<string>;
  suggestFix(finding: Finding): Promise<AgentFixProposal | null>;
}

/**
 * Structured fix proposal produced by an agent. Discriminated by `change.kind`
 * so consumers can render / apply each variant safely.
 *
 * The lens engine itself does NOT apply fixes — it only proposes them. The
 * permission ladder + verifier (Phase 8 / MCP) are responsible for the apply
 * step.
 *
 * NOTE: distinct from the serializable file-diff `FixManifest` in
 * `../types/fix.ts` (Spec §9.3). This is the agent's *LLM proposal* (a single
 * `change`); the verifier consumes the file-diff manifest. They were two
 * never-reconciled designs that collided in the barrel — kept separate by name.
 */
export interface AgentFixProposal {
  /** Hash id of the finding this fix addresses. */
  findingId: string;
  /** The proposed change. */
  change: FixChange;
  /** One-line summary suitable for the UI's confirmation step. */
  summary: string;
  /** LLM rationale — stored verbatim for the audit log. */
  rationale: string;
  /** Confidence the LLM assigned to this fix (0–100). */
  confidence: number;
  /** ISO timestamp when this manifest was produced. */
  generatedAt: string;
}

/**
 * The four kinds of change a fix can propose. Selectors are CSS-shaped
 * (matching scene-query's subset grammar). Apply mechanisms (MCP / vite-
 * plugin / extension) interpret the change against the live page.
 */
export type FixChange =
  | { kind: 'set-attribute'; selector: string; attribute: string; value: string }
  | { kind: 'replace-text'; selector: string; from: string; to: string }
  | { kind: 'set-style'; selector: string; declarations: Record<string, string> }
  | { kind: 'replace-token'; selector: string; property: string; from: string; to: string };

/**
 * A cassette captures one or more LLM interactions for deterministic
 * replay. Cassettes ship as JSON files in `__fixtures__/cassettes/` and
 * are loaded via `loadCassette(path)`.
 *
 * Cassettes are part of lens-core's public surface so downstream packs
 * (lens-pack-ethics, lens-pack-conversion) can reuse the same replay
 * infrastructure for their own LLM rule tests.
 *
 * Schema version: when this file is changed in a backward-incompatible
 * way, bump CASSETTE_SCHEMA_VERSION below. Cassettes pinned to an older
 * version load with a clear "re-record cassette" error rather than
 * silently mis-replaying.
 */
export interface Cassette {
  /** Schema version this cassette was authored against. */
  schemaVersion: typeof CASSETTE_SCHEMA_VERSION;
  /** Human note for future-you. */
  notes?: string;
  /** ISO timestamp when this cassette was recorded / authored. */
  recordedAt?: string;
  /** Map of `${method}:${findingId}` → CassetteResponse. */
  responses: Record<string, CassetteResponse>;
}

export type CassetteResponse =
  /** explain — yields each chunk in order */
  | { kind: 'text'; chunks: readonly string[] }
  /** suggestFix — returns the manifest verbatim */
  | { kind: 'fix'; manifest: AgentFixProposal }
  /** suggestFix — explicitly null (judgment-category fix) */
  | { kind: 'null' }
  /** simulate an LLM error */
  | { kind: 'error'; message: string };

export const CASSETTE_SCHEMA_VERSION = 1 as const;

export function cassetteKey(
  method: 'explain' | 'suggestFix',
  findingId: string
): string {
  return `${method}:${findingId}`;
}

/**
 * Thrown when a NoOp agent's method is called. Indicates the consumer
 * created an agent without an AiClient (Tier 0 default per spec §10.4)
 * and then tried to use it.
 */
export class NoAgentConfiguredError extends Error {
  constructor() {
    super(
      'lens-core: agent is in NoOp mode. Pass an aiClient to createAgent() ' +
        'to enable LLM calls. Tier 0 (no network) is the default — opt in ' +
        'explicitly to use the agent.'
    );
    this.name = 'NoAgentConfiguredError';
  }
}

/**
 * Thrown when a cassette schema version doesn't match the runtime's.
 * Re-record the cassette (or re-author it) to upgrade.
 */
export class CassetteSchemaMismatchError extends Error {
  constructor(expected: number, got: unknown) {
    super(
      `lens-core: cassette schema version mismatch. Expected ${expected}, got ${String(got)}. ` +
        `Re-record the cassette or update CASSETTE_SCHEMA_VERSION.`
    );
    this.name = 'CassetteSchemaMismatchError';
  }
}
