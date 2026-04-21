import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

// Matches rgb(), rgba(), hsl(), hsla() function calls.
const RGBA_REGEX = /\b(rgba?|hsla?)\s*\(/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid raw rgb()/rgba()/hsl()/hsla() color functions inside Lit `css` template literals. Use semantic tier-2 color tokens.',
    },
    messages: {
      forbidden:
        '`{{fn}}(...)` color function is forbidden in component CSS. Use a tier-2 semantic color token (e.g., `var(--cg-color-*)`).',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const globalRe = new RegExp(RGBA_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            const fn = match[1] ?? 'rgba';
            reportMatch(context, quasi, match, 'forbidden', { fn });
          }
        }
      },
    };
  },
};

export default rule;
