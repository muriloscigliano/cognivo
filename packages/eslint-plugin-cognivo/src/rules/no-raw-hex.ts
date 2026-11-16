import type { Rule } from 'eslint';
import { rawColorVisitors } from './raw-color.js';

// Match #RGB, #RGBA, #RRGGBB, #RRGGBBAA hex color literals.
// Must be preceded by non-word (start-of-string, whitespace, `:`, `,`, `(`, etc.)
// to avoid matching IDs like `#my-id` inside selectors — though inside CSS values
// these only legally appear as colors.
const HEX_REGEX = /(^|[^\w-])#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid raw hex color literals in Lit `css` templates, plain `.css` files (with the `@cognivo/css` processor) and React style objects. Use semantic tier-2 color tokens instead.',
    },
    messages: {
      forbidden:
        'Raw hex color `#{{hex}}` is forbidden. Use a tier-2 semantic color token (e.g., `var(--cg-color-surface-*)`).',
    },
    schema: [],
  },
  create(context) {
    return rawColorVisitors(context, HEX_REGEX, 'forbidden', (m) => ({ hex: m[2] ?? '' }), (m) => (m[1] ?? '').length);
  },
};

export default rule;
