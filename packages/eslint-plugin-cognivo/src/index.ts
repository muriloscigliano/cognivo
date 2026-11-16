import type { ESLint, Linter, Rule } from 'eslint';

import noRawHex from './rules/no-raw-hex.js';
import noRawRgba from './rules/no-raw-rgba.js';
import noTransitionAll from './rules/no-transition-all.js';
import noFakeTokens from './rules/no-fake-tokens.js';
import noTokenFallbacks from './rules/no-token-fallbacks.js';
import cgTokenPrefix from './rules/cg-token-prefix.js';
import noOrphanTokens from './rules/no-orphan-tokens.js';
import noBackgroundAsForeground from './rules/no-background-as-foreground.js';
import cssProcessor from './processors/css.js';

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
interface CognivoPlugin extends ESLint.Plugin {
  meta: { name: string; version: string };
  rules: Record<string, Rule.RuleModule>;
  processors: Record<string, Linter.Processor>;
  configs: Record<string, Linter.Config | Linter.Config[]>;
}

const plugin: CognivoPlugin = {
  meta: { name: '@cognivo/eslint-plugin', version: '0.1.0' },
  rules,
  processors: { css: cssProcessor },
  configs: {},
};

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

/**
 * Raw colours in plain `.css` files: the `@cognivo/css` processor hands each
 * `.css` file to `no-raw-hex` / `no-raw-rgba` as one `css` template. Two
 * config objects (the file, then the template the processor makes of it,
 * `app.css/0.js`); add the array next to `recommended`. Files that define
 * colours on purpose (a theme's token overrides) belong in `ignores`.
 */
plugin.configs.css = [
  { files: ['**/*.css'], plugins: { '@cognivo': plugin }, processor: '@cognivo/css' },
  {
    files: ['**/*.css/*.js'],
    plugins: { '@cognivo': plugin },
    rules: {
      '@cognivo/no-raw-hex': 'error',
      '@cognivo/no-raw-rgba': 'error',
    },
  },
];

export default plugin;
