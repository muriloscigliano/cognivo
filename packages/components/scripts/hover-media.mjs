/**
 * Hover only where the device hovers.
 *
 * `hoverOnlyWhereHover(css)` moves every style rule with a `:hover` selector
 * into an `@media (hover:hover)` block, in place (the cascade order does not
 * change), so a tap on a touch screen never leaves a sticky hover state.
 *  - Rules already inside an `@media (… hover: hover …)` block are left alone.
 *  - A selector list mixing hover and non-hover selectors is split: the
 *    non-hover selectors keep the rule where it was, the hover ones get the
 *    same declarations right after it, wrapped.
 *  - Neighbouring wrapped rules share one block.
 *  - Nested rules (`&:hover`) and rules inside other at-rules are handled;
 *    `@keyframes` / `@font-face` bodies are not touched.
 *  - `:not(:hover)` is not a hover state and is not wrapped.
 *
 * Used at build time on every Lit `css\`…\`` template (vite.config.ts) and by
 * the browser-test bundle (src/__tests__/browser/harness.ts), so components
 * are written with plain `:hover` rules. src/__tests__/hover-media.test.ts
 * scans the built CSS for any `:hover` rule left outside such a block.
 */

const HOVER_MEDIA = '@media (hover:hover)';

/** Index of the matching `}` for the `{` at `open` (strings and comments skipped). */
function matchBrace(s, open) {
  let depth = 0;
  for (let i = open; i < s.length; i++) {
    const c = s[i];
    if (c === '"' || c === "'") {
      i = skipString(s, i);
      continue;
    }
    if (c === '/' && s[i + 1] === '*') {
      const end = s.indexOf('*/', i + 2);
      i = end === -1 ? s.length : end + 1;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return i;
  }
  return s.length;
}

function skipString(s, i) {
  const q = s[i];
  for (let j = i + 1; j < s.length; j++) {
    if (s[j] === '\\') j++;
    else if (s[j] === q) return j;
  }
  return s.length;
}

/** Split a selector list on top-level commas. */
function splitSelectors(prelude) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < prelude.length; i++) {
    const c = prelude[i];
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    else if (c === ',' && depth === 0) {
      out.push(prelude.slice(start, i).trim());
      start = i + 1;
    }
  }
  out.push(prelude.slice(start).trim());
  return out.filter(Boolean);
}

/** A selector that matches a hovered element (`:hover` outside any `:not(…)`). */
function isHover(selector) {
  let s = selector;
  // Drop `:not(...)` groups (with one level of nested parentheses).
  let prev;
  do {
    prev = s;
    s = s.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, '');
  } while (s !== prev);
  return /:hover\b/.test(s);
}

/**
 * Transform a list of rules / declarations (a stylesheet, an at-rule body or
 * a style rule body). Returns the new text.
 */
function transformList(s, inHover) {
  const items = []; // { hover: string[] } | string
  const push = (text) => {
    if (typeof text === 'string') items.push(text);
  };
  const pushHover = (rule) => {
    // Merge with the previous wrapped block when only whitespace separates them.
    for (let k = items.length - 1; k >= 0; k--) {
      const it = items[k];
      if (typeof it === 'string') {
        if (it.trim() === '') continue;
        break;
      }
      items.splice(k + 1); // drop the whitespace between them
      it.hover.push(rule);
      return;
    }
    items.push({ hover: [rule] });
  };

  let i = 0;
  let start = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === '"' || c === "'") {
      i = skipString(s, i) + 1;
      continue;
    }
    if (c === '/' && s[i + 1] === '*') {
      const end = s.indexOf('*/', i + 2);
      i = end === -1 ? s.length : end + 2;
      continue;
    }
    if (c === ';') {
      push(s.slice(start, i + 1));
      start = i + 1;
      i++;
      continue;
    }
    if (c !== '{') {
      i++;
      continue;
    }
    // A block: `prelude { body }`.
    const close = matchBrace(s, i);
    const rawPrelude = s.slice(start, i);
    const lead = rawPrelude.match(/^\s*/)[0];
    const prelude = rawPrelude.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const body = s.slice(i + 1, close);
    start = close + 1;
    i = close + 1;

    if (prelude.startsWith('@')) {
      if (/^@(-[\w]+-)?(keyframes|font-face|property|counter-style|page)\b/i.test(prelude)) {
        push(`${rawPrelude}{${body}}`);
      } else {
        const hoverMedia = inHover || /^@media\b[^{]*\bhover\s*:\s*hover\b/i.test(prelude);
        push(`${rawPrelude}{${transformList(body, hoverMedia)}}`);
      }
      continue;
    }

    const selectors = splitSelectors(prelude);
    const hover = inHover ? [] : selectors.filter(isHover);
    if (hover.length === 0) {
      push(`${rawPrelude}{${transformList(body, inHover)}}`);
      continue;
    }
    const rest = selectors.filter((x) => !hover.includes(x));
    if (rest.length) push(`${lead}${rest.join(',')}{${transformList(body, false)}}`);
    else push(lead);
    pushHover(`${hover.join(',')}{${transformList(body, true)}}`);
  }
  push(s.slice(start));

  return items
    .map((it) => (typeof it === 'string' ? it : `${HOVER_MEDIA}{${it.hover.join('')}}`))
    .join('');
}

/** Wrap every `:hover` rule in `css` in `@media (hover:hover)`. */
export function hoverOnlyWhereHover(css) {
  if (!css.includes(':hover')) return css;
  return transformList(css, false);
}

/**
 * Apply `hoverOnlyWhereHover` to every Lit `css\`…\`` template in a TS/JS
 * source. `${…}` interpolations are kept verbatim (treated as opaque text).
 */
export function hoverOnlyWhereHoverInSource(code) {
  if (!code.includes('css`') || !code.includes(':hover')) return code;
  return code.replace(/\bcss`([^`]*)`/g, (whole, body) => {
    if (!body.includes(':hover')) return whole;
    const parts = [];
    const masked = body.replace(/\$\{[^}]*\}/g, (m) => {
      parts.push(m);
      return `\uE000${parts.length - 1}\uE000`;
    });
    const out = hoverOnlyWhereHover(masked).replace(/\uE000(\d+)\uE000/g, (_, n) => parts[Number(n)]);
    return `css\`${out}\``;
  });
}
