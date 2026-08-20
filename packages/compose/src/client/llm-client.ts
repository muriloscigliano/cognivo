/**
 * @cognivo/compose — LLM-backed ComposeClient.
 *
 * Turns prompts into compositions via a provider-neutral `TextCompletion`
 * function. Uses the gen-ui library's own component-lang system prompt
 * (`library.prompt()`), parses the model's DSL response into an ElementNode with
 * gen-ui's parser, and — crucially — computes MODIFY diffs on our side: the model
 * emits a full revised tree, and we `diff()` it locally against the base. A
 * hallucinated patch op can therefore never corrupt the tree; the worst a bad
 * model output can do is fail to parse (handled) or lint (caught by the canvas).
 *
 * Framework-agnostic: no LLM SDK import. Wire any provider by adapting it to
 * `TextCompletion` (one function). See docs for the Anthropic raw-text recipe.
 */

import type { ElementNode, Library } from '@cognivo/gen-ui';
import { createParser } from '@cognivo/gen-ui';
import type { ComposeClient, TextCompletion } from './types.js';
import type { CompositionDiff } from '../diff/types.js';
import { diff } from '../diff/diff.js';

export interface LlmComposeClientOptions {
  /** The gen-ui component library (provides the system prompt + parse schema). */
  library: Library;
  /** Provider-neutral text completion. */
  complete: TextCompletion;
  /**
   * Extra instruction appended to modify requests, telling the model to return a
   * COMPLETE revised composition (not a diff). Overridable for tuning.
   */
  modifyInstruction?: string;
}

const DEFAULT_MODIFY_INSTRUCTION =
  'Return the COMPLETE revised composition in component-lang, not just the change. ' +
  'Preserve every element the user did not ask to change, keeping its component and props identical.';

/** Parse a DSL string into a root ElementNode, or throw if it produces no root. */
function parseTree(library: Library, dsl: string): ElementNode {
  const parser = createParser(library.toJSONSchema());
  const result = parser.parse(dsl);
  if (!result.root) {
    throw new Error('ComposeClient: model output did not parse to a composition root');
  }
  return result.root;
}

/**
 * Build a ComposeClient backed by an LLM (or any `TextCompletion`).
 *
 * - `compose(prompt, feedback?)` → the model produces component-lang; we parse it.
 *   Retry `feedback` (grammar violations) is appended to the user message.
 * - `modify(prompt, base)` → we render the base back to component-lang context,
 *   ask for a full revised tree, parse it, and diff it against `base` locally.
 */
export function createLlmComposeClient(options: LlmComposeClientOptions): ComposeClient {
  const { library, complete } = options;
  const system = library.prompt();
  const modifyInstruction = options.modifyInstruction ?? DEFAULT_MODIFY_INSTRUCTION;

  return {
    async compose(prompt: string, feedback?: string): Promise<ElementNode> {
      const user = feedback ? `${prompt}\n\n${feedback}` : prompt;
      const dsl = await complete({ system, user });
      return parseTree(library, dsl);
    },

    async modify(prompt: string, baseTree: ElementNode): Promise<CompositionDiff> {
      const user = [
        'Here is the current composition (as a component tree, JSON):',
        JSON.stringify(baseTree),
        '',
        `The user asks: ${prompt}`,
        '',
        modifyInstruction,
      ].join('\n');
      const dsl = await complete({ system, user });
      const revised = parseTree(library, dsl);
      // Diff locally — never trust the model to emit valid patch ops.
      return diff(baseTree, revised);
    },
  };
}
