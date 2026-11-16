/**
 * Builds a shared style. Every shared style export is written as
 * `/* @__PURE__ *\/ pureStyle(() => css`…`)` so a consumer's bundler drops
 * the styles a component does not import: an unused tagged template cannot be
 * dropped (css`…` might have side effects), an unused pure call can.
 *
 * A plain function call, not an IIFE: esbuild's syntax minifier (used by the
 * minified library build) folds `(() => css`…`)()` into a bare tagged
 * template and the pure mark is lost with it; a call to a named function
 * keeps it.
 */
export function pureStyle<T>(build: () => T): T {
  return build();
}
