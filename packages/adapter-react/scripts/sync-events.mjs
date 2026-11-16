#!/usr/bin/env node
/**
 * Adds every CustomEvent a component dispatches to its React wrapper's event
 * map (and, for wrappers with a hand-written Props interface, a typed `on*`
 * prop). Idempotent. Guarded by src/__tests__/events.test.ts.
 *
 * Naming: strip the component's own tag prefix ("cg-combobox-show" on
 * cg-combobox → onShow), else the layer prefix ("ai-a11y-issue-click" →
 * onA11yIssueClick). A name React already uses (onClick, onChange, onInput,
 * onSelect, … — read from @types/react) is never taken, so the native React
 * prop keeps working: the layer-stripped event name is used instead
 * ("cg-link-click" → onLinkClick, "cg-combobox-change" → onComboboxChange),
 * and if that is also React's or taken, the full event name ("cg-change" →
 * onCgChange). Existing entries that collide with a React prop are renamed
 * (in the event map and the Props interface).
 *
 *   node packages/adapter-react/scripts/sync-events.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const componentsDir = resolve(here, '../../components/src/components');
const wrappersDir = resolve(here, '../src/components');
const pascal = (k) => k.split('-').filter(Boolean).map((s) => s[0].toUpperCase() + s.slice(1)).join('');

/** Prop names React gives a meaning to on a DOM element (from @types/react). */
function reactDomProps() {
  const dts = readFileSync(resolve(here, '../node_modules/@types/react/index.d.ts'), 'utf8');
  const names = new Set(['key', 'ref']);
  for (const iface of ['DOMAttributes<T>', 'AriaAttributes', 'HTMLAttributes<T>']) {
    const start = dts.indexOf(`interface ${iface} `);
    if (start < 0) throw new Error(`@types/react: interface ${iface} not found`);
    let depth = 0;
    let i = dts.indexOf('{', start);
    const open = i;
    for (; i < dts.length; i++) {
      if (dts[i] === '{') depth++;
      else if (dts[i] === '}' && --depth === 0) break;
    }
    for (const m of dts.slice(open + 1, i).matchAll(/^\s+"?([\w-]+)"?\??:/gm)) names.add(m[1]);
  }
  return names;
}
const REACT = reactDomProps();

/** A prop name for `ev` that is neither React's nor in `used`. */
function propFor(ev, tag, used) {
  const own = ev.startsWith(`${tag}-`) ? ev.slice(tag.length + 1) : null;
  const layer = ev.replace(/^(cg|ai|bias)-/, '');
  for (const name of [own, layer, ev]) {
    if (!name) continue;
    const prop = `on${pascal(name)}`;
    if (prop !== 'on' && !REACT.has(prop) && !used.has(prop)) return prop;
  }
  throw new Error(`no free prop name for ${ev} on ${tag}`);
}

let added = 0;
let renamedCount = 0;
for (const tag of readdirSync(componentsDir)) {
  const src = resolve(componentsDir, tag, `${tag}.ts`);
  const file = resolve(wrappersDir, `${pascal(tag)}.ts`);
  if (!existsSync(src) || !existsSync(file)) continue;
  const dispatched = [...new Set(
    [...readFileSync(src, 'utf8').matchAll(/new CustomEvent(?:<[^>]*>)?\(\s*['"`]([a-z][\w-]*)['"`]/g)].map((m) => m[1]),
  )];
  let w = readFileSync(file, 'utf8');
  const call = w.match(/,\s*\{([^{}]*)\}\s*,?\s*\)\s*;\s*$/);
  if (!call) throw new Error(`cannot find the event map in ${file}`);
  const body = call[1];
  let entries = [...body.matchAll(/(\w+)\s*:\s*['"]([a-z][\w-]*)['"]/g)].map((m) => [m[1], m[2]]);
  const mappedEvents = new Set(entries.map(([, e]) => e));
  const usedProps = new Set(entries.map(([p]) => p).filter((p) => !REACT.has(p)));
  const missing = dispatched.filter((e) => !mappedEvents.has(e));

  // Rename entries that shadow a React DOM prop (CgLink onClick → onLinkClick).
  const renamed = [];
  entries = entries.map(([p, e]) => {
    if (!REACT.has(p)) return [p, e];
    const next = propFor(e, tag, usedProps);
    usedProps.add(next);
    renamed.push([p, next]);
    return [next, e];
  });
  if (missing.length === 0 && renamed.length === 0) continue;

  const toAdd = [];
  for (const ev of missing) {
    const prop = propFor(ev, tag, usedProps);
    usedProps.add(prop);
    toAdd.push([prop, ev]);
  }

  const all = [...entries, ...toAdd];
  const map = `{\n${all.map(([p, e]) => `    ${p}: '${e}',`).join('\n')}\n  }`;
  w = w.slice(0, call.index) + `,\n  ${map}\n);\n`;

  // Typed wrapper: rename the colliding handlers on its Props interface…
  for (const [from, to] of renamed) {
    w = w.replace(new RegExp(`(\\n\\s*)${from}(\\?:\\s*\\(e: CustomEvent)`), `$1${to}$2`);
  }
  // …and declare the new ones.
  const iface = w.match(/export interface \w+Props \{\n/);
  if (iface) {
    const decl = toAdd
      .filter(([p]) => !new RegExp(`\\n\\s*${p}\\?:`).test(w))
      .map(([p, e]) => `  /** Fired as \`${e}\`. */\n  ${p}?: (e: CustomEvent) => void;\n`)
      .join('');
    const close = w.indexOf('\n}', iface.index);
    w = w.slice(0, close + 1) + decl + w.slice(close + 1);
  }
  writeFileSync(file, w);
  added += toAdd.length;
  renamedCount += renamed.length;
}
console.log(`[sync-events] mapped ${added} event(s), renamed ${renamedCount} that shadowed a React prop`);
