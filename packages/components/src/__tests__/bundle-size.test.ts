// @vitest-environment node
/**
 * Size budget for the embeddable sign-up form: cg-input + cg-checkbox +
 * cg-button + Lit, bundled from the BUILT per-component entries (dist/) the
 * way a consumer's bundler sees them — esbuild, minified, tree-shaken.
 * The growth-kit spike measured 14.6 KB gzip for these three + Lit (16.4 KB
 * with its form code and tokens). Lit alone is 6.5 KB gzip, so the 10 KB goal
 * leaves 3.7 KB for all three components. The gate holds the measured level
 * with small headroom so it cannot regress; reaching 10 KB needs a decision
 * to move variants out of these components. Measured: 12.2 KB, then 12.67 KB
 * (12,972 B) after HTML implicit submission (shared helper), fieldset
 * disabling, version stamping and the cross-copy message stores — hence the
 * 13 KB gate. 12,986 B with the library build minified again (2026-11-16). 13,308 B with primary's own hover / pressed tokens (2026-11-16; paid for by reusing the shared `spin` keyframes in cg-input / cg-checkbox and dropping duplicate declarations, not by minifier changes). 13,302 B with hover moved into @media (hover:hover) at build time, disabled at 40% and the shared isSafeHref (2026-11-16; paid for by one shared stroke keyframe in cg-checkbox). 13,296 B with cg-input's visible placeholder, `size="sm"` and `affix="plain"` (2026-11-16; paid for by class strings instead of array joins, the wrapper clipping its boxed affixes instead of per-side radii, and dropping duplicate / redundant rules and `aria-required`, which native `required` already exposes). 13,297 B with cg-button's menu-button state (`expanded`, for cg-dropdown), cg-input's restored `rounded="lg"` rule and label-less `size="sm"` (2026-11-16; paid for by grouping cg-input's status colours and cg-checkbox's checked selectors with :is(), `inset-inline` for the floating label, and dropping its unused transform-origin and the size="lg" radius the rounded rule always overrode). 13,309 B with the 36 px scale's top label (`label-position`), the in-place invalid state (no native bubble), the native-control `font: inherit` reset and the ghost-danger button (2026-11-17; paid for by colour-only checkbox states — no press scale or pop, as the direction asks — the clear button without its scale-in, transition shorthands, the loading button hiding its slots instead of five spinner colour rules, and one floating-label geometry for md and lg). 13,311 B with no native search cancel button (2026-11-17; paid for by a dead `.clear svg` rule — the icon is a cg-icon — an input z-index the floating label never needed, and the success focus ring written like the error one). 13,306 B with fields that show errors only on a submit attempt they can see (a capture-phase submit-click watcher, the implicit-submit helper, `reportFormValidity`; no native prototype is patched), touched + blur messages, and cg-checkbox's in-place error message (2026-11-18; paid for by cg-input's native-input getter instead of Lit's `@query` decorator module and inline focus / blur / keydown handlers, `mirrorValidity` reading ValidityState's own flags instead of a copied name list, one checkbox SVG for the tick or the dash with one stroke-reveal rule, a default focus target (the field's first input) instead of per-field closures, a `rounded="lg"` input rule identical to the default and an `input:disabled` cursor rule its `pointer-events: none` wrapper never let apply). A floor and required-code checks catch a bundle that lost the
 * components (e.g. a sideEffects mistake tree-shaking them away).
 * Requires `pnpm build` first (turbo runs build before test).
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const pkg = resolve(__dirname, '..', '..');
const entry = (t: string) => `./dist/components/${t}/${t}.js`;
const BUDGET_GZIP = 13 * 1024;
/** Lit alone is ~6.5 KB gzip: below 9 KB the components themselves went missing. */
const FLOOR_GZIP = 9 * 1024;

async function bundle(tags: string[]): Promise<{ text: string; gzip: number }> {
  const out = await build({
    stdin: { contents: tags.map((t) => `import '${entry(t)}';`).join('\n'), resolveDir: pkg },
    bundle: true,
    minify: true,
    treeShaking: true,
    format: 'esm',
    target: 'es2022',
    write: false,
    logLevel: 'silent',
  });
  const code = out.outputFiles[0]!.contents;
  return { text: Buffer.from(code).toString('utf8'), gzip: gzipSync(code, { level: 9 }).length };
}

