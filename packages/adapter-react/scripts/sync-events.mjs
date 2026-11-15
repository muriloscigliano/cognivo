#!/usr/bin/env node
/**
 * Adds every CustomEvent a component dispatches to its React wrapper's event
 * map (and, for wrappers with a hand-written Props interface, a typed `on*`
 * prop). Idempotent. Guarded by src/__tests__/events.test.ts.
 *
 * Naming: strip the component's own tag prefix ("cg-combobox-change" on
 * cg-combobox → onChange), else the layer prefix ("ai-a11y-issue-click" →
 * onA11yIssueClick). If that name is taken by another event, the full event
 * name is used (onCgComboboxChange).
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

let added = 0;
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
  const entries = [...body.matchAll(/(\w+)\s*:\s*['"]([a-z][\w-]*)['"]/g)].map((m) => [m[1], m[2]]);
  const mappedEvents = new Set(entries.map(([, e]) => e));
  const usedProps = new Set(entries.map(([p]) => p));
  const missing = dispatched.filter((e) => !mappedEvents.has(e));
  if (missing.length === 0) continue;

  const toAdd = [];
  for (const ev of missing) {
    const short = ev.startsWith(`${tag}-`) ? ev.slice(tag.length + 1) : ev.replace(/^(cg|ai|bias)-/, '');
    let prop = `on${pascal(short)}`;
    if (usedProps.has(prop) || prop === 'on') prop = `on${pascal(ev)}`;
    usedProps.add(prop);
    toAdd.push([prop, ev]);
  }

  const all = [...entries, ...toAdd];
  const map = `{\n${all.map(([p, e]) => `    ${p}: '${e}',`).join('\n')}\n  }`;
  w = w.slice(0, call.index) + `,\n  ${map}\n);\n`;

  // Typed wrapper: declare the new handlers on its Props interface.
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
}
console.log(`[sync-events] mapped ${added} event(s)`);
