/**
 * The version of this copy of `@cognivo/components`, replaced at build time
 * (Vite / Vitest / the browser-test bundler `define` it from package.json).
 * Stamped on every registered element class under `Symbol.for('cognivo.version')`
 * so a second copy on the page can tell which version is running.
 */
declare const __COGNIVO_VERSION__: string | undefined;

export const VERSION: string = typeof __COGNIVO_VERSION__ === 'string' ? __COGNIVO_VERSION__ : '0.0.0-dev';
