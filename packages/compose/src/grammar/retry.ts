/**
 * @cognivo/compose — Turn grammar violations into agent-retry feedback.
 *
 * When `lint` returns violations, the modify loop appends this text to the next
 * prompt and asks the agent to try again. The format is terse and imperative —
 * it's read by a model, not a human, though it stays legible for debugging.
 */

import type { GrammarViolation } from './types.js';

/**
 * Format violations as a numbered instruction block. Empty input → empty string
 * (caller uses that to decide whether a retry is needed at all).
 */
export function formatRetryFeedback(violations: GrammarViolation[]): string {
  if (violations.length === 0) return '';
  const lines = violations.map((v, i) => `${i + 1}. ${v.message}`);
  return [
    'The composition you produced violates the layout grammar. Fix every issue below and return a corrected composition:',
    ...lines,
    'Do not introduce new components to work around a limit — remove, merge, or resize existing ones.',
  ].join('\n');
}
