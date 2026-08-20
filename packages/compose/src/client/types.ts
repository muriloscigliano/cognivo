/**
 * @cognivo/compose — Composition client contract.
 *
 * The seam between the modify loop and whatever produces compositions. Kept
 * provider-neutral (no LLM SDK dependency) so it works with the Anthropic
 * adapter, a future core `compose` intent, a deterministic mock, or a test fake.
 *
 * `compose` returns a full tree; `modify` returns a DIFF against a base tree.
 * Diffs are computed on OUR side (see llm-client.ts) — the model emits a full
 * revised tree and we `diff()` it locally — so a hallucinated diff op can never
 * corrupt the tree. The model's job is to produce valid compositions, not valid
 * patch scripts.
 */

import type { ElementNode } from '@cognivo/gen-ui';
import type { CompositionDiff } from '../diff/types.js';

export interface ComposeClient {
  /**
   * Produce a composition tree for a prompt. `feedback` carries grammar-retry
   * text from a prior failed attempt (see grammar/retry.ts) when present.
   */
  compose(prompt: string, feedback?: string): Promise<ElementNode>;
  /** Produce a diff modifying `baseTree` for a prompt. */
  modify(prompt: string, baseTree: ElementNode): Promise<CompositionDiff>;
}

/**
 * A minimal text-completion function the LLM-backed client depends on, instead
 * of a concrete SDK. Providers adapt to this in one line; tests pass a fake.
 * `system` is the component-lang authoring prompt; `user` is the task.
 */
export type TextCompletion = (args: { system: string; user: string }) => Promise<string>;
