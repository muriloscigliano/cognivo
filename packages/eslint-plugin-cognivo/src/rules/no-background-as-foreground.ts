import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

/**
 * Flags `color: var(--cg-*-background-*)` and `border-color: var(--cg-*-background-*)`
 * inside Lit `css` template literals.
 *
 * Tier-2 tokens have purpose suffixes — `*-background-*`, `*-text-*`, `*-border-*`.
 * Using a `*-background-*` token as `color:` or `border-color:` is semantic drift
 * (the value works *today* but a designer retuning `*-background-default` to a
 * translucent fill will silently break the foreground).
 *
 * Recommended replacements:
 *   - `color: var(--cg-color-action-primary-background-default)` →
 *     `color: var(--cg-color-accent-text)` (for brand-accent foregrounds)
 *   - `border-color: var(--cg-color-action-primary-background-default)` →
 *     `border-color: var(--cg-color-action-primary-border-default)`
 *
 * See `CLAUDE.semantic-rules.md` Rule 1.
 */

// Match `color:` or `border-color:` followed (anywhere on the same logical
// declaration) by `var(--cg-...-background-...)`. Quasis are raw template
// chunks, so newlines + indentation between the property name and the value
// must be tolerated.
const COLOR_BG_REGEX = /(?:^|[\s;{])color\s*:[^;]*var\(\s*--cg-[a-z0-9-]*-background-[a-z0-9-]+\)/i;
const BORDER_COLOR_BG_REGEX = /(?:^|[\s;{])border-color\s*:[^;]*var\(\s*--cg-[a-z0-9-]*-background-[a-z0-9-]+\)/i;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid using a `*-background-*` semantic token as `color:` or `border-color:`. Use `*-text-*` or `*-border-*` variants instead — see CLAUDE.semantic-rules.md Rule 1.',
    },
    messages: {
      colorAsBackground:
        '`color: var(--cg-...-background-...)` uses a background-tier token as a foreground. Use the `*-text-*` variant of the same family (e.g., `--cg-color-accent-text` or `--cg-color-status-success-text-default`).',
      borderColorAsBackground:
        '`border-color: var(--cg-...-background-...)` uses a background-tier token as a border. Use the `*-border-*` variant of the same family (e.g., `--cg-color-action-primary-border-default`).',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          // Search globally — multiple violations per quasi are common in big CSS blocks.
          const colorRe = new RegExp(COLOR_BG_REGEX.source, 'gi');
          const borderRe = new RegExp(BORDER_COLOR_BG_REGEX.source, 'gi');
          let match: RegExpExecArray | null;
          while ((match = colorRe.exec(raw)) !== null) {
            reportMatch(context, quasi, match, 'colorAsBackground');
          }
          while ((match = borderRe.exec(raw)) !== null) {
            reportMatch(context, quasi, match, 'borderColorAsBackground');
          }
        }
      },
    };
  },
};

export default rule;
