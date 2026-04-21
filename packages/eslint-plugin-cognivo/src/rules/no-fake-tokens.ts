import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

// Tier-1 palette and brand tokens that MUST NOT appear directly in component CSS.
// Components should use tier-2 semantic tokens or tier-3 component tokens.
const FAKE_TOKEN_REGEX =
  /--cg-(?:motion|brand|gray|red|blue|green|yellow|orange|purple)-[a-z0-9-]+/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid tier-1 palette/brand/motion tokens in component CSS. Use tier-2 semantic or tier-3 component tokens.',
    },
    messages: {
      forbidden:
        'Tier-1 token `{{token}}` is forbidden in component CSS. Use a tier-2 semantic token (e.g., `--cg-color-action-primary-*`, `--cg-transition-duration-*`) or tier-3 component token.',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const globalRe = new RegExp(FAKE_TOKEN_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            const token = match[0];
            reportMatch(context, quasi, match, 'forbidden', { token });
          }
        }
      },
    };
  },
};

export default rule;
