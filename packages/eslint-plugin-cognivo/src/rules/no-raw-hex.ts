import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

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
        'Forbid raw hex color literals inside Lit `css` template literals. Use semantic tier-2 color tokens instead.',
    },
    messages: {
      forbidden:
        'Raw hex color `#{{hex}}` is forbidden in component CSS. Use a tier-2 semantic color token (e.g., `var(--cg-color-surface-*)`).',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          // Skip CSS selectors targeting IDs only (rare inside Shadow DOM, but safe).
          // We run a global scan to catch multiple occurrences.
          const globalRe = new RegExp(HEX_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            const hex = match[2] ?? '';
            reportMatch(context, quasi, match, 'forbidden', { hex });
          }
        }
      },
    };
  },
};

export default rule;