/**
 * Shared style exports none of the three components use, each with a
 * component that does use it. The previous `cg-ai-effect-glow` sentinel was
 * dead: no component imports aiGlow, so it could never leak and never failed.
 */
const SENTINELS: Record<string, { text: string; user: string }> = {
  menuListStyles: { text: 'min-width:200px', user: 'cg-dropdown' },
  shimmerKeyframes: { text: '@keyframes shimmer', user: 'cg-image' },
  fadeSlideInKeyframes: { text: '@keyframes fadeSlideIn', user: 'ai-feature-flag' },
  pulseKeyframes: { text: '@keyframes pulse', user: 'cg-skeleton' },
  focusRingSingle: { text: '0 0 0 3px var(--cg-color-state-focus-halo)', user: 'cg-listbox' },
};

describe.skipIf(!existsSync(resolve(pkg, entry('cg-input'))))('per-component bundle size', () => {
  it('every sentinel is live: it ships in the bundle of a component that uses that style', async () => {
    const dead: string[] = [];
    for (const [name, { text, user }] of Object.entries(SENTINELS)) {
      if (!(await bundle([user])).text.includes(text)) dead.push(`${name} (${user})`);
    }
    expect(dead).toEqual([]);
  });

  it('input + checkbox + button + Lit is between 9 and 13 KB gzip, has their code, and carries no unused shared styles', async () => {
    const { text, gzip } = await bundle(['cg-input', 'cg-checkbox', 'cg-button']);
    // The three components are really there (registered and form-associated).
    const required = ['"cg-input"', '"cg-checkbox"', '"cg-button"', 'attachInternals', 'formAssociated', 'requestSubmit', 'setFormValue', '@keyframes spin'];
    expect(required.filter((r) => !text.includes(r)), 'component code missing').toEqual([]);
    const leaked = Object.entries(SENTINELS).filter(([, s]) => text.includes(s.text)).map(([n]) => n);
    expect(leaked, 'unused shared styles bundled').toEqual([]);
    expect(gzip, `gzip ${gzip} B`).toBeGreaterThanOrEqual(FLOOR_GZIP);
    expect(gzip, `gzip ${gzip} B`).toBeLessThanOrEqual(BUDGET_GZIP);
  });
});

/**
 * The library ships minified (identifiers mangled, syntax minified) so
 * unbundled/CDN consumers get small files. esbuild's syntax minifier folds a
 * `(() => css`…`)()` IIFE into a bare tagged template, which no bundler can
 * drop; the shared styles therefore use a pure helper call that survives it.
 */
describe.skipIf(!existsSync(resolve(pkg, entry('cg-input'))))('minified output', () => {
  const chunk = (marker: string): string => {
    const dir = resolve(pkg, 'dist/chunks');
    const file = readdirSync(dir).find((f) => f.endsWith('.js') && readFileSync(resolve(dir, f), 'utf8').includes(marker));
    return readFileSync(resolve(dir, file!), 'utf8');
  };

  it('the ES build is minified and every shared style export stays a pure call', () => {
    const motion = chunk('@keyframes shimmer');
    // Mangled: the source names of the styles are gone from the declarations.
    expect(motion).not.toMatch(/\b(const|let|var) shimmerKeyframes\b/);
    const styles = (motion.match(/`@keyframes|`@media|`[a-z-]+:/g) ?? []).length;
    const pure = (motion.match(/\/\* @__PURE__ \*\/ \w+\(\(\) =>/g) ?? []).length;
    expect(styles).toBeGreaterThan(0);
    expect(pure, 'shared styles that lost their pure call').toBe(styles);
  });

  it('the CDN build (cognivo.min.js) is minified', () => {
    const iife = readFileSync(resolve(pkg, 'dist/cognivo.min.js'), 'utf8');
    expect(iife.startsWith('var Cognivo=(function(')).toBe(true);
    // Identifiers mangled: source names of shared styles and helpers are gone.
    expect(iife).not.toMatch(/\b(shimmerKeyframes|hostTransition|focusRingSingle)\b/);
  });
});

describe.skipIf(!existsSync(resolve(pkg, entry('cg-input'))))('package side effects', () => {
  it('importing only the validation helper (unused) bundles nothing', async () => {
    const out = await build({
      stdin: { contents: "import '@cognivo/components/validation';", resolveDir: pkg },
      bundle: true, minify: true, treeShaking: true, format: 'esm', write: false, logLevel: 'silent',
    });
    expect(out.outputFiles[0]!.text.trim()).toBe('');
  });
});
