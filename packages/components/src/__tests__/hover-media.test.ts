// @vitest-environment node
/**
 * Hover only where the device hovers: every `:hover` rule in the BUILT
 * component CSS (dist/, the code consumers get) sits inside an
 * `@media (hover: hover)` block, so a tap on a touch screen never leaves a
 * sticky hover fill. The build applies this (scripts/hover-media.mjs, a Vite
 * transform shared with the browser-test bundle); this test reads dist/ on
 * its own, so a rule the transform missed fails here.
 * Requires `pnpm build` first (turbo runs build before test).
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
// @ts-expect-error -- plain ES module without types
import { hoverOnlyWhereHover } from '../../scripts/hover-media.mjs';

const dist = resolve(__dirname, '..', '..', 'dist');

function jsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? jsFiles(join(dir, d.name)) : d.name.endsWith('.js') ? [join(dir, d.name)] : [],
  );
}

/** Template literal bodies (interpolations kept as text) that look like CSS with a `:hover`. */
function cssTemplates(code: string): string[] {
  const out: string[] = [];
  const re = /`((?:[^`\\]|\\.)*)`/g;
  for (const m of code.matchAll(re)) if (m[1]!.includes(':hover') && m[1]!.includes('{')) out.push(m[1]!);
  return out;
}

/** Selectors of style rules with `:hover` that are not inside an `@media (hover: hover)` block. */
function looseHover(css: string): string[] {
  const out: string[] = [];
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const walk = (s: string, inHover: boolean) => {
    let i = 0;
    let start = 0;
    while (i < s.length) {
      const c = s[i];
      if (c === ';' || c === '}') { start = i + 1; i++; continue; }
      if (c !== '{') { i++; continue; }
      const prelude = s.slice(start, i).trim();
      let depth = 1;
      let j = i + 1;
      for (; j < s.length && depth > 0; j++) {
        if (s[j] === '{') depth++;
        else if (s[j] === '}') depth--;
      }
      const body = s.slice(i + 1, j - 1);
      if (prelude.startsWith('@')) {
        if (!/^@(keyframes|font-face)/.test(prelude)) walk(body, inHover || /^@media[^{]*hover\s*:\s*hover/.test(prelude));
      } else {
        if (!inHover && prelude.includes(':hover')) out.push(prelude);
        walk(body, inHover);
      }
      start = j;
      i = j;
    }
  };
  walk(text, false);
  return out;
}

describe('hover rules sit in @media (hover: hover)', () => {
  it.skipIf(!existsSync(dist))('no :hover rule in the built component CSS sits outside (hover: hover)', () => {
    const loose: string[] = [];
    let scanned = 0;
    for (const file of jsFiles(dist)) {
      for (const css of cssTemplates(readFileSync(file, 'utf8'))) {
        scanned++;
        for (const sel of looseHover(css)) loose.push(`${file.slice(dist.length + 1)}: ${sel}`);
      }
    }
    expect(scanned).toBeGreaterThan(100);
    expect(loose).toEqual([]);
  });

  it('the transform wraps hover selectors, keeps the rest in place, merges neighbours and leaves wrapped rules alone', () => {
    const t = (css: string) => hoverOnlyWhereHover(css) as string;
    expect(looseHover(t('.a{color:red}.a:hover{color:blue}.b:hover{color:green}.c{x:y}'))).toEqual([]);
    expect(t('.a:hover{x:1}.b:hover{x:2}').match(/@media/g)).toHaveLength(1);
    // A mixed list keeps its non-hover selectors where they were.
    const mixed = t('.a:hover,.a:focus-visible{x:1}');
    expect(mixed).toContain('.a:focus-visible{x:1}');
    expect(looseHover(mixed)).toEqual([]);
    // Inside other at-rules, nested rules and with interpolation placeholders.
    expect(looseHover(t('@media (prefers-reduced-motion: no-preference){.a:hover{x:1}}'))).toEqual([]);
    expect(looseHover(t('.card{color:red;&:hover{x:1}}'))).toEqual([]);
    expect(looseHover(t('.a{${focus}}.a:hover{x:1}'))).toEqual([]);
    // Already wrapped: unchanged.
    const wrapped = '@media (hover: hover){.a:hover{x:1}}';
    expect(t(wrapped)).toBe(wrapped);
    // `:not(:hover)` is not a hover state.
    expect(t('.a:not(:hover){x:1}')).toBe('.a:not(:hover){x:1}');
  });
});

describe('hover transform edge cases', () => {
  it('a comment before an existing (hover: hover) block does not wrap it twice', () => {
    const out = hoverOnlyWhereHover('/* Hover */\n@media (hover: hover) { .a:hover { x: 1 } }') as string;
    expect(out.match(/@media/g)).toHaveLength(1);
  });
});
