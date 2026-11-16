/**
 * URL safety for user-supplied links.
 *
 * An href is safe unless its scheme is `javascript:`, `data:` or `vbscript:`.
 * Browsers ignore ASCII control characters, spaces, tabs and newlines inside
 * and around a URL's scheme (`java\tscript:`, ` javascript:`), and schemes are
 * case-insensitive, so those are removed before the check.
 *
 * Every component that renders a caller's href into `<a href>` uses this
 * (src/__tests__/safe-href.test.ts sweeps them).
 */
export const isSafeHref = (href: string): boolean => !/^(javascript|data|vbscript):/i.test(href.replace(/[\0- \x7f]/g, ''));

/** `href` when it is a non-empty safe URL, otherwise `undefined` (render no link). */
export const safeHref = (href: string | null | undefined): string | undefined => (href && isSafeHref(href) ? href : undefined);
