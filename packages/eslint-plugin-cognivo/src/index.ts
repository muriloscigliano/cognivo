import type { ESLint, Linter, Rule } from 'eslint';

import noRawHex from './rules/no-raw-hex.js';
import noRawRgba from './rules/no-raw-rgba.js';
import noTransitionAll from './rules/no-transition-all.js';
import noFakeTokens from './rules/no-fake-tokens.js';
import noTokenFallbacks from './rules/no-token-fallbacks.js';
import cgTokenPrefix from './rules/cg-token-prefix.js';
import noOrphanTokens from './rules/no-orphan-tokens.js';
import noBackgroundAsForeground from './rules/no-background-as-foreground.js';

const rules: Record<string, Rule.RuleModule> = {
  'no-raw-hex': noRawHex,
  'no-raw-rgba': noRawRgba,
  'no-transition-all': noTransitionAll,
  'no-fake-tokens': noFakeTokens,
  'no-token-fallbacks': noTokenFallbacks,
  'cg-token-prefix': cgTokenPrefix,
  'no-orphan-tokens': noOrphanTokens,
  'no-background-as-foreground': noBackgroundAsForeground,
};

// Flat-config-shaped plugin object.
const plugin = {
  meta: { name: '@cognivo/eslint-plugin', version: '0.1.0' },
  rules,
  configs: {} as Record<string, Linter.Config>,
} satisfies ESLint.Plugin;

plugin.configs.recommended = {
  plugins: { '@cognivo': plugin },
  rules: {
    '@cognivo/no-raw-hex': 'error',
    '@cognivo/no-raw-rgba': 'error',
    '@cognivo/no-transition-all': 'error',
    '@cognivo/no-fake-tokens': 'error',
    '@cognivo/no-token-fallbacks': 'warn',
    '@cognivo/cg-token-prefix': 'warn',
    '@cognivo/no-orphan-tokens': 'error',
    '@cognivo/no-background-as-foreground': 'error',
  },
};

export default plugin;
