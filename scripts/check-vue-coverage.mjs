#!/usr/bin/env node
/**
 * check-vue-coverage.mjs — verify @cognivo/adapter-vue wraps every component.
 *
 * WHY THIS EXISTS: coverage was questioned with a claim of "118 of 202 wrapped,
 * core chat components have no Vue wrapper." That claim came from counting
 * `createVueWrapper('tag')` with SINGLE-LINE matching — but the wrappers are
 * written multi-line (tag on the next line), so naive matching silently misses
 * most of them and reports a huge fake gap. This script matches across newlines
 * and cross-references the REAL registered custom elements, so the question is
 * settled by one command instead of a screenshot.
 *
 * Run:  node scripts/check-vue-coverage.mjs
 * Exit non-zero only if a REAL component (registered in @cognivo/components or
 * @cognivo/gen-ui-lit) has no Vue wrapper. Orphan wrappers (a wrapper whose tag
 * isn't registered anywhere) are reported as warnings — they may be planned or
 * cross-package components, not errors.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

/** Recursively list .ts source files under a dir (skips tests + decls). */
function sources(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return sources(p);
    return /\.ts$/.test(p) && !/\.(test|spec|d)\.ts$/.test(p) ? [p] : [];
  });
}

/** Every custom-element tag a package registers (@customElement + define). */
function registeredTags(pkgSrc) {
  const tags = new Set();
  for (const f of sources(pkgSrc)) {
    const s = readFileSync(f, 'utf8');
    for (const re of [
      /@customElement\(\s*['"]([a-z0-9-]+)['"]/g,
      /customElements\.define\(\s*['"]([a-z0-9-]+)['"]/g,
    ]) {
      let m;
      while ((m = re.exec(s))) tags.add(m[1]);
    }
  }
  return tags;
}

/** Every tag adapter-vue wraps — MULTI-LINE aware (\s* spans the newline). */
function wrappedTags(adapterSrc) {
  const tags = new Set();
  for (const f of sources(adapterSrc)) {
    const s = readFileSync(f, 'utf8');
    const re = /createVueWrapper\(\s*['"]([a-z0-9-]+)['"]/g;
    let m;
    while ((m = re.exec(s))) tags.add(m[1]);
  }
  return tags;
}

// Real components live across two packages that ship custom elements.
const components = registeredTags(join(root, 'packages/components/src'));
const genUiLit = registeredTags(join(root, 'packages/gen-ui-lit/src'));
const allReal = new Set([...components, ...genUiLit]);
const wrapped = wrappedTags(join(root, 'packages/adapter-vue/src'));

// A real component with no wrapper is a HARD failure.
const missing = [...allReal].filter((t) => !wrapped.has(t)).sort();
// A wrapper whose tag isn't registered anywhere is a soft warning.
const orphans = [...wrapped].filter((t) => !allReal.has(t)).sort();

const line = '─'.repeat(72);
console.log(line);
console.log('  @cognivo/adapter-vue coverage check');
console.log(line);
console.log(`  components (@cognivo/components): ${components.size}`);
console.log(`  components (@cognivo/gen-ui-lit): ${genUiLit.size}`);
console.log(`  total real components:           ${allReal.size}`);
console.log(`  Vue wrappers:                    ${wrapped.size}`);
console.log(line);

if (orphans.length) {
  console.log(`  ⚠️  ${orphans.length} wrapper(s) with no registered component (planned / cross-package?):`);
  for (const t of orphans) console.log(`     • ${t}`);
}

if (missing.length === 0) {
  console.log('  ✅ Every registered component has a Vue wrapper. 100% coverage.');
  console.log(line);
  process.exit(0);
}
console.log(`  ❌ ${missing.length} component(s) with NO Vue wrapper:`);
for (const t of missing) console.log(`     • ${t}`);
console.log(line);
process.exit(1);
