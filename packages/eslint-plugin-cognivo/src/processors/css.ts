import type { Linter } from 'eslint';

/**
 * `@cognivo/css` — lets the Lit-`css` rules (`no-raw-hex`, `no-raw-rgba`)
 * lint plain `.css` files. The file is handed to ESLint as one
 * `css\`…\`` template (characters JavaScript would read inside a template —
 * backslashes, backticks, `${` — escaped), and every message is mapped back to
 * the line and column in the original file.
 */

const PREFIX = 'css`';

interface Block {
  /** For each index in the generated code, the index in the original file. */
  toOriginal: number[];
  generated: string;
  original: string;
}

const blocks = new Map<string, Block>();

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

const processor: Linter.Processor = {
  meta: { name: '@cognivo/css', version: '0.1.0' },
  supportsAutofix: false,
  preprocess(text: string, filename: string) {
    let generated = PREFIX;
    const toOriginal: number[] = Array.from({ length: PREFIX.length }, () => 0);
    for (let i = 0; i < text.length; i++) {
      const ch = text[i]!;
      const escaped = ch === '\\' || ch === '`' || (ch === '$' && text[i + 1] === '{') ? `\\${ch}` : ch;
      for (let k = 0; k < escaped.length; k++) toOriginal.push(i);
      generated += escaped;
    }
    toOriginal.push(text.length);
    generated += '`;\n';
    blocks.set(filename, { toOriginal, generated, original: text });
    return [{ text: generated, filename: '0.js' }];
  },
  postprocess(messages: Linter.LintMessage[][], filename: string) {
    const block = blocks.get(filename);
    blocks.delete(filename);
    const flat = messages.flat();
    if (!block) return flat;
    const genStarts = lineStarts(block.generated);
    const origStarts = lineStarts(block.original);
    const map = (line: number, column: number): { line: number; column: number } => {
      const genIndex = (genStarts[line - 1] ?? 0) + column - 1;
      const orig = block.toOriginal[Math.min(genIndex, block.toOriginal.length - 1)] ?? 0;
      let l = 0;
      while (l + 1 < origStarts.length && origStarts[l + 1]! <= orig) l++;
      return { line: l + 1, column: orig - origStarts[l]! + 1 };
    };
    return flat.map((m) => {
      const start = map(m.line, m.column);
      const end = m.endLine !== undefined && m.endColumn !== undefined ? map(m.endLine, m.endColumn) : undefined;
      return { ...m, ...start, ...(end ? { endLine: end.line, endColumn: end.column } : {}) };
    });
  },
};

export default processor;
