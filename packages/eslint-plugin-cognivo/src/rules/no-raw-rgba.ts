import type { Rule } from 'eslint';
import { rawColorVisitors } from './raw-color.js';

// Matches rgb(), rgba(), hsl(), hsla() function calls.
const RGBA_REGEX = /\b(rgba?|hsla?)\s*\(/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid raw rgb()/rgba()/hsl()/hsla() color functions in Lit `css` templates, plain `.css` files (with the `@cognivo/css` processor) and React style objects. Use semantic tier-2 color tokens.',
    },
    messages: {
      forbidden:
        '`{{fn}}(...)` color function is forbidden. Use a tier-2 semantic color token (e.g., `var(--cg-color-*)`).',
    },
    schema: [],
  },
  create(context) {
    return rawColorVisitors(context, RGBA_REGEX, 'forbidden', (m) => ({ fn: m[1] ?? 'rgba' }));
  },
};

export default rule;
