import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

// `transition: all ...` is forbidden — must list explicit properties.
const TRANSITION_ALL_REGEX = /transition\s*:\s*all\b/;

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Forbid `transition: all` — list explicit properties with duration and easing tokens.',
    },
    messages: {
      forbidden:
        '`transition: all` is forbidden; list explicit properties (e.g., `transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default)`).',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const globalRe = new RegExp(TRANSITION_ALL_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            reportMatch(context, quasi, match, 'forbidden');
          }
        }
      },
    };
  },
};

export default rule;
