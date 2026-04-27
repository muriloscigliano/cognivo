import type { Rule } from 'eslint';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { isCssTag, reportMatch } from './utils.js';

/**
 * Flags `var(--cg-...)` references whose token name does NOT appear in the
 * generated `packages/tokens/dist/index.css`. Catches typos and stale
 * references like `--cg-spacing-10` (the spacing scale jumps 8→12, so the
 * shorthand silently rendered as invalid → padding 0).
 *
 * The check loads the generated CSS once per ESLint run (cached on the rule)
 * and builds a Set of declared token names. Any `var(--cg-foo)` reference
 * whose name is not in the set is reported.
 *
 * Failure modes handled:
 *   - dist/index.css missing → emit a single warning, then disable the check.
 *     (Allows the linter to keep working in fresh checkouts before a build.)
 *
 * See `CLAUDE.known-bugs.md` 2026-04 entry — this rule would have caught
 * `--cg-spacing-10` references in cg-combobox / cg-tag-input.
 */

const TOKEN_REF_REGEX = /var\(\s*(--cg-[a-z0-9-]+)\s*[,)]/g;

let knownTokens: Set<string> | null = null;
let knownTokensLoadFailed = false;

function loadKnownTokens(cwd: string): Set<string> | null {
  if (knownTokens) return knownTokens;
  if (knownTokensLoadFailed) return null;

  // Look up from the package root toward the monorepo root for dist/index.css.
  const candidates = [
    resolve(cwd, 'packages/tokens/dist/index.css'),
    resolve(cwd, '../tokens/dist/index.css'),
    resolve(cwd, '../../tokens/dist/index.css'),
    resolve(cwd, '../../../tokens/dist/index.css'),
  ];

  for (const path of candidates) {
    try {
      const css = readFileSync(path, 'utf-8');
      const set = new Set<string>();
      const declarationRe = /^\s*(--cg-[a-z0-9-]+)\s*:/gm;
      let m: RegExpExecArray | null;
      while ((m = declarationRe.exec(css)) !== null) {
        set.add(m[1]!);
      }
      knownTokens = set;
      return set;
    } catch {
      // try next candidate
    }
  }
  knownTokensLoadFailed = true;
  return null;
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Flag `var(--cg-...)` references to tokens that are not declared in `packages/tokens/dist/index.css`. Catches typos like `--cg-spacing-10` (the spacing scale skips that value).',
    },
    messages: {
      orphan:
        'Token `{{token}}` is not defined in `packages/tokens/dist/index.css`. Either fix the typo, add the token (see CLAUDE.adding-tokens.md), or rebuild tokens with `pnpm --filter @cognivo/tokens build`.',
      noTokenFile:
        'Could not load `packages/tokens/dist/index.css` to verify tokens. Run `pnpm --filter @cognivo/tokens build`. (This rule will be silent until tokens are built.)',
    },
    schema: [],
  },
  create(context) {
    const tokens = loadKnownTokens(context.cwd);
    if (!tokens) {
      // Emit a single soft warning at the start of the file and stop.
      // We don't want to flood every file with errors when dist is missing.
      let reported = false;
      return {
        TaggedTemplateExpression(node) {
          if (!isCssTag(node)) return;
          if (reported) return;
          reported = true;
          context.report({ node, messageId: 'noTokenFile' });
        },
      };
    }

    return {
      TaggedTemplateExpression(node) {
        if (!isCssTag(node)) return;
        for (const quasi of node.quasi.quasis) {
          const raw = quasi.value.raw;
          const re = new RegExp(TOKEN_REF_REGEX.source, 'g');
          let match: RegExpExecArray | null;
          while ((match = re.exec(raw)) !== null) {
            const token = match[1]!;
            if (!tokens.has(token)) {
              reportMatch(context, quasi, match, 'orphan', { token });
            }
          }
        }
      },
    };
  },
};

export default rule;
