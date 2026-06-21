/**
 * Dynamic Software Interfaces — Scenario B: natural-language theming (spec §5).
 *
 * theme-generator turns a free-form description into a TokenOverride (DETERMINISTIC
 * curated palette → tier-2 token values — NOT an LLM, spec §4.3). We flatten that
 * nested object into `--cg-*` CSS custom properties and apply them to a surface
 * root, re-skinning WITHOUT re-layout. Same tree, different theme.
 *
 * TokenOverride dot-path → CSS var mapping (verified 2026-06-21):
 *   color.surface.base.background      -> --cg-color-surface-base-background
 *   color.action.primary.background.default -> --cg-color-action-primary-background-default
 * i.e. join the path with "-" and prefix "--cg-". A handful of abstract paths
 * (color.text.*, color.border.*) have no matching component-consumed var; emitting
 * them is harmless (unused custom properties).
 */

/** Flatten a TokenOverride into { '--cg-color-...': value } CSS custom properties. */
export function tokenOverrideToCssVars(override) {
  const vars = {};
  (function walk(obj, path) {
    for (const [k, v] of Object.entries(obj || {})) {
      const next = path ? `${path}-${k}` : k;
      if (v && typeof v === 'object') walk(v, next);
      else vars[`--cg-${next}`] = String(v);
    }
  })(override, '');
  return vars;
}

/** Apply CSS-var overrides to an element's inline style (scoped re-skin). */
export function applyThemeVars(el, vars) {
  for (const [name, value] of Object.entries(vars)) el.style.setProperty(name, value);
}

/** Remove previously-applied override vars from an element. */
export function clearThemeVars(el, vars) {
  for (const name of Object.keys(vars)) el.style.removeProperty(name);
}

/**
 * Convenience: description -> CSS vars, using the injected generateTheme so this
 * module stays free of a hard dependency on @cognivo/theme-generator (the caller
 * imports it). preferDark biases toward dark palettes (spec §4.3).
 */
export function themeVarsFromDescription(generateTheme, description, preferDark = false) {
  const override = generateTheme({ description, preferDark });
  return tokenOverrideToCssVars(override);
}
