import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

// Matches `var(--cg-something, fallback)`. The comma-and-anything after the
// first argument indicates a fallback value. We prefer bare `var(--cg-xxx)`
// because a fallback masks missing-token bugs.
const VAR_FALLBACK_REGEX = /var\s*\(\s*(--cg-[a-z0-9-]+)\s*,[^)]+\)/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warn on `var(--cg-*, fallback)` patterns. Bare `var(--cg-*)` is preferred so missing tokens fail visibly.',
    },
    messages: {
      discouraged:
        '`var({{token}}, fallback)` is discouraged. Use bare `var({{token}})` so a missing token fails visibly instead of being masked.',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const globalRe = new RegExp(VAR_FALLBACK_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            const token = match[1] ?? '--cg-unknown';
            reportMatch(context, quasi, match, 'discouraged', { token });
          }
        }
      },
    };
  },
};

export default rule;
