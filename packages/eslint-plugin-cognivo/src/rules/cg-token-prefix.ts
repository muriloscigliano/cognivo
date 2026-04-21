import type { Rule } from 'eslint';
import { isCssTag, reportMatch } from './utils.js';

// Catch obvious typos of the Cognivo prefix: `--cog-*`, `--cognivo-*`, `--c-*`,
// `--cgx-*`, etc. We specifically DO NOT flag arbitrary local CSS custom
// properties like `--step-index` or `--stagger-delay` — those are legitimate
// per-element vars set via `style="--step-index: 3"` for Lit reactivity.
// Add new misspellings here as we find them in audits.
const TYPO_PREFIXES = ['cog', 'cognivo', 'cgx', 'cog-g', 'c'];
const TYPO_REGEX = new RegExp(
  `--(${TYPO_PREFIXES.map((p) => `${p.replace(/-/g, '\\-')}`).join('|')})-[a-z0-9-]+`,
  'gi'
);

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Catch typos of the `--cg-` prefix (e.g., `--cog-*`, `--cognivo-*`, `--c-*`).',
    },
    messages: {
      typo: 'CSS custom property `{{prop}}` looks like a typo of `--cg-*`. Did you mean `--cg-{{suffix}}`?',
    },
    schema: [],
  },
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const globalRe = new RegExp(TYPO_REGEX.source, 'gi');
          let match: RegExpExecArray | null;
          while ((match = globalRe.exec(raw)) !== null) {
            const prop = match[0];
            // Extract suffix after the first dash past `--`.
            const afterDashes = prop.slice(2); // strip `--`
            const firstDash = afterDashes.indexOf('-');
            const suffix = firstDash >= 0 ? afterDashes.slice(firstDash + 1) : afterDashes;
            reportMatch(context, quasi, match, 'typo', { prop, suffix });
          }
        }
      },
    };
  },
};

export default rule;
