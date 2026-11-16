// @vitest-environment node
/**
 * No hard-coded English in components. Interface text must live in the
 * component's `defineMessages('<tag>', { … })` map (see src/utils/messages.ts)
 * so `setMessages()` / the `messages` attribute can translate it.
 *
 * The scan walks each component's TypeScript AST and flags:
 *  - text nodes and aria-label / title / placeholder / alt / label /
 *    aria-roledescription / aria-valuetext values in `html` templates;
 *  - string and template literals that read as prose (start with a capital
 *    word), anywhere outside `defineMessages(...)`, `css` templates, console /
 *    Error / event calls, comparisons, `case` labels and type positions.
 *
 * cg-* and bias-* are held at zero. ai-* (≈700 strings in 90 files) is a
 * separate pass: it is ratcheted against hardcoded-strings.baseline.json —
 * no file may gain a string, and the baseline must be lowered when one is
 * removed (`UPDATE_STRINGS_BASELINE=1 pnpm vitest run no-hardcoded-strings`).
 */
import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(__dirname, '..', 'components');
const baselineFile = join(__dirname, 'hardcoded-strings.baseline.json');
const baseline = (existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')) : {}) as Record<string, number>;

const ATTR = /\b(aria-label|aria-description|aria-roledescription|aria-valuetext|title|placeholder|alt|label)\s*=\s*"((?:\$\{\}|[^"$])*?[A-Za-z]{2,}(?:\$\{\}|[^"$])*)"/g;
const PROSE = /^[A-Z][a-z]+(\b|[ .,…!?'])/;
const KEYS = /^(Escape|Enter|Tab|Space|Backspace|Delete|Home|End|PageUp|PageDown|Arrow\w+|Shift|Control|Meta|Alt)$/;
const SKIP_CALL = /(^|\.)(console\.\w+|Error|defineMessages|defineElement|customElements\.\w+|querySelector(All)?|closest|getAttribute|setAttribute|hasAttribute|removeAttribute|toggleAttribute|addEventListener|removeEventListener|createElement|matchMedia|dispatchEvent|includes|startsWith|endsWith|split|replace|replaceAll|join|getPropertyValue|setProperty|has|get|set|delete)$/;

/** Every user-visible English literal in one component source file. */
function scan(file: string): string[] {
  const sf = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const hits: string[] = [];
  const at = (n: ts.Node) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1;
  const skipped = (node: ts.Node): boolean => {
    for (let p: ts.Node | undefined = node.parent; p; p = p.parent) {
      if ((ts.isCallExpression(p) || ts.isNewExpression(p)) && SKIP_CALL.test(p.expression.getText())) return true;
      if (ts.isTypeNode(p) || ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isCaseClause(p)) return true;
      if (ts.isBinaryExpression(p) && /^[!=]==?$/.test(p.operatorToken.getText())) return true;
      if (ts.isElementAccessExpression(p) && p.argumentExpression === node) return true;
      if (ts.isPropertyAssignment(p) && p.name === node) return true;
      if (ts.isTaggedTemplateExpression(p) && p.tag.getText() !== 'html' && p.tag.getText() !== 'svg') return true;
    }
    return false;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isTaggedTemplateExpression(node)) {
      const tag = node.tag.getText();
      if (tag === 'css' || tag === 'unsafeCSS') return;
      if (tag === 'html' || tag === 'svg') {
        const t = node.template;
        const parts = ts.isNoSubstitutionTemplateLiteral(t) ? [t.text] : [t.head.text, ...t.templateSpans.map((s) => s.literal.text)];
        for (const p of parts) {
          for (const m of p.matchAll(/>([^<>]*)</g)) if (/[A-Za-z]{2,}/.test(m[1]!.replace(/&\w+;/g, ''))) hits.push(`${at(node)} text ${JSON.stringify(m[1]!.trim())}`);
          const last = p.lastIndexOf('>');
          const tail = p.slice(last + 1);
          if (last >= 0 && /[A-Za-z]{2,}/.test(tail) && !/[=<"]/.test(tail)) hits.push(`${at(node)} text ${JSON.stringify(tail.trim())}`);
          const first = p.indexOf('<');
          const head = first === -1 ? '' : p.slice(0, first);
          if (/[A-Za-z]{2,}/.test(head) && !/[=>"]/.test(head)) hits.push(`${at(node)} text ${JSON.stringify(head.trim())}`);
        }
        // Attribute values may straddle bindings (`aria-label="${n} hours"`): scan the joined template.
        for (const m of parts.join('${}').matchAll(ATTR)) hits.push(`${at(node)} attr ${m[1]}=${JSON.stringify(m[2])}`);
        if (!ts.isNoSubstitutionTemplateLiteral(t)) for (const s of t.templateSpans) visit(s.expression);
        return;
      }
    }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateExpression(node)) && !skipped(node)) {
      const text = ts.isTemplateExpression(node) ? [node.head.text, ...node.templateSpans.map((s) => s.literal.text)].join('{}') : node.text;
      const s = text.trim();
      if (PROSE.test(s) && !/^[A-Z][a-z]+[A-Z]/.test(s) && !KEYS.test(s)) hits.push(`${at(node)} string ${JSON.stringify(text)}`);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return hits;
}

function sources(prefixes: string[]): string[] {
  const files: string[] = [];
  for (const dir of readdirSync(root).filter((d) => prefixes.some((p) => d.startsWith(p)))) {
    for (const f of readdirSync(join(root, dir)).filter((n) => n.endsWith('.ts') && !n.endsWith('.d.ts'))) files.push(`${dir}/${f}`);
  }
  return files;
}

describe('no hard-coded interface text in components', () => {
  it('the scanner catches the patterns it is meant to', () => {
    const fixture = join(__dirname, 'fixtures', 'hardcoded-strings.fixture.ts');
    expect(scan(fixture).map((h) => h.replace(/^\d+ /, ''))).toEqual([
      'string "Close dialog"',
      'text "No data"',
      'attr aria-label="Select all rows"',
      'attr placeholder="Search..."',
      'attr title="${} hours"',
      'string "Remove {}"',
    ]);
  });

  it('cg-* and bias-* have no user-visible string outside their defineMessages map', () => {
    const offenders = sources(['cg-', 'bias-'])
      .filter((f) => !f.endsWith('/countries.ts')) // ISO country data; names are shown through Intl.DisplayNames
      .flatMap((f) => scan(join(root, f)).map((h) => `${f}:${h}`));
    expect(offenders).toEqual([]);
  });

  it('ai-* does not gain hard-coded strings (ratchet against the baseline)', () => {
    const now: Record<string, number> = {};
    for (const f of sources(['ai-'])) {
      const n = scan(join(root, f)).length;
      if (n) now[f] = n;
    }
    // UPDATE_STRINGS_BASELINE=1 rewrites the baseline (only after removing strings).
    if (process.env.UPDATE_STRINGS_BASELINE) writeFileSync(baselineFile, `${JSON.stringify(now, null, 2)}\n`);
    const grew = Object.entries(now).filter(([f, n]) => n > (baseline[f] ?? 0)).map(([f, n]) => `${f}: ${n} > ${baseline[f] ?? 0}`);
    expect(grew, 'new hard-coded strings — put them in defineMessages()').toEqual([]);
    const shrank = Object.entries(baseline).filter(([f, n]) => (now[f] ?? 0) < n).map(([f, n]) => `${f}: ${now[f] ?? 0} < ${n}`);
    expect(shrank, 'strings removed — lower hardcoded-strings.baseline.json to keep the ratchet tight').toEqual([]);
  });
});
