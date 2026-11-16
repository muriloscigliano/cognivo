import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * A mapped CustomEvent prop must never reuse a name React already gives a
 * meaning to. `CgLink onClick` was mapped to `cg-link-click`, so a React
 * user's `onClick` silently stopped receiving the native click (and got a
 * CustomEvent instead). React's own props are read from @types/react's
 * DOMAttributes / AriaAttributes / HTMLAttributes, so new React props are
 * covered automatically.
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(__dirname, '../..');
const wrappersDir = resolve(pkg, 'src/components');

function reactDomProps(): Set<string> {
  const dts = readFileSync(resolve(pkg, 'node_modules/@types/react/index.d.ts'), 'utf8');
  const names = new Set<string>(['key', 'ref']);
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
    const body = dts.slice(open + 1, i);
    for (const m of body.matchAll(/^\s+"?([\w-]+)"?\??:/gm)) names.add(m[1]!);
  }
  return names;
}

describe('React adapter event prop names', () => {
  const react = reactDomProps();

  it('reads React\'s DOM props (sanity)', () => {
    for (const p of ['onClick', 'onChange', 'onInput', 'onFocus', 'onSubmit', 'children', 'className', 'aria-label']) {
      expect(react.has(p), p).toBe(true);
    }
  });

  it('no wrapper maps a CustomEvent onto a React DOM prop name', () => {
    const collisions: string[] = [];
    for (const file of readdirSync(wrappersDir)) {
      const src = readFileSync(resolve(wrappersDir, file), 'utf8');
      const call = src.match(/,\s*\{([^{}]*)\}\s*,?\s*\)\s*;\s*$/);
      if (!call) continue;
      for (const [, prop, ev] of call[1]!.matchAll(/(\w+)\s*:\s*['"]([a-z][\w-]*)['"]/g)) {
        if (react.has(prop!)) collisions.push(`${file}: ${prop} -> ${ev}`);
      }
    }
    expect(collisions).toEqual([]);
  });

  it('no hand-written Props interface types a React DOM prop as a CustomEvent handler', () => {
    const collisions: string[] = [];
    for (const file of readdirSync(wrappersDir)) {
      const src = readFileSync(resolve(wrappersDir, file), 'utf8');
      for (const [, prop] of src.matchAll(/^\s+(on\w+)\?:\s*\(e: CustomEvent/gm)) {
        if (react.has(prop!)) collisions.push(`${file}: ${prop}`);
      }
    }
    expect(collisions).toEqual([]);
  });
});
