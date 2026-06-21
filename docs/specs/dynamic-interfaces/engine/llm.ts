/**
 * Dynamic Software Interfaces — G0: the LLM client seam + deterministic mock.
 *
 * Plan: ../plans/G0-generation.md.  Build principle: no shortcuts — a narrow
 * interface both a deterministic MockLLM and (later) the real Anthropic adapter
 * satisfy, so the whole pipeline is CI-testable without a key and swaps to the
 * real model unchanged.
 *
 * Generation is schema-constrained (P49): the client returns a structured DSL
 * tree (UiNode), not free text we hope to parse. The MockLLM lets us exercise
 * governance + (later) the repair loop deterministically.
 */

import { field, literal } from './contracts.js';
import { type UiNode } from './resolver.js';

export interface LlmRequest {
  system: string;
  user: string;
  /** Sampling index (for self-consistency, G1b). Mock uses it to vary output. */
  sample?: number;
}

export interface LlmResponse {
  /** The structured tree the model produced (schema-constrained output). */
  tree: UiNode;
  /** Optional raw content, for debugging / real-adapter parity. */
  raw?: string;
}

export interface LlmClient {
  readonly name: string;
  generate(req: LlmRequest): Promise<LlmResponse>;
}

// ─── Known-good trees the mock can emit (keyed by intent shape) ───────────────

function listTree(): UiNode {
  return {
    type: 'Stack',
    props: {
      direction: literal('column'),
      children: [
        { type: 'Row', props: { title: field('subject'), badge: field('priority') } },
      ],
    },
  };
}

function taskTree(): UiNode {
  return {
    type: 'Stack',
    props: {
      direction: literal('column'),
      children: [{ type: 'Checkbox', props: { label: field('subject') } }],
    },
  };
}

function summaryTree(): UiNode {
  return {
    type: 'Stack',
    props: {
      direction: literal('column'),
      children: [
        { type: 'Text', props: { text: literal('Inbox summary') } },
        { type: 'Row', props: { title: literal('Total'), value: literal(6) } },
      ],
    },
  };
}

// ─── Scripted failure modes (so tests can drive governance/repair) ────────────

export type MockFailure = 'unknown-component' | 'undeclared-field' | 'injection-followed';

function failureTree(mode: MockFailure): UiNode {
  switch (mode) {
    case 'unknown-component':
      return { type: 'Stack', props: { children: [{ type: 'Nonexistent', props: {} }] } };
    case 'undeclared-field':
      return { type: 'Row', props: { secret: field('password') } };
    case 'injection-followed':
      // As if the model obeyed an injected instruction and bound a forbidden field.
      return { type: 'Row', props: { leak: field('password') } };
  }
}

export interface MockLLMOptions {
  /** Force a specific failure mode regardless of intent (for governance tests). */
  forceFailure?: MockFailure;
  /**
   * Repair-aware mode (for G1e): emit `forceFailure` for the first `repairAfter`
   * calls, then heal to a good tree. Lets us test convergence + cap without a key.
   * Requires `forceFailure` to be set. If omitted, the failure never heals.
   */
  repairAfter?: number;
  /** Map an intent substring to a tree builder (extends the defaults). */
  overrides?: Array<{ match: RegExp; tree: () => UiNode }>;
}

/**
 * Deterministic mock LLM. Maps the user intent to a known-good tree, or a
 * scripted failure. Output is a pure function of (intent, opts) EXCEPT in
 * repair-aware mode, where it heals after a fixed number of calls — that call
 * count is the only state, and it is monotonic, so behavior is still fully
 * predictable for tests.
 */
export class MockLLM implements LlmClient {
  readonly name = 'mock';
  private calls = 0;
  constructor(private opts: MockLLMOptions = {}) {}

  async generate(req: LlmRequest): Promise<LlmResponse> {
    const call = this.calls++;
    if (this.opts.forceFailure) {
      const heals = this.opts.repairAfter !== undefined && call >= this.opts.repairAfter;
      if (!heals) {
        return { tree: failureTree(this.opts.forceFailure), raw: `mock:${this.opts.forceFailure}:${call}` };
      }
      // healed: fall through to normal intent routing below
    }
    const intent = req.user.toLowerCase();
    for (const o of this.opts.overrides ?? []) {
      if (o.match.test(intent)) return { tree: o.tree(), raw: 'mock:override' };
    }
    if (/task|checklist|to-?do/.test(intent)) return { tree: taskTree(), raw: 'mock:task' };
    if (/summary|count|total|overview/.test(intent)) return { tree: summaryTree(), raw: 'mock:summary' };
    return { tree: listTree(), raw: 'mock:list' };
  }
}
