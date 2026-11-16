// Raw colours are caught where an app writes them: Lit `css` templates,
// plain `.css` files (via the `@cognivo/css` processor / `configs.css`) and
// React `style` objects. Runs the built plugin (dist/) through ESLint's Linter.
import { describe, it, expect } from 'vitest';
import { Linter } from 'eslint';
import tsparser from '@typescript-eslint/parser';
import plugin from '../dist/index.js';

const RULES = { '@cognivo/no-raw-hex': 'error', '@cognivo/no-raw-rgba': 'error' } as const;
const linter = new Linter({ configType: 'flat' });

const lintTs = (code: string, filename = 'x.tsx') =>
  linter.verify(code, [{
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tsparser, parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { '@cognivo': plugin },
    rules: RULES,
  }], filename);

const lintCss = (code: string) => linter.verify(code, plugin.configs.css as Linter.Config[], 'app.css');
const where = (msgs: Linter.LintMessage[]) => msgs.map((m) => `${m.ruleId}@${m.line}:${m.column}`);

describe('Lit css templates (unchanged scope, exact locations)', () => {
  it('reports each raw colour at its own line and column', () => {
    const msgs = lintTs('const s = css`\n  .a { color: #fff; }\n  .b { background: rgba(0, 0, 0, 0.5); }\n`;', 'x.ts');
    expect(where(msgs)).toEqual(['@cognivo/no-raw-hex@2:15', '@cognivo/no-raw-rgba@3:20']);
  });
});

describe('plain .css files (configs.css)', () => {
  it('reports raw hex and rgb/hsl with their position, and passes tokens', () => {
    const msgs = lintCss('.card {\n  color: #ff0000;\n  background: hsl(0 0% 50%);\n  border-color: var(--cg-color-surface-cards-border);\n}\n');
    expect(where(msgs)).toEqual(['@cognivo/no-raw-hex@2:10', '@cognivo/no-raw-rgba@3:15']);
  });

  it('a file of tokens only is clean, and backticks / ${ in CSS do not break it', () => {
    expect(lintCss('.a { content: "`${x}`"; color: var(--cg-color-accent-text); }')).toEqual([]);
  });

  it('is the processor on **/*.css plus the two raw-colour rules on the template it makes', () => {
    const [file, block] = plugin.configs.css as Linter.Config[];
    expect(file).toMatchObject({ files: ['**/*.css'], processor: '@cognivo/css' });
    expect(block).toMatchObject({ files: ['**/*.css/*.js'], rules: RULES });
  });

  it('works through the ESLint class on a real file next to the recommended config', async () => {
    const { ESLint } = await import('eslint');
    const eslint = new ESLint({
      cwd: __dirname,
      overrideConfigFile: true,
      overrideConfig: [plugin.configs.recommended as Linter.Config, ...(plugin.configs.css as Linter.Config[])],
    });
    const [result] = await eslint.lintText('.x {\n  outline-color: #123456;\n}\n', { filePath: `${__dirname}/fixture.css` });
    expect(result!.messages.map((m) => `${m.ruleId}@${m.line}:${m.column}`)).toEqual(['@cognivo/no-raw-hex@2:18']);
  });
});

describe('React style objects', () => {
  it('flags raw colours in a JSX style={{…}} object, including template literals and ternaries', () => {
    const msgs = lintTs([
      'export const A = ({ on }: { on: boolean }) => (',
      '  <div style={{ color: "#fff", background: on ? `rgb(0 0 0)` : "var(--cg-color-x)", padding: 8 }} />',
      ');',
    ].join('\n'));
    expect(msgs.map((m) => m.ruleId)).toEqual(['@cognivo/no-raw-hex', '@cognivo/no-raw-rgba']);
  });

  it('flags objects typed or checked as CSSProperties', () => {
    const msgs = lintTs([
      'import type { CSSProperties } from "react";',
      'const a: CSSProperties = { borderColor: "#abcdef" };',
      'const b = { color: "rgba(1,2,3,.4)" } satisfies React.CSSProperties;',
      'const c = { boxShadow: "0 0 0 1px #000" } as React.CSSProperties;',
    ].join('\n'), 'x.ts');
    expect(msgs.map((m) => `${m.ruleId}@${m.line}`)).toEqual([
      '@cognivo/no-raw-hex@2', '@cognivo/no-raw-rgba@3', '@cognivo/no-raw-hex@4',
    ]);
  });

  it('leaves tokens, other attributes and plain objects alone', () => {
    expect(lintTs([
      'export const B = () => <a href="#top" style={{ color: "var(--cg-color-accent-text)" }}>Top</a>;',
      'const id = { anchor: "#abc", fn: "rgb" };',
    ].join('\n'))).toEqual([]);
  });
});
